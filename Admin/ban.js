//TODO clean up the code
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const Discord = require('discord.js');
const { MessageEmbed, Collection, Permissions } = require ('discord.js');

module.exports = {

    name: 'ban',
    description: 'bans a specefic member.',
    admin: true,
	function: 'Admin',
    options: [{

        name: "Target",
        description: "add a user to ban.",
        type: "USER",
        required: true
    }, 
    {
        name: "Reason",
        description: "add the reason why you wanna ban someone.",
        type: "STRING",
        required: true
    },
],
async execute(message, args, client) {
    const target = message.mentions.members.first();
    const reason = args.slice(1, args.length - 1).join(" ");

		console.log("Target: " + reason);

		const embed = new MessageEmbed()
			.setTitle("There seems to be a error to execute this command")
			.setColor("RED")
			.setDescription("Are you sure you got the right permission? And are you providing a reason?")

			if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
			return message.reply({embeds: [embed]}).catch((err) => {console.log(err)});

		if (target.id === message.member.id)
			return message.reply("You can't ban yourself!")
			.then((m) => {
                setTimeout(() => {
                    m.delete();
                }, 14000);
            });

		if (target.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			return message.reply("You can't ban this user!")
			.then((m) => {
                setTimeout(() => {
                    m.delete();
                }, 14000);
            });
		}

		message.guild.bans.create(target, {
			reason: reason
		})

		const DMEmbed = new MessageEmbed()
			.setTitle(`You've Been banned From ${message.guild.name}`)
			.setColor('RED')
			.setTimestamp()
			.addFields({
                name: "Reason:",
                value: reason.replace(/\s/g, '') == "" ? "Not Provided" : reason,
            },{
				name: "Banned By:",
				value: message.member.user.toString()
			} );

		target.send({
			embeds: [DMEmbed]
		}).catch((err) => {
			console.log(err)
		});


	}
}