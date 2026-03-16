"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const floatingIcons = [
  { label: "React", color: "#61DAFB", x: "15%", y: "25%", delay: 0, size: 56 },
  { label: "TS", color: "#3178C6", x: "80%", y: "20%", delay: 0.2, size: 48 },
  { label: "Next", color: "#ffffff", x: "75%", y: "65%", delay: 0.4, size: 52 },
  { label: "Node", color: "#68A063", x: "10%", y: "70%", delay: 0.6, size: 50 },
  { label: "Py", color: "#FFD43B", x: "50%", y: "12%", delay: 0.8, size: 46 },
];

function FloatingIcon({
  icon,
}: {
  icon: (typeof floatingIcons)[0];
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: icon.x, top: icon.y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.15, 0.3, 0.15],
        scale: [0.9, 1.1, 0.9],
        y: [0, -20, 0],
        rotate: [-5, 5, -5],
      }}
      transition={{
        delay: icon.delay,
        duration: 4 + icon.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="flex items-center justify-center rounded-2xl backdrop-blur-sm font-bold text-sm"
        style={{
          width: icon.size,
          height: icon.size,
          color: icon.color,
          background: `${icon.color}15`,
          border: `1px solid ${icon.color}30`,
          fontSize: icon.size < 50 ? "11px" : "13px",
        }}
      >
        {icon.label}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh", background: "#030303" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Floating icons */}
      {floatingIcons.map((icon) => (
        <FloatingIcon key={icon.label} icon={icon} />
      ))}

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full backdrop-blur-md"
          style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 text-sm font-medium">Available for Work</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-black leading-none tracking-tighter text-white mb-4"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
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
          className="text-xl md:text-2xl text-white/50 font-light tracking-widest uppercase mb-10"
        >
          Full-Stack Developer
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
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(16,185,129,0.8), rgba(59,130,246,0.8))",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
          }}
        >
          Let&apos;s Connect
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
