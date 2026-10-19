import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { CLIENTS_DATA } from '../AdminData'
import s from './tabs.module.css'

const ROLE_MAP = { client: { label: 'Client', cls: 'badgeBlue' }, staff: { label: 'Staff', cls: 'badgePurple' }, admin: { label: 'Admin', cls: 'badgeOrange' } }

function ClientDetailModal({ client, onClose, onToggle }) {
  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <motion.div className={s.modal} onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: .95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .95 }}>
        <h3 className={s.modalTitle}><i className="bi bi-person-circle" /> {client.name}</h3>
        <div className={s.detailPanel}>
          {[
            ['Email', client.email],
            ['Téléphone', client.phone],
            ['Ville', client.ville],
            ['Rôle', <span className={`${s.badge} ${s[ROLE_MAP[client.role].cls]}`}>{ROLE_MAP[client.role].label}</span>],
            ['Statut', <span className={`${s.badge} ${client.status === 'active' ? s.badgeGreen : s.badgeGrey}`}>{client.status === 'active' ? 'Actif' : 'Inactif'}</span>],
            ['Inscrit le', client.joined],
            ['Commandes', client.orders],
          ].map(([label, value]) => (
            <div key={label} className={s.detailRow}>
              <span className={s.detailLabel}>{label}</span>
              <span className={s.detailValue}>{value}</span>
            </div>
          ))}
        </div>
        <div className={s.modalFooter}>
          <button className={s.btnDanger} onClick={() => { onToggle(client.id); onClose() }}>
            <i className={`bi bi-${client.status === 'active' ? 'person-slash' : 'person-check'}`} />
            {client.status === 'active' ? 'Désactiver' : 'Réactiver'}
          </button>
          <button className={s.btnOutline} onClick={onClose}>Fermer</button>
          <button className={s.btnPrimary} onClick={() => { toast.success(`Email envoyé à ${client.email}`); onClose() }}>
            <i className="bi bi-envelope" /> Envoyer email
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default function TabClients() {
  const [clients, setClients] = useState(CLIENTS_DATA)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = clients.filter(c =>
    (filter === 'all' || c.status === filter || c.role === filter) &&
    (!search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
  )

  const toggleStatus = (id) => {
    setClients(cs => cs.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c))
    toast.success('Statut mis à jour')
  }

  return (
    <div>
      <div className={s.pageHeader}>
        <div>
          <h2 className={s.pageTitle}>Gestion des Clients</h2>
          <p className={s.pageSub}>{clients.length} membres • {clients.filter(c => c.status === 'active').length} actifs • {clients.filter(c => c.role === 'staff').length} staff</p>
        </div>
        <button className={s.btnPrimary} onClick={() => toast('Fonctionnalité en cours d\'intégration')}>
          <i className="bi bi-person-plus" /> Ajouter un client
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total clients', value: clients.filter(c => c.role === 'client').length, color: '#3498db' },
          { label: 'Staff', value: clients.filter(c => c.role === 'staff').length, color: '#9b59b6' },
          { label: 'Actifs', value: clients.filter(c => c.status === 'active').length, color: '#27ae60' },
          { label: 'Inactifs', value: clients.filter(c => c.status === 'inactive').length, color: '#e74c3c' },
        ].map((item, i) => (
          <div key={i} className={s.card} style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.value}</div>
            <div style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{item.label}</div>
          </div>
        ))}
      </div>

      <div className={s.filterBar}>
        <div className={s.searchWrap}>
          <i className={`bi bi-search ${s.searchIcon}`} />
          <input className={s.searchInput} placeholder="Nom, email..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {[['all','Tous'],['active','Actifs'],['inactive','Inactifs'],['staff','Staff']].map(([v,l]) => (
          <button key={v} className={`${s.filterBtn} ${filter===v?s.active:''}`} onClick={() => setFilter(v)}>{l}</button>
        ))}
      </div>

      <div className={s.card} style={{ padding: 0, overflow: 'hidden' }}>
        <table className={s.table}>
          <thead>
            <tr><th>Client</th><th>Ville</th><th>Rôle</th><th>Commandes</th><th>Inscrit</th><th>Statut</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#27ae60,#2ecc71)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '.9rem', flexShrink: 0 }}>
                      {c.name[0]}
                    </div>
                    <div>
                      <div className={s.tdBold}>{c.name}</div>
                      <div className={s.tdMuted}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td>{c.ville}</td>
                <td><span className={`${s.badge} ${s[ROLE_MAP[c.role].cls]}`}>{ROLE_MAP[c.role].label}</span></td>
                <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{c.orders}</td>
                <td className={s.tdMuted}>{c.joined}</td>
                <td><span className={`${s.badge} ${c.status === 'active' ? s.badgeGreen : s.badgeGrey}`}>{c.status === 'active' ? 'Actif' : 'Inactif'}</span></td>
                <td>
                  <div className={s.tdActions}>
                    <button className={s.btnIcon} onClick={() => setSelected(c)} title="Détails"><i className="bi bi-eye" /></button>
                    <button className={s.btnIcon} onClick={() => { toggleStatus(c.id) }} title="Changer statut">
                      <i className={`bi bi-${c.status === 'active' ? 'person-slash' : 'person-check'}`} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.pagination}>
        <span className={s.paginationInfo}>{filtered.length} client(s) affiché(s)</span>
      </div>

      <AnimatePresence>
        {selected && <ClientDetailModal client={selected} onClose={() => setSelected(null)} onToggle={toggleStatus} />}
      </AnimatePresence>
    </div>
  )
}
