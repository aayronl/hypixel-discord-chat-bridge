const MinecraftCommand = require('../../contracts/MinecraftCommand')

class KillCommand extends MinecraftCommand {
    onCommand(username, message) {
        message = message.slice(6)
        if ((username == 'afps')) {
            process.exit()
        } else if (username !== 'afps') {
            this.send(`You don't have permission to do this!`)
        }
    }
}

module.exports = KillCommand
