const { MessageEmbed } = require('discord.js');
const discord = require('discord.js')


module.exports = {
  name: "suggest",
  description: "Send your poll",
  emotes: "✅",
  function: 'Fun',
  execute(message, args, client) {

    if(!args.length) {
      return message.channel.send("Please Give the Suggestion for your poll")
    }

    const channel = message.guild.channels.cache.find((x) => (x.name === "suggestions"))

    if(!channel) {
      return message.channel.send("There is no channel called suggestions")
    }

    const embed = new discord.MessageEmbed()
    .setTitle(args.join(" "))
    .setDescription("Suggestion from: " + message.author.tag)
    .setTimestamp()
  
    channel.send({ embeds: [embed] })
    .then((s)=>{

    s.react('✅')
    s.react('❌')

    })   
    
  }
}