const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Gives the ping between the bot and you',
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