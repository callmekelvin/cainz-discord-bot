const { Client, Intents, Collection } = require("discord.js");
const dotenv = require("dotenv");

const { registerSlashCommands } = require("./handlers/registerSlashCommands.js");
const { loadSlashCommands } = require("./handlers/loadSlashCommands.js");
const { loadEvents } = require("./handlers/loadEvents.js");
const { loadCommands } = require("./handlers/loadCommands.js");

const config = dotenv.config();

if (config.error) {
	throw config.error;
}

// Create new client instance
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
});

client.slashCommands = new Collection();
client.auxCommands = new Collection();

// register slash commands with discord
registerSlashCommands(client);

// load slash command into discord
loadSlashCommands(client);

loadCommands(client);

// activate command listeners
loadEvents(client);

// Login to Discord using client token
client.login(process.env.DISCORD_TOKEN).catch(() => {
	console.log("Error loggining into discord using bot client token");
});

// Manual Interrupt
process.on("SIGINT", () => {
	console.log("Manual interrupt signal detected - Terminating Session");

	client.destroy();
});

// Catch Errors
process.on("rejectionHandled", (err) => console.log(err));

process.on("unhandledRejection", (err) => console.log(err));

process.on("uncaughtException", (err) => {
	console.error(err);
	client.destroy();
});
