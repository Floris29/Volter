const {
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: 'create',
    description: 'create your own ticket.',
    async execute(message, client, args) {
        const channelName = `ticket-${message.author.username}`
        const existing = message.guild.channels.cache.find(channel => channel.name === channelName.toLowerCase());

        if (existing) {
            return message.reply({
                content: `**You already have a ticket, please close your exsisting ticket first before opening a new one**\n${existing}.`,
            }).then((m) => {
                setTimeout(() => {
                    m.delete();
                }, 14000);
            })
        }

        message.delete();

        message.guild.channels.create(channelName, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [{
                id: message.guild.id,
                deny: ['VIEW_CHANNEL'],
            }, {
                id: message.author.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            }],
        }).then(async channel => {
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setTitle(`${message.author.username} Ticket`)
                .setDescription(`**${message.author}, Welcome to your channel! Support will be arriving soon**\n**While you wait please tell us what your problem is**\n**If you want to close the ticket please type .close\`**`)
            channel.send({
                embeds: [embed]
            })
        });
    }
}