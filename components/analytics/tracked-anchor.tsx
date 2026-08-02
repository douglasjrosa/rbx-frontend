'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import {
  trackGtmEvent,
  type GtmEventName,
} from '@/lib/analytics/data-layer';

interface TrackedAnchorProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> {
  eventName: GtmEventName;
  eventLocation: string;
  children: ReactNode;
}

export default function TrackedAnchor({
  eventName,
  eventLocation,
  children,
  href,
  className,
  target,
  rel,
  'aria-label': ariaLabel,
}: TrackedAnchorProps) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      data-gtm-event={eventName}
      data-gtm-location={eventLocation}
      onClick={() => {
        trackGtmEvent(eventName, {
          event_location: eventLocation,
          link_url: href,
        });
      }}
    >
      {children}
    </a>
  );
}
