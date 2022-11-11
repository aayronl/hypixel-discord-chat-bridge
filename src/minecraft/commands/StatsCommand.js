const MinecraftCommand = require('../../contracts/MinecraftCommand')
const request = require('request')
const axios = require('axios')

var apiKey = '7a3f6ee2-4f88-42e0-81bb-e9e936eaf0d2'

class StatsCommand extends MinecraftCommand {
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
            console.log(`[StatsCommand] An error occured. Mojang's api returned an error.`)
            return this.send(`${username} is not a valid player.`)
        }

        try {
            response = await axios.get(`https://hypixel-api.senither.com/v1/profiles/${formatteduuid}/weight?key=${apiKey}`)
            var skillAverage = response.data.data.skills.average_skills
            var slayer = response.data.data.slayers.total_experience
            var cata = response.data.data.dungeons.types.catacombs.level
            var weight = response.data.data.weight
            var totalWeight = response.data.data.weight + response.data.data.weight_overflow
        }
        catch (error) {
            console.log(`[StatsCommand] An error occured. The user probably entered an invalid player.`)
            return this.send(`${username} has no SkyBlock profiles.`)
        }

        // Truncate slayer to M, K, or int 0-999
        if (slayer >= 1000000) {
            slayer = (slayer/1000000).toFixed(2) + 'M'
        } else if (slayer >= 1000 && slayer < 1000000) {
            slayer = (slayer/1000).toFixed(2) + 'K'
        }

        var output = `${username}'s Stats: Skill Average: ${skillAverage.toFixed(2)} | Slayer: ${slayer} | Cata: ${cata.toFixed(2)} | Weight: ${weight.toFixed(2)} | Total Weight: ${totalWeight.toFixed(2)}`
        console.log(`Minecraft Command Handler > ${username} - [StatsCommand] ${output}`)
        this.send(output)
    }
}
module.exports = StatsCommand