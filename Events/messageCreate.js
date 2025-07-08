const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  run: async (message) => {
    if (message.author.bot) return;

    // Basit bir komut örneği
    if (message.content === "!ping") {
      await message.reply("Pong!");
    }
  },
};
