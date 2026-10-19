import { useState } from 'react'
import { PHARMACY_INFO } from '../data/data'
import { useTranslation } from '../i18n'
import styles from './Contact.module.css'

export default function Contact() {
  const { t, lang } = useTranslation()
  const [form, setForm]     = useState({ nom: '', email: '', type: '', message: '' })
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)
  const hours = (PHARMACY_INFO.hours && (PHARMACY_INFO.hours[lang] || PHARMACY_INFO.hours)) || ''

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  return (
    <>
      <section className="page-hero">
        <div className="container-max">
          <h1>{t('contact.title') || 'Nous'} <span>{t('contact.titleSub') || 'Contacter'}</span></h1>
          <p>{t('contact.subtitle') || 'Une question ? Notre équipe vous répond rapidement.'}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Info */}
            <div className={styles.infoPanel}>
              <h3 className={styles.panelTitle}><i className="bi bi-geo-alt-fill" /> {t('contact.information') || 'Informations'}</h3>
              <div className={styles.infoItem}>
                <i className="bi bi-building" />
                <div><h5>{t('contact.address') || 'Adresse'}</h5><p>{PHARMACY_INFO.address}<br />{PHARMACY_INFO.bp}</p></div>
              </div>
              <div className={styles.infoItem}>
                <i className="bi bi-telephone-fill" />
                <div><h5>{t('contact.telephone') || 'Téléphone'}</h5>
                  {PHARMACY_INFO.phones.map(p => <p key={p}><a href={`tel:${p.replace(/\s/g,'')}`}>{p}</a></p>)}
                </div>
              </div>
              <div className={styles.infoItem} id="horaires">
                <i className="bi bi-clock-fill" />
                <div><h5>{t('contact.hours') || 'Horaires'}</h5><p>{hours}</p></div>
              </div>
              <div className={styles.socials}>
                {['facebook','instagram','twitter','linkedin'].map(s => (
                  <a key={s} href="#" className={styles.social}><i className={`bi bi-${s}`} /></a>
                ))}
                <a href={`https://wa.me/${PHARMACY_INFO.whatsapp}`} className={styles.social}
                  style={{background:'rgba(37,211,102,0.15)',borderColor:'rgba(37,211,102,0.3)',color:'#25d366'}}
                  target="_blank" rel="noreferrer"><i className="bi bi-whatsapp" /></a>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formPanel}>
              <h3 className={styles.panelTitle}><i className="bi bi-envelope-fill" /> {t('contact.sendMessage') || 'Envoyer un Message'}</h3>
              {sent ? (
                <div className={styles.successMsg}>
                  <i className="bi bi-check-circle-fill" />
                  <h4>{t('contact.messageSent') || 'Message envoyé !'}</h4>
                  <p>{t('contact.messageSentDesc') || 'Nous vous répondrons dans les plus brefs délais.'}</p>
                  <button className={styles.resetBtn} onClick={() => { setSent(false); setForm({ nom:'', email:'', type:'', message:'' }) }}>
                    {t('contact.newMessage') || 'Nouveau message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <input className={styles.input} type="text" placeholder={t('contact.namePlaceholder') || 'Votre nom *'} required
                    value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} />
                  <input className={styles.input} type="email" placeholder={t('contact.emailPlaceholder') || 'Votre email *'} required
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  <select className={styles.input} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} required>
                    <option value="">{t('contact.requestType') || 'Type de demande *'}</option>
                    <option value="info">{t('contact.infoRequest') || "Demande d'information"}</option>
                    <option value="order">{t('contact.orderProduct') || 'Commander un produit'}</option>
                    <option value="conseil">{t('contact.pharmaAdvice') || 'Conseil pharmaceutique'}</option>
                    <option value="rdv">{t('contact.bookAppointment') || 'Prendre rendez-vous'}</option>
                    <option value="autre">{t('contact.other') || 'Autre'}</option>
                  </select>
                  <textarea className={`${styles.input} ${styles.textarea}`} rows={5}
                    placeholder={t('contact.messagePlaceholder') || 'Votre message *'} required
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading
                      ? <><span className={styles.spinner} /> {t('contact.sending') || 'Envoi en cours...'}</>
                      : <><i className="bi bi-send-fill" /> {t('contact.sendButton') || 'Envoyer le message'}</>
                    }
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map */}
          <div className={styles.mapSection} id="itineraire">
            <h3 className={styles.panelTitle} style={{ marginBottom: '20px' }}>
              <i className="bi bi-geo-alt-fill" /> {t('contact.locationTitle') || 'Notre Localisation'}
            </h3>
            <div className={styles.mapWrap}>
              <iframe src={PHARMACY_INFO.mapSrc} width="100%" height="420" style={{ border: 0, borderRadius: '14px' }}
                allowFullScreen loading="lazy" title={t('contact.mapTitle') || 'Carte Pharmacie du Secours'} />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <a href="https://www.google.com/maps/dir//5.466667,10.416667" target="_blank" rel="noreferrer" className="btn-primary-custom">
                <i className="bi bi-compass" /> {t('contact.directions') || "Obtenir l'itinéraire"}
              </a>
            </div>
          </div>

          {/* Emergency */}
          <div className={styles.emergencyBand} id="urgence">
            <i className="bi bi-exclamation-triangle-fill" style={{ color: '#e74c3c', fontSize: '1.8rem' }} />
            <div>
              <h4>{t('contact.emergencyTitle') || 'Urgence & Assistance'}</h4>
              <p>{t('contact.emergencyDesc') || 'Pour toute urgence médicale, contactez-nous sur :'}</p>
            </div>
            <div className={styles.emergencyBtns}>
              <a href="tel:+237698431111" className="btn-primary-custom"
                style={{ background: 'linear-gradient(135deg,#e74c3c,#c0392b)', boxShadow: '0 8px 25px rgba(231,76,60,0.35)' }}>
                <i className="bi bi-telephone-fill" /> {t('contact.emergencyCall') || '(+237) 698 43 11 11'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
