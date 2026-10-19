// ============================================================
// ADMIN CMS — Complete Data (linked to real assets)
// ============================================================

// Real product images from src/assets/
import img_a from '../../assets/a.jpeg'
import img_b from '../../assets/b.jpeg'
import img_c from '../../assets/c.jpeg'
import img_d from '../../assets/d.jpeg'
import img_e from '../../assets/e.jpeg'
import img_f from '../../assets/f.jpeg'
import img_g from '../../assets/g.jpeg'
import img_h from '../../assets/h.jpeg'
import img_i from '../../assets/i.jpeg'
import img_j from '../../assets/j.jpeg'
import img_k from '../../assets/k.jpeg'
import img_l from '../../assets/l.jpeg'
import img_m from '../../assets/m.jpeg'
import img_n from '../../assets/n.jpeg'
import img_o from '../../assets/o.jpeg'
import img_p from '../../assets/p.jpeg'
import img_aa from '../../assets/aa.jpeg'
import img_bb from '../../assets/bb.jpeg'
import img_cc from '../../assets/cc.jpeg'
import img_dd from '../../assets/dd.jpeg'
import img_ee from '../../assets/ee.jpeg'
import img_ff from '../../assets/ff.jpeg'
import img_gg from '../../assets/gg.jpeg'
import img_hh from '../../assets/hh.jpeg'
import img_ii from '../../assets/ii.jpeg'
import img_jj from '../../assets/jj.jpeg'
import img_kk from '../../assets/kk.jpeg'
import img_ll from '../../assets/ll.jpeg'
import img_mm from '../../assets/mm.jpeg'
import img_nn from '../../assets/nn.jpeg'

export const ADMIN_STATS = [
  { icon: 'bi-people-fill',      label: 'Clients inscrits',     value: 1284,  change: '+48 ce mois',   color: '#3498db', trend: 'up'   },
  { icon: 'bi-bag-check-fill',   label: 'Produits catalogue',   value: 30,    change: '+5 ajoutés',    color: '#27ae60', trend: 'up'   },
  { icon: 'bi-envelope-fill',    label: 'Messages reçus',       value: 38,    change: '+12 cette sem', color: '#9b59b6', trend: 'up'   },
  { icon: 'bi-newspaper',        label: 'Articles publiés',     value: 12,    change: '+2 cette sem',  color: '#f39c12', trend: 'up'   },
  { icon: 'bi-truck',            label: 'Commandes en cours',   value: 7,     change: '-2 livrées',    color: '#e74c3c', trend: 'down' },
  { icon: 'bi-cash-coin',        label: 'Chiffre (FCFA)',       value: '2.4M',change: '+18% vs N-1',   color: '#1abc9c', trend: 'up'   },
]

export const ANALYTICS_PAGES = [
  { label: 'Accueil',           visits: 1240, bounce: '42%', avg: '3:12', pct: 100 },
  { label: 'Galerie Produits',  visits: 845,  bounce: '38%', avg: '4:45', pct: 68  },
  { label: 'Services',          visits: 620,  bounce: '55%', avg: '2:10', pct: 50  },
  { label: 'Contact',           visits: 410,  bounce: '30%', avg: '5:20', pct: 33  },
  { label: 'À Propos',          visits: 280,  bounce: '62%', avg: '1:55', pct: 23  },
  { label: 'Actualités',        visits: 215,  bounce: '48%', avg: '3:30', pct: 17  },
]

export const ANALYTICS_SOURCES = [
  { source: 'Recherche organique', pct: 48, color: '#27ae60' },
  { source: 'Réseaux sociaux',     pct: 22, color: '#3498db' },
  { source: 'Accès direct',        pct: 18, color: '#9b59b6' },
  { source: 'Référencement',       pct: 8,  color: '#f39c12' },
  { source: 'Autres',              pct: 4,  color: '#e74c3c' },
]

export const ANALYTICS_MONTHLY = [
  { month: 'Jan', visits: 1820 }, { month: 'Fév', visits: 2100 },
  { month: 'Mar', visits: 1950 }, { month: 'Avr', visits: 2400 },
  { month: 'Mai', visits: 3421 }, { month: 'Jun', visits: 2800 },
]

export const PRODUCTS_DATA = [
  { id: 1,  name: 'Amoxicilline 500mg',         cat: 'medicaments',   stock: 142, price: 3500,  status: 'active',   image: img_a  },
  { id: 2,  name: 'Paracétamol 500mg',           cat: 'medicaments',   stock: 280, price: 1200,  status: 'active',   image: img_b  },
  { id: 3,  name: 'Ibuprofène 400mg',            cat: 'medicaments',   stock: 95,  price: 2000,  status: 'active',   image: img_c  },
  { id: 4,  name: 'Artesunate (Antipaludéen)',   cat: 'medicaments',   stock: 60,  price: 4500,  status: 'active',   image: img_d  },
  { id: 5,  name: 'Métronidazole 250mg',         cat: 'medicaments',   stock: 8,   price: 1800,  status: 'low',      image: img_e  },
  { id: 6,  name: 'Sirop antitussif Toplexil',   cat: 'medicaments',   stock: 0,   price: 3200,  status: 'rupture',  image: img_f  },
  { id: 7,  name: 'Crème hydratante Nivea',      cat: 'parapharmacie', stock: 34,  price: 5500,  status: 'active',   image: img_g  },
  { id: 8,  name: 'Gel douche Dermovitamina',    cat: 'parapharmacie', stock: 22,  price: 4200,  status: 'active',   image: img_h  },
  { id: 9,  name: 'Crème solaire SPF50',         cat: 'parapharmacie', stock: 15,  price: 8500,  status: 'active',   image: img_i  },
  { id: 10, name: 'Couches bébé Pampers T3',     cat: 'bebe',          stock: 48,  price: 12000, status: 'active',   image: img_j  },
  { id: 11, name: 'Lait 1er âge Blédilait',      cat: 'bebe',          stock: 6,   price: 9500,  status: 'low',      image: img_k  },
  { id: 12, name: 'Vitamine C 1000mg Bion3',     cat: 'vitamines',     stock: 75,  price: 6500,  status: 'active',   image: img_l  },
  { id: 13, name: 'Vitamine D3 2000 UI',         cat: 'vitamines',     stock: 55,  price: 7200,  status: 'active',   image: img_m  },
  { id: 14, name: 'Tensiomètre OMRON M3',        cat: 'materiel',      stock: 12,  price: 45000, status: 'active',   image: img_n  },
  { id: 15, name: 'Glucomètre Accu-Chek',        cat: 'materiel',      stock: 8,   price: 38000, status: 'active',   image: img_o  },
  { id: 16, name: 'Oxymètre de pouls',           cat: 'materiel',      stock: 0,   price: 22000, status: 'rupture',  image: img_p  },
  { id: 17, name: 'Shampoing antipelliculaire',  cat: 'parapharmacie', stock: 28,  price: 3800,  status: 'active',   image: img_aa },
  { id: 18, name: 'Crème anti-âge',              cat: 'parapharmacie', stock: 18,  price: 9200,  status: 'active',   image: img_bb },
  { id: 19, name: 'Lingettes bébé douces',       cat: 'bebe',          stock: 55,  price: 2800,  status: 'active',   image: img_cc },
  { id: 20, name: 'Stéthoscope pro',             cat: 'materiel',      stock: 5,   price: 28000, status: 'low',      image: img_dd },
  { id: 21, name: 'Magnésium B6',                cat: 'vitamines',     stock: 42,  price: 5800,  status: 'active',   image: img_ee },
  { id: 22, name: 'Dentifrice blancheur',        cat: 'parapharmacie', stock: 60,  price: 2200,  status: 'active',   image: img_ff },
  { id: 23, name: 'Biberon anti-coliques',       cat: 'bebe',          stock: 22,  price: 6500,  status: 'active',   image: img_gg },
  { id: 24, name: 'Oméga 3',                     cat: 'vitamines',     stock: 35,  price: 8900,  status: 'active',   image: img_hh },
  { id: 25, name: 'Nébuliseur / Aérosol',        cat: 'materiel',      stock: 4,   price: 35000, status: 'low',      image: img_ii },
  { id: 26, name: 'Sirop pediatrique',           cat: 'medicaments',   stock: 30,  price: 2600,  status: 'active',   image: img_jj },
  { id: 27, name: 'Zinc immunité',               cat: 'vitamines',     stock: 48,  price: 4500,  status: 'active',   image: img_kk },
  { id: 28, name: 'Crème bébé change',           cat: 'bebe',          stock: 38,  price: 3200,  status: 'active',   image: img_ll },
  { id: 29, name: 'Bandages stériles',           cat: 'materiel',      stock: 120, price: 800,   status: 'active',   image: img_mm },
  { id: 30, name: 'Multivitamines complet',      cat: 'vitamines',     stock: 25,  price: 7800,  status: 'active',   image: img_nn },
]

export const ARTICLES_DATA = [
  { id: 1, title: 'Promotion sur les Vitamines',          cat: 'promotions',  status: 'published', views: 234, date: '15 Mai 2025', excerpt: "-20% sur toute la gamme vitamines jusqu'au 31 mai.", author: 'Dr DJOKO' },
  { id: 2, title: 'Nouveau Service: Téléconsultation',    cat: 'nouveautes',  status: 'published', views: 189, date: '10 Mai 2025', excerpt: "Consultez nos pharmaciens en ligne depuis chez vous.", author: 'Dr DJOKO' },
  { id: 3, title: 'Prévenir le Paludisme',                cat: 'conseils',    status: 'published', views: 412, date: '5 Mai 2025',  excerpt: "Conseils pratiques pour vous protéger de la malaria.", author: 'Dr CHIGHEN' },
  { id: 4, title: 'Offre Matériel Médical',               cat: 'promotions',  status: 'published', views: 145, date: '1 Mai 2025',  excerpt: "Tensiomètres et glucomètres à prix réduits.", author: 'Dr DJOKO' },
  { id: 5, title: 'Bien Gérer son Diabète',               cat: 'conseils',    status: 'published', views: 320, date: '28 Avr 2025', excerpt: "Guide complet pour un suivi optimal de votre glycémie.", author: 'Dr CHIGHEN' },
  { id: 6, title: 'Livraison Express à Bafoussam',        cat: 'nouveautes',  status: 'published', views: 267, date: '20 Avr 2025', excerpt: "Votre commande prête en moins de 30 minutes.", author: 'Dr DJOKO' },
  { id: 7, title: 'Hygiène en saison des pluies',         cat: 'conseils',    status: 'draft',     views: 0,   date: '—',           excerpt: "Brouillon en cours de rédaction.", author: 'Dr CHIGHEN' },
]

export const CLIENTS_DATA = [
  { id: 1, name: 'Paul Nkomo',        email: 'paul.nkomo@gmail.com',  phone: '677 123 456', ville: 'Bafoussam', role: 'client', status: 'active',   joined: '12 Jan 2024', orders: 8  },
  { id: 2, name: 'Marie Talla',       email: 'marie.talla@yahoo.fr',  phone: '698 234 567', ville: 'Bafoussam', role: 'client', status: 'active',   joined: '3 Fév 2024',  orders: 14 },
  { id: 3, name: 'Jean Fotso',        email: 'jfotso@hotmail.com',    phone: '655 345 678', ville: 'Dschang',   role: 'client', status: 'active',   joined: '8 Mar 2024',  orders: 3  },
  { id: 4, name: 'Claire Kamga',      email: 'claire.k@gmail.com',    phone: '675 456 789', ville: 'Bafoussam', role: 'client', status: 'inactive', joined: '20 Mar 2024', orders: 1  },
  { id: 5, name: 'Dr CHIGHEN Ariane', email: 'chighen@pharmacie.cm',  phone: '698 431 111', ville: 'Bafoussam', role: 'staff',  status: 'active',   joined: '1 Jan 2020',  orders: 0  },
  { id: 6, name: 'Thomas Ngounou',    email: 't.ngounou@gmail.com',   phone: '677 567 890', ville: 'Mbouda',    role: 'client', status: 'active',   joined: '5 Avr 2024',  orders: 6  },
  { id: 7, name: 'Solange Bah',       email: 's.bah@yahoo.fr',        phone: '655 678 901', ville: 'Bafoussam', role: 'client', status: 'active',   joined: '18 Avr 2024', orders: 11 },
  { id: 8, name: 'Ernest Tchouateu',  email: 'e.tchouateu@gmail.com', phone: '698 789 012', ville: 'Bafoussam', role: 'client', status: 'active',   joined: '2 Mai 2024',  orders: 2  },
]

export const MESSAGES_DATA = [
  { id: 1, name: 'Paul Nkomo',     email: 'paul.nkomo@gmail.com', subject: 'Demande de prix Glucomètre', type: 'info',    status: 'unread',  date: '22 Mai 2025', msg: 'Bonjour, je voudrais connaître le prix du glucomètre Accu-Chek et si vous en avez en stock. Merci.' },
  { id: 2, name: 'Marie Talla',    email: 'marie.talla@yahoo.fr', subject: 'Conseil pour bébé 3 mois',  type: 'conseil', status: 'read',    date: '21 Mai 2025', msg: "Mon bébé a 3 mois et a de l'eczéma. Quels produits conseillez-vous pour sa peau ?" },
  { id: 3, name: 'Jean Fotso',     email: 'jfotso@hotmail.com',   subject: 'Livraison disponible ?',    type: 'info',    status: 'replied', date: '20 Mai 2025', msg: 'Est-ce que vous faites des livraisons à Dschang ? Quels sont vos délais et tarifs ?' },
  { id: 4, name: 'Solange Bah',    email: 's.bah@yahoo.fr',       subject: 'Commande paracétamol x10',  type: 'order',   status: 'unread',  date: '20 Mai 2025', msg: 'Je souhaiterais commander 10 boîtes de paracétamol 500mg. Comment procéder ?' },
  { id: 5, name: 'Thomas Ngounou', email: 't.ngounou@gmail.com',  subject: 'Vaccination contre grippe', type: 'rdv',     status: 'read',    date: '19 Mai 2025', msg: 'Proposez-vous la vaccination antigrippale ? Si oui quel est le prix ?' },
  { id: 6, name: 'Claire Kamga',   email: 'claire.k@gmail.com',   subject: "Ordonnance renouvelable ?", type: 'conseil', status: 'unread',  date: '18 Mai 2025', msg: 'Mon médecin est absent. Pouvez-vous renouveler mon ordonnance hypertension ?' },
]

export const ORDERS_DATA = [
  { id: 'CMD-001', client: 'Marie Talla',     items: 3, total: 18500, status: 'delivered',  date: '22 Mai 2025', address: 'Bafoussam centre' },
  { id: 'CMD-002', client: 'Paul Nkomo',      items: 1, total: 45000, status: 'processing', date: '22 Mai 2025', address: 'Quartier Tamdja'  },
  { id: 'CMD-003', client: 'Solange Bah',     items: 5, total: 12000, status: 'pending',    date: '21 Mai 2025', address: 'Bafoussam nord'   },
  { id: 'CMD-004', client: 'Thomas Ngounou',  items: 2, total: 9500,  status: 'shipped',    date: '20 Mai 2025', address: 'Mbouda'           },
  { id: 'CMD-005', client: 'Jean Fotso',      items: 4, total: 32000, status: 'cancelled',  date: '19 Mai 2025', address: 'Dschang'          },
  { id: 'CMD-006', client: 'Ernest Tchouateu',items: 2, total: 7200,  status: 'delivered',  date: '18 Mai 2025', address: 'Bafoussam'        },
]

export const SERVICES_DATA = [
  { id: 1, icon: 'bi-camera-video',     title: 'Téléconsultation',         status: 'active',   desc: 'Accédez à un avis professionnel en toute confidentialité.' },
  { id: 2, icon: 'bi-chat-dots',        title: 'Conseils Pharmaceutiques', status: 'active',   desc: 'Nos pharmaciens vous accompagnent avec des conseils personnalisés.' },
  { id: 3, icon: 'bi-heart-pulse-fill', title: 'Prise de Glycémie',        status: 'active',   desc: 'Tests de glycémie et mesure de tension artérielle.' },
  { id: 4, icon: 'bi-prescription2',    title: 'Préparations Magistrales', status: 'active',   desc: 'Préparations réalisées dans notre laboratoire.' },
  { id: 5, icon: 'bi-truck',            title: 'Livraison à Domicile',     status: 'active',   desc: 'Livraison rapide dans tout Bafoussam.' },
  { id: 6, icon: 'bi-thermometer-half', title: 'Produits Thermosensibles', status: 'active',   desc: 'Conservation optimale vaccins et insulines.' },
  { id: 7, icon: 'bi-clipboard2-pulse', title: 'Suivi Santé',              status: 'inactive', desc: 'Programme de suivi pour patients chroniques (en développement).' },
]

export const NOTIFS_DATA = [
  { id: 1, type: 'warning', title: 'Stock critique',   msg: 'Métronidazole 250mg — 8 unités restantes',      time: '2025-05-22T08:30:00', read: false },
  { id: 2, type: 'danger',  title: 'Rupture de stock', msg: 'Sirop antitussif Toplexil — 0 unité',           time: '2025-05-22T07:15:00', read: false },
  { id: 3, type: 'success', title: 'Commande livrée',  msg: 'CMD-001 — Marie Talla — livraison confirmée',   time: '2025-05-22T06:00:00', read: false },
  { id: 4, type: 'info',    title: 'Nouveau message',  msg: 'Paul Nkomo vous a envoyé une demande de prix',  time: '2025-05-21T18:45:00', read: true  },
  { id: 5, type: 'warning', title: 'Stock faible',     msg: 'Lait 1er âge Blédilait — 6 unités restantes',  time: '2025-05-21T14:00:00', read: true  },
  { id: 6, type: 'success', title: 'Nouveau client',   msg: "Ernest Tchouateu vient de s'inscrire",          time: '2025-05-20T11:30:00', read: true  },
  { id: 7, type: 'info',    title: 'Mise à jour SEO',  msg: 'Score SEO passé de 72 à 85/100',                time: '2025-05-19T09:00:00', read: true  },
]

export const SEO_DATA = {
  score: 85,
  title: 'Pharmacie du Secours - Bafoussam | Santé & Médicaments',
  description: 'Votre pharmacie de confiance depuis 1984 à Bafoussam. Médicaments, conseils santé, dépistage, livraison à domicile. Ouvert 7j/7.',
  keywords: 'pharmacie bafoussam, médicaments cameroun, santé bafoussam, pharmacie du secours, paracétamol',
  ogTitle: 'Pharmacie du Secours — Excellence Pharmaceutique',
  ogDescription: '40 ans au service de votre santé à Bafoussam',
  indexable: true,
  sitemap: true,
  robotsTxt: true,
  pages: [
    { url: '/',           title: 'Accueil',    score: 92, issues: 0 },
    { url: '/services',   title: 'Services',   score: 88, issues: 1 },
    { url: '/galerie',    title: 'Galerie',    score: 75, issues: 3 },
    { url: '/a-propos',   title: 'À Propos',   score: 80, issues: 2 },
    { url: '/contact',    title: 'Contact',    score: 94, issues: 0 },
    { url: '/actualites', title: 'Actualités', score: 70, issues: 4 },
  ],
}

export const SETTINGS_DATA = {
  general: {
    name: 'Pharmacie du Secours',
    slogan: 'Innovation • Excellence • Proximité',
    email: 'contact@pharmaciedusecours.cm',
    phone1: '(+237) 233 44 13 27',
    phone2: '(+237) 675 14 62 65',
    phone3: '(+237) 698 43 11 11',
    address: '90, Avenue Wanko, Quartier Tamdja, Bafoussam',
    whatsapp: '237675146265',
    hours: 'Lundi – Dimanche : 7h30 – 20h00',
    facebook: 'https://facebook.com/pharmaciedusecours',
    instagram: 'https://instagram.com/pharmaciedusecours',
  },
  legal: {
    stat: '2668 101B',
    rc: 'N° 382 / 2002-2003',
    contribuable: 'P015300005990X',
    pharmacien: 'Dr DJOKO Ernest',
    diplome: 'Docteur en pharmacie — Université de Paris XI',
  },
  payment: {
    cinetpay_key: 'YOUR_API_KEY',
    cinetpay_site: 'YOUR_SITE_ID',
    mode: 'PRODUCTION',
    currency: 'XAF',
    enabled: true,
  },
  maintenance: false,
  lang_default: 'fr',
}
