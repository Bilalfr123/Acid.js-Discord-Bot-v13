module.exports = {
    category:"Fun",
    description:'Sets bot status',
    slash:true,
    ownerOnly:true,
    testOnly:true,
    options: [
        {
            name: 'text',
            description: 'The status of bot to show',
            type: 'STRING',
            required: true,
        },],
    callback:({client,interaction})=>{
        const text = interaction.options.getString('text')
client.user?.setPresence({
    status:"dnd",
    activities:[{
        name:text,type:"WATCHING"
    }
    ],
})
interaction.reply({
    content:'Status Updated!',
    ephemeral:true
})
}
}