const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const os = require('os');

module.exports = {
    name: "status",
    description: "Gives you information about the status of the bot.",
    function: 'Fun',
    emotes: '๐ข',
    
    execute(message, args, client){
        
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`๐ง๐ปโโ๏ธ ${client.user.username} Status`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(message.client.application.description || "")
            .addFields(
                { name: "๐ง  Server Owner", value: "<@" + message.guild.ownerId + ">", inline: true },
                { name: "๐ Created", value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "๐ฉ๐ปโ๐ป Bot Owner", value: `${message.client.application.owner || "None"}`, inline: true },
                { name: "๐ฅ System", value: os.type().includes("Windows") ? "Windows" : os.type(), inline: true },
                { name: "๐ฉ๐ปโ๐ง Node.js", value: process.version, inline: true },
                { name: "๐  Discord.js", value: Discord.version, inline: true },
                { name: "๐คน๐ปโโ๏ธ Commands", value: `${client.commands.size}`, inline: true },
                { name: "๐จโ๐ฉโ๐งโ๐ฆ Servers", value: `${client.guilds.cache.size}`, inline: true },
                { name: "๐ง๐ป Users", value: `${client.users.cache.size}`, inline: true },
                { name: "๐บ Channels", value: `${client.channels.cache.filter((channel) => channel.type !== "GUILD_CATEGORY").size}`, inline: true },
            );
        message.reply({ embeds: [embed], ephemeral: true });
    }
}