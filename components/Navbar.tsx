"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "Works", "Arsenal", "Journey"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const sectionMap: Record<string, string> = {
      Home: "hero",
      Works: "works",
      Arsenal: "arsenal",
      Journey: "lab",
    };
    const id = sectionMap[link];
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-auto"
      >
        {/* Desktop nav */}
        <div
          className={`hidden md:flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300 ${
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
              className="relative px-5 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10 whitespace-nowrap"
            >
              {link}
            </a>
          ))}
          <a
            href="mailto:rcharanteja2006@gmail.com"
            className="ml-2 px-5 py-2 text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-black rounded-full transition-colors duration-200 whitespace-nowrap"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile nav pill */}
        <div
          className={`flex md:hidden items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? "backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl"
              : "backdrop-blur-md bg-white/5 border-white/10"
          }`}
        >
          <span className="text-white font-semibold text-sm tracking-tight">CT</span>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-200"
          >
            <Menu size={16} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "rgba(3,3,3,0.97)", backdropFilter: "blur(20px)" }}
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, link)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="w-full max-w-xs text-center py-4 text-3xl font-black text-white/80 hover:text-white transition-colors duration-200 border-b border-white/5"
                >
                  {link}
                </motion.a>
              ))}
              <motion.a
                href="mailto:rcharanteja2006@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.35 }}
                className="mt-6 px-8 py-3.5 text-base font-semibold bg-emerald-500 hover:bg-emerald-400 text-black rounded-full transition-colors duration-200"
              >
                Hire Me
              </motion.a>
            </div>

            {/* Footer */}
            <div className="p-6 flex justify-center gap-6">
              {[
                { label: "GitHub", url: "https://github.com/CharanTeja-6825" },
                { label: "LinkedIn", url: "https://www.linkedin.com/in/charan-teja-rathikindi/" },
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
        )}
      </AnimatePresence>
    </>
  );
}
