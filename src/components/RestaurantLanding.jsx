import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight, 
  Utensils, 
  ArrowRight, 
  Menu, 
  X, 
  Heart,
  Award,
  Users,
  Search,
  ThumbsUp,
  Bell,
  CheckCircle,
  Flame,
  Gift
} from 'lucide-react';
import Shuffle from './Shuffle';
import ScrollFloat from './ScrollFloat';
import Particles from './Particles';
import GradualBlur from './GradualBlur';
import ImageTrail from './ImageTrail';
import VariableProximity from './VariableProximity';
import BlurText from './BlurText';
import ScrollReveal from './ScrollReveal';
import FrameScrollSlides from './FrameScrollSlides';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Food images
const IMAGES = {
  heroBg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600", // Welcoming restaurant
  aboutSide: "https://images.unsplash.com/photo-1585938338392-50a59970d2ee?q=80&w=1000", // Indian curry and breads
  starters: [
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=500", // Samosa/Fried starter
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=500", // Paneer tikka
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=500", // Kebab starter
    "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=500"  // Crispy stem/vegetable starter
  ],
  mainCourse: [
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=500", // Biryani
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=500", // Curry mutton/chicken
    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=500", // Paneer butter masala
    "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=500"  // Dal Makhani
  ],
  specials: [
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=500", // Traditional Thali
    "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?q=80&w=500", // Bamboo cooked/exotic curry
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=500"  // Tangy Gutti Vankaya style
  ],
  desserts: [
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=500", // Sweet Payasam style
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500", // Apricot dessert/sweet
    "https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=500"  // Shahi Tukda style
  ]
};

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600",
  "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600",
  "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=600",
  "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600",
  "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600",
  "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=600",
  "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600",
  "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600"
];

const MENU_DATA = {
  starters: [
    {
      id: "s1",
      name: "Thoranam Chicken Keema Balls",
      price: 220,
      description: "Spiced minced chicken balls fried to golden perfection, served with house mint chutney.",
      isVeg: false,
      image: IMAGES.starters[0],
      isPopular: true
    },
    {
      id: "s2",
      name: "Paneer Tikka Angara",
      price: 180,
      description: "Cubes of fresh paneer marinated in fiery tandoori spices and charred in clay oven.",
      isVeg: true,
      image: IMAGES.starters[1],
      isPopular: true
    },
    {
      id: "s3",
      name: "Crispy Lotus Stem",
      price: 160,
      description: "Thinly sliced lotus stem tossed in honey chili glaze and garnished with toasted sesame.",
      isVeg: true,
      image: IMAGES.starters[2],
      isPopular: false
    },
    {
      id: "s4",
      name: "Tandoori Malai Broccoli",
      price: 190,
      description: "Broccoli florets marinated in cardamom flavored cream cheese and gently grilled.",
      isVeg: true,
      image: IMAGES.starters[3],
      isPopular: false
    }
  ],
  main: [
    {
      id: "m1",
      name: "Thoranam Special Chicken Dum Biryani",
      price: 290,
      description: "Aromatic basmati rice layered with succulent chicken, caramelized onions, and slow-cooked in traditional dum style.",
      isVeg: false,
      image: IMAGES.mainCourse[0],
      isPopular: true
    },
    {
      id: "m2",
      name: "Gongura Mutton Curry",
      price: 340,
      description: "Traditional spicy mutton curry infused with tangy sorrel leaves (gongura) - a signature Telangana specialty.",
      isVeg: false,
      image: IMAGES.mainCourse[1],
      isPopular: true
    },
    {
      id: "m3",
      name: "Paneer Butter Masala",
      price: 240,
      description: "Rich and creamy cottage cheese curry cooked in pure butter, sweet tomato gravy, and cashew sauce.",
      isVeg: true,
      image: IMAGES.mainCourse[2],
      isPopular: false
    },
    {
      id: "m4",
      name: "Dal Makhani Thoranam",
      price: 210,
      description: "Slow-cooked black lentils simmered overnight with butter, fresh cream, and a signature hint of woodsmoke.",
      isVeg: true,
      image: IMAGES.mainCourse[3],
      isPopular: true
    }
  ],
  specials: [
    {
      id: "sp1",
      name: "Royal Telangana Thali",
      price: 390,
      description: "A grand feast including local curries, sambar, house-made gongura pickle, raita, freshly baked breads, and sweet payasam.",
      isVeg: true,
      image: IMAGES.specials[0],
      isPopular: true
    },
    {
      id: "sp2",
      name: "Bamboo Chicken (Adivi Style)",
      price: 310,
      description: "Succulent chicken chunks seasoned with forest herbs, stuffed in hollow bamboo shoots, and slow-roasted on charcoal.",
      isVeg: false,
      image: IMAGES.specials[1],
      isPopular: true
    },
    {
      id: "sp3",
      name: "Gutti Vankaya Masala",
      price: 220,
      description: "Baby eggplants stuffed with a dry-roasted sesame, peanut, and coconut masala paste, simmered in a tangy gravy.",
      isVeg: true,
      image: IMAGES.specials[2],
      isPopular: false
    }
  ],
  desserts: [
    {
      id: "d1",
      name: "Elaneer Payasam",
      price: 130,
      description: "Delicate and refreshing South Indian dessert made with fresh tender coconut pulp, condensed milk, and cardamom.",
      isVeg: true,
      image: IMAGES.desserts[0],
      isPopular: true
    },
    {
      id: "d2",
      name: "Warangal Apricot Delight",
      price: 160,
      description: "A legendary local dessert. Sweet stewed dried apricots layered with smooth custard and soft sponge cake.",
      isVeg: true,
      image: IMAGES.desserts[1],
      isPopular: true
    },
    {
      id: "d3",
      name: "Shahi Tukda with Rabri",
      price: 140,
      description: "Ghee-fried bread slices soaked in cardamom-infused saffron syrup and topped with rich, slow-reduced milk rabri.",
      isVeg: true,
      image: IMAGES.desserts[2],
      isPopular: false
    }
  ]
};

const REVIEWS = [
  {
    name: "Suresh K. Kumar",
    role: "Local Guide",
    stars: 5,
    date: "2 weeks ago",
    comment: "The Thoranam Special Dum Biryani is out of this world! Traditional flavors that feel exceptionally authentic. The atmosphere is warm, elegant and very inviting. Pricing is great for this level of taste.",
    likes: 24
  },
  {
    name: "Priya Murthy",
    role: "Food Blogger",
    stars: 5,
    date: "1 month ago",
    comment: "Absolutely in love with the Gongura Mutton and gutti vankaya curry! Unbelievable taste at a very reasonable price. We had the Royal Thali and every single component was outstanding. Beautiful interior layout too!",
    likes: 38
  },
  {
    name: "Rajesh Velu",
    role: "Regular Customer",
    stars: 4.5,
    date: "3 days ago",
    comment: "Great service and great food. The pricing is perfectly between ₹200-400 per person. Ideal place to visit with families. Highly recommend their Apricot Delight for dessert!",
    likes: 12
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// Phone Mockup Section — isolated component so hooks are called at top level
// ─────────────────────────────────────────────────────────────────────────────
function PhoneMockupSection() {
  const phoneSectionRef = useRef(null);
  const bgLayerRef = useRef(null);
  const phoneRef = useRef(null);
  const leftCopyRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = phoneSectionRef.current;
      if (!section) return;

      // Timeline: bg scales + blurs out while phone slides/zooms in
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2.5,
        }
      });

      // Background layer: parallax scale + progressive blur
      tl.fromTo(bgLayerRef.current,
        { scale: 1, filter: 'blur(0px)', opacity: 1 },
        { scale: 1.18, filter: 'blur(18px)', opacity: 0.55, ease: 'none' },
        0
      );

      // Phone: starts small + offset → zooms into centre
      tl.fromTo(phoneRef.current,
        { yPercent: 55, scale: 0.72, opacity: 0, rotateY: -12 },
        { yPercent: 0, scale: 1, opacity: 1, rotateY: 0, ease: 'power2.out' },
        0
      );

      // Left copy slides in from left
      tl.fromTo(leftCopyRef.current,
        { xPercent: -35, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // Notification cards pop in with stagger
      const cardEls = [
        card1Ref.current,
        card2Ref.current,
        card3Ref.current,
        card4Ref.current,
      ].filter(Boolean);
      tl.fromTo(cardEls,
        { scale: 0.5, opacity: 0, y: 28 },
        { scale: 1, opacity: 1, y: 0, ease: 'back.out(1.8)', stagger: 0.08 },
        0.25
      );
    }, phoneSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={phoneSectionRef}
      id="app-experience"
      className="relative py-28 overflow-hidden bg-[#0d1510]"
      style={{ perspective: '1200px' }}
    >
      {/* Blurred parallax background layer */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(205,162,80,0.13) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(18,28,21,0.9) 0%, transparent 80%),
            url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=60&w=1600)
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d1510]/80 via-[#0d1510]/70 to-[#0d1510]/95 pointer-events-none" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl z-0 pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-900/30 rounded-full blur-3xl z-0 pointer-events-none" />

      {/* Main content grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center min-h-[680px]">

          {/* LEFT: explanatory copy */}
          <div ref={leftCopyRef} className="lg:col-span-4 flex flex-col gap-6 will-change-transform">
            <span className="text-accent font-semibold tracking-widest text-xs uppercase">
              Digital Experience
            </span>

            {/* ScrollFloat headline */}
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="my-0 overflow-visible"
              textClassName="text-white font-prata font-bold leading-tight text-left"
            >
              Order Smarter, Dine Better
            </ScrollFloat>

            <p className="text-white/65 text-sm sm:text-base leading-relaxed font-sans">
              Reserve a table, browse our live menu, and receive real-time order confirmations — all from your phone.
              Thoranam&apos;s digital experience is as refined as the food we serve.
            </p>

            {/* Feature pills */}
            <div className="flex flex-col gap-3 mt-2">
              {[
                { icon: <Bell className="h-4 w-4" />, label: 'Live order status notifications' },
                { icon: <CheckCircle className="h-4 w-4" />, label: 'Instant table reservation confirm' },
                { icon: <Flame className="h-4 w-4" />, label: "Chef's daily specials alerts" },
                { icon: <Gift className="h-4 w-4" />, label: 'Exclusive loyalty rewards & offers' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-accent/15 rounded-xl px-4 py-3 backdrop-blur-sm hover:border-accent/40 transition-all duration-300 hover:bg-white/10 group cursor-default">
                  <span className="text-accent group-hover:scale-110 transition-transform">{f.icon}</span>
                  <span className="text-white/80 text-sm font-sans">{f.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#reservation"
              className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-hover text-primary font-bold px-6 py-3.5 rounded-full text-sm hover:shadow-lg hover:shadow-accent/25 hover:scale-105 active:scale-95 transition-all duration-300 w-fit"
            >
              <span>Book Your Table</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* CENTRE: Phone mockup with floating notification cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[580px]">

            {/* Phone frame */}
            <div
              ref={phoneRef}
              className="relative will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Phone outer shell */}
              <div
                className="relative w-[240px] sm:w-[270px] rounded-[40px] border-[7px] border-neutral-700 bg-neutral-900 overflow-hidden"
                style={{
                  height: '500px',
                  boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)',
                }}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-5 pt-3 pb-1 bg-[#0f1a12] relative">
                  <span className="text-white/60 text-[10px] font-semibold">9:41</span>
                  <div className="w-16 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2 border border-neutral-800" />
                  <div className="flex items-center gap-1">
                    <div className="w-3.5 h-2 border border-white/50 rounded-sm relative">
                      <div className="absolute inset-[1px] right-[2px] bg-white/80 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* App header */}
                <div className="bg-[#0f1a12] px-5 py-3 flex items-center justify-between border-b border-accent/15">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 bg-accent/20 border border-accent/40 rounded-lg flex items-center justify-center">
                      <Utensils className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <span className="text-white font-bold text-sm tracking-wide font-sans">THORANAM</span>
                  </div>
                  <div className="relative">
                    <Bell className="h-4 w-4 text-white/60" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent rounded-full border border-neutral-900" />
                  </div>
                </div>

                {/* App body */}
                <div className="bg-[#111a13] px-4 py-3 overflow-hidden" style={{ height: 'calc(100% - 84px)' }}>

                  {/* Hero banner in app */}
                  <div className="rounded-2xl overflow-hidden relative mb-3" style={{ height: '120px' }}>
                    <img
                      src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=70&w=400"
                      alt="Biryani"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center px-3">
                      <div>
                        <p className="text-[9px] text-accent font-semibold uppercase tracking-wider">Today&apos;s Special</p>
                        <p className="text-white text-xs font-bold leading-tight">Dum Biryani</p>
                        <p className="text-white/70 text-[9px]">₹290 · Chef&apos;s Choice</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick action chips */}
                  <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
                    {['Menu', 'Reserve', 'Track', 'Offers'].map((chip, i) => (
                      <div
                        key={i}
                        className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-semibold border ${
                          i === 0
                            ? 'bg-accent text-primary border-accent'
                            : 'bg-white/5 text-white/70 border-white/10'
                        }`}
                      >
                        {chip}
                      </div>
                    ))}
                  </div>

                  {/* Mini menu items */}
                  {[
                    { name: 'Gongura Mutton', price: '₹340', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=60&w=100' },
                    { name: 'Paneer Tikka', price: '₹180', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=60&w=100' },
                    { name: 'Royal Thali', price: '₹390', img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=60&w=100' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-white/4 rounded-xl px-2.5 py-2 mb-2 border border-white/5">
                      <img src={item.img} alt={item.name} className="h-9 w-9 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-[10px] font-semibold truncate">{item.name}</p>
                        <p className="text-accent text-[10px] font-bold">{item.price}</p>
                      </div>
                      <div className="h-6 w-6 bg-accent/15 border border-accent/30 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-accent text-[11px] font-bold leading-none">+</span>
                      </div>
                    </div>
                  ))}

                  {/* Bottom nav bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#0f1a12] border-t border-white/10 flex items-center justify-around py-2 px-2">
                    {[
                      { icon: <Utensils className="h-3.5 w-3.5" />, label: 'Menu' },
                      { icon: <Star className="h-3.5 w-3.5" />, label: 'Reserve' },
                      { icon: <Bell className="h-3.5 w-3.5" />, label: 'Alerts' },
                      { icon: <Users className="h-3.5 w-3.5" />, label: 'Profile' },
                    ].map((nav, i) => (
                      <div key={i} className={`flex flex-col items-center gap-0.5 ${i === 0 ? 'text-accent' : 'text-white/40'}`}>
                        {nav.icon}
                        <span className="text-[7px] font-semibold">{nav.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone side buttons */}
              <div className="absolute -right-[9px] top-24 h-16 w-[5px] bg-neutral-700 rounded-r-full" />
              <div className="absolute -left-[9px] top-20 h-10 w-[5px] bg-neutral-700 rounded-l-full" />
              <div className="absolute -left-[9px] top-32 h-10 w-[5px] bg-neutral-700 rounded-l-full" />
            </div>

            {/* Floating notification cards */}

            {/* Card 1: Order Confirmed (top-left) */}
            <div
              ref={card1Ref}
              className="absolute -top-4 -left-4 sm:-left-16 w-52 will-change-transform"
              style={{ animation: 'phoneMockupFloat1 4s ease-in-out infinite' }}
            >
              <div className="bg-[#1c2e1f]/95 backdrop-blur-md border border-emerald-500/30 rounded-2xl px-4 py-3 shadow-xl flex items-start gap-3">
                <div className="h-9 w-9 shrink-0 bg-emerald-500/15 border border-emerald-500/30 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold leading-tight">Order Confirmed!</p>
                  <p className="text-white/55 text-[10px] mt-0.5 leading-relaxed">Dum Biryani · Est. 25 mins</p>
                  <div className="mt-1.5 flex items-center gap-1">
                    <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-3/5 bg-emerald-500 rounded-full" />
                    </div>
                    <span className="text-emerald-400 text-[9px] font-semibold">Preparing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: New Offer (top-right) */}
            <div
              ref={card2Ref}
              className="absolute -top-8 -right-4 sm:-right-16 w-48 will-change-transform"
              style={{ animation: 'phoneMockupFloat2 5s ease-in-out infinite' }}
            >
              <div className="bg-[#2a1e0a]/95 backdrop-blur-md border border-accent/35 rounded-2xl px-4 py-3 shadow-xl flex items-start gap-3">
                <div className="h-9 w-9 shrink-0 bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-center">
                  <Gift className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-accent text-[9px] font-bold uppercase tracking-wider">Weekend Offer</p>
                  <p className="text-white text-xs font-bold leading-tight mt-0.5">20% off Royal Thali</p>
                  <p className="text-white/50 text-[10px] mt-0.5">Valid today only</p>
                </div>
              </div>
            </div>

            {/* Card 3: Rate Experience (bottom-left) */}
            <div
              ref={card3Ref}
              className="absolute -bottom-6 -left-4 sm:-left-20 w-52 will-change-transform"
              style={{ animation: 'phoneMockupFloat3 4.5s ease-in-out infinite' }}
            >
              <div className="bg-[#1a1035]/95 backdrop-blur-md border border-violet-500/25 rounded-2xl px-4 py-3 shadow-xl flex items-start gap-3">
                <div className="h-9 w-9 shrink-0 bg-violet-500/15 border border-violet-500/30 rounded-xl flex items-center justify-center">
                  <Star className="h-4 w-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Enjoyed your meal?</p>
                  <p className="text-white/50 text-[10px] mt-0.5">Rate your experience</p>
                  <div className="flex items-center gap-0.5 mt-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-accent stroke-accent' : 'fill-white/20 stroke-white/20'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Table Ready (bottom-right) */}
            <div
              ref={card4Ref}
              className="absolute -bottom-4 -right-4 sm:-right-14 w-48 will-change-transform"
              style={{ animation: 'phoneMockupFloat4 3.8s ease-in-out infinite' }}
            >
              <div className="bg-[#0d2020]/95 backdrop-blur-md border border-teal-500/25 rounded-2xl px-4 py-3 shadow-xl flex items-start gap-3">
                <div className="h-9 w-9 shrink-0 bg-teal-500/15 border border-teal-500/30 rounded-xl flex items-center justify-center">
                  <Flame className="h-4 w-4 text-teal-400" />
                </div>
                <div>
                  <p className="text-teal-300 text-[9px] font-bold uppercase tracking-wider">Table Ready</p>
                  <p className="text-white text-xs font-bold leading-tight mt-0.5">Heritage Dining · 7:30 PM</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                    <span className="text-teal-400 text-[9px] font-semibold">Your table awaits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: stat highlights */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <ScrollFloat
              animationDuration={0.9}
              ease="back.inOut(2)"
              scrollStart="center bottom+=40%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.025}
              containerClassName="my-0 overflow-visible scroll-float-sm"
              textClassName="text-white/90 font-prata font-semibold text-left leading-snug"
            >
              Real-time updates for every moment
            </ScrollFloat>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                { value: '< 2 min', label: 'Reservation confirm time', color: 'text-accent' },
                { value: '4.6 ★', label: 'App store rating', color: 'text-emerald-400' },
                { value: '1,200+', label: 'Digital orders this month', color: 'text-violet-400' },
                { value: '99%', label: 'On-time table readiness', color: 'text-teal-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1 hover:border-accent/30 transition-all duration-300 hover:bg-white/8 cursor-default">
                  <span className={`text-xl sm:text-2xl font-black font-prata ${stat.color}`}>{stat.value}</span>
                  <span className="text-white/50 text-[11px] font-sans leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function RestaurantLanding() {
  const [activeTab, setActiveTab] = useState('starters');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Seating atmosphere, details & confirmation states for Reservation Form
  const [seating, setSeating] = useState('Heritage Dining');
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('2026-07-28');
  const [resTime, setResTime] = useState('7:30 PM (Dinner)');
  const [resGuests, setResGuests] = useState('2 Guests');
  const [resNotes, setResNotes] = useState('');
  const [resSuccess, setResSuccess] = useState(false);

  // Proximity Heading container ref
  const cookingContainerRef = useRef(null);

  // Detect scroll to style navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter full menu items based on search query
  const getAllMenuItems = () => {
    const all = [];
    Object.keys(MENU_DATA).forEach(category => {
      MENU_DATA[category].forEach(item => {
        all.push({ ...item, category });
      });
    });
    return all;
  };

  const filteredMenuItems = getAllMenuItems().filter(item => 
    item.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(menuSearchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(menuSearchQuery.toLowerCase())
  );

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setResSuccess(true);
    setTimeout(() => {
      setResSuccess(false);
      setResName('');
      setResPhone('');
      setResNotes('');
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light text-neutral-dark relative font-sans">
      
      {/* 1. Header Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-primary/95 backdrop-blur-md shadow-lg border-b border-accent/20' 
          : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="p-1.5 bg-accent/15 border border-accent/30 rounded-lg text-accent group-hover:bg-accent/30 transition-all duration-300">
              <Utensils className="h-5 w-5" />
            </span>
            <span className="font-serif text-2xl font-bold tracking-wider text-gradient-gold">
              THORANAM
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-white/80 hover:text-accent transition-colors">Home</a>
            <a href="#about" className="text-sm font-medium text-white/80 hover:text-accent transition-colors">About Us</a>
            <a href="#cooking" className="text-sm font-medium text-white/80 hover:text-accent transition-colors">Philosophy</a>
            <a href="#menu" className="text-sm font-medium text-white/80 hover:text-accent transition-colors">Our Menu</a>
            <a href="#gallery" className="text-sm font-medium text-white/80 hover:text-accent transition-colors">Gallery</a>
            <a href="#reviews" className="text-sm font-medium text-white/80 hover:text-accent transition-colors">Reviews</a>
            <a href="#reservation" className="text-sm font-medium text-white/80 hover:text-accent transition-colors">Reserve Table</a>
          </nav>

          {/* Nav CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+919966522695" 
              className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-white bg-accent/10 border border-accent/30 hover:bg-accent px-4 py-2 rounded-full transition-all duration-300 shadow-sm"
            >
              <Phone className="h-4 w-4" />
              <span>099665 22695</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-white hover:text-accent transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-primary border-b border-accent/20 px-4 py-6 flex flex-col gap-4 animate-fadeIn shadow-xl">
            <a 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white/90 hover:text-accent border-b border-white/5 pb-2"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white/90 hover:text-accent border-b border-white/5 pb-2"
            >
              About Us
            </a>
            <a 
              href="#cooking" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white/90 hover:text-accent border-b border-white/5 pb-2"
            >
              Philosophy
            </a>
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white/90 hover:text-accent border-b border-white/5 pb-2"
            >
              Our Menu
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white/90 hover:text-accent border-b border-white/5 pb-2"
            >
              Gallery
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white/90 hover:text-accent border-b border-white/5 pb-2"
            >
              Reviews
            </a>
            <a 
              href="#reservation" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-white/90 hover:text-accent border-b border-white/5 pb-2"
            >
              Reserve Table
            </a>
            <a 
              href="tel:+919966522695" 
              className="flex items-center justify-center gap-3 bg-accent text-primary font-bold py-3 rounded-full hover:bg-accent-hover transition-colors shadow-md mt-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call 099665 22695</span>
            </a>
          </div>
        )}
      </header>

      {/* Gradual Blur for page scroll behind the navigation header */}
      <GradualBlur
        target="parent"
        position="top"
        height="8rem"
        strength={4}
        divCount={8}
        curve="ease-out"
        exponential={true}
        opacity={1}
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
      />

      {/* 2. Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-cover bg-center overflow-hidden pt-20" style={{ backgroundImage: `url(${IMAGES.heroBg})` }}>
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 hero-gradient z-0"></div>

        {/* WebGL Particle Background Layer */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={["#cda250", "#ffffff", "#ebe3cb"]}
            particleCount={150}
            particleSpread={12}
            speed={0.15}
            particleBaseSize={90}
            moveParticlesOnHover={true}
            particleHoverFactor={0.7}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>

        {/* Glowing floating light effects in hero */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-primary-light/20 rounded-full blur-3xl z-0"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center py-16 z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark text-white/90 text-sm font-medium mb-8 border border-accent/30 shadow-md">
            <span className="flex items-center text-accent">
              <Star className="h-4 w-4 fill-accent stroke-accent" />
              <Star className="h-4 w-4 fill-accent stroke-accent" />
              <Star className="h-4 w-4 fill-accent stroke-accent" />
              <Star className="h-4 w-4 fill-accent stroke-accent" />
              <Star className="h-4 w-4 fill-accent/50 stroke-accent" />
            </span>
            <span className="font-semibold text-accent">4.6 Rating</span>
            <span className="text-white/55">|</span>
            <span>65+ Reviews</span>
            <span className="text-white/55">|</span>
            <span className="text-accent font-semibold">₹200 - ₹400</span>
            <span className="text-white/70">/ person</span>
          </div>

          {/* Scrambling title using React Bits <Shuffle /> */}
          <div className="mb-4 select-none">
            <span className="block text-accent/80 font-serif italic text-lg sm:text-xl md:text-2xl tracking-widest uppercase mb-1">
              Welcome To
            </span>
            <Shuffle 
              text="Thoranam Restaurant" 
              shuffleDirection="down" 
              duration={0.6} 
              shuffleTimes={2} 
              animationMode="random"
              maxDelay={0.4}
              className="text-white font-serif font-black tracking-wide text-4xl sm:text-6xl md:text-8xl drop-shadow-xl"
              triggerOnHover={true}
              triggerOnce={true}
            />
          </div>

          {/* Subtitle with React Bits <ScrollFloat /> */}
          <div className="max-w-2xl mx-auto mb-10 h-16 sm:h-20 flex items-center justify-center overflow-hidden">
            <ScrollFloat 
              animationDuration={0.8}
              ease="power3.out"
              scrollStart="top bottom-=10%"
              scrollEnd="bottom center"
              stagger={0.02}
              containerClassName="my-0 overflow-visible"
              textClassName="text-white/90 font-serif italic font-light text-lg sm:text-2xl md:text-3xl leading-snug"
            >
              Authentic Flavors, Unforgettable Dining Experience
            </ScrollFloat>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="#menu" 
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-hover text-primary font-bold px-8 py-4 rounded-full hover:shadow-lg hover:shadow-accent/25 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>View Our Menu</span>
              <Utensils className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            </a>
            <a 
              href="#reservation" 
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full border border-white/20 hover:border-accent/40 active:scale-95 transition-all duration-300 backdrop-blur-sm"
            >
              <span>Book Table Now</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

        </div>

        {/* Bottom decorative wave or mask */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-light to-transparent"></div>
      </section>

      {/* 3. Floating Quick Info Ribbon */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="glass-card shadow-xl rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 border border-accent/20">
          
          {/* Status */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Clock className="h-6 w-6 stroke-[1.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">Operating Hours</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-sm font-medium text-emerald-600 mt-0.5">Open · Closes at 23:30</p>
              <p className="text-xs text-neutral-dark/60 mt-0.5">Daily: 11:00 AM - 11:30 PM</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4 border-t md:border-t-0 md:border-x border-neutral-dark/10 pt-6 md:pt-0 md:px-6 sm:px-0">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <MapPin className="h-6 w-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Find Us At</h4>
              <a 
                href="https://maps.google.com/?q=Thoranam+Restaurant+Abbanikuntha+Warangal" 
                target="_blank" 
                rel="noreferrer" 
                className="text-sm text-neutral-dark/80 hover:text-accent hover:underline font-medium block mt-0.5"
              >
                Abbanikuntha, Labour Colony, Warangal, Telangana 506013
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-start gap-4 border-t md:border-t-0 pt-6 md:pt-0">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Phone className="h-6 w-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Contact Us</h4>
              <a 
                href="tel:+919966522695" 
                className="text-xl font-bold text-gradient-gold block mt-0.5 hover:scale-102 transition-transform"
              >
                099665 22695
              </a>
              <p className="text-xs text-neutral-dark/60 mt-0.5">Call for reservations or catering queries</p>
            </div>
          </div>

        </div>
      </div>

      {/* 3.5 Interactive Motion Slides Experience (30 Frame Video Sequence) */}
      <FrameScrollSlides />

      {/* 4. The Art of Authentic South Indian Cooking Section (Placed right after story) */}
      <section id="cooking" className="py-24 bg-[#120e0c] text-white border-t border-accent/15 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Area */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-2 block font-sans">
              Our Cooking Philosophy
            </span>
            
            {/* Variable Proximity Animated Heading */}
            <div ref={cookingContainerRef} className="relative select-none inline-block w-full">
              <VariableProximity
                label="The Art of Authentic South Indian Cooking"
                className="font-prata text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white text-center tracking-tight cursor-pointer"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={cookingContainerRef}
                radius={240}
                falloff="smooth"
              />
            </div>

            {/* ScrollReveal: cooking philosophy subtitle */}
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              baseRotation={2}
              blurStrength={8}
              rotationEnd="bottom center"
              wordAnimationEnd="bottom center"
              containerClassName="my-0 mt-4"
              textClassName="text-white/85 text-base sm:text-lg leading-relaxed font-sans text-center max-w-3xl mx-auto"
            >
              Founded on the principle that genuine South Indian cuisine is a celebration of geometry, aroma, and slow craftsmanship. We bridge ancient Nizam & Chola kitchen traditions with contemporary fine dining.
            </ScrollReveal>
          </div>

          {/* Cards Grid matching the mockup specification */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Hand-Pounded Spices */}
            <div className="bg-[#1c1411] rounded-3xl p-8 border border-accent/20 flex flex-col justify-between min-h-[350px] shadow-2xl transition-all duration-300 hover:border-accent/50 group hover:-translate-y-2">
              <div>
                {/* Badge Icon */}
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-accent/30 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-[#1c1411] transition-all duration-500">
                  <Utensils className="h-6 w-6" />
                </div>
                
                <h3 className="font-prata text-2xl font-bold text-white mb-4">
                  Hand-Pounded Spices
                </h3>
                
                {/* ScrollReveal: card 1 body */}
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={2}
                  blurStrength={6}
                  rotationEnd="bottom bottom"
                  wordAnimationEnd="bottom bottom"
                  containerClassName="my-0"
                  textClassName="!text-base sm:!text-lg text-white/70 leading-relaxed font-sans font-light"
                >
                  We never use pre-packaged powders. Every morning, stone mortars grind fresh Byadgi chillies, black peppercorns from Coorg, star anise, and whole cardamom to extract essential oils.
                </ScrollReveal>
              </div>
              
              <div className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-accent uppercase font-sans pt-6 border-t border-white/5">
                COORG & MALABAR DIRECT SOURCING
              </div>
            </div>

            {/* Card 2: Pure Desi Ghee & Clay Dum */}
            <div className="bg-[#1c1411] rounded-3xl p-8 border border-accent/20 flex flex-col justify-between min-h-[350px] shadow-2xl transition-all duration-300 hover:border-accent/50 group hover:-translate-y-2">
              <div>
                {/* Badge Icon */}
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-accent/30 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-[#1c1411] transition-all duration-500">
                  <Award className="h-6 w-6" />
                </div>
                
                <h3 className="font-prata text-2xl font-bold text-white mb-4">
                  Pure Desi Ghee & Clay Dum
                </h3>
                
                {/* ScrollReveal: card 2 body */}
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={2}
                  blurStrength={6}
                  rotationEnd="bottom bottom"
                  wordAnimationEnd="bottom bottom"
                  containerClassName="my-0"
                  textClassName="!text-base sm:!text-lg text-white/70 leading-relaxed font-sans font-light"
                >
                  Our Hyderabadi Biryanis are sealed in unglazed clay pots over charcoal embers, allowing long Basmati rice to absorb deep wood-smoke aromatics and farm-fresh clarified butter.
                </ScrollReveal>
              </div>
              
              <div className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-accent uppercase font-sans pt-6 border-t border-white/5">
                SLOW CHARCOAL SEALED POT
              </div>
            </div>

            {/* Card 3: Aesthetic Presentation */}
            <div className="bg-[#1c1411] rounded-3xl p-8 border border-accent/20 flex flex-col justify-between min-h-[350px] shadow-2xl transition-all duration-300 hover:border-accent/50 group hover:-translate-y-2">
              <div>
                {/* Badge Icon */}
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-accent/30 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-[#1c1411] transition-all duration-500">
                  <Star className="h-6 w-6" />
                </div>
                
                <h3 className="font-prata text-2xl font-bold text-white mb-4">
                  Aesthetic Presentation
                </h3>
                
                {/* ScrollReveal: card 3 body */}
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={2}
                  blurStrength={6}
                  rotationEnd="bottom bottom"
                  wordAnimationEnd="bottom bottom"
                  containerClassName="my-0"
                  textClassName="!text-base sm:!text-lg text-white/70 leading-relaxed font-sans font-light"
                >
                  Served on polished brass platters and banana leaves, every dish is plated as a visual masterpiece reflecting Telangana heritage and regal Nizam hospitality.
                </ScrollReveal>
              </div>
              
              <div className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-accent uppercase font-sans pt-6 border-t border-white/5">
                BRASSWARE & BANANA LEAF TRADITION
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Overview Section (Clean centered layout without side picture card) */}
      <section id="about" className="py-24 bg-[#121c15] text-white border-y border-accent/20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center relative">
          
          {/* Subtle ambient gold glow behind text */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-2 block relative z-10">
            Our Culinary Legacy
          </span>

          {/* ScrollReveal: main heading in pure white */}
          <div className="relative z-10 max-w-3xl">
            <ScrollReveal
              baseOpacity={0.4}
              enableBlur={true}
              baseRotation={2}
              blurStrength={6}
              rotationEnd="bottom center"
              wordAnimationEnd="bottom center"
              containerClassName="my-0 mb-3"
              textClassName="font-serif text-3xl sm:text-5xl font-black leading-tight text-white drop-shadow-lg text-center"
            >
              Welcome to Thoranam — Where Heritage Meets Taste
            </ScrollReveal>
          </div>

          <div className="w-24 h-1.5 bg-gradient-to-r from-accent to-accent-hover mb-8 rounded-full shadow-md relative z-10"></div>

          {/* ScrollReveal: first body paragraph */}
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={true}
            baseRotation={2}
            blurStrength={5}
            rotationEnd="bottom bottom"
            wordAnimationEnd="bottom bottom"
            containerClassName="my-0 mb-6 max-w-3xl"
            textClassName="text-white/90 text-base sm:text-xl leading-relaxed font-light text-center"
          >
            Named after the traditional festoon hanging at Indian entryways representing welcome, Thoranam Restaurant offers a warm invitation to a journey of exquisite culinary traditions. Located in the heart of Warangal, we blend modern dining aesthetics with the rich spices of Telangana and broader Indian specialties.
          </ScrollReveal>

          {/* ScrollReveal: second body paragraph */}
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={true}
            baseRotation={2}
            blurStrength={5}
            rotationEnd="bottom bottom"
            wordAnimationEnd="bottom bottom"
            containerClassName="my-0 mb-10 max-w-3xl"
            textClassName="text-white/85 text-base sm:text-xl leading-relaxed font-light text-center"
          >
            Whether you are craving the slow-cooked perfection of our Thoranam Special Dum Biryani or local delicacies like Gongura Mutton, our kitchen produces high-quality, authentic food utilizing locally sourced spices. Our commitment is to offer premium dining experiences at an affordable price, averaging between ₹200 to ₹400 per person.
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-8 mb-10 max-w-lg w-full">
            <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-white">Family Friendly</h4>
                <p className="text-xs text-white/60">Dedicated dining spaces</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                <Heart className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-white">Healthy Ingredients</h4>
                <p className="text-xs text-white/60">100% fresh, locally sourced</p>
              </div>
            </div>
          </div>

          <div>
            <a 
              href="#menu" 
              className="inline-flex items-center gap-2 border-b-2 border-accent text-accent hover:text-white font-bold py-1 text-base transition-colors group"
            >
              <span>Discover Our Menu</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </section>

      {/* 4.6 Phone App Digital Experience Section */}
      <PhoneMockupSection />

      {/* 5. Signature Menu Section */}
      <section id="menu" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-2 block">Taste Perfection</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-primary mb-4">Our Signature Offerings</h2>
          <p className="text-neutral-dark/70 text-base sm:text-lg">
            Carefully curated dishes representing authentic regional recipes, cooked fresh on order.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {[
            { id: 'starters', label: 'Starters' },
            { id: 'main', label: 'Main Course' },
            { id: 'specials', label: 'Thoranam Specials' },
            { id: 'desserts', label: 'Desserts' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-primary text-accent border border-accent shadow-md scale-102' 
                  : 'bg-white text-neutral-dark/70 border border-neutral-dark/10 hover:border-accent/40 hover:text-primary shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENU_DATA[activeTab]?.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-neutral-dark/10 transition-all duration-300 flex flex-col group hover:-translate-y-1 h-full">
              
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.isVeg ? 'bg-emerald-900/90 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950/90 text-rose-300 border border-rose-500/30'
                  }`}>
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                  {item.isPopular && (
                    <span className="bg-accent text-primary font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      Popular
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-serif font-bold text-lg text-primary group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-serif font-bold text-lg text-accent whitespace-nowrap">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-dark/70 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <a 
                  href="tel:+919966522695" 
                  className="w-full text-center py-2.5 rounded-xl bg-neutral-light hover:bg-accent/15 border border-accent/30 text-primary hover:text-accent font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 mt-2"
                >
                  <Utensils className="h-3.5 w-3.5" />
                  <span>Order at Table</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* View Full Detailed Menu Modal Launcher */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => setShowFullMenu(true)}
            className="inline-flex items-center gap-2 bg-primary text-accent hover:bg-primary-light border border-accent/40 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span>Explore Full Detailed Menu & Search</span>
          </button>
        </div>

      </section>

      {/* 6. Photo Gallery Section */}
      <section id="gallery" className="py-20 bg-primary/5 border-y border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-2 block">Visual Feast</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-primary mb-4">Thoranam Gallery</h2>
            <p className="text-neutral-dark/70 text-base sm:text-lg">
              Hover or move your cursor over our gallery cards for an interactive food reveal experience.
            </p>
          </div>

          <ImageTrail items={GALLERY_IMAGES}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {GALLERY_IMAGES.slice(0, 10).map((imgUrl, index) => (
                <div 
                  key={index} 
                  className="group relative rounded-2xl overflow-hidden shadow-md aspect-square border border-white/50 cursor-pointer"
                >
                  <img 
                    src={imgUrl} 
                    alt={`Thoranam Dish ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-serif text-xs font-bold">Thoranam Special #{index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </ImageTrail>
        </div>
      </section>

      {/* 7. Customer Reviews Section */}
      <section id="reviews" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-2 block">Guest Experiences</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-primary mb-4">What Our Diners Say</h2>
          <div className="flex items-center justify-center gap-2 text-accent text-sm font-semibold">
            <span className="flex">
              <Star className="h-5 w-5 fill-accent stroke-accent" />
              <Star className="h-5 w-5 fill-accent stroke-accent" />
              <Star className="h-5 w-5 fill-accent stroke-accent" />
              <Star className="h-5 w-5 fill-accent stroke-accent" />
              <Star className="h-5 w-5 fill-accent/50 stroke-accent" />
            </span>
            <span className="text-primary font-bold">4.6 out of 5</span>
            <span className="text-neutral-dark/40">• Based on 65+ verified reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-dark/10 flex flex-col justify-between hover:border-accent/40 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(rev.stars) ? 'fill-accent stroke-accent' : 'fill-accent/30 stroke-accent'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-dark/50 font-medium">{rev.date}</span>
                </div>
                <p className="text-neutral-dark/85 text-sm sm:text-base font-sans font-normal leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-dark/10 pt-4">
                <div>
                  <h4 className="font-bold text-primary text-sm">{rev.name}</h4>
                  <p className="text-xs text-accent font-medium">{rev.role}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-dark/50">
                  <ThumbsUp className="h-3.5 w-3.5 text-accent" />
                  <span>{rev.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Table Reservation Section */}
      <section id="reservation" className="py-20 bg-primary text-white relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Info Side */}
            <div className="lg:col-span-5">
              <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-2 block">Table Booking</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Reserve Your Dining Table at Thoranam
              </h2>
              <p className="text-white/80 text-base leading-relaxed mb-8">
                Skip the wait and reserve your spot in our traditional Nizam-inspired dining hall. We welcome family gatherings, celebratory dinners, and everyday dining.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
                  <div className="p-3 bg-accent/20 text-accent rounded-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Phone Reservation</p>
                    <a href="tel:+919966522695" className="text-lg font-bold text-accent hover:underline">099665 22695</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
                  <div className="p-3 bg-accent/20 text-accent rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Location</p>
                    <p className="text-sm font-semibold text-white">Abbanikuntha, Labour Colony, Warangal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7">
              <div className="glass-card-dark p-8 sm:p-10 rounded-3xl border border-accent/30 shadow-2xl">
                <h3 className="font-serif text-2xl font-bold text-accent mb-6">Book Table Online</h3>

                {resSuccess ? (
                  <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-6 text-center animate-fadeIn">
                    <div className="h-12 w-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="h-6 w-6 fill-emerald-400" />
                    </div>
                    <h4 className="font-serif font-bold text-xl text-white mb-2">Reservation Request Received!</h4>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Thank you, <span className="text-accent font-semibold">{resName || 'Guest'}</span>! We will confirm your table for <span className="text-accent font-semibold">{resGuests}</span> on <span className="text-accent font-semibold">{resDate}</span> at <span className="text-accent font-semibold">{resTime}</span> shortly via phone.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleReservationSubmit} className="flex flex-col gap-5">
                    
                    {/* Seating Atmosphere Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Seating Atmosphere
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Heritage Dining', 'Family Lounge'].map(opt => (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => setSeating(opt)}
                            className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                              seating === opt 
                                ? 'bg-accent text-primary border-accent' 
                                : 'bg-white/5 text-white/70 border-white/10 hover:border-accent/40'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                          Your Full Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={resName}
                          onChange={(e) => setResName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input 
                          type="tel" 
                          required
                          value={resPhone}
                          onChange={(e) => setResPhone(e.target.value)}
                          placeholder="099665 22695"
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                          Date
                        </label>
                        <input 
                          type="date" 
                          value={resDate}
                          onChange={(e) => setResDate(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                          Time Slot
                        </label>
                        <select 
                          value={resTime}
                          onChange={(e) => setResTime(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent text-sm"
                        >
                          <option>12:30 PM (Lunch)</option>
                          <option>1:30 PM (Lunch)</option>
                          <option>7:30 PM (Dinner)</option>
                          <option>8:30 PM (Dinner)</option>
                          <option>9:30 PM (Dinner)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                          Guests
                        </label>
                        <select 
                          value={resGuests}
                          onChange={(e) => setResGuests(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent text-sm"
                        >
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>4 Guests</option>
                          <option>6 Guests</option>
                          <option>8+ Group</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                        Special Requests (Optional)
                      </label>
                      <textarea 
                        rows="2"
                        value={resNotes}
                        onChange={(e) => setResNotes(e.target.value)}
                        placeholder="High chair required, birthday celebration, dietary restrictions..."
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-accent to-accent-hover text-primary font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-accent/20 active:scale-98 transition-all duration-300 text-base mt-2"
                    >
                      Confirm Table Reservation
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Footer & Location Info */}
      <footer className="bg-neutral-dark text-white/80 py-16 border-t border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Col 1 */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1.5 bg-accent/20 rounded-lg text-accent">
                  <Utensils className="h-5 w-5" />
                </span>
                <span className="font-serif text-2xl font-bold tracking-wider text-gradient-gold">
                  THORANAM
                </span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                Authentic South Indian & Telangana culinary experiences served with warm traditional hospitality.
              </p>
              <p className="text-xs text-accent font-semibold">Average ₹200 - ₹400 per person</p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-serif font-bold text-accent text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-accent transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors">About Thoranam</a></li>
                <li><a href="#cooking" className="hover:text-accent transition-colors">Cooking Philosophy</a></li>
                <li><a href="#menu" className="hover:text-accent transition-colors">Signature Menu</a></li>
                <li><a href="#reservation" className="hover:text-accent transition-colors">Table Reservation</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-serif font-bold text-accent text-sm uppercase tracking-wider mb-4">Operating Hours</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between text-white/90">
                  <span>Monday - Sunday:</span>
                  <span className="font-semibold text-emerald-400">11:00 AM - 11:30 PM</span>
                </li>
                <li className="text-white/50 pt-2">Continuous dine-in, takeaway & catering services available daily.</li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-serif font-bold text-accent text-sm uppercase tracking-wider mb-4">Address & Contact</h4>
              <p className="text-xs text-white/80 leading-relaxed mb-3">
                Abbanikuntha, Labour Colony, Warangal, Telangana 506013
              </p>
              <a 
                href="tel:+919966522695" 
                className="inline-flex items-center gap-2 text-accent font-bold text-sm hover:underline"
              >
                <Phone className="h-4 w-4" />
                <span>099665 22695</span>
              </a>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/40 gap-4">
            <p>© {new Date().getFullYear()} Thoranam Restaurant. All Rights Reserved.</p>
            <p>Designed with Authentic Telangana Heritage Aesthetics.</p>
          </div>
        </div>
      </footer>

      {/* 10. Full Detailed Menu Modal */}
      {showFullMenu && (
        <div className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-neutral-light rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-accent/40">
            
            {/* Modal Header */}
            <div className="p-6 bg-primary text-white flex justify-between items-center border-b border-accent/20">
              <div>
                <h3 className="font-serif text-2xl font-bold text-gradient-gold">Thoranam Complete Menu</h3>
                <p className="text-xs text-white/60 mt-0.5">Explore all our freshly prepared regional dishes</p>
              </div>
              <button 
                onClick={() => setShowFullMenu(false)}
                className="p-2 text-white/80 hover:text-accent rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Search Bar */}
            <div className="p-4 bg-white border-b border-neutral-dark/10">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-dark/40" />
                <input 
                  type="text" 
                  value={menuSearchQuery}
                  onChange={(e) => setMenuSearchQuery(e.target.value)}
                  placeholder="Search dishes (e.g. Biryani, Paneer, Gongura...)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-neutral-light border border-neutral-dark/20 text-sm text-neutral-dark focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Modal Menu Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              {filteredMenuItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-neutral-dark/60 text-sm font-medium">No dishes found matching &quot;{menuSearchQuery}&quot;.</p>
                  <button 
                    onClick={() => setMenuSearchQuery('')}
                    className="mt-3 text-xs text-accent font-bold hover:underline"
                  >
                    Clear Search Filter
                  </button>
                </div>
              ) : (
                <>
                  {Object.keys(MENU_DATA).map(categoryKey => {
                    const items = MENU_DATA[categoryKey].filter(i => 
                      i.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) ||
                      i.description.toLowerCase().includes(menuSearchQuery.toLowerCase())
                    );
                    if (items.length === 0) return null;

                    const catTitle = {
                      starters: 'Starters & Appetizers',
                      main: 'Main Course Specialties',
                      specials: 'Thoranam Signature Specials',
                      desserts: 'Desserts & Sweets'
                    }[categoryKey];

                    return (
                      <div key={categoryKey}>
                        <h4 className="font-serif font-bold text-xl text-primary mb-4 pb-2 border-b border-accent/30 capitalize flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-accent"></span>
                          <span>{catTitle}</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {items.map(item => (
                            <div key={item.id} className="p-4 rounded-xl bg-white border border-neutral-dark/10 shadow-sm flex items-start gap-4 hover:border-accent/40 transition-colors">
                              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h5 className="font-serif font-bold text-sm text-primary truncate">{item.name}</h5>
                                  <span className="font-bold text-sm text-accent ml-2 whitespace-nowrap">₹{item.price}</span>
                                </div>
                                <p className="text-xs text-neutral-dark/60 mt-1 line-clamp-2">{item.description}</p>
                                <div className="flex justify-between items-center mt-2">
                                  {item.isPopular && (
                                    <span className="text-[9px] bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full">
                                      Chef&apos;s Favorite
                                    </span>
                                  )}
                                  <a 
                                    href="tel:+919966522695" 
                                    className="text-[10px] text-accent hover:text-accent-hover font-bold ml-auto flex items-center gap-0.5"
                                  >
                                    Order <ChevronRight className="h-3 w-3" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Modal Footer Call-to-action */}
            <div className="p-4 bg-white border-t border-neutral-dark/10 flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs text-neutral-dark/60 font-medium">Order Hot and Fresh! Fast preparation.</span>
              </div>
              <a 
                href="tel:+919966522695"
                className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-bold px-6 py-2.5 rounded-full text-sm shadow-md transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Call 099665 22695</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
