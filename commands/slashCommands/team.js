const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("team")
		.setDescription("Fetches the CAINZ Team"),

	run: async (interaction, client) => {
		const selectRow = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId("teamResponse")
				.setPlaceholder("Nothing Selected")
				.addOptions([
					{
						label: "Board",
						description: "CAINZ Board of Directors",
						value: "board",
					},
					{
						label: "Operations Team",
						description: "CAINZ Operations Team",
						value: "operation",
					},
					{
						label: "Writers Team",
						description: "CAINZ Writers Team",
						value: "writer",
					},
				])
		);

		const messageEmbed = new MessageEmbed()
			.setColor("#DB4644")
			.setTitle("CAINZ Team")
			.setDescription("Select a team you would like to view")
			.setURL(process.env.TEAM_LINK);

		try {
			await interaction.deferReply({ ephermeral: true });

			await interaction.editReply({ embeds: [messageEmbed], components: [selectRow] });
		} catch (err) {
			throw err;
		}
	},
};
