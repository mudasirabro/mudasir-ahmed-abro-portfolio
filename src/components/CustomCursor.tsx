import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instant position for precision center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // Smooth lerp loop for the outer sci-fi reticle
    const render = () => {
      currentX += (mouseX - currentX) * 0.25;
      currentY += (mouseY - currentY) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block select-none">
      {/* Outer Holographic Reticle (Smooth Trailing) */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 -ml-4 -mt-4 w-8 h-8 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="w-full h-full border border-cyan-400/60 rounded-sm animate-spin-slow shadow-[0_0_10px_rgba(6,182,212,0.4)]" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-400/20 -translate-y-1/2" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-cyan-400/20 -translate-x-1/2" />
      </div>

      {/* Center Quantum Glow Dot (Instant Movement) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -ml-1 -mt-1 w-2 h-2 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="w-full h-full rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
      </div>
    </div>
  );
};
