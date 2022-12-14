const config = process.env

module.exports = {
  server: {
    host: 'mc.hypixel.net',
    port: 25565,
  },
  minecraft: {
    username: 'yourUsername',
    password: 'yourPassword',
    lobbyHolder: 'ignUsername',
    accountType: 'mojang',
  },
  discord: {
    token: 'discordBotToken',
    channel: 'channelId',
    commandRole: 'roleId',
    ownerId: 'ownerId',
    prefix: '!',
  },
}