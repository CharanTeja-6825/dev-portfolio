"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { MotionValue } from "framer-motion";

// ─── Depth layer data ─────────────────────────────────────────────────────────

const floatingIcons = [
  { label: "React",  color: "#61DAFB", x: "12%", y: "22%", delay: 0,   size: 54, depthPx: 100 },
  { label: "Java",   color: "#ED8B00", x: "78%", y: "18%", delay: 0.2, size: 50, depthPx: 160 },
  { label: "DevOps", color: "#ffffff", x: "74%", y: "62%", delay: 0.4, size: 52, depthPx:  40 },
  { label: "Node",   color: "#68A063", x:  "8%", y: "66%", delay: 0.6, size: 50, depthPx:  70 },
  { label: "Python", color: "#FFD43B", x: "47%", y: "10%", delay: 0.8, size: 50, depthPx: 130 },
];

const microParticles = [
  { x: "28%", y: "40%", size: 3, delay: 0.3,  depthPx: 120, color: "#10b981", duration: 5,   opacity: 0.55 },
  { x: "62%", y: "32%", size: 2, delay: 0.7,  depthPx:  80, color: "#3b82f6", duration: 6,   opacity: 0.50 },
  { x: "38%", y: "58%", size: 2, delay: 1.1,  depthPx:  55, color: "#8b5cf6", duration: 7,   opacity: 0.45 },
  { x: "82%", y: "47%", size: 3, delay: 0.5,  depthPx:  95, color: "#10b981", duration: 5.5, opacity: 0.55 },
  { x: "18%", y: "76%", size: 2, delay: 0.9,  depthPx:  70, color: "#f59e0b", duration: 6.5, opacity: 0.45 },
  { x: "55%", y: "83%", size: 3, delay: 1.3,  depthPx:  45, color: "#ec4899", duration: 7,   opacity: 0.50 },
  { x: "33%", y: "17%", size: 2, delay: 0.1,  depthPx: 140, color: "#3b82f6", duration: 5,   opacity: 0.45 },
  { x: "88%", y: "28%", size: 2, delay: 1.0,  depthPx: 110, color: "#10b981", duration: 6,   opacity: 0.45 },
];

const diamonds = [
  { x: "20%", y: "45%", size: 10, delay: 0.4, depthPx:  85, color: "#10b981", duration: 6   },
  { x: "70%", y: "55%", size:  8, delay: 0.8, depthPx:  65, color: "#3b82f6", duration: 7   },
  { x: "50%", y: "72%", size: 12, delay: 1.2, depthPx:  50, color: "#8b5cf6", duration: 8   },
  { x: "85%", y: "38%", size:  8, delay: 0.2, depthPx: 115, color: "#f59e0b", duration: 6.5 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FloatingIcon({
  icon,
  scrollYProgress,
}: {
  icon: (typeof floatingIcons)[0];
  scrollYProgress: MotionValue<number>;
}) {
  // Outer div: scroll-driven parallax depth
  // Inner div: looping float animation — isolated so they don't conflict
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -icon.depthPx]);

  return (
    <motion.div
      className="absolute pointer-events-none select-none hidden sm:block"
      style={{ left: icon.x, top: icon.y, y: parallaxY }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.12, 0.28, 0.12],
          scale: [0.9, 1.05, 0.9],
          y: [0, -16, 0],
          rotate: [-4, 4, -4],
        }}
        transition={{
          delay: icon.delay,
          duration: 4 + icon.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center justify-center rounded-2xl backdrop-blur-sm font-bold text-xs"
        style={{
          width: icon.size,
          height: icon.size,
          color: icon.color,
          background: `${icon.color}15`,
          border: `1px solid ${icon.color}30`,
        }}
      >
        {icon.label}
      </motion.div>
    </motion.div>
  );
}

function MicroParticle({
  p,
  scrollYProgress,
}: {
  p: (typeof microParticles)[0];
  scrollYProgress: MotionValue<number>;
}) {
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -p.depthPx]);
  return (
    <motion.div
      className="absolute pointer-events-none select-none hidden sm:block"
      style={{ left: p.x, top: p.y, y: parallaxY }}
    >
      <motion.div
        animate={{
          opacity: [0, p.opacity, 0],
          scale: [0.4, 1.2, 0.4],
          y: [0, -12, 0],
        }}
        transition={{
          delay: p.delay,
          duration: p.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: p.color,
          boxShadow: `0 0 ${p.size * 5}px ${p.color}80`,
        }}
      />
    </motion.div>
  );
}

function FloatingDiamond({
  d,
  scrollYProgress,
}: {
  d: (typeof diamonds)[0];
  scrollYProgress: MotionValue<number>;
}) {
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -d.depthPx]);
  return (
    <motion.div
      className="absolute pointer-events-none select-none hidden md:block"
      style={{ left: d.x, top: d.y, y: parallaxY }}
    >
      <motion.div
        animate={{
          opacity: [0, 0.18, 0],
          rotate: [45, 90, 45],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          delay: d.delay,
          duration: d.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: d.size,
          height: d.size,
          background: `${d.color}50`,
          border: `1px solid ${d.color}80`,
          transform: "rotate(45deg)",
        }}
      />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // ── Depth layers (Z-order: farthest → closest) ──────────────────────────
  // Layer 0 – farthest: static-ish ambient glows
  const glowTopY  = useTransform(scrollYProgress, [0, 1], [0,    -80]);
  const glowBotY  = useTransform(scrollYProgress, [0, 1], [0,    -50]);

  // Layer 1 – concentric rings: innermost (closest) moves most
  const ring0Y = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const ring1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const ring2Y = useTransform(scrollYProgress, [0, 1], [0,  -65]);
  const ring3Y = useTransform(scrollYProgress, [0, 1], [0,  -35]);

  // Layer 5 – closest: main text content
  const contentY       = useTransform(scrollYProgress, [0, 1],   ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Ring metadata (defined after hooks, used in JSX)
  const ringData = [
    { r: 150, y: ring0Y, opacity: 0.08,  color: "#10b981" },
    { r: 290, y: ring1Y, opacity: 0.05,  color: "#3b82f6" },
    { r: 450, y: ring2Y, opacity: 0.035, color: "#8b5cf6" },
    { r: 630, y: ring3Y, opacity: 0.025, color: "#10b981" },
  ];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden px-4"
      style={{ minHeight: "100vh", background: "#030303" }}
    >
      {/* ── Layer 0: Radial top glow (farthest) ─────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: glowTopY,
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── Layer 0: Bottom ambient glow ────────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-1/2 pointer-events-none"
        style={{
          translateX: "-50%",
          width: "60%",
          height: "40%",
          y: glowBotY,
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Layer 1: Concentric depth rings ─────────────────────────────── */}
      {/* Rings "spread apart" as you scroll — near ones rise faster */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {ringData.map(({ r, y, opacity, color }) => (
          <motion.div
            key={r}
            style={{
              position: "absolute",
              width: r * 2,
              height: r * 2,
              borderRadius: "50%",
              border: `1px solid ${color}`,
              opacity,
              y,
            }}
          />
        ))}
      </div>

      {/* ── Layer 2: Floating diamonds (intermediate depth) ──────────────── */}
      {diamonds.map((d, i) => (
        <FloatingDiamond key={i} d={d} scrollYProgress={scrollYProgress} />
      ))}

      {/* ── Layer 3: Micro glow particles ───────────────────────────────── */}
      {microParticles.map((p, i) => (
        <MicroParticle key={i} p={p} scrollYProgress={scrollYProgress} />
      ))}

      {/* ── Layer 4: Floating tech icons (each at unique depth) ──────────── */}
      {floatingIcons.map((icon) => (
        <FloatingIcon key={icon.label} icon={icon} scrollYProgress={scrollYProgress} />
      ))}

      {/* ── Layer 5: Main content (closest to viewer) ────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-4"
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 mb-6 md:mb-8 px-4 py-2 rounded-full backdrop-blur-md"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.3)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 text-sm font-medium">Open to Opportunities</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-black leading-none tracking-tighter text-white mb-4 w-full"
          style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)" }}
        >
          Hello.{" "}
          <span className="block">
            I&apos;m{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Charan Teja
            </span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base md:text-xl text-white/60 font-light tracking-wider md:tracking-[0.2em] uppercase mb-4 w-full"
        >
          Full-Stack Developer | DevOps Enthusiast
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm md:text-base text-white/45 max-w-xl mb-8 leading-relaxed"
        >
          I build scalable full-stack applications and automate delivery pipelines with modern DevOps
          workflows. Currently exploring ML and audio processing while crafting reliable products.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#works"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm md:text-base font-semibold text-white transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(16,185,129,0.8), rgba(59,130,246,0.8))",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
          }}
        >
          View Featured Work
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}