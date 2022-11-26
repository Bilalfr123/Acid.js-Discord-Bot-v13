const pschema = require ( '../models/punish-schema')
module.exports={category:'moderation',
description:'Bans temporarily',
permissions:['ADMINISTRATOR'],
options: [
    {
        name: 'userid',
        description: 'The user to perform the action on',
        type: 'STRING',
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
        description: 'The duration for user to be banned',
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

const userId = interaction.options.getString('userid')
const duration = interaction.options.getString('duration')
const reason = interaction.options.getString('reason')


const result = await pschema.findOne({
    guildId : guild.id,
    userId,
    type:'ban'
})
if(result){
    await pschema.findByIdAndRemove({
        userId:userId
    })
    console.log('rmoved')
    guild.members.unban(userId)
}
else{
    return `Couldn't find user in database with ${userId}`
}
}
}