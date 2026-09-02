import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/page-elements';

export const metadata: Metadata = {
  title: 'Initiatives',
  description:
    'Explore Harvard Computer Society affiliate organizations working across artificial intelligence, social impact, product, health, startups, responsible technology, and competitive programming.',
  alternates: { canonical: '/initiatives' },
};

const initiatives = [
  {
    image: '/initiatives/ai-society-logo.png',
    title: 'Society for Artificial Intelligence',
    description:
      'A community for students, researchers, and faculty exploring AI through projects, events, fellowships, and thoughtful discussion about its impact on society.',
    href: 'https://ai.hcs.harvard.edu/',
  },
  {
    image: '/t4sg_logo.png',
    title: 'Tech for Social Good',
    description:
      'Students partner with nonprofits, government agencies, and social-impact organizations to extend their work through technology.',
    href: 'https://socialgood.hcs.harvard.edu/',
  },
  {
    image: '/product-lab.png',
    title: 'Product Lab',
    description:
      'Semester-long product projects turn customer research into durable strategy for companies and organizations.',
    href: 'https://www.hcsproductlab.org/',
  },
  {
    image: '/tghi.png',
    title: 'Tech and Global Health Initiative',
    description:
      'An interdisciplinary community building compassionate, technology-enabled responses to global health challenges.',
    href: 'https://techglobalhealth.org/',
  },
  {
    image: '/startups.png',
    title: 'startups @ harvard',
    description:
      'A community for students curious about startups, emerging products, and the people shaping what comes next.',
    href: 'https://www.startupsatharvard.com/',
  },
  {
    image: '/recompute.png',
    title: 'ReCompute',
    description:
      'An interdisciplinary undergraduate community examining and improving the structures that govern technology in society.',
    href: 'https://harvard-recompute.github.io/',
  },
  {
    image: '/icpc.gif',
    title: 'Harvard Computing Contest Club',
    description:
      'Harvard undergraduates train and compete together in ICPC contests, from the Northeast regional to the World Finals.',
    href: 'https://hc3.seas.harvard.edu/hc3/icpc/index.html',
  },
];

export default function InitiativesPage() {
  return (
    <>
      <PageHero
        title="Explore the groups that make up the HCS community."
        description="HCS is the umbrella organization for seven student groups focused on different areas of CS."
        images={[
          {
            src: '/initiatives/hero-ai.png',
            position: 'center 72%',
          },
          {
            src: '/initiatives/hero-t4sg.png',
            position: 'center 5%',
          },
          {
            src: '/initiatives/hero-product-lab.jpg',
            position: 'center 40%',
          },
          {
            src: '/initiatives/hero-icpc.jpg',
            position: 'center',
          },
          {
            src: '/initiatives/hero-startups.jpg',
            position: 'center 42%',
          },
        ]}
      />

      <section className="section affiliate-section">
        <div className="container-wide affiliate-directory">
          {initiatives.map((initiative) => (
            <a
              className="affiliate-row"
              href={initiative.href}
              target="_blank"
              rel="noreferrer"
              key={initiative.title}
            >
              <div className="affiliate-row-logo">
                <Image
                  src={initiative.image}
                  alt={`${initiative.title} logo`}
                  fill
                  sizes="(max-width: 760px) 180px, 220px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="affiliate-row-copy">
                <h2>{initiative.title}</h2>
                <p>{initiative.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
