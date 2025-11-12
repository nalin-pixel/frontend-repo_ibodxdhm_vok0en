import { useEffect, useMemo, useState } from 'react'
import { Clock, GripVertical, Plus } from 'lucide-react'

const pastel = [
  'from-pink-200/60 to-pink-100/60',
  'from-blue-200/60 to-blue-100/60',
  'from-teal-200/60 to-teal-100/60',
  'from-indigo-200/60 to-indigo-100/60',
  'from-violet-200/60 to-violet-100/60',
]

export default function Timeline({ baseUrl, eventId, onAdd, onReorder }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!eventId) return
    fetch(`${baseUrl}/events/${eventId}/storyitems`).then(r => r.json()).then(setItems)
  }, [baseUrl, eventId])

  useEffect(() => {
    const el = document.getElementById('timeline')
    if (!el) return
    let draggedId = null
    el.addEventListener('dragstart', (e) => {
      draggedId = e.target?.dataset?.id
    })
    el.addEventListener('dragover', (e) => e.preventDefault())
    el.addEventListener('drop', (e) => {
      e.preventDefault()
      const targetId = e.target?.closest('[data-id]')?.dataset?.id
      if (!draggedId || !targetId || draggedId === targetId) return
      const current = [...items]
      const fromIdx = current.findIndex(i => i.id === draggedId)
      const toIdx = current.findIndex(i => i.id === targetId)
      const [moved] = current.splice(fromIdx, 1)
      current.splice(toIdx, 0, moved)
      const reordered = current.map((it, idx) => ({ id: it.id, position: idx }))
      setItems(current)
      onReorder(reordered)
    })
    return () => {}
  }, [items, onReorder])

  const addItem = async () => {
    if (!eventId) return
    const payload = {
      event_id: eventId,
      title: `Card ${items.length + 1}`,
      time: `${9 + items.length}:00 AM`,
      position: items.length,
    }
    const res = await fetch(`${baseUrl}/storyitems`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const { id } = await res.json()
    setItems([...items, { ...payload, id }])
    onAdd?.()
  }

  return (
    <section id="board" className="px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2"><Clock size={18}/> Timeline</h2>
        <button onClick={addItem} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:scale-[1.02] transition">
          <Plus size={16}/> Add card
        </button>
      </div>
      <div id="timeline" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, idx) => (
          <div
            key={it.id}
            data-id={it.id}
            draggable
            className={`group relative rounded-2xl p-4 backdrop-blur-xl bg-gradient-to-br ${pastel[idx % pastel.length]} border border-white/40 dark:border-white/10 shadow-xl`}
          >
            <div className="absolute -top-3 -left-3 h-10 w-10 rounded-xl bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/10 grid place-items-center">
              <GripVertical className="text-zinc-500 dark:text-zinc-400" size={16} />
            </div>
            <div className="text-xs text-zinc-700 dark:text-zinc-300 mb-1">{it.time || '—'}</div>
            <div className="text-zinc-900 dark:text-zinc-100 font-semibold text-base">{it.title}</div>
            {it.notes && <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{it.notes}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
