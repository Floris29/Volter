const discord = require("discord.js");

module.exports = {
    name: 'ticketsetup',
    description: 'How do I setup the ticket function?',
    execute(message, args, client){

        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle('How do I setup the ticket funtion?')
        .setDescription('Do .ticket in a channel you prefer.')
        .addFields(
        { name: "Numer 2:", value: "Add the roles: Staff", inline: true },
        { name: "Numer 3", value: "Enjoy!", inline: true },
        )

    }
}