module.exports = async (interaction, client) => {
	if (!interaction.isSelectMenu()) {
		return;
	}
	const command = client.auxCommands.get(interaction.customId);

	if (!command) {
		return interaction.reply({ content: "Aux Command not registered" });
	}

	try {
		command.run(interaction, client);
	} catch (err) {
		return interaction.reply({ content: err.message, ephemeral: true });
	}
};
