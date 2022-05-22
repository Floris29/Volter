const { Client, Collection, Intents, MessageAttachment, Message, MessageEmbed } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: 32767, partials: ["MESSAGE", "CHANNEL", "REACTION"] });

//Haal variabelen uit config.json
const { prefix, presenceName, presenceType, presenceStatus } = require('./config.json');

//Login bij discord met de bot
client.login(process.env.DISCORD_BOT_TOKEN);

//Zodra de bot is opgestart, voer dit uit
client.on('ready', () => {

	console.log(`Logged in as ${client.user.tag}!`);

  //Set presence naar de gewenste waarden in config.json
  client.user.setPresence({
    activities: [{
      name: presenceName,
      type: presenceType,
    }],
    status: presenceStatus,
  });

})

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
	 var logMessage = message.author.toString() + ' used ' + commandName + ' in ' + message.channel.toString();
	 if (args.length > 0) {
	   logMessage += ' with the arguments:' + args
	 }
	 let logschannel = message.guild.channels.cache.find(channel => channel.name === 'bot-logs').send(logMessage) 
	 console.log (`logged messages in ${message.guild.name}.`)

	 //client.on('messageDelete', async (messageDeleted, error) => {
	 //var berichtenEmbed = new discord.MessageEmbed()
	 //.setAuthor(`${messageDeleted.author.tag}`, `${messageDeleted.author.avatarURL({ size: 4096 })}`)
	 //.addFields(
		// { name: 'Message made by', value: `<@${messageDeleted.author.id}>` },
		 //{ name: 'Message', value: `${content}` },
		 //{ name: "Message id", value: `${messageDeleted.id}` },
		 //{ name: "Deleted messages in", value: `${messageDeleted.channel}` }
	 //)
	 //.setTimestamp()
	 //.setColor('RANDOM')

 const channel = client.channels.cache.find(c => c.name == "bot-logs");
 if(!channel) {
	return message.channel.send("There is no channel called suggestions")
  }

 if (!channel) return;

 channel.send({ embeds: [berichtenEmbed] })

});

  	//Probeer het command uit te voeren, en geef het bericht met de arguments mee
	try {
		command.execute(message, args, client);
	} catch (error) {
		//Gaat er iets fout, zet dan de error in de console en zeg in de chat dat er iets fout is gegaan
		console.error(error);
		message.channel.send('There was an error trying to execute that command!');
	}

client.on('guildMemberAdd', member => {
  
	const welcomeEmbed = new MessageEmbed()
  
	welcomeEmbed.setColor('#5cf000')
	welcomeEmbed.setTitle(member.user.username + ' is now member of this beautiful server! \nWe\'ve got now ' + member.guild.memberCount + ' members!')
	welcomeEmbed.setImage('https://cdn.discordapp.com/attachments/834116936366817302/948870203138277376/Logo_Volter.png')
  //This const is so you don't get the error!
	const channel = member.guild.channels.cache.find((i) => (i.name === 'welcome').send({embeds: [welcomeEmbed]}))
	if(!channel) {
		return message.channel.send("There is no channel called suggestions")
	  }
  
  });
  
  client.on('guildMemberRemove', member => {
  
  
	const goodbyeEmbed = new MessageEmbed()
  
	goodbyeEmbed.setColor('#f00000')
	goodbyeEmbed.setTitle( member.user.username + ' Said goodbye to this server. \nNow we got\ ' + member.guild.memberCount + ' members.');
	goodbyeEmbed.setImage('https://cdn.discordapp.com/attachments/834116936366817302/948870203138277376/Logo_Volter.png')
  //This const is so you don't get the error!
	const channel = member.guild.channels.cache.find((i) => (i.name === 'greetings').send({embeds: [goodbyeEmbed]}))
	if(!channel) {
		return message.channel.send("There is no channel called suggestions")
	  }


  });