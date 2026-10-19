import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useNotif } from '../../context/NotifContext'
import { useTheme } from '../../context/ThemeContext'
import toast from 'react-hot-toast'
import TabDashboard from './tabs/TabDashboard'
import TabProducts from './tabs/TabProducts'
import TabArticles from './tabs/TabArticles'
import TabClients from './tabs/TabClients'
import { TabMessages, TabOrders } from './tabs/TabMessagesOrders'
import { TabAnalytics, TabNotifications, TabServices, TabSEO, TabSettings } from './tabs/TabsOther'

const NAV_SECTIONS = [
  { section: 'Principal' },
  { icon: 'bi-speedometer2',  label: 'Tableau de bord', tab: 'dashboard'  },
  { icon: 'bi-bar-chart-line',label: 'Analytique',      tab: 'analytics'  },
  { section: 'Catalogue' },
  { icon: 'bi-images',        label: 'Produits',         tab: 'products'   },
  { icon: 'bi-grid-3x2-gap',  label: 'Services',         tab: 'services'   },
  { section: 'Contenu' },
  { icon: 'bi-newspaper',     label: 'Actualités',       tab: 'articles'   },
  { icon: 'bi-search',        label: 'SEO',              tab: 'seo'        },
  { section: 'CRM' },
  { icon: 'bi-people',        label: 'Clients',          tab: 'clients'    },
  { icon: 'bi-envelope',      label: 'Messages',         tab: 'messages',  badge: 'messages' },
  { icon: 'bi-truck',         label: 'Commandes',        tab: 'orders'     },
  { section: 'Système' },
  { icon: 'bi-bell',          label: 'Notifications',    tab: 'notifs',    badge: 'notifs'   },
  { icon: 'bi-gear',          label: 'Paramètres',       tab: 'settings'   },
]

function TabContent({ tab, onNav }) {
  switch (tab) {
    case 'dashboard':  return <TabDashboard onNav={onNav} />
    case 'analytics':  return <TabAnalytics />
    case 'products':   return <TabProducts />
    case 'services':   return <TabServices />
    case 'articles':   return <TabArticles />
    case 'seo':        return <TabSEO />
    case 'clients':    return <TabClients />
    case 'messages':   return <TabMessages />
    case 'orders':     return <TabOrders />
    case 'notifs':     return <TabNotifications />
    case 'settings':   return <TabSettings />
    default: return (
      <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-faint)' }}>
        <i className="bi bi-tools" style={{ fontSize: '3rem', display: 'block', marginBottom: 12 }} />
        <h3 style={{ color: 'var(--text)', fontWeight: 700, marginBottom: 8 }}>Module en construction</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Cette section sera disponible prochainement.</p>
      </div>
    )
  }
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, profile, logout } = useAuth()
  const { unreadCount: notifUnread } = useNotif()
  const { dark, setDark } = useTheme()
  const navigate = useNavigate()

  const BADGES = { notifs: notifUnread, messages: 3 }

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
    toast.success('Déconnexion réussie')
  }

  const navTo = (t) => { setTab(t); setSidebarOpen(false) }

  const displayName = profile?.full_name || user?.name || user?.email || 'Administrateur'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font)', background: 'var(--bg3)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 99, backdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside style={{
        width: 256, flexShrink: 0,
        background: 'linear-gradient(180deg,#0a120d,#0f1a13)',
        borderRight: '1px solid rgba(255,255,255,.06)',
        padding: '20px 0',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        overflowY: 'auto', zIndex: 100,
        transition: 'transform .3s',
        transform: sidebarOpen ? 'translateX(0)' : undefined,
      }}
        className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}
      >
        {/* Brand */}
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#27ae60,#2ecc71)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: '#fff', flexShrink: 0 }}>
              <i className="bi bi-plus-circle-fill" />
            </div>
            <div>
              <div style={{ fontSize: '.85rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Pharmacie Admin</div>
              <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.35)', marginTop: 2 }}>Panneau de contrôle v3.0</div>
            </div>
          </div>
          {/* User card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'rgba(39,174,96,.08)', border: '1px solid rgba(39,174,96,.15)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(39,174,96,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#27ae60', fontSize: '.95rem', flexShrink: 0 }}>
              <i className="bi bi-person-fill" />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '.8rem', fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</div>
              <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.4)' }}>Super Admin</div>
            </div>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2ecc71', flexShrink: 0, boxShadow: '0 0 6px #2ecc71' }} />
          </div>
        </div>

        {/* Nav */}
        {NAV_SECTIONS.map((item, i) => {
          if (item.section) return (
            <div key={i} style={{ padding: '10px 20px 4px', fontSize: '.66rem', fontWeight: 700, color: 'rgba(255,255,255,.2)', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: 4 }}>
              {item.section}
            </div>
          )
          const badge = item.badge ? BADGES[item.badge] : 0
          const isActive = tab === item.tab
          return (
            <button key={i} onClick={() => navTo(item.tab)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 20px', background: isActive ? 'rgba(39,174,96,.1)' : 'none',
              border: 'none', borderLeft: `3px solid ${isActive ? '#27ae60' : 'transparent'}`,
              color: isActive ? '#27ae60' : 'rgba(255,255,255,.55)',
              fontFamily: 'var(--font)', fontSize: '.87rem', fontWeight: 500,
              cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all .2s',
            }}>
              <i className={`bi ${item.icon}`} style={{ width: 18, textAlign: 'center', fontSize: '.95rem' }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {badge > 0 && (
                <span style={{ background: '#e74c3c', color: '#fff', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.62rem', fontWeight: 700 }}>
                  {badge}
                </span>
              )}
            </button>
          )
        })}

        {/* Bottom links */}
        <div style={{ margin: '24px 0 0', padding: '16px 20px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <Link to="/?adminEdit=1" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', color: 'rgba(255,255,255,.45)', textDecoration: 'none', fontSize: '.83rem' }}>
            <i className="bi bi-arrow-up-right-circle" /> Voir le site
          </Link>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', background: 'none', border: 'none', color: 'rgba(231,76,60,.75)', fontFamily: 'inherit', fontSize: '.83rem', cursor: 'pointer', width: '100%' }}>
            <i className="bi bi-box-arrow-left" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <div style={{ marginLeft: 256, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top bar */}
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg3)', borderBottom: '1px solid var(--border)', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Mobile menu toggle */}
          <button onClick={() => setSidebarOpen(s => !s)}
            style={{ display: 'none', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, width: 38, height: 38, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.1rem' }}
            id="adminMenuBtn">
            <i className="bi bi-list" />
          </button>

          {/* Breadcrumb */}
          <div style={{ flex: 1 }}>
            <span style={{ color: 'var(--text-faint)', fontSize: '.8rem' }}>Admin</span>
            <span style={{ color: 'var(--text-faint)', fontSize: '.8rem', margin: '0 6px' }}>/</span>
            <span style={{ color: 'var(--primary)', fontSize: '.8rem', fontWeight: 600 }}>
              {NAV_SECTIONS.find(n => n.tab === tab)?.label || 'Tableau de bord'}
            </span>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: 220 }}>
            <i className="bi bi-search" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', fontSize: '.85rem' }} />
            <input placeholder="Rechercher..."
              style={{ width: '100%', padding: '8px 12px 8px 30px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', fontFamily: 'var(--font)', fontSize: '.83rem', outline: 'none' }} />
          </div>

          {/* Dark/Light toggle */}
          <button onClick={() => setDark(d => !d)}
            style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '.95rem', transition: 'all .2s' }}>
            <i className={`bi ${dark ? 'bi-sun-fill' : 'bi-moon-fill'}`} />
          </button>

          {/* Notification bell */}
          <button onClick={() => navTo('notifs')}
            style={{ position: 'relative', width: 34, height: 34, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '.95rem' }}>
            <i className="bi bi-bell-fill" />
            {notifUnread > 0 && (
              <span style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: '50%', background: '#e74c3c', color: '#fff', fontSize: '.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg3)' }}>
                {notifUnread}
              </span>
            )}
          </button>

          {/* User avatar */}
          <div title={displayName}
            style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#27ae60,#2ecc71)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '.9rem', cursor: 'default', flexShrink: 0 }}>
            {displayName[0]?.toUpperCase() || 'A'}
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}>
              <TabContent tab={tab} onNav={navTo} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <style>{`
        @media(max-width:900px){
          .admin-sidebar{transform:translateX(-100%)!important}
          .admin-sidebar.open{transform:translateX(0)!important}
          #adminMenuBtn{display:flex!important}
          [style*="marginLeft: 256"],[style*="margin-left: 256"]{margin-left:0!important}
        }
      `}</style>
    </div>
  )
}
