const DB = require("../models/antiscam-schema");
const { MessageEmbed } = require("discord.js");
module.exports = (client) =>{
    client.on('messageCreate', async(message)=>{
      //provide ids of channel whom u dont want to be anti link
      const channels = []
      const ids = ['852738630862503976']
      if (ids.some((id) => message.author.id.includes(id))) {
        return}
      // console.log(message.member)
      //   if(message.member.permissions.has('ADMINISTRATOR')) return;
        DB.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (!data) return;
            if(err) throw err;
            if (channels.some((channel) => message.channel.id.includes(channel))) {
              return}
            const array = require(`../scam-link.json`);
            if (array.some((word) => message.content.toLowerCase().includes(word))) {
              try {
                
                message.delete();
                const Ex = new MessageEmbed()
                  .setTitle("Scam detected")
                  .setColor('RANDOM')
                  .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
                  .setDescription(`Please don't send any scam messages. Thank you.`)
                  .addField(
                    "User:",
                    `\`\`\`${message.author.tag} (${message.author.id})\`\`\``
                  )
                  .addField("Message Content:", `\`\`\`${message.content}\`\`\``)
                  .setTimestamp();
                
                await message.guild.channels.cache.get(data.Channel).send({embeds: [Ex]});
              }catch (error) {
              return error.msg
              }
            }
          });
        })
}
 
