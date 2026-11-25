interface LogoProps {
  onOpenProfile: () => void;
}

export default function Logo({ onOpenProfile }: LogoProps) {
  return (
    <button
      className="logo-mark"
      type="button"
      onClick={onOpenProfile}
      aria-label="Open Israel Ogunnaike's profile"
      aria-haspopup="dialog"
    >
      <span className="logo-badge">
        <img src="/images/israel-ogunnaike-portrait.jpg" alt="" />
      </span>
      <span className="logo-text">
        <span className="logo-main">CASRAEL</span>
        <span className="logo-sub">CREATIVE TECH</span>
      </span>
    </button>
  );
}
