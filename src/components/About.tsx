"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import MathWatermark from "./MathWatermark";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const { ref: titleRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      <MathWatermark formula="P(A|B) = P(B|A)·P(A) / P(B)" position="right" />

      <div className="mx-auto max-w-[1120px] px-6">
        {/* Section label */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="flex items-center gap-4 mb-14"
        >
          <div className="w-10 h-[1px] bg-accent" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-navy-light">
            Research
          </span>
        </motion.div>

        <div className="max-w-[720px]">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display text-[38px] md:text-[56px] font-semibold text-navy leading-[1.05]"
          >
            The Ethical
            <br />
            Actuary<span className="text-accent-warm">.</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.5 }}
            className="origin-left mt-5 w-16 signature-stripe"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 font-mono text-[10px] tracking-[0.15em] uppercase text-navy-light"
          >
            Independent Research Report &middot; 2026
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.5 }}
            className="mt-8 font-body text-[16px] md:text-[17px] text-navy leading-[1.8]"
          >
            This report explores the idea that ethical codes inherent to humans
            could be the modern actuary&apos;s best defence and differentiating
            factor against the coming AI wave — at a time when it feels vital
            to be thinking about how we can remain relevant and continue to add
            legitimate value in an AI-dominated corporate climate.
          </motion.p>
        </div>

        {/* Pull quote — offset right, parallax */}
        <motion.blockquote
          style={{ y: quoteY }}
          initial={{ opacity: 0, x: -15 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.7 }}
          className="relative mt-14 md:mt-16 md:ml-[15%] max-w-[560px] pl-6 border-l-[3px] border-accent-warm"
        >
          <p className="font-display italic text-[24px] md:text-[32px] text-accent-warm leading-[1.3]">
            &ldquo;Ethics is not merely a regulatory overlay within the realm of
            actuarial work — it is woven into the very fabric of daily
            practice.&rdquo;
          </p>
        </motion.blockquote>

        <motion.a
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.0 }}
          href="/assets/The_Ethical_Actuary_Research_Report.md"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 mt-12 font-mono text-[11px] tracking-[0.08em] uppercase text-accent hover:text-navy transition-colors duration-300"
        >
          <span className="w-5 h-[1px] bg-current group-hover:w-8 transition-all duration-300" />
          Read the full report
        </motion.a>

        {/* Formula divider */}
        <div className="formula-divider mt-24">
          <span>E[X] = Σ xᵢ · P(xᵢ)</span>
        </div>
      </div>
    </section>
  );
}
