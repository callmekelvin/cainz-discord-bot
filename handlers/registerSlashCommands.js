const fs = require("fs");

// Registers Slash Bot Commands with Discord (Details of Command Only)
function registerSlashCommands(client) {
	const slashCommands = [];
	const commandFiles = fs
		.readdirSync("./commands/slashCommands/")
		.filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const command = require(`../commands/slashCommands/${file}`);

		slashCommands.push(command.data.toJSON());
	}

	client.on("ready", async () => {
		// testing
		const guild = await client.guilds.cache.get(process.env.GUILD_ID);

		await guild.commands.set(slashCommands);

		// production
		// await client.application.commands.set(slashCommands);
	});
}

module.exports = {
	registerSlashCommands,
};
