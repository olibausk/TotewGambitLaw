import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { scenarios, weightedPick } from "./scenarios.js";
import fs from "fs";

const {
  DISCORD_TOKEN,
  CLIENT_ID,
  GUILD_ID,
  PORT = 10002,
  ROLE_LAW_NAME = "Law"
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

// Discord Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Slash-Commands
const slashCommands = Object.values(scenarios).map(s => ({
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
  const role = guild?.roles?.cache?.find(r => r.name.toLowerCase() === ROLE_LAW_NAME.toLowerCase());
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

const MIN = 60 * 1000;

async function runScenario(interaction, scenarioKey) {
  const guild = interaction.guild;
  const channel = interaction.channel;
  const userId = interaction.user.id;

  const cfg = scenarios[scenarioKey];
  if (!cfg) {
    return interaction.reply({ content: "Unbekanntes Szenario.", ephemeral: true });
  }

  // Startmeldung
  const startMsg = formatText(guild, userId, cfg.start);
  await interaction.reply(startMsg);
  logEvent(`START: ${cfg.label} von ${interaction.user.tag} in #${channel.name} → ${startMsg}`);

  // Ereignis nach 4 Minuten
  setTimeout(() => {
    const pick = weightedPick(cfg.first);
    const msg = formatText(guild, userId, pick);
    channel.send(msg);
    logEvent(`FIRST: ${cfg.label} für ${interaction.user.tag} → ${msg}`);
  }, 4 * MIN);

  // Ereignis nach 7 Minuten
  setTimeout(() => {
    const pick = weightedPick(cfg.second);
    const msg = formatText(guild, userId, pick);
    channel.send(msg);
    logEvent(`SECOND: ${cfg.label} für ${interaction.user.tag} → ${msg}`);
  }, 7 * MIN);

  // Abschluss nach 10 Minuten
  setTimeout(() => {
    const pick = weightedPick(cfg.final);
    const msg = `Aktivität vom Typ **${cfg.label}** wurde beendet.\n${formatText(guild, userId, pick)}`;
    channel.send(msg);
    logEvent(`FINAL: ${cfg.label} für ${interaction.user.tag} → ${msg}`);
  }, 10 * MIN);
}

client.on("clientReady", () => {
  console.log(`[ready] Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand?.()) return;

  const cmd = interaction.commandName;
  const entry = Object.values(scenarios).find(s => s.command === cmd);
  if (!entry) return;

  await runScenario(interaction, Object.keys(scenarios).find(k => scenarios[k].command === cmd));
});

// Start
registerCommands().catch(console.error);
client.login(DISCORD_TOKEN);
