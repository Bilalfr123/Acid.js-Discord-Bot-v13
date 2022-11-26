const pschema = require ( '../models/punish-schema')
module.exports = (client) =>{
    client.on('guildMemberAdd', async(member)=>{
     const result = await pschema.findOne({
         guildId : member.guild.id,
         userId:member.id,
         type:'mute'
     }) //joins and leaves gets mute role
     if(result){
         const mutedRole = member.guild.roles.cache.find((role) => role.name === 'Muted')
 if(mutedRole){
     member.roles.add(mutedRole)
 }
     }
 })
 const check = async()=>{
     const query = {
         expires:{ $lt : new Date()}
     }
     const results = await pschema.find(query)
     for(const result of results){
      const   {guildId,userId,type} = result
      const guild = await client.guilds.fetch(guildId)
      if(!guild){
          console.log(`Guild "${guildId}" no longer uses this bot`)
          continue
      }
      if(type === 'ban'){
          guild.members.unban(userId, 'Ban Expired')
      }
    else  if(type === 'mute'){
     const muteRole =guild.roles.cache.find((role) => role.name === 'Muted')
     if(!muteRole){
         console.log(`Guild "${guildId}" has no longer 'Muted' role`)
         continue
     }
     const member= guild.members.cache.get(userId)
     if(!member){
         continue
     }
     member.roles.remove(muteRole)
    }
     }
     await pschema.deleteMany(query)
     setTimeout(check,1000*60) //check if anyu punishement expired
 }
 check()
 }
