'use client';

import Image from 'next/image';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type TransitionEvent,
} from 'react';

type Disc = {
  src: string;
  name: string;
};

const listFormat = new Intl.ListFormat('en', { type: 'conjunction' });

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// An inline stack of logo discs for the homepage thesis sentence. The discs
// fan out when the stack scrolls into view, and each click slides the next set
// in from the left. Two lanes alternate so the outgoing set can slide away
// while the incoming one slides in.
export function ThesisStack({
  items,
  label,
  visible = 3,
}: {
  items: Disc[];
  label: string;
  visible?: number;
}) {
  const count = Math.min(visible, items.length);
  const stackRef = useRef<HTMLButtonElement>(null);
  const [laneStarts, setLaneStarts] = useState<[number, number]>([0, 0]);
  const [activeLane, setActiveLane] = useState<0 | 1>(0);
  const [turning, setTurning] = useState(false);
  const [fanned, setFanned] = useState(true);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack || prefersReducedMotion()) return;
    // Only collapse the fan while the stack is still out of view.
    if (stack.getBoundingClientRect().top < window.innerHeight) return;

    setFanned(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setFanned(true);
      },
      { threshold: 1 },
    );
    observer.observe(stack);
    return () => observer.disconnect();
  }, []);

  const shownStart = laneStarts[activeLane];
  const shownNames = Array.from(
    { length: count },
    (_, slot) => items[(shownStart + slot) % items.length].name,
  );

  function advance() {
    if (turning || items.length <= count) return;

    const idleLane = activeLane === 0 ? 1 : 0;
    const nextStart = (shownStart + count) % items.length;
    setLaneStarts((starts) => {
      const updated: [number, number] = [...starts];
      updated[idleLane] = nextStart;
      return updated;
    });

    if (prefersReducedMotion()) {
      setActiveLane(idleLane);
    } else {
      setTurning(true);
    }
  }

  function finishTurn(event: TransitionEvent<HTMLSpanElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== 'transform') return;
    setActiveLane((lane) => (lane === 0 ? 1 : 0));
    setTurning(false);
  }

  return (
    <span className="thesis-chip">
      <button
        className="thesis-stack"
        type="button"
        ref={stackRef}
        data-fanned={fanned}
        style={{ '--count': count } as CSSProperties}
        title={listFormat.format(shownNames)}
        aria-label={`${label}: ${listFormat.format(shownNames)}. Show more.`}
        onClick={advance}
      >
        <span className="thesis-window" aria-hidden="true">
          <span
            className="thesis-belt"
            data-state={turning ? 'turning' : 'rest'}
            onTransitionEnd={finishTurn}
          >
            {([0, 1] as const).map((lane) => {
              const isActive = lane === activeLane;
              const state = isActive || turning ? 'shown' : 'parked';
              // The incoming lane waits one page to the left of the window.
              const page = isActive ? 0 : 1;

              return Array.from({ length: count }, (_, slot) => {
                const item = items[(laneStarts[lane] + slot) % items.length];

                return (
                  <span
                    className="thesis-disc"
                    data-state={state}
                    style={
                      {
                        '--slot': slot,
                        '--page': page,
                        '--layer': 10 - slot,
                      } as CSSProperties
                    }
                    key={`${lane}-${slot}`}
                  >
                    <Image src={item.src} alt="" fill sizes="96px" />
                  </span>
                );
              });
            })}
          </span>
        </span>
      </button>
    </span>
  );
}
