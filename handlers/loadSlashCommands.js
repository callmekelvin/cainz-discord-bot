const fs = require('fs');

function loadSlashCommands(client){
    // Slash Command Handler
    const commandFiles = fs.readdirSync('./commands/slashCommands/').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../commands/slashCommands/${file}`);

        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        client.slashCommands.set(command.data.name, command);
    }
}

module.exports = {
    loadSlashCommands,
}
