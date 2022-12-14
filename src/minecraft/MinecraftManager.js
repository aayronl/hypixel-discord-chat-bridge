const config = require('../../config.js')
const CommunicationBridge = require('../contracts/CommunicationBridge')
const CommandHandler = require('./commands/CommandHandler')
const StateHandler = require('./handlers/StateHandler')
const ErrorHandler = require('./handlers/ErrorHandler')
const ChatHandler = require('./handlers/ChatHandler')
const mineflayer = require('mineflayer')
const chalk = require('chalk')

var Filter = require('bad-words'),
  filter = new Filter()

class MinecraftManager extends CommunicationBridge {
  constructor(app) {
    super()

    this.app = app

    this.stateHandler = new StateHandler(this)
    this.errorHandler = new ErrorHandler(this)
    this.chatHandler = new ChatHandler(this, new CommandHandler(this))
  }

  connect() {
    this.bot = this.createBotConnection()

    this.errorHandler.registerEvents(this.bot)
    this.stateHandler.registerEvents(this.bot)
    this.chatHandler.registerEvents(this.bot)
  }

  createBotConnection() {
    return mineflayer.createBot({
      host: config.server.host,
      port: config.server.port,
      username: config.minecraft.username,
      password: config.minecraft.password,
      version: '1.8.9',
      auth: config.minecraft.accountType,
    })
  }

  onBroadcast({ username, message }) {
    console.log(chalk.blue(`Discord -> Minecraft > ${username}: ${message}`))
    if (this.bot.player !== undefined) {
      username = username ? filter.clean(username) : ''
      message = message ? filter.clean(message) : ''
      this.bot.chat(`/gc ${username}: ${message}`)
    }
  }
}

module.exports = MinecraftManager
