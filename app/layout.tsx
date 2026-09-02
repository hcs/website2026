import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#a51c30',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://hcs.harvard.edu'),
  title: {
    default: 'Harvard Computer Society',
    template: '%s | Harvard Computer Society',
  },
  description:
    'Harvard College’s student-run organization for computer science community, learning, and opportunity.',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png', sizes: '200x200' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Harvard Computer Society',
    title: 'Harvard Computer Society',
    description: 'Community, learning, and opportunity since 1983.',
    images: [
      {
        url: '/og.png',
        width: 1731,
        height: 909,
        alt: 'Harvard Computer Society — Community, learning, and opportunity since 1983.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harvard Computer Society',
    description: 'Community, learning, and opportunity since 1983.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
