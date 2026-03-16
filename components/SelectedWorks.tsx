"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

const projects = [
  {
    year: "2024",
    title: "DriveAway",
    description:
      "A smooth operating car rental platform with robust backend architecture, seamless booking flows, and full-stack implementation focused on performance and reliability.",
    tech: ["React", "Java", "MySQL"],
    color: "#10b981",
    bg: "from-emerald-950/50 to-teal-950/30",
    repo: "https://github.com/CharanTeja-6825/DRIVEAWAY",
    slug: "CharanTeja-6825/DRIVEAWAY",
  },
  {
    year: "2024",
    title: "CI/CD DevOps Pipeline",
    description:
      "Enterprise-level CI/CD implementation with Docker containerization, automated testing, and deployment workflows using Jenkins and GitHub Actions.",
    tech: ["Docker", "Jenkins", "GitHub Actions"],
    color: "#3b82f6",
    bg: "from-blue-950/50 to-indigo-950/30",
    repo: "https://github.com/CharanTeja-6825/GIT-ACTIONS-DOCKER-SDP-DEVOPS",
    slug: "CharanTeja-6825/GIT-ACTIONS-DOCKER-SDP-DEVOPS",
  },
  {
    year: "2023",
    title: "Docker DevOps",
    description:
      "Dockerized full-stack application demonstrating scalable containerization patterns and streamlined deployment for real-world team environments.",
    tech: ["Docker", "React", "Java"],
    color: "#8b5cf6",
    bg: "from-violet-950/50 to-purple-950/30",
    repo: "https://github.com/CharanTeja-6825/SDP-DEVOPS-DOCKER",
    slug: "CharanTeja-6825/SDP-DEVOPS-DOCKER",
  },
  {
    year: "2023",
    title: "Awetales Project",
    description:
      "An intelligent audio diarization system leveraging Python and machine learning to perform speaker segmentation and audio analysis.",
    tech: ["Python", "Machine Learning", "Audio Processing"],
    color: "#f59e0b",
    bg: "from-amber-950/50 to-orange-950/30",
    repo: "https://github.com/CharanTeja-6825/Awetales-Project",
    slug: "CharanTeja-6825/Awetales-Project",
  },
];

// ─── Project Card ─────────────────────────────────────────────────────────────

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

  // Stacked card scale (existing effect)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 1 - (total - index - 1) * 0.02]
  );

  // ── Inner parallax: left content (medium depth) vs right mockup (close depth)
  // Difference of ~42px makes the depth illusion clear without overflow issues
  const leftY   = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const rightY  = useTransform(scrollYProgress, [0, 1], [30, -30]);
  // Background glow drifts independently — fastest → appears deepest in card
  const bgGlowY = useTransform(scrollYProgress, [0, 1], [25, -80]);
  const bgGlowX = useTransform(scrollYProgress, [0, 1], [-8, 18]);

  return (
    <div ref={cardRef} className="md:sticky" style={{ top: `${80 + index * 16}px` }}>
      <motion.div
        style={{ scale }}
        className={`relative w-full rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-gradient-to-br ${project.bg}`}
        whileHover={{ borderColor: `${project.color}40` }}
        transition={{ duration: 0.3 }}
      >
        {/* Background glow with independent parallax */}
        <motion.div
          className="absolute inset-4 rounded-xl opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${project.color}50 0%, transparent 70%)`,
            y: bgGlowY,
            x: bgGlowX,
          }}
        />

        <div className="grid lg:grid-cols-2 gap-0 min-h-[360px]">
          {/* Left — medium depth (moves ±12 px) */}
          <motion.div style={{ y: leftY }} className="flex flex-col justify-between p-6 md:p-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-white/30 text-sm font-mono">{project.year}</span>
                <span className="w-8 h-px" style={{ background: project.color }} />
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

              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
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
          </motion.div>

          {/* Right — close depth (moves ±30 px — appears closer) */}
          <motion.div
            style={{ y: rightY }}
            className="relative flex items-center justify-center p-6 md:p-8 min-h-[240px]"
          >
            {/* Browser-chrome mockup */}
            <div
              className="relative w-full h-full min-h-[200px] rounded-xl border flex flex-col overflow-hidden"
              style={{
                background: `${project.color}08`,
                borderColor: `${project.color}25`,
              }}
            >
              {/* Browser top bar */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ borderColor: `${project.color}20`, background: `${project.color}0a` }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <div
                  className="ml-2 flex-1 h-5 rounded flex items-center px-2.5"
                  style={{ background: `${project.color}12` }}
                >
                  <span
                    className="text-[10px] font-mono truncate"
                    style={{ color: `${project.color}90` }}
                  >
                    github.com/{project.slug}
                  </span>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 flex flex-col justify-between p-5">
                <div>
                  <p className="text-white/25 text-[10px] uppercase tracking-widest mb-3 font-medium">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2.5 py-1 rounded-md"
                        style={{
                          color: project.color,
                          background: `${project.color}18`,
                          border: `1px solid ${project.color}30`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="my-4 space-y-1.5">
                  {[85, 60, 75, 45].map((w, i) => (
                    <div
                      key={i}
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${w}%`,
                        background: `${project.color}${i === 0 ? "40" : "20"}`,
                      }}
                    />
                  ))}
                </div>

                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-80"
                  style={{
                    color: project.color,
                    background: `${project.color}1f`,
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  View on GitHub
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Section header — scroll-driven entrance (replaces whileInView for richer feel)
  const headerY       = useTransform(sectionProgress, [0, 0.25], [60, 0]);
  const headerOpacity = useTransform(sectionProgress, [0, 0.22], [0, 1]);

  // Ambient background orb that drifts slowly across the section
  const orbY = useTransform(sectionProgress, [0, 1], [-80, 160]);
  const orbX = useTransform(sectionProgress, [0, 1], [0, 40]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="py-24 md:py-28 px-4 md:px-8 relative overflow-hidden"
      style={{ background: "#030303" }}
    >
      {/* Ambient parallax orb behind entire section */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "50%",
          translateX: "-50%",
          width: 900,
          height: 600,
          y: orbY,
          x: orbX,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(16,185,129,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header — scroll-driven entrance */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-20"
        >
          <p className="text-white/30 text-sm tracking-widest uppercase mb-3">Featured Projects</p>
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
              deliver.
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
