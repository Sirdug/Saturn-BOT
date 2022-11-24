const { REST, Routes } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');

require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const prefix = '/';

client.once('ready', () => {
    console.log('Saturn Bot is Online!');
    console.log('Go to https://discord.gg/DAStSDNd to test the bot')
    console.log("Use|  /  | to use the bot")
    client.user.setActivity("Use|  /  | to use the bot")
});

const commands = [
    {
      name: 'ping',
      description: 'Replies with the bots ping!',
    }
  ];
  
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong! `' + client.ws.ping + ' ms`');
    }
  });

client.login(process.env.TOKEN);

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
      console.log('Started refreshing application (/) commands.');
  
      await rest.put(Routes.applicationCommands("1043975638152925305"), { body: commands });
  
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();

  