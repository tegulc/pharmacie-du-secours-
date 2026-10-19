import { useCallback, useRef, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GALLERY_CATEGORIES, CAT_BADGES, CAT_ICONS } from '../data/data'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useGalerie } from '../context/GalerieContext'
import { useTranslation } from '../i18n'
import styles from './Galerie.module.css'
import toast from 'react-hot-toast'

/* ─── Lightbox ─── */
function Lightbox({ src, name, onClose, onPrev, onNext }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose, onPrev, onNext])

  return (
    <div className={styles.lightbox} onClick={onClose}>
      <button className={styles.lbClose} onClick={onClose}><i className="bi bi-x-lg" /></button>
      <button className={`${styles.lbNav} ${styles.lbPrev}`} onClick={e => { e.stopPropagation(); onPrev() }}><i className="bi bi-chevron-left" /></button>
      <button className={`${styles.lbNav} ${styles.lbNext}`} onClick={e => { e.stopPropagation(); onNext() }}><i className="bi bi-chevron-right" /></button>
      <div className={styles.lbInner} onClick={e => e.stopPropagation()}>
        <img src={src} alt={name} className={styles.lbImg} />
      </div>
    </div>
  )
}

/* ─── Product Card ─── */
function ProductCard({ product, onImageSet, onRemove, onOpenLightbox, isAdmin, t }) {
  const inputRef = useRef(null)
  const badge   = CAT_BADGES[product.cat] || { bg: 'rgba(39,174,96,0.15)', color: '#27ae60', label: product.cat }
  const catIcon = CAT_ICONS[product.cat]  || 'bi-box-seam'

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 4 * 1024 * 1024) {
      toast.error(t('gallery.fileTooLarge') || 'Image trop grande (max 4 Mo)')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => { onImageSet(product.id, ev.target.result); toast.success(t('gallery.imageSaved') || 'Image sauvegardée !') }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}
        onClick={() => product.image ? onOpenLightbox(product.id) : (isAdmin ? inputRef.current?.click() : null)}
        style={{ cursor: product.image ? 'zoom-in' : (isAdmin ? 'pointer' : 'default') }}>
        {product.image ? (
          <>
            <img src={product.image} alt={product.name} className={styles.img} loading="lazy" />
            <div className={styles.overlay}><div className={styles.zoomIcon}><i className="bi bi-zoom-in" /></div></div>
          </>
        ) : (
          <div className={styles.placeholder}>
            <i className={`bi ${catIcon}`} style={{ fontSize: '2.5rem', color: 'rgba(39,174,96,0.35)' }} />
            {isAdmin
              ? <p><i className="bi bi-cloud-arrow-up" style={{ marginRight: 4 }} />{t('gallery.addPhoto') || 'Ajouter une photo'}</p>
              : <p style={{ fontSize: '0.78rem', opacity: 0.5 }}>{t('gallery.noPhotoYet') || 'Photo à venir'}</p>
            }
          </div>
        )}
        {/* Admin saved badge */}
        {product.image && (
          <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(39,174,96,0.85)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
            <i className="bi bi-check2" /> {t('gallery.saved') || 'Sauvegardé'}
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.row}>
          <span className={styles.badge} style={{ background: badge.bg, color: badge.color }}>{badge.label}</span>
          {isAdmin && (
            <div style={{ display: 'flex', gap: 4 }}>
              <button className={styles.uploadBtn} onClick={() => inputRef.current?.click()}
                title={t('gallery.changePhoto') || 'Changer la photo'}>
                <i className="bi bi-camera" />
              </button>
              {onRemove && (
                <button className={styles.uploadBtn} style={{ color: '#e74c3c' }}
                  onClick={() => { if (window.confirm(t('gallery.confirmDelete') || 'Supprimer ce produit ?')) { onRemove(product.id); toast.success(t('gallery.productDeleted') || 'Produit supprimé') } }}
                  title={t('gallery.deleteProduct') || 'Supprimer'}>
                  <i className="bi bi-trash" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
    </div>
  )
}

/* ─── Category Section ─── */
function CategorySection({ catId, label, icon, products, onImageSet, onRemove, onOpenLightbox, isAdmin, t }) {
  const count = products.length
  const withImg = products.filter(p => p.image).length
  return (
    <div className={styles.catSection} id={`section-${catId}`}>
      <div className={styles.catHeader}>
        <div className={styles.catIcon}><i className={`bi ${icon}`} /></div>
        <div>
          <h3 className={styles.catTitle}>{label}</h3>
          <p className={styles.catSub}>
            {withImg} / {count} {t('gallery.withPhoto') || 'avec photo'}
            {!isAdmin && withImg === 0 && <span style={{ color: 'var(--text-faint)', marginLeft: 8 }}>— {t('gallery.comingSoon') || 'Photos à venir'}</span>}
          </p>
        </div>
        <span className={styles.catCount}>{count} {count > 1 ? (t('gallery.products') || 'produits') : (t('gallery.product') || 'produit')}</span>
      </div>
      <div className={styles.grid}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} onImageSet={onImageSet} onRemove={onRemove}
            onOpenLightbox={onOpenLightbox} isAdmin={isAdmin} t={t} />
        ))}
      </div>
    </div>
  )
}

/* ─── Add Product Modal (admin) ─── */
function AddProductModal({ cats, onClose, onAdd, t }) {
  const [form, setForm] = useState({ name: '', cat: cats[0]?.id || 'medicaments' })
  const [img, setImg] = useState(null)
  const imgRef = useRef(null)

  const handleImg = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 4 * 1024 * 1024) { toast.error('Image trop grande (max 4 Mo)'); return }
    const reader = new FileReader()
    reader.onload = ev => setImg(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onClose}>
      <div style={{ background: 'var(--bg3)', border: '1px solid var(--border-accent)', borderRadius: 20, padding: 32, width: '100%', maxWidth: 440, boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}>
        <h3 style={{ color: 'var(--text)', fontWeight: 800, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <i className="bi bi-plus-circle" style={{ color: 'var(--primary)' }} />
          {t('gallery.addProduct') || 'Nouveau produit'}
        </h3>
        {/* Image upload */}
        <div onClick={() => imgRef.current?.click()} style={{ border: '2px dashed var(--border-accent)', borderRadius: 12, padding: 20, textAlign: 'center', cursor: 'pointer', marginBottom: 16, background: 'var(--bg-card)' }}>
          {img ? <img src={img} alt="" style={{ maxHeight: 80, borderRadius: 8, objectFit: 'cover' }} /> : <><i className="bi bi-image" style={{ fontSize: '2rem', color: 'var(--primary)', display: 'block', marginBottom: 6 }} /><p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>{t('gallery.addPhoto') || 'Ajouter une photo'}</p></>}
        </div>
        <input ref={imgRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImg} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder={t('gallery.productName') || 'Nom du produit *'}
            style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }} />
          <select value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}
            style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }}>
            {cats.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.88rem' }}>
            {t('admin.cancel') || 'Annuler'}
          </button>
          <button onClick={() => { if (!form.name.trim()) { toast.error(t('gallery.nameRequired') || 'Nom requis'); return } onAdd(form.name, form.cat, img); onClose(); toast.success(t('gallery.productAdded') || 'Produit ajouté !') }}
            style={{ padding: '10px 24px', borderRadius: 10, background: 'linear-gradient(135deg,#27ae60,#2ecc71)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 600 }}>
            <i className="bi bi-check2" /> {t('admin.save') || 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── MAIN PAGE ─── */
export default function Galerie() {
  const { lang }    = useTheme()
  const { isAdmin } = useAuth()
  const { t }       = useTranslation()
  const { products, setProductImage, addProduct, removeProduct } = useGalerie()
  const [searchParams] = useSearchParams()

  const [filter, setFilter]   = useState(searchParams.get('cat') || 'all')
  const [search, setSearch]   = useState('')
  const [lightbox, setLightbox] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const uploadRef = useRef(null)

  const categoriesList = (GALLERY_CATEGORIES[lang] || GALLERY_CATEGORIES.fr)

  /* filtered list */
  const filtered = products.filter(p => {
    const matchCat    = filter === 'all' || p.cat === filter
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  /* lightbox helpers */
  const withImages  = filtered.filter(p => p.image)
  const openLightbox = id  => { const idx = withImages.findIndex(p => p.id === id); if (idx >= 0) setLightbox(idx) }
  const closeLightbox = () => setLightbox(null)
  const prevLightbox  = () => setLightbox(i => (i - 1 + withImages.length) % withImages.length)
  const nextLightbox  = () => setLightbox(i => (i + 1) % withImages.length)

  /* bulk upload (admin drag-drop zone) */
  const handleBulkUpload = (files) => {
    const cat = filter === 'all' ? 'medicaments' : filter
    Array.from(files).filter(f => f.type.startsWith('image/')).forEach(file => {
      if (file.size > 4 * 1024 * 1024) { toast.error(`${file.name} — trop grande (max 4 Mo)`); return }
      const reader = new FileReader()
      reader.onload = ev => {
        const name = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
        addProduct(name, cat, ev.target.result)
      }
      reader.readAsDataURL(file)
    })
    toast.success(t('gallery.imagesSaved') || 'Images sauvegardées !')
  }

  const cats = categoriesList.filter(c => c.id !== 'all')
  const categoriesToShow = filter === 'all' ? cats : cats.filter(c => c.id === filter)
  const totalWithPhoto = products.filter(p => p.image).length

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-max">
          <h1><i className="bi bi-images" style={{ marginRight: 14 }} />
            {t('gallery.title') || 'Galerie'} <span>{t('gallery.titleSub') || 'Produits'}</span>
          </h1>
          <p>{t('gallery.subtitle') || 'Explorez notre banque d\'images complète.'}</p>
          {isAdmin && (
            <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(39,174,96,0.2)', border: '1px solid rgba(39,174,96,0.5)', borderRadius: 30, padding: '6px 16px', color: '#2ecc71', fontSize: '0.82rem', fontWeight: 600 }}>
              <i className="bi bi-shield-check" /> {t('gallery.adminMode') || 'Mode Admin — Vous pouvez ajouter et modifier les photos'}
            </div>
          )}
        </div>
      </section>

      <section className={styles.mainSection}>
        <div className={styles.container}>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}><strong>{products.length}</strong><span>{t('gallery.products') || 'Produits'}</span></div>
            <div className={styles.stat}><strong>{totalWithPhoto}</strong><span>{t('gallery.withPhoto') || 'avec photo'}</span></div>
            <div className={styles.stat}><strong>5</strong><span>{t('gallery.categories') || 'Catégories'}</span></div>
          </div>

          {/* Search */}
          <div className={styles.searchWrap}>
            <input type="text" className={styles.search}
              placeholder={t('gallery.searchPlaceholder') || 'Rechercher un produit...'}
              value={search} onChange={e => setSearch(e.target.value)} />
            <i className={`bi bi-search ${styles.searchIcon}`} />
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            {categoriesList.map(c => (
              <button key={c.id} className={`${styles.filterBtn} ${filter === c.id ? styles.filterActive : ''}`}
                onClick={() => setFilter(c.id)}>
                <i className={`bi ${c.icon}`} /> {c.label}
              </button>
            ))}
          </div>

          {/* Admin toolbar */}
          {isAdmin && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center', padding: '14px 18px', background: 'rgba(39,174,96,0.06)', border: '1px solid rgba(39,174,96,0.2)', borderRadius: 14 }}>
              <i className="bi bi-shield-lock-fill" style={{ color: '#27ae60', fontSize: '1rem' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', flex: 1 }}>
                {t('gallery.adminToolbar') || 'Panneau Admin — Les images sont sauvegardées et visibles par tous les visiteurs'}
              </span>
              <button onClick={() => setShowAddModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', background: 'linear-gradient(135deg,#27ae60,#2ecc71)', border: 'none', borderRadius: 10, color: '#fff', fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                <i className="bi bi-plus-circle" /> {t('gallery.addProduct') || 'Ajouter un produit'}
              </button>
            </div>
          )}

          {/* Upload Zone (admin only) */}
          {isAdmin && (
            <>
              <div className={styles.uploadZone}
                onClick={() => uploadRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); handleBulkUpload(e.dataTransfer.files) }}>
                <i className="bi bi-cloud-arrow-up" />
                <p><strong>{t('gallery.dragPhotos') || 'Glissez vos photos ici'}</strong> {t('gallery.dragPhotosHint') || 'ou cliquez pour parcourir'}</p>
                <p style={{ fontSize: '0.8rem', marginTop: 4, color: 'rgba(255,255,255,0.35)' }}>
                  {filter !== 'all'
                    ? `${t('gallery.uploadInfo') || 'Ajout dans'} « ${categoriesList.find(c => c.id === filter)?.label} »`
                    : t('gallery.chooseCategoryInfo') || 'Sélectionnez une catégorie pour cibler l\'ajout'
                  }
                </p>
                <p style={{ fontSize: '0.75rem', color: '#27ae60', marginTop: 4 }}>
                  <i className="bi bi-save" /> {t('gallery.autosave') || 'Sauvegarde automatique — visible par tous les visiteurs'}
                </p>
              </div>
              <input ref={uploadRef} type="file" multiple accept="image/*" style={{ display: 'none' }}
                onChange={e => { handleBulkUpload(e.target.files); e.target.value = '' }} />
            </>
          )}

          {/* No results */}
          {filtered.length === 0 && (
            <div className={styles.noResults}>
              <i className="bi bi-search" />
              <p>{t('gallery.noResults') || 'Aucun produit trouvé.'}</p>
            </div>
          )}

          {/* Category sections */}
          {categoriesToShow.map(cat => {
            const catProducts = filtered.filter(p => p.cat === cat.id)
            if (catProducts.length === 0) return null
            return (
              <CategorySection key={cat.id} catId={cat.id} label={cat.label} icon={cat.icon}
                products={catProducts} onImageSet={setProductImage} onRemove={isAdmin ? removeProduct : null}
                onOpenLightbox={openLightbox} isAdmin={isAdmin} t={t} />
            )
          })}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && withImages[lightbox] && (
        <Lightbox src={withImages[lightbox].image} name={withImages[lightbox].name}
          onClose={closeLightbox} onPrev={prevLightbox} onNext={nextLightbox} />
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal cats={cats} t={t} onClose={() => setShowAddModal(false)} onAdd={addProduct} />
      )}
    </>
  )
}
