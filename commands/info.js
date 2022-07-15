//TODO dit moet een command zijn die info geeft over een command. Dit is dat nu dus niet.

const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const { MessageEmbed, Collection, Permissions } = require ('discord.js');


module.exports = {
    name: 'info',
	description: 'Gives you information about the commands.',
	aliases: ['info'],
    function: 'Fun',
    emotes: '🤖',

    execute(message, args, client){

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Information about Volter.')
        .setThumbnail(client.user.displayAvatarURL())
        embed.addFields(
        { name: "Designers", value: "Hello there. My name is Volter. A Discord bot made by <@695899357311926293> and <@314832525367312404>.", inline: true},
        { name: "Changes", value: "For using Volter properly, are there some things that you need have.", inline: true},
        { name: ":)", value: "And thats it. Questions? Come in our public server!", inline: true},
        { name: "Invite", value: "Invite: https://discord.gg/uYjcxB2C", inline: true}
        );
        message.reply({ embeds: [embed], ephemeral: true });
        
    }
}
