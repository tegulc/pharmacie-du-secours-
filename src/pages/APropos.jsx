import { useState, useRef, useEffect } from 'react'
import { PHARMACY_INFO, TEAM, TIMELINE, VALUES, PARTNERS } from '../data/data'
import styles from './APropos.module.css'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useGalerie } from '../context/GalerieContext'
import { useTranslation } from '../i18n'
import toast from 'react-hot-toast'

/* ─── Counter ─── */
function Counter({ end, suffix, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let v = 0
        const step = Math.ceil(end / 60)
        const timer = setInterval(() => { v = Math.min(v + step, end); setCount(v); if (v >= end) clearInterval(timer) }, 30)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return (
    <div className={styles.statItem} ref={ref}>
      <div className={styles.statNum}>{count.toLocaleString()}{suffix}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

/* ─── Photo Timeline Entry ─── */
function TimelineEntry({ entry, globalIndex, photo, isLast, onPhotoSet, onOpenLb, isAdmin, t }) {
  const inputRef = useRef(null)
  const isLeft = globalIndex % 2 === 0

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 4 * 1024 * 1024) { toast.error('Image trop grande (max 4 Mo)'); return }
    const reader = new FileReader()
    reader.onload = (ev) => { onPhotoSet(globalIndex, ev.target.result); toast.success(t('about.photoSaved') || 'Photo sauvegardée !') }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div className={`${styles.ptEntry} ${isLeft ? styles.ptLeft : styles.ptRight}`}>
      <div className={styles.ptCard}>
        {/* Photo frame */}
        <div
          className={`${styles.ptFrame} ${photo ? styles.ptFrameHasImg : ''}`}
          onClick={() => {
            if (photo) { onOpenLb(globalIndex); return }
            if (isAdmin) inputRef.current?.click()
          }}
          style={{ cursor: photo ? 'zoom-in' : (isAdmin ? 'pointer' : 'default') }}
        >
          {photo ? (
            <>
              <img src={photo} alt={entry.title} className={styles.ptImg} />
              <div className={styles.ptOverlay}><span><i className="bi bi-zoom-in" style={{ marginRight: 4 }} />{t('about.enlarge') || 'Agrandir'}</span></div>
              {/* saved badge */}
              <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(39,174,96,0.85)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20, zIndex: 4 }}>
                <i className="bi bi-check2" /> {t('gallery.saved') || 'Sauvegardé'}
              </span>
            </>
          ) : (
            <div className={styles.ptPlaceholder}>
              <i className="bi bi-image" />
              {isAdmin ? (
                <><strong>{t('about.clickAddPhoto') || '📷 Cliquez pour ajouter une photo'}</strong><p>{entry.year} · {entry.phase}</p></>
              ) : (
                <p style={{ opacity: 0.5, fontSize: '0.82rem' }}>{t('about.photoComingSoon') || 'Photo à venir'}</p>
              )}
            </div>
          )}
        </div>

        {/* Body */}
        <div className={styles.ptBody}>
          <div className={styles.ptYear}>{entry.year} · {entry.phase}</div>
          <h4 className={styles.ptTitle}>{entry.title}</h4>
          <p className={styles.ptDesc}>{entry.desc}</p>
          {isAdmin && (
            <button className={styles.ptUploadLabel} onClick={() => inputRef.current?.click()}>
              <i className="bi bi-cloud-arrow-up" />
              {photo ? (t('about.changePhoto') || 'Changer la photo') : (t('about.addPhoto') || 'Ajouter une photo')}
            </button>
          )}
        </div>
      </div>
      <div className={styles.ptDotWrap}>
        <div className={`${styles.ptDot} ${isLast ? styles.ptDotLast : ''}`} />
      </div>
      <div className={styles.ptSpacer} />
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
    </div>
  )
}

/* ─── Lightbox ─── */
function Lightbox({ src, title, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div className={styles.lightbox} onClick={onClose}>
      <button className={styles.lbClose} onClick={onClose}><i className="bi bi-x-lg" /></button>
      <div onClick={e => e.stopPropagation()}>
        <img src={src} alt={title} className={styles.lbImg} />
        <p className={styles.lbCaption}>{title}</p>
      </div>
    </div>
  )
}

/* ─── MAIN PAGE ─── */
export default function APropos() {
  const { lang } = useTheme()
  const { isAdmin } = useAuth()
  const { t } = useTranslation()
  const { timelinePhotos, setTimelinePhoto, timelineExtras, addTimelineEntry } = useGalerie()

  const timelineBase  = (TIMELINE[lang] || TIMELINE.fr)
  const valuesList    = (VALUES[lang]   || VALUES.fr)
  const statsList     = PHARMACY_INFO.stats || []
  const teamList      = TEAM[lang] || TEAM.fr || TEAM || []

  const [lbData, setLbData] = useState(null) // {src, title}

  // All entries: base + extra
  const allEntries = [
    ...timelineBase.map((e, i) => ({ ...e, globalIndex: i, photo: timelinePhotos[i] || null })),
    ...timelineExtras.map((e, i) => ({
      ...e,
      globalIndex: timelineBase.length + i,
      photo: timelinePhotos[timelineBase.length + i] || null,
    })),
  ]

  const handleAddEntry = () => {
    const year  = window.prompt(t('about.promptYear')  || 'Année ou période (ex: 2026) :')  || 'Nouvelle étape'
    const phase = window.prompt(t('about.promptPhase') || 'Nom de la phase :')              || 'Étape'
    const title = window.prompt(t('about.promptTitle') || 'Titre :')                        || 'Nouvelle étape'
    const desc  = window.prompt(t('about.promptDesc')  || 'Description :')                  || 'Description de cette étape.'
    addTimelineEntry({ year, phase, title, desc })
    toast.success(t('about.stepAdded') || 'Étape ajoutée !')
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-max">
          <h1>{t('about.title') || 'À'} <span>{t('about.titleSub') || 'Propos'}</span></h1>
          <p>{t('about.subtitle') || '40 ans d\'excellence pharmaceutique au service de Bafoussam'}</p>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className="section-title">
            <h2>{t('about.statsTitle') || 'Nos Chiffres Clés'}</h2>
            <p>{t('about.statsDesc') || 'Une pharmacie de confiance, portée par l\'expérience, l\'innovation et la proximité'}</p>
          </div>
          <div className={styles.statsGrid}>
            {statsList.map((s, i) => (
              <Counter
                key={i}
                end={s.count}
                suffix={s.suffix}
                label={typeof s.label === 'object' ? (s.label[lang] || s.label.fr) : s.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Text Timeline ─── */}
      <section className={styles.historySection} id="histoire">
        <div className={styles.container}>
          <div className="section-title"><h2>{t('about.historyTitle') || 'Notre Histoire'}</h2></div>
          <div className={styles.textTimeline}>
            {timelineBase.map((item, i) => (
              <div key={i} className={`${styles.tlItem} ${i % 2 === 0 ? styles.tlLeft : styles.tlRight}`}>
                <div className={styles.tlContent}>
                  <h3 className={styles.tlYear}>{item.year}</h3>
                  <h4 className={styles.tlPhase}>{item.phase}</h4>
                  <p className={styles.tlDesc}>{item.desc}</p>
                </div>
                <div className={styles.tlDot} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Photo Timeline ─── */}
      <section className={styles.photoSection} id="photo-timeline">
        <div className={styles.container}>
          <div className="section-title">
            <h2>{t('about.photoTitle') || 'Notre'} <span style={{ color: '#27ae60' }}>{t('about.photoTitleSub') || 'Évolution en Images'}</span></h2>
            <p>{t('about.photoDesc') || 'De la naissance à aujourd\'hui'}</p>
          </div>

          {/* Admin notice */}
          {isAdmin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', background: 'rgba(39,174,96,0.06)', border: '1px solid rgba(39,174,96,0.2)', borderRadius: 14, marginBottom: 30, flexWrap: 'wrap' }}>
              <i className="bi bi-shield-check" style={{ color: '#27ae60' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', flex: 1 }}>
                {t('about.adminPhotoNotice') || 'Mode Admin — Cliquez sur chaque cadre pour ajouter une photo. Les photos sont sauvegardées et visibles par tous les visiteurs.'}
              </span>
            </div>
          )}

          <div className={styles.ptLine}>
            {allEntries.map((entry, i) => (
              <TimelineEntry
                key={i}
                entry={entry}
                globalIndex={entry.globalIndex}
                photo={entry.photo}
                isLast={i === allEntries.length - 1}
                onPhotoSet={setTimelinePhoto}
                onOpenLb={(idx) => { const e = allEntries.find(x => x.globalIndex === idx); if (e?.photo) setLbData({ src: e.photo, title: e.title }) }}
                isAdmin={isAdmin}
                t={t}
              />
            ))}
          </div>

          {/* Add step button (admin only) */}
          {isAdmin && (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
              <button className={styles.addBtn} onClick={handleAddEntry}>
                <i className="bi bi-plus-circle" /> {t('about.addStep') || 'Ajouter une nouvelle étape'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className={styles.teamSection} id="equipe">
        <div className={styles.container}>
          <div className="section-title"><h2>{t('about.teamTitle') || 'Notre Équipe'}</h2></div>
          <div className={styles.teamGrid}>
            {(Array.isArray(teamList) ? teamList : []).map(member => (
              <div key={member.name} className={styles.teamCard}>
                <div className={styles.teamImgWrap}>
                  <img src={member.image} alt={member.name} className={styles.teamImg}
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                  <div className={styles.teamImgFallback} style={{ display: 'none' }}>
                    <i className="bi bi-person-circle" />
                  </div>
                </div>
                <h5 className={styles.teamName}>{member.name}</h5>
                <p className={styles.teamRole}>{member.role}</p>
                <small className={styles.teamDetail}>{member.detail}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className={styles.valSection} id="valeurs">
        <div className={styles.container}>
          <div className="section-title"><h2>{t('about.valuesTitle') || 'Nos Valeurs'}</h2></div>
          <div className={styles.valGrid}>
            {valuesList.map(v => (
              <div key={v.title} className={styles.valCard}>
                <i className={`bi ${v.icon} ${styles.valIcon}`} />
                <h5 className={styles.valTitle}>{v.title}</h5>
                <p className={styles.valDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Partners ─── */}
      <section className={styles.partnerSection}>
        <div className={styles.container}>
          <div className="section-title">
            <h2><i className="bi bi-award-fill" style={{ color: '#f39c12', marginRight: 10 }} />{t('about.partnersTitle') || 'Nos Partenaires'}</h2>
          </div>
          <div className={styles.partnerTrackWrap}>
            <div className={styles.partnerTrack}>
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <div key={i} className={styles.partnerLogo}>
                  <img src={p} alt={`Partenaire ${i + 1}`} loading="lazy"
                    onError={e => { e.target.parentNode.style.display = 'none' }} />
                </div>
              ))}
            </div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 24 }}>
            <i className="bi bi-check-circle-fill" style={{ color: '#27ae60', marginRight: 6 }} />
            {t('about.partnersCaption') || 'Plus de 50 partenaires pharmaceutiques internationaux'}
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lbData && <Lightbox src={lbData.src} title={lbData.title} onClose={() => setLbData(null)} />}
    </>
  )
}
