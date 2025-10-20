import { makeWASocket, useMultiFileAuthState} from '@whiskeysockets/baileys'
import { handleMessage} from '../lib/handler.js'
import P from 'pino'

export default async function handler(req, res) {
  const { state, saveCreds} = await useMultiFileAuthState('./sessions')
  const sock = makeWASocket({
    logger: P({ level: 'silent'}),
    printQRInTerminal: false,
    auth: state
})

  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('messages.upsert', async ({ messages}) => {
    const msg = messages[0]
    if (!msg.message) return
    await handleMessage(sock, msg)
})

  res.status(200).send('✅ البوت يعمل بجلسة رقمية وبنظام أوامر من plugins')
}