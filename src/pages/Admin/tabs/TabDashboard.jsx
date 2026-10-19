import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ADMIN_STATS, ANALYTICS_MONTHLY, ORDERS_DATA, MESSAGES_DATA, NOTIFS_DATA } from '../AdminData'
import s from './tabs.module.css'

function MiniChart({ data }) {
  const max = Math.max(...data.map(d => d.visits))
  return (
    <div className={s.miniChart}>
      {data.map((d, i) => (
        <div key={i} className={s.miniBar}>
          <motion.div
            className={s.miniBarFill}
            initial={{ height: 0 }}
            animate={{ height: `${(d.visits / max) * 100}%` }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: 'easeOut' }}
          />
          <span className={s.miniBarLabel}>{d.month}</span>
        </div>
      ))}
    </div>
  )
}

export default function TabDashboard({ onNav }) {
  const unread = MESSAGES_DATA.filter(m => m.status === 'unread').length
  const alerts = NOTIFS_DATA.filter(n => !n.read).length
  const lowStock = [{ name: 'Métronidazole 250mg', stock: 8 }, { name: 'Lait 1er âge Blédilait', stock: 6 }, { name: 'Lait 1er âge Blédilait', stock: 6 }]
  const outOfStock = ['Sirop antitussif Toplexil', 'Oxymètre de pouls']

  return (
    <div>
      {/* Header */}
      <div className={s.pageHeader}>
        <div>
          <h2 className={s.pageTitle}>Tableau de Bord</h2>
          <p className={s.pageSub}>Vue d'ensemble de la Pharmacie du Secours</p>
        </div>
        <div className={s.headerActions}>
          <button className={s.btnOutline} onClick={() => window.print()}>
            <i className="bi bi-printer" /> Exporter
          </button>
          <button className={s.btnPrimary} onClick={() => onNav('products')}>
            <i className="bi bi-plus-circle" /> Ajouter produit
          </button>
        </div>
      </div>

      {/* Alert Banners */}
      {alerts > 0 && (
        <motion.div className={s.alertBanner} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <i className="bi bi-exclamation-triangle-fill" />
          <span><strong>{alerts} alertes non lues</strong> — dont {outOfStock.length} ruptures de stock et {unread} messages clients.</span>
          <button className={s.alertLink} onClick={() => onNav('notifs')}>Voir tout →</button>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className={s.statsGrid}>
        {ADMIN_STATS.map((stat, i) => (
          <motion.div key={i} className={s.statCard}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4 }}>
            <div className={s.statIconWrap} style={{ background: stat.color + '22' }}>
              <i className={`bi ${stat.icon}`} style={{ color: stat.color }} />
            </div>
            <div className={s.statInfo}>
              <div className={s.statValue}>{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</div>
              <div className={s.statLabel}>{stat.label}</div>
              <div className={s.statChange} style={{ color: stat.trend === 'up' ? '#27ae60' : '#e74c3c' }}>
                <i className={`bi bi-arrow-${stat.trend}-short`} /> {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Middle Grid */}
      <div className={s.midGrid}>
        {/* Chart */}
        <div className={s.card}>
          <div className={s.cardHeader}>
            <h4 className={s.cardTitle}><i className="bi bi-bar-chart-line" /> Visites mensuelles</h4>
            <span className={s.cardBadge}>2025</span>
          </div>
          <MiniChart data={ANALYTICS_MONTHLY} />
        </div>

        {/* Stock Alerts */}
        <div className={s.card}>
          <div className={s.cardHeader}>
            <h4 className={s.cardTitle}><i className="bi bi-exclamation-triangle" /> Alertes Stock</h4>
            <button className={s.cardLink} onClick={() => onNav('products')}>Gérer →</button>
          </div>
          <div className={s.alertList}>
            {outOfStock.map((name, i) => (
              <div key={i} className={s.alertItem}>
                <span className={`${s.dot} ${s.dotRed}`} />
                <span className={s.alertName}>{name}</span>
                <span className={`${s.badge} ${s.badgeRed}`}>Rupture</span>
              </div>
            ))}
            {lowStock.slice(0,2).map((item, i) => (
              <div key={i} className={s.alertItem}>
                <span className={`${s.dot} ${s.dotOrange}`} />
                <span className={s.alertName}>{item.name}</span>
                <span className={`${s.badge} ${s.badgeOrange}`}>{item.stock} restants</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders + Messages */}
      <div className={s.botGrid}>
        {/* Recent Orders */}
        <div className={s.card}>
          <div className={s.cardHeader}>
            <h4 className={s.cardTitle}><i className="bi bi-truck" /> Commandes récentes</h4>
            <button className={s.cardLink} onClick={() => onNav('orders')}>Tout voir →</button>
          </div>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Réf.</th><th>Client</th><th>Total</th><th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS_DATA.slice(0, 5).map(o => (
                <tr key={o.id}>
                  <td className={s.tdMono}>{o.id}</td>
                  <td className={s.tdBold}>{o.client}</td>
                  <td>{o.total.toLocaleString()} F</td>
                  <td><OrderBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Messages */}
        <div className={s.card}>
          <div className={s.cardHeader}>
            <h4 className={s.cardTitle}><i className="bi bi-envelope" /> Messages récents</h4>
            <button className={s.cardLink} onClick={() => onNav('messages')}>Tout voir →</button>
          </div>
          <div className={s.msgList}>
            {MESSAGES_DATA.slice(0, 5).map(m => (
              <div key={m.id} className={`${s.msgItem} ${m.status === 'unread' ? s.msgUnread : ''}`}
                onClick={() => onNav('messages')}>
                <div className={s.msgAvatar}>{m.name[0]}</div>
                <div className={s.msgInfo}>
                  <div className={s.msgName}>{m.name} {m.status === 'unread' && <span className={s.newBadge}>Nouveau</span>}</div>
                  <div className={s.msgSubject}>{m.subject}</div>
                </div>
                <div className={s.msgDate}>{m.date.split(' ').slice(0,2).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={s.card} style={{ marginTop: 20 }}>
        <h4 className={s.cardTitle} style={{ marginBottom: 18 }}><i className="bi bi-lightning-charge" /> Actions rapides</h4>
        <div className={s.quickActions}>
          {[
            { icon: 'bi-plus-circle-fill',    label: 'Nouvel article',       color: '#27ae60', tab: 'articles' },
            { icon: 'bi-images',              label: 'Gérer galerie',         color: '#3498db', tab: 'products' },
            { icon: 'bi-people-fill',         label: 'Voir les clients',      color: '#9b59b6', tab: 'clients'  },
            { icon: 'bi-bell-fill',           label: 'Notifications',        color: '#f39c12', tab: 'notifs'   },
            { icon: 'bi-bar-chart-fill',      label: 'Analytique',           color: '#1abc9c', tab: 'analytics'},
            { icon: 'bi-gear-fill',           label: 'Paramètres',           color: '#e74c3c', tab: 'settings' },
          ].map((a, i) => (
            <motion.button key={i} className={s.qaBtn}
              style={{ '--qc': a.color }}
              onClick={() => onNav(a.tab)}
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <i className={`bi ${a.icon}`} />
              <span>{a.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

function OrderBadge({ status }) {
  const map = {
    delivered:  { label: 'Livré',      cls: 'badgeGreen'  },
    processing: { label: 'En cours',   cls: 'badgeBlue'   },
    pending:    { label: 'En attente', cls: 'badgeOrange' },
    shipped:    { label: 'Expédié',    cls: 'badgePurple' },
    cancelled:  { label: 'Annulé',     cls: 'badgeRed'    },
  }
  const m = map[status] || { label: status, cls: 'badgeGrey' }
  return <span className={`${s.badge} ${s[m.cls]}`}>{m.label}</span>
}
