# Pharmacie du Secours — v3.0 (Final)

Site web React JS complet avec Admin CMS, Supabase, i18n FR/EN, et toutes vos vraies photos.

## 🚀 Lancer le projet

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # Build production
npm run preview    # Prévisualiser le build
```

## 🔐 Admin Dashboard

URL : `/admin/login`
Email : `admin@pharmaciedusecours.cm`
Mot de passe : `Admin2024!`

### Modules admin :
- **Tableau de bord** — stats, alertes, commandes récentes
- **Analytique** — graphiques, sources de trafic, pages visitées
- **Produits** — CRUD complet avec vos vraies photos (30 produits)
- **Services** — activer/désactiver chaque service
- **Actualités** — créer/modifier/supprimer/publier des articles
- **Clients** — gestion des comptes client
- **Messages** — boîte de réception avec réponses
- **Commandes** — suivi et changement de statut
- **Notifications** — centre de notifications
- **SEO** — métadonnées, scores par page
- **Paramètres** — général, légal, CinetPay, mode maintenance

## 🗄️ Supabase (optionnel)

Créez un fichier `.env` à la racine :

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Sans Supabase : auth locale (localStorage) fonctionnelle.

## 📁 Structure clé

```
src/
├── assets/            ← Vos vraies photos (98 images)
├── components/        ← Navbar, Footer, Chatbot, Layout...
├── context/           ← Auth, Theme, Notif
├── pages/
│   ├── Admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   └── tabs/      ← 11 modules admin complets
│   ├── Home, Services, Galerie, APropos, Contact, Actualites
│   ├── Login, Register, Account  ← Espace client
├── data/data.js        ← Données centralisées
├── i18n.js             ← Traductions FR/EN complètes
└── lib/supabaseClient.js
```

## 👤 Espace Client

- `/login` — Connexion
- `/register` — Inscription
- `/account` — Mon compte
