/**
 * GalerieContext — Persistance des images (localStorage)
 * 
 * L'admin upload les images → sauvegardées en localStorage
 * Les visiteurs voient les images même quand l'admin est déconnecté
 * 
 * ⚠️  localStorage limite : ~5MB total.
 *     Les images sont stockées en base64. Pour un projet en prod,
 *     remplacer par Supabase Storage ou Firebase Storage.
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { GALLERY_PRODUCTS_INITIAL } from '../data/data'

const GalerieContext = createContext()

const STORAGE_KEY_GALLERY   = 'pharmacie_gallery_v1'
const STORAGE_KEY_TIMELINE  = 'pharmacie_timeline_v1'
const STORAGE_KEY_EXTRA_TL  = 'pharmacie_timeline_extra_v1'
const STORAGE_KEY_EXTRA_GAL = 'pharmacie_gallery_extra_v1'

/* ── Helpers ── */
function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function safeSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch (e) {
    console.warn('localStorage full or unavailable:', e)
  }
}

/* ── Initial gallery products with persisted images ── */
function buildInitialProducts() {
  const saved = safeGet(STORAGE_KEY_GALLERY, {})     // { id: imageDataURL }
  const extraSaved = safeGet(STORAGE_KEY_EXTRA_GAL, []) // [{id,name,cat,image}]
  const base = GALLERY_PRODUCTS_INITIAL.map(p => ({
    ...p,
    image: saved[p.id] || null,
  }))
  return [...base, ...extraSaved]
}

export function GalerieProvider({ children }) {
  const [products, setProducts] = useState(buildInitialProducts)
  const [nextId, setNextId]     = useState(() => {
    const extra = safeGet(STORAGE_KEY_EXTRA_GAL, [])
    return Math.max(GALLERY_PRODUCTS_INITIAL.length, ...extra.map(p => p.id), 0) + 1
  })

  // Timeline
  const [timelineExtras, setTimelineExtras] = useState(() =>
    safeGet(STORAGE_KEY_EXTRA_TL, [])
  )
  const [timelinePhotos, setTimelinePhotos] = useState(() =>
    safeGet(STORAGE_KEY_TIMELINE, {})   // { index: dataURL }
  )

  /* ── Gallery: set image for an existing product ── */
  const setProductImage = useCallback((id, dataUrl) => {
    setProducts(prev => {
      const next = prev.map(p => p.id === id ? { ...p, image: dataUrl } : p)
      // Persist only the images map for initial products
      const imgs = {}
      next.forEach(p => { if (p.image && GALLERY_PRODUCTS_INITIAL.find(x => x.id === p.id)) imgs[p.id] = p.image })
      safeSet(STORAGE_KEY_GALLERY, imgs)
      // Persist extra products (with image)
      const extra = next.filter(p => !GALLERY_PRODUCTS_INITIAL.find(x => x.id === p.id))
      safeSet(STORAGE_KEY_EXTRA_GAL, extra)
      return next
    })
  }, [])

  /* ── Gallery: add a brand-new product ── */
  const addProduct = useCallback((name, cat, dataUrl) => {
    setProducts(prev => {
      const id = nextId
      const newP = { id, name, cat, image: dataUrl }
      const next = [...prev, newP]
      const extra = next.filter(p => !GALLERY_PRODUCTS_INITIAL.find(x => x.id === p.id))
      safeSet(STORAGE_KEY_EXTRA_GAL, extra)
      return next
    })
    setNextId(n => n + 1)
  }, [nextId])

  /* ── Gallery: remove a product (admin only) ── */
  const removeProduct = useCallback((id) => {
    setProducts(prev => {
      const next = prev.filter(p => p.id !== id)
      const imgs = {}
      next.forEach(p => { if (p.image && GALLERY_PRODUCTS_INITIAL.find(x => x.id === p.id)) imgs[p.id] = p.image })
      safeSet(STORAGE_KEY_GALLERY, imgs)
      const extra = next.filter(p => !GALLERY_PRODUCTS_INITIAL.find(x => x.id === p.id))
      safeSet(STORAGE_KEY_EXTRA_GAL, extra)
      return next
    })
  }, [])

  /* ── Timeline: set photo for a timeline entry ── */
  const setTimelinePhoto = useCallback((index, dataUrl) => {
    setTimelinePhotos(prev => {
      const next = { ...prev, [index]: dataUrl }
      safeSet(STORAGE_KEY_TIMELINE, next)
      return next
    })
  }, [])

  /* ── Timeline: add a new milestone ── */
  const addTimelineEntry = useCallback((entry) => {
    setTimelineExtras(prev => {
      const next = [...prev, entry]
      safeSet(STORAGE_KEY_EXTRA_TL, next)
      return next
    })
  }, [])

  /* ── Clear all gallery images (admin utility) ── */
  const clearGallery = useCallback(() => {
    safeSet(STORAGE_KEY_GALLERY, {})
    safeSet(STORAGE_KEY_EXTRA_GAL, [])
    setProducts(GALLERY_PRODUCTS_INITIAL.map(p => ({ ...p, image: null })))
  }, [])

  return (
    <GalerieContext.Provider value={{
      products, setProductImage, addProduct, removeProduct,
      timelinePhotos, setTimelinePhoto,
      timelineExtras, addTimelineEntry,
      clearGallery,
    }}>
      {children}
    </GalerieContext.Provider>
  )
}

export const useGalerie = () => useContext(GalerieContext)
