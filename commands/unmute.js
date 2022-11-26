const pschema = require ( '../models/punish-schema')
module.exports={category:'moderation',
description:'Unmutes the user',
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
],
slash:true,
testOnly:true,
callback:async({member:staff,interaction,guild,client})=>{
if(!guild){
    return 'You can use this only in a server'
}
const user = interaction.options.getMember('user')
const reason = interaction.options.getString('reason')
const userId = user.id
let muteRole = guild.roles.cache.find(r => r.name.toLowerCase() == 'muted');
if(!muteRole){
    return 'The "Muted" role does not exist on this server'
}
const hasRole = user.roles.cache.has(muteRole.id)
console.log(hasRole)
const result = await pschema.findOne({
    guildId : guild.id,
    userId,
    type:'mute'
})
console.log(result)
if(hasRole && result){
    try{
        await user.roles.remove(muteRole)
        result.delete();
        console.log('rmoved')
        return interaction.reply({
            content:`Unmuted the user ${user} and also removed from database`,
            ephemeral:true
        })
    }
    catch(e){
        return `could'nt unmute the ${user}`
    }
}
else if(!hasRole && result){
    try{
        result.delete();
        console.log('rmoved')
        return interaction.reply({
            content:`Unmuted ${user} from database`,
            ephemeral:true
        })
    }
    catch(e){
        return `could'nt unmute ${user} ${e}`
    }
}
else if(hasRole && !result){
    try{
        await user.roles.remove(muteRole)
        return interaction.reply({
            content:`Unmuted the user ${user}`,
            ephemeral:true
        })
    }
    catch(e){
        return `could'nt unmute ${user} ${e}`
    }
}
else if(!hasRole && !result){
    return interaction.reply({
        content:`The user ${user} isnt muted`,
        ephemeral:true
    })
}
}
}