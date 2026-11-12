require('dotenv').config();
const {Client,GatewayIntentBits,REST,Routes}=require('discord.js');
const {initDb}=require('./db');
const {commands}=require('./commands');
const {registerEvents}=require('./events');
const {createDashboard}=require('./dashboard');
for(const k of ['BOT_TOKEN','CLIENT_ID','CLIENT_SECRET','CALLBACK_URL','SESSION_SECRET','DATABASE_URL'])if(!process.env[k]){console.error('Missing environment variable: '+k);process.exit(1);}
const client=new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]});
registerEvents(client);
async function main(){await initDb();const rest=new REST({version:'10'}).setToken(process.env.BOT_TOKEN);const route=process.env.DEV_GUILD_ID?Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.DEV_GUILD_ID):Routes.applicationCommands(process.env.CLIENT_ID);await rest.put(route,{body:commands});console.log('Registered '+commands.length+' NODE commands.');await client.login(process.env.BOT_TOKEN);const app=createDashboard(client);const port=Number(process.env.PORT)||3000;app.listen(port,'0.0.0.0',()=>console.log('NODE dashboard/API listening on '+port));}
main().catch(e=>{console.error('NODE failed to start:',e);process.exit(1);});
