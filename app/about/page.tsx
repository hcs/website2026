import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/page-elements';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about the history, mission, academics, professional development, and community of the Harvard Computer Society.',
  alternates: { canonical: '/about' },
};

const areas = [
  {
    image: '/academics.jpeg',
    title: 'Academics',
    description:
      'We host workshops and faculty talks, share concentration guidance, and make it easier for students to find the courses and resources that fit their interests.',
  },
  {
    image: '/professional-development.jpg',
    title: 'Professional Development',
    description:
      'Industry conversations, practical workshops, and access to people working across technology help students explore careers and prepare for what comes next.',
  },
  {
    image: '/community.jpg',
    title: 'Community',
    description:
      'Study breaks, mentorship, office visits, and social events give students space to connect beyond the classroom and build lasting friendships.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About HCS"
        image="/about.jpg"
        imagePosition="center 42%"
      />

      <section className="section simple-intro-section">
        <div className="container-wide simple-intro">
          <h2>
            Promoting <span>CS knowledge</span>, fostering the{' '}
            <span>CS community</span>, and offering <span>free resources</span>{' '}
            to Harvard affiliates.
          </h2>
          <p>
            HCS is Harvard College&apos;s student-run computer science
            community. We make technical knowledge easier to access and create
            places for students to learn, build, and spend time together.
          </p>
        </div>
      </section>

      <section className="section about-history-section">
        <div className="container-wide">
          <div className="about-history-media">
            <Image
              src="/history.jpeg"
              alt="The Harvard Mark I computer"
              fill
              sizes="100vw"
            />
          </div>
          <div className="about-history-copy">
            <p>Our history</p>
            <h2>Part of Harvard&apos;s computing community since 1983.</h2>
            <p>
              HCS has long supported how students use and learn about
              technology. The organization once provided infrastructure for
              Harvard student mailing lists; today, we focus on open resources,
              events, and community for students interested in computer science.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-card-section">
        <div className="container-wide">
          <div className="about-card-header">
            <h2>What we do</h2>
            <p>Three areas shape the HCS experience.</p>
          </div>

          <div className="about-card-grid">
            {areas.map((area) => (
              <article className="about-card" key={area.title}>
                <div className="about-card-media">
                  <Image
                    src={area.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <div className="about-card-body">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="center-action">
            <Link className="button" href="/board">
              Meet the board
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
