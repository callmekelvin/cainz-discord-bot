const fs = require('fs');

function loadCommands(client){
    // Command Handler
    const commandFiles = fs.readdirSync('./commands/auxCommands/').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../commands/auxCommands/${file}`);

        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        client.auxCommands.set(command.name, command);
    }
}

module.exports = {
    loadCommands,
}