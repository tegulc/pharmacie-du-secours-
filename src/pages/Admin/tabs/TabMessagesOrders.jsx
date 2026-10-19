import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { MESSAGES_DATA, ORDERS_DATA } from '../AdminData'
import s from './tabs.module.css'

const TYPE_MAP = {
  info:    { label: 'Information', color: '#3498db', icon: 'bi-info-circle-fill' },
  conseil: { label: 'Conseil',     color: '#27ae60', icon: 'bi-chat-dots-fill'   },
  order:   { label: 'Commande',    color: '#f39c12', icon: 'bi-bag-fill'          },
  rdv:     { label: 'Rendez-vous', color: '#9b59b6', icon: 'bi-calendar-check-fill'},
}

const STATUS_BADGE = {
  unread:  { label: 'Non lu',    cls: 'badgeRed'    },
  read:    { label: 'Lu',        cls: 'badgeGrey'   },
  replied: { label: 'Répondu',   cls: 'badgeGreen'  },
}

const ORDER_STATUS = {
  delivered:  { label: 'Livré',     cls: 'badgeGreen'  },
  processing: { label: 'En cours',  cls: 'badgeBlue'   },
  pending:    { label: 'En attente',cls: 'badgeOrange' },
  shipped:    { label: 'Expédié',   cls: 'badgePurple' },
  cancelled:  { label: 'Annulé',    cls: 'badgeRed'    },
}

// ===== MESSAGES TAB =====
function MessageModal({ msg, onClose, onReply }) {
  const [reply, setReply] = useState('')
  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <motion.div className={s.modal} onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}
        initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .95 }}>
        <h3 className={s.modalTitle}><i className="bi bi-envelope-open" /> {msg.subject}</h3>
        <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '16px 18px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#27ae60,#2ecc71)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{msg.name[0]}</div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '.9rem' }}>{msg.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '.78rem' }}>{msg.email} • {msg.date}</div>
            </div>
            <span className={`${s.badge}`} style={{ marginLeft: 'auto', background: TYPE_MAP[msg.type].color + '22', color: TYPE_MAP[msg.type].color }}>
              {TYPE_MAP[msg.type].label}
            </span>
          </div>
          <p style={{ color: 'var(--text)', fontSize: '.9rem', lineHeight: 1.7, margin: 0 }}>{msg.msg}</p>
        </div>
        <div className={s.formField}>
          <label className={s.formLabel}>Votre réponse</label>
          <textarea className={s.formTextarea} rows={4} placeholder="Rédigez votre réponse..."
            value={reply} onChange={e => setReply(e.target.value)} />
        </div>
        <div className={s.modalFooter}>
          <button className={s.btnOutline} onClick={onClose}>Fermer</button>
          <button className={s.btnPrimary} onClick={() => { if (reply.trim()) { onReply(msg.id); onClose(); toast.success(`Réponse envoyée à ${msg.name}`) } else toast.error('Rédigez une réponse') }}>
            <i className="bi bi-send-fill" /> Envoyer la réponse
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export function TabMessages() {
  const [messages, setMessages] = useState(MESSAGES_DATA)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = messages.filter(m =>
    (filter === 'all' || m.status === filter || m.type === filter) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase()))
  )

  const handleReply = (id) => {
    setMessages(ms => ms.map(m => m.id === id ? { ...m, status: 'replied' } : m))
  }

  const markRead = (id) => {
    setMessages(ms => ms.map(m => m.id === id ? { ...m, status: m.status === 'unread' ? 'read' : m.status } : m))
  }

  const handleDelete = (id) => {
    setMessages(ms => ms.filter(m => m.id !== id))
    toast.success('Message supprimé')
  }

  const unread = messages.filter(m => m.status === 'unread').length

  return (
    <div>
      <div className={s.pageHeader}>
        <div>
          <h2 className={s.pageTitle}>Messages Clients</h2>
          <p className={s.pageSub}>{messages.length} messages • {unread} non lus</p>
        </div>
        {unread > 0 && (
          <button className={s.btnOutline} onClick={() => { setMessages(ms => ms.map(m => ({ ...m, status: m.status === 'unread' ? 'read' : m.status }))); toast.success('Tous marqués comme lus') }}>
            <i className="bi bi-check2-all" /> Tout marquer lu
          </button>
        )}
      </div>

      <div className={s.filterBar}>
        <div className={s.searchWrap}>
          <i className={`bi bi-search ${s.searchIcon}`} />
          <input className={s.searchInput} placeholder="Nom, sujet..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {[['all','Tous'],['unread','Non lus'],['replied','Répondus'],['info','Information'],['order','Commandes'],['conseil','Conseils']].map(([v,l]) => (
          <button key={v} className={`${s.filterBtn} ${filter===v?s.active:''}`} onClick={() => setFilter(v)}>{l}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((m, i) => (
          <motion.div key={m.id} className={s.card}
            style={{ padding: '14px 18px', cursor: 'pointer', borderColor: m.status === 'unread' ? 'rgba(39,174,96,.4)' : undefined }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            onClick={() => { markRead(m.id); setSelected(m) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: TYPE_MAP[m.type].color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className={`bi ${TYPE_MAP[m.type].icon}`} style={{ color: TYPE_MAP[m.type].color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 2 }}>
                  <span style={{ fontWeight: m.status === 'unread' ? 700 : 500, color: 'var(--text)', fontSize: '.9rem' }}>{m.name}</span>
                  {m.status === 'unread' && <span className={`${s.badge} ${s.badgeRed}`} style={{ fontSize: '.65rem' }}>Nouveau</span>}
                  <span className={`${s.badge}`} style={{ background: TYPE_MAP[m.type].color + '18', color: TYPE_MAP[m.type].color, fontSize: '.7rem' }}>{TYPE_MAP[m.type].label}</span>
                </div>
                <div style={{ fontWeight: m.status === 'unread' ? 600 : 400, color: 'var(--text)', fontSize: '.87rem', marginBottom: 2 }}>{m.subject}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '.79rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.msg}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                <span style={{ fontSize: '.74rem', color: 'var(--text-faint)' }}>{m.date}</span>
                <span className={`${s.badge} ${s[STATUS_BADGE[m.status].cls]}`}>{STATUS_BADGE[m.status].label}</span>
              </div>
              <button className={s.btnIconRed} onClick={e => { e.stopPropagation(); handleDelete(m.id) }} title="Supprimer">
                <i className="bi bi-trash" />
              </button>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-faint)' }}>
            <i className="bi bi-envelope" style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }} />Aucun message.
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <MessageModal msg={selected} onClose={() => setSelected(null)} onReply={handleReply} />}
      </AnimatePresence>
    </div>
  )
}

// ===== ORDERS TAB =====
export function TabOrders() {
  const [orders, setOrders] = useState(ORDERS_DATA)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const updateStatus = (id, status) => {
    setOrders(os => os.map(o => o.id === id ? { ...o, status } : o))
    toast.success('Statut commande mis à jour')
  }

  return (
    <div>
      <div className={s.pageHeader}>
        <div>
          <h2 className={s.pageTitle}>Gestion des Commandes</h2>
          <p className={s.pageSub}>{orders.length} commandes • {orders.filter(o => o.status === 'pending').length} en attente</p>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 12, marginBottom: 20 }}>
        {Object.entries(ORDER_STATUS).map(([k, v]) => (
          <div key={k} className={s.card} style={{ padding: '14px 16px', cursor: 'pointer', borderColor: filter === k ? '#27ae60' : undefined }}
            onClick={() => setFilter(filter === k ? 'all' : k)}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>{orders.filter(o => o.status === k).length}</div>
            <div><span className={`${s.badge} ${s[v.cls]}`} style={{ marginTop: 6, display: 'inline-block' }}>{v.label}</span></div>
          </div>
        ))}
      </div>

      <div className={s.card} style={{ padding: 0, overflow: 'hidden' }}>
        <table className={s.table}>
          <thead>
            <tr><th>Réf.</th><th>Client</th><th>Articles</th><th>Total</th><th>Adresse</th><th>Date</th><th>Statut</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => (
              <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                <td className={s.tdMono}>{o.id}</td>
                <td className={s.tdBold}>{o.client}</td>
                <td>{o.items} article{o.items > 1 ? 's' : ''}</td>
                <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{o.total.toLocaleString()} F</td>
                <td className={s.tdMuted}>{o.address}</td>
                <td className={s.tdMuted}>{o.date}</td>
                <td><span className={`${s.badge} ${s[ORDER_STATUS[o.status].cls]}`}>{ORDER_STATUS[o.status].label}</span></td>
                <td>
                  <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}
                    style={{ padding: '5px 8px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '.78rem', cursor: 'pointer', outline: 'none' }}>
                    {Object.entries(ORDER_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
