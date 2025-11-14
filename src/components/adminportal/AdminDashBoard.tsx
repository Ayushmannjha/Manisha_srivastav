import { useState } from "react";
import {
  LayoutDashboard,
  Film,
  FileText,
  Info,
  Menu,
  X,
  User,
  LogOut,
  
  Star,
} from "lucide-react";

import AdminAboutSection from "./AdminAboutSection";
import AdminVideo from "../adminportal/AdminVideos";
import AdminLyrics from "../adminportal/AdminLryics";
import AdminHeroSection from "./AdminHeroSection";
import AdminMyActivity from "./AdminMyActivity";
import AdminGallerySection from "./AdminGallerySection";

type TabType = "about" | "video" | "lyrics"|"hero"|"myActivity"|"adminGallery";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-purple-800 bg-gradient-to-r from-purple-950/60 to-amber-900/30 shadow-md relative z-20">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle for Mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sm:hidden text-amber-400"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <LayoutDashboard className="hidden sm:block text-amber-400 w-6 h-6" />
          <h1 className="text-lg sm:text-2xl font-semibold">Admin dashboard</h1>
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 p-2 rounded-lg bg-purple-900/20 hover:bg-purple-900/40 transition"
          >
            <User className="w-5 h-5 text-amber-400" />
            <span className="hidden sm:block text-sm font-medium">Admin</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black border border-purple-700 rounded-lg shadow-lg py-1 z-50">
              
              <div className="border-t border-purple-800 my-1" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-purple-900/50 flex items-center gap-2 text-red-400"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`fixed sm:static top-[64px] sm:top-0 left-0 h-[calc(100vh-64px)] sm:h-auto w-60 sm:w-64 bg-gradient-to-b from-purple-950/50 to-black border-r border-purple-900 flex flex-col p-4 gap-3 transform transition-transform duration-300 ease-in-out z-30 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
          }`}
        >
          <button
            onClick={() => {
              setActiveTab("about");
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              activeTab === "about"
                ? "bg-purple-700/60 text-amber-300"
                : "hover:bg-purple-900/50 text-gray-300"
            }`}
          >
            <Info className="w-5 h-5" /> About Section
          </button>

          <button
            onClick={() => {
              setActiveTab("video");
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              activeTab === "video"
                ? "bg-purple-700/60 text-amber-300"
                : "hover:bg-purple-900/50 text-gray-300"
            }`}
          >
            <Film className="w-5 h-5" /> Video Section
          </button>

          <button
            onClick={() => {
              setActiveTab("lyrics");
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              activeTab === "lyrics"
                ? "bg-purple-700/60 text-amber-300"
                : "hover:bg-purple-900/50 text-gray-300"
            }`}
          >
            <FileText className="w-5 h-5" /> Lyrics / Blog
          </button>
           <button
            onClick={() => {
              setActiveTab("hero");
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              activeTab === "hero"
                ? "bg-purple-700/60 text-amber-300"
                : "hover:bg-purple-900/50 text-gray-300"
            }`}
          >
            <Star className="w-5 h-5" /> Intro / Hero Section
          </button>
          <button
            onClick={() => {
              setActiveTab("myActivity");
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              activeTab === "myActivity"
                ? "bg-purple-700/60 text-amber-300"
                : "hover:bg-purple-900/50 text-gray-300"
            }`}
          >
            <Star className="w-5 h-5" /> My Activity
          </button>
          <button
            onClick={() => {
              setActiveTab("adminGallery");
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              activeTab === "adminGallery"
                ? "bg-purple-700/60 text-amber-300"
                : "hover:bg-purple-900/50 text-gray-300"
            }`}
          >
            <Star className="w-5 h-5" /> Gallery
          </button>
        </aside>

        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden z-20"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-y-auto">
          {activeTab === "about" && <AdminAboutSection />}
          {activeTab === "video" && <AdminVideo />}
          {activeTab === "lyrics" && <AdminLyrics />}
          {activeTab==="hero" && <AdminHeroSection/>}
          {activeTab==="myActivity" && <AdminMyActivity/>}
          {activeTab==="adminGallery" && <AdminGallerySection/>}
        </main>
      </div>
    </div>
  );
}
