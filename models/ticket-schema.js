const mongoose = require('mongoose')
const ticketSchema = new mongoose.Schema({

    GuildID:String,
    ChannelID:String,
    MemberID:String,
    TicketID:String,
    Closed:Boolean,
    Locked:Boolean,
    Type:String
   });
   module.exports = mongoose.model('role', ticketSchema,'role');