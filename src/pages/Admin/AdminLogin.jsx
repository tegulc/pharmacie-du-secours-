import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import styles from './AdminLogin.module.css'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(form.email, form.password)
    if (result.success) {
      toast.success('Connexion réussie ! Bienvenue Admin.')
      navigate('/admin')
    } else {
      toast.error(result.error || 'Erreur de connexion')
    }
  }

  return (
    <div className={styles.page}>
      {/* Background */}
      <div className={styles.bg} />
      <div className={styles.bgGlow} />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrap}><i className="bi bi-shield-lock-fill" /></div>
          <h1>Espace Administrateur</h1>
          <p>Pharmacie du Secours — Panneau de contrôle</p>
        </div>

        {/* Hint */}
        <div className={styles.hint}>
          <i className="bi bi-info-circle" />
          <span>admin@pharmaciedusecours.cm / Admin2024!</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Adresse email</label>
            <div className={styles.inputWrap}>
              <i className="bi bi-envelope" />
              <input type="email" placeholder="admin@pharmaciedusecours.cm" required
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
          </div>
          <div className={styles.field}>
            <label>Mot de passe</label>
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
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {loading ? (
              <><span className={styles.spinner} /> Connexion...</>
            ) : (
              <><i className="bi bi-shield-check" /> Accéder au tableau de bord</>
            )}
          </motion.button>
        </form>

        <p className={styles.back}>
          <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← Retour au site
          </a>
        </p>
      </motion.div>
    </div>
  )
}
