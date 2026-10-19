import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../i18n'
import toast from 'react-hot-toast'
import styles from './Admin/AdminLogin.module.css'

export default function Login() {
  const [form, setForm]   = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const { login, loading } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(form.email, form.password)
    if (result.success) {
      toast.success(t('auth.loginSuccess') || 'Connexion réussie !')
      navigate(result.isAdmin ? '/admin' : '/')
    } else {
      toast.error(result.error || t('admin.loginError') || 'Erreur de connexion')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} /><div className={styles.bgGlow} />
      <motion.div className={styles.card} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
        <div className={styles.header}>
          <div className={styles.iconWrap}><i className="bi bi-box-arrow-in-right" /></div>
          <h1>{t('auth.loginTitle') || 'Connexion'}</h1>
          <p>{t('auth.loginSubtitle') || 'Accédez à votre compte client ou admin.'}</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>{t('auth.email') || 'Adresse email'}</label>
            <div className={styles.inputWrap}>
              <i className="bi bi-envelope" />
              <input type="email" placeholder={t('placeholders.email') || 'email@example.com'} required
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
          </div>
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
            {loading ? <><span className={styles.spinner} /> {t('auth.logging') || 'Connexion...'}</> : <><i className="bi bi-box-arrow-in-right" /> {t('auth.loginBtn') || 'Se connecter'}</>}
          </motion.button>
        </form>
        <p className={styles.back}>
          {t('auth.noAccount') || 'Pas de compte ?'} <Link to="/register">{t('nav.register') || "S'inscrire"}</Link>
        </p>
      </motion.div>
    </div>
  )
}
