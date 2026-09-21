'use client';

import Image from 'next/image';
import { useState, type CSSProperties } from 'react';
import type {
  ArchivedMember,
  LeadershipArchive,
} from '@/data/leadership-archive';

type LeadershipGroup = {
  team: string;
  members: string[];
};

export function TeamAccordion({
  leadershipTeams,
  alumniBoard,
  archives,
}: {
  leadershipTeams: LeadershipGroup[];
  alumniBoard: ArchivedMember[];
  archives: LeadershipArchive[];
}) {
  const [openItem, setOpenItem] = useState<string | null>('current');

  const currentMembers = leadershipTeams.flatMap((group) =>
    group.members.map((name) => ({
      name,
      title:
        group.team === 'Presidents' ? 'President' : 'Director of ' + group.team,
    })),
  );

  const toggle = (item: string) => {
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
        <MemberDirectory members={alumniBoard} />
      </AccordionItem>

      {archives.map((archive) => (
        <AccordionItem
          key={archive.year}
          id={archive.year}
          title={`${archive.year} Leadership`}
          open={openItem === archive.year}
          onToggle={() => toggle(archive.year)}
        >
          <p className="archive-intro">
            From our {archive.year} website archive.
            {archive.members.some((member) => member.bio) &&
              ' Biographies reflect the time they were written.'}{' '}
            <a href={archive.source} target="_blank" rel="noreferrer">
              View the original roster
            </a>
          </p>
          {archive.groupPhoto && (
            <Image
              {...archive.groupPhoto}
              className="archive-group-photo"
              sizes="(max-width: 760px) 100vw, 900px"
            />
          )}
          <MemberDirectory members={archive.members} year={archive.year} />
        </AccordionItem>
      ))}
    </div>
  );
}

function MemberDirectory({
  members,
  year,
}: {
  members: ArchivedMember[];
  year?: string;
}) {
  return (
    <div className="alumni-directory">
      {members.map((person, index) => (
        <article
          className="alumni-directory-row"
          key={person.name}
          style={{ '--row-index': index } as CSSProperties}
        >
          <div className="alumni-avatar" aria-hidden="true">
            {person.image ? (
              <Image
                src={person.image}
                alt=""
                fill
                sizes="56px"
                className="cover-image"
              />
            ) : (
              <span>{getInitials(person.name)}</span>
            )}
          </div>
          <h3>{person.name}</h3>
          <p>{person.role}</p>
          {person.bio && (
            <details className="archive-bio">
              <summary>
                Read {year} bio
                <span className="sr-only"> for {person.name}</span>
              </summary>
              <p>{person.bio}</p>
            </details>
          )}
        </article>
      ))}
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
          id={`team-trigger-${id}`}
          onClick={onToggle}
        >
          <span className="team-accordion-title">{title}</span>
          <span className="team-accordion-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </h2>
      <section
        className="team-accordion-panel"
        id={panelId}
        aria-labelledby={`team-trigger-${id}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="team-accordion-panel-inner">{children}</div>
      </section>
    </section>
  );
}
