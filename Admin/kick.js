const { Client, Intents } = require('discord.js');
const discord = require('discord.js');
const { MessageEmbed, Collection, Permissions } = require ('discord.js');


module.exports = {
	name: 'kick',
	description: 'Kicks a specific member',
    admin: true,
	function: 'Admin',
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

	async execute(message, args, client) {
		const target = message.mentions.members.first();
		const reason = args.slice(1, args.length - 1).join(" ");

		console.log("Target: ");

		const embed = new MessageEmbed()
			.setTitle("There seems to be a error to execute this command")
			.setColor("RED")
			.setDescription("Are you sure you got the right permission? And are you providing a reason?")

			if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
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

			if (target.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
			return message.reply({
				embeds: [new MessageEmbed()
				.setColor("RED")
				.setDescription("You can't kick this person.")]
			});
		}

		target.kick()

		const DMEmbed = new MessageEmbed()
			.setTitle(`You've Been Kicked From ${message.guild.name}`)
			.setColor('RED')
			.setTimestamp()
			.addFields({
                name: "Reason:",
                value: reason.replace(/\s/g, '') == "" ? "Not Provided" : reason,
            },{
				name: "Kicked By:",
				value: message.member.user.toString()
			} );

		target.send({
			embeds: [DMEmbed]
		}).catch((err) => {
			console.log(err)
		});


	}
}