import { Link } from 'react-router-dom'
import { PHARMACY_INFO } from '../data/data'
import { useTranslation } from '../i18n'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t, lang } = useTranslation()
  const hours = (PHARMACY_INFO.hours && (PHARMACY_INFO.hours[lang] || PHARMACY_INFO.hours)) || ''
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div>
            <div className={styles.brand}>
              <div className={styles.logoIcon}><img src="/image/logo/logo.png" alt={PHARMACY_INFO.name} className={styles.logoImg} /></div>
              <span>{PHARMACY_INFO.name}</span>
            </div>
            <p className={styles.tagline}>{t('footer.tagline', { year: PHARMACY_INFO.since })}</p>
            <div className={styles.socials}>
              {['facebook','instagram','twitter','linkedin','youtube'].map(s => (
                <a key={s} href="#" className={styles.social} aria-label={s}><i className={`bi bi-${s}`} /></a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.colTitle}>Liens Rapides</h4>
            <ul className={styles.links}>
              {[['/', 'Accueil'], ['/services', 'Nos Services'], ['/galerie', 'Galerie Produits'], ['/a-propos', 'À Propos'], ['/actualites', 'Actualités'], ['/contact', 'Contact']].map(([path, label]) => (
                <li key={path}><Link to={path} className={styles.link}>→ {label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.contactInfo}>
              <p><i className="bi bi-geo-alt-fill" /> {PHARMACY_INFO.address}</p>
              <p><i className="bi bi-geo-alt" /> {PHARMACY_INFO.bp}</p>
              {PHARMACY_INFO.phones.map(p => (
                <p key={p}><i className="bi bi-telephone-fill" /> <a href={`tel:${p.replace(/\s/g,'')}`} className={styles.telLink}>{p}</a></p>
              ))}
                <p><i className="bi bi-clock-fill" /> {hours}</p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className={styles.colTitle}>Informations Légales</h4>
            <div className={styles.legal}>
              <p><strong>N° statistique :</strong> {PHARMACY_INFO.legal.stat}</p>
              <p><strong>RC :</strong> {PHARMACY_INFO.legal.rc}</p>
              <p><strong>N° contribuable :</strong> {PHARMACY_INFO.legal.contribuable}</p>
              <p style={{marginTop:'12px'}}><strong>Pharmacien Titulaire :</strong><br/>Dr DJOKO Ernest<br/><small>Docteur en pharmacie (Université de Paris XI)</small></p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {year} {PHARMACY_INFO.name}. Tous droits réservés. | Conçu avec ❤️ pour votre santé</p>
        </div>
      </div>
    </footer>
  )
}
