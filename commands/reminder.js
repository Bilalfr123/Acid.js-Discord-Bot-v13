const { MessageEmbed} = require("discord.js");
module.exports ={
    category:'Moderation',
    description:'Mutes temporarily',
    options: [
        {
            name: 'duration',
            description: 'The time after which you will be reminded e.g 1m,1h,1d',
            type: 'STRING',
            required: true,
        },
        {
            name: 'reminder',
            description: `The reminder you nwant to set.`,
            type: 'STRING',
            required: true,
        },
    ],
    slash:true,
    testOnly:true,
    callback:async({interaction,client})=>{
        const duration = interaction.options.getString('duration')
        const reminder = interaction.options.getString('reminder')
        let time;
let type;
try {
    const split = duration.match(/\d+|\D+/g)
    time = parseInt(split[0])
    console.log(time)
    type = split[1].toLowerCase()
} catch (e) {
    return `Invalid time format! Example format: \"10d\" where 'd' = days' , h = 'hours' and 'm' = minutes.`
}
if(type === "h"){
    time *=60
}
else if(type === "d"){
    time *=60*24
}
else if(type !== "m"){
   return 'Please use "m","h","d" for minutes,hours and days respectively'
}
const time2 =60000*time
            // Executing
            const muteEmbedServer = new MessageEmbed()
            .setAuthor({name:'Reminder set!', 
            iconURL:`${interaction.user.displayAvatarURL()}`}
            )
              .setDescription(`Successfully Set ${interaction.user.tag}'s reminder!`)
              .addField('❯ Remind You In:', `${duration}`)
              .addField('❯ Remind reason', `${reminder}`)
              .setColor('BLUE')
              .setTimestamp()

            interaction.reply({
                embeds:[muteEmbedServer]})
            console.log(`${interaction.user.tag}'s Reminder has started! Reminding him/her in ${duration}`)
        
            setTimeout(async function () {
              console.log(`${interaction.user.tag}'s Reminder has finished! I've successfullying reminded him!`)
        
              interaction.channel.send(`<@${interaction.user.id}> Here is your reminder!`)
              const reminderEmbed = new MessageEmbed()
                .setAuthor({name:'Reminder Alert!', 
                iconURL:`${interaction.user.displayAvatarURL()}`}
                )
                .setDescription(`${interaction.user.tag} Here is your reminder!`)
                .setColor('BLUE')
                .addField('❯ Remind reason', `${reminder}`)
                .setTimestamp()
    
        
              interaction.channel.send({embeds:[reminderEmbed]})

        
        
            }, (time2));
    }
    }
