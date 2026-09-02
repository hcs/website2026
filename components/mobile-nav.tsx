'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type NavItem = {
  href: string;
  label: string;
};

export function MobileNav({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return (
    <div className="mobile-nav">
      <button
        className="mobile-nav-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="sr-only">
          {isOpen ? 'Close navigation' : 'Open navigation'}
        </span>
        <span className="mobile-nav-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <nav
        className="mobile-nav-panel"
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!isOpen}
      >
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
