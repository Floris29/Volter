const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const Discord = require('discord.js');
const { MessageEmbed, Collection, Permissions } = require ('discord.js');

module.exports = {

    name: 'ban',
    description: 'bans a specefic member.',
    admin: true,
    usage: "[Target] [Reason] [Messages]",
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
    {
        name: "Messages",
        description: "set a number of days for their messages to delete.",
        type: " STRING",
        required: true,
        choices: [{
                name: "No messages have to get deleted",
                value: "0"
            },
            {
                name: "Delete all messages up to seven days",
                value: "7"
            }
        ]
    }
],

async execute(message, args) {
    const target = message.mentions.members.first();
    const reason = args.slice(1, args.length - 1).join(" ");
    const Amount = args[args.length - 1];
	const permsReason = "Invalid Permissions"
	const neededPermission = Permissions.FLAGS.BAN_MEMBERS;

    console.log("Target: " + reason);

		const embed = new MessageEmbed()
			.setTitle("There is a error executing this command.")
			.setColor("RED")
			.addFields({
				name: "Command:",
				value: this.name
			}, {
				name: "Reason:",
				value: permsReason
			}, {
				name: "Needed Permission:",
				value: "Ban_Members"
			})

		if (!message.member.permissions.has(neededPermission))
			return message.reply({embeds: [embed]}).catch((err) => {console.log(err)});

		if (target.id === message.member.id)
			return message.reply({
				embeds: [new MessageEmbed()
                .setTitle("There is a error executing this command.")
                .setColor("RED")
				.setDescription("Why do you want to ban yourself? Are u crazy? ")
                .setTimestamp()
				],
				ephemeral: true
			});

		if (target.permissions.has(neededPermission)) {
			return message.reply({
				embeds: [new MessageEmbed()
                .setColor("RED")
                .setDescription("You can't ban someone with higher permissions.")]
			});
		}

		const DMEmbed = new MessageEmbed()
			.setTitle(`You are banned from ${message.guild.name}`)
			.setColor('RED')
			.setTimestamp()
			.addFields({
				name: "Reason:",
				value: reason
			}, {
				name: "Banned by:",
				value: message.member.user.toString()
			} );

		await target.send({
			embeds: [DMEmbed]
		}).catch((err) => {
			console.log(err)
		});

}
}