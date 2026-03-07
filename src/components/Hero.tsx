"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FLOATING_FORMULAS = [
  { text: "Σ wᵢ μᵢ", x: "5%", y: "22%", size: "text-[13px]", delay: 0 },
  { text: "σ²", x: "78%", y: "16%", size: "text-[15px]", delay: 0.6 },
  { text: "P(A|B)", x: "90%", y: "58%", size: "text-[14px]", delay: 1.4 },
  { text: "∫₀^∞", x: "3%", y: "70%", size: "text-[16px]", delay: 0.9 },
  { text: "e^{-λt}", x: "72%", y: "80%", size: "text-[12px]", delay: 1.8 },
];

export default function Hero() {
  const hasCv = false;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Floating math — very faint, sharp */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {FLOATING_FORMULAS.map((f, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 3, delay: f.delay }}
            className={`absolute font-mono ${f.size} text-navy ${i % 2 === 0 ? "float-slow" : "float-slower"}`}
            style={{ left: f.x, top: f.y }}
          >
            {f.text}
          </motion.span>
        ))}
      </div>

      <div className="mx-auto max-w-[1120px] px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 md:gap-20 items-center">
          <div>
            {/* Label */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-navy-light mb-10"
            >
              Louie Hart &mdash; Actuarial Science &mdash; Melbourne 2026
            </motion.span>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="font-display text-[56px] sm:text-[72px] md:text-[84px] lg:text-[104px] font-semibold text-navy leading-[0.92] tracking-[-0.03em]"
            >
              Turning
              <br />
              Risk Into
              <br />
              Clarity<span className="text-accent">.</span>
            </motion.h1>

            {/* Stripe */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.8 }}
              className="origin-left mt-8 w-20 signature-stripe"
            />

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.7 }}
              className="mt-7 font-body text-[16px] md:text-[17px] text-navy-mid leading-[1.75] max-w-[460px]"
            >
              Making confident decisions under uncertainty — turning incomplete
              information into defensible, quantified positions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.9 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              {hasCv ? (
                <a
                  href="/assets/louie-hart-cv.pdf"
                  download
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-navy text-cream font-mono text-[11px] tracking-[0.08em] uppercase rounded-md hover:bg-accent transition-colors duration-300"
                >
                  <span className="group-hover:-translate-y-0.5 transition-transform duration-200">&darr;</span>
                  Download CV
                </a>
              ) : (
                <span
                  title="CV coming soon"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-navy/25 text-cream/50 font-mono text-[11px] tracking-[0.08em] uppercase rounded-md cursor-not-allowed"
                >
                  &darr; CV Coming Soon
                </span>
              )}
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-5 py-2.5 border border-navy/20 text-navy font-mono text-[11px] tracking-[0.08em] uppercase rounded-md hover:border-navy hover:bg-navy hover:text-cream transition-all duration-300"
              >
                View Models
                <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
              </a>
            </motion.div>
          </div>

          {/* Photo — single instance, clean and sharp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-2xl shadow-navy/15">
                <Image
                  src="/assets/louie-headshot.jpg"
                  alt="Louie Hart"
                  fill
                  className="object-cover"
                  sizes="320px"
                  priority
                  quality={95}
                />
              </div>
              {/* Thin accent border offset */}
              <div className="absolute -bottom-2.5 -right-2.5 w-full h-full rounded-lg border border-accent/20 -z-10" />
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-cream-border">
                University of Melbourne
              </span>
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-cream-border">
                2026
              </span>
            </div>
          </motion.div>

          {/* Mobile photo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:hidden"
          >
            <div className="relative w-[240px] mx-auto aspect-[3/4] rounded-lg overflow-hidden shadow-xl shadow-navy/10">
              <Image
                src="/assets/louie-headshot.jpg"
                alt="Louie Hart"
                fill
                className="object-cover"
                sizes="240px"
                priority
                quality={95}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 md:mt-24"
        >
          <div className="flex items-center gap-3 text-cream-border">
            <div className="w-[1px] h-6 bg-current" />
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase">
              Scroll
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
