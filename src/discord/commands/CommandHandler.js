const RelogCommand = require(`./RelogCommand`)
const HelpCommand = require(`./HelpCommand`)
const InviteCommand = require(`./InviteCommand`)
const KickCommand = require(`./KickCommand`)
const PromoteCommand = require(`./PromoteCommand`)
const DemoteCommand = require(`./DemoteCommand`)
const ExecuteCommand = require(`./ExecuteCommand`)
const MuteCommand = require(`./MuteCommand`)

const config = require(`../../../config.js`)
const prefix = config.discord.prefix

const chalk = require('chalk')
const ExitCommand = require('./ExitCommand')

class CommandHandler {
  constructor(discord) {
    this.commands = [
      {
        trigger: [`${prefix}relog`, `${prefix}r`],
        handler: new RelogCommand(discord),
      },
      {
        trigger: [`${prefix}exit`],
        handler: new ExitCommand(discord),
      },
      {
        trigger: [`${prefix}help`, `${prefix}h`],
        handler: new HelpCommand(discord),
      },
      {
        trigger: [`${prefix}invite`, `${prefix}inv`, `${prefix}i`],
        handler: new InviteCommand(discord),
      },
      {
        trigger: [`${prefix}kick`, `${prefix}k`],
        handler: new KickCommand(discord),
      },
      {
        trigger: [`${prefix}promote`, `${prefix}up`, `${prefix}p`],
        handler: new PromoteCommand(discord),
      },
      {
        trigger: [`${prefix}demote`, `${prefix}down`, `${prefix}d`],
        handler: new DemoteCommand(discord),
      },
      {
        trigger: [`${prefix}Execute`, `${prefix}execute`, `${prefix}exec`],
        handler: new ExecuteCommand(discord),
      },
      {
        trigger: [`${prefix}mute`, `${prefix}m`],
        handler: new MuteCommand(discord),
      },
    ]
  }

  handle(message) {
    const commandTrigger = message.content.toLowerCase().split(' ')[0]

    for (let command of this.commands) {
      for (let trigger of command.trigger) {
        if (trigger == commandTrigger) {
          this.runCommand(command, message)

          return true
        }
      }
    }

    return false
  }

  runCommand(command, message) {
    if (message.content == `${prefix}h` || message.content == `${prefix}help`) {
      return command.handler.onCommand(message)
    }

    if (!this.isCommander(message.member) && !this.isOwner(message.member)) {
      return message.reply("You're not allowed to run this command!")
    }

    if (command.handler.constructor.name == 'ExecuteCommand' && !this.isOwner(message.member)) {
      return message.reply("You're not allowed to run this command!")
    }

    console.log(chalk.grey(`Discord Command Handler > [${command.handler.constructor.name}] ${message.content}`))

    command.handler.onCommand(message)
  }

  isCommander(member) {
    return member.roles.cache.find(r => r.id == config.discord.commandRole)
  }

  isOwner(member) {
    return member.id == config.discord.ownerId
  }
}

module.exports = CommandHandler
