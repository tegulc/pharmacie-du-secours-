import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { ARTICLES_DATA } from '../AdminData'
import { addAdviceEntry, getStoredAdvice } from '../../../data/adviceStorage'
import s from './tabs.module.css'

const CATS = { all: 'Tous', promotions: 'Promotions', nouveautes: 'Nouveautés', conseils: 'Conseils Santé' }
const CAT_COLORS = { promotions: '#e74c3c', nouveautes: '#f39c12', conseils: '#27ae60' }

function getEmptyForm(mode = 'article') {
  return {
    title: '',
    cat: 'conseils',
    excerpt: '',
    content: '',
    author: 'Dr DJOKO',
    status: 'published',
    isAdvice: mode === 'advice',
    weekStart: new Date().toISOString().slice(0, 10),
  }
}

function formatWeekLabel(weekStart) {
  if (!weekStart) return 'Semaine en cours'
  const date = new Date(weekStart)
  const day = date.getDay() || 7
  const start = new Date(date)
  start.setDate(date.getDate() - day + 1)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return `Semaine du ${start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} au ${end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`
}

function ArticleModal({ article, onClose, onSave, initialMode = 'article' }) {
  const [form, setForm] = useState(article || getEmptyForm(initialMode))
  const isNew = !article?.id
  const isAdviceMode = Boolean(form.isAdvice)
  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <motion.div className={s.modal} onClick={e => e.stopPropagation()}
        style={{ maxWidth: 640 }}
        initial={{ opacity: 0, scale: .95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: .95, y: 20 }}>
        <h3 className={s.modalTitle}>
          <i className="bi bi-newspaper" /> {isNew ? (isAdviceMode ? 'Nouveau conseil' : 'Nouvel article') : 'Modifier l\'élément'}
        </h3>
        <form className={s.form} onSubmit={e => { e.preventDefault(); onSave({ ...form, id: article?.id || Date.now() }) }}>
          <div className={s.formField}>
            <label className={s.formLabel}>Titre *</label>
            <input className={s.formInput} required placeholder="Titre de l'article..."
              value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div className={s.formRow}>
            <div className={s.formField}>
              <label className={s.formLabel}>Catégorie</label>
              <select className={s.formSelect} value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}>
                {Object.entries(CATS).filter(([k]) => k !== 'all').map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div className={s.formField}>
              <label className={s.formLabel}>Auteur</label>
              <select className={s.formSelect} value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}>
                <option>Dr DJOKO</option><option>Dr CHIGHEN</option>
              </select>
            </div>
          </div>
          <div className={s.formField}>
            <label className={s.formLabel}>Résumé (extrait) *</label>
            <textarea className={s.formTextarea} rows={2} required placeholder="Court résumé visible en liste..."
              value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} />
          </div>
          <div className={s.formField}>
            <label className={s.formLabel}>Type de contenu</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text)', fontSize: '.9rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={isAdviceMode} onChange={e => setForm(f => ({ ...f, isAdvice: e.target.checked, cat: e.target.checked ? 'conseils' : f.cat }))} />
              Publier comme conseil de la semaine
            </label>
          </div>
          {form.isAdvice && (
            <div className={s.formField}>
              <label className={s.formLabel}>Date de début de semaine *</label>
              <input className={s.formInput} type="date" required value={form.weekStart || ''} onChange={e => setForm(f => ({ ...f, weekStart: e.target.value }))} />
            </div>
          )}
          <div className={s.formField}>
            <label className={s.formLabel}>Contenu complet</label>
            <textarea className={s.formTextarea} rows={5} placeholder="Contenu détaillé de l'article..."
              value={form.content || ''} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
          </div>
          <div className={s.formField}>
            <label className={s.formLabel}>Statut</label>
            <select className={s.formSelect} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option value="published">Publié</option>
              <option value="draft">Brouillon</option>
            </select>
          </div>
          <div className={s.modalFooter}>
            <button type="button" className={s.btnOutline} onClick={onClose}>Annuler</button>
            <button type="submit" className={s.btnPrimary}>
              <i className="bi bi-check2" /> {isNew ? 'Publier' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function TabArticles() {
  const [articles, setArticles] = useState(ARTICLES_DATA)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)

  const filtered = articles.filter(a =>
    (filter === 'all' || a.cat === filter) &&
    (!search || a.title.toLowerCase().includes(search.toLowerCase()))
  )

  const handleSave = (form) => {
    const isNew = !articles.find(a => a.id === form.id)
    if (form.isAdvice) {
      const adviceEntry = {
        id: form.id || `advice-${Date.now()}`,
        title: form.title,
        excerpt: form.excerpt,
        content: form.content || form.excerpt,
        weekLabel: formatWeekLabel(form.weekStart),
        weekStart: form.weekStart || new Date().toISOString().slice(0, 10),
        author: form.author,
        createdAt: new Date().toISOString(),
      }
      addAdviceEntry(adviceEntry)
      toast.success('Conseil de la semaine ajouté !')
    } else if (isNew) {
      setArticles(prev => [{ ...form, views: 0, date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) }, ...prev])
      toast.success('Article publié !')
    } else {
      setArticles(prev => prev.map(a => a.id === form.id ? { ...a, ...form } : a))
      toast.success('Article modifié !')
    }
    setModal(null)
  }

  const handleDelete = (id) => {
    if (!window.confirm('Supprimer cet article ?')) return
    setArticles(prev => prev.filter(a => a.id !== id))
    toast.success('Article supprimé')
  }

  const toggleStatus = (id) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'published' ? 'draft' : 'published' } : a))
    toast.success('Statut mis à jour')
  }

  const totalViews = articles.filter(a => a.status === 'published').reduce((acc, a) => acc + a.views, 0)
  const adviceCount = getStoredAdvice().length

  return (
    <div>
      <div className={s.pageHeader}>
        <div>
          <h2 className={s.pageTitle}>Gestion des Conseils & Actualités</h2>
          <p className={s.pageSub}>{articles.length} articles • {adviceCount} conseils archivés • {totalViews.toLocaleString()} vues totales • {articles.filter(a => a.status === 'draft').length} brouillons</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className={s.btnOutline} onClick={() => setModal({ mode: 'advice' })}>
            <i className="bi bi-lightbulb" /> Ajouter un conseil
          </button>
          <button className={s.btnPrimary} onClick={() => setModal({ mode: 'article' })}>
            <i className="bi bi-plus-circle" /> Nouvel article
          </button>
        </div>
      </div>

      {/* Stats mini */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 20 }}>
        {Object.entries(CATS).filter(([k]) => k !== 'all').map(([k, v]) => {
          const count = articles.filter(a => a.cat === k).length
          const views = articles.filter(a => a.cat === k).reduce((acc, a) => acc + a.views, 0)
          return (
            <div key={k} className={s.card} style={{ padding: '16px 18px', cursor: 'pointer', borderColor: filter === k ? CAT_COLORS[k] : undefined }}
              onClick={() => setFilter(k)}>
              <div style={{ fontSize: '.72rem', fontWeight: 700, color: CAT_COLORS[k], textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 4 }}>{v}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)', lineHeight: 1 }}>{count}</div>
              <div style={{ fontSize: '.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{views} vues</div>
            </div>
          )
        })}
      </div>

      {/* Filter bar */}
      <div className={s.filterBar}>
        <div className={s.searchWrap}>
          <i className={`bi bi-search ${s.searchIcon}`} />
          <input className={s.searchInput} placeholder="Rechercher un article..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {Object.entries(CATS).map(([k, v]) => (
          <button key={k} className={`${s.filterBtn} ${filter === k ? s.active : ''}`} onClick={() => setFilter(k)}>{v}</button>
        ))}
      </div>

      {/* Articles list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((a, i) => (
          <motion.div key={a.id} className={s.card} style={{ padding: '18px 22px' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
              {/* Cat dot */}
              <div style={{ width: 42, height: 42, borderRadius: 10, background: (CAT_COLORS[a.cat] || '#27ae60') + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="bi bi-newspaper" style={{ color: CAT_COLORS[a.cat] || '#27ae60' }} />
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                  <h4 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '.95rem', margin: 0 }}>{a.title}</h4>
                  <span className={`${s.badge}`} style={{ background: (CAT_COLORS[a.cat] || '#27ae60') + '22', color: CAT_COLORS[a.cat] || '#27ae60' }}>
                    {CATS[a.cat]}
                  </span>
                  <span className={`${s.badge} ${a.status === 'published' ? s.badgeGreen : s.badgeGrey}`}>
                    {a.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '.83rem', margin: '0 0 6px' }}>{a.excerpt}</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '.75rem', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <i className="bi bi-calendar3" /> {a.date || '—'}
                  </span>
                  <span style={{ fontSize: '.75rem', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <i className="bi bi-eye" /> {a.views.toLocaleString()} vues
                  </span>
                  <span style={{ fontSize: '.75rem', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <i className="bi bi-person" /> {a.author}
                  </span>
                </div>
              </div>
              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button className={s.btnIcon} title={a.status === 'published' ? 'Dépublier' : 'Publier'}
                  onClick={() => toggleStatus(a.id)}>
                  <i className={`bi ${a.status === 'published' ? 'bi-eye-slash' : 'bi-eye'}`} />
                </button>
                <button className={s.btnIcon} title="Modifier" onClick={() => setModal({ mode: a.isAdvice ? 'advice' : 'article', article: a })}>
                  <i className="bi bi-pencil" />
                </button>
                <button className={s.btnIconRed} title="Supprimer" onClick={() => handleDelete(a.id)}>
                  <i className="bi bi-trash" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-faint)' }}>
            <i className="bi bi-newspaper" style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }} />
            Aucun article trouvé.
          </div>
        )}
      </div>

      <AnimatePresence>
        {modal !== null && (
          <ArticleModal
            article={modal?.article || null}
            initialMode={modal?.mode || 'article'}
            onClose={() => setModal(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
