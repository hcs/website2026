import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/page-elements';

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    'Join the Harvard Computer Society mailing list, Slack community, and Instagram, and learn about upcoming HCS events.',
  alternates: { canonical: '/contact' },
};

const communityLinks = [
  {
    title: 'Mailing List',
    description: 'Get the latest CS opportunities in your inbox.',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfSLf_lkPf-GyXFd53H7hB71SW9jCVqU34V-WLhM2-F9_2u2g/viewform?usp=send_form&usp=embed_facebook',
    image: '/gmail.webp',
  },
  {
    title: 'Slack',
    description: 'Chat with other students about all things CS at Harvard.',
    href: 'https://join.slack.com/t/harvard-cs-society/shared_invite/zt-2cgtl5bpc-QCxXWwjaf1FulZhAfJSzkQ',
    image: '/slack.png',
  },
  {
    title: 'Instagram',
    description: 'Stay updated on our latest events and announcements.',
    href: 'https://www.instagram.com/harvard.computer.society/',
    image: '/instagram.webp',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Get Involved" />

      <section className="section events-section">
        <div className="container-wide centered-copy page-intro">
          <h2>Upcoming events</h2>
        </div>
        <div className="container-wide empty-event">
          <span className="event-bracket" aria-hidden="true">
            {'{'}
          </span>
          <div>
            <p>No upcoming events at this time. Please check back later!</p>
          </div>
          <span className="event-bracket" aria-hidden="true">
            {'}'}
          </span>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container-wide centered-copy">
          <h2>Join the community</h2>
        </div>

        <div className="container-wide community-grid">
          {communityLinks.map((item) => (
            <a
              className="community-card"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              key={item.title}
            >
              <Image src={item.image} alt="" width={72} height={72} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
