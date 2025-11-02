import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { VideoSection } from "./components/VideoSection";
import { MusicSection } from "./components/MusicSection";
import { LyricsSection } from "./components/LyricsSection";
import { TourSection } from "./components/TourSection";
import { Footer } from "./components/Footer";
import { CursorParticles } from "./components/CursorParticles";
import { InteractiveMicrophone } from "./components/InteractiveMicrophone";
import { Toaster } from "./components/ui/sonner";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/adminportal/AdminDashBoard";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Common components */}
        <CursorParticles />
        <InteractiveMicrophone />
        <Toaster />

        <Routes>
          {/* Public website route */}
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <HeroSection />
                <AboutSection />
                <VideoSection />
                <MusicSection />
                <LyricsSection />
                <TourSection />
                <Footer />
              </>
            }
          />

          {/* Admin route */}
          <Route path="/admin" element={<AdminLogin />} />
           <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
