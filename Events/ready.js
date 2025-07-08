const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  run: (client) => {
    console.log(`[✅] Bot aktif: ${client.user.tag}`);
  },
};
