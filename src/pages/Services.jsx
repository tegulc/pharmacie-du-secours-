import { useState } from 'react'
import { SERVICES } from '../data/data'
import { useTheme } from '../context/ThemeContext'
import styles from './Services.module.css'

function ServiceCard({ icon, title, desc }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className={`${styles.card} ${flipped ? styles.flipped : ''}`}
      onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}>
      <div className={styles.inner}>
        <div className={styles.front}>
          <i className={`bi ${icon} ${styles.icon}`} />
          <h3 className={styles.cardTitle}>{title}</h3>
          <p style={{color:'rgba(255,255,255,0.4)',fontSize:'0.8rem',marginTop:'8px'}}>Survolez pour en savoir plus</p>
        </div>
        <div className={styles.back}>
          <i className={`bi ${icon}`} style={{fontSize:'1.6rem',color:'#27ae60',marginBottom:'14px'}} />
          <p className={styles.desc}>{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const { lang } = useTheme()
  const servicesList = (SERVICES && SERVICES[lang]) ? SERVICES[lang] : (SERVICES && SERVICES.fr) || []
  return (
    <>
      <section className="page-hero">
        <div className="container" style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
          <h1><i className="bi bi-grid me-3" /><span>Nos Services</span></h1>
          <p>Des prestations modernes, sécurisées et réalisées par des professionnels de santé diplômés</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className="section-title">
            <h2>Services Pharmaceutiques</h2>
            <p>Nous vous proposons une gamme complète de services pour prendre soin de votre santé au quotidien</p>
          </div>
          <div className={styles.grid}>
            {servicesList.map(s => <ServiceCard key={s.title} {...s} />)}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className={styles.emergency} id="urgence">
        <div className={styles.container}>
          <div className={styles.emergencyInner}>
            <div className={styles.emergencyIcon}><i className="bi bi-telephone-fill" /></div>
            <div>
              <h3>Urgence & Assistance 24h/24</h3>
              <p>Pour toute urgence médicale, notre équipe est disponible sur appel.</p>
            </div>
            <div className={styles.emergencyBtns}>
              <a href="tel:+237675146265" className="btn-primary-custom">
                <i className="bi bi-telephone-fill" /> (+237) 675 14 62 65
              </a>
              <a href="tel:+237698431111" className={styles.btnOutline}>
                <i className="bi bi-telephone" /> (+237) 698 43 11 11
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
