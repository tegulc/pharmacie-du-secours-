import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNotif } from '../context/NotifContext'

const ICONS = { info: 'bi-info-circle-fill', success: 'bi-check-circle-fill', warning: 'bi-exclamation-triangle-fill', danger: 'bi-x-circle-fill' }

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const { notifications, markRead, markAllRead, unreadCount } = useNotif()
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '6px', color: 'var(--text-muted)', fontSize: '1.1rem' }}
        aria-label="Notifications"
      >
        <i className="bi bi-bell-fill" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ position: 'absolute', top: 0, right: 0, width: 16, height: 16, borderRadius: '50%', background: '#e74c3c', color: '#fff', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--navbar-scrolled)' }}
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="notif-panel"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="notif-header">
              <h4><i className="bi bi-bell-fill me-2" style={{ color: 'var(--primary)' }} />Notifications {unreadCount > 0 && `(${unreadCount})`}</h4>
              {unreadCount > 0 && <button className="notif-mark-all" onClick={markAllRead}>Tout marquer lu</button>}
            </div>
            <div className="notif-list">
              {notifications.length === 0 ? (
                <p style={{ padding: '24px', textAlign: 'center', color: 'var(--text-faint)', fontSize: '0.88rem' }}>Aucune notification</p>
              ) : notifications.map(n => (
                <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`} onClick={() => markRead(n.id)}>
                  <div className={`notif-icon ${n.type}`}><i className={`bi ${ICONS[n.type]}`} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="notif-title">{n.title}</p>
                    <p className="notif-msg">{n.msg}</p>
                  </div>
                  {!n.read && <span className="unread-dot" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
