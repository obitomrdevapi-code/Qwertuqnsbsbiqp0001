import fs from 'fs'
import path from 'path'

const plugins = {}

const pluginDir = path.join(process.cwd(), 'plugins')
fs.readdirSync(pluginDir).forEach(file => {
  if (file.endsWith('.js')) {
    const plugin = require(path.join(pluginDir, file))
    if (plugin.command) {
      plugins[plugin.command] = plugin
}
}
})

export async function handleMessage(sock, msg) {
  const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
  if (!text) return

  const command = text.trim().split(' ')[0].slice(1) // remove prefix
  const plugin = plugins[command]
  if (plugin) {
    await plugin.run(sock, msg)
}
}