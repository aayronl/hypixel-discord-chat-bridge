const MinecraftCommand = require('../../contracts/MinecraftCommand')

class HelpCommand extends MinecraftCommand {
  onCommand(username, message) {
    this.send(`Usage: ![options] | Options: help, stats, skills, slayer, cata, weight, ping, guildlobby`)
  }
}

module.exports = HelpCommand
