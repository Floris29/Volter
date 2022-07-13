const discord = require("discord.js");
const { MessageEmbed, Collection, Permissions} = require('discord.js');

module.exports = {
      name: 'ticket',
      description: 'Create a button to create tickets.',
      execute(message, args, client){
        
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle('Create your ticket.')
            .setDescription('Create your own ticket with the commands!.')
            .addFields(
              { name: ".create", value: "Create your own ticket!", inline: true },
              { name: ".close", value: "(ADMIN) Close a ticket", inline: true},
            )
    
          message.reply({ embeds: [embed], ephemeral: true });
      }
    }