const pschema = require ( '../models/punish-schema')
module.exports={category:'moderation',
description:'Unbans the user',
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
],
slash:true,
testOnly:true,
callback:async({member:staff,interaction,guild,client})=>{
if(!guild){
    return 'You can use this only in a server'
}
const userId = interaction.options.getString('userid')
const reason = interaction.options.getString('reason')
const banList = await guild.bans.fetch();
const banUser = await banList.find(b => b.user.id == userId);
const result = await pschema.findOne({
    guildId : guild.id,
    userId,
    type:'ban'
})
if(banUser && result){
    try{
        await guild.members.unban(userId)
        result.delete();
        console.log('rmoved')
        return interaction.reply({
            content:`Unbanned the user with id ${userId} and also removed from database`,
            ephemeral:true
        })
    }
    catch(e){
        return `could'nt unban user with id ${userId}`
    }
}
else if(banUser && !result){
    try{
        await guild.members.unban(userId)
        return interaction.reply({
            content:`Unbanned the user with id ${userId}`,
            ephemeral:true
        })
    }
    catch(e){
        return `could'nt unban user with id ${userId}`
    }
}
else if(!banUser && result){
    try{
        result.delete();
        console.log('rmoved')
        return interaction.reply({
            content:`Unbanned the user with id ${userId} from database`,
            ephemeral:true
        })
    }
    catch(e){
        return `could'nt unban user with id ${userId}`
    }
}
else if(!banUser && !result){
    return interaction.reply({
        content:`The user with id ${userId} isnt banned`,
        ephemeral:true
    })
}
}
}