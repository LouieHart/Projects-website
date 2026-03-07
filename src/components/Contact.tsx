"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MathWatermark from "./MathWatermark";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="contact" className="relative py-32 md:py-44 overflow-hidden">
      <MathWatermark formula="Var(X) = E[X²] − (E[X])²" position="center" />

      <div ref={ref} className="mx-auto max-w-[1120px] px-6">
        {/* Formula divider */}
        <div className="formula-divider mb-20">
          <span>∀ε &gt; 0, ∃δ &gt; 0</span>
        </div>

        <div className="max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-10 h-[1px] bg-accent" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-navy-light">
              Contact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="font-display text-[34px] sm:text-[42px] md:text-[52px] font-semibold text-navy leading-[1.1]"
          >
            Let&apos;s work on
            <br />
            something that
            <br />
            matters<span className="text-accent">.</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.6 }}
            className="origin-left mt-6 w-20 signature-stripe"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.4 }}
            className="mt-8 font-body text-[15px] md:text-[16px] text-navy-light leading-relaxed"
          >
            Open to graduate roles, actuarial internships, and quantitative
            conversations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.6 }}
            className="mt-10"
          >
            <a
              href="mailto:louiehart01@icloud.com"
              className="group relative inline-flex items-center gap-3 font-sans text-[18px] md:text-[22px] font-medium text-navy transition-colors duration-300 hover:text-accent"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-navy/15 group-hover:border-accent group-hover:bg-accent group-hover:text-cream transition-all duration-300 text-[13px]">
                &rarr;
              </span>
              louiehart01@icloud.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-navy-light/40 hover:text-navy transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform duration-200">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
