# Manisha Srivastav - Portfolio Website Implementation

## 🎵 Overview
A stunning, immersive portfolio website for Indian singer Manisha Srivastav featuring sophisticated 3D animations, concert-like atmosphere, and elegant design.

## ✨ Key Features

### 1. **Hero Section**
- **Full-screen stage-like banner** with dark gradient background (black to deep purple)
- **3D Interactive Elements** (Three.js powered):
  - Floating golden music notes that follow cursor movement
  - Metallic microphones with rotation effects
  - Colored spotlight beams (purple, pink, gold)
  - 1500+ particles with wave animations
- **Singer portrait** with glowing circular frame and spotlight effects
- **Elegant typography** with gradient text (gold → purple → pink)
- **Golden CTAs** with glowing hover effects
- **Responsive cursor tracking** - all 3D elements react to mouse movement

### 2. **Video Section**
- **YouTube embed** with main video player
- **Horizontal scrolling carousel** for video thumbnails
- **Soft glowing borders** with purple/pink/gold gradients
- **Floating particle effects** in background
- **Corner accent lights** on video player
- **Smooth animations** on thumbnail hover

### 3. **About Section**
- **3D Glowing Microphone** animation beside biography
- **Spotlight effect** on portrait image
- **Musical dividers** with music note icons
- **Animated waveforms** in background (subtle)
- **Stats cards** with hover glow effects
- **Golden quote accent** with gradient background

### 4. **Music Section**
- **3D Vinyl Record Player** with:
  - Realistic grooves and textures
  - Faster spinning when playing
  - Golden center label with emissive glow
  - **Particle trails** when hovered
  - Spotlight effects
- **Interactive player controls** with golden gradients
- **Album grid** with selection states
- **Playing indicators** with animated bars
- **Track listings** with hover effects

### 5. **Lyrics & Blog Section**
- **Floating musical symbols** (♪ ♫ ♬) in background
- **Animated SVG waveforms** 
- **Card layout** with golden category badges
- **Smooth reveal animations** on scroll
- **Gradient borders** on hover
- **Corner accent lights**

### 6. **Tour/Events Section**
- **Stage-light hover effects** on event cards
- **Spotlight beams** appearing on hover (left, right, top)
- **Animated date cards** with golden gradients
- **Status badges** with appropriate colors
- **Bottom spotlight line** animation
- **Glowing ticket buttons**

### 7. **Footer**
- **Audio equalizer animation** (50 bars with wave motion)
- **Animated wave patterns** at top border
- **Social media icons** with glow effects
- **Newsletter signup** with gradient border
- **Quick links** with animated underlines
- **Gradient background glows**

### 8. **Cursor Particle Effect**
- **Spirit trail** following cursor movement
- **Colored particles** (purple, pink, gold)
- **Physics-based** (velocity, gravity, fade-out)
- **Blend mode** for magical glow
- **Performance optimized** (max 100 particles)

### 9. **Navigation**
- **Sticky top menu** with blur backdrop
- **Golden gradient logo** with glow effect
- **Animated underlines** on hover
- **Mobile responsive** with hamburger menu
- **Scroll-based styling** changes

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000)
- **Accent Gold**: #fbbf24 (Amber-400)
- **Accent Purple**: #a855f7 (Purple-500)
- **Accent Pink**: #ec4899 (Pink-500)
- **Gradients**: Smooth transitions between gold, purple, and pink

### Typography
- **Headings**: Serif font (elegant, concert poster style)
- **Body**: Sans-serif (modern, clean)
- **Gradient text**: Gold → Purple → Pink on all major headings

### Effects
- **Glow shadows**: `shadow-[0_0_30px_rgba(251,191,36,0.5)]`
- **Blur backgrounds**: `backdrop-blur-sm/lg`
- **Smooth transitions**: 300-700ms durations
- **Hover scales**: 1.05-1.10
- **Border glows**: 2px solid with opacity variations

## 🎯 3D Elements (Three.js)

### Hero Section 3D Scene
- **Music Notes**: Floating spheres with cylindrical stems (golden material)
- **Microphones**: Sphere head + cylinder body (metallic materials)
- **Spotlight Beams**: Cone geometry with transparency
- **Particles**: 1500 points with wave animations
- **Lighting**: 3 point lights + 1 spotlight

### Music Section 3D Vinyl
- **Main Disc**: Cylinder geometry (black, metallic)
- **Center Label**: Golden cylinder with emissive material
- **Grooves**: 20 torus rings
- **Particle Trail**: 50 points orbiting when hovered
- **Dynamic Lighting**: Changes intensity when playing

### About Section 3D Microphone
- **Glowing Sphere**: Pulsing opacity animation
- **Metallic Mic**: High metalness/low roughness materials
- **Background Rings**: Rotating torus geometries
- **Point Lights**: Golden and purple accent lights

## 📱 Responsive Design
- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Flexible grids**: 1-2-3-4 column layouts
- **Touch-friendly**: Hover effects work on mobile
- **Optimized images**: Using Unsplash with proper sizing

## ⚡ Performance Optimizations
- **Intersection Observer**: Animations trigger on scroll
- **React useRef**: Efficient 3D scene updates
- **Memoized geometries**: useMemo for particle positions
- **Throttled updates**: 60fps frame limiting
- **Lazy animations**: Delayed transitions for smooth load

## 🎭 Animation Patterns
- **Entrance animations**: Fade + translate (opacity + transform)
- **Staggered delays**: Sequential timing (100ms intervals)
- **Hover effects**: Scale + glow + translate
- **3D rotations**: Smooth lerp interpolation
- **Particle systems**: Sine wave patterns

## 🛠️ Technologies
- **React** + TypeScript
- **Three.js** + React Three Fiber
- **Tailwind CSS** v4.0
- **Shadcn/ui** components
- **Lucide React** icons
- **Unsplash** for images

## 📂 File Structure
```
/components
  ├── HeroSection.tsx       # 3D concert scene + hero content
  ├── VideoSection.tsx      # YouTube embed + carousel
  ├── AboutSection.tsx      # Bio + 3D microphone
  ├── MusicSection.tsx      # 3D vinyl player + albums
  ├── LyricsSection.tsx     # Blog posts + floating symbols
  ├── TourSection.tsx       # Events + stage lights
  ├── Footer.tsx            # Equalizer + social links
  ├── Navigation.tsx        # Sticky nav bar
  └── CursorParticles.tsx   # Spirit cursor effect
```

## 🎨 Custom Styling
- **Scrollbar**: Gold-purple gradient with glow on hover
- **Animations**: Custom @keyframes for waves, float, equalizer
- **Shadows**: Multiple layered box-shadows for depth
- **Gradients**: Radial and linear for lighting effects

## 🚀 Future Enhancements
- Connect to real YouTube API
- Add actual music player integration (Spotify/SoundCloud)
- Implement blog CMS
- Add ticket booking integration
- Email newsletter subscription backend
- Contact form with backend

---

**Built with ❤️ and 🎵 for Manisha Srivastav**
