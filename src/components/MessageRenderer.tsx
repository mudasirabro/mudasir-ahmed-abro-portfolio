import React from 'react';
import { CheckCircle2, Sparkles, ExternalLink, Award, Code2, ArrowRight } from 'lucide-react';

interface MessageRendererProps {
  content: string;
}

export const MessageRenderer: React.FC<MessageRendererProps> = ({ content }) => {
  // Split message into sections/paragraphs
  const lines = content.split('\n');

  const renderFormattedText = (text: string) => {
    // Replace **bold** with styled spans
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const inner = part.slice(2, -2);
        return (
          <strong key={index} className="font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
            {inner}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        const inner = part.slice(1, -1);
        return (
          <em key={index} className="italic text-purple-200">
            {inner}
          </em>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        const inner = part.slice(1, -1);
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 rounded bg-slate-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-[11px]"
          >
            {inner}
          </code>
        );
      }
      // Link markdown: [text](url)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 px-2 py-0.5 my-0.5 rounded-md bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-[11px] font-mono transition-all group"
          >
            <span>{linkText}</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-2 text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Horizontal divider ---
        if (trimmed === '---' || trimmed === '___') {
          return <hr key={idx} className="border-t border-purple-500/20 my-2" />;
        }

        // Heading 3: ###
        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.replace(/^###\s+/, '');
          return (
            <div key={idx} className="pt-2 pb-1 flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <h4 className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-200 to-emerald-300 font-mono">
                {headingText}
              </h4>
            </div>
          );
        }

        // Heading 2: ##
        if (trimmed.startsWith('## ')) {
          const headingText = trimmed.replace(/^##\s+/, '');
          return (
            <div key={idx} className="pt-2 pb-1 border-b border-purple-500/20">
              <h3 className="font-bold text-sm text-cyan-300 font-mono flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                {headingText}
              </h3>
            </div>
          );
        }

        // Bullet lists: *, -, •
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const bulletText = trimmed.replace(/^[\*\-•]\s+/, '');
          return (
            <div key={idx} className="flex items-start space-x-2 pl-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_6px_#06b6d4]" />
              <div className="flex-1 text-slate-300">{renderFormattedText(bulletText)}</div>
            </div>
          );
        }

        // Numbered lists: 1. 2. 3.
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          const [, num, itemText] = numMatch;
          return (
            <div key={idx} className="flex items-start space-x-2 pl-1 py-1 bg-slate-950/40 rounded-lg p-2 border border-slate-800/60 my-1">
              <span className="w-5 h-5 rounded-full bg-purple-900/60 border border-purple-500/40 text-cyan-300 text-[10px] font-mono flex items-center justify-center shrink-0 font-bold">
                {num}
              </span>
              <div className="flex-1 text-slate-200">{renderFormattedText(itemText)}</div>
            </div>
          );
        }

        // Normal paragraph
        return (
          <p key={idx} className="text-slate-200">
            {renderFormattedText(line)}
          </p>
        );
      })}
    </div>
  );
};
