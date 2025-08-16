interface HexIconProps {
  className?: string;
  inverted?: boolean;
}

export function HexIcon({ className = "w-6 h-6", inverted = false }: HexIconProps) {
  return (
    <svg 
      className={`${className} ${inverted ? 'text-white' : 'text-bee-gold'}`}
      viewBox="0 0 24 24" 
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.5 12.5L23 9.5v5l-5.5 3zm-11 0L1 9.5v5l5.5 3zm11-7L23 2.5v5l-5.5 3zm-11 0L1 2.5v5l5.5 3zm5.5 1.5L17.5 4v3L12 9.5 6.5 7V4l5.5 3zm0 7L17.5 17v3L12 22.5 6.5 20v-3l5.5-2.5z" />
    </svg>
  );
}
