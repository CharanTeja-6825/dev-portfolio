"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

const categories = [
  {
    name: "Frontend",
    color: "#3b82f6",
    items: [
      { name: "React", level: "Intermediate" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "HTML5", level: "Intermediate" },
      { name: "CSS3", level: "Intermediate" },
    ],
  },
  {
    name: "Backend",
    color: "#10b981",
    items: [
      { name: "Java", level: "Advanced" },
      { name: "Spring Boot", level: "Advanced" },
      { name: "Python", level: "Basic" },
      { name: "Node.js", level: "Basic" },
    ],
  },
  {
    name: "DevOps & Tools",
    color: "#f59e0b",
    items: [
      { name: "Docker", level: "Intermediate" },
      { name: "Jenkins", level: "Intermediate" },
      { name: "GitHub Actions", level: "Advanced" },
      { name: "Git", level: "Advanced" },
    ],
  },
  {
    name: "Databases",
    color: "#8b5cf6",
    items: [
      { name: "MySQL", level: "Advanced" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "SQL", level: "Intermediate" },
      { name: "Data Modeling", level: "Intermediate" },
    ],
  },
];

const levelColors: Record<string, string> = {
  Advanced: "#3b82f6",
  Intermediate: "#f59e0b",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function TechCard({ item, color }: { item: { name: string; level: string }; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: `0 16px 32px ${color}18` }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between p-3.5 rounded-xl border backdrop-blur-sm cursor-default"
      style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
          style={{ background: `${color}20`, color }}
        >
          {item.name.slice(0, 2).toUpperCase()}
        </div>
        <span className="text-white font-medium text-sm">{item.name}</span>
      </div>
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2"
        style={{
          color: levelColors[item.level] ?? "#ffffff",
          background: `${levelColors[item.level] ?? "#ffffff"}20`,
        }}
      >
        {item.level}
      </span>
    </motion.div>
  );
}

function CategoryColumn({
  cat,
  index,
  parallaxY,
}: {
  cat: (typeof categories)[0];
  index: number;
  parallaxY: MotionValue<number>;
}) {
  return (
    // Outer: scroll-driven parallax depth
    <motion.div style={{ y: parallaxY }}>
      {/* Inner: whileInView entrance — isolated from scroll parallax */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.12 }}
        whileHover={{ borderColor: `${cat.color}40` }}
        className="relative p-5 rounded-2xl border backdrop-blur-md transition-colors duration-300"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{
            background: `linear-gradient(90deg, transparent, ${cat.color}60, transparent)`,
          }}
        />

        {/* Category header */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${cat.color}20` }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
          </div>
          <h3 className="text-base font-bold text-white leading-tight">{cat.name}</h3>
        </div>

        {/* Tech items */}
        <div className="flex flex-col gap-2">
          {cat.items.map((item) => (
            <TechCard key={item.name} item={item} color={cat.color} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function TechArsenal() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Checkerboard depth pattern — columns 0,2 deeper (more movement) vs 1,3 shallower
  const col0Y = useTransform(scrollYProgress, [0, 1], [65, -65]);
  const col1Y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [72, -72]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [38, -38]);
  const colYValues = [col0Y, col1Y, col2Y, col3Y];

  // Section header
  const headerY       = useTransform(scrollYProgress, [0, 0.25], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.22], [0, 1]);

  // Ambient background orbs at different depths
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="arsenal"
      ref={sectionRef}
      className="py-24 md:py-28 px-4 md:px-8 relative overflow-hidden"
      style={{ background: "#030303" }}
    >
      {/* Ambient orb — top right (deeper layer) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-15%",
          right: "-8%",
          width: 700,
          height: 600,
          y: orb1Y,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Ambient orb — bottom left (shallower layer) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "-15%",
          left: "-5%",
          width: 600,
          height: 550,
          y: orb2Y,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(236,72,153,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header — scroll-driven entrance */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-16 md:mb-20"
        >
          <p className="text-white/30 text-sm tracking-widest uppercase mb-3">Skills & Tech</p>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
            Tech{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Arsenal.
            </span>
          </h2>
        </motion.div>

        {/* Grid — each column at a unique parallax depth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat, ci) => (
            <CategoryColumn
              key={cat.name}
              cat={cat}
              index={ci}
              parallaxY={colYValues[ci]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
