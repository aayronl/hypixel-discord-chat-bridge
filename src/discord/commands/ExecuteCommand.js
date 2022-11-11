const config = require('../../../config.js')
const DiscordCommand = require('../../contracts/DiscordCommand')

class ExecuteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message).join(' ')

    if (args.length == 0) {
      return message.reply(`No command specified`)
    }

    args = args.split(' ')

    if (args[0]) {
      args = args.join(' ')
      this.sendMinecraftMessage(`${args}`)
    } else if (args.length < 1) {
      return message.reply(`Usage: !exec <message>`)
    }

    message.reply(`\`${args}\` has been executed`)
  }
}

module.exports = ExecuteCommand
