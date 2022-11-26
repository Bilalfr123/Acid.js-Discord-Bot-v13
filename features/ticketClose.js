const{ createTranscript} = require('discord-html-transcripts')
const {PARENTID,EVERYONEID,TRANSCRIPT} = require('../config.json')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

const DB = require('../models/ticket-schema')
module.exports = (client) =>{
    client.on('interactionCreate', async(interaction)=>{
        //provide ids of staff memebr who can use butttons
        const staffids =['950159869892263967','965806167999807538','949926264121200660']
        if(!interaction.isButton()) return;
        const {guild,channel,customId,member} = interaction
        if(!['lock', 'unlock', 'close'].includes(customId))return;
        if(!member.roles.cache.filter(r => staffids.includes(r.id)) || !member.permissions.has('ADMINISTRATOR') ){
             return interaction.reply({content:'These buttons are staff only',
            ephemeral:true})
           }
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
            const channels = await guild.channels.cache.get(TRANSCRIPT)
            const Message = await channels.send({
                embeds:[Embed2
               .setTitle(`Transcript type: ${docs.Type}`).setFooter({
                text:`Transcript System | Made by  }`,
            }).setTimestamp().setDescription(`Closed by: ${interaction.user.tag} \nID:${docs.TicketID} \n Member: ${MEMBER.user.tag}`).setThumbnail(`${guild.iconURL({dynamic:true})}`)],
               files:[attachment]
            })
            try {
                await interaction.reply({
                    content:'Transcript saved'
                })
                setTimeout(() => {
                channel.delete()
                }, 1000*10);
            } catch (error) {
                console.log(error.msg)
            }
            try {
                await client.users.fetch(MEMBER.id).then((user)=>{
                    const Embed3 = new MessageEmbed()
    .setColor('RED')
                    user.send({
                      embeds:[Embed3.setTitle('Ticket Closed').addField("Ticket-ID:", `${docs.TicketID}`,true).addField("Ticket Reason", `${docs.Type}`,true).addField("Opened By:", `${MEMBER.user.tag}`,true).addField("Closed By:", `${interaction.user.tag}`,true).addField("Transcript:", `[Transcript](${Message.url})`,true)],
                      files:[attachment]
                    })
                })
                
            } catch (error) {
                console.log(error)
            }
    }
    })
    
    })
}