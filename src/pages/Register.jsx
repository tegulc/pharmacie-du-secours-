import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../i18n'
import toast from 'react-hot-toast'
import styles from './Admin/AdminLogin.module.css'

export default function Register() {
  const [form, setForm]   = useState({ email: '', password: '', full_name: '', phone: '' })
  const [showPwd, setShowPwd] = useState(false)
  const { signup, loading } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signup(form)
    if (result.success) {
      toast.success(result.message || t('auth.registerSuccess') || 'Compte créé !')
      navigate('/login')
    } else {
      toast.error(result.error || 'Impossible de créer le compte')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} /><div className={styles.bgGlow} />
      <motion.div className={styles.card} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
        <div className={styles.header}>
          <div className={styles.iconWrap}><i className="bi bi-person-plus" /></div>
          <h1>{t('auth.registerTitle') || 'Créer un compte'}</h1>
          <p>{t('auth.registerSubtitle') || 'Inscrivez-vous pour accéder à votre espace client.'}</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {[
            { key: 'full_name', label: t('auth.fullName') || 'Nom complet', type: 'text', ph: 'Jean Dupont', icon: 'bi-person' },
            { key: 'email',     label: t('auth.email')    || 'Email',        type: 'email', ph: 'email@example.com', icon: 'bi-envelope' },
            { key: 'phone',     label: t('auth.phone')    || 'Téléphone',    type: 'text', ph: '+237 6xx xxx xxx', icon: 'bi-telephone' },
          ].map(f => (
            <div key={f.key} className={styles.field}>
              <label>{f.label}</label>
              <div className={styles.inputWrap}>
                <i className={`bi ${f.icon}`} />
                <input type={f.type} placeholder={f.ph} required
                  value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
              </div>
            </div>
          ))}
          <div className={styles.field}>
            <label>{t('auth.password') || 'Mot de passe'}</label>
            <div className={styles.inputWrap}>
              <i className="bi bi-lock" />
              <input type={showPwd ? 'text' : 'password'} placeholder="••••••••" required
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPwd(s => !s)}>
                <i className={`bi ${showPwd ? 'bi-eye-slash' : 'bi-eye'}`} />
              </button>
            </div>
          </div>
          <motion.button type="submit" className={styles.submitBtn} disabled={loading}
            whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}>
            {loading ? <><span className={styles.spinner} /> {t('auth.creating') || 'Création...'}</> : <><i className="bi bi-person-plus" /> {t('auth.registerBtn') || 'Créer un compte'}</>}
          </motion.button>
        </form>
        <p className={styles.back}>
          {t('auth.alreadyAccount') || 'Déjà inscrit ?'} <Link to="/login">{t('auth.loginBtn') || 'Se connecter'}</Link>
        </p>
      </motion.div>
    </div>
  )
}
