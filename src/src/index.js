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
  console.error("Bitte DISCORD_TOKEN und CLIENT_ID in der .env setzen.");
  process.exit(1);
}

// Health-Endpoint (Render / UptimeRobot)
const app = express();
app.get("/", (_req, res) => res.send("OK"));
app.get("/health", (_req, res) => {
  res.json({ ok: true, uptime: process.uptime(), timestamp: Date.now() });
});
app.listen(PORT, () => console.log(`[health] Listening on :${PORT}`));

// Discord Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Slash-Commands aus Szenarien generieren
const slashCommands = Object.values(scenarios).map(s => ({
  name: s.command,
  description: `${s.label} starten (zeitgestaffelte RP-Ereignisse)`,
}));

async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  if (GUILD_ID) {
    // Guild-Commands (sofort verfügbar)
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: slashCommands });
    console.log(`[commands] Guild commands registriert für Guild ${GUILD_ID}`);
  } else {
    // Global Commands (Ausrollzeit bei Discord)
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: slashCommands });
    console.log("[commands] Global commands registriert");
  }
}

// Helfer: @Law -> echte Rollenmention, {user} -> Usermention
function formatText(guild, userId, raw) {
  let text = raw.replaceAll("{user}", `<@${userId}>`);
  const role = guild?.roles?.cache?.find(r => r.name.toLowerCase() === ROLE_LAW_NAME.toLowerCase());
  if (role) {
    text = text.replaceAll("@Law", `<@&${role.id}>`);
  }
  return text;
}

// Timer-Helfer (ms)
const MIN = 60 * 1000;

async function runScenario(interaction, scenarioKey) {
  const guild = interaction.guild;
  const channel = interaction.channel;
  const userId = interaction.user.id;

  const cfg = scenarios[scenarioKey];
  if (!cfg) {
    return interaction.reply({ content: "Unbekanntes Szenario.", ephemeral: true });
  }

  // Sofortige Startmeldung (Nachricht #1)
  const startMsg = formatText(guild, userId, cfg.start);
  await interaction.reply({ content: startMsg, ephemeral: false });

  // Ereignis #2 nach 4 Minuten
  setTimeout(() => {
    try {
      const pick = weightedPick(cfg.first);
      channel.send(formatText(guild, userId, pick));
    } catch (e) {
      console.error("Timer(4min) error:", e);
    }
  }, 4 * MIN);

  // Ereignis #3 nach 7 Minuten
  setTimeout(() => {
    try {
      const pick = weightedPick(cfg.second);
      channel.send(formatText(guild, userId, pick));
    } catch (e) {
      console.error("Timer(7min) error:", e);
    }
  }, 7 * MIN);

  // Abschlussmeldung #4 nach 10 Minuten
  setTimeout(() => {
    try {
      const pick = weightedPick(cfg.final);
      const endHeader = `Aktivität vom Typ **${cfg.label}** wurde beendet.`;
      channel.send(`${endHeader}\n${formatText(guild, userId, pick)}`);
    } catch (e) {
      console.error("Timer(10min) error:", e);
    }
  }, 10 * MIN);
}

client.on("ready", () => {
  console.log(`[ready] Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand?.()) return;

  // Mappe Command -> Szenario
  const cmd = interaction.commandName;
  const entry = Object.values(scenarios).find(s => s.command === cmd);
  if (!entry) return;

  await runScenario(interaction, Object.keys(scenarios).find(k => scenarios[k].command === cmd));
});

// Start
registerCommands().catch(console.error);
client.login(DISCORD_TOKEN);
