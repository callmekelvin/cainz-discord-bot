const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
	name: "teamResponse",
	description: "Response to Team Selection Menu",

	run: async (interaction, client) => {
		try {
			await interaction.deferReply({ ephermeral: true });

			const rawData = await axios.get(process.env.TEAM_ENDPOINT);
			console.log(rawData);

			if ((await rawData.status) != 200 || rawData.data.status != 200) {
				await interaction.editReply({ content: "Error fetching team data" });
				return;
			}

			const data = await rawData.data.data;

			const returnField = data[interaction.values[0]].map((member) => {
				return {
					name: member.name,
					value: `[${member.role}](${member.link})`,
					inline: true,
				};
			});

			let label = "\u200B";
			if (interaction.values[0] == "writer") {
				label = "Writers Team";
			} else if (interaction.values[0] == "operation") {
				label = "Operations Team";
			} else if (interaction.values[0] == "board") {
				label = "Board of Directors";
			}

			const messsageEmbed = new MessageEmbed()
				.setColor("#DB4644")
				.setTitle("CAINZ Team")
				.setURL(process.env.TEAM_URL_LINK)
				.addFields({ name: "\u200B", value: `${label}` }, returnField);

			await interaction.editReply({ embeds: [messsageEmbed] });

			await interaction.editReply({ embeds: [messsageEmbed] });
		} catch (err) {
			throw err;
		}
	},
};
