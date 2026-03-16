"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

const creativeItems = [
  { title: "Full-Stack Development",       tag: "Focus Area",   color: "#10b981", span: "md:col-span-2 sm:col-span-2" },
  { title: "DevOps & CI/CD",               tag: "Focus Area",   color: "#3b82f6", span: "" },
  { title: "Web Technologies",             tag: "Focus Area",   color: "#8b5cf6", span: "" },
  { title: "Problem Solving",              tag: "Strength",     color: "#f59e0b", span: "" },
  { title: "10+ Projects Completed",       tag: "Achievement",  color: "#ec4899", span: "" },
  { title: "Learning: Cloud & Scalability",tag: "Current Path", color: "#14b8a6", span: "md:col-span-2 sm:col-span-2" },
];

// ─── Lab Card ─────────────────────────────────────────────────────────────────

function LabCard({ item }: { item: (typeof creativeItems)[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-md cursor-pointer group w-full h-full"
      style={{ background: "rgba(255,255,255,0.03)", minHeight: "170px" }}
    >
      {/* Background gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 30% 30%, ${item.color}20 0%, transparent 70%)`,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(${item.color} 1px, transparent 1px), linear-gradient(90deg, ${item.color} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Abstract art */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-300">
        <div className="relative w-20 h-20">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: `${item.color}60`, filter: "blur(16px)" }}
          />
          <div
            className="absolute inset-4 rounded-xl rotate-45"
            style={{ background: `${item.color}80` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span
          className="text-xs font-semibold px-2 py-1 rounded-md mb-2 inline-block"
          style={{ color: item.color, background: `${item.color}20` }}
        >
          {item.tag}
        </span>
        <h4 className="text-white font-bold text-lg leading-tight">{item.title}</h4>
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60"
        style={{ background: item.color }}
      />
    </motion.div>
  );
}

// ─── Card with parallax wrapper ───────────────────────────────────────────────

function ParallaxCard({
  item,
  index,
  parallaxY,
}: {
  item: (typeof creativeItems)[0];
  index: number;
  parallaxY: MotionValue<number>;
}) {
  return (
    // Outer: scroll-driven depth
    <motion.div style={{ y: parallaxY }} className={item.span}>
      {/* Inner: whileInView entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.07 }}
      >
        <LabCard item={item} />
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function PixelsAtPlay() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Each card at a distinct depth — varying movement creates parallax volume
  const d0 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const d1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const d2 = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const d3 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const d4 = useTransform(scrollYProgress, [0, 1], [62, -62]);
  const d5 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const cardDepths = [d0, d1, d2, d3, d4, d5];

  // Section header
  const headerY       = useTransform(scrollYProgress, [0, 0.25], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.22], [0, 1]);

  // Ambient background orbs
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="py-24 md:py-28 px-4 md:px-8 relative overflow-hidden"
      style={{ background: "#030303" }}
    >
      {/* Ambient orb — top left */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-8%",
          width: 700,
          height: 600,
          y: orb1Y,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(236,72,153,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Ambient orb — bottom right */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          right: "-5%",
          width: 600,
          height: 500,
          y: orb2Y,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header — scroll-driven entrance */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-16 md:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-white/30 text-sm tracking-widest uppercase">
                Professional Journey
              </span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  color: "#ec4899",
                  background: "rgba(236,72,153,0.15)",
                  border: "1px solid rgba(236,72,153,0.3)",
                }}
              >
                ✦ Highlights
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
              Growth{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Journey.
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Grid — each card at a unique parallax depth */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {creativeItems.map((item, i) => (
            <ParallaxCard
              key={item.title}
              item={item}
              index={i}
              parallaxY={cardDepths[i]}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 md:mt-24 pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-white/20 text-sm text-center md:text-left">
            © 2026 Charan Teja. Code. Deploy. Repeat.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "GitHub",   url: "https://github.com/CharanTeja-6825" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/charan-teja-rathikindi/" },
              { label: "Email",    url: "mailto:rcharanteja2006@gmail.com" },
            ].map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white text-sm transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
