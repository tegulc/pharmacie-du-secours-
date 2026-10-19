import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

function getQueryFlag(search, key) {
  try { return new URLSearchParams(search).get(key) } catch (e) { return null }
}

export default function AdminSiteEditor() {
  const { isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [active, setActive] = useState(false)

  useEffect(() => {
    const flag = getQueryFlag(location.search, 'adminEdit')
    setActive(Boolean(flag) && isAdmin)
  }, [location.search, isAdmin])

  useEffect(() => {
    if (!active) return

    const pathKey = `pharma-admin-edits:${location.pathname}`
    let edits = {}
    try { edits = JSON.parse(localStorage.getItem(pathKey) || '{}') } catch (e) { edits = {} }

    // keep existing local edits (no server persistence)

    // Select commonly textual elements
    const sel = 'h1,h2,h3,h4,h5,h6,p,span,a,li,button,label,strong,em,small' 
    const nodes = Array.from(document.querySelectorAll(sel))

    nodes.forEach((el, i) => {
      // skip invisible or script/style
      if (!el.offsetParent) return
      const id = el.getAttribute('data-edit-id') || `edit-${i}`
      el.setAttribute('data-edit-id', id)
      // apply saved edit
      if (edits[id]) {
        try { el.innerText = edits[id] } catch (e) { }
      }
      el.contentEditable = 'true'
      el.style.outline = 'none'
      el.addEventListener('focus', () => el.style.boxShadow = '0 0 0 2px rgba(39,174,96,.12)')
      el.addEventListener('blur', () => {
        edits[id] = el.innerText
        try { localStorage.setItem(pathKey, JSON.stringify(edits)) } catch (e) { }
        el.style.boxShadow = 'none'
      })
    })

    // add visual hint
    const style = document.createElement('style')
    style.id = 'admin-edit-style'
    style.innerHTML = `
      [contenteditable="true"]:hover{outline:2px dashed rgba(39,174,96,.2);}
    `
    document.head.appendChild(style)

    // cleanup
    return () => {
      nodes.forEach(el => {
        try { el.contentEditable = 'false' } catch (e) { }
      })
      const s = document.getElementById('admin-edit-style')
      if (s) s.remove()
    }
  }, [active, location.pathname])

  if (!active) return null

  const handleExit = () => {
    // remove query param
    const params = new URLSearchParams(location.search)
    params.delete('adminEdit')
    navigate({ pathname: location.pathname, search: params.toString() })
  }

  const handleExport = () => {
    const pathKey = `pharma-admin-edits:${location.pathname}`
    const data = localStorage.getItem(pathKey) || '{}'
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `edits${location.pathname.replace(/\//g,'_') || 'root'}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleImport = (ev) => {
    const file = ev.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        const pathKey = `pharma-admin-edits:${location.pathname}`
        localStorage.setItem(pathKey, JSON.stringify(data))
        toast.success('Import réussi — rechargement de la page')
        setTimeout(() => window.location.reload(), 400)
      } catch (e) {
        toast.error('Fichier invalide')
      }
    }
    reader.readAsText(file)
    // reset input
    ev.target.value = ''
  }

  const saveLocal = () => {
    const pathKey = `pharma-admin-edits:${location.pathname}`
    const edits = JSON.parse(localStorage.getItem(pathKey) || '{}')
    try {
      localStorage.setItem(pathKey, JSON.stringify(edits))
      toast.success('Modifications sauvegardées localement')
    } catch (e) {
      toast.error('Impossible de sauvegarder en local')
    }
  }

  const handleClear = () => {
    const pathKey = `pharma-admin-edits:${location.pathname}`
    localStorage.removeItem(pathKey)
    window.location.reload()
  }

  return (
    <div style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 9999, display: 'flex', gap: 8, alignItems: 'center' }}>
      <input id="admin-import-file" type="file" accept="application/json" onChange={handleImport} style={{ display: 'none' }} />
      <button onClick={saveLocal} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', cursor: 'pointer' }}>Enregistrer</button>
      <button onClick={() => document.getElementById('admin-import-file')?.click()} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', cursor: 'pointer' }}>Importer</button>
      <button onClick={handleExport} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', cursor: 'pointer' }}>Exporter</button>
      <button onClick={handleClear} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', background: '#fff', color: '#333', cursor: 'pointer' }}>Réinitialiser</button>
      <button onClick={handleExit} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e74c3c', background: '#e74c3c', color: '#fff', cursor: 'pointer' }}>Quitter</button>
    </div>
  )
}
