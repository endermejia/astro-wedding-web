import React, { useState, useRef, useEffect, useCallback } from 'react';
import { I18nProvider } from '../i18n/I18nContext';
import { WEDDING_CONFIG, type Locale } from '../i18n';
import { OpeningLoader } from './OpeningLoader';
import { HeroSection } from './HeroSection';
import { StorySection } from './StorySection';
import { VenuesSection } from './VenuesSection';
import { TimelineSection } from './TimelineSection';
import { AccommodationSection } from './AccommodationSection';
import { GiftSection } from './GiftSection';
import { FooterSection } from './FooterSection';
import { FloatingControls } from './FloatingControls';

const WeddingExperienceContent: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // The body starts locked in the static HTML to prevent the scrollbar flashing before hydration.
  useEffect(() => {
    if (!hasEntered) {
      document.body.setAttribute('data-invitation-locked', '');
    } else {
      document.body.removeAttribute('data-invitation-locked');
    }
    return () => {
      document.body.removeAttribute('data-invitation-locked');
    };
  }, [hasEntered]);

  const handleStartAudio = useCallback((withMusic: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;
    if (withMusic) {
      audio.muted = false;
      setIsMuted(false);
      if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              setIsPlaying(false);
            });
        }
      } else {
        setIsPlaying(true);
      }
    } else {
      audio.muted = true;
      setIsMuted(true);
      setIsPlaying(false);
    }
  }, []);

  const handleEnter = useCallback(
    (withMusic: boolean) => {
      handleStartAudio(withMusic);
      setHasEntered(true);
    },
    [handleStartAudio]
  );

  const handleToggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.muted = false;
      audio.volume = 0.55;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {});
    } else {
      const nextMuted = !audio.muted;
      audio.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FCF8F0] text-[#555B2F]">
      {/* Persistent Audio Element */}
      <audio ref={audioRef} loop preload="auto" aria-hidden="true">
        {WEDDING_CONFIG.music.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </audio>

      {/* Initial Loading & Wax Seal Entrance Screen */}
      <OpeningLoader
        isOpen={hasEntered}
        onStartAudio={handleStartAudio}
        onEnter={handleEnter}
      />

      {/* Floating Navigation, Language Switcher & Music Toggle */}
      {hasEntered && (
        <FloatingControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {/* Main Wedding Page Content */}
      <main>
        <HeroSection />
        <StorySection />
        <VenuesSection />
        <TimelineSection />
        <AccommodationSection />
        <GiftSection />
      </main>

      <FooterSection />
    </div>
  );
};

export const WeddingExperience: React.FC<{ initialLocale?: Locale }> = ({ initialLocale }) => (
  <I18nProvider initialLocale={initialLocale}>
    <WeddingExperienceContent />
  </I18nProvider>
);
