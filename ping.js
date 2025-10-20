module.exports = {
  command: 'ping',
  run: async (sock, msg) => {
    const jid = msg.key.remoteJid
    await sock.sendMessage(jid, { text: '🏓 Pong!'})
}
}