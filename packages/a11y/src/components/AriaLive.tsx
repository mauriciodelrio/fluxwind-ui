import React, { useEffect, useState } from 'react';
import { announcements, type Announcement } from '../store';

export interface AriaLiveProps {
  /**
   * Politeness level for announcements
   * @default 'polite'
   */
  politeness?: 'polite' | 'assertive' | 'off';
  /**
   * Additional class names
   */
  className?: string;
}

/**
 * Component that renders a live region for screen reader announcements
 */
export const AriaLive: React.FC<AriaLiveProps> = ({ politeness = 'polite', className = '' }) => {
  const [currentAnnouncements, setCurrentAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const unsubscribe = announcements.subscribe((value) => {
      setCurrentAnnouncements(value);
    });

    return unsubscribe;
  }, []);

  const filteredAnnouncements = currentAnnouncements.filter((a) => a.politeness === politeness);

  if (filteredAnnouncements.length === 0) return null;

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className={className}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0',
      }}
    >
      {filteredAnnouncements.map((announcement) => (
        <div key={announcement.id}>{announcement.message}</div>
      ))}
    </div>
  );
};

AriaLive.displayName = 'AriaLive';
