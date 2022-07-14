//Import de nodige variabelen van config.json
const { prefix } = require('../config.json');
const { MessageEmbed, Collection, Permissions } = require('discord.js');

module.exports = {
  //Geef de naam van de command
	name: 'adminhelp',
  //Geef de beschrijving van de command
	description: 'list of admin commands.',
	aliases: ['ahelp'],
	usage: '[command name]',
	admin: true,
	function: 'Admin',
	execute(message, args, client) {
		var commandEmbedDesc = '';
		const { commands } = message.client;

		if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send("You don't have the permissions to execute this command.")

    	//Als er geen arguments zijn meegegeven, geef dan een complete lijst van alle commands. Skip daarna de rest van de code
		if (!args.length) {

			const helpDesc = commands.map(command => '```' + command.name + ' : ' + command.function + '```').join('\n');

			//EMBED
			const embed = new MessageEmbed()
			.setTitle('Here\'s a list of all my admin commands:')
			.setDescription(helpDesc)
			.setColor('RANDOM')
			.setFooter({text: '\nYou can send ${prefix}help [command name] to get info on a specific command!'});
			return message.channel.send({embeds: [embed]});

		}
	},
};