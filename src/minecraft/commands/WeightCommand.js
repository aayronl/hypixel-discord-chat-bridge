const MinecraftCommand = require('../../contracts/MinecraftCommand')
const request = require('request');
const axios = require('axios');

var apiKey = '7a3f6ee2-4f88-42e0-81bb-e9e936eaf0d2'

class WeightCommand extends MinecraftCommand {
    async onCommand(username, message) {
        let args = this.getArgs(message)
        if (args.length == 0) { //check if user provided an ign or not
            username = username
        } else if (args.length == 1) {
            username = message.split(' ')[1]
        }

        try {
            var response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`) //find the uuid from the ign
            if (response.data.id == null) {
                return this.send(`That player does not exist.`)
            }
        }
        catch (error) {
            console.log(`[StatsCommand] An error occured. Mojang's api returned an error.`)
            return this.send(`${username} is not a valid player.`)
        }
        
        var uuid = response.data.id;
        uuid = uuid.substr(0, 8) + "-" + uuid.substr(8, 4) + "-" + uuid.substr(12, 4) + "-" + uuid.substr(16, 4) + "-" + uuid.substr(20) //format the uuid

        try {
            response = await axios.get(`https://hypixel-api.senither.com/v1/profiles/${uuid}/skills?key=${apiKey}`) //get data from senither's api
            var weight = response.data.data.weight
            var totalWeight = response.data.data.weight + response.data.data.weight_overflow
        }
        catch (error) {
            console.log(`[WeightCommand] An error occured. The user probably entered an invalid player.`)
            return this.send(`${username} has no SkyBlock profiles.`)
        }

        var output = `${username}'s Weight: ${weight.toFixed(2)} | Total Weight: ${totalWeight.toFixed(2)}`
        console.log(`Minecraft Command Handler > ${username} - [WeightCommand] ${output}`)
        this.send(output)
    }
}
module.exports = WeightCommand