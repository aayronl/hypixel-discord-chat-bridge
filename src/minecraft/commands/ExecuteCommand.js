const MinecraftCommand = require('../../contracts/MinecraftCommand')

class ExecuteCommand extends MinecraftCommand {
    onCommand(username, message) {
        message = message.slice(6)
        if (username == 'afps') {
            this.send(message)
        } else if (username !== 'afps') {
            this.send(`You don't have permission to do this!`)
        }
    }
}

module.exports = ExecuteCommand
