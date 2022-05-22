const discord = require("discord.js");

module.exports = {
      name: 'ticket',
      description: 'Create a button to create tickets.',
      execute(message, args, client){
        
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle('Create your ticket.')
            .setDescription('Create your own ticket with the button!.')
      }
    }