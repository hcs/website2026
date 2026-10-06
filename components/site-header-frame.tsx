'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';

type HeaderTone = 'overlay' | 'dark' | 'light';

// Sections mark themselves with data-header-tone; the fixed header takes the
// tone of whichever section sits under its midline, and is light elsewhere.

export function SiteHeaderFrame({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement>(null);
  const [tone, setTone] = useState<HeaderTone>('overlay');
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const header = headerRef.current;
      if (!header) return;

      const probe = header.offsetHeight / 2;
      let next: HeaderTone = 'light';
      for (const section of document.querySelectorAll<HTMLElement>(
        '[data-header-tone]',
      )) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          next = section.dataset.headerTone as HeaderTone;
          break;
        }
      }
      setTone(next);
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [pathname]);

  return (
    <header className="site-header" data-tone={tone} ref={headerRef}>
      {children}
    </header>
  );
}
