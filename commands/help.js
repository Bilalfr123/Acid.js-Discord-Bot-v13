const { MessageEmbed,MessageButton,MessageActionRow} = require("discord.js");
const Discord = require('discord.js')
module.exports ={
    category:'Moderation',
    description:'Help command',
    slash:true,
    testOnly:true,
    callback:async({interaction,client})=>{
        //change this by your command handler if you have any questions or need help just dm me.
        const Invite = new MessageEmbed()
        .setTitle("**📋 Need Help? Here are of my commands**")
        .setDescription("**General Commands** \n `/reminder` sets a reminder. \n `/suggest` Make a suggestion that will be sent in specific channel set by admins for voting and gets approved/declined. \n `/embedGen,help` Creates custom embed. \n `/setSugestion Help` Displays help menu for suggestion system(Branch Commands). \n\n **Admin Commands** \n  `/requiredRole` Use this to specify what commands can be used by people having role you mention. \n `/ban,/unban` Bans and unbans members. \n `/Mute,/Unmute` Mutes and umnutes member. \n `/setAntiScamSetup` Sets the channel where logs will be sent. \n `/setSuggestion` All branch commands can be seen in help menu of /setSuggestion Help. \n  `/suggeestionAccept/Decline/Delete` Approves,declines the suggestions suggested by people and only admins/suggestion managers(set by setSuggestion Manager command) can do this. \n `/createTicket` Creates ticket where people through which people will open them. \n `/channelOnly` Makes a command can be used in specific channel. \n `/Language` Sets up bot language.  \n `/Slash` See commands that bot and delete them. \n `/Prefix` Sets up prefix for legacy commands.\n\n")
        .setColor("#2e70ea")

        const cButtons = new MessageActionRow();
        cButtons.addComponents(
            new MessageButton().setURL("https://discord.gg").setLabel("Support Server").setStyle("LINK"),
        );

        return interaction.reply({embeds: [Invite], components: [cButtons]})
    }
    }
