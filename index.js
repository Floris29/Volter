const { Client, Collection, Intents, MessageAttachment, Message, MessageEmbed } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: 32767, partials: ["MESSAGE", "CHANNEL", "REACTION"] });

//Haal variabelen uit config.json
const { prefix } = require('./config.json');

//Login bij discord met de bot
client.login(process.env.DISCORD_BOT_TOKEN);

//Zodra de bot is opgestart, voer dit uit
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({ status: 'Online' })
	const activities = [
		`in ${client.guilds.cache.size} Servers`
	];
	let i = 0;
	setInterval(() => client.user.setActivity(` ${activities[i++ % activities.length]}`, { type: 'PLAYING' }), 10000); 
	});


  //Set presence naar de gewenste waarden in config.json
 // client.user.setPresence({
   // activities: [{
    //  name: presenceName,
     // type: presenceType,
    //}],
    //status: presenceStatus,
  //});


//Zorg ervoor dat andere bestanden gebruikt kunnen worden voor commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Voeg alle gevonden commands in de folder commands toe aan client
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Zorg ook voor admin commands
const AdminFiles = fs.readdirSync('./Admin').filter(file => file.endsWith('.js'));

for (const file of AdminFiles) {
	const command = require(`./Admin/${file}`);
	client.commands.set(command.name, command);
}

const Ticketfiles = fs.readdirSync('./Tickets').filter(file => file.endsWith('.js'));

for (const file of Ticketfiles) {
	const command = require(`./Tickets/${file}`);
	client.commands.set(command.name, command);
}

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

	//Uncomment if you want to log messages
	//  var logMessage = message.author.toString() + ' used ' + commandName + ' in ' + message.channel.toString();
	//  if (args.length > 0) {
	//    logMessage += ' with the arguments:' + args
	//  }
	//  let logschannel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs').send(logMessage) 
	//  console.log (`logged command by ${message.member.user.toString()} in ${message.guild.name}.`)

  	//Probeer het command uit te voeren, en geef het bericht met de arguments mee
	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.channel.send('There was an error trying to execute that command!');
	}
});

// client.on('guildMemberAdd', member => {
  
// 	const welcomeEmbed = new MessageEmbed()
  
// 	welcomeEmbed.setColor('#5cf000')
// 	welcomeEmbed.setTitle(member.user.username + ' is now member of this beautiful server! \nWe\'ve got now ' + member.guild.memberCount + ' members!')
// 	welcomeEmbed.setImage('https://cdn.discordapp.com/attachments/834116936366817302/948870203138277376/Logo_Volter.png')
  
// 	member.guild.channels.cache.find(i => i.name === 'welcome').send({embeds: [welcomeEmbed]})
  
//   });
  
//   client.on('guildMemberRemove', member => {
  
  
// 	const goodbyeEmbed = new MessageEmbed()
  
// 	goodbyeEmbed.setColor('#f00000')
// 	goodbyeEmbed.setTitle( member.user.username + ' Said goodbye to this server. \nNow we got\ ' + member.guild.memberCount + ' members.');
// 	goodbyeEmbed.setImage('https://cdn.discordapp.com/attachments/834116936366817302/948870203138277376/Logo_Volter.png')
  
// 	member.guild.channels.cache.find(i => i.name === 'greetings').send({embeds: [goodbyeEmbed]})

//   });