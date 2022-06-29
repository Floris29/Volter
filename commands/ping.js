module.exports = {
	name: 'ping',
	description: 'Gives the ping between the bot and you',
  usage: '[command name]',
  emotes: '📶',
	execute(message) {
    //Stuur een bericht in het kanaal
    message.channel.send('Pinging...').then(m => {
      //Kijk naar het verschil in tijd tussen het bericht van de gebruiker en de bot
      const ping = m.createdTimestamp - message.createdTimestamp;
      //Verander het eerder verstuurde bericht
      m.edit(`**:ping_pong: Pong! Your ping is:**\n${ping}ms`);
    });
  
	}
};