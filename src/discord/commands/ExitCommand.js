const DiscordCommand = require('../../contracts/DiscordCommand')

class ExitCommand extends DiscordCommand {
  async onCommand(message) {
    await this.sendMinecraftMessage(`/gc bye`)
    await message.reply(`bye`)
    process.exit(1)
  }
}

module.exports = ExitCommand
