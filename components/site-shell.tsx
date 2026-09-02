import Image from 'next/image';
import Link from 'next/link';
import { MobileNav } from '@/components/mobile-nav';

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/board', label: 'Board' },
  { href: '/initiatives', label: 'Initiatives' },
  { href: '/contact', label: 'Get involved' },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.7" r="1.15" fill="currentColor" />
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="8" y="1" width="4" height="9" rx="2" />
      <circle cx="5" cy="9" r="2" />
      <rect x="14" y="8" width="9" height="4" rx="2" />
      <circle cx="15" cy="5" r="2" />
      <rect x="12" y="14" width="4" height="9" rx="2" />
      <circle cx="19" cy="15" r="2" />
      <rect x="1" y="12" width="9" height="4" rx="2" />
      <circle cx="9" cy="19" r="2" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container-wide nav-shell">
        <Link
          className="brand"
          href="/"
          aria-label="Harvard Computer Society home"
        >
          <Image src="/logo.png" alt="" width={44} height={44} priority />
          <span>Harvard Computer Society</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileNav items={navItems} />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-wide footer-main">
        <Link
          className="footer-wordmark"
          href="/"
          aria-label="Harvard Computer Society home"
        >
          <Image src="/logo.png" alt="" width={52} height={52} />
          <span>Harvard Computer Society</span>
        </Link>

        <div className="footer-navigation">
          <nav className="footer-nav" aria-label="Footer navigation">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <nav className="footer-socials" aria-label="HCS social links">
            <a
              className="footer-social-link"
              href="https://www.instagram.com/harvard.computer.society/"
              target="_blank"
              rel="noreferrer"
              aria-label="HCS on Instagram"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              className="footer-social-link"
              href="https://join.slack.com/t/harvard-cs-society/shared_invite/zt-2cgtl5bpc-QCxXWwjaf1FulZhAfJSzkQ"
              target="_blank"
              rel="noreferrer"
              aria-label="Join the HCS Slack"
              title="Slack"
            >
              <SlackIcon />
            </a>
          </nav>
        </div>
      </div>

      <div className="container-wide footer-bottom">
        <p>© 2026 Harvard Computer Society</p>
        <a href="mailto:presidents@hcs.harvard.edu">
          presidents@hcs.harvard.edu
        </a>
        <a href="#main-content">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
