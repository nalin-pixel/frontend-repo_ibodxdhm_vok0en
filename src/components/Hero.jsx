import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[56vh] md:h-[64vh] lg:h-[72vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/80 dark:from-zinc-900/50 dark:via-zinc-900/20 dark:to-zinc-900/80 pointer-events-none" />

      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="backdrop-blur-xl bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Plan visually. Execute flawlessly.
          </h1>
          <p className="mt-3 md:mt-4 text-zinc-700 dark:text-zinc-300 text-sm md:text-base">
            A modern dashboard for event planners—timeline-first, draggable story cards, AI hints, and live team chat.
          </p>
          <div className="mt-4 md:mt-6 flex items-center gap-3">
            <a href="#board" className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg shadow-black/20 hover:scale-[1.02] transition">
              Open storyboard
            </a>
            <a href="#ai" className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/20 bg-white/60 dark:bg-white/5 text-zinc-900 dark:text-zinc-100 hover:scale-[1.02] transition">
              Ask assistant
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
