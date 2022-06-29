const { MessageEmbed, Collection, Permissions } = require ('discord.js');

//Ja, dit is heel basic maar dat maakt niet uit, voor nu doet hij het en later kijk ik er nog wel naar

module.exports = {
    name: 'close',
    description: "Delete a specefic channel. This is made for the ticket function",
    admin: true,
    execute(message, args, client){
      if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) { 
        return message.channel.send("Only a moderator can end a ticket!")
      } else {
        return 
        message.channel.delete()
      }
}
}