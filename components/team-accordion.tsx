'use client';

import Image from 'next/image';
import { useState, type CSSProperties } from 'react';

type LeadershipGroup = {
  team: string;
  members: string[];
};

type AlumniMember = {
  name: string;
  role: string;
  image: string;
};

export function TeamAccordion({
  leadershipTeams,
  alumniBoard,
}: {
  leadershipTeams: LeadershipGroup[];
  alumniBoard: AlumniMember[];
}) {
  const [openItem, setOpenItem] = useState<'current' | 'alumni' | null>(
    'current',
  );

  const currentMembers = leadershipTeams.flatMap((group) =>
    group.members.map((name) => ({
      name,
      title:
        group.team === 'Presidents' ? 'President' : 'Director of ' + group.team,
    })),
  );

  const toggle = (item: 'current' | 'alumni') => {
    setOpenItem((current) => (current === item ? null : item));
  };

  return (
    <div className="team-accordion">
      <AccordionItem
        id="current"
        title="2026 Leadership"
        open={openItem === 'current'}
        onToggle={() => toggle('current')}
      >
        <div className="current-directory">
          {currentMembers.map((person, index) => (
            <article
              className="current-directory-row"
              key={person.name}
              style={{ '--row-index': index } as CSSProperties}
            >
              <figure
                className="current-avatar"
                aria-label={'Placeholder headshot for ' + person.name}
              >
                <span aria-hidden="true">{getInitials(person.name)}</span>
              </figure>
              <h3>{person.name}</h3>
              <p>{person.title}</p>
            </article>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem
        id="alumni"
        title="2023 Leadership"
        open={openItem === 'alumni'}
        onToggle={() => toggle('alumni')}
      >
        <div className="alumni-directory">
          {alumniBoard.map((person, index) => (
            <div
              className="alumni-directory-row"
              key={person.name}
              style={{ '--row-index': index } as CSSProperties}
            >
              <div className="alumni-avatar">
                <Image
                  src={person.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="cover-image"
                />
              </div>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </div>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function AccordionItem({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const panelId = 'team-panel-' + id;

  return (
    <section className="team-accordion-item" data-open={open}>
      <h2>
        <button
          className="team-accordion-trigger"
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="team-accordion-title">{title}</span>
          <span className="team-accordion-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </h2>
      <div className="team-accordion-panel" id={panelId} aria-hidden={!open}>
        <div className="team-accordion-panel-inner">{children}</div>
      </div>
    </section>
  );
}
