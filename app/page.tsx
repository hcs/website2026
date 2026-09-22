import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

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

const explore = [
  {
    title: 'About Us',
    href: '/about',
    image: '/about.jpg',
    description:
      'Learn about the history and mission of the Harvard Computer Society.',
  },
  {
    title: 'Initiatives',
    href: '/initiatives',
    image: '/initiatives.jpg',
    description:
      "Learn more about the initiatives we're working on in each of our sub-organizations.",
  },
  {
    title: 'Get Involved',
    href: '/contact',
    image: '/contact.jpg',
    description: 'Learn how to get involved with Harvard Computer Society!',
  },
];

const eventPhotos = [
  {
    src: '/events/1.jpg',
    alt: 'Students speaking with panelists at the HCS research panel',
    eyebrow: 'Research',
    title: 'Research Panel',
    description:
      'Students and researchers share their paths into computer science research.',
  },
  {
    src: '/events/2.jpg',
    alt: 'A speaker leading an HCS workshop on knowledge base chunking',
    eyebrow: 'Technical workshop',
    title: 'Building Knowledge Bases',
    description:
      'A hands-on session on retrieval, chunking, and useful knowledge systems.',
  },
  {
    src: '/events/3.jpg',
    alt: 'A Robust Intelligence speaker presenting on securing AI systems',
    eyebrow: 'Industry talk',
    title: 'Securing the AI Transformation',
    description:
      'A conversation with Robust Intelligence about building safer AI systems.',
  },
  {
    src: '/events/4.jpg',
    alt: 'Students and speakers talking after the HCS research panel',
    eyebrow: 'Community',
    title: 'Research Panel Social',
    description:
      'Students continue the conversation with speakers after the panel.',
  },
  {
    src: '/events/5.jpeg',
    alt: 'An HCS speaker presenting an introduction to product management recruiting',
    eyebrow: 'Career workshop',
    title: 'Intro to PM Recruiting',
    description: 'Practical recruiting advice from HCS, WiCS, and Product Lab.',
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

const sponsors = [
  {
    name: 'Jane Street',
    slug: 'jane-street',
    href: 'https://www.janestreet.com/',
    image: '/sponsors/janestreet.png',
    width: 1308,
    height: 361,
  },
  {
    name: 'Hudson River Trading',
    slug: 'hrt',
    href: 'https://www.hudsonrivertrading.com/',
    image: '/sponsors/hrt.png',
    width: 720,
    height: 420,
  },
  {
    name: 'Citadel',
    slug: 'citadel',
    href: 'https://www.citadel.com/',
    image: '/sponsors/citadel.jpg',
    width: 1800,
    height: 1012,
  },
  {
    name: 'D. E. Shaw',
    slug: 'deshaw',
    href: 'https://www.deshaw.com/',
    image: '/sponsors/deshaw.jpg',
    width: 1800,
    height: 1800,
  },
  {
    name: 'Axiom',
    slug: 'axiom',
    href: 'https://www.axiom.xyz/',
    image: '/sponsors/axiom.jpg',
    width: 1800,
    height: 1800,
  },
];

export default function Home() {
  return (
    <>
      <section className="hero hero-home">
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

      <section className="section intro-section" id="discover">
        <div className="container-wide centered-copy">
          <h2>Harvard&apos;s largest computer science organization</h2>
          <p className="lead">
            HCS is dedicated to promoting interest in computing and information
            technologies among members of the Harvard community.
          </p>
        </div>

        <div className="container-wide card-grid explore-grid">
          {explore.map((item) => (
            <article className="image-card" key={item.title}>
              <div className="image-card-media">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                  className="cover-image"
                />
              </div>
              <div className="image-card-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link className="text-link" href={item.href}>
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
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
          aria-label="Recent HCS event photos. Animation pauses on hover or focus."
        >
          <div className="photo-track">
            <div className="photo-sequence">
              {eventPhotos.map((photo) => (
                <EventPhoto photo={photo} key={photo.src} />
              ))}
            </div>
            <div className="photo-sequence" aria-hidden="true">
              {eventPhotos.map((photo) => (
                <EventPhoto
                  photo={photo}
                  duplicate
                  key={`duplicate-${photo.src}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="center-action">
          <Link className="button" href="/contact">
            Get involved
          </Link>
        </div>
      </section>

      <section className="section sponsors-section">
        <div className="container-wide centered-copy">
          <h2>Our sponsors</h2>
          <p className="lead">
            The work that the Harvard Computer Society does would not be
            possible without the support of our generous sponsors. If you are
            interested in sponsoring HCS,{' '}
            <a className="inline-link" href="mailto:presidents@hcs.harvard.edu">
              please reach out
            </a>
            !
          </p>
        </div>
        <div className="container-wide sponsor-grid">
          {sponsors.map((sponsor) => (
            <a
              className={`sponsor-card sponsor-card-${sponsor.slug}`}
              href={sponsor.href}
              target="_blank"
              rel="noreferrer"
              key={sponsor.name}
              aria-label={`Visit ${sponsor.name}`}
            >
              <Image
                src={sponsor.image}
                alt={`${sponsor.name} logo`}
                width={sponsor.width}
                height={sponsor.height}
                sizes="(max-width: 760px) 50vw, 20vw"
                className="sponsor-logo"
              />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
