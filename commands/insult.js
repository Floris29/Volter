const axios = require('axios');

module.exports = {
	name: 'insult',
	description: 'Will give a random insult',
    usage: '[command name]',
	execute(message) {
        try {

            //De url waar de api call naar gedaan moet worden
            const url = 'https://insult.mattbas.org/api/insult';
            
            //Haal data via axios op en stuur het naar de gebruiker
            axios.get(url).then((response) => {
                message.reply(response.data);
            });

        } catch (error) {
            console.log(error);
        }
        
	},
};