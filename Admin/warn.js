const fs = require("fs");
const discord = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: 'warn',
	description: 'Warns a member',
    admin: true,
	function: 'Admin',
    execute(message, args){

    const errorEmbed = new Discord.MessageEmbed()
    .setTitle("Error!")
    .setColor("RED")
    .setDescription("Give up a reason or provide a user.`")

    if (!args[0]) return message.reply({ embeds: [errorEmbed] });

    if (!args[1]) return message.reply("Give a valid reason");

    var warnUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("User not found");

    const warns = JSON.parse(fs.readFileSync("./warnings.json", "UTF8"));

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    }

    warns[warnUser.id].warns++;

    var warnsEmbed = new discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(`The user ${warnUser} Is succesfully warned.`)

    var persoonEmbed = new discord.MessageEmbed()
        .setTitle("Warning")
        .setColor("BLUE")
        .addFields(
            { name: "Server", value: `${message.guild.name}` },
            { name: "Gewarnd door:", value: `${message.author}` },
            { name: "Reden", value: `${reason}` }
        )
        .setTimestamp()

    var embed = new discord.MessageEmbed()
        .setTitle("Warning")
        .setDescription(`**User:** ${warnUser.user.username} (${warnUser.id})
        **Staffmember:** ${message.author}
        **Reasin: ** ${reason}`)
        .setColor("BLUE")
        .addField("Number of warn that the person has", warns[warnUser.id].warns.toString())
        .setTimestamp();

        message.guild.channels.cache.find(i => i.name === 'bot-logs').send({embeds: [embed]})

    message.channel.send({ embeds: [warnsEmbed] })
    warnUser.user.send({ embeds: [persoonEmbed] });

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    })

}
}