import type { Translations } from '../types';

/**
 * Valencià — Diccionari complet de traduccions adaptat a Elx i Crevillent.
 */
export const va: Translations = {
  locale: 'va',
  htmlLang: 'ca-valencia',
  ogLocale: 'ca_ES',
  languageName: 'Valencià',
  shortLabel: 'VA',

  meta: {
    title: 'Iris & Adela · 13 de març de 2027',
    description:
      "Ens casem! Dissabte 13 de març de 2027 · Ajuntament d'Elx i Las Palmeras Resort (Crevillent).",
    author: 'Iris & Adela',
  },

  nav: {
    ariaLabel: 'Navegació principal',
    languageSelectorAria: 'Seleccionar idioma',
    openMenuAria: 'Obrir menú de navegació',
    closeMenuAria: 'Tancar menú de navegació',
    menuTitle: 'Menú',
    items: {
      home: 'Inici',
      story: 'Història',
      venues: 'Llocs',
      timeline: 'Horaris',
      accommodation: 'Allotjament',
      gift: 'Regal',
    },
  },

  couple: {
    partner1: 'Iris',
    partner2: 'Adela',
    conjunction: 'i',
    symbolicConjunction: '&',
    monogram: 'I & A',
  },

  date: {
    day: '13',
    monthNumber: '3',
    monthName: 'MARÇ',
    year: '2027',
    dottedFormat: '13 · MARÇ · 2027',
    fullDateLabel: '13 de març de 2027',
  },

  music: {
    playingLabel: 'Música',
    mutedLabel: 'Silenci',
    ariaMute: 'Silenciar música de fons',
    ariaUnmute: 'Activar música de fons',
  },

  loader: {
    envelopeLabel: 'Invitació de boda',
    letterGreeting: 'La nostra gran aventura',
    loadingProgress: 'Preparant la vostra invitació...',
    enterWithMusic: 'Obrir amb música',
    enterWithoutMusic: 'Obrir sense música',
    sealAriaLabel: "Obrir carta d'invitació d'Iris i Adela",
  },

  hero: {
    invitationIntro: 'Volem compartir amb vosaltres este dia tan especial',
    units: {
      days: 'Dies',
      hours: 'Hores',
      minutes: 'Min',
      seconds: 'Seg',
    },
    ctaAddToCalendar: 'Afegir al calendari',
    ctaGoogleCalendar: 'Google Calendar',
    ctaIcsDownload: 'Apple / Outlook (.ics)',
    scrollDownAria: 'Desplaçar-se cap avall',
  },

  story: {
    eyebrow: 'Xicotets moments que fan grans històries',
    welcomeHeading: 'La nostra gran aventura',
    paragraphs: [
      'Després de molts capítols juntes, pel·lícules vistes, camins recorreguts i aventures compartides, hem decidit fer el següent gran pas.',
      'Entre rialles, somnis i uns quants miols a casa, hem construït la nostra pròpia història… i ara volem celebrar-la amb les persones que fan que el nostre món siga encara més especial.',
      'Tota gran aventura necessita una tripulació. Gràcies per formar part de la nostra.',
    ],
    closingTagline: 'Distints camins, la mateixa direcció.',
    borderAlts: {
      hatTopLeft: 'Il·lustració de capell de palla amb flors de jonc blau, petxina, caragola i estrela de mar',
      snitchTopRight: 'Il·lustració de snitch daurada entrellaçada amb espigues morades de viperina',
      treeMidLeft: "Il·lustració d'olivera amb fotografies polaroid i càmera retro",
      donutMidRight: 'Il·lustració de rosquilla rosa envoltada de rametes de romer en flor',
      ringLowLeft: "Il·lustració de l'Anell Únic, notes musicals i rametes de timó en flor",
      deathstarLowRight: "Il·lustració de l'Estrela de la Mort i caça estel·lar entre rames d'olivera",
      booksBottomLeft: "Il·lustració de pila de llibres (La Casa de los Espíritus, Luces de Bohemia i Sólo los Valientes) coronats per rames d'ametler en flor, amb petxines, caragola i estrela de mar a l'arena",
      suitcaseBottomRight: "Il·lustració de maleta de viatge vintage amb dos gats, brúixola amb petjada felina, espígol i petxines, caragola i estrela de mar sobre l'arena",
    },
  },

  venues: {
    eyebrow: 'On i quan',
    title: 'Llocs',
    ctaDirections: 'Com arribar',
    ctaCopyAddress: 'Copiar adreça',
    ctaCopiedAddress: 'Copiada!',
    items: [
      {
        id: 'ceremonia',
        title: 'Cerimònia',
        time: '12:30 h',
        venueName: "Ajuntament d'Elx",
        addressLine1: 'Plaça de Baix, 1',
        addressLine2: '03202 Elx, Alacant',
        fullAddress: "Ajuntament d'Elx, Plaça de Baix, 1, 03202 Elx, Alacant",
        imageAlt: "Il·lustració de l'Ajuntament d'Elx a la Plaça de Baix",
      },
      {
        id: 'celebracion',
        title: 'Celebració',
        time: '14:30 h',
        venueName: 'Las Palmeras Resort',
        addressLine1: 'Carrer Gutiérrez de Cárdenas, N-340a, Km 708',
        addressLine2: '03330 Crevillent, Alacant',
        fullAddress:
          'Las Palmeras Resort, Carrer Gutiérrez de Cárdenas, N-340a, Km 708, 03330 Crevillent, Alacant',
        imageAlt: 'Il·lustració de Las Palmeras Resort a Crevillent',
      },
    ],
  },

  timeline: {
    eyebrow: 'Programa',
    title: 'El Gran Dia',
    items: [
      {
        time: '12:30 H',
        title: 'Cerimònia',
        subtitle: "Ajuntament d'Elx",
        iconType: 'ring',
      },
      {
        time: '14:30 H',
        title: 'Celebració',
        subtitle: 'Las Palmeras Resort (Crevillent)',
        iconType: 'ship',
      },
      {
        time: '21:30 H',
        title: 'Ressopó i barra lliure',
        subtitle: 'Perquè continue la festa',
        iconType: 'donut',
      },
    ],
  },

  accommodation: {
    eyebrow: 'Per al vostre descans',
    title: 'Allotjament',
    description:
      'Al restaurant hi ha habitacions i bungalows per a major comoditat de qui s’allotge.',
    venueName: 'Las Palmeras Resort',
    ctaWebsite: 'Veure web del resort',
    ctaCallPrefix: 'Telefonar',
  },

  gift: {
    eyebrow: 'Detall de boda',
    title: 'Regal',
    message:
      'La vostra presència és el nostre major regal, però si voleu tindre un detall amb nosaltres:',
    holdersLabel: 'Titulars:',
    holdersValue: 'Iris i Adela',
    ibanBoxLabel: 'Número de compte (IBAN)',
    ctaCopyFormatted: 'Copiar IBAN',
    ctaCopiedFormatted: 'IBAN copiat!',
    ctaCopyRaw: 'Copiar sense espais',
    ctaCopiedRaw: 'Copiat sense espais!',
    toastCopiedPrefix: 'Copiat al porta-retalls:',
  },

  footer: {
    closingQuote: 'Gràcies a tots per vindre! Vos estimem molt!',
    locationLabel: 'Elx · Crevillent',
    backToTop: 'Tornar amunt',
  },

  calendar: {
    ceremonia: {
      title: "Boda d'Iris & Adela — Cerimònia",
      location: "Ajuntament d'Elx, Plaça de Baix, 1, 03202 Elx, Alacant",
      description:
        "Cerimònia civil d'Iris i Adela a les 12:30 h a l'Ajuntament d'Elx (Plaça de Baix, 1).",
    },
    celebracion: {
      title: "Boda d'Iris & Adela — Celebració i Festa",
      location:
        'Las Palmeras Resort, Carrer Gutiérrez de Cárdenas, N-340a, Km 708, 03330 Crevillent, Alacant',
      description:
        'Celebració a les 14:30 h a Las Palmeras Resort (Crevillent). A les 21:30 h hi haurà ressopó i barra lliure.',
    },
    full: {
      title: "Boda d'Iris & Adela (13 de març de 2027)",
      location:
        "Ajuntament d'Elx (12:30 h) i Las Palmeras Resort, Crevillent (14:30 h)",
      description:
        "Ens casem! 12:30 h Cerimònia a l'Ajuntament d'Elx (Plaça de Baix, 1) · 14:30 h Celebració a Las Palmeras Resort (Crevillent) · 21:30 h Ressopó i barra lliure.",
    },
  },
};
