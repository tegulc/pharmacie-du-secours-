import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from '../i18n'
import { useAuth } from '../context/AuthContext'
import NotificationBell from './NotificationBell'
import styles from './Navbar.module.css'
// NAV_ITEMS are language-driven within the component so labels can translate automatically.

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const { dark, setDark, lang, setLang } = useTheme()
  const { t } = useTranslation()
  const { user, profile, isAdmin } = useAuth()
  const location = useLocation()
  const navRef = useRef(null)
  const searchRef = useRef(null)

  const NAV_ITEMS = [
    { label: t('nav.home'), path: '/', sub: [
      { label: t('nav.home'), path: '/', icon: 'bi-house' },
      { label: t('nav.servicesPremium'), path: '/#services', icon: 'bi-stars' },
      { label: t('nav.findUs'), path: '/#contact', icon: 'bi-geo-alt' },
    ]},
    { label: t('nav.services'), path: '/services', sub: [
      { label: t('nav.allServices'), path: '/services', icon: 'bi-grid' },
      { label: t('nav.advice'), path: '/services#conseils', icon: 'bi-chat-dots' },
      { label: t('nav.prevention'), path: '/services#depistage', icon: 'bi-heart-pulse' },
    ]},
    { label: t('nav.products'), path: '/galerie', sub: [
      { label: t('nav.gallery'), path: '/galerie', icon: 'bi-images' },
      { label: t('nav.medications'), path: '/galerie?cat=medicaments', icon: 'bi-capsule-pill' },
      { label: t('nav.parapharmacy'), path: '/galerie?cat=parapharmacie', icon: 'bi-heart' },
      { label: t('nav.vitamins'), path: '/galerie?cat=vitamines', icon: 'bi-stars' },
      { label: t('nav.baby'), path: '/galerie?cat=bebe', icon: 'bi-baby' },
      { label: t('nav.medicalEquipment'), path: '/galerie?cat=materiel', icon: 'bi-hospital' },
    ]},
    { label: t('nav.about'), path: '/a-propos', sub: [
      { label: t('nav.about'), path: '/a-propos', icon: 'bi-info-circle' },
      { label: t('nav.history'), path: '/a-propos#histoire', icon: 'bi-clock-history' },
      { label: t('nav.team'), path: '/a-propos#equipe', icon: 'bi-people' },
      { label: t('nav.values'), path: '/a-propos#valeurs', icon: 'bi-shield-check' },
    ]},
    { label: t('nav.contact'), path: '/contact', sub: [
      { label: t('nav.contactUs'), path: '/contact', icon: 'bi-envelope' },
      { label: t('nav.hours'), path: '/contact#horaires', icon: 'bi-calendar-week' },
      { label: t('nav.emergency'), path: '/contact#urgence', icon: 'bi-telephone' },
      { label: t('nav.directions'), path: '/contact#itineraire', icon: 'bi-map' },
    ]},
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setOpenDropdown(null) }, [location])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100)
    const handler = (e) => { if (e.key === 'Escape') { setSearchOpen(false); setSearchQ('') } }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [searchOpen])

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null); setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQ.trim()) return
    setSearchOpen(false); setSearchQ('')
  }

  return (
    <>
      <nav ref={navRef} className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.brand}>
            <motion.div className={styles.logoIcon} whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}>
              <img src="/image/logo/logo.png" alt="Pharmacie du Secours" className={styles.logoImg} />
            </motion.div>
            <span>Pharmacie <strong>du Secours</strong></span>
          </Link>

          {/* Desktop Nav */}
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path} className={styles.navItem}
                onMouseEnter={() => setOpenDropdown(item.path)}
                onMouseLeave={() => setOpenDropdown(null)}>
                <NavLink to={item.path} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                  {item.label}
                  {item.sub && <i className="bi bi-chevron-down" style={{ fontSize: '0.65rem', marginLeft: '3px' }} />}
                </NavLink>
                <AnimatePresence>
                  {item.sub && openDropdown === item.path && (
                    <motion.ul className={styles.dropdown}
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.18 }}>
                      <li className={styles.dropHeader}>{item.label}</li>
                      {item.sub.map((s) => (
                        <li key={s.path}>
                          <Link to={s.path} className={styles.dropItem}>
                            <i className={`bi ${s.icon}`} /> {s.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}

            {/* Galerie CTA */}
            <li>
              <NavLink to="/galerie" className={styles.galerieBtn}>
                <i className="bi bi-images" /> Galerie
              </NavLink>
            </li>

            {/* Actualités */}
            <li>
              <NavLink to="/actualites" className={styles.actualitesBtn}>🔥 Actus</NavLink>
            </li>
          </ul>

          {/* Right Controls */}
          <div className={styles.controls}>
            {/* Search */}
            <button className={styles.iconBtn} onClick={() => setSearchOpen(true)} title="Rechercher" aria-label="Rechercher">
              <i className="bi bi-search" />
            </button>

            {/* Dark/Light Toggle */}
            <button className={styles.themeToggle} onClick={() => setDark(d => !d)} title={dark ? 'Mode clair' : 'Mode sombre'} aria-label="Changer thème">
              <AnimatePresence mode="wait">
                <motion.i key={dark ? 'sun' : 'moon'}
                  className={`bi ${dark ? 'bi-sun-fill' : 'bi-moon-fill'}`}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </button>

            {/* Notifications (admin only) */}
            {isAdmin && <NotificationBell />}

            {/* Language */}
            <div className={styles.langSelector}>
              {['fr', 'en'].map(l => (
                <button key={l} className={`${styles.langBtn} ${lang === l ? styles.langActive : ''}`}
                  onClick={() => setLang(l)}>
                  <img src={`https://flagcdn.com/w40/${l === 'fr' ? 'fr' : 'gb'}.png`} alt={l.toUpperCase()} />
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Admin link */}
            {user ? (
              <Link to="/account" className={styles.adminBtn} style={{ fontSize: '0.88rem' }}>
                <i className="bi bi-person-circle" /> {profile?.full_name || user?.name || user?.email || t('nav.account') || 'Mon compte'}
              </Link>
            ) : (
              <Link to="/login" className={styles.adminBtn} style={{ opacity: 0.6, fontSize: '0.78rem' }}>
                <i className="bi bi-person" /> {t('nav.login') || 'Connexion'}
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div className={styles.mobileMenu}
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
              {/* Mobile search */}
              <div style={{ padding: '12px 24px 8px' }}>
                <div style={{ display: 'flex', gap: 8, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '8px 16px' }}>
                  <i className="bi bi-search" style={{ color: 'var(--text-muted)' }} />
                  <input style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text)', fontFamily: 'var(--font)', fontSize: '0.9rem', outline: 'none' }} placeholder="Rechercher..." />
                </div>
              </div>
              {NAV_ITEMS.map((item) => (
                <div key={item.path} className={styles.mobileItem}>
                  <button className={styles.mobileToggle}
                    onClick={() => setOpenDropdown(openDropdown === item.path ? null : item.path)}>
                    {item.label}
                    <i className={`bi ${openDropdown === item.path ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.path && item.sub && (
                      <motion.div className={styles.mobileSub}
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}>
                        {item.sub.map((s) => (
                          <Link key={s.path} to={s.path} className={styles.mobileSubLink}>
                            <i className={`bi ${s.icon}`} /> {s.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {/* Mobile bottom bar */}
              <div className={styles.mobileBottom}>
                <button className={styles.iconBtn} onClick={() => setDark(d => !d)}>
                  <i className={`bi ${dark ? 'bi-sun-fill' : 'bi-moon-fill'}`} />
                </button>
                {['fr', 'en'].map(l => (
                  <button key={l} className={`${styles.langBtn} ${lang === l ? styles.langActive : ''}`} onClick={() => setLang(l)}>
                    <img src={`https://flagcdn.com/w40/${l === 'fr' ? 'fr' : 'gb'}.png`} alt={l} />
                    {l.toUpperCase()}
                  </button>
                ))}
                {user ? (
                  <Link to="/account" className={styles.adminBtn}><i className="bi bi-person-circle" /> {profile?.full_name || user?.name || user?.email || 'Compte'}</Link>
                ) : (
                  <Link to="/login" className={styles.adminBtn}><i className="bi bi-person-lock" /> Connexion</Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div className="search-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setSearchOpen(false); setSearchQ('') }}>
            <motion.form
              className="search-box"
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={e => e.stopPropagation()}
              onSubmit={handleSearch}>
              <i className="bi bi-search" />
              <input
                ref={searchRef}
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Rechercher un produit, service..."
              />
              {searchQ && (
                <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}
                  onClick={() => setSearchQ('')}><i className="bi bi-x-lg" /></button>
              )}
              <kbd style={{ padding: '4px 10px', borderRadius: 6, background: 'var(--border)', color: 'var(--text-faint)', fontSize: '0.78rem', flexShrink: 0 }}>ESC</kbd>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
