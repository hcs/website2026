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
            <svg
              className="mobile-nav-link-arrow"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ))}
      </nav>
    </div>
  );
}
