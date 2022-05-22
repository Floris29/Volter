
const { prefix } = require('../config.json');
const { MessageEmbed, Collection, Permissions } = require('discord.js');

module.exports = {
	name: 'Tickethelp',
	description: 'List of all the ticket commands. including all the other commands',
	aliases: ['thhelp'],
	usage: '[command name]',
	admin: true,
	execute(message, args) {
		var commandEmbedDesc = '';
		const { commands } = message.client;

		if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send("You don't have the permissions to execute this command.")

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

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		commandEmbedDesc += `**Name:** ${command.name}\n`;

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