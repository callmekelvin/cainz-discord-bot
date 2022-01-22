const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("events")
		.setDescription("Fetches upcoming CAINZ Events"),

	run: async (interaction, client) => {
		try {
			await interaction.deferReply({ ephermeral: true });

			const rawEvents = await axios.get(process.env.EVENT_ENDPOINT);

			if (rawEvents.status != 200 || rawEvents.data.status != 200) {
				await interaction.editReply({ content: "Error fetching digest data" });
				return;
			}

			const events = await rawEvents.data;

			upcomingEvents = [];

			events.data.map((event) => {
				upcomingEvents.push({
					name: "\u200B",
					value: `=====================================`,
				});

				let year = event.event_Date.substring(0, 4);
				let month = event.event_Date.substring(4, 6);
				let day = event.event_Date.substring(6, 8);

				dateString = new Date(year, month - 1, day);

				upcomingEvents.push({
					name: `${event.event_Title}`,
					value: `> Date: ${dateString.toDateString()}\n> Time: ${
						event.event_Time
					}\n> Location: ${event.event_Location}\n> Link to Event: ${
						event.external_Link
					}\n\nDescription: ${event.desc}`,
				});
			});

			// if there are no upcoming events
			if (upcomingEvents.length == 0) {
				upcomingEvents.push({
					name: "No Upcoming Events",
					value: `There are no upcoming events at the moment. Stay tuned!`,
				});
			}

			const messsageEmbed = new MessageEmbed()
				.setColor("#DB4644")
				.setTitle("Upcoming CAINZ Events")
				.addFields(upcomingEvents);

			await interaction.editReply({
				embeds: [messsageEmbed],
			});
		} catch (err) {
			throw err;
		}
	},
};
