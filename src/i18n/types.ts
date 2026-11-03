export type Locale = 'es' | 'va';

export type VenueId = 'ceremonia' | 'celebracion';

export type TimelineIconType = 'ring' | 'ship' | 'donut';

export interface CountdownUnits {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface MetaTranslations {
  title: string;
  description: string;
  author: string;
}

export type SectionId =
  | 'inicio'
  | 'historia'
  | 'lugares'
  | 'programa'
  | 'alojamiento'
  | 'regalo';

export interface NavTranslations {
  ariaLabel: string;
  languageSelectorAria: string;
  openMenuAria: string;
  closeMenuAria: string;
  menuTitle: string;
  items: {
    home: string;
    story: string;
    venues: string;
    timeline: string;
    accommodation: string;
    gift: string;
  };
}

export interface CoupleTranslations {
  partner1: string;
  partner2: string;
  conjunction: string;
  symbolicConjunction: string;
  monogram: string;
}

export interface DateTranslations {
  day: string;
  monthNumber: string;
  monthName: string;
  year: string;
  dottedFormat: string;
  fullDateLabel: string;
}

export interface MusicTranslations {
  playingLabel: string;
  mutedLabel: string;
  ariaMute: string;
  ariaUnmute: string;
}

export interface LoaderTranslations {
  envelopeLabel: string;
  letterGreeting: string;
  loadingProgress: string;
  enterWithMusic: string;
  enterWithoutMusic: string;
  sealAriaLabel: string;
}

export interface HeroTranslations {
  invitationIntro: string;
  units: CountdownUnits;
  ctaAddToCalendar: string;
  ctaGoogleCalendar: string;
  ctaIcsDownload: string;
  scrollDownAria: string;
}

export interface StoryBorderAlts {
  hatTopLeft: string;
  snitchTopRight: string;
  treeMidLeft: string;
  donutMidRight: string;
  ringLowLeft: string;
  deathstarLowRight: string;
  booksBottomLeft: string;
  suitcaseBottomRight: string;
}

export interface StorySectionTranslations {
  eyebrow: string;
  welcomeHeading: string;
  paragraphs: readonly [string, string, string];
  closingTagline: string;
  borderAlts: StoryBorderAlts;
}

export interface VenueItemTranslations {
  id: VenueId;
  title: string;
  time: string;
  venueName: string;
  addressLine1: string;
  addressLine2: string;
  fullAddress: string;
  imageAlt: string;
}

export interface VenuesSectionTranslations {
  eyebrow: string;
  title: string;
  ctaDirections: string;
  ctaCopyAddress: string;
  ctaCopiedAddress: string;
  items: readonly [VenueItemTranslations, VenueItemTranslations];
}

export interface TimelineItemTranslations {
  time: string;
  title: string;
  subtitle: string;
  iconType: TimelineIconType;
}

export interface TimelineSectionTranslations {
  eyebrow: string;
  title: string;
  items: readonly [
    TimelineItemTranslations,
    TimelineItemTranslations,
    TimelineItemTranslations,
  ];
}

export interface AccommodationSectionTranslations {
  eyebrow: string;
  title: string;
  description: string;
  venueName: string;
  ctaWebsite: string;
  ctaCallPrefix: string;
}

export interface GiftSectionTranslations {
  eyebrow: string;
  title: string;
  message: string;
  holdersLabel: string;
  holdersValue: string;
  ibanBoxLabel: string;
  ctaCopyFormatted: string;
  ctaCopiedFormatted: string;
  ctaCopyRaw: string;
  ctaCopiedRaw: string;
  toastCopiedPrefix: string;
}

export interface FooterSectionTranslations {
  closingQuote: string;
  locationLabel: string;
  backToTop: string;
}

export interface CalendarEventTranslations {
  title: string;
  location: string;
  description: string;
}

export interface CalendarTranslations {
  ceremonia: CalendarEventTranslations;
  celebracion: CalendarEventTranslations;
  full: CalendarEventTranslations;
}

export interface Translations {
  locale: Locale;
  htmlLang: string;
  ogLocale: string;
  languageName: string;
  shortLabel: string;
  meta: MetaTranslations;
  nav: NavTranslations;
  couple: CoupleTranslations;
  date: DateTranslations;
  music: MusicTranslations;
  loader: LoaderTranslations;
  hero: HeroTranslations;
  story: StorySectionTranslations;
  venues: VenuesSectionTranslations;
  timeline: TimelineSectionTranslations;
  accommodation: AccommodationSectionTranslations;
  gift: GiftSectionTranslations;
  footer: FooterSectionTranslations;
  calendar: CalendarTranslations;
}
