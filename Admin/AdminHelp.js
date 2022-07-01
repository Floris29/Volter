//Import de nodige variabelen van config.json
const { prefix } = require('../config.json');
const { MessageEmbed, Collection, Permissions } = require('discord.js');

module.exports = {
  //Geef de naam van de command
	name: 'adminhelp',
  //Geef de beschrijving van de command
	description: 'List all of all the commands or info about a specific command. This includes admin commands.',
  //Geef de verschillende aliassen dat de command heeft
	aliases: ['ahelp'],
  //Laat zien hoe het command gebruikt moet worden
	usage: '[command name]',
	admin: true,
	execute(message, args, client) {
		var commandEmbedDesc = '';
		const { commands } = message.client;

		//TODO: Welke perm moet dit hebben?
		if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send("You don't have the permissions to execute this command.")

    	//Als er geen arguments zijn meegegeven, geef dan een complete lijst van alle commands. Skip daarna de rest van de code
		if (!args.length) {

			const helpDesc = commands.map(command => '**' + command.name + '**').join('\n');

			//EMBED
			const embed = new MessageEmbed()
			.setTitle('Here\'s a list of all my admin commands:')
			.setDescription(helpDesc)
			.setColor('RANDOM')
			.setFooter({text: '\nYou can send ${prefix}help [command name] to get info on a specific command!'});
			return message.channel.send({embeds: [embed]});

		}

    	//Lowercase de gegeven argument en kijk of het command bestaat en of het anders een alias is
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