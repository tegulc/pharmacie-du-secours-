const STORAGE_KEY = 'pharmacie-weekly-advice'

export const DEFAULT_ADVICE = [
  {
    id: 'default-1',
    title: 'Hypertension : Surveillez votre tension',
    excerpt: 'Mesurez régulièrement votre tension et consultez votre médecin si elle dépasse 140/90 mmHg.',
    content: 'L’hypertension artérielle est un facteur de risque majeur pour les maladies cardiovasculaires. Mesurez régulièrement votre tension et consultez votre médecin si elle dépasse 140/90 mmHg. Adoptez une alimentation équilibrée et réduisez votre consommation de sel.',
    weekLabel: 'Semaine du 02 juin au 08 juin 2026',
    weekStart: '2026-06-02',
    author: 'Dr DJOKO',
    createdAt: '2026-06-02T00:00:00.000Z',
  },
  {
    id: 'default-2',
    title: 'Hydratation : Buvez suffisamment d’eau',
    excerpt: 'Buvez au moins 1,5 à 2 litres d’eau par jour pour favoriser votre équilibre et votre bien-être.',
    content: 'Buvez au moins 1,5 à 2 litres d’eau par jour, davantage en cas de chaleur ou d’activité physique. L’eau facilite l’élimination des déchets et maintient la température corporelle.',
    weekLabel: 'Semaine du 26 mai au 01 juin 2026',
    weekStart: '2026-05-26',
    author: 'Dr CHIGHEN',
    createdAt: '2026-05-26T00:00:00.000Z',
  },
]

function normalizeAdvice(entries) {
  if (!Array.isArray(entries)) return []
  return entries
    .filter(Boolean)
    .map((item) => ({
      ...item,
      id: item.id || `${Date.now()}-${Math.random()}`,
      weekStart: item.weekStart || item.date || '2026-01-01',
      weekLabel: item.weekLabel || item.title,
      title: item.title || 'Conseil de la semaine',
      excerpt: item.excerpt || item.summary || '',
      content: item.content || '',
      author: item.author || 'Dr DJOKO',
    }))
    .sort((a, b) => new Date(b.weekStart) - new Date(a.weekStart))
}

export function getStoredAdvice() {
  if (typeof window === 'undefined') return normalizeAdvice(DEFAULT_ADVICE)
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return normalizeAdvice(DEFAULT_ADVICE)
    return normalizeAdvice(JSON.parse(raw))
  } catch {
    return normalizeAdvice(DEFAULT_ADVICE)
  }
}

export function saveAdviceEntries(entries) {
  if (typeof window === 'undefined') return
  const normalized = normalizeAdvice(entries)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
  return normalized
}

export function addAdviceEntry(entry) {
  const current = getStoredAdvice()
  const next = saveAdviceEntries([entry, ...current])
  return next || []
}
