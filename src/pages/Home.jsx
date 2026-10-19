import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HERO_SLIDES, SERVICES, PHARMACY_INFO } from '../data/data'
import { useTranslation } from '../i18n'
import { useTheme } from '../context/ThemeContext'
import { useScrollReveal, useCounter } from '../hooks/useScrollReveal'
import styles from './Home.module.css'
import slideH from '../assets/h.jpeg'
import slideIi from '../assets/kk.jpeg'
import slideO from '../assets/o.jpeg'
import slide12 from '../assets/12.jpeg'

/* ===== PARTICLES ===== */
function Particles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = canvas.offsetWidth
    let H = canvas.height = canvas.offsetHeight
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 0.5 + 0.15
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(39,174,96,${p.a})`
        ctx.fill()
      })
      // Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(39,174,96,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className={styles.particlesCanvas} />
}

/* ===== TYPING EFFECT ===== */
function TypingText({ words, speed = 90 }) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    const delay = deleting ? speed / 2 : speed
    const timer = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setDisplay(word.substring(0, charIdx + 1))
        setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === word.length) {
        setTimeout(() => setDeleting(true), 1800)
      } else if (deleting && charIdx > 0) {
        setDisplay(word.substring(0, charIdx - 1))
        setCharIdx(c => c - 1)
      } else if (deleting && charIdx === 0) {
        setDeleting(false)
        setWordIdx(w => (w + 1) % words.length)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [words, wordIdx, charIdx, deleting, speed])

  return <span className={styles.typingText}>{display}<span className="typing-cursor" /></span>
}

/* ===== ANIMATED COUNTER ===== */
function CounterStat({ end, suffix, label }) {
  const ref = useCounter(end)
  return (
    <motion.div className={styles.statItem} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
      <div className={styles.statNum}><span ref={ref}>0</span>{suffix}</div>
      <div className={styles.statLabel}>{label}</div>
    </motion.div>
  )
}

/* ===== SERVICE CARD ===== */
function ServiceCard({ icon, title, desc, delay = 0 }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      className={`${styles.serviceCard} ${flipped ? styles.flipped : ''}`}
      onHoverStart={() => setFlipped(true)} onHoverEnd={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <motion.i className={`bi ${icon} ${styles.serviceIcon}`} whileHover={{ scale: 1.15, rotate: 5 }} />
          <h3 className={styles.serviceTitle}>{title}</h3>
          <p style={{ color: 'var(--text-faint)', fontSize: '0.8rem', marginTop: 8 }}>Survolez pour en savoir plus</p>
        </div>
        <div className={styles.cardBack}>
          <i className={`bi ${icon}`} style={{ fontSize: '1.5rem', color: '#27ae60', marginBottom: 12 }} />
          <p className={styles.serviceDesc}>{desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ===== HOME PAGE ===== */
export default function Home() {
  const { t, lang } = useTranslation()
  const { lang: themeLang } = useTheme()
  const [heroIdx, setHeroIdx] = useState(0)
  useScrollReveal()

  const currentLang = (themeLang || 'fr').toLowerCase()
  const slideImages = [slideH, slideIi, slideO, slide12]
  const slides = HERO_SLIDES[currentLang] || HERO_SLIDES.fr
  const servicesList = (SERVICES && SERVICES[currentLang]) ? SERVICES[currentLang] : (SERVICES && SERVICES.fr) || []
  const localizedStats = PHARMACY_INFO.stats.map(s => ({
    ...s,
    label: typeof s.label === 'object' ? s.label[currentLang] || s.label.fr : s.label,
  }))

  useEffect(() => {
    const interval = setInterval(() => setHeroIdx(i => (i + 1) % slides.length), 5500)
    return () => clearInterval(interval)
  }, [themeLang, slides.length])

  const slide = slides[heroIdx % slides.length]

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <Particles />
        {slides.map((s, i) => (
          <motion.div key={i} className={styles.slide} style={{ backgroundImage: `url(${s.bg})` }}
            animate={{ opacity: i === heroIdx ? 1 : 0 }} transition={{ duration: 1.2 }} />
        ))}
        {/* Slide Images */}
        {slideImages.map((img, i) => (
          <motion.img key={`img-${i}`} src={img} alt="Slide" className={styles.slideImage}
            animate={{ opacity: i === heroIdx ? 1 : 0 }} transition={{ duration: 1.2 }} />
        ))}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.div className={styles.heroSubWrap}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={heroIdx} transition={{ duration: 0.6 }}>
            <span className={styles.heroBadge}><i className="bi bi-patch-check-fill" /> {t('home.heroBadge', { since: PHARMACY_INFO.since })}</span>
          </motion.div>
          <motion.h1 className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} key={`t-${heroIdx}`} transition={{ duration: 0.7, delay: 0.1 }}>
            {slide.title}
          </motion.h1>
          <div className={styles.heroTyping}>
            <TypingText words={t('home.heroTyping')} />
          </div>
          <motion.p className={styles.heroSub}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {slide.sub}
          </motion.p>
          <motion.div className={styles.heroBtns}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Link to={slide.link} className="btn-primary-custom">
              {slide.cta} <i className="bi bi-arrow-right" />
            </Link>
            <a href={`https://wa.me/${PHARMACY_INFO.whatsapp}`} target="_blank" rel="noreferrer"
              className={styles.btnWhatsapp}>
              <i className="bi bi-whatsapp" /> WhatsApp
            </a>
          </motion.div>
        </div>
        {/* Hero indicators */}
        <div className={styles.indicators}>
          {slides.map((_, i) => (
            <button key={i} className={`${styles.dot} ${i === heroIdx ? styles.dotActive : ''}`} onClick={() => setHeroIdx(i)} />
          ))}
        </div>
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => setHeroIdx(i => (i - 1 + slides.length) % slides.length)}><i className="bi bi-chevron-left" /></button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => setHeroIdx(i => (i + 1) % slides.length)}><i className="bi bi-chevron-right" /></button>
        {/* Scroll indicator */}
        <motion.div className={styles.scrollIndicator} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <i className="bi bi-chevron-double-down" />
        </motion.div>
      </section>

      {/* ===== STATS ===== */}
      <section className={styles.statsSection}>
        <div className={styles.sContainer}>
          <div className={styles.statsGrid}>
            {localizedStats.map(s => <CounterStat key={s.label} end={s.count} suffix={s.suffix} label={s.label} />)}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className={styles.servicesSection} id="services">
        <div className={styles.sContainer}>
          <div className="section-title reveal">
            <h2>Nos <span style={{ color: 'var(--primary)' }}>services</span></h2>
            <p>Retrouvez toute notre offre détaillée sur la page dédiée.</p>
          </div>
          <motion.div className={styles.servicesLinkBox} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className={styles.servicesLinkText}>La page services regroupe l’ensemble de nos prestations et informations utiles.</p>
            <Link to="/services" className="btn-primary-custom">Voir tous les services <i className="bi bi-arrow-right" /></Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaSection}>
        <div className={styles.sContainer}>
          <motion.div className={styles.ctaInner}
            initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div>
              <h2 className={styles.ctaTitle}>Votre santé est notre priorité</h2>
              <p className={styles.ctaSub}>40 ans d'expertise pharmaceutique à votre service. Disponibles 7j/7 de 7h30 à 20h00 à Bafoussam.</p>
            </div>
            <div className={styles.ctaBtns}>
              <a href={`tel:${PHARMACY_INFO.phones[0]}`} className="btn-primary-custom">
                <i className="bi bi-telephone-fill" /> Appeler maintenant
              </a>
              <Link to="/contact" className={styles.ctaBtnOutline}>
                <i className="bi bi-calendar-check" /> Prendre RDV
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== GALERIE TEASER ===== */}
      <section className={styles.galleryTeaser}>
        <div className={styles.sContainer}>
          <div className="section-title reveal">
            <h2>Notre <span style={{ color: 'var(--primary)' }}>Galerie Produits</span></h2>
            <p>Découvrez notre banque d'images de tous nos produits — cliquez sur une catégorie pour explorer.</p>
          </div>
          <div className={styles.catGrid}>
            {[
              { cat: 'medicaments', icon: 'bi-capsule-pill', label: 'Médicaments', color: '#e74c3c' },
              { cat: 'parapharmacie', icon: 'bi-heart-pulse', label: 'Parapharmacie', color: '#3498db' },
              { cat: 'bebe', icon: 'bi-baby', label: 'Bébé & Maternité', color: '#9b59b6' },
              { cat: 'vitamines', icon: 'bi-stars', label: 'Vitamines', color: '#f39c12' },
              { cat: 'materiel', icon: 'bi-hospital', label: 'Matériel Médical', color: '#27ae60' },
            ].map((c, i) => (
              <motion.div key={c.cat} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={`/galerie?cat=${c.cat}`} className={styles.catCard} style={{ '--c': c.color }}>
                  <i className={`bi ${c.icon}`} style={{ fontSize: '1.5rem', color: c.color }} />
                  <span>{c.label}</span>
                  <i className="bi bi-arrow-right" style={{ marginLeft: 'auto', fontSize: '0.8rem', opacity: 0.6 }} />
                </Link>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/galerie" className="btn-primary-custom"><i className="bi bi-images" /> Voir toute la galerie</Link>
          </div>
        </div>
      </section>

      {/* ===== NEWS CTA ===== */}
      <section className={styles.newsCta}>
        <div className={styles.sContainer}>
          <motion.div style={{ textAlign: 'center' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span style={{ display: 'inline-block', padding: '6px 18px', borderRadius: 50, background: 'rgba(243,156,18,0.15)', color: '#f39c12', fontSize: '0.85rem', fontWeight: 600, marginBottom: 16 }}>🔥 Actualités & Promotions</span>
            <h2 className="section-title" style={{ marginBottom: 12 }}>Restez informé de nos offres</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 30px', fontSize: '1rem' }}>Promotions, nouveautés, conseils santé — ne manquez rien de la Pharmacie du Secours.</p>
            <Link to="/actualites" className="btn-primary-custom">Voir toutes les actualités <i className="bi bi-arrow-right" /></Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
