export default function Sparkle({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"
         className={`inline-block ${className}`}>
      {/* 8-kraka zvezdica (dve ukrštene “štapić” forme) */}
      <rect x="10.5" y="2"  width="3" height="20" rx="1.2" />
      <rect x="2"   y="10.5" width="20" height="3" rx="1.2" />
      <rect x="10.5" y="2"  width="3" height="20" rx="1.2" transform="rotate(45 12 12)" />
      <rect x="2"   y="10.5" width="20" height="3" rx="1.2" transform="rotate(45 12 12)" />
    </svg>
  );
}