"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Signature stripe at very top — the hidden lining */}
      <div className="fixed top-0 left-0 right-0 z-[60] signature-stripe" />

      <nav
        className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1120px] px-6 flex items-center justify-between h-14">
          <a
            href="#hero"
            className="font-display text-[24px] font-semibold text-navy tracking-tight hover:text-accent transition-colors duration-300"
          >
            LH
          </a>
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-mono text-[11px] tracking-[0.14em] uppercase text-navy-light hover:text-navy transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-400 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
