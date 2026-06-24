import { useRef } from 'react';
import { X } from 'lucide-react';
import { config } from '../tenant.config';

// ─── Select wrapper — defined at module level (rerender-no-inline-components) ─
function FilterSelect({ label, value, onChange, options, disabled }) {
  return (
    <div className="flex flex-col gap-1 min-w-[140px]">
      <label className="text-[10px] font-bold tracking-widest uppercase font-poppins text-slate-400">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="text-xs font-nunito text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-orange transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ minWidth: 0 }}
      >
        <option value="">All {label}s</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

// ─── Search box — defined at module level ────────────────────────────────
function SearchBox({ value, onChange }) {
  const inputRef = useRef(null);
  return (
    <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
      <label className="text-[10px] font-bold tracking-widest uppercase font-poppins text-slate-400">
        Search
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search prompts..."
          className="w-full pl-8 pr-8 py-2 text-xs font-nunito text-slate-700 bg-white border border-slate-200 rounded-lg outline-none focus:border-orange transition-colors"
        />
        {value ? (
          <button
            onClick={() => { onChange(''); inputRef.current?.focus(); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={13} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

// ─── Result count chip ────────────────────────────────────────────────────
function ResultCount({ count, total }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold tracking-widest uppercase font-poppins text-slate-400">
        Results
      </label>
      <div className="flex items-center h-[34px]">
        <span
          className="text-xs font-semibold font-nunito px-3 py-1.5 rounded-lg"
          style={{ background: '#f0f4ff', color: 'var(--color-primary)' }}
        >
          {count} of {total}
        </span>
      </div>
    </div>
  );
}

// ─── Main filter bar ──────────────────────────────────────────────────────
export default function LibraryFilters({
  division,
  onDivisionChange,
  role,
  onRoleChange,
  task,
  onTaskChange,
  search,
  onSearchChange,
  roleOptions,
  taskOptions,
  resultCount,
  totalCount,
  onClear,
  hasActiveFilters,
}) {
  return (
    <div
      className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
      id="library-filter-bar"
    >
      <div className="flex flex-wrap gap-4 items-end">
        {/* Division */}
        <FilterSelect
          label="Division"
          value={division}
          onChange={(val) => { onDivisionChange(val); onRoleChange(''); onTaskChange(''); }}
          options={config.divisions}
        />

        {/* Role */}
        <FilterSelect
          label="Role"
          value={role}
          onChange={onRoleChange}
          options={roleOptions}
          disabled={roleOptions.length === 0}
        />

        {/* Task */}
        <FilterSelect
          label="Task"
          value={task}
          onChange={onTaskChange}
          options={taskOptions}
          disabled={taskOptions.length === 0}
        />

        {/* Search */}
        <SearchBox value={search} onChange={onSearchChange} />

        {/* Result count */}
        <ResultCount count={resultCount} total={totalCount} />

        {/* Clear button */}
        {hasActiveFilters ? (
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-widest uppercase font-poppins text-slate-400 invisible">
              Clear
            </label>
            <button
              onClick={onClear}
              className="flex items-center gap-1.5 text-xs font-semibold font-nunito px-3 py-2 rounded-lg border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 hover:text-slate-700 transition-colors"
            >
              <X size={12} />
              Clear filters
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
