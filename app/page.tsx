import { ArrowUpRight, BarChart3, Database, Search, ShieldCheck, Sparkles } from 'lucide-react';

const principles = [
  { icon: BarChart3, title: 'Age-adjusted outliers', text: 'Compare videos with a channel baseline at a similar age and in the same format—not raw views alone.' },
  { icon: Database, title: 'Historical snapshots', text: 'Keep each observation so future analysis can measure real growth instead of overwriting history.' },
  { icon: ShieldCheck, title: 'Official API only', text: 'YouTube Data API requests stay on the server. No API key is sent to the browser.' },
];

const setup = [
  ['Connect data', 'Add PostgreSQL and YOUTUBE_API_KEY in your local environment.'],
  ['Start discovery', 'Use the search endpoint to discover public videos, then persist snapshots.'],
  ['Build evidence', 'Only show opportunity scores when there is enough data for a defensible baseline.'],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-400">Vercel Search YT</p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">YouTube opportunity intelligence</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">A research workspace for finding videos that outperform their channel’s normal performance.</p>
          </div>
          <a href="/api/health" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-500 hover:text-white">
            <Search size={16} /> Service health <ArrowUpRight size={14} />
          </a>
        </header>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-9">
          <div className="flex items-center gap-2 text-sky-400"><Sparkles size={18} /><span className="text-sm font-medium">Research-first dashboard</span></div>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">Find the breakout—not just the biggest view count.</h2>
          <p className="mt-4 max-w-2xl text-slate-400">This project is at its foundation stage. No live analytics are presented as real until YouTube data is connected, collected, and compared against a sufficient historical baseline.</p>
          <div className="mt-6 inline-flex rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm text-amber-200">Data setup required · no sample metrics presented as live results</div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <Icon className="h-6 w-6 text-sky-400" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Recommended first steps</h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {setup.map(([title, text], index) => (
              <li key={title} className="rounded-xl bg-slate-950/70 p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">Step 0{index + 1}</span>
                <h3 className="mt-2 font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-8 border-t border-slate-800 pt-5 text-xs leading-5 text-slate-500">Opportunity and revenue figures, when implemented, are estimates derived from public data—not official YouTube metrics or creator earnings.</footer>
      </div>
    </main>
  );
}
