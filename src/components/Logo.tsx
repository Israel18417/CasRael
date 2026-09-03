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
            <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6fd0ff" />
              <stop offset="100%" stopColor="#1d9dff" />
            </linearGradient>

            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <rect 
            x="8" y="8" width="48" height="48" rx="14" 
            fill="rgba(255, 255, 255, 0.03)" 
            stroke="url(#logoGradient)" 
            strokeWidth="1"
          />
          
          <path
            d="M22 24C22 24 24 20 32 20C40 20 42 24 42 24"
            stroke="url(#logoGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M24 32H36C40 32 42 34 42 38C42 42 40 44 36 44H24V20"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#logoGlow)"
          />
          <path
            d="M34 32L42 44"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="logo-text">
        <span className="logo-main">CASRAEL</span>
        <span className="logo-sub">CREATIVE TECH</span>
      </div>
    </div>
  );
}
