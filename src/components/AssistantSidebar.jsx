import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

export default function AssistantSidebar({ baseUrl, eventId }) {
  const [open, setOpen] = useState(true)
  const [prompt, setPrompt] = useState('Improve the wedding ceremony timeline with better pacing and vendor touchpoints')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    requestSuggestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const requestSuggestions = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/assistant/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, event_id: eventId || null })
      })
      const data = await res.json()
      setSuggestions(data.suggestions || [])
    } catch (e) {
      setSuggestions(["Assistant unavailable. Try again later."])
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside id="ai" className={`transition-all duration-300 ${open ? 'w-80' : 'w-12'} hidden lg:block`}>
      <div className="h-full sticky top-16 p-3">
        <div className="rounded-2xl backdrop-blur-xl bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 h-[calc(100vh-6rem)] flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100"><Sparkles size={18}/> AI Assistant</div>
            <button onClick={() => setOpen(o => !o)} className="text-xs px-2 py-1 rounded-lg bg-white/60 dark:bg-white/10">{open ? 'Hide' : 'Show'}</button>
          </div>
          {open && (
            <div className="flex-1 p-3 overflow-auto space-y-3">
              <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full text-sm p-3 rounded-xl bg-white/60 dark:bg-white/10 border border-black/10 dark:border-white/10 outline-none" rows={4} />
              <button onClick={requestSuggestions} className="w-full px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">{loading ? 'Thinking…' : 'Suggest improvements'}</button>
              <div className="space-y-2">
                {suggestions.map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/60 dark:bg-white/10 border border-black/10 dark:border-white/10 text-sm text-zinc-800 dark:text-zinc-200">{s}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
