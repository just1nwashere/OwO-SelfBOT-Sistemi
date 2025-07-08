const { Events } = require("discord.js");
const Config = require("../config.json");

module.exports = {
  name: Events.ClientReady,
  once: true,
  run: async (client) => {

    const CHANNEL_ID = [index];
    const channel = await client.channels.fetch(index).catch(() => null);
    if (!channel) return console.error("Kanal bulunamadı!");

    const cooldowns = {
      "owo zoo": 43000,
      "owo hunt": 15000,
      "owo battle": 35000,
      "owo sell all": 60000,
      "owo pray": 120000,
    };
    const sendCommand = async () => {
      if (!client.user || !client.isReady()) return;

      const now = Date.now();
      const availableCommands = commandQueue.filter(
        (cmd) => !nextAvailable[cmd] || now >= nextAvailable[cmd]
      );

      if (availableCommands.length === 0) return;

      const command = availableCommands[Math.floor(Math.random() * availableCommands.length)];
      lastSent = command;

      try {
        await channel.send(command);
        nextAvailable[command] = now + (cooldowns[command] || 15000);
      } catch (err) {
        console.error(`[❌] Komut gönderilemedi: ${err.message}`);
      }
    };

    setInterval(() => {
      sendCommand();
    }, Math.floor(Math.random() * 4000) + 6500); // 6.5s - 10.5s
  },
};
