const Discord = require('discord.js');

module.exports = {
	name: 'uptime',
	description: 'The time the bot has stayed alive without crashing',
        usage: '[command name]',
	execute(message, args, client) {

        //Bereken het totaal aantal seconden
        let totalSeconds = (client.uptime / 1000);
        //Bereken het aantal dagen
        const days = Math.floor(totalSeconds / 86400);
        //Haal de seconden weg die zijn meegteld bij de dagen aan de hand van modulo
        totalSeconds %= 86400;
        //Bereken het aantal uren
        const hours = Math.floor(totalSeconds / 3600);
        //Haal de seconden weg die zijn meegteld bij de uren aan de hand van modulo
        totalSeconds %= 3600;
        //Bereken het aantal minuten
        const minutes = Math.floor(totalSeconds / 60);
        //Bereken het aantal seconden
        const seconds = Math.floor(totalSeconds % 60);

        //Maak een embed met de berekende data
        const embed = new Discord.MessageEmbed()
           .setTitle('Uptime')
           .addField('Days', `${days}`)
           .addField('Hours', `${hours}`)
           .addField('Minutes', `${minutes}`)
           .addField('Seconds', `${seconds}`)
           .setColor('RANDOM');
        message.reply({embeds: [embed]});
        
	},
        
};