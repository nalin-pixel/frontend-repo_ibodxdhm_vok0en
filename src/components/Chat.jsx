import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'

export default function Chat({ baseUrl, eventId }) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (!eventId) return
    fetch(`${baseUrl}/events/${eventId}/chat`).then(r => r.json()).then(setMessages)
  }, [baseUrl, eventId])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!text.trim()) return
    const payload = { event_id: eventId || 'demo', user: 'You', text }
    const res = await fetch(`${baseUrl}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const { id } = await res.json()
    setMessages([...messages, { ...payload, id }])
    setText('')
  }

  return (
    <section className="rounded-2xl backdrop-blur-xl bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 h-[420px] flex flex-col">
      <div className="px-3 py-2 border-b border-black/5 dark:border-white/10 text-sm text-zinc-700 dark:text-zinc-300">Team chat</div>
      <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-2">
        {messages.map((m) => (
          <div key={m.id} className="text-sm">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{m.user}:</span>{' '}
            <span className="text-zinc-700 dark:text-zinc-300">{m.text}</span>
          </div>
        ))}
      </div>
      <div className="p-2 flex items-center gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message" className="flex-1 px-3 py-2 rounded-xl bg-white/60 dark:bg-white/10 border border-black/10 dark:border-white/10 outline-none text-sm" />
        <button onClick={send} className="px-3 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 inline-flex items-center gap-2"><Send size={16}/> Send</button>
      </div>
    </section>
  )
}
