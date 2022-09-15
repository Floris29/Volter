const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'server',
	description: 'Gives you all the servers were the bot is in',
  function: 'Fun',
  emotes: '🥇',

  execute(message) {
  message.channel.send(
    { 
      embeds: [
        new MessageEmbed()
        .setDescription(
          client.guilds.cache
            .map(g => `Guild Name: ${g.name}\n  Total Members: ${g.members.cache.size}\n Guild ID: ${g.id}`).join('\n\n')
        )
      ] 
    }
  )
  
}
}