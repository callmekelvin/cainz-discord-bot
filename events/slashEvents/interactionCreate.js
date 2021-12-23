module.exports = async (interaction, client) => {
	if (!interaction.isCommand()) {
		return;
	}

	const command = client.slashCommands.get(interaction.commandName);

	if (!command) {
		return interaction.reply({ content: "Slash Command not registered" });
	}

	try {
		command.run(interaction, client);
	} catch (err) {
		return interaction.reply({ content: err.message, ephemeral: true });
	}
};
