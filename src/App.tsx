import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
//import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { VideoSection } from "./components/VideoSection";
import { MusicSection } from "./components/MusicSection";
import { LyricsSection } from "./components/LyricsSection";
import MyActivity from "./components/MyActivity";
import { Footer } from "./components/Footer";
import { CursorParticles } from "./components/CursorParticles";
import { InteractiveMicrophone } from "./components/InteractiveMicrophone";
import { Toaster } from "./components/ui/sonner";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/adminportal/AdminDashBoard";
import HeroSection2 from "./components/HeroSection2";

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
                <HeroSection2 />
                <AboutSection />
                <VideoSection />
                <MusicSection />
                <LyricsSection />
                <MyActivity />
                <Footer />
              </>
            }
          />
          <Route path="/hero2" element={<HeroSection2 />} />

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
