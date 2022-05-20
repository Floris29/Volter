const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const Discord = require('discord.js');
const { MessageEmbed, Collection, Permissions } = require ('discord.js');


module.exports = {
	name: 'kick',
	description: 'Kicks a specific member',
    admin: true,
	usage: "[Target] [Reason] [Messages]",
	options: [{
			name: "Target",
			description: "Provide A User To Kick.",
			type: "USER",
			required: true
		},
		{
			name: "Reason",
			description: "Provide A Reason For The Kick.",
			type: "STRING",
			required: true
		}
	],

	async execute(message, args) {
		const target = message.mentions.members.first();
		const reason = args.slice(1, args.length - 1).join(" ");
		const permsReason = "Invalid Permissions"
		const neededPermission = Permissions.FLAGS.KICK_MEMBERS;

		console.log("Target: ");

		const embed = new MessageEmbed()
			.setTitle("There seems to be a error to execute this command")
			.setColor("RED")
			.addFields({
				name: "Command:",
				value: this.name
			}, {
				name: "Reason:",
				value: permsReason
			}, {
				name: "Needed Permissions:",
				value: "Kick_Members"
			})

		if (!message.member.permissions.has(neededPermission))
			return message.reply({embeds: [embed]}).catch((err) => {console.log(err)});

		if (target.id === message.member.id)
			return message.reply({
				embeds: [new MessageEmbed()
				.setTitle("There seems to be a error to execute this command")
				.setColor("RED")
				.setDescription("Why would you kick yourself?")
				],
				ephemeral: true
			});

		if (target.permissions.has(neededPermission)) {
			return message.reply({
				embeds: [new MessageEmbed()
				.setColor("RED")
				.setDescription("❌ You Can't Kick An Admin ❌")]
			});
		}

		const DMEmbed = new MessageEmbed()
			.setTitle(`You've Been Kicked From ${message.guild.name}`)
			.setColor('RED')
			.setTimestamp()
			.addFields({
				name: "Reason:",
				value: reason
			}, {
				name: "Kicked By:",
				value: message.member.user.toString()
			} );

		await target.send({
			embeds: [DMEmbed]
		}).catch((err) => {
			console.log(err)
		});


	}
}