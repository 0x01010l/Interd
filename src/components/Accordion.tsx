import { useState, type ReactNode, type ReactElement } from 'react';
import { ChevronDown } from 'lucide-react';

type AccordionItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps): ReactElement {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bento-card !p-0 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-bold">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-brand-accent shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 text-white/60 leading-relaxed border-t border-brand-border pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }): ReactElement {
  return <div className="space-y-4">{children}</div>;
}
