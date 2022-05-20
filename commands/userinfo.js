const discord = require('discord.js');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'userinfo',
	description: 'let you see the info about you',
        usage: '[command name]',
	execute(message, args, client) {

        let user = message.mentions.users.first() || message.author;
        const member = message.member

        var roles = member.roles.cache.size - 1;
        var roleNames = member.roles.cache.map(r => r).join(" ").replace("@everyone", "");
        if(roles == 0) roleNames = "No roles";

        const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.author.avatarURL())
    .addField(`${user.tag}`, `${user}`, true)
    .addField("ID:", `${user.id}`, true)
    .addField("Roles:", message.member.roles.cache.map(roles => `${roles}`).join(', '), true)
    .addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
    .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 

    message.reply({ embeds: [embed], ephemeral: true });
    }
};