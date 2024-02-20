const client = require("..");
const config = require("../config.json")
const Discord = require("discord.js")


client.on("guildMemberRemove", async(member) => {
    const channel = member.guild.channels.cache.get(config.configs.channels.joinChannel)
    const { title, thumbnail, description, color, footer } = config.configs.leaveEmbed

    function replace(text, replacements) {
        let result = text;
        for (const [key, value] of Object.entries(replacements)) {
            result = result.replace(new RegExp(`{${key}}`, 'g'), value);
        }
        return result;
    }

    const replaces = {
        user: member.user,
        userName: member.user.username,
        userDisplayName: member.user.displayName,
        userIcon: member.user.avatarURL({ dynamic: true }),
        userId: member.user.id,

        serverName: member.guild.name,
        serverIcon: member.guild.iconURL({ dynamic: true }),
        memberCount: member.guild.memberCount
    }

    const newTitle = replace(title, replaces)
    const newDescription = replace(description, replaces)
    const newFooter = replace(footer, replaces)
    const newThumbnail = replace(thumbnail, replaces)

    const embed = new Discord.EmbedBuilder()
    .setTitle(newTitle)
    .setThumbnail(newThumbnail)
    .setDescription(newDescription)
    .setColor(color)
    .setFooter({ text: newFooter })

    channel.send({
        embeds: [embed]
    })
})