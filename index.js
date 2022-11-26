const DJS = require('discord.js')
const {Intents} = DJS
const path = require('path')
const WOK = require('wokcommands')


require ('dotenv/config')
const client = new DJS.Client({
    intents : [
        Intents.FLAGS.GUILDS ,
        Intents.FLAGS.GUILD_MESSAGES ,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
     Intents.FLAGS.GUILD_MEMBERS,
     Intents.FLAGS.GUILD_VOICE_STATES

    ]
})
client.on('ready' , ()=> {
    console.log('The bot is ready') 
    //whenever client/bot is online 
    let activities = [`Join Origo`, `Best Community`, `Friendly People`   ],i = 0;
    let activities1 = [`PLAYING`, `WATCHING`, `PLAYING`   ],c = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ %  activities.length]}`,  {type:`${activities1[c++ %  activities1.length]}`}), 10000)
new WOK(client, {
    // The name of the local folder for your command files
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    mongoUri:process.env.MONGO_URI,
    dbOptions:{
        keepAlive:true //coneection stay alive as bot is online
    },
    testServers:['945921263472353280'],
    botOwners: ['620547628857425920'],
  })
})



client.login(process.env.Token) //login bot