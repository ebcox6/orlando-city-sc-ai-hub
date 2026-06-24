import { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Bot, Home } from 'lucide-react';
import NavItem from './NavItem';
import { useSearch } from '../hooks/useSearch';
import { config } from '../tenant.config';

const NAV_ITEMS = [
  { to: '/',         icon: <Home size={15} />,       label: 'Home',             end: true },
  { to: '/frameworks', icon: '🧙🏾‍♂️',                  label: 'Frameworks' },
  { to: '/library',  icon: <BookOpen size={15} />,   label: 'Prompt Library' },
  { to: '/agents',   icon: <Bot size={15} />,        label: 'Build Your Agent' },
  { to: '/favorites',icon: '❤️',                     label: 'Favorites' },
];

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome    = location.pathname === '/';
  const isWelcome = location.pathname === '/welcome';
  const { query, setQuery, results } = useSearch();

  const handleSearch = (e) => setQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      const first = results[0];
      setQuery('');
      navigate(`/${first.section}`);
      // Scroll to anchor after navigation settles
      setTimeout(() => {
        const el = document.getElementById(first.id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f7]">

      {/* ── Topbar ─────────────────────────────────────────────────── */}
      <header className="bg-prussian sticky top-0 z-50 shadow-md">
        <div className="max-w-[1200px] mx-auto px-5 py-2.5 flex items-center justify-between gap-4">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/logo.png"
              alt={config.orgName}
              className="h-9 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            {/* Fallback text logo if image fails */}
            <span className="hidden items-center gap-1">
              <span className="text-orange font-poppins font-bold text-lg leading-none">i-tech</span>
              <span className="text-dodger font-poppins text-xs font-semibold tracking-widest">ACADEMY</span>
            </span>
          </NavLink>

          {/* Search — desktop */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-sm hidden sm:flex relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none select-none">🔍</span>
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search prompts..."
              className="w-full pl-8 pr-10 py-2 text-sm bg-white/10 text-white placeholder:text-white/50 border border-white/20 rounded-lg outline-none focus:bg-white/15 focus:border-white/40 transition-all font-nunito"
            />
            {query && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60 font-nunito">
                {results.length}
              </span>
            )}
          </form>

          {/* Right */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="bg-orange text-white text-[11px] font-bold px-3 py-1 rounded-full font-poppins whitespace-nowrap hidden md:inline">
              Work Smarter with AI
            </span>
            <button
              className="sm:hidden text-white/80 hover:text-white text-xl leading-none"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Search — mobile */}
        <div className="sm:hidden px-4 pb-2.5">
          <form onSubmit={handleSearchSubmit} className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none select-none">🔍</span>
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search prompts..."
              className="w-full pl-8 pr-10 py-2 text-sm bg-white/10 text-white placeholder:text-white/50 border border-white/20 rounded-lg outline-none font-nunito"
            />
            {query && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60">
                {results.length}
              </span>
            )}
          </form>
        </div>

        {/* Mobile nav overlay (hamburger) */}
        {mobileMenuOpen ? (
          <div className="sm:hidden bg-prussian border-t border-white/10 pb-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-5 py-3 text-sm transition-all font-nunito ${
                    isActive ? 'text-orange font-semibold' : 'text-white/75 hover:text-white'
                  }`
                }
              >
                <span className="flex items-center">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ) : null}
      </header>

      {/* ── Banner — full width, home page only ─────────────────────── */}
      {isHome ? (
        <div className="max-w-[1200px] mx-auto pt-5">
          <img
            src="/banner.png"
            alt={config.orgName}
            className="w-full object-cover object-left max-h-[180px] block"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      ) : null}

      {/* ── /welcome — full-width, no sidebar ───────────────────────── */}
      {isWelcome ? (
        <main>{children}</main>
      ) : (
        <>
          {/* ── Body: sidebar + content ─────────────────────────────── */}
          <div className="max-w-[1200px] mx-auto px-5 py-5 flex gap-5 items-start pb-24 sm:pb-8">

            {/* Sidebar */}
            <aside className="w-[220px] min-w-[220px] bg-white rounded-xl border border-slate-200 py-3 sticky top-[72px] hidden sm:block flex-shrink-0">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  end={item.end}
                />
              ))}
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">

              {/* Search results panel */}
              {query ? (
                <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700 font-poppins">
                      {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
                    </span>
                    <button
                      onClick={() => setQuery('')}
                      className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      ✕ Clear
                    </button>
                  </div>
                  {results.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {results.map((r) => (
                        <Link
                          key={r.id}
                          to={`/${r.section}`}
                          onClick={() => {
                            setQuery('');
                            setTimeout(() => {
                              const el = document.getElementById(r.id);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 200);
                          }}
                          className="text-xs px-3 py-1 bg-blue-50 text-prussian rounded-full border border-blue-100 hover:bg-blue-100 transition-colors font-nunito"
                        >
                          {r.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 font-nunito">No prompts match your search.</p>
                  )}
                </div>
              ) : null}

              {children}
            </main>
          </div>

          {/* ── Mobile bottom tab bar ──────────────────────────────── */}
          <nav className="fixed bottom-0 left-0 right-0 bg-prussian border-t border-white/10 z-40 flex sm:hidden">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-0.5 px-2 py-2 text-[10px] flex-1 min-w-[48px] transition-all font-nunito ${
                    isActive ? 'text-orange font-bold' : 'text-white/60 hover:text-white/90'
                  }`
                }
              >
                <span className="text-lg leading-none">{item.icon}</span>
                <span className="whitespace-nowrap leading-tight">{item.label.split(' ')[0]}</span>
              </NavLink>
            ))}
          </nav>
        </>
      )}

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-prussian text-white/50 text-center text-xs py-4 px-5 mt-10 font-nunito">
        {config.footerText}
      </footer>
    </div>
  );
}
