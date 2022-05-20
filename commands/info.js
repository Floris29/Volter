const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const { MessageEmbed, Collection, Permissions } = require ('discord.js');


module.exports = {
    name: 'Information',
	description: 'Gives you information about the bot and about the commands.',
	aliases: ['info'],
    usage: '[command name]',

    execute(message, args, client){

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Information about Volter.')
        .setThumbnail(client.user.displayAvatarURL())
        embed.addFields(
        { name: "Disigners", value: "Hello there. My name is Volter. A Discord bot made by <@695899357311926293> and <@314832525367312404>.", inline: true},
        { name: "Changes", value: "For using Volter properly, are there some things that you need change.", inline: true},
        { name: "Messages", value: "For a welcome message, Youre welcomes channel needs the name **welcome** If there are any emoties it won't work.. For greetings the name has to be **greetings** alsno no emoties.", inline: true},
        { name:  "Logs", value: "**IMPORTANT** The bot has a function that captures a the logs in the server. For that you need a channel named:**bot-logs**.", inline: true},
        { name: ":)", value: "And thats it. Questions? Come in our public server!", inline: true},
        { name: "Invite", value: "Invite: https://discord.gg/uYjcxB2C", inline: true}
        );
        message.reply({ embeds: [embed], ephemeral: true });
        
    }
}
