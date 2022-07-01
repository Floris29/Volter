const { prefix } = require('../config.json');
const { MessageEmbed, Collection, Interaction } = require('discord.js');
const discord = require('discord.js')

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[commandName]',
	emotes: '❓',
	
	async execute(message, args, client) {
		const { commands } = message.client;

		const basicCommands = new Collection();
		var commandEmotes = [];

		commands.forEach(command => {
			if (!command.admin) {
				basicCommands.set(command.name, command);
			}
		});

		const helpDesc = basicCommands.map(command => '```' + command.name + ' : ' + command.emotes + '```').join('\n');
		
		const embed = new MessageEmbed()
		.setTitle('Here\'s a list of all my commands:')
		.setDescription(helpDesc)
		.setColor('RANDOM')
		.setFooter({text: '\nClick on one of the emoties to see the whole command usage!'});
		
		message.reply({ embeds: [embed], ephemeral: true });

		basicCommands.forEach( basicCommand => {
			message.react(basicCommand.emotes);
			commandEmotes.push(basicCommand.emotes);
		})

		const filter = (reaction, user) => {
			return commandEmotes.includes(reaction.emoji.name) && `${user.id}`;
		};
		
		const reactions = await message.awaitReactions({ filter, time: 15000 })
		.then(collected => {

			var reactedEmote = "❓";

			collected.forEach( emote => {
				if (emote.count >= 2) {
					reactedEmote = emote
				}
			})

			basicCommands.forEach(command => {
				if (command.emotes == reactedEmote.emoji.name) {
					message.reply(command.name + " command: " + command.description)
				}
					})

		})
	},
};