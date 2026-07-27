import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  isTimeInverted?: boolean;
}

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ isTimeInverted = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Matrix Rain Stream Column Characters (Inception / Tenet Digital World)
    const chars = '01010101011001010101010101MUDASIRABROQUANTUM2050FULLSTACKDEVNODEJSREACTEXPRESSMONGODB';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns)
      .fill(1)
      .map(() => Math.floor(Math.random() * -50));

    // Tech Quantum Particles
    const particleCount = Math.min(45, Math.floor(width / 30));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.8 + 1,
    }));

    // 3D Wireframe Tesseract Vertices (Christopher Nolan / Interstellar Hypercube)
    let angleX = 0;
    let angleY = 0;

    let lastTime = performance.now();

    const draw = (currentTime: number) => {
      const delta = currentTime - lastTime;
      if (delta < 25) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = currentTime;

      // Dark translucent background for time-bending trail
      ctx.fillStyle = isTimeInverted ? 'rgba(15, 8, 28, 0.22)' : 'rgba(4, 7, 14, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // 1. Render Matrix Code Stream
      ctx.fillStyle = isTimeInverted
        ? 'rgba(234, 179, 8, 0.22)' // Holographic Gold when inverted
        : 'rgba(16, 185, 129, 0.16)'; // Cyan/Emerald Matrix
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (i % 3 === 0) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillText(text, x, y);

          if (isTimeInverted) {
            // Tenet Reverse Motion: Drops flow UPWARDS!
            drops[i]--;
            if (drops[i] < 0 && Math.random() > 0.97) {
              drops[i] = Math.floor(height / fontSize);
            }
          } else {
            // Standard Motion: Drops flow DOWNWARDS
            drops[i]++;
            if (y > height && Math.random() > 0.97) {
              drops[i] = 0;
            }
          }
        }
      }

      // 2. Render Connected Tech Particles with Mouse Parallax
      ctx.strokeStyle = isTimeInverted ? 'rgba(168, 85, 247, 0.12)' : 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 0.8;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Apply slight gravity/attraction towards mouse cursor
        const dxMouse = mouseX - p1.x;
        const dyMouse = mouseY - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          p1.x += (dxMouse / distMouse) * 0.4;
          p1.y += (dyMouse / distMouse) * 0.4;
        }

        const speedFactor = isTimeInverted ? -1 : 1;
        p1.x += p1.vx * speedFactor;
        p1.y += p1.vy * speedFactor;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = isTimeInverted ? 'rgba(234, 179, 8, 0.6)' : 'rgba(6, 182, 212, 0.5)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Render Floating 3D Interstellar Hypercube Wireframe in Top Right
      angleX += isTimeInverted ? -0.008 : 0.008;
      angleY += isTimeInverted ? -0.012 : 0.012;

      const cubeSize = 55;
      const cubeCenterX = width - 120;
      const cubeCenterY = 140;

      const nodes = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      ];

      const projected: [number, number][] = nodes.map(([x, y, z]) => {
        // Rotate Y
        let x1 = x * Math.cos(angleY) - z * Math.sin(angleY);
        let z1 = x * Math.sin(angleY) + z * Math.cos(angleY);
        // Rotate X
        let y2 = y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = y * Math.sin(angleX) + z1 * Math.cos(angleX);

        const fov = 200;
        const scale = fov / (fov + z2 * 40);
        return [cubeCenterX + x1 * cubeSize * scale, cubeCenterY + y2 * cubeSize * scale];
      });

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      ctx.strokeStyle = isTimeInverted ? 'rgba(234, 179, 8, 0.4)' : 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 1.2;

      for (const [start, end] of edges) {
        ctx.beginPath();
        ctx.moveTo(projected[start][0], projected[start][1]);
        ctx.lineTo(projected[end][0], projected[end][1]);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTimeInverted]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-1000"
      id="matrix-canvas-background"
    />
  );
};
