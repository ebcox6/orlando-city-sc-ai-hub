import { NavLink } from 'react-router-dom';

export default function NavItem({ to, icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-4 py-2.5 text-[13px] border-l-[3px] transition-all w-full font-nunito ${
          isActive
            ? 'bg-blue-50 text-prussian font-semibold'
            : 'text-slate-500 border-l-transparent hover:bg-slate-50 hover:text-slate-800'
        }`
      }
      style={({ isActive }) =>
        isActive ? { borderLeftColor: 'var(--color-accent)' } : {}
      }
    >
      {/* icon can be a string (emoji) or a JSX element (lucide icon) */}
      <span className="w-5 flex-shrink-0 flex items-center justify-center text-[15px] leading-none">
        {icon}
      </span>
      <span>{label}</span>
    </NavLink>
  );
}
