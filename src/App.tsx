import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { VideoSection } from './components/VideoSection';
import { MusicSection } from './components/MusicSection';
import { LyricsSection } from './components/LyricsSection';
import { TourSection } from './components/TourSection';
import { Footer } from './components/Footer';
import { CursorParticles } from './components/CursorParticles';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <CursorParticles />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <VideoSection />
      <MusicSection />
      <LyricsSection />
      <TourSection />
      <Footer />
      <Toaster />
    </div>
  );
}
