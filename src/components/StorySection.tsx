import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import { motion, useAnimationControls, useInView, MotionConfig } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';
import { WEDDING_CONFIG } from '../i18n';
import { OliveBranchDivider } from './icons/GeekIcons';

interface WindGustPayload {
  gustId: number;
  direction: 'ltr' | 'rtl'; // 'ltr': izquierda a derecha, 'rtl': derecha a izquierda
  baseAngle: number;
  duration: number;
}

const WindContext = createContext<WindGustPayload | null>(null);

interface StoryAnimatedBorderProps {
  src: string;
  alt: string;
  side: 'left' | 'right';
  order: number; // 0: arriba, 1: medio-alto, 2: medio-bajo, 3: abajo
  mass?: number; // Inercia del elemento (árboles/libros más pesados, snitch más ligera)
  className?: string;
  initial?: any;
  whileInView?: any;
  viewport?: any;
  transition?: any;
  transformOrigin?: string;
}

/**
 * Ilustración botánica/geek que responde como mecida por una brisa natural.
 * Se mece en rotación pura con amortiguación elástica suave sin saltos ni traslaciones.
 */
const StoryAnimatedBorder: React.FC<StoryAnimatedBorderProps> = ({
  src,
  alt,
  side,
  order,
  mass = 1.0,
  className = '',
  initial,
  whileInView,
  viewport,
  transition,
  transformOrigin = '50% 85%',
}) => {
  const controls = useAnimationControls();
  const currentGust = useContext(WindContext);

  useEffect(() => {
    if (!currentGust) {
      controls.stop();
      controls.set({ rotate: 0 });
      return;
    }

    const { direction, baseAngle, duration } = currentGust;

    // Si el viento va de izquierda a derecha (ltr), la columna izquierda recibe la brisa primero.
    // Si va de derecha a izquierda (rtl), la columna derecha la recibe primero.
    const isLeadSide =
      (direction === 'ltr' && side === 'left') ||
      (direction === 'rtl' && side === 'right');

    // Retardo para cruzar el ancho de la página (la columna contraria recibe el viento ~360ms después)
    const crossPageDelay = isLeadSide ? 0 : 360 + Math.random() * 50;

    // Retardo vertical natural (las ramas más altas o bajas reciben la ráfaga con ligero decalaje)
    const verticalDelay = order * 65 + (Math.random() * 30 - 15);

    const totalDelay = Math.max(0, crossPageDelay + verticalDelay);

    // Dirección de inclinación física:
    // Viento hacia la derecha (ltr) inclina hacia la derecha (+ ángulo)
    // Viento hacia la izquierda (rtl) inclina hacia la izquierda (- ángulo)
    const sign = direction === 'ltr' ? 1 : -1;

    // Microvariación natural en la flexibilidad de cada elemento (±12%)
    const variation = 0.88 + Math.random() * 0.24;
    const targetAngle = baseAngle * sign * mass * variation;

    // Oscilación pendular de retorno suave como una rama flexible
    const recoilAngle = -targetAngle * 0.32;
    const settleAngle = targetAngle * 0.08;

    let timerId: ReturnType<typeof setTimeout>;

    timerId = setTimeout(async () => {
      try {
        await controls.start({
          rotate: [0, targetAngle, recoilAngle, settleAngle, 0],
          transition: {
            duration,
            ease: 'easeInOut',
            times: [0, 0.33, 0.66, 0.86, 1],
          },
        });
      } catch {
        // Cancelado al desmontar o detener
      }
    }, totalDelay);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentGust, controls, side, order, mass]);

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      className={className}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        animate={controls}
        style={{ transformOrigin }}
        className="w-full h-auto object-contain select-none pointer-events-none will-change-transform"
      />
    </motion.div>
  );
};

export const StorySection: React.FC = () => {
  const { t } = useI18n();
  const { storyBorders } = WEDDING_CONFIG;
  const { borderAlts } = t.story;

  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { margin: '200px 0px 200px 0px' });
  const [currentGust, setCurrentGust] = useState<WindGustPayload | null>(null);

  // Orquestador de viento coordinado para toda la sección
  useEffect(() => {
    if (!isSectionInView) {
      setCurrentGust(null);
      return;
    }

    let isMounted = true;
    let timerId: ReturnType<typeof setTimeout>;

    const scheduleNextGust = () => {
      if (!isMounted) return;

      // Dirección del viento: 68% de las veces viene de la izquierda, 32% de la derecha
      const dir: 'ltr' | 'rtl' = Math.random() > 0.32 ? 'ltr' : 'rtl';

      // Ángulo de balanceo sutil y elegante (entre 1.2° y 1.8°)
      const angle = 1.25 + Math.random() * 0.55;

      // Duración pausada y mecida (2.4s a 2.9s)
      const duration = 2.4 + Math.random() * 0.5;

      setCurrentGust({
        gustId: Date.now() + Math.random(),
        direction: dir,
        baseAngle: angle,
        duration,
      });

      // Ciclo completo: viaje del viento (400ms) + mecida (2700ms) + calma breve entre ráfagas (900ms a 2200ms)
      const nextGustDelay = 400 + duration * 1000 + (900 + Math.random() * 1300);
      timerId = setTimeout(scheduleNextGust, nextGustDelay);
    };

    // Primera brisa suave 400ms después de entrar en visión
    timerId = setTimeout(scheduleNextGust, 400);

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [isSectionInView]);

  return (
    <MotionConfig reducedMotion="never">
      <section
        ref={sectionRef}
        id="historia"
        className="relative isolate pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 overflow-hidden"
      >
        <OliveBranchDivider withPaw />

        <WindContext.Provider value={currentGust}>
          <div className="relative max-w-6xl mx-auto">
            {/* Mobile Top Arch Frame (Straw Hat & Golden Snitch) */}
            <div
              aria-hidden="true"
              className="flex md:hidden justify-between items-start -mx-3 sm:mx-0 mb-2 pointer-events-none select-none"
            >
              <StoryAnimatedBorder
                src={storyBorders.hatTopLeft}
                alt={borderAlts.hatTopLeft}
                side="left"
                order={0}
                transformOrigin="40% 25%"
                initial={{ opacity: 0, x: -16, y: -6 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="w-36 sm:w-44"
              />
              <StoryAnimatedBorder
                src={storyBorders.snitchTopRight}
                alt={borderAlts.snitchTopRight}
                side="right"
                order={0}
                mass={1.15}
                transformOrigin="50% 50%"
                initial={{ opacity: 0, x: 16, y: -6 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="w-36 sm:w-44"
              />
            </div>

            {/* Desktop & Tablet 3-Column Botanical/Geek Frame + Central Story */}
            <div className="relative md:flex md:items-stretch md:justify-between md:gap-6 lg:gap-8">
              {/* Left Illustrated Border Column (Desktop/Tablet) */}
              <div
                className="hidden md:flex flex-col justify-between items-start w-40 lg:w-56 xl:w-64 shrink-0 select-none pointer-events-none"
              >
                <StoryAnimatedBorder
                  src={storyBorders.hatTopLeft}
                  alt={borderAlts.hatTopLeft}
                  side="left"
                  order={0}
                  transformOrigin="40% 25%"
                  initial={{ opacity: 0, x: -24, y: -10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, ease: 'easeOut' }}
                  className="w-40 lg:w-56 xl:w-64 lg:translate-x-4"
                />
                <StoryAnimatedBorder
                  src={storyBorders.treeMidLeft}
                  alt={borderAlts.treeMidLeft}
                  side="left"
                  order={1}
                  mass={0.85}
                  transformOrigin="50% 95%"
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                  className="w-40 lg:w-56 xl:w-64 -my-2"
                />
                <StoryAnimatedBorder
                  src={storyBorders.ringLowLeft}
                  alt={borderAlts.ringLowLeft}
                  side="left"
                  order={2}
                  transformOrigin="40% 65%"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
                  className="w-40 lg:w-56 xl:w-64 lg:translate-x-2"
                />
                <StoryAnimatedBorder
                  src={storyBorders.booksBottomLeft}
                  alt={borderAlts.booksBottomLeft}
                  side="left"
                  order={3}
                  mass={0.8}
                  transformOrigin="40% 95%"
                  initial={{ opacity: 0, x: -24, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  className="w-40 lg:w-56 xl:w-64 lg:translate-x-4"
                />
              </div>

              {/* Central Narrative Content */}
              <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-2 sm:px-6 md:px-4 lg:px-6 py-2 md:py-16 lg:py-24 max-w-xl mx-auto">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-sans-label text-[10px] md:text-xs tracking-[0.28em] uppercase text-[#555B2F]/65 mb-3"
                >
                  {t.story.eyebrow}
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="font-display text-4xl sm:text-5xl md:text-6xl text-[#555B2F] leading-[1.08] max-w-xl mx-auto"
                >
                  {t.story.welcomeHeading}
                </motion.h2>

                {/* Decorative copper heart divider matching the physical invitation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  aria-hidden="true"
                  className="mt-5 mb-2 flex items-center justify-center gap-3 text-[#B86B4B]/75"
                >
                  <span className="h-px w-10 bg-[#555B2F]/25" />
                  <span className="text-sm">♥</span>
                  <span className="h-px w-10 bg-[#555B2F]/25" />
                </motion.div>

                {/* Paragraphs + Mobile Border Vignettes interleaved in flow so they never overlap text */}
                <div className="mt-6 md:mt-10 space-y-6 md:space-y-8 w-full">
                  {/* Paragraph 1 */}
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.1 }}
                    className="font-editorial text-xl sm:text-2xl md:text-[26px] leading-relaxed text-[#555B2F]/90 mx-auto max-w-lg"
                  >
                    {t.story.paragraphs[0]}
                  </motion.p>

                  {/* Mobile Side Borders Pair 1 (Olive Tree & Pink Donut hugging left/right edges between paragraphs) */}
                  <div
                    aria-hidden="true"
                    className="flex md:hidden justify-between items-center -mx-5 sm:-mx-6 py-1 pointer-events-none select-none"
                  >
                    <StoryAnimatedBorder
                      src={storyBorders.treeMidLeft}
                      alt={borderAlts.treeMidLeft}
                      side="left"
                      order={1}
                      mass={0.85}
                      transformOrigin="50% 95%"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="w-36 sm:w-44"
                    />
                    <StoryAnimatedBorder
                      src={storyBorders.donutMidRight}
                      alt={borderAlts.donutMidRight}
                      side="right"
                      order={1}
                      transformOrigin="50% 50%"
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.08 }}
                      className="w-36 sm:w-44"
                    />
                  </div>

                  {/* Paragraph 2 */}
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.2 }}
                    className="font-editorial text-xl sm:text-2xl md:text-[26px] leading-relaxed text-[#555B2F]/90 mx-auto max-w-lg"
                  >
                    {t.story.paragraphs[1]}
                  </motion.p>

                  {/* Paragraph 3 */}
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.3 }}
                    className="font-editorial text-xl sm:text-2xl md:text-[26px] leading-relaxed italic text-[#B86B4B] font-medium mx-auto max-w-lg"
                  >
                    {t.story.paragraphs[2]}
                  </motion.p>

                  {/* Mobile Side Borders Pair 2 (One Ring & Death Star hugging left/right edges before signature) */}
                  <div
                    aria-hidden="true"
                    className="flex md:hidden justify-between items-center -mx-5 sm:-mx-6 py-1 pointer-events-none select-none"
                  >
                    <StoryAnimatedBorder
                      src={storyBorders.ringLowLeft}
                      alt={borderAlts.ringLowLeft}
                      side="left"
                      order={2}
                      transformOrigin="40% 65%"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="w-36 sm:w-44"
                    />
                    <StoryAnimatedBorder
                      src={storyBorders.deathstarLowRight}
                      alt={borderAlts.deathstarLowRight}
                      side="right"
                      order={2}
                      transformOrigin="50% 50%"
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.08 }}
                      className="w-36 sm:w-44"
                    />
                  </div>
                </div>

                {/* Handwritten Signature */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="mt-8 md:mt-14 flex justify-center"
                >
                  <span className="font-hand inline-flex items-baseline justify-center text-4xl sm:text-5xl md:text-6xl leading-none text-[#555B2F]">
                    {t.couple.partner1}
                    <span className="mx-3 md:mx-4 text-[#B86B4B]">
                      {t.couple.conjunction}
                    </span>
                    {t.couple.partner2}
                  </span>
                </motion.div>

                {/* Closing Invitation Tagline at the base of the frame */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                  className="mt-8 md:mt-12 font-sans-label text-[10px] sm:text-xs tracking-[0.26em] uppercase text-[#555B2F]/70"
                >
                  {t.story.closingTagline}
                </motion.p>
              </div>

              {/* Right Illustrated Border Column (Desktop/Tablet) */}
              <div
                className="hidden md:flex flex-col justify-between items-end w-40 lg:w-56 xl:w-64 shrink-0 select-none pointer-events-none"
              >
                <StoryAnimatedBorder
                  src={storyBorders.snitchTopRight}
                  alt={borderAlts.snitchTopRight}
                  side="right"
                  order={0}
                  mass={1.15}
                  transformOrigin="50% 50%"
                  initial={{ opacity: 0, x: 24, y: -10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, delay: 0.05, ease: 'easeOut' }}
                  className="w-40 lg:w-56 xl:w-64 lg:-translate-x-4"
                />
                <StoryAnimatedBorder
                  src={storyBorders.donutMidRight}
                  alt={borderAlts.donutMidRight}
                  side="right"
                  order={1}
                  transformOrigin="50% 50%"
                  initial={{ opacity: 0, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
                  className="w-40 lg:w-56 xl:w-64 -my-2"
                />
                <StoryAnimatedBorder
                  src={storyBorders.deathstarLowRight}
                  alt={borderAlts.deathstarLowRight}
                  side="right"
                  order={2}
                  transformOrigin="50% 50%"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
                  className="w-40 lg:w-56 xl:w-64 lg:-translate-x-2"
                />
                <StoryAnimatedBorder
                  src={storyBorders.suitcaseBottomRight}
                  alt={borderAlts.suitcaseBottomRight}
                  side="right"
                  order={3}
                  mass={0.8}
                  transformOrigin="50% 95%"
                  initial={{ opacity: 0, x: 24, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: 0.22, ease: 'easeOut' }}
                  className="w-40 lg:w-56 xl:w-64 lg:-translate-x-4"
                />
              </div>
            </div>

            {/* Mobile Bottom Arch Frame (Stack of Books & Travel Suitcase) */}
            <div
              aria-hidden="true"
              className="flex md:hidden justify-between items-end -mx-2 sm:mx-0 mt-5 pointer-events-none select-none"
            >
              <StoryAnimatedBorder
                src={storyBorders.booksBottomLeft}
                alt={borderAlts.booksBottomLeft}
                side="left"
                order={3}
                mass={0.8}
                transformOrigin="40% 95%"
                initial={{ opacity: 0, x: -16, y: 6 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="w-36 sm:w-44"
              />
              <StoryAnimatedBorder
                src={storyBorders.suitcaseBottomRight}
                alt={borderAlts.suitcaseBottomRight}
                side="right"
                order={3}
                mass={0.8}
                transformOrigin="50% 95%"
                initial={{ opacity: 0, x: 16, y: 6 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="w-36 sm:w-44"
              />
            </div>
          </div>
        </WindContext.Provider>
      </section>
    </MotionConfig>
  );
};
