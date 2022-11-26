const DB = require("../models/antiscam-schema");
const { MessageEmbed } = require("discord.js");
module.exports={category:'moderation',
description:'Setup Anti-Scam',
permissions:['ADMINISTRATOR'],
options: [
    {
      name: "setup",
      description: "Anti-Scam Settings",
      type: "SUB_COMMAND",
      options: [
        {
          name: "logs",
          description: "Logs a scam message",
          type: "CHANNEL",
          channelType: ["GUILD_TEXT"],
          required: true,
        },
      ],
    },
    {
      name: "reset",
      description: "Reset your AntiScam system",
      type: "SUB_COMMAND",
    },
  ],
slash:true,
testOnly:true,
callback:async({interaction,client})=>{
    const { guild, options } = interaction;
    const SubCommand = options.getSubcommand();

    switch (SubCommand) {
      case "setup":
        const log = options.getChannel("logs");
        DB.findOne({ Guild: guild.id }, async (err, data) => {
          if (data) data.delete();
          new DB({
            Guild: interaction.guild.id,
            Channel: log.id,
          }).save();
          interaction.reply({
            content: "AntiScam system has been setup.",
            ephemeral: true
          });
        });
        break;
      case "reset":
        DB.findOne({ Guild: guild.id }, async (err, data) => {
          if (!data)
            return interaction.reply({
              embeds: [
                new MessageEmbed()
                  .setDescription("AntiScam system is not setup.")
                  .setColor('RANDOM'),
              ],
              ephemeral: true,
            });

          data.delete();
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor('RANDOM')
                .setDescription("Your AntiScam system has been reset."),
            ],
            ephemeral: true,
          });
        });
        break;
    }
}
}