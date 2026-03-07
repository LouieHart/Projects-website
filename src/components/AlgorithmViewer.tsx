"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as Tabs from "@radix-ui/react-tabs";

const algorithms = [
  { id: "mv", label: "MV Optimisation", file: "/assets/mv-portfolio-algorithm.ts" },
  { id: "utility", label: "Utility Theory", file: "/assets/utility-theory-algorithm.ts" },
  { id: "sector", label: "Sector Planning", file: "/assets/sector-financial-algorithm.ts" },
];

export default function AlgorithmViewer() {
  const [code, setCode] = useState<Record<string, string>>({});
  const [highlighted, setHighlighted] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("mv");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    algorithms.forEach(async (algo) => {
      const res = await fetch(algo.file);
      const text = await res.text();
      setCode((prev) => ({ ...prev, [algo.id]: text }));

      try {
        const { codeToHtml } = await import("shiki");
        const html = await codeToHtml(text, {
          lang: "typescript",
          theme: "github-dark",
        });
        setHighlighted((prev) => ({ ...prev, [algo.id]: html }));
      } catch {
        // fallback
      }
    });
  }, []);

  const handleCopy = () => {
    const current = code[activeTab];
    if (current) {
      navigator.clipboard.writeText(current);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" as const }}
      className="mt-20"
    >
      {/* Section intro */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-8 h-[1px] bg-accent" />
        <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy-light">
          Under the Hood
        </h3>
      </div>

      {/* Terminal-style code viewer */}
      <div className="rounded-xl overflow-hidden border border-navy/10 shadow-2xl shadow-navy/10">
        {/* Window chrome */}
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <div className="bg-code-bg flex items-center px-4 pt-3 pb-0">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 mr-6">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
            </div>

            <Tabs.List className="flex gap-0">
              {algorithms.map((algo) => (
                <Tabs.Trigger
                  key={algo.id}
                  value={algo.id}
                  className="relative px-4 py-2 font-mono text-[12px] text-code-text/40 transition-colors duration-200 data-[state=active]:text-code-text data-[state=active]:bg-[#162240] rounded-t-lg"
                >
                  {algo.label}
                  <span className="ml-2 text-[10px] text-code-text/20">.ts</span>
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <div className="ml-auto flex items-center gap-4">
              <span className="font-mono text-[10px] text-accent/60 tracking-wider">
                TypeScript
              </span>
              <button
                onClick={handleCopy}
                className="font-mono text-[11px] text-code-text/30 hover:text-code-text/80 transition-colors duration-200 px-2 py-1 rounded hover:bg-white/5"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {algorithms.map((algo) => (
            <Tabs.Content key={algo.id} value={algo.id} className="focus:outline-none">
              <div
                className="bg-[#162240] p-6 overflow-auto max-h-[480px] [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:text-[13px] [&_code]:leading-[1.75] [&_code]:font-mono [&_.line]:px-0"
                dangerouslySetInnerHTML={{
                  __html:
                    highlighted[algo.id] ||
                    `<pre class="text-code-text font-mono text-[13px] leading-[1.75]"><code>${escapeHtml(
                      code[algo.id] || ""
                    )}</code></pre>`,
                }}
              />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </motion.div>
  );
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
