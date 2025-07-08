const { Events } = require("discord.js");
const Config = require("../config.json");

module.exports = {
  name: Events.ClientReady,
  once: true,
  run: async (client) => {
    /* Rainbow yazıyı göstermek için ESM modülü dinamik olarak içe aktar
    const gradient = (await import('gradient-string')).default;
    console.log(gradient.rainbow("OwO Farm Sistemi Başlatıldı!"));*/

    const CHANNEL_ID = Config.selfkanalID;
    const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);
    if (!channel) return console.error("Kanal bulunamadı!");

    const cooldowns = {
      "owo zoo": 43000,
      "owo hunt": 15000,
      "owo battle": 35000,
      "owo sell all": 60000,
      "owo pray": 120000,
    };

    const nextAvailable = {};
    const commandQueue = ["owo hunt", "owo battle", "owo sell all", "owo pray"];
    let lastSent = "";

    // Cooldown kontrolü
    client.on("messageCreate", async (message) => {
      if (message.author.id !== "408785106942164992") return; // OwO bot ID

      if (message.content.includes("Please wait") || message.content.includes("cooldown")) {
        if (lastSent && cooldowns[lastSent]) {
          nextAvailable[lastSent] = Date.now() + cooldowns[lastSent];
          console.log(`[⏳] ${lastSent} cooldown algılandı, bekleniyor...`);
        }
      }
    });

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

    // Otomatik farm döngüsü
    setInterval(() => {
      sendCommand();
    }, Math.floor(Math.random() * 4000) + 6500); // 6.5s - 10.5s
  },
};