
const {PARENTID,EVERYONEID} = require('../config.json')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

const DB = require('../models/ticket-schema')
module.exports = (client) =>{
    client.on('interactionCreate', async(interaction)=>{
        if(!interaction.isButton()) return;
        const {guild,customId,member} = interaction
        if(!['player_report', 'Bug_report', 'Other_report'].includes(customId))return;
        //provide ids of roles to be mentioned as well people with these will be able to see tciket after it is is created
        let bugReportStaff = guild.roles.cache.find(r => r.id == '945936040257011822');
        let playerReportStaff =guild.roles.cache.find(r => r.id == '962939049578995742');
        let otherReportStaff = guild.roles.cache.find(r => r.id == '945935797327126610');
        const ID = Math.floor(Math.random() * 90000) + 10000
        const Embed = new MessageEmbed()
        .setAuthor({
            name:`${guild.name} | Ticket : ${ID}` ,
            iconURL:`${guild.iconURL({dynamic:true})}`,
        })
        .setDescription('Please wait patiently for a response from the staff,in the mean-while, describe your issue in as much as detail')
        .setFooter({
            text:`The buttons below are staff only buttons. \nTicketing System | Requested by ${interaction.user.tag}  `,
        })
        .setThumbnail(`${interaction.user.displayAvatarURL({dynamic:true})}`)
        .setTimestamp()
        const Buttonss = new MessageActionRow()
        Buttonss.addComponents(
            new MessageButton()
             .setCustomId('close')
             .setLabel('Save & Close')
             .setStyle("PRIMARY")
             .setEmoji('📫'),
             new MessageButton()
             .setCustomId('lock')
             .setLabel('Lock')
             .setStyle('SECONDARY')
             .setEmoji('🔐'),
             new MessageButton()
             .setCustomId('unlock')
             .setLabel('Unlock')
             .setStyle('SUCCESS')
             .setEmoji('🔓'),
             )
if(customId == 'player_report'){

    await guild.channels.create(`${customId} - ${ID}}` , {
        type:'GUILD_TEXT',
        parent:PARENTID,
        permissionOverwrites:[{
            id:member.id,
            allow:['SEND_MESSAGES','VIEW_CHANNEL','READ_MESSAGE_HISTORY']
        },
    {
        id:EVERYONEID,
        deny:['SEND_MESSAGES','VIEW_CHANNEL','READ_MESSAGE_HISTORY']
    },
    {
        id:playerReportStaff.id, //here put role id
        allow:['SEND_MESSAGES','VIEW_CHANNEL','READ_MESSAGE_HISTORY']
    }]
    }).then(async(channel)=>{
        await DB.create({
            GuildID:guild.id,
        ChannelID:channel.id,
        MemberID:member.id,
        TicketID:ID,
        Closed:false,
        Locked:false,
        Type:customId
        })
         channel.send({
             embeds:[Embed],
             components:[Buttonss]
         })
        await channel.send({
            content:`${playerReportStaff} a new ticket has been created!`
         }).then((m)=>{
            setTimeout(() => {
                m.delete().catch(()=>{})
            },1000*2)
        })
             try {
                return interaction.reply({
                   custom:true,
                   content:`${member} your ticket has been created : ${channel}`,
                   ephemeral:true
               })
             } catch (error) {
                 console.log(error.msg)
             }
         
    })
}
else if(customId == 'Bug_report'){
    
    await guild.channels.create(`${customId} - ${ID}}` , {
        type:'GUILD_TEXT',
        parent:PARENTID,
        permissionOverwrites:[{
            id:member.id,
            allow:['SEND_MESSAGES','VIEW_CHANNEL','READ_MESSAGE_HISTORY']
        },
    {
        id:EVERYONEID,
        deny:['SEND_MESSAGES','VIEW_CHANNEL','READ_MESSAGE_HISTORY']
    },
    {
        id:bugReportStaff.id,
        allow:['SEND_MESSAGES','VIEW_CHANNEL','READ_MESSAGE_HISTORY']
    }]
}).then(async(channel)=>{
        await DB.create({
            GuildID:guild.id,
            ChannelID:channel.id,
            MemberID:member.id,
        TicketID:ID,
        Closed:false,
        Locked:false,
        Type:customId
        })
         channel.send({
             embeds:[Embed],
             components:[Buttonss]
         })
        await channel.send({
            content:`${bugReportStaff} a new ticket has been created!`
         }).then((m)=>{
            setTimeout(() => {
                m.delete().catch(()=>{})
            },1000*2)
        })
         try {
                return interaction.reply({
                   custom:true,
                   content:`${member} your ticket has been created : ${channel}`,
                   ephemeral:true
                })
            } catch (error) {
                 console.log(error.msg)
             }
         
            })
        }
        else if(customId == 'Other_report'){
        
            await guild.channels.create(`${customId} - ${ID}}` , {
                type:'GUILD_TEXT',
                parent:PARENTID,
                permissionOverwrites:[{
                    id:member.id,
                    allow:['SEND_MESSAGES','VIEW_CHANNEL','READ_MESSAGE_HISTORY']
                },
            {
                id:EVERYONEID,
                deny:['SEND_MESSAGES','VIEW_CHANNEL','READ_MESSAGE_HISTORY']
            },
            {
                id:otherReportStaff.id,
                allow:['SEND_MESSAGES','VIEW_CHANNEL','READ_MESSAGE_HISTORY']
            }]
            }).then(async(channel)=>{
                await DB.create({
                    GuildID:guild.id,
                ChannelID:channel.id,
                MemberID:member.id,
                TicketID:ID,
                Closed:false,
                Locked:false,
                Type:customId
                })
                 channel.send({
                     embeds:[Embed],
                     components:[Buttonss]
                 })
                await channel.send({
                    content:`${otherReportStaff} a new ticket has been created!`
                 }).then((m)=>{
                    setTimeout(() => {
                        m.delete().catch(()=>{})
                    },1000*2)
                })
                     try {
                        return interaction.reply({
                           custom:true,
                           content:`${member} your ticket has been created : ${channel}`,
                           ephemeral:true
                       })
                     } catch (error) {
                         console.log(error.msg)
                     }
                 
            })
        }
})
}