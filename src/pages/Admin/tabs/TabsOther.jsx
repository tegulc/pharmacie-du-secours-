import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { ANALYTICS_PAGES, ANALYTICS_SOURCES, ANALYTICS_MONTHLY, NOTIFS_DATA, SERVICES_DATA, SEO_DATA, SETTINGS_DATA } from '../AdminData'
import s from './tabs.module.css'

// ===== ANALYTICS =====
export function TabAnalytics() {
  const maxV = Math.max(...ANALYTICS_MONTHLY.map(d => d.visits))
  return (
    <div>
      <div className={s.pageHeader}>
        <div><h2 className={s.pageTitle}>Analytique</h2><p className={s.pageSub}>Performances du site web — Mai 2025</p></div>
        <select className={s.filterSelect}><option>Mai 2025</option><option>Avr 2025</option><option>Mars 2025</option></select>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { v: '3 421', l: 'Visiteurs ce mois',   c: '#27ae60', i: 'bi-people-fill' },
          { v: '8 min', l: 'Temps moyen/session', c: '#3498db', i: 'bi-clock' },
          { v: '42%',   l: 'Taux de rebond',      c: '#f39c12', i: 'bi-arrow-return-left' },
          { v: '2.4',   l: 'Pages / visite',      c: '#9b59b6', i: 'bi-files' },
        ].map((k, i) => (
          <motion.div key={i} className={s.card} style={{ padding: '20px 22px', textAlign: 'center' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <i className={`bi ${k.i}`} style={{ fontSize: '1.6rem', color: k.c, display: 'block', marginBottom: 8 }} />
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>{k.v}</div>
            <div style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{k.l}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Monthly chart */}
        <div className={s.card}>
          <div className={s.cardHeader}><h4 className={s.cardTitle}><i className="bi bi-bar-chart-line" /> Visites par mois</h4></div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 150, paddingTop: 10 }}>
            {ANALYTICS_MONTHLY.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '.72rem', color: 'var(--primary)', fontWeight: 700 }}>{(d.visits/1000).toFixed(1)}k</span>
                <motion.div
                  style={{ width: '100%', background: 'linear-gradient(to top,#27ae60,#2ecc71)', borderRadius: '4px 4px 0 0' }}
                  initial={{ height: 0 }} animate={{ height: `${(d.visits / maxV) * 110}px` }}
                  transition={{ delay: i * 0.08, duration: .7 }}
                />
                <span style={{ fontSize: '.7rem', color: 'var(--text-faint)' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className={s.card}>
          <div className={s.cardHeader}><h4 className={s.cardTitle}><i className="bi bi-pie-chart" /> Sources de trafic</h4></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ANALYTICS_SOURCES.map((src, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: '.85rem', color: 'var(--text)', fontWeight: 500 }}>{src.source}</span>
                  <span style={{ fontSize: '.83rem', color: src.color, fontWeight: 700 }}>{src.pct}%</span>
                </div>
                <div className={s.progressBar}>
                  <motion.div className={s.progressFill} style={{ background: src.color }}
                    initial={{ width: 0 }} animate={{ width: `${src.pct}%` }} transition={{ delay: i * 0.1, duration: 1 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pages table */}
      <div className={s.card}>
        <div className={s.cardHeader}><h4 className={s.cardTitle}><i className="bi bi-file-earmark-bar-graph" /> Pages les plus visitées</h4></div>
        <table className={s.table}>
          <thead><tr><th>Page</th><th>Visites</th><th>Taux rebond</th><th>Temps moy.</th><th>Part</th></tr></thead>
          <tbody>
            {ANALYTICS_PAGES.map((p, i) => (
              <tr key={i}>
                <td className={s.tdBold}>{p.label}</td>
                <td style={{ color: 'var(--primary)', fontWeight: 700 }}>{p.visits.toLocaleString()}</td>
                <td>{p.bounce}</td>
                <td>{p.avg}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className={s.progressBar} style={{ width: 80 }}>
                      <motion.div className={s.progressFill} initial={{ width: 0 }} animate={{ width: `${p.pct}%` }} transition={{ delay: i * 0.08, duration: .8 }} />
                    </div>
                    <span style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>{p.pct}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ===== NOTIFICATIONS =====
export function TabNotifications() {
  const [notifs, setNotifs] = useState(NOTIFS_DATA)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? notifs : notifs.filter(n => n.type === filter || (filter === 'unread' && !n.read))

  const markRead = (id) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))
  const markAll = () => { setNotifs(ns => ns.map(n => ({ ...n, read: true }))); toast.success('Toutes les notifications marquées comme lues') }
  const deleteN = (id) => { setNotifs(ns => ns.filter(n => n.id !== id)); toast.success('Notification supprimée') }

  const ICON_MAP = { info: { icon: 'bi-info-circle-fill', cls: s.notifIconInfo }, success: { icon: 'bi-check-circle-fill', cls: s.notifIconSuccess }, warning: { icon: 'bi-exclamation-triangle-fill', cls: s.notifIconWarning }, danger: { icon: 'bi-x-circle-fill', cls: s.notifIconDanger } }

  const unread = notifs.filter(n => !n.read).length

  return (
    <div>
      <div className={s.pageHeader}>
        <div><h2 className={s.pageTitle}>Notifications</h2><p className={s.pageSub}>{unread} non lues sur {notifs.length}</p></div>
        <div className={s.headerActions}>
          {unread > 0 && <button className={s.btnOutline} onClick={markAll}><i className="bi bi-check2-all" /> Tout marquer lu</button>}
        </div>
      </div>

      <div className={s.filterBar}>
        {[['all','Toutes'],['unread','Non lues'],['warning','Alertes stock'],['success','Succès'],['info','Info'],['danger','Critiques']].map(([v,l]) => (
          <button key={v} className={`${s.filterBtn} ${filter===v?s.active:''}`} onClick={() => setFilter(v)}>{l}</button>
        ))}
      </div>

      <div className={s.card}>
        {filtered.map((n, i) => (
          <motion.div key={n.id}
            className={`${s.notifItem} ${!n.read ? s.msgUnread : ''}`}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => markRead(n.id)}>
            <div className={`${s.notifIcon} ${ICON_MAP[n.type].cls}`}>
              <i className={`bi ${ICON_MAP[n.type].icon}`} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className={s.notifTitle}>{n.title}</div>
              <div className={s.notifMsg}>{n.msg}</div>
              <div className={s.notifTime}>{new Date(n.time).toLocaleString('fr-FR')}</div>
            </div>
            {!n.read && <span className={s.unreadDot} />}
            <button className={s.btnIconRed} onClick={e => { e.stopPropagation(); deleteN(n.id) }}><i className="bi bi-x" /></button>
          </motion.div>
        ))}
        {filtered.length === 0 && <p style={{ textAlign: 'center', padding: 32, color: 'var(--text-faint)' }}>Aucune notification.</p>}
      </div>
    </div>
  )
}

// ===== SERVICES =====
export function TabServices() {
  const [services, setServices] = useState(SERVICES_DATA)
  const toggleService = (id) => {
    setServices(ss => ss.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s))
    toast.success('Service mis à jour')
  }
  return (
    <div>
      <div className={s.pageHeader}>
        <div><h2 className={s.pageTitle}>Gestion des Services</h2><p className={s.pageSub}>{services.filter(s=>s.status==='active').length} services actifs</p></div>
        <button className={s.btnPrimary} onClick={() => toast('Formulaire en cours de développement')}><i className="bi bi-plus-circle" /> Nouveau service</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {services.map((svc, i) => (
          <motion.div key={svc.id} className={s.card}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: svc.status === 'active' ? 'rgba(39,174,96,.15)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: svc.status === 'active' ? '#27ae60' : 'var(--text-faint)', flexShrink: 0 }}>
                <i className={`bi ${svc.icon}`} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                  <h4 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '.92rem', margin: 0 }}>{svc.title}</h4>
                  {/* Toggle */}
                  <label className={s.formToggle} onClick={() => toggleService(svc.id)}>
                    <div className={`${s.toggle} ${svc.status === 'active' ? s.toggleOn : s.toggleOff}`}>
                      <div className={s.toggleKnob} style={{ left: svc.status === 'active' ? 23 : 3 }} />
                    </div>
                  </label>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '.82rem', margin: '0 0 8px', lineHeight: 1.5 }}>{svc.desc}</p>
                <span className={`${s.badge} ${svc.status === 'active' ? s.badgeGreen : s.badgeGrey}`}>{svc.status === 'active' ? 'Actif' : 'Inactif'}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ===== SEO =====
export function TabSEO() {
  const [data, setData] = useState(SEO_DATA)
  const scoreColor = data.score >= 80 ? '#27ae60' : data.score >= 60 ? '#f39c12' : '#e74c3c'

  return (
    <div>
      <div className={s.pageHeader}>
        <div><h2 className={s.pageTitle}>Gestion SEO</h2><p className={s.pageSub}>Optimisation pour les moteurs de recherche</p></div>
        <button className={s.btnPrimary} onClick={() => toast.success('Paramètres SEO sauvegardés !')}><i className="bi bi-save" /> Sauvegarder</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginBottom: 20 }}>
        {/* Score */}
        <div className={s.card} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ fontSize: '4rem', fontWeight: 900, color: scoreColor, lineHeight: 1 }}>{data.score}</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>Score SEO Global</div>
          <div className={s.progressBar} style={{ width: '100%' }}>
            <motion.div className={s.progressFill} style={{ background: scoreColor }} initial={{ width: 0 }} animate={{ width: `${data.score}%` }} transition={{ duration: 1 }} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[['bi-diagram-3', data.sitemap, 'Sitemap'], ['bi-robot', data.robotsTxt, 'robots.txt'], ['bi-eye', data.indexable, 'Indexable']].map(([icon, ok, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <i className={`bi ${icon}`} style={{ color: ok ? '#27ae60' : '#e74c3c', fontSize: '1.2rem', display: 'block', marginBottom: 3 }} />
                <span style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Meta tags */}
        <div className={s.card}>
          <h4 className={s.cardTitle} style={{ marginBottom: 18 }}>Métadonnées</h4>
          <div className={s.form}>
            {[
              ['Titre SEO (< 60 chars)', 'title', data.title],
              ['Méta description (< 160 chars)', 'description', data.description],
              ['Mots-clés', 'keywords', data.keywords],
              ['OG Title (réseaux sociaux)', 'ogTitle', data.ogTitle],
            ].map(([label, key, val]) => (
              <div key={key} className={s.formField}>
                <label className={s.formLabel}>{label}</label>
                <input className={s.formInput} value={val}
                  onChange={e => setData(d => ({ ...d, [key]: e.target.value }))} />
                <span style={{ fontSize: '.72rem', color: 'var(--text-faint)', textAlign: 'right' }}>{val.length} / {key === 'title' ? 60 : key === 'description' ? 160 : '∞'} chars</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pages SEO score */}
      <div className={s.card}>
        <h4 className={s.cardTitle} style={{ marginBottom: 18 }}>Score par page</h4>
        <table className={s.table}>
          <thead><tr><th>Page</th><th>URL</th><th>Score</th><th>Problèmes</th><th>Barre</th></tr></thead>
          <tbody>
            {data.pages.map((p, i) => {
              const c = p.score >= 80 ? '#27ae60' : p.score >= 60 ? '#f39c12' : '#e74c3c'
              return (
                <tr key={i}>
                  <td className={s.tdBold}>{p.title}</td>
                  <td className={s.tdMuted}>{p.url}</td>
                  <td style={{ fontWeight: 800, color: c }}>{p.score}/100</td>
                  <td><span className={`${s.badge} ${p.issues === 0 ? s.badgeGreen : p.issues <= 2 ? s.badgeOrange : s.badgeRed}`}>{p.issues === 0 ? 'OK' : `${p.issues} problème(s)`}</span></td>
                  <td style={{ width: 120 }}>
                    <div className={s.progressBar}>
                      <motion.div className={s.progressFill} style={{ background: c }} initial={{ width: 0 }} animate={{ width: `${p.score}%` }} transition={{ delay: i * 0.08, duration: .8 }} />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ===== SETTINGS =====
export function TabSettings() {
  const [settings, setSettings] = useState(SETTINGS_DATA)
  const [activeSection, setActiveSection] = useState('general')

  const sections = [
    { id: 'general', label: 'Général', icon: 'bi-info-circle' },
    { id: 'legal', label: 'Informations légales', icon: 'bi-shield-check' },
    { id: 'payment', label: 'Paiement CinetPay', icon: 'bi-credit-card' },
    { id: 'maintenance', label: 'Mode Maintenance', icon: 'bi-tools' },
  ]

  const save = () => toast.success('Paramètres sauvegardés avec succès !')

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className={s.form}>
            {[
              ['Nom de la pharmacie', 'name'], ['Slogan', 'slogan'], ['Email', 'email'],
              ['Téléphone 1', 'phone1'], ['Téléphone 2', 'phone2'], ['Téléphone 3', 'phone3'],
              ['Adresse complète', 'address'], ['Numéro WhatsApp', 'whatsapp'], ['Horaires', 'hours'],
              ['Facebook URL', 'facebook'], ['Instagram URL', 'instagram'],
            ].map(([label, key]) => (
              <div key={key} className={s.formField}>
                <label className={s.formLabel}>{label}</label>
                <input className={s.formInput} value={settings.general[key] || ''}
                  onChange={e => setSettings(st => ({ ...st, general: { ...st.general, [key]: e.target.value } }))} />
              </div>
            ))}
          </div>
        )
      case 'legal':
        return (
          <div className={s.form}>
            {[['N° Statistique', 'stat'], ['N° RC', 'rc'], ['N° Contribuable', 'contribuable'], ['Pharmacien Titulaire', 'pharmacien'], ['Diplôme / Titre', 'diplome']].map(([label, key]) => (
              <div key={key} className={s.formField}>
                <label className={s.formLabel}>{label}</label>
                <input className={s.formInput} value={settings.legal[key] || ''}
                  onChange={e => setSettings(st => ({ ...st, legal: { ...st.legal, [key]: e.target.value } }))} />
              </div>
            ))}
          </div>
        )
      case 'payment':
        return (
          <div className={s.form}>
            <div style={{ background: 'rgba(243,156,18,.08)', border: '1px solid rgba(243,156,18,.3)', borderRadius: 12, padding: '12px 16px', marginBottom: 8, fontSize: '.85rem', color: '#f39c12' }}>
              <i className="bi bi-exclamation-triangle me-2" />
              Remplacez les clés de test par vos vraies clés CinetPay en production.
            </div>
            {[['API Key CinetPay', 'cinetpay_key'], ['Site ID CinetPay', 'cinetpay_site'], ['Devise', 'currency']].map(([label, key]) => (
              <div key={key} className={s.formField}>
                <label className={s.formLabel}>{label}</label>
                <input className={s.formInput} value={settings.payment[key] || ''}
                  onChange={e => setSettings(st => ({ ...st, payment: { ...st.payment, [key]: e.target.value } }))} />
              </div>
            ))}
            <div className={s.formField}>
              <label className={s.formLabel}>Mode</label>
              <select className={s.formSelect} value={settings.payment.mode}
                onChange={e => setSettings(st => ({ ...st, payment: { ...st.payment, mode: e.target.value } }))}>
                <option value="TEST">TEST</option><option value="PRODUCTION">PRODUCTION</option>
              </select>
            </div>
            <div className={s.formField}>
              <label className={s.formLabel} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label className={s.formToggle}>
                  <div className={`${s.toggle} ${settings.payment.enabled ? s.toggleOn : s.toggleOff}`}
                    onClick={() => setSettings(st => ({ ...st, payment: { ...st.payment, enabled: !st.payment.enabled } }))}>
                    <div className={s.toggleKnob} style={{ left: settings.payment.enabled ? 23 : 3 }} />
                  </div>
                </label>
                Paiement en ligne activé
              </label>
            </div>
          </div>
        )
      case 'maintenance':
        return (
          <div>
            <div className={s.card} style={{ textAlign: 'center', padding: 36 }}>
              <i className={`bi ${settings.maintenance ? 'bi-tools' : 'bi-check-circle'}`} style={{ fontSize: '3rem', color: settings.maintenance ? '#f39c12' : '#27ae60', display: 'block', marginBottom: 16 }} />
              <h3 style={{ color: 'var(--text)', marginBottom: 8 }}>Mode Maintenance</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
                Quand activé, les visiteurs voient une page de maintenance. L'admin conserve l'accès complet.
              </p>
              <label className={s.formToggle} style={{ justifyContent: 'center', marginBottom: 20 }}>
                <div className={`${s.toggle} ${settings.maintenance ? s.toggleOn : s.toggleOff}`}
                  onClick={() => { setSettings(st => ({ ...st, maintenance: !st.maintenance })); toast(settings.maintenance ? 'Mode maintenance désactivé' : 'Mode maintenance activé !', { icon: settings.maintenance ? '✅' : '⚠️' }) }}>
                  <div className={s.toggleKnob} style={{ left: settings.maintenance ? 23 : 3 }} />
                </div>
                <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: '.9rem', marginLeft: 10 }}>
                  {settings.maintenance ? 'Maintenance ACTIVE' : 'Site en ligne'}
                </span>
              </label>
              <div style={{ padding: '12px 20px', borderRadius: 10, background: settings.maintenance ? 'rgba(243,156,18,.1)' : 'rgba(39,174,96,.1)', border: `1px solid ${settings.maintenance ? 'rgba(243,156,18,.3)' : 'rgba(39,174,96,.3)'}`, fontSize: '.88rem', color: settings.maintenance ? '#f39c12' : '#27ae60', maxWidth: 360, margin: '0 auto' }}>
                {settings.maintenance ? '⚠️ Le site est actuellement en maintenance. Les visiteurs voient la page de maintenance.' : '✅ Le site est accessible normalement à tous les visiteurs.'}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div>
      <div className={s.pageHeader}>
        <div><h2 className={s.pageTitle}>Paramètres</h2><p className={s.pageSub}>Configuration générale de la pharmacie</p></div>
        <button className={s.btnPrimary} onClick={save}><i className="bi bi-save" /> Sauvegarder tout</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        {/* Section nav */}
        <div className={s.card} style={{ padding: '12px 0', height: 'fit-content' }}>
          {sections.map(sec => (
            <button key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 18px', background: 'none', border: 'none', borderLeft: `3px solid ${activeSection === sec.id ? '#27ae60' : 'transparent'}`, color: activeSection === sec.id ? '#27ae60' : 'var(--text-muted)', fontFamily: 'inherit', fontSize: '.88rem', fontWeight: 500, cursor: 'pointer', transition: 'all .2s', textAlign: 'left' }}>
              <i className={`bi ${sec.icon}`} style={{ width: 18 }} />
              {sec.label}
            </button>
          ))}
        </div>
        {/* Content */}
        <div className={s.card}>
          <h4 className={s.cardTitle} style={{ marginBottom: 22 }}>
            <i className={`bi ${sections.find(s => s.id === activeSection)?.icon}`} style={{ color: 'var(--primary)' }} />
            {' '}{sections.find(sec => sec.id === activeSection)?.label}
          </h4>
          {renderSection()}
          {activeSection !== 'maintenance' && (
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <button className={s.btnPrimary} onClick={save}><i className="bi bi-check2" /> Sauvegarder</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
