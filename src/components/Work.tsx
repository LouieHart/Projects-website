"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MathWatermark from "./MathWatermark";
import ModelCard from "./ModelCard";
import AlgorithmViewer from "./AlgorithmViewer";

const models = [
  {
    title: "Mean-Variance Portfolio Optimisation Model",
    description:
      "Built on Markowitz's modern portfolio theory. Constructs the efficient frontier for up to six securities, identifies the tangent portfolio, and plots optimal risk-return allocations — including short-selling and risk-free lending constraints.",
    tags: ["Modern Portfolio Theory", "Efficient Frontier", "Mean-Variance", "Risk-Return Optimisation"],
    formulaAccent: "min σ²_p = wᵀΣw",
    downloadHref: "/assets/MV_Portfolio_Model_-_Louie_Hart.xlsx",
    downloadLabel: "MV_Portfolio_Model.xlsx",
  },
  {
    title: "Utility Theory & Security Selection Model",
    description:
      "Decision-theoretic framework for optimal security selection under risk aversion. Applies Power (CRRA) and Exponential (CARA) utility functions with tunable risk aversion parameters across discrete return scenarios.",
    tags: ["Utility Theory", "CRRA / CARA", "Decision Under Risk", "Risk Aversion"],
    formulaAccent: "E[U(W)] = Σ pᵢ · U(Wᵢ)",
    downloadHref: "/assets/Utility_Theory_Model_-_Louie_Hart.xlsx",
    downloadLabel: "Utility_Theory_Model.xlsx",
  },
  {
    title: "Sector Allocation & Financial Planning Model",
    description:
      "Time-horizon financial model applying mean-variance theory across market sectors. Includes variance analysis, correlation matrix, and three scenario profiles from conservative to aggressive allocation.",
    tags: ["Sector Allocation", "Financial Planning", "Time Horizon", "Variance Analysis"],
    formulaAccent: "wᵀΣw → min, s.t. wᵀ1 = 1",
    downloadHref: "/assets/Financial_Model1.xlsx",
    downloadLabel: "Financial_Model1.xlsx",
  },
];

export default function Work() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="work" className="relative py-28 md:py-40 overflow-hidden">
      <MathWatermark formula="E[U(W)] = Σ pᵢ·U(Wᵢ)" position="left" />

      <div className="mx-auto max-w-[1120px] px-6">
        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-10 h-[1px] bg-accent" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-navy-light">
            Models
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="font-display text-[38px] md:text-[52px] font-semibold text-navy leading-[1.05]"
        >
          The Work<span className="text-accent">.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.25 }}
          className="mt-4 font-body text-[15px] md:text-[16px] text-navy-mid leading-[1.7] max-w-[520px]"
        >
          Built from first principles — no black boxes. Each model is available
          to download in full, alongside the underlying quantitative logic.
        </motion.p>

        {/* Formula divider */}
        <div className="formula-divider my-12">
          <span>σ² = E[X²] − (E[X])²</span>
        </div>

        {/* Model cards — 2-col grid, 3rd card spans left */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {models.map((model, i) => (
            <ModelCard key={model.title} {...model} index={i} />
          ))}
        </div>

        <AlgorithmViewer />
      </div>
    </section>
  );
}
