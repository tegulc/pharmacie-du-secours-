import { useMemo, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { getStoredAdvice } from '../data/adviceStorage'
import styles from './Actualites.module.css'

export default function Actualites() {
  const { lang } = useTheme()
  const adviceList = useMemo(() => getStoredAdvice(), [lang])
  const [selectedAdviceId, setSelectedAdviceId] = useState(() => getStoredAdvice()[0]?.id || null)

  const currentAdvice = adviceList.find(a => a.id === selectedAdviceId) || adviceList[0] || null
  const archivedAdvice = adviceList.filter(a => a.id !== currentAdvice?.id)

  return (
    <>
      <section className="page-hero">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <h1>🔥 <span>Actualités</span></h1>
          <p>Découvrez le conseil de la semaine en cours et les conseils précédents archivés par semaine.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <section className={styles.adviceSection}>
            <div className={styles.container}>
              <div className="section-title">
                <h2><i className="bi bi-lightbulb-fill" /> Conseils de la Semaine</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)' }}>Le conseil actif de la semaine est affiché en priorité. Les anciens conseils restent disponibles dans l’historique.</p>
              </div>

              {currentAdvice ? (
                <div className={styles.adviceGrid}>
                  <div className={styles.adviceCard} style={{ gridColumn: '1 / -1' }}>
                    <div className={styles.adviceIcon}><i className="bi bi-heart-pulse-fill" /></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                      <span className={styles.tag}>Conseil de la semaine</span>
                      <span className={styles.tag}>{currentAdvice.weekLabel}</span>
                    </div>
                    <h4>{currentAdvice.title}</h4>
                    <p>{currentAdvice.content || currentAdvice.excerpt}</p>
                    <div className={styles.adviceTags}>
                      <span className={styles.tag}>Santé</span>
                      <span className={styles.tag}>{currentAdvice.author}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.adviceCard} style={{ textAlign: 'center' }}>
                  <p>Aucun conseil disponible pour le moment.</p>
                </div>
              )}

              {archivedAdvice.length > 0 && (
                <div style={{ marginTop: 26 }}>
                  <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: 12 }}>Semaines précédentes</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {archivedAdvice.map(item => (
                      <button
                        key={item.id}
                        className={`${styles.filterBtn} ${selectedAdviceId === item.id ? styles.active : ''}`}
                        onClick={() => setSelectedAdviceId(item.id)}
                        style={{ padding: '10px 14px' }}
                      >
                        <i className="bi bi-calendar3" /> {item.weekLabel}
                      </button>
                    ))}
                  </div>
                  {currentAdvice && selectedAdviceId !== currentAdvice.id && (
                    <div className={styles.adviceCard} style={{ marginTop: 16 }}>
                      <div className={styles.adviceIcon}><i className="bi bi-journal-medical" /></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                        <span className={styles.tag}>Archive</span>
                        <span className={styles.tag}>{(archivedAdvice.find(item => item.id === selectedAdviceId) || archivedAdvice[0]).weekLabel}</span>
                      </div>
                      <h4>{(archivedAdvice.find(item => item.id === selectedAdviceId) || archivedAdvice[0]).title}</h4>
                      <p>{(archivedAdvice.find(item => item.id === selectedAdviceId) || archivedAdvice[0]).content || (archivedAdvice.find(item => item.id === selectedAdviceId) || archivedAdvice[0]).excerpt}</p>
                      <div className={styles.adviceTags}>
                        <span className={styles.tag}>Santé</span>
                        <span className={styles.tag}>{(archivedAdvice.find(item => item.id === selectedAdviceId) || archivedAdvice[0]).author}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          <section className={styles.calendarSection}>
            <div className={styles.container}>
              <div className="section-title"><h2><i className="bi bi-calendar-check" /> Calendrier de Garde 2026</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)' }}>Pharmacies de garde 24h/24 - Service d'urgence pharmaceutique</p>
              </div>
              <CalendarSimple />
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

/* ===== Small Calendar Component ===== */
function CalendarSimple() {
  const [month, setMonth] = useState('janvier')
  const [pharmacy, setPharmacy] = useState('all')

  const guardCalendar2026 = {
    janvier: {1: "Nini, Marché B, La Grace, Panacé, Madelon",2: "Eprance, Amiénoise, Benali",3: "Mifi, Salvia, Noubissi",4: "Benin, Sourire, Montagne",5: "Secours, Nectar, Djoupe",6: "Binam, Madelon, Panacée",7: "Nini, La grâce, Marché B",8: "Asteret, Ste Monique, Amerciante",9: "Ange Gabriel, Moyo, Merveille",10: "Mifi, Salvia, Noubissi",11: "Amerciante, Benalis",12: "Benin, Sourire, Montagne",13: "Secours, Nectar, Djoupe",14: "Binam, Madelon, Panacée",15: "Nini, La grâce, Marché B",16: "Asteret, Ste Monique, Amerciante",17: "Ange Gabriel, Moyo, Merveille",18: "Benin, Sourire, Montagne",19: "Senin, Sourire, Montagne",20: "Secours, Nectar, Djoupe",21: "Binam, Madelon, Panacée",22: "Nini, La grâce, Marché B",23: "Amerciante, Montagne, Merveille",24: "Ange Gabriel, Moyo, Merveille",25: "Mifi, Salvia, Noubissi (E)",26: "Amerciante, Benalis",27: "Senin, Sourire, Montagne",28: "Secours, Nectar, Djoupe",29: "Binam, Madelon, Panacée",30: "Nini, La grâce, Marché B",31: ""},
    fevrier: {1: "Pasteur, Ste Monique, Americaine",2: "Ange Gabriel, Moyo, Merveille",3: "Mifi, Salvia, Noubissi",4: "Eprance, Amiénoise, Benali",5: "Benin, Sourire, Montagne",6: "Secours, Nectar, Djoupe",7: "Binam, Madelon, Panacée",8: "Nini, La grâce, Marché B",9: "Asteret, Ste Monique, Amerciante",10: "Ange Gabriel, Moyo, Merveille",11: "Secours, Nectar, Djoupe",12: "Mifi, Salvia, Noubissi",13: "Benin, Sourire, Montagne",14: "Secours, Nectar, Djoupe",15: "Binam, Madelon, Panacée",16: "Nini, La grâce, Marché B",17: "Asteret, Ste Monique, Amerciante",18: "Ange Gabriel, Moyo, Merveille",19: "Mifi, Salvia, Noubissi",20: "Asteret, Ste Monique, Amerciante",21: "Benin, Sourire, Montagne",22: "Secours, Nectar, Djoupe",23: "Binam, Madelon, Panacée",24: "Nini, La grâce, Marché B",25: "Asteret, Ste Monique, Amerciante",26: "Ange Gabriel, Moyo, Merveille",27: "Mifi, Salvia, Noubissi",28: "Amerciante, Benalis"},
    mars: {1: "Benin, Sourire, Montagne, Amerciante",2: "Secours, Nectar, Djoupe",3: "Binam, Madelon, Panacée",4: "Nini, La grâce, Marché B",5: "Asteret, Ste Monique, Amerciante",6: "Ange Gabriel, Moyo, Alexeille",7: "Mifi, Salvia, Noubissi",8: "Benin, Sourire, Montagne",9: "Benin, Sourire, Montagne",10: "Secours, Nectar, Djoupe",11: "Binam, Madelon, Panacée",12: "Nini, La grâce, Marché B",13: "Asteret, Ste Monique, Amerciante",14: "Ange Gabriel, Moyo, Merveilles",15: "Benin, Sourire, Montagne",16: "Secours, Nectar, Djoupe",17: "Binam, Madelon, Panacée",18: "Nini, La grâce, Marché B",19: "Asteret, Ste Monique, Amerciante",20: "Ange Gabriel, Moyo, Merveilles",21: "Mifi, Salvia, Noubissi",22: "Asteret, Ste Monique, Amerciante",23: "Benin, Sourire, Montagne",24: "Secours, Nectar, Djoupe",25: "Binam, Madelon, Panacée",26: "Nini, La grâce, Marché B",27: "Asteret, Ste Monique, Amerciante",28: "Ange Gabriel, Moyo, Merveilles",29: "Mifi, Salvia, Noubissi",30: "Amerciante, Benalis",31: "Amerciante, Benalis"},
    avril: {1: "Eprance, Amiénoise, Benali",2: "Benin, Sourire, Montagne",3: "Secours, Nectar, Djoupe",4: "Binam, Madelon, Panacée",5: "Nini, La grâce, Marché B",6: "Asteret, Ste Monique, Amerciante",7: "Mifi, Salvia, Noubissi",8: "Benin, Sourire, Montagne",9: "Asteret, Ste Monique, Amerciante",10: "Benin, Sourire, Montagne",11: "Secours, Nectar, Djoupe",12: "Binam, Madelon, Panacée",13: "Asteret, Ste Monique, Amerciante",14: "Ange Gabriel, Moyo, Merveilles",15: "Ange Gabriel, Moyo, Merveilles",16: "Mifi, Salvia, Noubissi",17: "Benin, Sourire, Montagne",18: "Secours, Nectar, Djoupe",19: "Binam, Madelon, Panacée",20: "Nini, La grâce, Marché B",21: "Amerciante, Montagne",22: "Ange Gabriel, Moyo, Merveilles",23: "Mifi, Salvia, Noubissi",24: "Benin, Sourire, Montagne",25: "Secours, Nectar, Djoupe",26: "Binam, Madelon, Panacée",27: "Secours, Nectar, Djoupe",28: "Nin, La grâce, Marché B",29: "Asteret, Ste Monique, Amerciante",30: "Asteret, Ste Monique, Amerciante"},
    mai: {1: "Eperance, Binam, Benalis",2: "Ange Gabriel, Moyo, Merveilles, Benalis",3: "Esperance, Amiénoise, Benalis",4: "Benin, Sourire, Montagne",5: "Mifi, Salvia, Noubissi",6: "Secours, Nectar, Djoupe",7: "Binam, Madelon, Panacée",8: "Nini, La grâce, Marché B",9: "Asteret, Ste Monique, Amerciante",10: "Ange Gabriel, Moyo, Merveilles",11: "Seconte, Nectar, Djoupe",12: "Binam, Madelon, Panacée",13: "Asteret, Ste Monique, Amerciante",14: "Secours, Nectar, Djoupe",15: "Binam, Madelon, Panacée",16: "Nini, La grâce, Marché B",17: "Asteret, Ste Monique, Amerciante",18: "Ange Gabriel, Moyo, Merveille",19: "Mifi, Salvia, Noubissi",20: "Asteret, Ste Monique, Amerciante",21: "Benin, Sourire, Montagne",22: "Secours, Nectar, Djoupe",23: "Binam, Madelon, Panacée",24: "Benin, Sourire, Montagne",25: "Asteret, Ste Monique, Amerciante",26: "Binam, Madelon, Panacée",27: "Nini, La grâce, Marché B",28: "Secours, Nectar, Djoupe",29: "Asteret, Ste Monique, Amerciante",30: "Asteret, Ste Monique, Amerciante",31: ""},
    juin: {1: "Eprance, Binam, Benalis, Benali",2: "Ange Gabriel, Moyo, Merveille, Benalis",3: "Esperance, Amiénoise, Benali",4: "Benin, Sourire, Montagne",5: "Mifi, Salvia, Noubissi",6: "Secours, Nectar, Djoupe",7: "Binam, Madelon, Panacée",8: "Nini, La grâce, Marché B",9: "Asteret, Ste Monique, Amerciante",10: "Ange Gabriel, Moyo, Merveille",11: "Seconte, Nectar, Djoupe",12: "Binam, Madelon, Panacée",13: "Asteret, Ste Monique, Amerciante",14: "Secours, Nectar, Djoupe",15: "Binam, Madelon, Panacée",16: "Nini, La grâce, Marché B",17: "Asteret, Ste Monique, Amerciante",18: "Ange Gabriel, Moyo, Merveille",19: "Mifi, Salvia, Noubissi",20: "Asteret, Ste Monique, Amerciante",21: "Benin, Sourire, Montagne",22: "Secours, Nectar, Djoupe",23: "Binam, Madelon, Panacée",24: "Benin, Sourire, Montagne",25: "Asteret, Ste Monique, Amerciante",26: "Binam, Madelon, Panacée",27: "Nini, La grâce, Marché B",28: "Secours, Nectar, Djoupe",29: "Nin, La grâce, Marché B",30: "Asteret, Ste Monique, Amerciante"},
    juillet: {1: "Benin, Sourire, Montagne",2: "Secours, Nectar, Djoupe",3: "Bham, Madelon, Panacé",4: "Nini, La grâce, Marché B",5: "Pasteur, Ste Monique",6: "Arne Gabriel, Moyo",7: "Miri, Salvia, Noubissi",8: "Esperance, Amiénoise",9: "Benin, Sourire, Montagne",10: "Secours, Nectar, Djoupe",11: "Bham, Madelon, Panacé",12: "Nini, La grâce, Marché B",13: "Pasteur, Ste Monique",14: "Arne Gabriel, Moyo",15: "Miri, Salvia, Noubissi",16: "Esperance, Amiénoise",17: "Benin, Sourire, Montagne",18: "Secours, Nectar, Djoupe",19: "Bham, Madelon, Panacé",20: "Nini, La grâce, Marché B",21: "Pasteur, Ste Monique",22: "Arne Gabriel, Moyo",23: "Miri, Salvia, Noubissi",24: "Esperance, Amiénoise",25: "Benin, Sourire, Montagne",26: "Secours, Nectar, Djoupe",27: "Bham, Madelon, Panacé",28: "Nini, La grâce, Marché B",29: "Pasteur, Ste Monique",30: "Arne Gabriel, Moyo",31: "Miri, Salvia, Noubissi"},
    aout: {1: "Esperance, Amiénoise",2: "Benin, Sourire, Montagne",3: "Secours, Nectar, Djoupe",4: "Bham, Madelon, Panacé",5: "Nini, La grâce, Marché B",6: "Pasteur, Ste Monique",7: "Arne Gabriel, Moyo",8: "Miri, Salvia, Noubissi",9: "Esperance, Amiénoise",10: "Benin, Sourire, Montagne",11: "Secours, Nectar, Djoupe",12: "Bham, Madelon, Panacé",13: "Nini, La grâce, Marché B",14: "Pasteur, Ste Monique",15: "Arne Gabriel, Moyo",16: "Miri, Salvia, Noubissi",17: "Pasteur, Ste Monique",18: "Benin, Sourire, Montagne",19: "Secours, Nectar, Djoupe",20: "Bham, Madelon, Panacé",21: "Nini, La grâce, Marché B",22: "Pasteur, Ste Monique",23: "Arne Gabriel, Moyo",24: "Miri, Salvia, Noubissi",25: "Esperance, Amiénoise",26: "Benin, Sourire, Montagne",27: "Secours, Nectar, Djoupe",28: "Bham, Madelon, Panacé",29: "Nini, La grâce, Marché B",30: "Pasteur, Ste Monique",31: "Arne Gabriel, Moyo"},
    septembre: {1: "Miri, Salvia, Noubissi",2: "Esperance, Amiénoise",3: "Benin, Sourire, Montagne",4: "Secours, Nectar, Djoupe",5: "Bham, Madelon, Panacé",6: "Nini, La grâce, Marché B",7: "Pasteur, Ste Monique",8: "Arne Gabriel, Moyo",9: "Miri, Salvia, Noubissi",10: "Esperance, Amiénoise",11: "Secours, Nectar, Djoupe",12: "Bham, Madelon, Panacé",13: "Nini, La grâce, Marché B",14: "Esperance, Amiénoise",15: "Arne Gabriel, Moyo",16: "Miri, Salvia, Noubissi",17: "Pasteur, Ste Monique",18: "Benin, Sourire, Montagne",19: "Secours, Nectar, Djoupe",20: "Bham, Madelon, Panacé",21: "Nini, La grâce, Marché B",22: "Pasteur, Ste Monique",23: "Arne Gabriel, Moyo",24: "Miri, Salvia, Noubissi",25: "Esperance, Amiénoise",26: "Benin, Sourire, Montagne",27: "Secours, Nectar, Djoupe",28: "Bham, Madelon, Panacé",29: "Nini, La grâce, Marché B",30: "Pasteur, Ste Monique"},
    octobre: {1: "Pasteur, Ste Monique",2: "Arne Gabriel, Moyo",3: "Arne Gabriel, Moyo",4: "Miri, Salvia, Noubissi",5: "Benin, Sourire, Montagne",6: "Secours, Nectar, Djoupe",7: "Bham, Madelon, Panacé",8: "Nini, La grâce, Marché B",9: "Secours, Ste Monique",10: "Arne Gabriel, Moyo",11: "Benin, Madelon, Panacé",12: "Benin, Sourire, Montagne",13: "Secours, Nectar, Djoupe",14: "Benin, Sourire, Montagne",15: "Benin, Sourire, Montagne",16: "Benin, Madelon, Panacé",17: "Nini, La grâce, Marché B",18: "Arne Gabriel, Moyo",19: "Miri, Salvia, Noubissi",20: "Esperance, Amiénoise",21: "Benin, Sourire, Montagne",22: "Secours, Nectar, Djoupe",23: "Bham, Madelon, Panacé",24: "Nini, La grâce, Marché B",25: "Nini, La grâce, Marché B",26: "Arne Gabriel, Moyo",27: "Miri, Salvia, Noubissi",28: "Esperance, Amiénoise",29: "Benin, Sourire, Montagne",30: "Secours, Nectar, Djoupe",31: "Bham, Madelon, Panacé"},
    novembre: {1: "Nini, La grâce, Marché B",2: "Pasteur, Ste Monique",3: "Arne Gabriel, Moyo",4: "Miri, Salvia, Noubissi",5: "Esperance, Amiénoise",6: "Benin, Sourire, Montagne",7: "Secours, Nectar, Djoupe",8: "Bham, Madelon, Panacé",9: "Nini, La grâce, Marché B",10: "Pasteur, Ste Monique",11: "Arne Gabriel, Moyo",12: "Miri, Salvia, Noubissi",13: "Esperance, Amiénoise",14: "Benin, Sourire, Montagne",15: "Secours, Nectar, Djoupe",16: "Benin, Madelon, Panacé",17: "Nini, La grâce, Marché B",18: "Pasteur, Ste Monique",19: "Arne Gabriel, Moyo",20: "Miri, Salvia, Noubissi",21: "Esperance, Amiénoise",22: "Benin, Sourire, Montagne",23: "Secours, Nectar, Djoupe",24: "Bham, Madelon, Panacé",25: "Nini, La grâce, Marché B",26: "Pasteur, Ste Monique",27: "Arne Gabriel, Moyo",28: "Miri, Salvia, Noubissi",29: "Esperance, Amiénoise",30: "Benin, Sourire, Montagne"},
    decembre: {1: "Secours, Nectar, Djoupe",2: "Bham, Madelon, Panacé",3: "Nini, La grâce, Marché B",4: "Pasteur, Ste Monique",5: "Arne Gabriel, Moyo",6: "Arne Gabriel, Moyo",7: "Secours, Amiénoise",8: "Benin, Salvia, Noubissi",9: "Benin, Sourire, Montagne",10: "Secours, Nectar, Djoupe",11: "Secours, Nectar, Djoupe",12: "Bham, Madelon, Panacé",13: "Nini, La grâce, Marché B",14: "Seconte, Amiénoise",15: "Secours, Nectar, Djoupe",16: "Benin, Sourire, Montagne",17: "Secours, Nectar, Djoupe",18: "Benin, Madelon, Panacé",19: "Secours, Nectar, Djoupe",20: "Pasteur, Ste Monique",21: "Arne Gabriel, Moyo",22: "Miri, Salvia, Noubissi",23: "Esperance, Amiénoise",24: "Benin, Sourire, Montagne",25: "Benin, Sourire, Montagne",26: "Secours, Nectar, Djoupe",27: "Bham, Madelon, Panacé",28: "Nini, La grâce, Marché B",29: "Pasteur, Ste Monique",30: "Arne Gabriel, Moyo",31: "Miri, Salvia, Noubissi"}
  }

  const months = Object.keys(guardCalendar2026)

  function formatPharmacyName(fullName) { return fullName ? fullName.split('/')[0].split('-')[0].trim() : '' }

  function getPharmacyCode(name) {
    if (!name) return 'other'
    if (name.includes('Secours')) return 'Secours'
    if (name.includes('Nini')) return 'Nini'
    if (name.includes('Mifi')) return 'Mifi'
    if (name.includes('Benin')) return 'Benin'
    return 'other'
  }

  const entries = guardCalendar2026[month] || {}
  const mIndex = months.indexOf(month)

  // build a full month grid (weeks of 7) including prev/next month days
  function buildMonthGrid(year, mIdx) {
    const first = new Date(year, mIdx, 1)
    const daysInMonth = new Date(year, mIdx + 1, 0).getDate()
    const startWeekday = first.getDay()
    const prevMonthDays = new Date(year, mIdx, 0).getDate()
    const grid = []
    for (let i = startWeekday - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i
      grid.push({ day: dayNum, inMonth: false, date: new Date(year, mIdx - 1, dayNum) })
    }
    for (let d = 1; d <= daysInMonth; d++) grid.push({ day: d, inMonth: true, date: new Date(year, mIdx, d) })
    while (grid.length % 7 !== 0) {
      const dayNum = grid.length - (startWeekday + daysInMonth) + 1
      grid.push({ day: dayNum, inMonth: false, date: new Date(year, mIdx + 1, dayNum) })
    }
    return grid
  }

  const grid = buildMonthGrid(2026, mIndex)
  const weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
  const [selectedDay, setSelectedDay] = useState(null)

  const colorVariants = [
    { bg: 'linear-gradient(135deg, rgba(39,174,96,0.18), rgba(46,204,113,0.1))', border: 'rgba(39,174,96,0.35)', shadow: '0 12px 30px rgba(39,174,96,0.2)' },
    { bg: 'linear-gradient(135deg, rgba(52,152,219,0.16), rgba(155,89,182,0.1))', border: 'rgba(52,152,219,0.35)', shadow: '0 12px 30px rgba(52,152,219,0.18)' },
    { bg: 'linear-gradient(135deg, rgba(231,76,60,0.16), rgba(241,196,15,0.1))', border: 'rgba(231,76,60,0.35)', shadow: '0 12px 30px rgba(231,76,60,0.18)' },
    { bg: 'linear-gradient(135deg, rgba(142,68,173,0.16), rgba(248, 197, 52,0.08))', border: 'rgba(142,68,173,0.35)', shadow: '0 12px 30px rgba(142,68,173,0.16)' },
    { bg: 'linear-gradient(135deg, rgba(22,160,133,0.16), rgba(46,204,113,0.08))', border: 'rgba(22,160,133,0.35)', shadow: '0 12px 30px rgba(22,160,133,0.18)' },
    { bg: 'linear-gradient(135deg, rgba(52,73,94,0.16), rgba(149,165,166,0.08))', border: 'rgba(52,73,94,0.35)', shadow: '0 12px 30px rgba(52,73,94,0.15)' }
  ]

  function handleClickDay(cell) {
    if (!cell.inMonth) {
      // navigate to adjacent month when clicking outside day
      const newMonthIndex = cell.date.getMonth()
      setMonth(months[newMonthIndex])
      setSelectedDay({ month: months[newMonthIndex], day: cell.day })
      return
    }
    setSelectedDay({ month, day: cell.day })
  }

  return (
    <>
      <div style={{ marginTop: 30 }}>
        <div className={styles.monthNavigation}>
          {months.map(m => (
            <button key={m} className={`${styles.monthBtn} ${m === month ? styles.monthActive : ''}`} onClick={() => { setMonth(m); setSelectedDay(null) }}>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
          ))}
        </div>

        <div style={{ margin: '18px 0', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <select value={pharmacy} onChange={e => setPharmacy(e.target.value)} className={styles.pharmacySelect}>
            <option value="all">Toutes les pharmacies</option>
            <option value="Secours">Pharmacie du Secours</option>
            <option value="Nini">Pharmacie Nini</option>
            <option value="Mifi">Pharmacie Mifi</option>
            <option value="Benin">Pharmacie Benin</option>
          </select>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{month.charAt(0).toUpperCase() + month.slice(1)} 2026</div>
        </div>

        <div className={styles.guardCalendar}>
          <div className={styles.weekdaysRow}>
            {weekdays.map(w => <div key={w} className={styles.weekday}>{w}</div>)}
          </div>
          <div className={styles.calendarGridFull}>
            {grid.map((cell, idx) => {
              const dayKey = `${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.day}`
              const phFull = cell.inMonth ? entries[cell.day] : null
              const code = getPharmacyCode(phFull || '')
              const accent = colorVariants[idx % colorVariants.length]
              const cellStyle = {
                borderColor: accent.border,
                background: accent.bg,
                boxShadow: accent.shadow
              }

              if (pharmacy !== 'all' && cell.inMonth && pharmacy !== code) return (
                <div key={dayKey} className={`${styles.calendarCell} ${styles.outsideMonth}`} style={cellStyle} onClick={() => handleClickDay(cell)}>
                  <div className={styles.cellNumber}>{cell.day}</div>
                </div>
              )
              return (
                <div key={dayKey} className={`${styles.calendarCell} ${cell.inMonth? styles.inMonth : styles.outsideMonth} ${selectedDay && selectedDay.month===month && selectedDay.day===cell.day ? styles.selected : ''} ${new Date().getFullYear()===2026 && new Date().getMonth()===mIndex && new Date().getDate()===cell.day && cell.inMonth ? styles.today : ''}`} style={cellStyle} onClick={() => handleClickDay(cell)}>
                  <div className={styles.cellNumber}>{cell.day}</div>
                  {cell.inMonth && <div className={styles.cellPh}>{formatPharmacyName(entries[cell.day])}</div>}
                </div>
              )
            })}
          </div>
        </div>

        {selectedDay && selectedDay.month === month && (
          <div className={styles.selectedInfo}>
            <h4>Détails du {selectedDay.day} {month.charAt(0).toUpperCase() + month.slice(1)} 2026</h4>
            <p className={styles.selectedText}>{entries[selectedDay.day] || 'Aucune information'}</p>
          </div>
        )}

        <div className={styles.calendarInfo}>
          <p><i className="bi bi-info-circle" /> <strong>Important :</strong> En cas d'urgence, appelez le <strong>(+237) 675 14 62 65</strong>.</p>
        </div>
      </div>
    </>
  )
}
