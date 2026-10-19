// ============================================================
// PHARMACIE DU SECOURS — Centralized Data
// ============================================================

import docErnest from '../assets/Dr  DJOKO Ernest.jpg'
import docAriane from '../assets/img2.jpeg'
import teamImage from '../assets/i.jpeg'

export const PHARMACY_INFO = {
  name: 'Pharmacie du Secours',
  tagline: 'Innovation • Excellence • Proximité',
  since: 1984,
  address: '90, Avenue Wanko, Quartier Tamdja, Bafoussam',
  bp: 'BP 965, Cameroun',
  phones: ['(+237) 233 44 13 27', '(+237) 675 14 62 65', '(+237) 698 43 11 11'],
  whatsapp: '237675146265',
  hours: {
    fr: 'Lundi – Dimanche : 7h30 – 20h00',
    en: 'Monday – Sunday: 7:30am – 8:00pm',
  },
  stats: [
    { count: 40, label: { fr: "Années d'expérience", en: 'Years of experience' }, suffix: '+' },
    { count: 15000, label: { fr: 'Clients satisfaits', en: 'Satisfied customers' }, suffix: '+' },
    { count: 5000, label: { fr: 'Produits disponibles', en: 'Products available' }, suffix: '+' },
    { count: 7, label: { fr: 'Ouverture 7j/7', en: 'Open 7 days a week' }, suffix: 'j' },
  ],
  legal: { stat: '2668 101B', rc: 'N° 382 / 2002-2003', contribuable: 'P015300005990X' },
  mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.422!2d10.416667!3d5.466667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjgnMDAuMCJOIDEwwrAyNScwMC4wIkU!5e0!3m2!1sfr!2scm!4v1234567890',
}

export const TEAM = [
  { name: 'Dr DJOKO Ernest', role: 'Pharmacien Titulaire', detail: 'Docteur en pharmacie — Université de Paris XI\nD.E.S.S. chimie analytique • D.E.S.S. pharmacie galénique', image: docErnest },
  { name: 'Dr CHIGHEN Ariane', role: 'Pharmacienne Assistante', detail: 'Seconde le titulaire et assure le suivi des stagiaires', image: docAriane },
  { name: 'Équipe dévouée', role: 'Auxiliaires & Personnel', detail: 'Une équipe qualifiée pour vous servir avec professionnalisme', image: teamImage },
]

export const SERVICES = {
  fr: [
    { icon: 'bi-chat-dots', title: 'Conseils Pharmaceutiques', desc: 'Nos pharmaciens diplômés vous accompagnent avec des conseils personnalisés pour votre santé.' },
    { icon: 'bi-heart-pulse-fill', title: 'Prise de Glycémie', desc: 'Tests de glycémie, mesure de tension artérielle, et autres services de dépistage avec équipements professionnels.' },
    { icon: 'bi-prescription2', title: 'Préparations Magistrales et Officinales', desc: 'Préparations magistrales et officinales réalisées dans notre laboratoire avec expertise.' },
    { icon: 'bi-heart-pulse', title: 'Mesure de Tension', desc: 'Contrôle gratuit de votre tension artérielle avec nos équipements professionnels.' },
    { icon: 'bi-flower2', title: 'Produits Naturels à Base de Plantes et de Minéraux', desc: 'Des solutions naturelles à base de plantes et de minéraux, sélectionnées pour votre bien-être et votre équilibre.' },
    { icon: 'bi-clipboard2-pulse', title: 'Suivi Santé', desc: 'Programme de suivi personnalisé pour patients chroniques avec rappels et bilans réguliers.' },
  ],
  en: [
    { icon: 'bi-chat-dots', title: 'Pharmacy Advice', desc: 'Our licensed pharmacists provide tailored recommendations for your health.' },
    { icon: 'bi-heart-pulse-fill', title: 'Blood Sugar Check', desc: 'Blood glucose tests, blood pressure measurement, and screening services with professional equipment.' },
    { icon: 'bi-prescription2', title: 'Magistral and Officinal Preparations', desc: 'Magistral and officinal preparations made in our lab with expert care.' },
    { icon: 'bi-heart-pulse', title: 'Blood Pressure Check', desc: 'Free blood pressure monitoring with our professional equipment.' },
    { icon: 'bi-flower2', title: 'Natural Products Based on Plants and Minerals', desc: 'Natural solutions made from plants and minerals, selected for your well-being and balance.' },
    { icon: 'bi-clipboard2-pulse', title: 'Health Follow-up', desc: 'Personalized chronic care program with reminders and regular reviews.' },
  ],
}

export const GALLERY_CATEGORIES = {
  fr: [
    { id: 'all', label: 'Tout voir', icon: 'bi-grid-3x3-gap' },
    { id: 'medicaments', label: 'Médicaments', icon: 'bi-capsule-pill' },
    { id: 'parapharmacie', label: 'Parapharmacie', icon: 'bi-heart-pulse' },
    { id: 'bebe', label: 'Bébé & Maternité', icon: 'bi-baby' },
    { id: 'vitamines', label: 'Vitamines', icon: 'bi-stars' },
    { id: 'materiel', label: 'Matériel Médical', icon: 'bi-hospital' },
  ],
  en: [
    { id: 'all', label: 'See All', icon: 'bi-grid-3x3-gap' },
    { id: 'medicaments', label: 'Medications', icon: 'bi-capsule-pill' },
    { id: 'parapharmacie', label: 'Parapharmacy', icon: 'bi-heart-pulse' },
    { id: 'bebe', label: 'Baby & Maternity', icon: 'bi-baby' },
    { id: 'vitamines', label: 'Vitamins', icon: 'bi-stars' },
    { id: 'materiel', label: 'Medical Equipment', icon: 'bi-hospital' },
  ],
}

export const GALLERY_PRODUCTS_INITIAL = [
  { id: 1, name: 'Amoxicilline', cat: 'medicaments' },
  { id: 2, name: 'Paracétamol 500mg', cat: 'medicaments' },
  { id: 3, name: 'Ibuprofène 400mg', cat: 'medicaments' },
  { id: 4, name: 'Artesunate (Antipaludéen)', cat: 'medicaments' },
  { id: 5, name: 'Métronidazole', cat: 'medicaments' },
  { id: 6, name: 'Sirop antitussif', cat: 'medicaments' },
  { id: 7, name: 'Crème hydratante', cat: 'parapharmacie' },
  { id: 8, name: 'Gel douche dermatologique', cat: 'parapharmacie' },
  { id: 9, name: 'Shampoing antipelliculaire', cat: 'parapharmacie' },
  { id: 10, name: 'Crème solaire SPF50', cat: 'parapharmacie' },
  { id: 11, name: 'Sérum visage anti-âge', cat: 'parapharmacie' },
  { id: 12, name: 'Dentifrice blancheur', cat: 'parapharmacie' },
  { id: 13, name: 'Couches bébé premium', cat: 'bebe' },
  { id: 14, name: 'Lait maternité 1er âge', cat: 'bebe' },
  { id: 15, name: 'Lingettes bébé douces', cat: 'bebe' },
  { id: 16, name: 'Crème change bébé', cat: 'bebe' },
  { id: 17, name: 'Thermomètre auriculaire', cat: 'bebe' },
  { id: 18, name: 'Biberon anti-coliques', cat: 'bebe' },
  { id: 19, name: 'Vitamine C 1000mg', cat: 'vitamines' },
  { id: 20, name: 'Vitamine D3 2000 UI', cat: 'vitamines' },
  { id: 21, name: 'Magnésium B6', cat: 'vitamines' },
  { id: 22, name: 'Oméga 3 Huile de poisson', cat: 'vitamines' },
  { id: 23, name: 'Zinc immunité', cat: 'vitamines' },
  { id: 24, name: 'Multivitamines complet', cat: 'vitamines' },
  { id: 25, name: 'Tensiomètre électronique', cat: 'materiel' },
  { id: 26, name: 'Glucomètre (glycémie)', cat: 'materiel' },
  { id: 27, name: 'Stéthoscope professionnel', cat: 'materiel' },
  { id: 28, name: 'Nébuliseur / Aérosol', cat: 'materiel' },
  { id: 29, name: 'Béquilles orthopédiques', cat: 'materiel' },
  { id: 30, name: 'Oxymètre de pouls', cat: 'materiel' },
]

export const TIMELINE = {
  fr: [
    { year: '1984', phase: 'Naissance', title: 'Ouverture de la Pharmacie du Secours', desc: "Le Dr DJOKO Ernest fonde la Pharmacie du Secours à Bafoussam, Quartier Tamdja. Un rêve réalisé après ses études brillantes à l'Université de Paris XI." },
    { year: '1990', phase: 'Première expansion', title: 'Agrandissement & Nouveaux Services', desc: "La pharmacie s'agrandit pour répondre à une clientèle croissante. Extension du laboratoire et mise en place de nouvelles spécialités." },
    { year: '2000', phase: 'Nouveau siècle', title: 'Consolidation & Reconnaissance', desc: "Après 15 ans d'excellence, la Pharmacie du Secours devient une référence incontournable dans la région de Bafoussam et l'Ouest-Cameroun." },
    { year: '2010', phase: 'Révolution numérique', title: 'Modernisation & Informatisation', desc: "Digitalisation complète de la gestion des stocks, implémentation d'un système informatique avancé et rénovation de l'espace de vente." },
    { year: '2015', phase: '30e Anniversaire', title: 'Célébration des 30 Ans', desc: "Trois décennies au service de la santé des Bafoussaintains. Une fête inoubliable avec clients, partenaires et toute l'équipe." },
    { year: '2020', phase: 'Résilience', title: 'Engagement Durant la Crise Sanitaire', desc: "Face à la pandémie mondiale, la Pharmacie du Secours reste ouverte et engage son équipe à protéger la communauté." },
    { year: '2025', phase: "Aujourd'hui", title: "Plus de 40 Ans & Toujours en Avant", desc: "Lancement de la plateforme en ligne, téléconsultation, suivi santé — une nouvelle ère avec les mêmes valeurs fondatrices." },
  ],
  en: [
    { year: '1984', phase: 'Founding', title: 'Opening of Pharmacie du Secours', desc: 'Dr. DJOKO Ernest opens Pharmacie du Secours in Bafoussam, Tamdja neighborhood, after graduating from Paris XI University.' },
    { year: '1990', phase: 'First expansion', title: 'Growth & New Services', desc: 'The pharmacy expands to serve a growing community, adding lab capacity and new specialties.' },
    { year: '2000', phase: 'New century', title: 'Recognition & Leadership', desc: 'After 15 years of excellence, Pharmacie du Secours becomes a regional benchmark in West Cameroon.' },
    { year: '2010', phase: 'Digital shift', title: 'Modernization & Digitization', desc: 'Complete digital stock management, advanced systems, and a renovated sales area.' },
    { year: '2015', phase: '30th anniversary', title: 'Celebrating 30 Years', desc: 'Three decades serving Bafoussam. An unforgettable celebration with customers, partners and staff.' },
    { year: '2020', phase: 'Resilience', title: 'Commitment During the Health Crisis', desc: 'During the global pandemic, Pharmacie du Secours remained open and protected the community.' },
    { year: '2025', phase: 'Today', title: 'Over 40 Years and Still Moving Forward', desc: 'Launching online services, teleconsultation, and health follow-up — a new era with the same founding values.' },
  ],
}

export const NEWS = {
  fr: [
    { id: 1, cat: 'promotions', title: 'Promotion sur les Vitamines', date: '15 Mai 2025', excerpt: '-20% sur toute la gamme vitamines et compléments alimentaires jusqu\'au 31 mai.' },
    { id: 2, cat: 'nouveautes', title: 'Nouveau Service: Téléconsultation', date: '10 Mai 2025', excerpt: 'Consultez nos pharmaciens en ligne depuis chez vous via WhatsApp ou appel vidéo.' },
    { id: 3, cat: 'conseils', title: 'Prévenir le Paludisme', date: '5 Mai 2025', excerpt: 'Conseils pratiques de nos experts pour protéger vous et votre famille de la malaria.' },
    { id: 4, cat: 'promotions', title: 'Offre Matériel Médical', date: '1 Mai 2025', excerpt: 'Tensiomètres et glucomètres à prix réduits pour le mois de mai.' },
    { id: 5, cat: 'conseils', title: 'Bien Gérer son Diabète', date: '28 Avr 2025', excerpt: 'Guide complet de nos pharmaciens pour un suivi optimal de votre glycémie au quotidien.' },
  ],
  en: [
    { id: 1, cat: 'promotions', title: 'Vitamin Promotion', date: 'May 15, 2025', excerpt: '20% off vitamins and supplements until May 31.' },
    { id: 2, cat: 'nouveautes', title: 'New Service: Teleconsultation', date: 'May 10, 2025', excerpt: 'Consult our pharmacists online from home via WhatsApp or video call.' },
    { id: 3, cat: 'conseils', title: 'Preventing Malaria', date: 'May 5, 2025', excerpt: 'Practical advice from our experts to protect your family from malaria.' },
    { id: 4, cat: 'promotions', title: 'Medical Equipment Offer', date: 'May 1, 2025', excerpt: 'Blood pressure monitors and glucometers at reduced prices for the month of May.' },
    { id: 5, cat: 'conseils', title: 'Managing Diabetes Well', date: 'Apr 28, 2025', excerpt: 'A full guide from our pharmacists for optimal daily blood sugar tracking.' },
  ],
}

export const PARTNERS = [
  '/image/logo/1.jpeg', '/image/logo/2.jpeg', '/image/logo/3.jpeg',
  '/image/logo/4.jpeg', '/image/logo/5.jpeg', '/image/logo/6.png',
  '/image/logo/7.jpeg', '/image/logo/8.jpeg', '/image/logo/9.jpeg',
  '/image/logo/10.jpeg', '/image/logo/11.jpeg', '/image/logo/12.jpeg',
]

export const HERO_SLIDES = {
  fr: [
    { bg: '/image/img 5.jpeg', title: 'Pharmacie du Secours', sub: 'Innovation • Excellence • Proximité', link: '/services', cta: 'Découvrir nos services' },
    { bg: '/image/img 6.jpeg', title: "Plus de 40 Ans d'Expertise", sub: 'Depuis 1984 • Confiance • Qualité', link: '/a-propos', cta: 'Notre histoire' },
    { bg: '/image/img1.jpeg', title: 'Services Premium', sub: 'Conseil Expert • Dépistage', link: '/services', cta: 'Voir les services' },
    { bg: '/image/img4.png', title: 'Innovation Digitale', sub: 'Téléconsultation • Suivi Santé', link: '/contact', cta: 'Nous contacter' },
  ],
  en: [
    { bg: '/image/img 5.jpeg', title: 'Pharmacie du Secours', sub: 'Innovation • Excellence • Proximity', link: '/services', cta: 'Discover our services' },
    { bg: '/image/img 6.jpeg', title: 'Over 40 Years of Expertise', sub: 'Since 1984 • Trust • Quality', link: '/a-propos', cta: 'Our story' },
    { bg: '/image/img1.jpeg', title: 'Premium Services', sub: 'Expert advice • Screening', link: '/services', cta: 'View services' },
    { bg: '/image/img4.png', title: 'Digital Innovation', sub: 'Teleconsultation • Health follow-up', link: '/contact', cta: 'Contact us' },
  ],
}

export const VALUES = {
  fr: [
    { icon: 'bi-shield-check', title: 'Confiance', desc: '40 ans de relation de confiance avec nos patients.' },
    { icon: 'bi-heart-pulse', title: 'Excellence', desc: 'Qualité pharmaceutique et conseils d\'experts diplômés.' },
    { icon: 'bi-people', title: 'Proximité', desc: 'Une pharmacie de quartier à l\'écoute de chacun.' },
    { icon: 'bi-lightning-charge', title: 'Innovation', desc: 'Toujours à la pointe des nouvelles technologies de santé.' },
  ],
  en: [
    { icon: 'bi-shield-check', title: 'Trust', desc: '40 years of trusted care for our patients.' },
    { icon: 'bi-heart-pulse', title: 'Excellence', desc: 'Pharmaceutical quality and expert licensed advice.' },
    { icon: 'bi-people', title: 'Proximity', desc: 'A community pharmacy that listens to everyone.' },
    { icon: 'bi-lightning-charge', title: 'Innovation', desc: 'Always at the forefront of health technology.' },
  ],
}

export const CAT_BADGES = {
  fr: {
    medicaments: { bg: 'rgba(231,76,60,0.2)', color: '#e74c3c', label: 'Médicament' },
    parapharmacie: { bg: 'rgba(52,152,219,0.2)', color: '#3498db', label: 'Parapharmacie' },
    bebe: { bg: 'rgba(155,89,182,0.2)', color: '#9b59b6', label: 'Bébé' },
    vitamines: { bg: 'rgba(243,156,18,0.2)', color: '#f39c12', label: 'Vitamine' },
    materiel: { bg: 'rgba(39,174,96,0.2)', color: '#27ae60', label: 'Matériel' },
  },
  en: {
    medicaments: { bg: 'rgba(231,76,60,0.2)', color: '#e74c3c', label: 'Medication' },
    parapharmacie: { bg: 'rgba(52,152,219,0.2)', color: '#3498db', label: 'Parapharmacy' },
    bebe: { bg: 'rgba(155,89,182,0.2)', color: '#9b59b6', label: 'Baby' },
    vitamines: { bg: 'rgba(243,156,18,0.2)', color: '#f39c12', label: 'Vitamin' },
    materiel: { bg: 'rgba(39,174,96,0.2)', color: '#27ae60', label: 'Equipment' },
  },
}

export const CAT_ICONS = {
  medicaments: 'bi-capsule-pill',
  parapharmacie: 'bi-droplet-half',
  bebe: 'bi-baby',
  vitamines: 'bi-stars',
  materiel: 'bi-heart-pulse',
}
