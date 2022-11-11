const PingCommand = require('./PingCommand')
const GuildLobbyCommand = require('./GuildLobbyCommand')
const ExecuteCommand = require('./ExecuteCommand')
const StatsCommand = require('./StatsCommand')
const WeightCommand = require('./WeightCommand')
const SkillsCommand = require('./SkillsCommand')
const HelpCommand = require('./HelpCommand')
const KillCommand = require('./KillCommand')
const DungeonsCommand = require('./DungeonsCommand')

class CommandHandler {
  constructor(minecraft) {
    this.commands = [
      {
        trigger: ['!help'],
        handler: new HelpCommand(minecraft),
      },
      {
        trigger: ['!ping'],
        handler: new PingCommand(minecraft),
      },
      {
        trigger: ['!guildlobby', '!globby'],
        handler: new GuildLobbyCommand(minecraft),
      },
      {
        trigger: ['!exec'],
        handler: new ExecuteCommand(minecraft),
      },
      {
        trigger: ['!stats'],
        handler: new StatsCommand(minecraft),
      },
      {
        trigger: ['!skills', '!sk'],
        handler: new SkillsCommand(minecraft),
      },
      {
        trigger: ['!weight', '!we'],
        handler: new WeightCommand(minecraft),
      },
      {
        trigger: ['!cata', '!dung'],
        handler: new DungeonsCommand(minecraft),
      },
      {
        trigger: ['!kill'],
        handler: new KillCommand(minecraft),
      },
    ]
  }

  handle(player, message) {
    const commandTrigger = message.toLowerCase().split(' ')[0]

    for (let command of this.commands) {
      for (let trigger of command.trigger) {
        if (trigger == commandTrigger) {
          this.runCommand(command, player, message)

          return true
        }
      }
    }

    return false
  }

  runCommand(command, player, message) {
    console.log(`Minecraft Command Handler > ${player} - [${command.handler.constructor.name}] ${message}`)

    command.handler.onCommand(player, message)
  }
}

module.exports = CommandHandler
