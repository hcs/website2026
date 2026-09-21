export type MemberLinkIcon =
  | 'github'
  | 'linkedin'
  | 'instagram'
  | 'x'
  | 'website'
  | 'link';

export type ArchivedMember = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  email?: string;
  links?: { label: string; href: string; icon?: MemberLinkIcon }[];
};

export type LeadershipArchive = {
  year: string;
  source: string;
  members: ArchivedMember[];
  groupPhoto?: { src: string; alt: string; width: number; height: number };
};

// Years identify the archived website snapshots; exact term dates are not recorded.
export const leadershipArchive: LeadershipArchive[] = [
  {
    year: '2022',
    source:
      'https://github.com/hcs/website2020/blob/fe17b2fb05ac340c35fdd5b44ca85fa8fb2edb41/hcs-website/pages/people/index.js',
    members: [
      {
        name: 'Maegan Jong',
        role: 'Co-President; Director of Relations',
        image: '/board/archive/maegan-2021.webp',
      },
      {
        name: 'Will Cooper',
        role: 'Co-President',
        image: '/board/archive/will-cooper-2021.webp',
      },
      {
        name: 'Ethan Shaotran',
        role: 'Director of Technology',
        image: '/board/archive/ethan-shaotran-2022.webp',
      },
      {
        name: 'Eric Tang',
        role: 'Director of Education',
        image: '/board/archive/eric-tang-2022.webp',
      },
      {
        name: 'Shreyas Iyer',
        role: 'Director of Education',
        image: '/board/archive/shreyas-iyer-2022.webp',
      },
      {
        name: 'Eric Li',
        role: 'Director of Tech For Social Good',
        image: '/board/archive/eric-li-2021.webp',
      },
      {
        name: 'Kelsey Wu',
        role: 'Director of Product Lab',
        image: '/board/archive/kelsey-2021.webp',
      },
      {
        name: 'Kelly Ding',
        role: 'Director of Events',
        image: '/board/archive/kelly-ding-2022.webp',
      },
      {
        name: 'Michael Zhao',
        role: 'Director of Events',
        image: '/board/archive/michael-zhao-2022.webp',
      },
      {
        name: 'Doug Yang',
        role: 'Director of Finance',
        image: '/board/archive/doug-yang-2022.webp',
      },
      {
        name: 'Justin Ye',
        role: 'Director of Design',
        image: '/board/archive/justin-ye-2021.webp',
      },
      {
        name: 'Michael Young',
        role: 'Director of Community',
        image: '/board/archive/michael-young-2022.webp',
      },
      {
        name: 'Haneul Shin',
        role: 'Director of Mentorship',
        image: '/board/archive/haneul-shin-2021.webp',
      },
      {
        name: 'Matt Tengtrakool',
        role: 'Director of Mentorship',
        image: '/board/archive/matt-tengtrakool-2022.webp',
      },
    ],
    groupPhoto: {
      src: '/board/archive/board-2022.webp',
      alt: 'Group portrait from the 2022 HCS website',
      width: 1800,
      height: 1128,
    },
  },
  {
    year: '2021',
    source:
      'https://github.com/hcs/website2020/blob/f2b86a2a37d3c9e078969e0297eabce9e29fdcb7/hcs-website/pages/people/index.js',
    members: [
      {
        name: 'Anna Wang',
        role: 'Co-President',
        image: '/board/archive/anna-wang-2021.webp',
      },
      {
        name: 'Ryan Kim',
        role: 'Co-President',
        image: '/board/archive/ryan-kim-2021.webp',
      },
      {
        name: 'Vassilios Kaxiras',
        role: 'Director of Technology',
        image: '/board/archive/vassilios.webp',
      },
      {
        name: 'Sophia Ho',
        role: 'Director of Technology',
      },
      {
        name: 'Rakesh Nori',
        role: 'Director of Entrepreneurship',
        image: '/board/archive/rakesh-2021.webp',
      },
      {
        name: 'Cynthia Chen',
        role: 'Director of Entrepreneurship',
        image: '/board/archive/cynthia-2021.webp',
      },
      {
        name: 'Will Cooper',
        role: 'Director of Education',
        image: '/board/archive/will-cooper-2021.webp',
      },
      {
        name: 'Eric Zhang',
        role: 'Director of Education',
      },
      {
        name: 'Eric Li',
        role: 'Director of Tech For Social Good',
        image: '/board/archive/eric-li-2021.webp',
      },
      {
        name: 'Kelsey Wu',
        role: 'Director of Product Lab',
        image: '/board/archive/kelsey-2021.webp',
      },
      {
        name: 'Maegan Jong',
        role: 'Director of Relations',
        image: '/board/archive/maegan-2021.webp',
      },
      {
        name: 'Alex Cheng',
        role: 'Director of Recruiting',
        image: '/board/archive/alex-cheng-2021.webp',
      },
      {
        name: 'David Huang',
        role: 'Director of Events',
        image: '/board/archive/david-huang-2021.webp',
      },
      {
        name: 'Eric Shen',
        role: 'Director of Events',
        image: '/board/archive/eric-shen-2021.webp',
      },
      {
        name: 'Kevin Mao',
        role: 'Director of Sponsorships',
      },
      {
        name: 'Lauren Chen',
        role: 'Director of Sponsorships',
        image: '/board/archive/lauren-chen-2021.webp',
      },
      {
        name: 'Justin Ye',
        role: 'Director of Design',
        image: '/board/archive/justin-ye-2021.webp',
      },
      {
        name: 'Jasmine Huang',
        role: 'Director of Community',
      },
      {
        name: 'Isha Sangani',
        role: 'Director of Community',
        image: '/board/archive/isha-2021.webp',
      },
      {
        name: 'Katherine McPhie',
        role: 'Associate Director of Membership',
        image: '/board/archive/katherine-2021.webp',
      },
      {
        name: 'Haneul Shin',
        role: 'Associate Director of Diversity + Inclusion',
        image: '/board/archive/haneul-shin-2021.webp',
      },
      {
        name: 'Ethan Lee',
        role: 'Associate Director of Diversity + Inclusion',
        image: '/board/archive/ethan-lee-2021.webp',
      },
    ],
  },
  {
    year: '2020',
    source:
      'https://github.com/hcs/website2020/blob/1f39cf7b727812234c5c6a2a587b221530569bc9/hcs-website/pages/people/index.js',
    members: [
      {
        name: 'Manasi Maheshwari',
        role: 'Co-President',
        image: '/board/archive/manasi.webp',
        bio: 'Manasi is a junior concentrating in CS. She hails from California and she lives in Currier House. She was involved in HSA DEV and Harvard Tech Review, and also starred in Gunghroo, the largest college student production in the world.',
      },
      {
        name: 'Andrea Zhang',
        role: 'Co-President',
        image: '/board/archive/andrea.webp',
        bio: 'Andrea is a sophomore in Kirkland studying Applied Math/English. She hails from the lovely land of Basking Ridge, NJ. Besides HCS, she loves planning events for her house with HoCo and singing with the Radcliffe Choral Society.',
      },
      {
        name: 'Vassilios Kaxiras',
        role: 'Director of Technology',
        image: '/board/archive/vassilios.webp',
        bio: 'Vassilios is a rising sophomore concentrating in CS and living in Eliot House, originally from Belmont, MA.',
      },
      {
        name: 'Teddy Lin',
        role: 'Director of Technology',
        image: '/board/archive/teddy.webp',
        bio: "Teddy is a first-year student from Taiwan studying Computer Science and Economics. He lived in Wigglesworth last year and he'll live in Eliot for the next three years (hopefully). Besides HCS, he is involved in Harvard College Film Festival (HCFF) and Harvard Student Agencies (HSA). In his free time, he loves watching documentaries about financial scandals (aka Dirty Money), playing ping pong, learning foreign languages, and hanging out with friends. His favorite foods in the square are Jefe's burrito and Santouka ramen.",
      },
      {
        name: 'Haneul Shin',
        role: 'Director of Technology',
        image: '/board/archive/haneul.webp',
        bio: "Haneul is a rising sophomore from New Jersey studying Computer Science and Mathematics. She's excited to be living in Winthrop when she returns to campus! Other than serving as a Director of Technology for HCS, Haneul is involved in IvyHacks, HackHarvard, the Harvard-MIT Mathematics Tournament, and Harvard Gender Inclusivity in Math. When she’s not doing work, you can find her playing bridge, taking walks along the river, and playing foosball with friends!",
      },
      {
        name: 'Ryan Kim',
        role: 'Director of Business',
        image: '/board/archive/ryan.webp',
        bio: "Ryan is a junior in Mather originally from Fayetteville, Arkansas studying Computer Science and Bioengineering. Besides HCS, he is the Co-President of the Harvard Tech Review and entrenched within the Harvard entrepreneurship scene. In his free time, he loves trying the latest dance trends, learning new languages, coming up with new investment theses, and staying up to date with the latest tech trends. His absolute favorite in the square is Le's!",
      },
      {
        name: 'Mike Bao',
        role: 'Director of Business',
        image: '/board/archive/mike.webp',
      },
      {
        name: 'William Cooper',
        role: 'Director of Education',
        image: '/board/archive/william.webp',
        bio: 'Will is a first-year (or sophomore?) planning on studying applied math and computer science. He lived in Stoughton South last year and will live in Kirkland house for the next three years. He also plays ice hockey and tennis, and sings in the University Choir. In his spare time, he loves watching hockey and tennis, playing piano, and hanging out for a good time. His favorite scent is a freshly opened can of tennis balls.',
      },
      {
        name: 'Mark Pekala',
        role: 'Director of Education',
        image: '/board/archive/mark.webp',
        bio: 'Mark is a first-year student from the wonderful town of Minneapolis, MN studying Computer Science and living in Eliot House. He has an irrational fear of writing about himself in the third person. Outside of HCS, Mark spends his time crafting digital pranks as Technology Chair of Satire V and promoting security as Secretary of Defense of the Harvard College Stand Up Comic Society. He used to be really into running until he messed up his knee, and now spends a lot of time watching SNL and going for long bike rides. If found, please return Mark to Minneapolis for a $200 reward.',
      },
      {
        name: 'Eric Li',
        role: 'Director of Tech For Social Good',
        image: '/board/archive/eric.webp',
      },
      {
        name: 'Ethan Lee',
        role: 'Director of Relations',
        image: '/board/archive/ethan.webp',
        bio: "Ethan is a first-year student from Needham, MA planning to study Computer Science and Statistics. He lived in Pennypacker as a first-year and will live as a fish of Cabot for the next three years. He is also involved in the Harvard Crimson, Harvard Open Data Project, Datamatch, and Satire V. In his free time, he loves watching Tottenham games (especially the ones where Tottenham win), trying to make music, and reading scary stories. His favorite foods are Felipe's nachos and CVS Cheez-its.",
      },
      {
        name: 'Maegan Jong',
        role: 'Director of Relations',
        image: '/board/archive/maegan.webp',
        bio: "Maegan is a first-year student from the Chicagoland area who will be living in Kirkland! She plans to study Statistics and Computer Science. Outside of HCS, Maegan is involved in Women Engineers Code (WECode) and Harvard Undergraduate Capital Partners (HUCP). When she's not doing classwork, you can catch Maegan dancing with Asian American Dance Troupe (AADT), taking nature walks, and exploring Boston with friends.",
      },
      {
        name: 'Anna Wang',
        role: 'Director of Community',
        image: '/board/archive/anna.webp',
        bio: 'Anna is a sophomore in Cabot studying Computer Science. She is from Redmond, WA and loves the west coast, nature, and hiking, especially in the summertime. She is also a part of the Datamatch business team and loves spreading the love and community on campus. Anna has had past industry internships at Microsoft and Uber, and is currently exploring the world of tech start-ups as well. She has a huge weakness for snacks, teas, and boba, and has even learned how to make bubble tea from within her dorm room!',
      },
    ],
    groupPhoto: {
      src: '/board/archive/board-2020.webp',
      alt: 'Group portrait from the 2020 HCS website',
      width: 1800,
      height: 1200,
    },
  },
];
