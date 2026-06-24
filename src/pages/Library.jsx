import { useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { config } from '../tenant.config';
import { libraryPrompts, COMING_SOON, ROLES_BY_DIVISION, TASKS_BY_DIVISION } from '../data/libraryPrompts';
import { LIBRARY_AGENT_ROLE_MAP } from '../data/agentPrompts';
import DivisionCard from '../components/DivisionCard';
import LibraryFilters from '../components/LibraryFilters';
import LibraryPromptCard from '../components/LibraryPromptCard';

const LIBRARY_FAV_KEY = 'itech-library-favorites';

// ─── localStorage helpers ─────────────────────────────────────────────────
function loadFavs() {
  try {
    return JSON.parse(localStorage.getItem(LIBRARY_FAV_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveFavs(arr) {
  try {
    localStorage.setItem(LIBRARY_FAV_KEY, JSON.stringify(arr));
  } catch {
    // silently ignore storage errors
  }
}

// ─── Agent cross-reference callout ───────────────────────────────────────
function AgentCallout({ division, role }) {
  const agentRole = role ? LIBRARY_AGENT_ROLE_MAP[role] : null;
  const label = agentRole
    ? `Want a full ${agentRole} agent?`
    : division
    ? `Want a pre-built ${division} agent?`
    : null;

  if (!label) return null;

  return (
    <Link
      to="/agents"
      className="flex items-center justify-between gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4 hover:bg-blue-100 transition-colors group"
    >
      <div className="flex items-center gap-2.5">
        <span className="text-base leading-none">🤖</span>
        <span className="text-xs font-semibold font-nunito text-prussian">
          {label}
        </span>
      </div>
      <span
        className="text-xs font-bold font-poppins flex-shrink-0 group-hover:underline"
        style={{ color: 'var(--color-accent)' }}
      >
        Build Your Agent →
      </span>
    </Link>
  );
}

// ─── Coming-soon placeholder card ────────────────────────────────────────
function ComingSoonCard({ role, division }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-5 flex flex-col gap-2 opacity-60">
      <div className="flex items-center gap-2">
        <span className="text-lg leading-none">🔒</span>
        <span className="text-[11px] font-bold font-poppins text-slate-400 tracking-wide uppercase">
          Coming Soon
        </span>
      </div>
      <p className="text-sm font-semibold font-poppins text-slate-500 leading-snug">{role}</p>
      <p className="text-xs font-nunito text-slate-400">{division} · Prompts in development</p>
    </div>
  );
}

// ─── Watermark overlay — defined at module level ──────────────────────────
function Watermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <span
        className="text-[120px] font-black font-poppins text-slate-900 whitespace-nowrap"
        style={{
          opacity: 0.03,
          transform: 'rotate(-25deg)',
          letterSpacing: '0.05em',
          userSelect: 'none',
        }}
      >
        UNDER CONSTRUCTION
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function Library() {
  const [activeDivision, setActiveDivision] = useState('');
  const [role, setRole]   = useState('');
  const [task, setTask]   = useState('');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState(() => loadFavs());
  const filterBarRef = useRef(null);

  // ── Division card counts ─────────────────────────────────────────────
  const countByDivision = useMemo(() => ({
    MSP:       libraryPrompts.filter((p) => p.division === 'MSP').length,
    ERP:       libraryPrompts.filter((p) => p.division === 'ERP').length,
    Corporate: libraryPrompts.filter((p) => p.division === 'Corporate').length,
  }), []);

  // ── Dynamic role / task options based on selected division ───────────
  const roleOptions = useMemo(() => {
    if (!activeDivision) {
      return [...new Set(libraryPrompts.map((p) => p.role))];
    }
    return ROLES_BY_DIVISION[activeDivision] || [];
  }, [activeDivision]);

  const taskOptions = useMemo(() => {
    if (!activeDivision) {
      return [...new Set(libraryPrompts.map((p) => p.task))];
    }
    return TASKS_BY_DIVISION[activeDivision] || [];
  }, [activeDivision]);

  // ── Filtered prompts ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return libraryPrompts.filter((p) => {
      if (activeDivision && p.division !== activeDivision) return false;
      if (role && p.role !== role) return false;
      if (task && p.task !== task) return false;
      if (q) {
        return (
          p.title.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          p.task.toLowerCase().includes(q) ||
          p.when.toLowerCase().includes(q) ||
          p.template.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeDivision, role, task, search]);

  // ── Coming-soon roles to display ─────────────────────────────────────
  const comingSoonList = useMemo(() => {
    if (!activeDivision) {
      return Object.entries(COMING_SOON).flatMap(([div, roles]) =>
        roles.map((r) => ({ role: r, division: div }))
      );
    }
    return (COMING_SOON[activeDivision] || []).map((r) => ({ role: r, division: activeDivision }));
  }, [activeDivision]);

  const hasActiveFilters = Boolean(activeDivision || role || task || search);

  // ── Handlers ─────────────────────────────────────────────────────────
  const handleDivisionClick = useCallback((div) => {
    setActiveDivision((prev) => (prev === div ? '' : div));
    setRole('');
    setTask('');
    // Scroll to filter bar
    setTimeout(() => {
      const el = document.getElementById('library-filter-bar');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  }, []);

  const handleClear = useCallback(() => {
    setActiveDivision('');
    setRole('');
    setTask('');
    setSearch('');
  }, []);

  const handleToggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveFavs(next);
      return next;
    });
  }, []);

  return (
    <div className="relative">
      <Watermark />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="relative z-10"
      >
        {/* ── Page header ──────────────────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold font-poppins text-prussian leading-tight">
                  Role Prompt Library
                </h1>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full font-poppins whitespace-nowrap"
                  style={{ background: 'var(--color-accent)', color: '#fff' }}
                >
                  UNDER CONSTRUCTION
                </span>
              </div>
              <p className="text-sm text-slate-500 font-nunito leading-relaxed max-w-xl">
                Role-specific AI prompt templates for MSP, ERP, and Corporate teams.
                Fill in the fields and copy your prompt — ready to use in ChatGPT, Claude, or any AI tool.
              </p>
            </div>
          </div>

          {/* Under-construction banner */}
          <div
            className="mt-4 flex items-start gap-3 rounded-lg px-4 py-3 border"
            style={{ background: '#fffbeb', borderColor: '#fde68a' }}
          >
            <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#92400e' }} />
            <p className="text-xs text-amber-800 leading-relaxed font-nunito">
              <span className="font-bold font-poppins">Under active development. </span>
              New prompts and roles are being added regularly. Coming-soon cards indicate roles currently
              in progress. Check back often — or use the filter to find what&rsquo;s available now.
            </p>
          </div>
        </div>

        {/* ── Division cards ────────────────────────────────────────── */}
        <div
          className="text-[10px] font-bold tracking-widest uppercase font-poppins mb-3 flex items-center gap-3"
          style={{ color: 'var(--color-accent)' }}
        >
          <span>Filter by Division</span>
          <div className="flex-1 h-px" style={{ background: 'var(--color-accent)', opacity: 0.25 }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {config.divisions.map((div) => (
            <DivisionCard
              key={div}
              division={div}
              count={countByDivision[div]}
              isActive={activeDivision === div}
              onClick={() => handleDivisionClick(div)}
            />
          ))}
        </div>

        {/* ── Filter bar ───────────────────────────────────────────── */}
        <div ref={filterBarRef} className="mb-5">
          <LibraryFilters
            division={activeDivision}
            onDivisionChange={setActiveDivision}
            role={role}
            onRoleChange={setRole}
            task={task}
            onTaskChange={setTask}
            search={search}
            onSearchChange={setSearch}
            roleOptions={roleOptions}
            taskOptions={taskOptions}
            resultCount={filtered.length}
            totalCount={libraryPrompts.length}
            onClear={handleClear}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* ── Agent cross-reference callout ────────────────────────── */}
        {(activeDivision || role) ? (
          <AgentCallout division={activeDivision} role={role} />
        ) : null}

        {/* ── Prompt grid ───────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-4 mb-6">
            {filtered.map((p) => (
              <LibraryPromptCard
                key={p.id}
                prompt={p}
                isFavorite={favorites.includes(p.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center mb-6">
            <p className="text-slate-400 font-nunito text-sm">No prompts match your filters.</p>
            <button
              onClick={handleClear}
              className="mt-3 text-xs font-semibold font-nunito text-dodger hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* ── Coming-soon section ──────────────────────────────────── */}
        {comingSoonList.length > 0 ? (
          <>
            <div
              className="text-[10px] font-bold tracking-widest uppercase font-poppins mb-3 flex items-center gap-3"
              style={{ color: 'var(--color-accent)' }}
            >
              <span>More Roles Coming Soon</span>
              <div className="flex-1 h-px" style={{ background: 'var(--color-accent)', opacity: 0.25 }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {comingSoonList.map((item) => (
                <ComingSoonCard key={`${item.division}-${item.role}`} role={item.role} division={item.division} />
              ))}
            </div>
          </>
        ) : null}
      </motion.div>
    </div>
  );
}
