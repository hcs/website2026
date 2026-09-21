import type { MemberLinkIcon } from '@/data/leadership-archive';

export function MemberIcon({
  name,
}: {
  name: MemberLinkIcon | 'bio' | 'email' | 'close';
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === 'bio' && (
        <>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="12" cy="8" r="2" />
          <path d="M8 14c0-3 8-3 8 0M8 17h8" />
        </>
      )}
      {name === 'email' && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </>
      )}
      {name === 'linkedin' && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 10v7M11 17v-7m0 3a3 3 0 0 1 6 0v4" />
          <circle cx="7" cy="7" r="0.7" fill="currentColor" stroke="none" />
        </>
      )}
      {name === 'github' && (
        <path d="M9 19c-4 1-4-2-6-2m12 5v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 7a4.3 4.3 0 0 0-.1-3.2S17.3 3.5 15 5a11 11 0 0 0-6 0C6.7 3.5 5.7 3.8 5.7 3.8A4.3 4.3 0 0 0 5.6 7a4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.8 5.7 5.5 6A3 3 0 0 0 9 18.6V22" />
      )}
      {name === 'instagram' && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.8"
            fill="currentColor"
            stroke="none"
          />
        </>
      )}
      {name === 'x' && <path d="m4 3 12 18h4L8 3H4Zm16 0L4 21" />}
      {name === 'website' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18" />
        </>
      )}
      {name === 'link' && (
        <path d="M10 13a5 5 0 0 0 7 .5l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
      )}
      {name === 'close' && <path d="m6 6 12 12M6 18 18 6" />}
    </svg>
  );
}
