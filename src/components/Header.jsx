import { useEffect, useState } from 'react'
import { Moon, Sun, Menu } from 'lucide-react'

export default function Header({ onToggleSidebar }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 bg-white/50 dark:bg-zinc-900/50 border-b border-white/20 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/30" />
            <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Event Storyboard</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark(d => !d)} className="px-3 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:scale-[1.02] transition">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
