const { MessageEmbed } = require('discord.js');


module.exports = {
  name: "suggest",
  usage: "suggest <message>",
  description: "Send your poll",
  execute(message, args, client){

    if(!args.length) {
      return message.channel.send("Please Give the Suggestion for your poll")
    }

    const channel = message.guild.channels.cache.find((x) => (x.name === "suggestions"))


    if(!channel) {
      return message.channel.send("There is no channel called suggestions")
    }


    const embed = new Discord.MessageEmbed()
    .setTitle("Suggestie: " + message.author.tag)
    .setTimestamp()
  
    channel.send(embed)
    .then((s)=>{

    s.react('✅')
    s.react('❌')

    })
  

    message.delete().catch(e => console.log(e));

    channel.send({ embeds: [suggest] });

  }
}