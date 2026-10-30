import type { VenueId } from './types';

/**
 * Non-translatable technical constants (ISO dates, coordinates/URLs, IBAN digits, asset paths).
 */
export const WEDDING_CONFIG = {
  date: {
    isoStart: '2027-03-13T12:30:00+01:00',
    calendarStripDays: [11, 12, 13, 14, 15] as const,
    highlightDay: 13,
  },
  music: {
    sources: [{ src: '/audio/enya-may-it-be.m4a', type: 'audio/mp4' }] as const,
  },
  images: {
    oliveTreeStory: '/images/olive-tree-story.png',
  },
  venues: {
    ceremonia: {
      image: '/images/ayuntamiento-elche.png',
      mapsQueryUrl:
        'https://www.google.com/maps/search/?api=1&query=Ayuntamiento+de+Elche+Pla%C3%A7a+de+Baix+1+03202+Elche+Alicante',
      mapsEmbedUrl:
        'https://maps.google.com/maps?q=Ayuntamiento%20de%20Elche,%20Pla%C3%A7a%20de%20Baix%201,%2003202%20Elche&t=&z=16&ie=UTF8&iwloc=&output=embed',
      calendarStartUtc: '20270313T113000Z',
      calendarEndUtc: '20270313T131500Z',
    },
    celebracion: {
      image: '/images/las-palmeras-resort.png',
      mapsQueryUrl:
        'https://www.google.com/maps/search/?api=1&query=Las+Palmeras+Resort+Crevillent+N-340a+Km+708+03330+Crevillent+Alicante',
      mapsEmbedUrl:
        'https://maps.google.com/maps?q=Las%20Palmeras%20Resort,%20N-340a%20Km%20708,%2003330%20Crevillent&t=&z=15&ie=UTF8&iwloc=&output=embed',
      calendarStartUtc: '20270313T133000Z',
      calendarEndUtc: '20270314T020000Z',
    },
  } satisfies Record<
    VenueId,
    {
      image: string;
      mapsQueryUrl: string;
      mapsEmbedUrl: string;
      calendarStartUtc: string;
      calendarEndUtc: string;
    }
  >,
  fullWeddingCalendar: {
    calendarStartUtc: '20270313T113000Z',
    calendarEndUtc: '20270314T020000Z',
    icsFilename: 'boda-iris-y-adela-2027.ics',
    icsProdId: '-//Iris & Adela//Boda 13-03-2027//ES',
    icsUidPrefix: 'boda-iris-adela-2027',
  },
  accommodation: {
    websiteUrl: 'https://www.laspalmerasresort.com/',
    phoneDisplay: '+34 965 40 01 09',
    phoneClean: '+34965400109',
  },
  gift: {
    ibanFormatted: 'ES69 2100 2780 3102 0048 7311',
    ibanRaw: 'ES6921002780310200487311',
  },
} as const;
