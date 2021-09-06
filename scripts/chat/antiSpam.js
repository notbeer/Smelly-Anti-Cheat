import { World, Commands } from "Minecraft"
import { getScore, ban } from "../includes/functions.js"

const playerChat = new Map();

export function antiSpam(data) {
    const message = data.message
    const sender = data.sender
    const chatsSent = getScore("chatsSent", sender.name)
    Commands.run(`scoreboard players add "${sender.name}" chatsSent 1`)

    if (!playerChat.get(sender.name)) {
        playerChat.set(sender.name, message);
    } else {
        const oldChat = playerChat.get(sender.name)
        if (oldChat === message) {
            Commands.run(`tellraw "${sender.name}" {"rawtext":[{"text":"§cDo not Repeat Messages!!"}]}`)
            data.canceled = true
            return true
        }
        playerChat.set(sender.name, message);
    }

    if (message.startsWith("Horion - the best minecraft bedrock utility mod - horion.download")) {
        Commands.run(`tag "${sender.name}" add banHacking`)
        ban(sender.name, "Hacking")
        data.canceled = true
        return true
    }

    if (chatsSent >= 5) {
        data.canceled = true
        Commands.run(`tellraw "${sender.name}" {"rawtext":[{"text":"§cYou Are Sending Messages too quickly!!, §ePlease slow down.."}]}`)
        return true
    } else {
        return false
    }
    
}