export default function Logo() {
  return (
    <div className="logo-mark">
      <div className="logo-badge">
        <svg
          width="48"
          height="48"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="casraelGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6fd0ff" />
              <stop offset="100%" stopColor="#1d9dff" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="56" height="56" rx="18" fill="url(#casraelGradient)" />
          <path
            d="M20 20H32L40 26V30L32 36H24"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M30 20V44"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="square"
          />
          <path
            d="M30 20H40V28H30"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M30 32L42 48"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="square"
          />
        </svg>
      </div>
      <div className="logo-text">
        <span className="logo-main">CasRael</span>
        <span className="logo-sub">Creative Tech</span>
      </div>
    </div>
  );
}
