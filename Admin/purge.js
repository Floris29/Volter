const { Permissions } = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const Discord = require('discord.js');

module.exports = {
    name: 'purge',
    description: 'Deletes a amount of messages in the chat.',
    admin: true,
    async execute(message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send("You don't have the permissions to execute this command.");
        if(!args[0]) return message.reply("Please enter the amount of messages you wish to delete.");
        if(isNaN(args[0])) return message.reply("The specified charecters are not numbers, please enter a real number.");

        if(args[0] > 100) return message.reply("Enter a valid amount between 2 and 100.");
        if(args[0] < 1) return message.reply("You entered a value below 0, enter a value above 0.");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages, true)
        });

    
    }
} 