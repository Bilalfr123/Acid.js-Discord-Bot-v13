
const suggestDB = require("../models/suggest-schema");
const suggestSetupDB = require("../models/suggestSetup-schema");

module.exports = (client) =>{
    client.on('messageDelete', async(message)=>{

    const suggestSetup = await suggestSetupDB.findOne({ GuildID: message.guild.id });
    if(!suggestSetup) return;
    
    const suggestion = await suggestDB.findOne({GuildID: message.guild.id, MessageID: message.id});
    if(!suggestion) return;

    return suggestDB.deleteOne({GuildID: message.guild.id, MessageID: message.id})
  })
}
