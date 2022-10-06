//TODO clean up the code
const { Client, Collection, Intents, MessageAttachment, Message, MessageEmbed } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: 32767, partials: ["MESSAGE", "CHANNEL", "REACTION"] });

//Haal variabelen uit config.json
const { prefix, presenceName, presenceType, presenceStatus } = require('./config.json');

//Login bij discord met de bot
client.login(process.env.DISCORD_BOT_TOKEN);

//Zodra de bot is opgestart, voer dit uit
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({
   activities: [{
     name: presenceName,
     type: presenceType,
    }],
    status: presenceStatus,
  });
	});


//Commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Admin
const AdminFiles = fs.readdirSync('./Admin').filter(file => file.endsWith('.js'));

for (const file of AdminFiles) {
	const command = require(`./Admin/${file}`);
	client.commands.set(command.name, command);
}
//Tickets
const Ticketfiles = fs.readdirSync('./Tickets').filter(file => file.endsWith('.js'));

for (const file of Ticketfiles) {
	const command = require(`./Tickets/${file}`);
	client.commands.set(command.name, command);
}




var logMessage = message.author.toString() + ' used ' + commandName + ' in ' + message.channel.toString();
if (args.length > 0) {
logMessage += ' with the arguments:' + args
}
let logschannel = message.guild.channels.cache.find(channel => channel.id === '1027589173718298675').send() 
console.log (`logged command by ${message.member.user.toString()} in ${message.guild.name}.`)

client.on('messageCreate', message => {

  	//Check of het bericht een prefix heeft en dat het het bericht niet van een bot af komt. Is dit zo, skip dan de rest van de code
	if (!message.content.startsWith(prefix) || message.author.bot) return;

  	//Scheid de command van de arguments
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	//Check of de gegeven command bestaat, en of de command misschien een alias is. Is dit niet, skip de rest van de code
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

  	//Probeer het command uit te voeren, en geef het bericht met de arguments mee
	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.channel.send('There was an error trying to execute that command!');
	}
});