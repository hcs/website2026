import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/page-elements';

export const metadata: Metadata = {
  title: 'Initiatives',
  description:
    'Explore Harvard Computer Society affiliates and past projects, including Datamatch and the Harvard Computer Review.',
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

const pastProjects = [
  {
    image: '/initiatives/datamatch-logo.svg',
    title: 'Datamatch',
    description:
      'Started as an HCS side project in the 1990s and later expanded beyond Harvard.',
    href: 'https://datamatch.me/',
  },
  {
    image: '/initiatives/bip-2020.jpg',
    title: 'Builders Incubation Program',
    description:
      'A 2020 HCS summer program offering mentorship, workshops, and equity-free grant opportunities for student builders.',
    href: 'https://medium.com/hcs-builders-incubation-program/',
  },
  {
    image: '/logo.png',
    title: 'Harvard Computer Review',
    description:
      'HCS published the Review online alongside Computers at Harvard in the 1990s.',
    href: 'https://www.thecrimson.com/article/1997/12/9/computer-society-elects-new-leaders-pthe/',
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
          <h2 className="affiliate-archive-heading">Past projects</h2>
          {pastProjects.map((project) => (
            <a
              className="affiliate-row"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              key={project.title}
            >
              <div className="affiliate-row-logo">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 180px, 220px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="affiliate-row-copy">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
