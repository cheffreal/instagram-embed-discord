const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Map();
client.events = new Map();

// BUNLAR EVENT TM BB
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// İNSTAGRAM YARRAK İŞLEVİ YÜKLEME 
const checkInstagramPost = require('./tasks/checkInstagramPost');

client.once('ready', () => {
    checkInstagramPost(client);
    cron.schedule('*/5 * * * *', () => {
        checkInstagramPost(client);
    });
});

client.login(config.token);

// BU ARADA BOTCU OLAN ERTUCUK @ertu GÖTÜNDEN SİKEİYM BUNU BOT YAPA YAPA KAFAYI YEDİ ADAM AMK