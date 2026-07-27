import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ id: number; x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    let counter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.onclick !== null ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.classList.contains('cursor-pointer');
        setIsPointer(!!isClickable);
      }

      // Append particle stardust to cursor trail
      counter++;
      if (counter % 2 === 0) {
        setTrail((prev) => [
          ...prev.slice(-12),
          { id: Math.random(), x: e.clientX, y: e.clientY, opacity: 1 },
        ]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Fade trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.12 }))
          .filter((p) => p.opacity > 0)
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Hide default cursor on desktop
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
      {/* Quantum Stardust Trail */}
      {trail.map((p) => (
        <div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 blur-[1px]"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 8px rgba(6, 182, 212, 0.8)',
          }}
        />
      ))}

      {/* Primary Cyber Crosshair Reticle */}
      <div
        className={`absolute transition-transform duration-75 flex items-center justify-center ${
          isClicking ? 'scale-75' : isPointer ? 'scale-125' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Outer Rotating Square HUD */}
        <div
          className={`w-8 h-8 border border-cyan-400/80 rounded-sm transition-all animate-spin-slow ${
            isPointer ? 'border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)] rotate-45' : 'shadow-[0_0_10px_rgba(6,182,212,0.5)]'
          }`}
        />

        {/* Center Target Dot */}
        <div
          className={`absolute w-2 h-2 rounded-full transition-colors ${
            isPointer ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-cyan-400 shadow-[0_0_10px_#06b6d4]'
          }`}
        />

        {/* Crosshair Laser Lines */}
        <div className="absolute w-12 h-[1px] bg-cyan-400/30" />
        <div className="absolute h-12 w-[1px] bg-cyan-400/30" />
      </div>
    </div>
  );
};
