"use client";

import { motion } from "framer-motion";

const creativeItems = [
  { title: "3D Motion Reel", tag: "Animation", color: "#ec4899", span: "col-span-2" },
  { title: "Brand Identity", tag: "Branding", color: "#8b5cf6", span: "" },
  { title: "UI Experiments", tag: "Interface", color: "#3b82f6", span: "" },
  { title: "Generative Art", tag: "Creative Code", color: "#10b981", span: "" },
  { title: "Type Studies", tag: "Typography", color: "#f59e0b", span: "" },
  { title: "Motion Design", tag: "Animation", color: "#ec4899", span: "col-span-2" },
  { title: "Color Theory", tag: "Design", color: "#6366f1", span: "" },
  { title: "Micro Interactions", tag: "UX", color: "#14b8a6", span: "" },
];

function LabCard({ item }: { item: (typeof creativeItems)[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-md cursor-pointer group ${item.span}`}
      style={{ background: "rgba(255,255,255,0.03)", minHeight: "200px" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
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
        <div className="relative w-24 h-24">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: `${item.color}60`, filter: "blur(20px)" }}
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

export default function PixelsAtPlay() {
  return (
    <section id="lab" className="py-32 px-4 md:px-8" style={{ background: "#030303" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 flex items-end justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-white/30 text-sm tracking-widest uppercase">Creative Lab</span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  color: "#ec4899",
                  background: "rgba(236,72,153,0.15)",
                  border: "1px solid rgba(236,72,153,0.3)",
                }}
              >
                ✦ Lab
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
              Pixels{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                at Play.
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {creativeItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={item.span}
            >
              <LabCard item={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-white/20 text-sm">
            © 2024 Charan Teja. Crafted with ♥ and too much coffee.
          </p>
          <div className="flex items-center gap-6">
            {["GitHub", "LinkedIn", "Twitter"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-white/30 hover:text-white text-sm transition-colors duration-200"
              >
                {s}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
