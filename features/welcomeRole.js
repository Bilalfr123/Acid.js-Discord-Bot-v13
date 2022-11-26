module.exports = (client) =>{
    client.on('guildMemberAdd' , async member =>{
const {guild,id} = member
let role = guild.roles.cache.find(r => r.id === "962939049578995742")

console.log('added')
member.roles.add(role);
    })
}