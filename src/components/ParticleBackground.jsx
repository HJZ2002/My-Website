import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, nodes, animationId;

    const NODE_COUNT = 90;
    const MAX_DIST = 140;
    const MOUSE_DIST = 180;
    const MOUSE_PULL = 0.015;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initNodes();
    }

    function initNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 1,
      }));
    }

    function dist(a, b) {
      const dx = a.x - b.x,
        dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const mouse = mouseRef.current;

      nodes.forEach((n) => {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < MOUSE_DIST && d > 0) {
          const force = (MOUSE_DIST - d) / MOUSE_DIST;
          n.vx += (dx / d) * force * MOUSE_PULL;
          n.vy += (dy / d) * force * MOUSE_PULL;
        }

        n.vx *= 0.995;
        n.vy *= 0.995;

        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 1.2) {
          n.vx *= 1.2 / speed;
          n.vy *= 1.2 / speed;
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > W) { n.x = W; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > H) { n.y = H; n.vy *= -1; }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = dist(nodes[i], nodes[j]);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(180,180,180,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const md = dist(n, mouse);
        const near = md < MOUSE_DIST;
        const glow = near ? Math.max(0, 1 - md / MOUSE_DIST) : 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + glow * 2, 0, Math.PI * 2);

        if (near) {
          const r = Math.round(200 + glow * 55);
          const g = Math.round(200 - glow * 130);
          const b = Math.round(200 - glow * 200);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.7 + glow * 0.3})`;
        } else {
          ctx.fillStyle = "rgba(180,180,180,0.5)";
        }
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    function handleMouseMove(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function handleMouseLeave() {
      mouseRef.current.x = -999;
      mouseRef.current.y = -999;
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        background: "#0a0a0a",
      }}
    />
  );
}
