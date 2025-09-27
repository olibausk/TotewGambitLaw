import express from "express";
import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { scenarios, weightedPick } from "./scenarios.js";

const {
  DISCORD_TOKEN,
  CLIENT_ID,
  GUILD_ID,
  PORT = 3000,
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

// Slash-Commands registrieren
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

// Szenario starten
async function runScenario(interaction, scenarioKey) {
  const guild = interaction.guild;
  const channel = interaction.channel;
  const userId = interaction.user.id;

  const cfg = scenarios[scenarioKey];
  if (!cfg) {
    return interaction.reply({ content: "❌ Unbekanntes Szenario.", ephemeral: true });
  }

  // Startmeldung sofort
  await interaction.reply(formatText(guild, userId, cfg.start));

  // Alle Phasen zeitgesteuert senden
  cfg.phases.forEach(phase => {
    setTimeout(() => {
      const pick = weightedPick(cfg[phase.key]);
      channel.send(formatText(guild, userId, pick));
    }, phase.delay * 60 * 1000);
  });

  // Finale Nachricht
  setTimeout(() => {
    const pick = weightedPick(cfg.final);
    channel.send(
      `⚔️ Aktivität vom Typ **${cfg.label}** wurde beendet.\n${formatText(guild, userId, pick)}`
    );
  }, cfg.finalDelay * 60 * 1000);
}

client.on("ready", () => {
  console.log(`[ready] Logged in als ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand?.()) return;

  const cmd = interaction.commandName;
  const entry = Object.entries(scenarios).find(([, s]) => s.command === cmd);
  if (!entry) return;

  const [key] = entry;
  await runScenario(interaction, key);
});

// Start
registerCommands().catch(console.error);
client.login(DISCORD_TOKEN);
