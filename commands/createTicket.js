const { MessageEmbed,CommandInteraction, MessageActionRow, MessageButton } = require('discord.js')
const {OPENTICKET} = require('../config.json')

module.exports={
    category:'Moderation',
    description:'Setup your ticket message',
    Permissions:['ADMINISTRATOR'],
    slash:true,
    testOnly:true,
    callback:async({interaction,channel,client})=>{
    
        const {guild} =  interaction
       const thumb =guild.iconURL({dynamic:true})
const embed  = new MessageEmbed()
.setAuthor({
    name:`${guild.name} ` + ' | Ticketing System',
    iconURL:`${guild.iconURL({dynamic:true})}`,
})
.setThumbnail(thumb)
.setDescription('Open a ticket to discuss any of the issues listed on the buttons')
.setColor('PURPLE')  
// .setImage('https://ticketsbot.net/assets/img/logo.png')
.setImage('https://cdn.discordapp.com/attachments/983473673384112168/983716890536992819/3aGMjPC.png')
.setTimestamp()
const Buttons = new MessageActionRow()
Buttons.addComponents(
    new MessageButton()
     .setCustomId('player_report')
     .setLabel('Player Report')
     .setStyle("PRIMARY")
     .setEmoji('🎫'),
     new MessageButton()
     .setCustomId('Bug_report')
     .setLabel('Bug Report')
     .setStyle('SECONDARY')
     .setEmoji('🐛'),
     new MessageButton()
     .setCustomId('Other_report')
     .setLabel('Other Report')
     .setStyle('SUCCESS')
     .setEmoji('🔰'),
     )
     await guild.channels.cache.get(OPENTICKET).send({ embeds:[embed] , components:[Buttons],})
    if(interaction){
        interaction.reply({
            content:'Done',
ephemeral:true
        })
    }
    }
}