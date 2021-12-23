const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("digest")
		.setDescription(
			"Fetches the latest digest article written by the CAINZ Writers Team"
		),

	run: async (interaction, client) => {
		try {
			await interaction.deferReply({ ephermeral: true });

			const rawData = await axios.get(process.env.DIGEST_ENDPOINT);

			const digest = await rawData.data;

			const digestArticle = await digest[0].data;

			if ((await rawData.status) != 200 || digest.length == 0) {
				await interaction.editReply({ content: "Error fetching digest data" });
				return;
			}

			let writerString = "Writers:  ";

			digestArticle.writers.forEach((writer) => {
				writerString = writerString.concat(writer.name, ", ");
			});

			writerString = writerString.substring(0, writerString.length - 2);

			let editorString = "Editors:  ";

			digestArticle.editors.forEach((editor) => {
				editorString = editorString.concat(editor.name, ", ");
			});

			editorString = editorString.substring(0, editorString.length - 2);

			const messsageEmbed = new MessageEmbed()
				.setColor("#DB4644")
				.setTitle("Latest Digest Article")
				.addFields(
					{ name: `${digestArticle.title}`, value: "\u200B" },
					{
						name: `> Last Modified: ${digestArticle.last_modified}`,
						value: `> Publish Date: ${digestArticle.pub_date}`,
					},
					{
						name: `> ${editorString}`,
						value: `> ${writerString}`,
						inline: true,
					},
					{
						name: "\u200B",
						value: `${digestArticle.content.substring(0, 1020)}...`,
					},
					{
						name: "\nWould love to show more but discord bots have limits. Want to continue reading?",
						value: `> [Link to ${digestArticle.title} Digest Article](${process.env.DIGEST_LINK}${digest[0].postID})`,
					}
				);

			await interaction.editReply({
				embeds: [messsageEmbed],
			});
		} catch (err) {
			throw err;
		}
	},
};
