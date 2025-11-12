import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import AssistantSidebar from './components/AssistantSidebar'
import Chat from './components/Chat'

function App() {
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [eventId, setEventId] = useState(null)

  useEffect(() => {
    // Ensure a demo event exists
    const ensure = async () => {
      const events = await fetch(`${baseUrl}/events`).then(r=>r.json())
      if (events.length) { setEventId(events[0].id); return }
      const res = await fetch(`${baseUrl}/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: 'Demo Event', description: 'Sample storyboard' })})
      const data = await res.json()
      setEventId(data.id)
    }
    ensure()
  }, [baseUrl])

  const onReorder = async (items) => {
    await fetch(`${baseUrl}/storyitems/reorder`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) })
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(25rem_25rem_at_top_right,rgba(99,102,241,.15),transparent),radial-gradient(20rem_20rem_at_bottom_left,rgba(236,72,153,.12),transparent)] dark:bg-[radial-gradient(25rem_25rem_at_top_right,rgba(99,102,241,.25),transparent),radial-gradient(20rem_20rem_at_bottom_left,rgba(236,72,153,.18),transparent)]">
      <Header onToggleSidebar={() => setSidebarOpen(s=>!s)} />
      <Hero />
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-6">
        <div className="space-y-6">
          <Timeline baseUrl={baseUrl} eventId={eventId} onReorder={onReorder} />
          <Chat baseUrl={baseUrl} eventId={eventId} />
        </div>
        <AssistantSidebar baseUrl={baseUrl} eventId={eventId} />
      </main>
      <footer className="text-center text-xs text-zinc-500 py-10">Made for event planners · Glassmorphic · Pastel · Futuristic</footer>
    </div>
  )
}

export default App
