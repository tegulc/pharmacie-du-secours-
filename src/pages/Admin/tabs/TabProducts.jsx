import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { PRODUCTS_DATA } from '../AdminData'
import s from './tabs.module.css'

const CATS = ['all', 'medicaments', 'parapharmacie', 'bebe', 'vitamines', 'materiel']
const CAT_LABELS = { all: 'Tous', medicaments: 'Médicaments', parapharmacie: 'Parapharmacie', bebe: 'Bébé', vitamines: 'Vitamines', materiel: 'Matériel' }
const STATUS_MAP = { active: { label: 'En stock', cls: 'badgeGreen' }, low: { label: 'Stock faible', cls: 'badgeOrange' }, rupture: { label: 'Rupture', cls: 'badgeRed' } }

const EMPTY_PRODUCT = { name: '', cat: 'medicaments', price: '', stock: '', status: 'active', image: null }

function StockBar({ stock }) {
  const max = 300
  const pct = Math.min((stock / max) * 100, 100)
  const color = stock === 0 ? '#e74c3c' : stock < 15 ? '#f39c12' : '#27ae60'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div className={s.stockBar}><div className={s.stockFill} style={{ width: `${pct}%`, background: color }} /></div>
      <span style={{ fontSize: '.78rem', color: stock === 0 ? '#e74c3c' : stock < 15 ? '#f39c12' : 'var(--text-muted)', fontWeight: 600 }}>{stock}</span>
    </div>
  )
}

function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product || EMPTY_PRODUCT)
  const imgRef = useRef(null)

  const handleImg = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setForm(f => ({ ...f, image: ev.target.result }))
    reader.readAsDataURL(file)
  }

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <motion.div className={s.modal} onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: .95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: .95, y: 20 }}>
        <h3 className={s.modalTitle}>
          <i className="bi bi-box-seam" /> {product?.id ? 'Modifier le produit' : 'Nouveau produit'}
        </h3>
        <form className={s.form} onSubmit={e => { e.preventDefault(); onSave(form) }}>
          {/* Image upload */}
          <div className={s.uploadZone} onClick={() => imgRef.current?.click()}>
            {form.image ? (
              <img src={form.image} alt="" style={{ maxHeight: 80, borderRadius: 8, objectFit: 'cover' }} />
            ) : (
              <><i className="bi bi-image" /><p><strong>Ajouter une photo</strong><br />PNG, JPG recommandé</p></>
            )}
          </div>
          <input ref={imgRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImg} />

          <div className={s.formRow}>
            <div className={s.formField}>
              <label className={s.formLabel}>Nom du produit *</label>
              <input className={s.formInput} required placeholder="Ex: Paracétamol 500mg"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className={s.formField}>
              <label className={s.formLabel}>Catégorie *</label>
              <select className={s.formSelect} value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}>
                {CATS.filter(c => c !== 'all').map(c => <option key={c} value={c}>{CAT_LABELS[c]}</option>)}
              </select>
            </div>
          </div>
          <div className={s.formRow}>
            <div className={s.formField}>
              <label className={s.formLabel}>Prix (FCFA) *</label>
              <input className={s.formInput} type="number" min="0" required placeholder="Ex: 1500"
                value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
            </div>
            <div className={s.formField}>
              <label className={s.formLabel}>Stock (unités) *</label>
              <input className={s.formInput} type="number" min="0" required placeholder="Ex: 50"
                value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
            </div>
          </div>
          <div className={s.formField}>
            <label className={s.formLabel}>Statut</label>
            <select className={s.formSelect} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option value="active">En stock</option>
              <option value="low">Stock faible</option>
              <option value="rupture">Rupture de stock</option>
            </select>
          </div>
          <div className={s.modalFooter}>
            <button type="button" className={s.btnOutline} onClick={onClose}>Annuler</button>
            <button type="submit" className={s.btnPrimary}><i className="bi bi-check2" /> Sauvegarder</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function TabProducts() {
  const [products, setProducts] = useState(PRODUCTS_DATA)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // null | 'new' | {product}
  const [selected, setSelected] = useState([])

  const filtered = products.filter(p =>
    (filter === 'all' || p.cat === filter) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  )

  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const selectAll = () => setSelected(filtered.map(p => p.id))
  const clearSelect = () => setSelected([])

  const handleSave = (form) => {
    if (form.id) {
      setProducts(ps => ps.map(p => p.id === form.id ? { ...p, ...form, stock: +form.stock, price: +form.price } : p))
      toast.success('Produit mis à jour !')
    } else {
      const np = { ...form, id: Date.now(), stock: +form.stock, price: +form.price }
      setProducts(ps => [np, ...ps])
      toast.success('Produit ajouté !')
    }
    setModal(null)
  }

  const handleDelete = (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return
    setProducts(ps => ps.filter(p => p.id !== id))
    toast.success('Produit supprimé')
  }

  const handleBulkDelete = () => {
    if (!window.confirm(`Supprimer ${selected.length} produit(s) ?`)) return
    setProducts(ps => ps.filter(p => !selected.includes(p.id)))
    setSelected([])
    toast.success(`${selected.length} produit(s) supprimé(s)`)
  }

  return (
    <div>
      <div className={s.pageHeader}>
        <div>
          <h2 className={s.pageTitle}>Gestion des Produits</h2>
          <p className={s.pageSub}>{products.length} produits • {products.filter(p => p.status === 'rupture').length} ruptures • {products.filter(p => p.status === 'low').length} stocks faibles</p>
        </div>
        <div className={s.headerActions}>
          {selected.length > 0 && (
            <button className={s.btnDanger} onClick={handleBulkDelete}>
              <i className="bi bi-trash" /> Supprimer ({selected.length})
            </button>
          )}
          <button className={s.btnPrimary} onClick={() => setModal('new')}>
            <i className="bi bi-plus-circle" /> Nouveau produit
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={s.filterBar}>
        <div className={s.searchWrap}>
          <i className={`bi bi-search ${s.searchIcon}`} />
          <input className={s.searchInput} placeholder="Rechercher un produit..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {CATS.map(c => (
          <button key={c} className={`${s.filterBtn} ${filter === c ? s.active : ''}`}
            onClick={() => setFilter(c)}>{CAT_LABELS[c]}</button>
        ))}
      </div>

      {/* Bulk select */}
      {filtered.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontSize: '.83rem', color: 'var(--text-muted)' }}>
          <input type="checkbox" checked={selected.length === filtered.length} onChange={() => selected.length === filtered.length ? clearSelect() : selectAll()} />
          <span>{selected.length > 0 ? `${selected.length} sélectionné(s)` : 'Tout sélectionner'}</span>
        </div>
      )}

      {/* Table */}
      <div className={s.card} style={{ padding: 0, overflow: 'hidden' }}>
        <table className={s.table}>
          <thead>
            <tr>
              <th style={{ width: 36 }}></th>
              <th>Produit</th><th>Catégorie</th><th>Prix</th><th>Stock</th><th>Statut</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <td><input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} /></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className={s.tdImg}>
                      {p.image ? <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="bi bi-box" />}
                    </div>
                    <span className={s.tdBold}>{p.name}</span>
                  </div>
                </td>
                <td><span className={`${s.badge} ${s.badgeBlue}`}>{CAT_LABELS[p.cat]}</span></td>
                <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{p.price.toLocaleString()} F</td>
                <td><StockBar stock={p.stock} /></td>
                <td><span className={`${s.badge} ${s[STATUS_MAP[p.status]?.cls]}`}>{STATUS_MAP[p.status]?.label}</span></td>
                <td>
                  <div className={s.tdActions}>
                    <button className={s.btnIcon} onClick={() => setModal(p)} title="Modifier"><i className="bi bi-pencil" /></button>
                    <button className={s.btnIconRed} onClick={() => handleDelete(p.id)} title="Supprimer"><i className="bi bi-trash" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-faint)' }}>
            <i className="bi bi-search" style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }} />
            Aucun produit trouvé.
          </div>
        )}
      </div>

      {/* Pagination info */}
      <div className={s.pagination}>
        <span className={s.paginationInfo}>Affichage de {filtered.length} sur {products.length} produits</span>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal !== null && (
          <ProductModal
            product={modal === 'new' ? null : modal}
            onClose={() => setModal(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
