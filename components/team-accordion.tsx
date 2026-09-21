'use client';

import Image from 'next/image';
import { useId, useRef, useState, type CSSProperties } from 'react';
import { MemberIcon } from '@/components/member-icon';
import type {
  ArchivedMember,
  LeadershipArchive,
} from '@/data/leadership-archive';

type LeadershipGroup = {
  team: string;
  members: (string | Omit<ArchivedMember, 'role'>)[];
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
    group.members.map((member) => ({
      ...(typeof member === 'string' ? { name: member } : member),
      role:
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
        <MemberDirectory members={currentMembers} current />
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
          {archive.groupPhoto && (
            <Image
              {...archive.groupPhoto}
              className="archive-group-photo"
              sizes="(max-width: 760px) 100vw, 900px"
            />
          )}
          <MemberDirectory members={archive.members} />
        </AccordionItem>
      ))}
    </div>
  );
}

function MemberDirectory({
  members,
  current = false,
}: {
  members: ArchivedMember[];
  current?: boolean;
}) {
  const directoryClass = current ? 'current-directory' : 'alumni-directory';

  return (
    <div className={directoryClass}>
      {members.map((person, index) => (
        <article
          className={`${directoryClass}-row`}
          key={person.name}
          style={{ '--row-index': index } as CSSProperties}
        >
          <div
            className={current ? 'current-avatar' : 'alumni-avatar'}
            aria-hidden="true"
          >
            {person.image ? (
              <Image
                src={person.image}
                alt=""
                fill
                sizes={current ? '76px' : '44px'}
                className="cover-image"
              />
            ) : (
              <span>{getInitials(person.name)}</span>
            )}
          </div>
          <div className="member-details">
            <div className="member-copy">
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </div>
            <MemberActions person={person} />
          </div>
        </article>
      ))}
    </div>
  );
}

function MemberActions({ person }: { person: ArchivedMember }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  if (!person.bio && !person.email && !person.links?.length) return null;

  return (
    <>
      <div className="member-actions">
        {person.bio && (
          <button
            className="member-action"
            type="button"
            aria-label={`Read bio for ${person.name}`}
            aria-haspopup="dialog"
            title="Read bio"
            onClick={() => dialogRef.current?.showModal()}
          >
            <MemberIcon name="bio" />
          </button>
        )}
        {person.email && (
          <a
            className="member-action"
            href={`mailto:${person.email}`}
            aria-label={`Email ${person.name}`}
            title={`Email ${person.name}`}
          >
            <MemberIcon name="email" />
          </a>
        )}
        {person.links?.map((link) => (
          <a
            className="member-action"
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${person.name}: ${link.label}`}
            title={link.label}
          >
            <MemberIcon name={link.icon ?? 'link'} />
          </a>
        ))}
      </div>
      {person.bio && (
        <dialog
          className="member-dialog"
          ref={dialogRef}
          aria-labelledby={titleId}
          closedby="any"
        >
          <button
            className="member-action member-dialog-close"
            type="button"
            aria-label="Close bio"
            title="Close bio"
            onClick={() => dialogRef.current?.close()}
          >
            <MemberIcon name="close" />
          </button>
          <h2 id={titleId}>{person.name}</h2>
          <p className="member-dialog-role">{person.role}</p>
          <p className="member-dialog-bio">{person.bio}</p>
        </dialog>
      )}
    </>
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
