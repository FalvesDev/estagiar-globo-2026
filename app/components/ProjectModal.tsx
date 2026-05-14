"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const A  = "#e8630a";
const A2 = "#ff8c42";
const B  = "rgba(255,255,255,0.07)";

export interface ProjectData {
  tag: string;
  title: string;
  desc: string;
  tech: string[];
  github?: string;
  demo?: string;
  imgSrc?: string;
  imgLabel: string;
}

interface Props {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 z-[90]"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            className="fixed inset-0 z-[91] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
              style={{ background: "#111", border: `1px solid rgba(232,99,10,0.25)` }}
              onClick={e => e.stopPropagation()}
            >
              {/* close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center text-[#aaa] transition-colors hover:text-[#f0f0f0]"
                style={{
                  background: "rgba(10,10,10,0.82)",
                  border: `1px solid rgba(255,255,255,0.14)`,
                  boxShadow: "0 10px 28px rgba(0,0,0,0.35)",
                  backdropFilter: "blur(10px)",
                }}
                aria-label="Fechar"
                title="Fechar"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* imagem */}
              <div className="w-full bg-[#0a0a0a]" style={{ aspectRatio: "16/9" }}>
                {project.imgSrc ? (
                  <img
                    src={project.imgSrc}
                    alt={project.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3"
                    style={{ border: `1px dashed rgba(232,99,10,0.25)` }}>
                    <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="1" width="14" height="14" rx="2" stroke={A} strokeWidth="1.2"/>
                      <circle cx="5.5" cy="5.5" r="1.5" stroke={A} strokeWidth="1.2"/>
                      <path d="M1 11L5 7.5L8 10.5L11 7L15 11" stroke={A} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs" style={{ color: "rgba(232,99,10,0.5)", fontFamily: "monospace" }}>
                      {project.imgLabel}
                    </span>
                  </div>
                )}
              </div>

              {/* info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-[10px] font-semibold tracking-widest px-2 py-1 rounded"
                    style={{ fontFamily: "monospace", color: A2, background: "rgba(232,99,10,0.1)", border: "1px solid rgba(232,99,10,0.18)" }}
                  >
                    {project.tag}
                  </span>
                </div>

                <h3 className="font-bold text-[#f0f0f0] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "22px" }}>
                  {project.title}
                </h3>

                <p className="text-[14px] text-[#888] leading-relaxed mb-5">{project.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] rounded px-2 py-0.5"
                      style={{ fontFamily: "monospace", color: "#555", background: "#1a1a1a", border: `1px solid ${B}` }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#555] no-underline transition-colors hover:text-[#ff8c42]">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#555] no-underline transition-colors hover:text-[#ff8c42]">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                      </svg>
                      Ver demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
