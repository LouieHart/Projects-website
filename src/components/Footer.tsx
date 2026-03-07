export default function Footer() {
  return (
    <footer className="py-8">
      {/* Full-width signature stripe */}
      <div className="signature-stripe mb-8" />
      <div className="mx-auto max-w-[1120px] px-6 flex items-center justify-between">
        <p className="font-mono text-[10px] tracking-[0.15em] text-navy-light/40">
          &copy; 2026 Louie Hart
        </p>
        <p className="font-mono text-[10px] tracking-[0.15em] text-navy-light/40 italic">
          Built with precision.
        </p>
      </div>
    </footer>
  );
}
