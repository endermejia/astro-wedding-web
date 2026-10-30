import {
  WEDDING_CONFIG,
  type CalendarEventTranslations,
  type VenueId,
} from '../i18n';

export type CalendarEventKey = VenueId | 'full';

function getEventUtcRange(eventKey: CalendarEventKey) {
  if (eventKey === 'full') {
    return {
      startUtc: WEDDING_CONFIG.fullWeddingCalendar.calendarStartUtc,
      endUtc: WEDDING_CONFIG.fullWeddingCalendar.calendarEndUtc,
    };
  }
  return {
    startUtc: WEDDING_CONFIG.venues[eventKey].calendarStartUtc,
    endUtc: WEDDING_CONFIG.venues[eventKey].calendarEndUtc,
  };
}

export function buildGoogleCalendarUrl(
  eventKey: CalendarEventKey,
  eventCopy: CalendarEventTranslations
): string {
  const { startUtc, endUtc } = getEventUtcRange(eventKey);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventCopy.title,
    dates: `${startUtc}/${endUtc}`,
    location: eventCopy.location,
    details: eventCopy.description,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(
  eventKey: CalendarEventKey,
  eventCopy: CalendarEventTranslations
): void {
  const { startUtc, endUtc } = getEventUtcRange(eventKey);
  const nowUtc = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const escapedDesc = eventCopy.description.replace(/\n/g, '\\n').replace(/,/g, '\\,');
  const escapedLoc = eventCopy.location.replace(/,/g, '\\,');

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${WEDDING_CONFIG.fullWeddingCalendar.icsProdId}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${WEDDING_CONFIG.fullWeddingCalendar.icsUidPrefix}-${eventKey}`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${eventCopy.title}`,
    `DESCRIPTION:${escapedDesc}`,
    `LOCATION:${escapedLoc}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = WEDDING_CONFIG.fullWeddingCalendar.icsFilename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
