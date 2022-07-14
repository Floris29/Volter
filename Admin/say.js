const Discord = require('discord.js');

module.exports = {
    name: 'say',
	description: 'sends a message in a embed',
    admin: true,
	function: 'Admin',
    execute(message, args){

        if(!args.length) return;

        let description = args.join(" ");
        const embed = new Discord.MessageEmbed()
        .setDescription(description) // setTitle and stuff according to your preference
        .setTimestamp()
        message.delete(); // deleting the user message since it should be anonymous
        message.channel.send({embeds: [embed]});

        
    },
};