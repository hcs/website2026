import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { HeroGlyphs } from '@/components/hero-glyphs';
import { ExternalArrow } from '@/components/page-elements';
import { ThesisStack } from '@/components/thesis-stack';
import { mailingListUrl, presidentsEmail, slackUrl } from '@/data/links';

const photoLetters = [
  {
    letter: 'H',
    photos: [
      '/hero-letters/contact.webp',
      '/hero-letters/about.webp',
      '/hero-letters/event-4.webp',
    ],
  },
  {
    letter: 'C',
    photos: [
      '/hero-letters/board.webp',
      '/hero-letters/event-2.webp',
      '/hero-letters/initiatives.webp',
    ],
  },
  {
    letter: 'S',
    photos: [
      '/hero-letters/event-3.webp',
      '/hero-letters/event-5.webp',
      '/hero-letters/academics.webp',
    ],
  },
];

const sponsorDiscs = [
  { src: '/sponsors/discs/janestreet.png', name: 'Jane Street' },
  { src: '/sponsors/discs/hrt.png', name: 'Hudson River Trading' },
  { src: '/sponsors/discs/citadel.png', name: 'Citadel' },
  { src: '/sponsors/discs/deshaw.png', name: 'D. E. Shaw' },
  { src: '/sponsors/discs/axiom.png', name: 'Axiom' },
];

const groupDiscs = [
  {
    src: '/initiatives/discs/ai.png',
    name: 'Society for Artificial Intelligence',
  },
  { src: '/initiatives/discs/t4sg.png', name: 'Tech for Social Good' },
  { src: '/initiatives/discs/product-lab.png', name: 'Product Lab' },
  {
    src: '/initiatives/discs/tghi.png',
    name: 'Tech and Global Health Initiative',
  },
  { src: '/initiatives/discs/startups.png', name: 'startups @ harvard' },
  { src: '/initiatives/discs/hc3.png', name: 'Harvard Computing Contest Club' },
];

const eventPhotos = [
  {
    id: 'A016',
    src: '/events/a016.webp',
    alt: 'Students speaking with panelists at the HCS research panel',
    eyebrow: 'Research',
    title: 'Research Panel',
    description:
      'Students and researchers share their paths into computer science research.',
  },
  {
    id: 'A006',
    src: '/events/a006.webp',
    alt: 'HCS members gathering for a taco social',
    eyebrow: 'Community',
    title: 'Taco Social',
    description: 'HCS members gather for food and conversation.',
  },
  {
    id: 'A017',
    src: '/events/a017.webp',
    alt: 'A speaker leading an HCS workshop on knowledge base chunking',
    eyebrow: 'Technical workshop',
    title: 'Building Knowledge Bases',
    description:
      'A hands-on session on retrieval, chunking, and useful knowledge systems.',
  },
  {
    id: 'A014',
    src: '/events/a014.webp',
    alt: 'Students building with wooden blocks around a table',
    eyebrow: 'Community',
    title: 'Building Together',
    description: 'HCS members gather around a tabletop building game.',
  },
  {
    id: 'A010',
    src: '/events/a010.webp',
    alt: 'Students posing in front of an OCaml Bee presentation',
    eyebrow: 'Programming',
    title: 'OCaml Bee',
    description: 'Students pose together at the HCS OCaml Bee.',
  },
  {
    id: 'A018',
    src: '/events/a018.webp',
    alt: 'A Robust Intelligence speaker presenting on securing AI systems',
    eyebrow: 'Industry talk',
    title: 'Securing the AI Transformation',
    description:
      'A conversation with Robust Intelligence about building safer AI systems.',
  },
  {
    id: 'A007',
    src: '/events/a007.webp',
    alt: 'Students gathered at an HCS CS51 study break',
    eyebrow: 'Study break',
    title: 'CS51 Study Break',
    description: 'Students take a break from CS51 with the HCS community.',
  },
  {
    id: 'A020',
    src: '/events/a020.webp',
    alt: 'An HCS speaker introducing product management recruiting',
    eyebrow: 'Career workshop',
    title: 'Intro to PM Recruiting',
    description: 'Practical recruiting advice from HCS, WiCS, and Product Lab.',
  },
  {
    id: 'A005',
    src: '/events/a005.webp',
    alt: 'Students gathered in a classroom for an HCS event',
    eyebrow: 'Community',
    title: 'HCS Gathering',
    description: 'Students meet in a classroom for an HCS community event.',
  },
  {
    id: 'A022',
    src: '/events/a022.webp',
    alt: 'OCaml Bee participants gathered for a group photo',
    eyebrow: 'Programming',
    title: 'OCaml Bee Group Photo',
    description: 'Participants gather in front of the OCaml Bee presentation.',
  },
  {
    id: 'A015',
    src: '/events/a015.webp',
    alt: 'HCS members enjoying food together at a gathering',
    eyebrow: 'Community',
    title: 'Sharing a Meal',
    description: 'Members enjoy food and conversation at an HCS gathering.',
  },
  {
    id: 'A019',
    src: '/events/a019.webp',
    alt: 'Students and speakers talking after the HCS research panel',
    eyebrow: 'Community',
    title: 'Research Panel Social',
    description:
      'Students continue the conversation with speakers after the panel.',
  },
];

function EventPhoto({
  photo,
  duplicate = false,
}: {
  photo: (typeof eventPhotos)[number];
  duplicate?: boolean;
}) {
  return (
    <figure className="photo-tile" tabIndex={duplicate ? -1 : 0}>
      <Image
        src={photo.src}
        alt={duplicate ? '' : photo.alt}
        fill
        sizes="(max-width: 760px) 82vw, 390px"
        className="cover-image"
      />
      <figcaption className="event-caption">
        <p>{photo.eyebrow}</p>
        <h3>{photo.title}</h3>
        <span>{photo.description}</span>
      </figcaption>
    </figure>
  );
}

// Single-color logo masks shown in gray, revealing `color` on hover;
// `displayHeight` balances each mark's visual weight.
const sponsors = [
  {
    name: 'Jane Street',
    color: '#0b419e',
    href: 'https://www.janestreet.com/',
    image: '/sponsors/janestreet-mono.png',
    width: 748,
    height: 200,
    displayHeight: 46,
  },
  {
    name: 'Hudson River Trading',
    color: '#ff8200',
    href: 'https://www.hudsonrivertrading.com/',
    image: '/sponsors/hrt-mono.png',
    width: 338,
    height: 200,
    displayHeight: 40,
  },
  {
    name: 'Citadel',
    color: '#1b3769',
    href: 'https://www.citadel.com/',
    image: '/sponsors/citadel-mono.png',
    width: 1438,
    height: 178,
    displayHeight: 26,
  },
  {
    name: 'D. E. Shaw',
    color: '#231f20',
    href: 'https://www.deshaw.com/',
    image: '/sponsors/deshaw-mono.png',
    width: 883,
    height: 200,
    displayHeight: 38,
  },
  {
    name: 'Axiom',
    color: '#000000',
    href: 'https://www.axiom.xyz/',
    image: '/sponsors/axiom-mono.png',
    width: 1100,
    height: 200,
    displayHeight: 24,
  },
];

// Past HCS speakers, including guests at the 2005 Startup School.
const speakers = [
  { name: 'Steve Ballmer', detail: 'Microsoft · 1993' },
  { name: 'Larry Ellison', detail: 'Oracle · 1997' },
  { name: 'Paul Graham', detail: 'How to Start a Startup · 2005' },
  { name: 'Steve Wozniak', detail: 'Apple · Startup School 2005' },
  { name: 'Stephen Wolfram', detail: 'Wolfram Research · Startup School 2005' },
];

// Quoted verbatim from the linked essays.
const quotes = [
  {
    text: 'YC grew out of a talk I gave to the Harvard Computer Society (the undergrad computer club) about how to start a startup.',
    name: 'Paul Graham',
    initials: 'PG',
    role: 'Co-founder, Y Combinator',
    source: 'The Reddits',
    href: 'https://paulgraham.com/reddits.html',
  },
  {
    text: 'We partnered with the Harvard Computer Society and on a rainy, muddy Saturday, a great group of speakers (including Steve Wozniak!) came together with hundreds of bright-eyed attendees at Harvard University.',
    name: 'Jessica Livingston',
    initials: 'JL',
    role: 'Co-founder, Y Combinator',
    source: 'Why I Love Startup School',
    href: 'https://foundersatwork.posthaven.com/why-i-love-startup-school',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero hero-home" data-header-tone="overlay">
        <svg
          className="photo-letter-filters"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter
              id="photo-letter-glass"
              x="-10%"
              y="-10%"
              width="120%"
              height="120%"
              colorInterpolationFilters="sRGB"
            >
              {/* Extend each photo's edge colors into a softly lit glass rim. */}
              <feMorphology in="SourceGraphic" operator="dilate" radius="4" />
              <feGaussianBlur stdDeviation="0.6" />
              <feComponentTransfer>
                <feFuncR type="linear" slope="0.8" intercept="0.24" />
                <feFuncG type="linear" slope="0.8" intercept="0.24" />
                <feFuncB type="linear" slope="0.8" intercept="0.24" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        <HeroGlyphs />
        <div className="photo-monogram" aria-hidden="true">
          {photoLetters.map((frame, index) => (
            <div
              className={`photo-letter-frame photo-letter-${frame.letter.toLowerCase()}`}
              style={{ '--letter-index': index } as CSSProperties}
              data-letter={frame.letter}
              key={frame.letter}
            >
              {frame.photos.map((photo, photoIndex) => (
                <span
                  className="photo-letter-layer"
                  style={
                    {
                      '--photo-delay': `${-(frame.photos.length - photoIndex) * 7 - index * 2.3}s`,
                      backgroundImage: `url('${photo}')`,
                    } as CSSProperties
                  }
                  key={photo}
                >
                  {frame.letter}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="hero-copy container-wide">
          <h1>Harvard Computer Society</h1>
          <p className="hero-kicker">
            The original student-run organization for undergraduates in computer
            science at Harvard College
          </p>
          <a
            className="button button-light"
            href={mailingListUrl}
            target="_blank"
            rel="noreferrer"
          >
            Join the mailing list
            <ExternalArrow />
          </a>
        </div>
        <a
          className="hero-scroll-cue"
          href="#discover"
          aria-label="Scroll to discover more"
        >
          <svg
            className="hero-scroll-arrow"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
      </section>

      <section
        className="section thesis-section"
        id="discover"
        aria-labelledby="thesis-title"
      >
        <h2 className="sr-only" id="thesis-title">
          What HCS does
        </h2>
        <p className="container-wide thesis">
          Since 1983, the Harvard Computer{' '}
          <span className="thesis-nowrap">
            Society
            <span className="thesis-chip">
              <Link
                className="thesis-stack"
                href="/about"
                style={{ '--count': 1 } as CSSProperties}
                aria-label="About HCS"
              >
                <span className="thesis-window" aria-hidden="true">
                  <span className="thesis-belt">
                    <span
                      className="thesis-disc"
                      style={{ '--slot': 0, '--page': 0 } as CSSProperties}
                    >
                      <Image src="/remy-disc.png" alt="" fill sizes="96px" />
                    </span>
                  </span>
                </span>
              </Link>
            </span>
          </span>{' '}
          has brought together Harvard students curious about computing. We host
          workshops, talks, and socials backed by our{' '}
          <span className="thesis-nowrap">
            sponsors
            <ThesisStack items={sponsorDiscs} label="Our sponsors" />,
          </span>{' '}
          and we&apos;re home to seven{' '}
          <span className="thesis-nowrap">
            <Link className="thesis-link" href="/initiatives">
              student groups
            </Link>
            <ThesisStack items={groupDiscs} label="HCS student groups" />.
          </span>
        </p>
      </section>

      <section className="section section-tint">
        <div className="container-wide section-heading-row">
          <div>
            <h2>Recent events</h2>
          </div>
          <p>
            Check out the latest professional development and community-building
            events hosted by the Harvard Computer Society.
          </p>
        </div>
        <div
          className="photo-strip"
          aria-label="Recent HCS event photos. Swipe to browse on mobile."
        >
          <div
            className="photo-track"
            style={{ animationDuration: `${eventPhotos.length * 7}s` }}
          >
            <div className="photo-sequence">
              {eventPhotos.map((photo) => (
                <EventPhoto photo={photo} key={photo.id} />
              ))}
            </div>
            <div className="photo-sequence" aria-hidden="true">
              {eventPhotos.map((photo) => (
                <EventPhoto
                  photo={photo}
                  duplicate
                  key={`duplicate-${photo.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section sponsors-section">
        <div className="container-wide centered-copy">
          <h2>Supported by our sponsors</h2>
        </div>
        <div className="container-wide sponsor-grid">
          {sponsors.map((sponsor) => (
            <a
              className="sponsor-card"
              href={sponsor.href}
              target="_blank"
              rel="noreferrer"
              key={sponsor.name}
              aria-label={`Visit ${sponsor.name}`}
            >
              <span
                className="sponsor-mark"
                aria-hidden="true"
                style={
                  {
                    '--logo-mask': `url('${sponsor.image}')`,
                    '--logo-color': sponsor.color,
                    '--logo-height': `${sponsor.displayHeight}px`,
                    aspectRatio: `${sponsor.width} / ${sponsor.height}`,
                  } as CSSProperties
                }
              />
            </a>
          ))}
        </div>
        <p className="container-wide sponsor-note">
          Interested in sponsoring HCS?{' '}
          <a className="inline-link" href={`mailto:${presidentsEmail}`}>
            Get in touch
          </a>
        </p>
      </section>

      <section className="dark-band" data-header-tone="dark">
        <div className="container-wide dark-band-block">
          <h2>Past speakers and guests</h2>
          <ul className="speaker-grid">
            {speakers.map((speaker) => (
              <li className="speaker-card" key={speaker.name}>
                <strong>{speaker.name}</strong>
                <span>{speaker.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="container-wide dark-band-block">
          <h2>In their words</h2>
          <div className="quote-grid">
            {quotes.map((quote) => (
              <figure className="quote-card" key={quote.name}>
                <blockquote>
                  <p>“{quote.text}”</p>
                </blockquote>
                <figcaption>
                  <span className="quote-avatar" aria-hidden="true">
                    {quote.initials}
                  </span>
                  <span>
                    <cite>{quote.name}</cite>
                    <span>
                      {quote.role} ·{' '}
                      <a href={quote.href} target="_blank" rel="noreferrer">
                        {quote.source}
                      </a>
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="container-wide join-block">
          <h2>Stay in the loop</h2>
          <p>
            Get the latest CS events and opportunities at Harvard in your inbox.
          </p>
          <div className="join-actions">
            <a
              className="button button-light"
              href={mailingListUrl}
              target="_blank"
              rel="noreferrer"
            >
              Join the mailing list
              <ExternalArrow />
            </a>
            <a
              className="button button-outline-light"
              href={slackUrl}
              target="_blank"
              rel="noreferrer"
            >
              Join our Slack
              <ExternalArrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
