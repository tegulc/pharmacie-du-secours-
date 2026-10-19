import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PHARMACY_INFO } from '../data/data'
import { useTranslation } from '../i18n'

const QUICK_REPLIES_DEFAULT = ['horaires', 'localisation', 'medicaments', 'urgence', 'teleconsultation']

function getResponseKey(msg) {
  const m = msg.toLowerCase()
  if (m.match(/bonjour|salut|hello|bonsoir/)) return 'bonjour'
  if (m.match(/heure|horaire|hour|hours|ouvert|open|ferme|fermé/)) return 'hours'
  if (m.match(/localisation|location|adresse|address|où|ou|trouver|trouver|itinéraire|directions/)) return 'location'
  if (m.match(/tel|tél|téléphone|telephone|appel|call|contact|numéro|number/)) return 'telephone'
  if (m.match(/médicament|medicament|medication|medicines|produit|product|ordonnance/)) return 'medicines'
  if (m.match(/livraison|delivery|livrer|deliver|domicile|home|commande|order/)) return 'deliveryUnavailable'
  if (m.match(/urgence|urgent|emergency/)) return 'emergency'
  if (m.match(/téléconsult|teleconsult|téléconsultation|teleconsultation|vidéo|video|ligne|online|whatsapp/)) return 'teleconsultation'
  return 'default'
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const { t, lang } = useTranslation()
  const [messages, setMessages] = useState([
    { from: 'bot', text: t('chatbot.welcome'), ts: new Date() }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [newMsg, setNewMsg] = useState(true)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const send = (text) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { from: 'user', text, ts: new Date() }])
    setInput('')
    setNewMsg(false)
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const key = getResponseKey(text)
      let reply = t(`chatbot.${key}`)
      // replace phone/placeholders
      reply = reply.replace('{{phone}}', PHARMACY_INFO.phones[1] || PHARMACY_INFO.phones[0])
      reply = reply.replace('{{address}}', PHARMACY_INFO.address)
      reply = reply.replace('{{phones}}', PHARMACY_INFO.phones.join(' • '))
      setMessages(prev => [...prev, { from: 'bot', text: reply, ts: new Date() }])
    }, 900 + Math.random() * 600)
  }

  return (
    <>
      {/* FAB */}
      <motion.button
        className="chatbot-fab"
        onClick={() => { setOpen(o => !o); setNewMsg(false) }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        title="Assistant virtuel"
      >
        <i className={`bi ${open ? 'bi-x-lg' : 'bi-chat-dots-fill'}`} />
        {newMsg && <span className="notif-dot" />}
      </motion.button>

      {/* Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-avatar"><i className="bi bi-plus-circle-fill" /></div>
              <div className="chatbot-info">
                <h4>Assistant Pharmacie</h4>
                <p>En ligne • Réponse rapide</p>
              </div>
              <div className="chatbot-status" />
              <button className="chatbot-close-btn" onClick={() => setOpen(false)}><i className="bi bi-x" /></button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={msg.from === 'bot' ? 'msg-bot' : 'msg-user'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {msg.text}
                </motion.div>
              ))}
              {typing && (
                <div className="msg-bot" style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '12px 16px' }}>
                  {[0, 0.2, 0.4].map((d, i) => (
                    <motion.span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', display: 'block' }}
                      animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: d }} />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick replies */}
            <div className="chatbot-quick">
              {(t('chatbot.quickReplies') || QUICK_REPLIES_DEFAULT).map((qKey, idx) => (
                  <button key={qKey} className="quick-btn" onClick={() => send(t(`chatbot.quickReplies.${idx}`) || t(`chatbot.${qKey}`) || qKey)}>{t(`chatbot.quickReplies.${idx}`) || t(`chatbot.${qKey}`) || qKey}</button>
                ))}
            </div>

            {/* Input */}
            <div className="chatbot-input-row">
              <input
                className="chatbot-input"
                placeholder="Votre message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
              />
              <button className="chatbot-send" onClick={() => send(input)}>
                <i className="bi bi-send-fill" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
