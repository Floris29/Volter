//TODO Make it more that you only can remove a channel with a something in the name.
const { MessageEmbed, Collection, Permissions } = require ('discord.js');

module.exports = {
    name: 'close',
    description: "Delete a specefic channel. This is made for the ticket function",
    admin: true,
    function: 'Tickets',
    execute(message, args, client){
      if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) { 
        return message.channel.send("Only a moderator can end a ticket!")
      } else {
        return 
        message.channel.delete()
      }
}
}