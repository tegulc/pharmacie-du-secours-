import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from '../i18n'
import toast from 'react-hot-toast'
import styles from './Admin/AdminLogin.module.css'

export default function Account() {
  const { user, profile, updateProfile, logout, loading, isAdmin } = useAuth()
  const { t, lang } = useTranslation()
  const navigate = useNavigate()
  const [form, setForm]   = useState({ full_name: '', phone: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setForm({ full_name: profile?.full_name || '', phone: profile?.phone || '' })
  }, [profile])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const result = await updateProfile(form)
    setSaving(false)
    if (result.success) {
      toast.success(t('auth.profileUpdated') || 'Profil mis à jour')
      if (isAdmin) navigate('/admin')
    } else {
      toast.error(result.error || 'Impossible de sauvegarder le profil')
    }
  }

  const handleLogout = async () => { await logout(); navigate('/'); toast.success(t('auth.logoutBtn') || 'Déconnecté') }

  return (
    <div className={styles.page}>
      <div className={styles.bg} /><div className={styles.bgGlow} />
      <motion.div className={styles.card} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
        <div className={styles.header}>
          <div className={styles.iconWrap}><i className="bi bi-person-circle" /></div>
          <h1>{t('auth.accountTitle') || 'Mon compte'}</h1>
          <p>{t('auth.accountSubtitle') || 'Gérez vos informations personnelles.'}</p>
        </div>
        <div style={{ background: 'rgba(39,174,96,0.08)', border: '1px solid rgba(39,174,96,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 4px', fontSize: '0.85rem' }}><strong style={{ color: '#fff' }}>{t('auth.email') || 'Email'} :</strong> {user?.email}</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '0.85rem' }}>
            <strong style={{ color: '#fff' }}>{lang === 'en' ? 'Status' : 'Statut'} :</strong>{' '}
            <span style={{ color: isAdmin ? '#27ae60' : '#3498db', fontWeight: 600 }}>
              {isAdmin ? (t('auth.statusAdmin') || 'Administrateur') : (t('auth.statusClient') || 'Client')}
            </span>
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>{t('auth.fullName') || 'Nom complet'}</label>
            <div className={styles.inputWrap}>
              <i className="bi bi-person" />
              <input type="text" placeholder={t('auth.fullName') || 'Votre nom'} required
                value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} />
            </div>
          </div>
          <div className={styles.field}>
            <label>{t('auth.phone') || 'Téléphone'}</label>
            <div className={styles.inputWrap}>
              <i className="bi bi-telephone" />
              <input type="text" placeholder="+237 6xx xxx xxx" required
                value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
          </div>
          <motion.button type="submit" className={styles.submitBtn} disabled={saving || loading}
            whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}>
            {saving ? <><span className={styles.spinner} /> {t('auth.saving') || 'Enregistrement...'}</> : <><i className="bi bi-save" /> {t('auth.saveBtn') || 'Sauvegarder'}</>}
          </motion.button>
        </form>
        {isAdmin && (
          <Link to="/admin" className={styles.submitBtn} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:12, textDecoration:'none', background:'rgba(39,174,96,0.15)', border:'1px solid rgba(39,174,96,0.3)', color:'#27ae60' }}>
            <i className="bi bi-speedometer2" /> Tableau de bord Admin
          </Link>
        )}
        <button className={styles.submitBtn} style={{ marginTop:12, background:'rgba(231,76,60,0.15)', border:'1px solid rgba(231,76,60,0.3)', color:'#e74c3c' }} onClick={handleLogout}>
          <i className="bi bi-box-arrow-right" /> {t('auth.logoutBtn') || 'Déconnexion'}
        </button>
      </motion.div>
    </div>
  )
}
