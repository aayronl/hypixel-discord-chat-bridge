const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js-light')

const { version } = require('../../../package.json')
const config = require('../../../config.js')
const prefix = config.discord.prefix

const helpEmbed = new Discord.MessageEmbed()
  .setTitle('Help')
  .setDescription('`< >` = Required arguments\n`[ ]` = Optional arguments')
  .addFields(
    {
      name: `Command list`,
      value: [
        '`help` - Displays this command list',
        '`relog [delay]` - Relogs the MC client, a delay can be given in seconds, if no delay is given it will default to 5 seconds',
        '`execute <command> [args]` - Executes the string attached.',
        "`invite <player>` - Invites the specified user to the guild, providing the guild isn't full",
        '`kick <user> [reason]` - Kicks the specified user from the guild',
        '`promote <user>` - Promotes the specified user by 1 rank',
        '`demote <user>` - Demotes the specified user by 1 rank',
        '`mute <user> [time]` - Mutes the specified user by some amount of time',
      ].join('\n'),
    },
    {
      name: `Shortcuts`,
      value: [
        'Help: `h`',
        'Relog: `r`',
        'Override: `exec`',
        'Invite: `i`, `inv`',
        'Kick: `k`',
        'Promote: `p`, `up`',
        'Demote: `d`, `down`',
        'Mute: `m`',
      ].join('\n'),
      inline: true,
    },
    {
      name: `Info`,
      value: [
        `Prefix: \`${prefix}\``,
        `Guild Channel: <#${config.discord.channel}>`,
        `Command Role: <@&${config.discord.commandRole}>`,
        `Version: \`${version}\``,
      ].join('\n'),
      inline: true,
    }
  )
  .setTimestamp()
  .setFooter('Made by Senither and neyoa ❤')

class HelpCommand extends DiscordCommand {
  onCommand(message) {
    message.reply(helpEmbed.setColor(message.guild.me.displayHexColor)).then(helpMessage => {
      setTimeout(() => helpMessage.delete(), 30000)
    })
  }
}

module.exports = HelpCommand
