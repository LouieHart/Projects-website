"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id={id} ref={ref} className={`relative py-24 md:py-32 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-[1120px] px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}
