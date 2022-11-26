const pschema = require ( '../models/punish-schema')
module.exports={category:'moderation',
description:'Bans temporarily',
permissions:['ADMINISTRATOR'],
options: [
    {
        name: 'user',
        description: 'The user to perform the action on',
        type: 'USER',
        required: true,
    },
    {
        name: 'reason',
        description: `The reason to perform.`,
        type: 'STRING',
        required: true,
    },
    {
        name: 'duration',
        description: 'The duration to be banned e.g 1m,1h,1d',
        type: 'STRING',
        required: true,
    },
],
slash:true,
testOnly:true,
callback:async({member:staff,interaction,guild,client})=>{
if(!guild){
    return 'You can use this only in a server'
}
const user = interaction.options.getMember('user')
const duration = interaction.options.getString('duration')
const reason = interaction.options.getString('reason')
const userId = user.id
if(userId == client.user.id){
    return interaction.reply({
        content:`Can't ban myself`,
        ephemeral:true
    })
}
let time;
let type;
try {
    const split = duration.match(/\d+|\D+/g)
    time = parseInt(split[0])
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
const expiryUnix = Date.now() + time2
const expires = new Date(expiryUnix)
const result = await pschema.findOne({
    guildId : guild.id,
    userId,
    type:'ban'
})
if(result){
  return  `<@${userId}> is already banned from this server.`
}
try{
    await guild.members.ban(userId,{days:7,reason}) //messages to delete
    
    await new pschema({
        userId,
        guildId : guild.id,
        staffId:staff.id,
        reason,
        expires,
        type:'ban'
    }).save()
}
catch(ignored){
return `Can not ban <@${userId}>`
}

 return   `<@${userId}> has been banned for "${duration}"`
}
}