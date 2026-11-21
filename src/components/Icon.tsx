type IconName = 'up-right' | 'right' | 'left' | 'down' | 'code' | 'mail' | 'github' | 'play' | 'pause' | 'film' | 'wave' | 'crop';

const paths: Record<IconName, React.ReactNode> = {
  'up-right': <><path d="M5 19 19 5M7 5h12v12" /></>,
  right: <path d="M4 12h15m-6-6 6 6-6 6" />,
  left: <path d="M20 12H5m6-6-6 6 6 6" />,
  down: <path d="M12 4v15m-6-6 6 6 6-6" />,
  code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-2-14-4 18" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  github: <path d="M8 20c-4 1-4-2-6-2m12 4v-4a3.5 3.5 0 0 0-1-2c3-.35 6-1.5 6-6a5 5 0 0 0-1.3-3.5A4.6 4.6 0 0 0 17.6 3s-1-.35-3.6 1.3a13 13 0 0 0-6 0C5.4 2.65 4.4 3 4.4 3a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 3 10c0 4.5 3 5.65 6 6a3.5 3.5 0 0 0-1 2v4" transform="translate(1)" />,
  play: <path d="m9 5 11 7-11 7z" />,
  pause: <path d="M9 5v14m6-14v14" />,
  film: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16m10-16v16M3 9h4m-4 6h4m10-6h4m-4 6h4" /></>,
  wave: <path d="M3 10v4m4-8v12m5-15v18m5-15v12m4-8v4" />,
  crop: <path d="M8 4H6a2 2 0 0 0-2 2v2m12-4h2a2 2 0 0 1 2 2v2M4 16v2a2 2 0 0 0 2 2h2m8 0h2a2 2 0 0 0 2-2v-2M9 12h6m-3-3v6" />,
};

export default function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
