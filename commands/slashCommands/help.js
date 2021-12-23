const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const slashCommand = (command) => require(`./${command}`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Fetches all CAINZ Bot commands"),

	run: async (interaction, client) => {
		try {
			await interaction.deferReply({ ephermeral: true });

			helpDetails = [];
			for (const key of client.slashCommands.keys()) {
				helpDesc = slashCommand(key).data.description;
				helpDetails.push({ name: "> /" + key, value: helpDesc });
			}

			const messsageEmbed = new MessageEmbed()
				.setColor("#DB4644")
				.setTitle("All CAINZ Bot Commands")
				.addFields(helpDetails);

			await interaction.editReply({
				embeds: [messsageEmbed],
			});
		} catch (err) {
			throw err;
		}
	},
};
