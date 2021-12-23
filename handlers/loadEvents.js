const slashEvent = (event) => require(`../events/slashEvents/${event}`);
const auxEvent = (event) => require(`../events/auxEvents/${event}`);

function loadEvents(client) {
	// When client ready - run this once
	client.once("ready", () => console.log("Ready!"));

	// Sets a custom presence
	client.on("ready", () => {
		client.user.setPresence({
			activities: [
				{
					name: "Battlestar Galactica",
					type: 3,
				},
			],
			status: "online",
		});
	});

	// When client is kicked from server
	client.on("guildDelete", (guild) => {
		console.log(`Bot kicked from server: ${guild.name}`);
	});

	// Listen to Events
	client.on("interactionCreate", (interaction) =>
		slashEvent("interactionCreate")(interaction, client)
	);

	client.on("interactionCreate", (interaction) =>
		auxEvent("interactionCreate")(interaction, client)
	);
}

module.exports = {
	loadEvents,
};
