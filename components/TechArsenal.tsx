"use client";

import { motion } from "framer-motion";

const categories = [
  {
    name: "Frontend",
    color: "#3b82f6",
    items: [
      { name: "React", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Framer Motion", level: "Advanced" },
    ],
  },
  {
    name: "Backend",
    color: "#10b981",
    items: [
      { name: "Node.js", level: "Expert" },
      { name: "Python", level: "Expert" },
      { name: "FastAPI", level: "Advanced" },
      { name: "MongoDB", level: "Expert" },
      { name: "PostgreSQL", level: "Advanced" },
    ],
  },
  {
    name: "Tools",
    color: "#f59e0b",
    items: [
      { name: "Git", level: "Expert" },
      { name: "Docker", level: "Advanced" },
      { name: "AWS", level: "Intermediate" },
      { name: "Figma", level: "Advanced" },
      { name: "VS Code", level: "Expert" },
    ],
  },
];

const levelColors: Record<string, string> = {
  Expert: "#10b981",
  Advanced: "#3b82f6",
  Intermediate: "#f59e0b",
};

function TechCard({ item, color }: { item: { name: string; level: string }; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 20px 40px ${color}20` }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between p-4 rounded-xl border backdrop-blur-sm cursor-default"
      style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
          style={{ background: `${color}20`, color }}
        >
          {item.name.slice(0, 2).toUpperCase()}
        </div>
        <span className="text-white font-medium text-sm">{item.name}</span>
      </div>
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-full"
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

export default function TechArsenal() {
  return (
    <section id="arsenal" className="py-32 px-4 md:px-8" style={{ background: "#030303" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-white/30 text-sm tracking-widest uppercase mb-3">Skills & Tech</p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
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

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
              whileHover={{ borderColor: `${cat.color}40` }}
              className="relative p-6 rounded-2xl border backdrop-blur-md transition-colors duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              {/* Glow */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, transparent, ${cat.color}60, transparent)` }}
              />

              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${cat.color}20` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                </div>
                <h3 className="text-lg font-bold text-white">{cat.name}</h3>
              </div>

              {/* Tech items */}
              <div className="flex flex-col gap-2">
                {cat.items.map((item) => (
                  <TechCard key={item.name} item={item} color={cat.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
