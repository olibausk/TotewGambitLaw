import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Client, GatewayIntentBits, REST, Routes, Events } from "discord.js";
import { scenarios, weightedPick } from "./scenarios.js";
import fs from "fs";

const {
  DISCORD_TOKEN,
  CLIENT_ID,
  GUILD_ID,
  PORT = 10002,
  ROLE_LAW_NAME = "Law",
  // Optional: JSON wie {"kidnapping":{"first":6,"second":8,"final":12},"mord":{"first":5,"second":7,"final":11}}
  TIMING_OVERRIDES
} = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID) {
  console.error("❌ Bitte DISCORD_TOKEN und CLIENT_ID in der .env setzen.");
  process.exit(1);
}

// Health-Endpoint
const app = express();
app.get("/", (_req, res) => res.send("OK"));
app.get("/health", (_req, res) => {
  res.json({ ok: true, uptime: process.uptime(), timestamp: Date.now() });
});
app.listen(PORT, () => console.log(`[health] Listening on :${PORT}`));

// Discord Client (nur Slash benötigt -> Guilds reicht)
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Slash-Commands dynamisch aus scenarios.js
const slashCommands = Object.values(scenarios).map((s) => ({
  name: s.command,
  description: `${s.label} starten (zeitgestaffelte RP-Ereignisse)`
}));

async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  if (GUILD_ID) {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: slashCommands });
    console.log(`[commands] Guild commands registriert für Guild ${GUILD_ID}`);
  } else {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: slashCommands });
    console.log("[commands] Global commands registriert");
  }
}

// Hilfsfunktion für Texte
function formatText(guild, userId, raw) {
  let text = raw.replaceAll("{user}", `<@${userId}>`);
  const role = guild?.roles?.cache?.find(
    (r) => r.name.toLowerCase() === ROLE_LAW_NAME.toLowerCase()
  );
  if (role) {
    text = text.replaceAll("@Law", `<@&${role.id}>`);
  }
  return text;
}

// Logging-Funktion
function logEvent(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync("gambit.log", line);
}

const overrides = (() => {
  try {
    return TIMING_OVERRIDES ? JSON.parse(TIMING_OVERRIDES) : {};
  } catch (e) {
    console.warn("⚠️ Konnte TIMING_OVERRIDES nicht parsen. Ignoriere Overrides.", e);
    return {};
  }
})();

// Minuten → Millisekunden
const MIN = 60 * 1000;

function msForPhase(cfg, scenarioKey, phaseKey) {
  // Suche Standard-Delay aus Szenario-Definition
  const std =
    phaseKey === "final"
      ? cfg.finalDelay
      : cfg.phases.find((p) => p.key === phaseKey)?.delay;

  // Overrides aus ENV (z. B. {"kidnapping":{"first":6,"second":8,"final":12}})
  const ov = overrides?.[scenarioKey]?.[phaseKey];
  const minutes = typeof ov === "number" ? ov : std;
  return Math.max(0, (minutes ?? 0) * MIN);
}

async function runScenario(interaction, scenarioKey) {
  const guild = interaction.guild;
  const channel = interaction.channel;
  const userId = interaction.user.id;

  const cfg = scenarios[scenarioKey];
  if (!cfg) {
    return interaction.reply({ content: "Unbekanntes Szenario.", ephemeral: true });
  }

  // Startmeldung sofort
  const startMsg = formatText(guild, userId, cfg.start);
  await interaction.reply(startMsg);
  logEvent(`START: ${cfg.label} von ${interaction.user.tag} in #${channel?.name} → ${startMsg}`);

  // First-Phase
  setTimeout(() => {
    const pick = weightedPick(cfg.first);
    const msg = formatText(guild, userId, pick);
    channel.send(msg);
    logEvent(`FIRST: ${cfg.label} für ${interaction.user.tag} → ${msg}`);
  }, msForPhase(cfg, scenarioKey, "first"));

  // Second-Phase
  setTimeout(() => {
    const pick = weightedPick(cfg.second);
    const msg = formatText(guild, userId, pick);
    channel.send(msg);
    logEvent(`SECOND: ${cfg.label} für ${interaction.user.tag} → ${msg}`);
  }, msForPhase(cfg, scenarioKey, "second"));

  // Finale
  setTimeout(() => {
    const pick = weightedPick(cfg.final);
    const msg = `Aktivität vom Typ **${cfg.label}** wurde beendet.\n${formatText(guild, userId, pick)}`;
    channel.send(msg);
    logEvent(`FINAL: ${cfg.label} für ${interaction.user.tag} → ${msg}`);
  }, msForPhase(cfg, scenarioKey, "final"));
}

client.once(Events.ClientReady, () => {
  console.log(`[ready] Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand?.()) return;

  const cmd = interaction.commandName;
  const entry = Object.values(scenarios).find((s) => s.command === cmd);
  if (!entry) return;

  const key = Object.keys(scenarios).find((k) => scenarios[k].command === cmd);
  if (!key) return;

  await runScenario(interaction, key);
});

// Start
registerCommands().catch(console.error);
client.login(DISCORD_TOKEN);
