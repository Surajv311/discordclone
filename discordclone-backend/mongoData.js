const mongoose = require("mongoose");

// we will define our schema ...
// channels// messages.....

const discordSchema = mongoose.Schema({
  channelName: String,
  conversation: [
    {
      message: String,
      timestamp: String,
      user: {
        displayName: String,
        email: String,
        photo: String,
        uid: String,
      },
    },
  ],
});

// collection name : conversations...
module.exports = mongoose.model("conversations", discordSchema);
