import Image from 'next/image';
import Link from 'next/link';
import { MobileNav } from '@/components/mobile-nav';
import { SiteHeaderFrame } from '@/components/site-header-frame';
import {
  instagramUrl,
  mailingListUrl,
  presidentsEmail,
  slackUrl,
} from '@/data/links';

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

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="2.5"
        y="5"
        width="19"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m3.5 7 8.5 6 8.5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
    <SiteHeaderFrame>
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
            <Link
              className={item.href === '/contact' ? 'nav-cta' : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileNav items={navItems} />
      </div>
    </SiteHeaderFrame>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer" data-header-tone="dark">
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
              href={mailingListUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Join the HCS mailing list"
              title="Mailing list"
            >
              <MailIcon />
            </a>
            <a
              className="footer-social-link"
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="HCS on Instagram"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              className="footer-social-link"
              href={slackUrl}
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
        <a href={`mailto:${presidentsEmail}`}>{presidentsEmail}</a>
        <a href="#main-content">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
