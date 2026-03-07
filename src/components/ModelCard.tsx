"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ModelCardProps {
  title: string;
  description: string;
  tags: string[];
  formulaAccent: string;
  downloadHref: string;
  downloadLabel: string;
  index: number;
}

export default function ModelCard({
  title,
  description,
  tags,
  formulaAccent,
  downloadHref,
  downloadLabel,
  index,
}: ModelCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.15 }}
      whileHover={{ y: -5 }}
      className="group relative bg-cream-dark/40 border border-cream-border/50 rounded-lg overflow-hidden hover:border-navy/20 hover:shadow-2xl hover:shadow-navy/8 transition-all duration-400"
    >
      {/* Top stripe accent — different width per card */}
      <div
        className="h-[2px] signature-stripe"
        style={{ width: `${35 + index * 20}%` }}
      />

      {/* Grid paper background — faint */}
      <div className="absolute top-0 right-0 w-32 h-32 grid-paper opacity-15 pointer-events-none" />

      <div className="p-6 md:p-7">
        {/* Number + formula */}
        <div className="flex items-start justify-between mb-4">
          <span className="font-mono text-[10px] tracking-[0.15em] text-navy-light/40">
            MODEL {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[9px] tracking-wider text-cream-border">
            {formulaAccent}
          </span>
        </div>

        <h3 className="font-heading text-[19px] md:text-[21px] text-navy leading-snug pr-4">
          {title}
        </h3>

        <p className="mt-3 font-body text-[14px] text-navy-mid leading-[1.7]">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 border border-cream-border/50 rounded-sm font-mono text-[9px] tracking-[0.05em] text-navy-light"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-cream-border/30">
          <a
            href={downloadHref}
            download
            className="group/dl inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.1em] uppercase text-navy hover:text-accent transition-colors duration-300"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current group-hover/dl:bg-accent group-hover/dl:border-accent group-hover/dl:text-cream transition-all duration-300">
              &darr;
            </span>
            {downloadLabel}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
