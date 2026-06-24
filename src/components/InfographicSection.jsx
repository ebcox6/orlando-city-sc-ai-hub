import InfographicCard from './InfographicCard';

/**
 * Renders the "Reference Infographic" section below prompt cards.
 * Used on /synapse, /craft, /socratic, /anatomy, /templates.
 */
export default function InfographicSection({ src, title, description }) {
  return (
    <div className="mt-6">
      {/* Section header — small caps, orange underline */}
      <div className="flex items-center gap-3 mb-4">
        <p
          className="text-[10px] font-bold tracking-widest uppercase font-poppins"
          style={{ color: 'var(--color-accent)' }}
        >
          Reference Infographic
        </p>
        <div className="flex-1 h-px" style={{ background: 'var(--color-accent)', opacity: 0.25 }} />
      </div>

      <div className="max-w-sm">
        <InfographicCard src={src} title={title} description={description} />
      </div>
    </div>
  );
}
