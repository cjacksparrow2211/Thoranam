import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ChevronDown, Utensils, ShieldCheck, Award, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 30;

const SLIDES = [
  {
    id: 1,
    tag: "01 / HERITAGE",
    icon: Flame,
    title: "The Art of Culinary Crafting",
    subtitle: "Woodfire & Artisanal Traditions",
    description: "Every signature creation begins with hand-milled spices, woodfire ovens, and heritage cooking techniques preserved for generations.",
    stats: [
      { label: "Slow-Cooked", value: "12 Hours" },
      { label: "Spices", value: "100% Organic" }
    ],
    startRatio: 0,
    endRatio: 0.25
  },
  {
    id: 2,
    tag: "02 / ATMOSPHERE",
    icon: Sparkles,
    title: "Sensory Ambience & Luxury",
    subtitle: "An Unrivalled Dining Atmosphere",
    description: "Step into an ethereal realm illuminated by candlelight, warm golden hues, and custom mixology curated for unforgettable evenings.",
    stats: [
      { label: "Atmosphere", value: "Intimate Gold" },
      { label: "Cocktails", value: "Craft Signature" }
    ],
    startRatio: 0.25,
    endRatio: 0.50
  },
  {
    id: 3,
    tag: "03 / SELECTION",
    icon: Utensils,
    title: "Farm-To-Table Excellence",
    subtitle: "Sourced Daily from Local Artisans",
    description: "We partner exclusively with sustainable organic farms and local fishermen to deliver farm-fresh vibrancy to your plate.",
    stats: [
      { label: "Freshness", value: "Daily Catch" },
      { label: "Sourcing", value: "Local Farms" }
    ],
    startRatio: 0.50,
    endRatio: 0.75
  },
  {
    id: 4,
    tag: "04 / MASTERCLASS",
    icon: Award,
    title: "Unforgettable Flavour Symphony",
    subtitle: "Award-Winning Culinary Journey",
    description: "Indulge in a multi-course gastronomic showcase designed by Michelin-star trained chefs to excite every palate.",
    stats: [
      { label: "Rating", value: "4.9 ★★★★★" },
      { label: "Dishes", value: "40+ Masterpieces" }
    ],
    startRatio: 0.75,
    endRatio: 1.0
  }
];

export default function FrameScrollSlides() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Preload all 30 frame images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/frames/frame_${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setImages(loadedImages);
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setImages(loadedImages);
          setImagesLoaded(true);
        }
      };

      loadedImages.push(img);
    }
  }, []);

  // Draw current frame onto HTML5 Canvas with cover-fit math
  const renderFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[frameIndex]) return;

    const ctx = canvas.getContext('2d');
    const img = images[frameIndex];
    if (!img.complete || img.naturalWidth === 0) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || window.innerWidth;
    canvas.height = rect.height || window.innerHeight;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Aspect ratio fill math (object-fit: cover)
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Initial draw and handle resize
  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(currentFrame);
    }

    const handleResize = () => {
      if (imagesLoaded) {
        renderFrame(currentFrame);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded, currentFrame]);

  // Setup GSAP ScrollTrigger for frame scrubbing & pinning
  useEffect(() => {
    if (!imagesLoaded || !containerRef.current) return;

    const frameObj = { current: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // 300vh scroll height for smooth scrubbing
        pin: true,
        pinSpacing: true, // EXPLICITLY PUSH DOWN SUBSEQUENT SECTIONS TO PREVENT OVERLAPPING
        anticipatePin: 1,
        scrub: 0.5,
        refreshPriority: 1,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          setScrollProgress(progress);

          // Frame index math (0 to 29)
          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(progress * TOTAL_FRAMES)
          );
          
          if (targetFrame !== frameObj.current) {
            frameObj.current = targetFrame;
            setCurrentFrame(targetFrame);
            renderFrame(targetFrame);
          }

          // Active slide index math
          const activeIndex = SLIDES.findIndex(
            (slide) => progress >= slide.startRatio && progress <= slide.endRatio
          );
          if (activeIndex !== -1) {
            setActiveSlideIndex(activeIndex);
          }
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [imagesLoaded]);

  // Jump to specific slide on indicator click
  const scrollToSlide = (index) => {
    if (!containerRef.current) return;
    const targetRatio = SLIDES[index].startRatio + 0.05;
    
    const containerTop = containerRef.current.offsetTop;
    const distance = window.innerHeight * 3; // 300vh
    const targetY = containerTop + distance * targetRatio;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#070709] overflow-hidden text-white select-none z-10 my-0"
    >
      {/* Loading Screen until frames load */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0e]/95 backdrop-blur-md">
          <div className="relative flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin flex items-center justify-center">
              <Utensils className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-center">
              <p className="text-amber-400 font-medium tracking-widest text-xs uppercase mb-1">
                Preparing Visual Experience
              </p>
              <h3 className="font-serif text-2xl text-amber-100">Loading Motion Story</h3>
            </div>
            <div className="w-48 bg-stone-800 rounded-full h-1.5 overflow-hidden border border-amber-500/30">
              <div 
                className="bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 h-full transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="text-xs text-stone-400 font-mono">{loadProgress}%</span>
          </div>
        </div>
      )}

      {/* HTML5 Canvas Background Renderer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500"
      />

      {/* Vignette & Gradient Overlays for High Contrast Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07070a]/95 via-[#07070a]/60 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07070a]/95 via-[#07070a]/80 to-[#07070a]/30 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90 z-[1] pointer-events-none" />

      {/* Top Header Tag & Live Frame Counter */}
      <div className="absolute top-8 left-6 right-6 md:left-12 md:right-12 z-20 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-3 bg-[#120d09]/90 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/40 shadow-2xl pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-amber-200 font-bold">
            Interactive Visual Story
          </span>
        </div>

        <div className="flex items-center gap-3 bg-[#120d09]/90 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/30 shadow-2xl pointer-events-auto font-mono text-xs text-amber-300">
          <span>FRAME</span>
          <span className="text-amber-400 font-black text-sm">{String(currentFrame + 1).padStart(2, '0')}</span>
          <span className="text-stone-400">/</span>
          <span className="font-bold">{TOTAL_FRAMES}</span>
        </div>
      </div>

      {/* Main Slide Overlay Content Cards (Left Column Layout to prevent any overlap) */}
      <div className="absolute inset-0 z-10 flex items-center px-6 md:px-12 lg:px-16 pointer-events-none">
        <div className="max-w-lg lg:max-w-xl w-full">
          {SLIDES.map((slide, index) => {
            const isActive = activeSlideIndex === index;
            const IconComponent = slide.icon;

            return (
              <div
                key={slide.id}
                className={`transition-all duration-700 transform ${
                  isActive 
                    ? 'opacity-100 translate-y-0 relative pointer-events-auto scale-100' 
                    : 'opacity-0 translate-y-8 absolute pointer-events-none scale-95'
                }`}
              >
                {/* High Contrast Slide Card Container */}
                <div className="bg-[#0b0806]/95 backdrop-blur-2xl border-2 border-amber-500/40 p-6 md:p-10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] space-y-6 relative overflow-hidden group">
                  {/* Decorative Glows */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl group-hover:bg-amber-500/25 transition-all" />
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-600/15 rounded-full blur-3xl" />

                  {/* Header Tag */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-widest uppercase shadow-sm">
                      <IconComponent className="w-3.5 h-3.5 text-amber-400" />
                      <span>{slide.tag}</span>
                    </div>

                    <span className="text-amber-400/80 text-xs font-mono font-bold">
                      SLIDE 0{index + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2">
                    <h3 className="text-amber-300 font-semibold text-xs md:text-sm tracking-wider uppercase drop-shadow-md">
                      {slide.subtitle}
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                      {slide.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-amber-50/95 text-sm md:text-base leading-relaxed font-normal drop-shadow-md">
                    {slide.description}
                  </p>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-amber-500/30">
                    {slide.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <span className="text-xs text-amber-300/80 block uppercase font-bold tracking-wider">
                          {stat.label}
                        </span>
                        <span className="text-lg md:text-2xl font-black font-serif text-amber-300 drop-shadow">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Action Button */}
                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        const targetEl = document.getElementById('menu') || document.getElementById('reservation');
                        if (targetEl) {
                          targetEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm transition-all shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Explore Our Signature Experience</span>
                      <Utensils className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Side Navigation Dots */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 bg-[#120d09]/90 backdrop-blur-md p-3 rounded-full border border-amber-500/30 shadow-2xl">
        {SLIDES.map((slide, idx) => {
          const isActive = activeSlideIndex === idx;
          return (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(idx)}
              title={slide.title}
              className="group relative flex items-center justify-center p-1 transition-all cursor-pointer"
            >
              {/* Dot */}
              <span
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-amber-400 scale-125 shadow-lg shadow-amber-500/50'
                    : 'bg-stone-600 group-hover:bg-amber-300/70 scale-90'
                }`}
              />
              
              {/* Tooltip Label */}
              <span className="absolute right-10 whitespace-nowrap bg-stone-900 text-amber-200 text-xs px-3 py-1.5 rounded-lg border border-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl font-serif">
                {slide.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Sticky Scroll Hint & Horizontal Progress Bar */}
      <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-20 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-none">
        {/* Scroll Instruction */}
        <div className="flex items-center gap-2 text-amber-200/90 text-xs font-bold tracking-widest uppercase bg-[#120d09]/90 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/30 shadow-2xl pointer-events-auto">
          <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Scroll down to scrub animation</span>
        </div>

        {/* Global Motion Progress Bar */}
        <div className="w-full md:w-64 bg-[#120d09]/95 backdrop-blur-md p-2 rounded-full border border-amber-500/40 shadow-2xl flex items-center gap-3 pointer-events-auto">
          <div className="flex-1 bg-stone-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 h-full transition-all duration-150"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-xs font-mono text-amber-300 font-bold">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
