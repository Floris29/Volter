const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const os = require('os');

module.exports = {
    name: "status",
    description: "Displays the status of the client and database.",
    usage: '[command name]',
    
    execute(message, args, client){
        
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`🧙🏻‍♂️ ${client.user.username} Status`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(message.client.application.description || "")
            .addFields(
                { name: "🧠 Server Owner", value: client.user.tag, inline: true },
                { name: "📆 Created", value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "👩🏻‍💻 Bot Owner", value: `${message.client.application.owner || "None"}`, inline: true },
                { name: "🖥 System", value: os.type().includes("Windows") ? "Windows" : os.type(), inline: true },
                { name: "👩🏻‍🔧 Node.js", value: process.version, inline: true },
                { name: "🛠 Discord.js", value: Discord.version, inline: true },
                { name: "🤹🏻‍♀️ Commands", value: `${client.commands.size}`, inline: true },
                { name: "👨‍👩‍👧‍👦 Servers", value: `${client.guilds.cache.size}`, inline: true },
                { name: "👧🏻 Users", value: `${client.users.cache.size}`, inline: true },
                { name: "📺 Channels", value: `${client.channels.cache.filter((channel) => channel.type !== "GUILD_CATEGORY").size}`, inline: true }
            );
        message.reply({ embeds: [embed], ephemeral: true });
    }
}