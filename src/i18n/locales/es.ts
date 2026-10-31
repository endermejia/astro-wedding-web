import type { Translations } from '../types';

/**
 * Español (Castellano) — Diccionario principal de traducciones.
 */
export const es: Translations = {
  locale: 'es',
  htmlLang: 'es',
  ogLocale: 'es_ES',
  languageName: 'Castellano',
  shortLabel: 'ES',

  meta: {
    title: 'Iris & Adela · 13 de marzo de 2027',
    description:
      '¡Nos casamos! Sábado 13 de marzo de 2027 · Ayuntamiento de Elche y Las Palmeras Resort (Crevillent).',
    author: 'Iris & Adela',
  },

  nav: {
    ariaLabel: 'Navegación principal',
    languageSelectorAria: 'Seleccionar idioma',
    openMenuAria: 'Abrir menú de navegación',
    closeMenuAria: 'Cerrar menú de navegación',
    menuTitle: 'Menú',
    items: {
      home: 'Inicio',
      story: 'Historia',
      venues: 'Lugares',
      timeline: 'Horarios',
      accommodation: 'Alojamiento',
      gift: 'Regalo',
    },
  },

  couple: {
    partner1: 'Iris',
    partner2: 'Adela',
    conjunction: 'y',
    symbolicConjunction: '&',
    monogram: 'I & A',
  },

  date: {
    day: '13',
    monthNumber: '3',
    monthName: 'MARZO',
    year: '2027',
    dottedFormat: '13 · MARZO · 2027',
    fullDateLabel: '13 de marzo de 2027',
  },

  music: {
    playingLabel: 'Música',
    mutedLabel: 'Silencio',
    ariaMute: 'Silenciar música de fondo',
    ariaUnmute: 'Activar música de fondo',
  },

  loader: {
    envelopeLabel: 'Invitación de boda',
    letterGreeting: 'Nuestra gran aventura',
    loadingProgress: 'Preparando vuestra invitación...',
    enterWithMusic: 'Abrir con música',
    enterWithoutMusic: 'Abrir sin música',
    sealAriaLabel: 'Abrir carta de invitación de Iris y Adela',
  },

  hero: {
    invitationIntro: 'Queremos compartir con vosotros este día tan especial',
    units: {
      days: 'Días',
      hours: 'Horas',
      minutes: 'Min',
      seconds: 'Seg',
    },
    ctaAddToCalendar: 'Añadir al calendario',
    ctaGoogleCalendar: 'Google Calendar',
    ctaIcsDownload: 'Apple / Outlook (.ics)',
    scrollDownAria: 'Desplazarse hacia abajo',
  },

  story: {
    eyebrow: 'Pequeños momentos que hacen grandes historias',
    welcomeHeading: 'Nuestra gran aventura',
    paragraphs: [
      'Después de muchos capítulos juntas, películas vistas, caminos recorridos y aventuras compartidas, hemos decidido dar el siguiente gran paso.',
      'Entre risas, sueños y unos cuantos maullidos en casa, hemos construido nuestra propia historia… y ahora queremos celebrarla con las personas que hacen que nuestro mundo sea aún más especial.',
      'Toda gran aventura necesita una tripulación. Gracias por formar parte de la nuestra.',
    ],
    closingTagline: 'Distintos caminos, la misma dirección.',
    borderAlts: {
      hatTopLeft: 'Ilustración de sombrero de paja entre ramas de olivo',
      snitchTopRight: 'Ilustración de snitch dorada entre ramas de olivo',
      treeMidLeft: 'Ilustración de olivo con fotografías polaroid y cámara retro',
      donutMidRight: 'Ilustración de rosquilla rosa entre ramas de olivo',
      ringLowLeft: 'Ilustración del Anillo Único, notas musicales y ramas de olivo',
      deathstarLowRight: 'Ilustración de la Estrella de la Muerte y caza estelar entre ramas de olivo',
      booksBottomLeft: 'Ilustración de pila de libros de aventuras y caracolas de mar',
      suitcaseBottomRight: 'Ilustración de maleta de viaje vintage y brújula con huella felina',
    },
  },

  venues: {
    eyebrow: 'Dónde y cuándo',
    title: 'Lugares',
    ctaOpenMaps: 'Cómo llegar en Google Maps',
    ctaShowMap: 'Ver mapa',
    ctaHideMap: 'Ocultar mapa',
    ctaCopyAddress: 'Copiar dirección',
    ctaCopiedAddress: '¡Copiada!',
    ctaCalendar: 'Agendar',
    items: [
      {
        id: 'ceremonia',
        title: 'Ceremonia',
        time: '12:30 h',
        venueName: 'Ayuntamiento de Elche',
        addressLine1: 'Plaza de Baix, 1',
        addressLine2: '03202 Elche, Alicante',
        fullAddress: 'Ayuntamiento de Elche, Plaza de Baix, 1, 03202 Elche, Alicante',
        imageAlt: 'Ilustración del Ayuntamiento de Elche en la Plaza de Baix',
        mapIframeTitle: 'Mapa de ubicación del Ayuntamiento de Elche',
      },
      {
        id: 'celebracion',
        title: 'Celebración',
        time: '14:30 h',
        venueName: 'Las Palmeras Resort',
        addressLine1: 'Carrer Gutiérrez de Cárdenas, N-340a, Km 708',
        addressLine2: '03330 Crevillent, Alicante',
        fullAddress:
          'Las Palmeras Resort, Carrer Gutiérrez de Cárdenas, N-340a, Km 708, 03330 Crevillent, Alicante',
        imageAlt: 'Ilustración de Las Palmeras Resort en Crevillent',
        mapIframeTitle: 'Mapa de ubicación de Las Palmeras Resort en Crevillent',
      },
    ],
  },

  timeline: {
    eyebrow: 'Programa',
    title: 'El Gran Día',
    items: [
      {
        time: '12:30 H',
        title: 'Ceremonia',
        subtitle: 'Ayuntamiento de Elche',
        iconType: 'ring',
      },
      {
        time: '14:30 H',
        title: 'Celebración',
        subtitle: 'Las Palmeras Resort (Crevillent)',
        iconType: 'ship',
      },
      {
        time: '21:30 H',
        title: 'Resopón y barra libre',
        subtitle: 'Para que continúe la fiesta',
        iconType: 'donut',
      },
    ],
  },

  accommodation: {
    eyebrow: 'Para vuestro descanso',
    title: 'Alojamiento',
    description:
      'En el restaurante hay habitaciones y bungalows para mayor comodidad de quien se aloje.',
    venueName: 'Las Palmeras Resort',
    ctaWebsite: 'Ver web del resort',
    ctaCallPrefix: 'Llamar',
  },

  gift: {
    eyebrow: 'Detalle de boda',
    title: 'Regalo',
    message:
      'Vuestra presencia es nuestro mayor regalo, pero si queréis tener un detalle con nosotras:',
    holdersLabel: 'Titulares:',
    holdersValue: 'Iris y Adela',
    ibanBoxLabel: 'Número de cuenta (IBAN)',
    ctaCopyFormatted: 'Copiar IBAN',
    ctaCopiedFormatted: '¡IBAN copiado!',
    ctaCopyRaw: 'Copiar sin espacios',
    ctaCopiedRaw: '¡Copiado sin espacios!',
    toastCopiedPrefix: 'Copiado al portapapeles:',
  },

  footer: {
    closingQuote: '¡Gracias a todos por venir! ¡Os queremos mucho!',
    locationLabel: 'Elche · Crevillent',
    backToTop: 'Volver arriba',
  },

  calendar: {
    ceremonia: {
      title: 'Boda de Iris & Adela — Ceremonia',
      location: 'Ayuntamiento de Elche, Plaza de Baix, 1, 03202 Elche, Alicante',
      description:
        'Ceremonia civil de Iris y Adela a las 12:30 h en el Ayuntamiento de Elche (Plaza de Baix, 1).',
    },
    celebracion: {
      title: 'Boda de Iris & Adela — Celebración y Fiesta',
      location:
        'Las Palmeras Resort, Carrer Gutiérrez de Cárdenas, N-340a, Km 708, 03330 Crevillent, Alicante',
      description:
        'Celebración a las 14:30 h en Las Palmeras Resort (Crevillent). A las 21:30 h habrá resopón y barra libre.',
    },
    full: {
      title: 'Boda de Iris & Adela (13 de marzo de 2027)',
      location:
        'Ayuntamiento de Elche (12:30 h) y Las Palmeras Resort, Crevillent (14:30 h)',
      description:
        '¡Nos casamos! 12:30 h Ceremonia en el Ayuntamiento de Elche (Plaza de Baix, 1) · 14:30 h Celebración en Las Palmeras Resort (Crevillent) · 21:30 h Resopón y barra libre.',
    },
  },
};
