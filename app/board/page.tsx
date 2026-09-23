import type { Metadata } from 'next';
import { PageHero } from '@/components/page-elements';
import { TeamAccordion } from '@/components/team-accordion';
import { leadershipArchive } from '@/data/leadership-archive';

export const metadata: Metadata = {
  title: 'Board',
  description:
    'Meet the current and alumni leadership teams of the Harvard Computer Society.',
  alternates: { canonical: '/board' },
};

const leadershipTeams = [
  {
    team: 'Presidents',
    members: [
      { name: 'Aarna Pal-Yadav', image: '/board/2026/aarna-pal-yadav.webp' },
      'Ishaan Sinha',
    ],
  },
  {
    team: 'Finance',
    members: [
      'Michael Shaari',
      { name: 'Nishka Patel', image: '/board/2026/nishka-patel.webp' },
    ],
  },
  {
    team: 'Cross-CS Organizations',
    members: ['Brian Zhou'],
  },
  {
    team: 'Community',
    members: [
      { name: 'Athena Zhou', image: '/board/2026/athena-zhou.webp' },
      'Jia Michel',
    ],
  },
  {
    team: 'Academics',
    members: [
      'Eric Ge',
      { name: 'Bryan Lim', image: '/board/2026/bryan-lim.webp' },
    ],
  },
  {
    team: 'Professional Development',
    members: ['Alexis Hu', 'Jasmine Liu'],
  },
  {
    team: 'Publicity',
    members: ['Dhamar Carrillo', 'Farhaan Siddiqui', 'Amy Munoz'],
  },
  {
    team: 'Tech',
    members: [{ name: 'Viraj Singh', image: '/board/2026/viraj-singh.webp' }],
  },
];

const alumniBoard = [
  { name: 'Emily Sun', role: 'President', image: '/board/emily.jpeg' },
  { name: 'Eileen Ye', role: 'President', image: '/board/eileen.jpg' },
  {
    name: 'Maya Dummett',
    role: 'Director of Community',
    image: '/board/maya.jpg',
  },
  {
    name: 'Sabrina Zhu',
    role: 'Director of Community',
    image: '/board/sabrina.jpg',
  },
  {
    name: 'Karina Chung',
    role: 'Director of Professional Development',
    image: '/board/karina.JPG',
  },
  {
    name: 'Michael Shaari',
    role: 'Director of Professional Development',
    image: '/board/michael.jpeg',
  },
  {
    name: 'Marvin Li',
    role: 'Director of Academics',
    image: '/board/marvin.jpg',
  },
  {
    name: 'Mohammed Mohammed',
    role: 'Director of Academics',
    image: '/board/mohamed.jpeg',
  },
  {
    name: 'Jackson Moody',
    role: 'Director of Outreach & Engagement',
    image: '/board/jackson.jpeg',
  },
  { name: 'Wency Suo', role: 'Director of Finance', image: '/board/wency.jpg' },
];

export default function BoardPage() {
  return (
    <>
      <PageHero title="HCS Board" />

      <section className="section team-page">
        <div className="container-wide">
          <TeamAccordion
            leadershipTeams={leadershipTeams}
            alumniBoard={alumniBoard}
            archives={leadershipArchive}
          />
        </div>
      </section>
    </>
  );
}
