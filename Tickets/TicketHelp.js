
const { prefix } = require('../config.json');
const { MessageEmbed, Collection, Permissions } = require('discord.js');

module.exports = {
	name: 'tickethelp',
	description: 'List of all the ticket commands. including all the other commands',
	aliases: ['thelp'],
	usage: '[command name]',
	tickets: true,
	execute(message, args) {
		var commandEmbedDesc = '';
		const { commands } = message.client;

		if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.channel.send("You don't have the permissions to execute this command.")

		if (!args.length) {

			const helpDesc = commands.map(command => '**' + command.name + '**').join('\n');

			const embed = new MessageEmbed()
			.setTitle('Here\'s a list of all the commands for the ticket function:')
			.setDescription(helpDesc)
			.setColor('RANDOM')
			.setFooter({text: '\nYou can send ${prefix}help [command name] to get info on a specific command!'});
			return message.channel.send({embeds: [embed]});

		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));


		const embed = new MessageEmbed()
			.setTitle(`Here\'s a short explanation of: ${command.name}`)
			.setDescription(commandEmbedDesc)
			.setColor('RANDOM')
			.setFooter({text: '\nYou can send ${prefix}help [command name] to get info on a specific command!'});
		message.reply({ embeds: [embed]});

		
		
	},
};