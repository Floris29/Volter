//Import de nodige variabelen van config.json
const { prefix } = require('../config.json');
const { MessageEmbed, Collection, Permissions } = require('discord.js');

module.exports = {
  //Geef de naam van de command
	name: 'tickethelp',
  //Geef de beschrijving van de command
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

    	//Als er geen arguments zijn meegegeven, geef dan een complete lijst van alle commands. Skip daarna de rest van de code
		if (!args.length) {

			const helpDesc = commands.map(command => '``' + command.name + command.function + '```').join('\n');

			//EMBED
			const embed = new MessageEmbed()
			.setTitle('Here\'s a list of all my ticket commands:')
			.setDescription(helpDesc)
			.setColor('RANDOM')
			.setFooter({text: '\nYou can send ${prefix}help [command name] to get info on a specific command!'});
			return message.channel.send({embeds: [embed]});

		}

    	//Lowercase de gegeven argument en kijk of het command bestaat en of het anders een alias is
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    	//Als het geen command is, zeg dat de command niet geldig is
		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		commandEmbedDesc += `**Name:** ${command.name}\n`;

		//Check of de command data heeft voor de alias, beschrijving of gebruik en voeg deze toe aan het bericht
		if (command.aliases) commandEmbedDesc += `**Aliases:** ${command.aliases.join(', ')}\n`;
		if (command.description) commandEmbedDesc += `**Description:** ${command.description}\n`;
		if (command.usage) commandEmbedDesc += `**Usage:** ${prefix}${command.name} ${command.usage}\n`;
		if (command.options) {

			commandEmbedDesc += `\n*Options:*\n`;

			command.options.forEach(item => {
				commandEmbedDesc += `${item.name}: ${item.description}\n`;
				commandEmbedDesc += `Input type: ${item.type}\nRequired: ${item.required}\n`;

				if (item.choices) {
					commandEmbedDesc += `**Choices:**\n`;

					item.choices.forEach(option => {
						commandEmbedDesc += `**${option.value}:** ${option.name}\n`;
					});
				}

				commandEmbedDesc += `\n`;

			});
		}

		const embed = new MessageEmbed()
			.setTitle(`Here\'s a short explanation of: ${command.name}`)
			.setDescription(commandEmbedDesc)
			.setColor('RANDOM')
			.setFooter({text: '\nYou can send ${prefix}help [command name] to get info on a specific command!'});
		message.reply({ embeds: [embed]});

		
		
	},
};