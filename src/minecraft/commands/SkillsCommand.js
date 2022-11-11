const MinecraftCommand = require('../../contracts/MinecraftCommand')
const request = require('request');
const axios = require('axios');

var apiKey = '7a3f6ee2-4f88-42e0-81bb-e9e936eaf0d2'

class SkillsCommand extends MinecraftCommand {
    async onCommand(username, message) {
        let args = this.getArgs(message)
        if (args.length == 0) { //check if user provided an ign or not
            username = username
        } else if (args.length == 1) {
            username = message.split(' ')[1];
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
            response = await axios.get(`https://hypixel-api.senither.com/v1/profiles/${uuid}/skills?key=${apiKey}`) //get data from senither's api=
            var skills = response.data.data.skills
            var skillAverage = response.data.data.skills.average_skills
        }
        catch (error) {
            console.log(`[SkillsCommand] An error occured. The user probably entered an invalid player.`)
            return this.send(`${username} has no SkyBlock profiles.`)
        }
        var output = `${username}'s Skills: Farming: ${skills.farming.level.toFixed(2)} | Mining: ${skills.mining.level.toFixed(2)} | Combat: ${skills.combat.level.toFixed(2)} | Foraging: ${skills.foraging.level.toFixed(2)} | Fishing: ${skills.fishing.level.toFixed(2)} | Enchanting: ${skills.enchanting.level.toFixed(2)} | Alchemy: ${skills.alchemy.level.toFixed(2)} | Taming: ${skills.taming.level.toFixed(2)} | Carpentry: ${skills.carpentry.level.toFixed(2)} | Runecrafting: ${skills.runecrafting.level.toFixed(2)} | Average: ${skillAverage.toFixed(2)}`
        console.log(`Minecraft Command Handler > ${username} - [SkillsCommand] ${output}`)
        this.send(output)
    }
}
module.exports = SkillsCommand