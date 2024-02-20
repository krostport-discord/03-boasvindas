const Discord = require("discord.js")
const client = require("../..")

module.exports = {
    name: "emitir-guildmemberremove",
    description: "Emita o evento de saída!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "member",
            description: "Selecione o membro por favor!",
            type: Discord.ApplicationCommandOptionType.User,
            required: false
        }
    ],

    run: async(interaction) => {
        const member = interaction.options.getMember("member") || interaction.member
        interaction.reply(`Emitindo evento....`)

        setTimeout(() => {
            interaction.editReply(`Evento emitido com sucesso!`)
        }, 2000);

        client.emit("guildMemberRemove", member)
    }
}