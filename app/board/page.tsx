import type { Metadata } from 'next';
import { PageHero } from '@/components/page-elements';
import { TeamAccordion } from '@/components/team-accordion';

export const metadata: Metadata = {
  title: 'Board',
  description:
    'Meet the current and alumni leadership teams of the Harvard Computer Society.',
  alternates: { canonical: '/board' },
};

const leadershipTeams = [
  {
    team: 'Presidents',
    members: ['Aarna Pal-Yadav', 'Ishaan Sinha'],
  },
  {
    team: 'Finance',
    members: ['Michael Shaari', 'Nishka Patel'],
  },
  {
    team: 'Cross-CS Organizations',
    members: ['Brian Zhou'],
  },
  {
    team: 'Community',
    members: ['Athena Zhou', 'Jia Michel'],
  },
  {
    team: 'Academics',
    members: ['Eric Ge', 'Bryan Lim'],
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
    members: ['Viraj Singh'],
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
          />
        </div>
      </section>
    </>
  );
}
