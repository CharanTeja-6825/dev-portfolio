"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    year: "2024",
    title: "REUNIFY",
    description:
      "A real-time collaboration platform enabling teams to work together seamlessly. Features live document editing, video conferencing, and project management tools built with a scalable MERN stack architecture.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    color: "#10b981",
    bg: "from-emerald-950/50 to-teal-950/30",
  },
  {
    year: "2024",
    title: "AI Chat Assistant",
    description:
      "An intelligent conversational AI interface powered by large language models. Supports multi-turn conversations, context awareness, and plugin integrations for extended capabilities.",
    tech: ["Python", "React", "FastAPI", "OpenAI", "Redis"],
    color: "#3b82f6",
    bg: "from-blue-950/50 to-indigo-950/30",
  },
  {
    year: "2023",
    title: "E-Commerce Platform",
    description:
      "Full-stack shopping experience with real-time inventory management, secure payment processing via Stripe, and an intuitive admin dashboard for store management.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind"],
    color: "#8b5cf6",
    bg: "from-violet-950/50 to-purple-950/30",
  },
  {
    year: "2023",
    title: "Task Manager Pro",
    description:
      "Productivity app with real-time sync across devices. Features drag-and-drop task boards, team collaboration, time tracking, and insightful analytics dashboards.",
    tech: ["React", "Node.js", "PostgreSQL", "WebSockets", "D3.js"],
    color: "#f59e0b",
    bg: "from-amber-950/50 to-orange-950/30",
  },
  {
    year: "2024",
    title: "Portfolio Generator",
    description:
      "Dynamic portfolio builder that lets developers showcase their work beautifully. Drag-and-drop interface, live preview, custom themes, and one-click deployment to Vercel.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Prisma", "Vercel"],
    color: "#ec4899",
    bg: "from-pink-950/50 to-rose-950/30",
  },
];

function ProjectCard({
  project,
  index,
  total,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 1 - (total - index - 1) * 0.02]
  );

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{ top: `${80 + index * 20}px` }}
    >
      <motion.div
        style={{ scale }}
        className={`relative w-full rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-gradient-to-br ${project.bg}`}
        whileHover={{ borderColor: `${project.color}40` }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid md:grid-cols-2 gap-0 min-h-[420px]">
          {/* Left: content */}
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-white/30 text-sm font-mono">{project.year}</span>
                <span
                  className="w-8 h-px"
                  style={{ background: project.color }}
                />
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    color: project.color,
                    background: `${project.color}20`,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                {project.title}
              </h3>

              <p className="text-white/50 text-base leading-relaxed max-w-md">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: placeholder image */}
          <div className="relative flex items-center justify-center p-8 min-h-[240px]">
            <div
              className="absolute inset-4 rounded-xl opacity-20"
              style={{
                background: `radial-gradient(ellipse at center, ${project.color}50 0%, transparent 70%)`,
              }}
            />
            <div
              className="relative w-full h-full min-h-[200px] rounded-xl border flex items-center justify-center"
              style={{
                background: `${project.color}08`,
                borderColor: `${project.color}20`,
              }}
            >
              {/* Abstract project illustration */}
              <div className="flex flex-col items-center gap-4 opacity-40">
                <div
                  className="w-16 h-16 rounded-2xl"
                  style={{ background: `${project.color}40` }}
                />
                <div className="flex gap-2">
                  {[40, 60, 30, 50].map((w, i) => (
                    <div
                      key={i}
                      className="h-2 rounded-full"
                      style={{ width: w, background: project.color }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {[60, 30, 50, 40].map((w, i) => (
                    <div
                      key={i}
                      className="h-2 rounded-full opacity-50"
                      style={{ width: w, background: project.color }}
                    />
                  ))}
                </div>
              </div>
              <div
                className="absolute bottom-4 right-4 text-xs font-mono opacity-30"
                style={{ color: project.color }}
              >
                {project.title.toLowerCase().replace(/\s+/g, "-")}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SelectedWorks() {
  return (
    <section id="works" className="py-32 px-4 md:px-8" style={{ background: "#030303" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-white/30 text-sm tracking-widest uppercase mb-3">Selected Works</p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
            Projects that{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10b981, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              matter.
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
