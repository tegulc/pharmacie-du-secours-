import { createContext, useContext, useState, useCallback } from 'react'

const NotifContext = createContext()

export function NotifProvider({ children }) {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', title: 'Bienvenue', msg: 'Site mis à jour avec succès', read: false, time: new Date() },
    { id: 2, type: 'success', title: 'Nouveau message', msg: 'Un client vous a contacté', read: false, time: new Date() },
    { id: 3, type: 'warning', title: 'Stock faible', msg: 'Paracétamol — stock bas', read: true, time: new Date() },
  ])

  const addNotif = useCallback((type, title, msg) => {
    const n = { id: Date.now(), type, title, msg, read: false, time: new Date() }
    setNotifications(prev => [n, ...prev])
  }, [])

  const markRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotifContext.Provider value={{ notifications, addNotif, markRead, markAllRead, unreadCount }}>
      {children}
    </NotifContext.Provider>
  )
}

export const useNotif = () => useContext(NotifContext)
