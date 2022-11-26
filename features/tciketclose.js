const{ createTranscript} = require('discord-html-transcripts')
const {TRANSCRIPT} = require('../config.json')
const { MessageEmbed} = require('discord.js')

const DB = require('../models/ticket-schema')
module.exports = (client) =>{
    client.on('interactionCreate', async(interaction)=>{
        const id ='620547628857425920'
         const  user = await client.users.fetch(id)
        if(!interaction.isButton()) return;
        const {guild,channel,customId,member} = interaction
        if(!['lock', 'unlock', 'close'].includes(customId))return;
        if(!member.permissions.has('ADMINISTRATOR'))return interaction.reply({content:'These buttons are staff only',
        ephemeral:true});
    const Embed2 = new MessageEmbed()
    .setColor('GREEN')
    DB.findOne({
    ChannelID:channel.id
    },async(err,docs)=>{
    if(err) throw err;
    if(!docs){
    return interaction.reply({
        content:'No data was found related to this ticket.Please delete manually.',
        ephemeral:true
    })
    }
    switch (customId) {
    case 'lock':
        if(docs.Locked === true){
            return interaction.reply({
                content:'The ticket is already locked.',
                ephemeral:true
            })
        }
           await DB.updateOne({
                ChannelID:channel.id
            },{Locked:true})
            Embed2.setDescription('🔒| The ticket is now locked for reviewing.')
            channel.permissionOverwrites.edit(docs.MemberID,{
                SEND_MESSAGES:false
            })
             interaction.reply({
                embeds:[Embed2]
            })
        break;
        case 'unlock':
            if(docs.Locked === false){
                return interaction.reply({
                    content:'The ticket is already unlocked.',
                    ephemeral:true
                })
            }
               await DB.updateOne({
                    ChannelID:channel.id
                },{Locked:false})
                Embed2.setDescription(' 🔓 | The ticket is now unlocked.')
                channel.permissionOverwrites.edit(docs.MemberID,{
                    SEND_MESSAGES:true
                })
                 interaction.reply({
                    embeds:[Embed2]
                })
            break;
        case 'close':
            if(docs.Closed === true){
                return interaction.reply({
                    content:'The ticket is already closed, Please wait for it to get deleted.',
                    ephemeral:true
                })
            }
            const attachment = await createTranscript(channel,{
                limit:-1, //get every msg
                returnBuffer:false,
                fileName:`${docs.Type}` +  '-' + `${docs.TicketID}` + '.html'
            })
            await DB.updateOne({
                ChannelID:channel.id
            },{Closed:true})
            const MEMBER =guild.members.cache.get(docs.MemberID)
            const Message = await guild.channels.cache.get(TRANSCRIPT).send({
                embeds:[Embed2
            //         .setAuthor({name:`${MEMBER.user.tag}`,
            //    iconURL:`${MEMBER.user.displayAvatarURL({dynamic:true})}`})
               .setTitle(`Transcript type: ${docs.Type}`).setFooter({
                text:`Transcript System | Made by  ${user.tag}`,
            }).setTimestamp().setDescription(`Closed by: ${interaction.user.tag} \nID:${docs.TicketID} \n Member: ${MEMBER.user.tag}`).setThumbnail(`${guild.iconURL({dynamic:true})}`)],
               files:[attachment]
            })
   await interaction.reply({
    embeds:[Embed2.setDescription(`The transcript is now saved [TRANSCRIPT] ${Message.url}`)]
    })
    setTimeout(() => {
    channel.delete()
    }, 1000*10);
    }
    })
    
    })
}