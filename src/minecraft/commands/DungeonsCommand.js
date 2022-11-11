const MinecraftCommand = require('../../contracts/MinecraftCommand')
const request = require('request')
const axios = require('axios')

var apiKey = '7a3f6ee2-4f88-42e0-81bb-e9e936eaf0d2'

class DungeonsCommand extends MinecraftCommand {
    async onCommand(username, message) {
        let args = this.getArgs(message)
        if (args.length == 0) {
            username = username
        } else if (args.length == 1) {
            username = message.split(' ')[1];
        }

        try {
            var response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
            if (response.data.id == null) {
                return this.send(`That player does not exist.`)
            }
            var uuid = response.data.id
            var formatteduuid = uuid.substr(0, 8) + "-" + uuid.substr(8, 4) + "-" + uuid.substr(12, 4) + "-" + uuid.substr(16, 4) + "-" + uuid.substr(20)
        }
        catch (error) {
            console.log(`[DungeonsCommand] An error occured. Mojang's api returned an error.`)
            return this.send(`${username} is not a valid player.`)
        }

        try {
            response = await axios.get(`https://hypixel-api.senither.com/v1/profiles/${formatteduuid}/weight?key=${apiKey}`)
            if (response.data.data.dungeons == 'null') {
                console.log(`[DungeonsCommand] No dungeons data found for ${username}.`)
                return this.send(`${username} has not played Dungeons yet.`)
            }
            var cata_level = response.data.data.dungeons.types.catacombs.level
            var selected_class = response.data.data.dungeons.selected_class
            var secrets_found = response.data.data.dungeons.secrets_found
            var dungeons_weight = response.data.data.dungeons.weight
            var fastest_time = response.data.data.dungeons.types.catacombs.fastest_time_s_plus.tier_7.seconds
            var minutes = Math.floor(fastest_time / 60)
            var seconds = fastest_time - minutes * 60
            fastest_time = `${minutes.toFixed(0)}:${seconds.toFixed(0)}`
        }
        catch (error) {
            console.log(`[DungeonsCommand] An error occured. The user probably entered an invalid player.`)
            console.log(error)
            return this.send(`${username} has no SkyBlock profiles.`)
        }
        var output = `${username}'s Dungeons Stats: Cata Level: ${cata_level.toFixed(2)} | Class: ${selected_class.charAt(0).toUpperCase() + selected_class.slice(1)} | Secrets: ${secrets_found} | Cata Weight: ${dungeons_weight.toFixed(2)} | Fastest Time: ${fastest_time}`
        console.log(`Minecraft Command Handler > ${username} - w[DungeonsCommand] ${output}`)
        this.send(output)
    }
}
module.exports = DungeonsCommand