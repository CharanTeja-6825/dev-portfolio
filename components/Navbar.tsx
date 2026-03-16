"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = ["Home", "Works", "Arsenal", "Lab"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const sectionMap: Record<string, string> = {
      Home: "hero",
      Works: "works",
      Arsenal: "arsenal",
      Lab: "lab",
    };
    const id = sectionMap[link];
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className={`flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl"
            : "backdrop-blur-md bg-white/5 border-white/10"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={(e) => handleNavClick(e, link)}
            className="relative px-5 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10"
          >
            {link}
          </a>
        ))}
        <a
          href="mailto:charanteja@example.com" /* TODO: replace with actual email */
          className="ml-2 px-5 py-2 text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-black rounded-full transition-colors duration-200"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}
