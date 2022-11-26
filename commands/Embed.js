
const {MessageEmbed } = require("discord.js")

module.exports = {
    category:'Fun',
    description: "Generate a custom embed!",
slash:true,
testOnly:true,
    options: [
        {
            name: "generate",
            description: "Generate a custom embed!.",
            type: "SUB_COMMAND",
            options: [
                { name: "colour", description: "Provide a colour for the embed.", type: "STRING"},
                { name: "title", description: "Provide a title for the embed.", type: "STRING"},
                { name: "author", description: "Provide an author for the embed.", type: "STRING"},
                { name: "description", description: "Provide a description for the embed.", type: "STRING"},
                { name: "thumbnail", description: "Provide a thumbnail for the embed.", type: "STRING"},
                { name: "image", description: "Provide an image for the embed.", type: "STRING"},
                { name: "timestamp", description: "Enable timestamp?", type: "BOOLEAN"},
                { name: "footer", description: "Provide a footer for the embed.", type: "STRING"},
                { name: "fields", description: "name^value^inline (true or false)^^", type: "STRING" }
            ]
        },
        {
            name: "help",
            description: "Tutorial on how to use /embed generate.",
            type: "SUB_COMMAND"
        }
    ],

    callback:(interaction)=>{
        const { options } = interaction;
        const subCommand = options.getSubcommand();

        switch(subCommand) {
            case "generate":
                const eFields     = [[], [], []];
                const splitFields = [];

                
                const colour      = options.getString("colour");
                const title       = options.getString("title");
                const author      = options.getString("author");
                const description = options.getString("description");
                const thumbnail   = options.getString("thumbnail");
                const image       = options.getString("image");
                const timestamp   = options.getBoolean("timestamp");
                const footer      = options.getString("footer");
                let   fields      = options.getString("fields");
            
                const embed       = new MessageEmbed();

                    
            try{
                
                if(thumbnail && thumbnail.includes("http")) embed.setThumbnail(thumbnail);
            }  catch(err){
                return `${err.msg}`
            }        
            try{
                if(image && image.includes("http"))         embed.setImage(image);
            }  catch(err){
                return `${err.msg}`
            }        
                if(colour)                                  embed.setColor(colour.toUpperCase());
                if(title)                                   embed.setTitle(title);
                if(author)                                  embed.setAuthor(author);
                if(description)                             embed.setDescription(description.replaceAll('\\n', '\n'));
                if(timestamp)                               embed.setTimestamp();
                if(footer)                                  embed.setFooter(footer);
                if(fields) {
                    fields = fields.split("^");
                    fields.forEach(e => {
                        if(e.length > 0) {
                            splitFields.push(e.trim())
                        }
                    });
            
                    let x = 0;
                    for (let i = 0; i < splitFields.length; i++) {
                        if(x == 3) x = 0;
                        eFields[x].push(splitFields[i]);
                        x++;
                    }
                        try{

                            for (let i = 0; i < eFields[0].length; i++) {
                                embed.addField(`${eFields[0][i]}`, `${eFields[1][i]}`, JSON.parse(eFields[2][i].toLowerCase()));
                            } 
                        }catch(err){
                           return `${err.msg}`
                        }
                } 

                if(!embed.title && !embed.description && !embed.fields[0]) {
                    embed.setDescription("You have not provided valid options!")
                }
              return embed  
            
            break;
            case "help":
                const help = new MessageEmbed()
                    .setTitle("/Embed Help")
                    .setColor("GREEN")
                    .setDescription("To send an embed you must provide at least a title, a description or a field.\n\nMost of the commands are fairly self explanitory except the fields command.\nIn order to send fields you must follow the following format:\n\n`name^value^inline^^`\n\nFor example, sending `Name^Dark^True^^ Age^18^True^^ Interests^Development, Gaming and Coding^False^^` would send:")
                    .addFields(
                        {name: "Name", value: "Dark", inline: true},
                        {name: "Age", value: "18", inline: true},
                        {name: "Interests", value: "Development, Gaming and Coding", inline: false}
                    )    
               return help
            break;
        }
    }
}


//you must provide all the field values else error or if wrong link put