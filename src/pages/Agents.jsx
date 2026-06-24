import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import FillablePrompt from '../components/FillablePrompt';
import PromptActionButtons from '../components/PromptActionButtons';
import PlatformGuideCard from '../components/PlatformGuideCard';
import AgentCard from '../components/AgentCard';
import AccordionSection from '../components/AccordionSection';
import AgentTestSection from '../components/AgentTestSection';
import { UNIVERSAL_STARTER, PLATFORM_GUIDES, agentPrompts } from '../data/agentPrompts';

// ─── Section header — orange small-caps with line rule ────────────────────
function SectionHeader({ label }) {
  return (
    <div
      className="text-[10px] font-bold tracking-widest uppercase font-poppins mb-3 flex items-center gap-3"
      style={{ color: 'var(--color-accent)' }}
    >
      <span>{label}</span>
      <div className="flex-1 h-px" style={{ background: 'var(--color-accent)', opacity: 0.25 }} />
    </div>
  );
}

// ─── Render Universal Starter template with inline FillablePrompt fields ──
function renderStarter(template, fields, values, onChange) {
  const allKeys = fields.map((f) => f.key);
  const regex = new RegExp(`(\\{(?:${allKeys.join('|')})\\})`, 'g');
  const tokens = template.split(regex);

  return (
    <>
      {tokens.map((token, i) => {
        const match = token.match(/^\{(\w+)\}$/);
        if (match) {
          const field = fields.find((f) => f.key === match[1]);
          if (field) {
            return (
              <FillablePrompt
                key={`${field.key}-${i}`}
                field={{ id: field.key, placeholder: field.placeholder }}
                value={values[field.key] || ''}
                onChange={onChange}
              />
            );
          }
        }
        return token.split('\n').map((line, li, arr) => (
          <span key={`t-${i}-${li}`}>
            {line}
            {li < arr.length - 1 ? <br /> : null}
          </span>
        ));
      })}
    </>
  );
}

// ─── Universal Starter card — defined at module level ─────────────────────
function StarterCard() {
  const [values, setValues] = useState({});

  const handleChange = useCallback((id, val) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  }, []);

  const getText = useCallback(() => {
    let text = UNIVERSAL_STARTER.template;
    UNIVERSAL_STARTER.fields.forEach((f) => {
      const val = values[f.key] || `[${f.placeholder}]`;
      text = text.replace(new RegExp(`\\{${f.key}\\}`, 'g'), val);
    });
    return text;
  }, [values]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5">
      <p className="text-sm text-slate-600 font-nunito leading-relaxed mb-4">
        Four fields. Any platform. Built in 10 minutes.{' '}
        <span className="font-semibold text-slate-700">Fill in the brackets below</span>,
        copy the completed prompt, and paste it into your AI platform of choice to create your custom agent.
      </p>

      {/* Prompt block */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-[13px] leading-loose text-slate-800 font-nunito mb-4">
        {renderStarter(UNIVERSAL_STARTER.template, UNIVERSAL_STARTER.fields, values, handleChange)}
      </div>

      {/* Action buttons */}
      <PromptActionButtons getText={getText} />
    </div>
  );
}

// ─── "How to install" platform guide grid ────────────────────────────────
function PlatformGuideGrid() {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold text-slate-500 font-nunito mb-3 uppercase tracking-wide">
        How to install this on each platform
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PLATFORM_GUIDES.map((guide) => (
          <PlatformGuideCard key={guide.key} config={guide} />
        ))}
      </div>
    </div>
  );
}

// ─── Going Further accordion content — plain text blocks ─────────────────
function FilesContent() {
  return (
    <div className="text-sm text-slate-600 font-nunito leading-relaxed space-y-3">
      <p>
        Upload SOPs, client documentation, or reference guides directly into your agent.
        Claude Projects and Custom GPTs both support file uploads. Your agent can then
        reference real documents when generating responses — not just its training data.
      </p>
      <p className="text-xs font-semibold text-slate-500 font-poppins">
        Best for: Client environment docs, SOP libraries, product sheets, pricing guides.
      </p>
    </div>
  );
}

function MemoryContent() {
  return (
    <div className="text-sm text-slate-600 font-nunito leading-relaxed space-y-3">
      <p>
        Tell your agent what to remember across sessions by adding a memory section to your system prompt:
      </p>
      <div className="bg-slate-900 rounded-lg px-4 py-3">
        <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
{`MEMORY: After each conversation, summarize the key
decisions made, action items created, and any client
context I shared. Start each new session by asking
if I want to pick up where we left off.`}
        </pre>
      </div>
      <p className="text-xs font-semibold text-slate-500 font-poppins">
        Best for: Ongoing client relationships, active projects, recurring weekly tasks.
      </p>
    </div>
  );
}

function TeamContent() {
  return (
    <div className="text-sm text-slate-600 font-nunito leading-relaxed space-y-3">
      <p>
        Share your agent with your team so everyone starts from the same baseline.
        In ChatGPT, set sharing to &ldquo;Anyone with a link&rdquo; or publish to your workspace.
        In Claude, share the Project with team members.
        In Copilot, publish the agent to your Teams channel.
      </p>
      <p className="text-xs font-semibold text-slate-500 font-poppins">
        Best for: Service Desk teams, project pods, department-wide consistency.
      </p>
    </div>
  );
}

function TestContent() {
  return (
    <div className="text-sm text-slate-600 font-nunito leading-relaxed space-y-3">
      <p>
        Before using your agent on real client work, run it through three test prompts:
      </p>
      <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-600 font-nunito ml-1">
        <li>A routine task (ticket response, status update)</li>
        <li>An edge case (unusual request, missing context)</li>
        <li>
          The Self-Check:{' '}
          <span className="italic text-slate-500">
            &ldquo;Review your last response. What did you assume? What&rsquo;s missing?&rdquo;
          </span>
        </li>
      </ol>
      <p>
        If it fails any of these, refine your system prompt and test again. A well-tested agent
        saves more time than a fast one.
      </p>
    </div>
  );
}

// ─── MSP and ERP agent lists — stable arrays defined outside component ────
const MSP_AGENTS = agentPrompts.filter((p) => p.division === 'MSP');
const ERP_AGENTS = agentPrompts.filter((p) => p.division === 'ERP');

// ─── Main page ────────────────────────────────────────────────────────────
export default function Agents() {
  // Only one accordion open at a time — null means all closed
  const [openAgentId, setOpenAgentId] = useState(null);
  // Selected agent in the Test Your Agent section
  const [selectedTestAgent, setSelectedTestAgent] = useState(null);
  // Ref for scrolling to the Test Your Agent section
  const testSectionRef = useRef(null);

  const handleToggle = useCallback((id) => {
    setOpenAgentId((prev) => (prev === id ? null : id));
  }, []);

  const handleSelectTestAgent = useCallback((id) => {
    setSelectedTestAgent((prev) => (prev === id ? null : id));
  }, []);

  // Called from AgentCard "Go to Agent Test ↓" link
  const handleGoToTest = useCallback((agentId) => {
    setSelectedTestAgent(agentId);
    setTimeout(() => {
      testSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold font-poppins text-prussian leading-tight">
            Build Your Agent
          </h1>
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full font-poppins"
            style={{ background: 'var(--color-accent)', color: '#fff', lineHeight: 1.5 }}
          >
            NEW
          </span>
        </div>
        <p className="text-sm text-slate-500 font-nunito leading-relaxed max-w-xl">
          Stop starting from scratch. Build a role-specific AI assistant that knows
          your context before you type a word.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          LAYER 1 — Universal Starter
      ════════════════════════════════════════════════════════════════ */}
      <SectionHeader label="Universal Starter Prompt" />
      <StarterCard />
      <PlatformGuideGrid />

      {/* ════════════════════════════════════════════════════════════════
          LAYER 2 — Role Starter Pack
      ════════════════════════════════════════════════════════════════ */}
      <SectionHeader label="Role Starter Pack" />
      <p className="text-sm text-slate-500 font-nunito leading-relaxed mb-4">
        Six pre-built agents for i-Tech roles. Each is ready to copy and install.
        Customize the brackets to make it yours.
      </p>

      {/* MSP agents */}
      <div
        className="text-[10px] font-bold tracking-widest uppercase font-poppins mb-2 flex items-center gap-2"
        style={{ color: '#1e40af' }}
      >
        <span
          className="px-2 py-0.5 rounded font-nunito"
          style={{ background: '#dbeafe', color: '#1e40af', fontSize: '10px' }}
        >
          MSP
        </span>
        <span>Managed Service Provider</span>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        {MSP_AGENTS.map((p) => (
          <AgentCard
            key={p.id}
            prompt={p}
            isOpen={openAgentId === p.id}
            onToggle={() => handleToggle(p.id)}
            onGoToTest={handleGoToTest}
          />
        ))}
      </div>

      {/* ERP agents */}
      <div
        className="text-[10px] font-bold tracking-widest uppercase font-poppins mb-2 flex items-center gap-2"
        style={{ color: '#92400e' }}
      >
        <span
          className="px-2 py-0.5 rounded font-nunito"
          style={{ background: '#fef3c7', color: '#92400e', fontSize: '10px' }}
        >
          ERP
        </span>
        <span>Enterprise Resource Planning</span>
      </div>
      <div className="flex flex-col gap-3 mb-8">
        {ERP_AGENTS.map((p) => (
          <AgentCard
            key={p.id}
            prompt={p}
            isOpen={openAgentId === p.id}
            onToggle={() => handleToggle(p.id)}
            onGoToTest={handleGoToTest}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          LAYER 2.5 — Test Your Agent
      ════════════════════════════════════════════════════════════════ */}
      <div className="mb-8" style={{ scrollMarginTop: '80px' }}>
        <AgentTestSection
          sectionRef={testSectionRef}
          selectedAgentId={selectedTestAgent}
          onSelectAgent={handleSelectTestAgent}
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          LAYER 3 — Going Further
      ════════════════════════════════════════════════════════════════ */}
      <SectionHeader label="Going Further" />
      <p className="text-sm text-slate-500 font-nunito leading-relaxed mb-4">
        Once your basic agent is working, these additions make it significantly more powerful.
      </p>

      <AccordionSection title="Add Files and Documents">
        <FilesContent />
      </AccordionSection>
      <AccordionSection title="Add a Memory Prompt">
        <MemoryContent />
      </AccordionSection>
      <AccordionSection title="Build a Team Agent">
        <TeamContent />
      </AccordionSection>
      <AccordionSection title="Test Before You Trust">
        <TestContent />
      </AccordionSection>
    </motion.div>
  );
}
