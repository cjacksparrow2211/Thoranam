import React, { useEffect } from 'react';
import RestaurantLanding from './components/RestaurantLanding';
import TextCursor from './components/TextCursor';
import ClickSpark from './components/ClickSpark';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register standard ScrollTrigger for synchronization
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // keep touch scroll native for performance
      infinite: false,
    });

    // 2. Synchronize Lenis scrolling with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Add Lenis update loop into the GSAP global ticker for sync animation frames
    const gsapTickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTickerCallback);

    // 4. Optimize GSAP ticker lag smoothing
    gsap.ticker.lagSmoothing(0);

    // 5. Clean up on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTickerCallback);
    };
  }, []);

  return (
    <ClickSpark
      sparkColor="#cda250"
      sparkSize={15}
      sparkRadius={25}
      sparkCount={12}
      duration={500}
    >
      <div className="w-full min-h-screen relative overflow-x-hidden">
        
        {/* Landing Page Content */}
        <RestaurantLanding />
        
        {/* Elegant Full-Screen Mouse Trail Effect */}
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <TextCursor 
            text="✨"
            spacing={60}
            followMouseDirection={true}
            randomFloat={true}
            exitDuration={0.4}
            removalInterval={25}
            maxPoints={12}
          />
        </div>

      </div>
    </ClickSpark>
  );
}

export default App;
