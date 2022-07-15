//Import de nodige variabelen van config.json
const { prefix } = require('../config.json');
const { MessageEmbed, Collection, Permissions } = require('discord.js');

module.exports = {
	name: 'tickethelp',
	description: 'list of all my ticket commands.',
	admin: true,
    function: 'Tickets',
	aliases: ['thelp'],
	usage: '[command name]',
	admin: true,
	execute(message, args, client) {
		var commandEmbedDesc = '';
		const { commands } = message.client;

		if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send("You don't have the permissions to execute this command.")

		if (!args.length) {

			const helpDesc = commands.map(command => '```' + command.name + ' : ' + command.function + '```').join('\n');
			//EMBED
			const embed = new MessageEmbed()
			.setTitle('Here\'s a list of all my commands:')
			.setDescription(helpDesc)
			.setColor('RANDOM')
			.setFooter({text: '\nThis are all the commands. Use .info [command name] to get more info about a command.'});
			return message.channel.send({embeds: [embed]});

		}
	},
};