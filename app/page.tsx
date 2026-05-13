"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { ProjectModal, ProjectData } from "./components/ProjectModal";
import {
  IconBrain, IconPrint3D, IconDice,
  IconCode, IconGlobe, IconArrow, IconSparkle,
} from "./components/Icons";

/* ─── palette ─── */
const A  = "#e8630a";
const A2 = "#ff8c42";
const B  = "rgba(255,255,255,0.07)";

/* ─── primitives ─── */
function Q({ n, children }: { n: string; children: string }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <span
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
        style={{ background: `rgba(232,99,10,0.15)`, color: A2, border: `1px solid rgba(232,99,10,0.3)` }}
      >
        {n}
      </span>
      <span className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: A }}>
        {children}
      </span>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Section({ id, children, className = "", dark = false }: { id?: string; children: React.ReactNode; className?: string; dark?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      id={id} ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } } }}
      className={`py-28 ${className}`}
      style={{ background: dark ? "#0d0d0d" : "#0a0a0a", borderBottom: `1px solid ${B}` }}
    >
      {children}
    </motion.section>
  );
}

function Orb({ size, x, y, delay = 0 }: { size: number; x: string; y: string; delay?: number }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, background: `radial-gradient(circle, rgba(232,99,10,0.07) 0%, transparent 65%)` }}
      animate={{ scale: [1, 1.12, 1] }}
      transition={{ duration: 9 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function Dot({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div className="absolute w-[3px] h-[3px] rounded-full pointer-events-none"
      style={{ left: x, top: y, background: A }}
      animate={{ opacity: [0, 0.45, 0], scale: [0.3, 1, 0.3] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function ImgPlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full aspect-video rounded-xl flex flex-col items-center justify-center gap-2.5 mb-5"
      style={{ background: "rgba(255,255,255,0.02)", border: `1px dashed rgba(232,99,10,0.28)` }}>
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="14" height="14" rx="2" stroke={A} strokeWidth="1.2"/>
        <circle cx="5.5" cy="5.5" r="1.5" stroke={A} strokeWidth="1.2"/>
        <path d="M1 11L5 7.5L8 10.5L11 7L15 11" stroke={A} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-[10px]" style={{ color: "rgba(232,99,10,0.5)", fontFamily: "monospace" }}>
        {label}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════
   NAV
═══════════════════════════════════════ */
const NAV_SECTIONS = [
  { id: "apresentacao", label: "Quem sou" },
  { id: "historia",     label: "História" },
  { id: "projetos",     label: "Projetos" },
  { id: "area",         label: "Plataforma de IA" },
];

function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 22 });
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => setScrolled(v > 0.01));
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach(({ id, label }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrentSection(label); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
      <div style={{
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${B}` : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <div className="max-w-5xl mx-auto px-8 py-4 flex justify-between items-center relative">
          <motion.span className="text-sm font-bold tracking-widest uppercase text-[#f0f0f0]"
            style={{ fontFamily: "var(--font-display)" }} whileHover={{ color: A2 }}>
            Felipe Alves
          </motion.span>

          <nav className="hidden md:flex gap-8">
            {NAV_SECTIONS.map(({ id, label }) => (
              <motion.a key={id} href={`#${id}`}
                className="text-xs no-underline tracking-wide transition-colors"
                style={{ color: currentSection === label ? A2 : "#555" }}
                whileHover={{ color: A2 }} transition={{ duration: 0.15 }}>
                {label}
              </motion.a>
            ))}
          </nav>

          <div className="flex gap-3 items-center">
            <motion.a href="https://github.com/FalvesDev" target="_blank" rel="noopener noreferrer"
              className="text-[11px] text-[#555] no-underline flex items-center gap-1.5"
              whileHover={{ color: A2 }}>
              <IconCode className="w-3.5 h-3.5" /> GitHub
            </motion.a>
            <motion.a href="https://falves.dev" target="_blank" rel="noopener noreferrer"
              className="text-[11px] text-[#f0f0f0] no-underline border rounded-full px-4 py-1.5 flex items-center gap-1.5"
              style={{ borderColor: B }}
              whileHover={{ borderColor: "rgba(232,99,10,0.4)", color: A2 }}>
              <IconGlobe className="w-3.5 h-3.5" /> falves.dev
            </motion.a>
          </div>
        </div>
      </div>
      <motion.div className="h-[2px] origin-left"
        style={{ scaleX, background: `linear-gradient(90deg, ${A}, ${A2})` }} />

      {/* etiqueta de seção atual — canto inferior esquerdo */}
      <motion.div
        className="fixed bottom-6 left-6 z-50 hidden md:block"
        animate={{ opacity: scrolled && currentSection ? 1 : 0, y: scrolled && currentSection ? 0 : 8 }}
        transition={{ duration: 0.3 }}>
        <motion.span
          key={currentSection}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
          style={{ color: "#555", background: "rgba(10,10,10,0.85)", border: `1px solid ${B}`, fontFamily: "var(--font-display)", backdropFilter: "blur(12px)" }}>
          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: A }} />
          {currentSection}
        </motion.span>
      </motion.div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden"
      style={{ borderBottom: `1px solid ${B}` }}>
      <Orb size={800} x="-15%" y="-25%" />
      <Orb size={400} x="65%" y="50%" delay={4} />
      {[
        { x: "18%", y: "28%" }, { x: "72%", y: "18%" }, { x: "42%", y: "72%" },
        { x: "88%", y: "60%" }, { x: "8%",  y: "75%" }, { x: "58%", y: "44%" },
      ].map((p, i) => <Dot key={i} x={p.x} y={p.y} delay={i * 0.7} />)}

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      <div className="max-w-5xl mx-auto px-8 pb-24 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium mb-10 tracking-wide"
          style={{ background: "rgba(232,99,10,0.1)", border: `1px solid rgba(232,99,10,0.22)`, color: A2 }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: A }} />
          Programa Estagiar Globo 2026 · Plataforma de IA
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-bold leading-[0.9] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(64px, 10vw, 108px)", letterSpacing: "-0.03em" }}>
            Oi, eu sou<br />o{" "}
            <span className="text-shimmer">Felipe Alves.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="text-xl max-w-lg leading-relaxed mb-4"
          style={{ color: "#777", fontWeight: 300 }}>
          22 anos, Rio de Janeiro. Engenharia de Software com background em
          Automação Industrial. Construo software que resolve problemas reais.
        </motion.p>

        {/* 3 perguntas como âncoras visuais */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 mt-10">
          {[
            { n: "1", label: "Quem sou hoje",            href: "#apresentacao" },
            { n: "2", label: "O que me impulsiona",      href: "#historia" },
            { n: "3", label: "Por que Plataforma de IA", href: "#area" },
          ].map(({ n, label, href }) => (
            <motion.a key={n} href={href}
              className="flex items-center gap-2.5 no-underline rounded-xl px-4 py-3 text-sm"
              style={{ background: "#111", border: `1px solid ${B}`, color: "#888" }}
              whileHover={{ borderColor: "rgba(232,99,10,0.35)", color: A2, y: -3 }}
              transition={{ duration: 0.2 }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                style={{ background: "rgba(232,99,10,0.12)", color: A2 }}>{n}</span>
              {label}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-8 flex items-center gap-2 text-[11px] text-[#444]">
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <IconArrow className="w-3 h-3 rotate-90" />
          </motion.div>
          role pra baixo
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PERGUNTA 1: como você se apresenta hoje?
═══════════════════════════════════════ */
function Apresentacao() {
  return (
    <Section id="apresentacao">
      <div className="max-w-5xl mx-auto px-8">
        <FadeUp><Q n="1">Como você se apresenta hoje?</Q></FadeUp>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <FadeUp delay={0.05}>
              <h2 className="font-bold leading-[0.9] tracking-tight mb-8"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,5.5vw,62px)", letterSpacing: "-0.03em" }}>
                Engenharia de Software.<br />
                <span style={{ color: A2 }}>Projetos reais.<br />Problemas reais.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-[#888] leading-relaxed mb-5" style={{ fontSize: "17px" }}>
                Sou Felipe, tenho 22 anos, estudante de Engenharia de Software no Rio de Janeiro.
                Trabalho com Next.js, TypeScript, React e Python, construindo sistemas que
                automatizam processos e resolvem problemas concretos.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="text-[#888] leading-relaxed mb-5" style={{ fontSize: "17px" }}>
                Como freelancer, já reduzi o tempo de processos internos de clientes em até 93%.
                Nos projetos pessoais, vou além: construí um agente de IA com arquitetura de
                memória em múltiplas camadas, um app mobile com algoritmo de saúde financeira e
                diversas automações com Python e IA aplicada.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p style={{ fontSize: "16px", color: "#f0f0f0" }}>
                Mas mais do que a stack, o que me define é de onde vim e por que escolhi esse caminho.
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="flex flex-wrap gap-2 mt-7">
                {["Next.js", "TypeScript", "React", "Python", "LLMs", "IA Aplicada"].map(t => (
                  <span key={t} className="text-[11px] rounded-md px-2.5 py-1.5"
                    style={{ fontFamily: "monospace", color: "#555", background: "#151515", border: `1px solid ${B}` }}>
                    {t}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { num: "93%", label: "Redução em processos críticos para clientes" },
              { num: "3+",  label: "Anos com projetos rodando em produção" },
              { num: "6",   label: "Projetos entregues, pessoais e comerciais" },
            ].map((s, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.08}>
                <motion.div className="rounded-2xl p-5"
                  style={{ background: "#111", border: `1px solid ${B}` }}
                  whileHover={{ borderColor: "rgba(232,99,10,0.3)", y: -3 }}
                  transition={{ duration: 0.2 }}>
                  <div className="font-bold leading-none mb-1.5"
                    style={{ fontFamily: "var(--font-display)", fontSize: "38px", color: A2 }}>
                    <AnimatedCounter value={s.num} />
                  </div>
                  <div className="text-[12px] text-[#555]">{s.label}</div>
                </motion.div>
              </FadeUp>
            ))}

          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════
   HISTÓRIA: a conexão com a Globo
═══════════════════════════════════════ */
function Historia() {
  return (
    <Section id="historia" dark>
      <div className="max-w-5xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <FadeUp><Q n="2">O que te impulsiona e como isso se conecta com a Globo?</Q></FadeUp>

            <FadeUp delay={0.05}>
              <h2 className="font-bold leading-[0.9] tracking-tight mb-8"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,5vw,54px)", letterSpacing: "-0.03em" }}>
                A Globo não é só<br />
                <span style={{ color: A2 }}>mais uma empresa<br />pra mim.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-[#888] leading-relaxed mb-5" style={{ fontSize: "17px" }}>
                Meu pai, Bruno Alves, trabalhou na Globo por quase 10 anos. Ajudou a construir
                o G1 e a escalar o site de receitas. Era uma das áreas que ele mais falava com
                orgulho, mesmo sendo discreto sobre os bastidores.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <blockquote className="pl-5 my-7" style={{ borderLeft: `2px solid ${A}` }}>
                <p className="italic leading-relaxed" style={{ fontSize: "18px", color: "#d8d8d8", fontWeight: 300 }}>
                  "Tinha uns 7, 8 anos quando fui visitar ele no trabalho pela primeira vez.
                  Saí de lá com uma certeza que não soube nomear naquela época, mas que hoje
                  entendo muito bem: queria fazer parte de algo assim."
                </p>
              </blockquote>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-[#888] leading-relaxed mb-5" style={{ fontSize: "17px" }}>
                Quando fiz 15 anos, fui fazer Automação Industrial no IFMG, motivado por ele.
                Quando entrei na faculdade de Software, me mudei pra morar com ele. Aprendi o
                dia a dia de trabalhar como programador do lado dele. Foi nessa época que me
                descobri de verdade como dev. Pensei em desistir algumas vezes. Ele nunca deixou.
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <p className="leading-relaxed mb-4" style={{ fontSize: "17px", color: "#f0f0f0" }}>
                Sempre disse que um dia ia trabalhar onde ele trabalhou.
                Infelizmente ele não está mais aqui pra ver esse momento. Tenho certeza
                que, onde quer que ele esteja, está feliz de eu ter chegado até aqui.
              </p>
              <p className="text-[#888] leading-relaxed mb-6" style={{ fontSize: "15px" }}>
                O nome que uso em tudo, falves.dev, GitHub, em todo lugar, é uma homenagem a ele.
                Bruno Alves. Eterno Balves.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="inline-block rounded-xl px-5 py-3"
                style={{ background: "rgba(232,99,10,0.08)", border: "1px solid rgba(232,99,10,0.22)" }}>
                <p style={{ fontSize: "15px", color: A2 }}>
                  Essa é a razão pela qual a Globo não é só mais uma empresa pra mim.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* lado direito: fatos visuais */}
          <div className="flex flex-col gap-4 md:pt-14">
            {[
              { val: "~10", label: "anos que meu pai dedicou à Globo" },
              { val: "G1",  label: "que ele ajudou a construir e escalar" },
              { val: "2007", label: "quando tudo começou, eu tinha 7 anos" },
            ].map((b, i) => (
              <FadeUp key={i} delay={0.15 + i * 0.1}>
                <motion.div className="rounded-2xl px-6 py-5"
                  style={{ background: "#111", border: `1px solid ${B}` }}
                  whileHover={{ borderColor: "rgba(232,99,10,0.3)", y: -3 }}
                  transition={{ duration: 0.2 }}>
                  <div className="font-bold leading-none mb-2"
                    style={{ fontFamily: "var(--font-display)", fontSize: "44px", color: A2 }}>
                    {b.val}
                  </div>
                  <div className="text-[12px] text-[#555]">{b.label}</div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════
   PERGUNTA 2: o que te impulsiona?
═══════════════════════════════════════ */
function Impulsiona() {
  return (
    <Section id="impulsiona" dark>
      <div className="max-w-5xl mx-auto px-8">
        <FadeUp><Q n="2">O que te impulsiona e como isso se conecta com a Globo?</Q></FadeUp>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <FadeUp delay={0.05}>
              <h2 className="font-bold leading-[0.9] tracking-tight mb-8"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,58px)", letterSpacing: "-0.03em" }}>
                O problema<br />
                <span style={{ color: A2 }}>do outro lado.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-[#888] leading-relaxed mb-5" style={{ fontSize: "17px" }}>
                Nunca me importei muito com qual tecnologia usar. O que me move é o problema
                do outro lado. Tem algo que tá demorando? Tem processo que falha? Preciso resolver.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="text-[#888] leading-relaxed mb-8" style={{ fontSize: "17px" }}>
                Isso conecta diretamente com o que a Globo faz: sistemas que afetam milhões
                de pessoas ao mesmo tempo exigem esse mesmo olhar, de quem pensa em impacto,
                não só em código.
              </p>
            </FadeUp>

            {/* valores em linha */}
            <FadeUp delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {[
                  "Impacto mensurável",
                  "Problemas reais",
                  "Aprendizado contínuo",
                  "Autenticidade",
                ].map(v => (
                  <span key={v} className="text-[12px] rounded-full px-3 py-1.5"
                    style={{ color: A2, background: "rgba(232,99,10,0.08)", border: "1px solid rgba(232,99,10,0.2)" }}>
                    {v}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* métricas reais */}
          <div className="flex flex-col gap-4">
            <FadeUp delay={0.1}>
              <p className="text-[12px] text-[#555] mb-1 uppercase tracking-widest">resultados concretos</p>
            </FadeUp>
            {[
              { num: "93%",  title: "Menos tempo",    desc: "Processo de 30 min → 2 min. Automação feita do zero, zero erros." },
              { num: "5×",   title: "Mais rápido",    desc: "Emissão manual de documentos → formulário inteligente com auto-preenchimento." },
              { num: "+40%", title: "Mais resultado",  desc: "Consultas de clínica médica no primeiro mês após lançamento com SEO." },
            ].map((c, i) => (
              <FadeUp key={i} delay={0.12 + i * 0.1}>
                <motion.div className="rounded-2xl p-5 flex gap-4 items-start"
                  style={{ background: "#111", border: `1px solid ${B}` }}
                  whileHover={{ borderColor: "rgba(232,99,10,0.3)", y: -3 }}
                  transition={{ duration: 0.2 }}>
                  <div className="font-bold leading-none flex-shrink-0"
                    style={{ fontFamily: "var(--font-display)", fontSize: "32px", color: A2 }}>
                    <AnimatedCounter value={c.num} />
                  </div>
                  <div>
                    <div className="font-semibold text-[#f0f0f0] mb-1"
                      style={{ fontFamily: "var(--font-display)", fontSize: "14px" }}>{c.title}</div>
                    <p className="text-[12px] text-[#555] leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════
   PROJETOS: prova, não portfolio
═══════════════════════════════════════ */
type ProjectEntry = ProjectData & { highlight?: boolean };

function Projetos({ onOpen }: { onOpen: (p: ProjectData) => void }) {
  const projects: ProjectEntry[] = [
    {
      tag: "AGENTE DE IA",
      title: "O.R.I.O.N",
      desc: "Assistente desktop com voz em tempo real, memória semântica e RAG. Multi-LLM com ChromaDB.",
      tech: ["Python", "React", "Electron", "Gemini API"],
      github: "https://github.com/FalvesDev/orion",
      imgSrc: "/screenshots/orion.png",
      imgLabel: "screenshot · orion",
      highlight: true,
    },
    {
      tag: "MOBILE · IA",
      title: "ColectorHub",
      desc: "App para colecionadores de jogos físicos. Aponta a câmera pra estante e a IA cataloga via OCR, sem digitar nada.",
      tech: ["Flutter", "Supabase", "Google ML Kit", "Gemini Vision"],
      github: "https://github.com/FalvesDev/ColectorHub",
      imgSrc: "/screenshots/colectorhub.png",
      imgLabel: "screenshot · colectorhub",
    },
    {
      tag: "MOBILE · FINANÇAS",
      title: "Contador de Bolso",
      desc: "Finanças pessoais com entrada por voz. Cada usuário recebe sugestões baseadas no próprio perfil, nunca de todo mundo.",
      tech: ["React Native", "Expo", "TypeScript", "Supabase"],
      github: "https://github.com/FalvesDev/contador-de-bolso",
      imgSrc: "/screenshots/contador-de-bolso.png",
      imgLabel: "screenshot · contador de bolso",
    },
    {
      tag: "EDUCAÇÃO",
      title: "Dev Roadmap",
      desc: "Plataforma gamificada do zero ao júnior em 9 meses. PWA com progresso persistente.",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      github: "https://github.com/FalvesDev/dev-roadmap-next",
      demo: "https://dev-roadmap-next.vercel.app",
      imgSrc: "/screenshots/dev-roadmap.png",
      imgLabel: "screenshot · dev roadmap",
    },
    {
      tag: "REAL · NDA · 2026",
      title: "Renomeador Prevenir",
      desc: "Empresa renomeava centenas de arquivos manualmente. App desktop com IA e interface gráfica pra fazer em lote com regras personalizáveis. Horas → minutos, zero erros.",
      tech: ["Python", "IA", "Automação"],
      imgSrc: "/screenshots/renomeador-prevenir.png",
      imgLabel: "screenshot · renomeador prevenir",
    },
    {
      tag: "COMMERCIAL · NDA",
      title: "Contratos Prevenir",
      desc: "Geração de propostas e contratos com preenchimento inteligente + export PDF. 5× mais rápido que o fluxo manual.",
      tech: ["Next.js", "TypeScript", "PDF"],
      imgSrc: "/screenshots/contratos-prevenir.png",
      imgLabel: "screenshot · contratos prevenir",
    },
  ];

  return (
    <Section id="projetos">
      <div className="max-w-5xl mx-auto px-8">
        <FadeUp>
          <span className="block mb-6 text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: A }}>
            Projetos
          </span>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h2 className="font-bold leading-[0.9] tracking-tight mb-12"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,58px)", letterSpacing: "-0.03em" }}>
            O que eu<br /><span style={{ color: A2 }}>construí.</span>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <FadeUp key={i} delay={0.06 + i * 0.06}>
              <motion.div className="rounded-2xl p-6 h-full flex flex-col cursor-pointer"
                style={{ background: "#111", border: `1px solid ${p.highlight ? "rgba(232,99,10,0.3)" : B}` }}
                whileHover={{ y: -5, borderColor: "rgba(232,99,10,0.38)" }}
                transition={{ duration: 0.22 }}
                onClick={() => onOpen(p)}>
                <ImgPlaceholder label={p.imgLabel} />

                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-semibold tracking-widest px-2 py-1 rounded"
                    style={{ fontFamily: "monospace", color: A2, background: "rgba(232,99,10,0.1)", border: "1px solid rgba(232,99,10,0.18)" }}>
                    {p.tag}
                  </span>
                  {p.highlight && (
                    <motion.span style={{ color: A }}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}>
                      <IconSparkle className="w-4 h-4" />
                    </motion.span>
                  )}
                </div>

                <h3 className="font-bold mb-2 text-[#f0f0f0]"
                  style={{ fontFamily: "var(--font-display)", fontSize: "18px" }}>{p.title}</h3>
                <p className="text-[13px] text-[#666] leading-relaxed flex-1 mb-4">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map(t => (
                    <span key={t} className="text-[10px] rounded px-2 py-0.5"
                      style={{ fontFamily: "monospace", color: "#555", background: "#1a1a1a", border: `1px solid ${B}` }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4" onClick={e => e.stopPropagation()}>
                  {p.github && (
                    <motion.a href={p.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] text-[#555] no-underline"
                      whileHover={{ color: A2, x: 2 }}>
                      <IconCode className="w-3 h-3" /> GitHub
                    </motion.a>
                  )}
                  {p.demo && (
                    <motion.a href={p.demo} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] text-[#555] no-underline"
                      whileHover={{ color: A2, x: 2 }}>
                      <IconGlobe className="w-3 h-3" /> Demo
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.5}>
          <div className="mt-8 flex justify-center">
            <motion.a href="https://github.com/FalvesDev" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#666] no-underline rounded-full px-6 py-2.5"
              style={{ border: `1px solid ${B}` }}
              whileHover={{ borderColor: "rgba(232,99,10,0.35)", color: A2, scale: 1.02 }}>
              <IconCode className="w-4 h-4" />
              Ver todos no GitHub
              <IconArrow className="w-3 h-3" />
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════
   PERGUNTA 3: trajetória + área
═══════════════════════════════════════ */
function Area() {
  return (
    <Section id="area" dark>
      <div className="max-w-5xl mx-auto px-8 relative">
        <Orb size={500} x="50%" y="-10%" delay={2} />
        <div className="relative z-10">
          <FadeUp><Q n="3">Como sua trajetória se conecta com a Plataforma de IA?</Q></FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="font-bold leading-[0.88] tracking-tight mb-10"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,6vw,76px)", letterSpacing: "-0.03em" }}>
              Como cheguei<br />
              <span style={{ color: A2 }}>na Plataforma de IA.</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-12 mb-10">
            <FadeUp delay={0.1}>
              <p className="text-[#888] leading-relaxed" style={{ fontSize: "17px" }}>
                Entrei em automação pelo IFMG. Quando comecei Engenharia de Software, JavaScript
                virou a ferramenta do dia a dia. Fui aprendendo Python no processo. LLMs
                apareceram no meio do caminho e, na primeira vez que vi o que dava pra fazer,
                parei tudo e fui aprender.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-[#888] leading-relaxed" style={{ fontSize: "17px" }}>
                O que construí com IA até agora foi sempre pra resolver um problema concreto.
                Nunca foi por moda. O que não sei ainda é como isso funciona em escala real,
                com milhões de usuários. É exatamente isso que quero aprender.
              </p>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                exp: "O.R.I.O.N",
                detail: "Memória em 4 camadas · ChromaDB · RAG · multi-LLM",
                conn: "Agente desktop com voz e memória semântica. Começou como experimento pra entender RAG. Acabou virando o projeto mais complexo que já construí.",
              },
              {
                exp: "Contador de Bolso",
                detail: "Algoritmo de saúde financeira · perfil individual",
                conn: "Cada usuário recebe sugestões baseadas no próprio histórico. Aprendi que personalização de verdade é difícil de fazer direito.",
              },
              {
                exp: "ColectorHub",
                detail: "Flutter · Google ML Kit · Gemini Vision · OCR",
                conn: "OCR e visão computacional pra catalogar jogos físicos. A IA não era a estrela, era a solução mais simples pro problema.",
              },
            ].map((c, i) => (
              <FadeUp key={i} delay={0.15 + i * 0.08}>
                <motion.div className="rounded-2xl p-5 h-full flex flex-col"
                  style={{ background: "#111", border: `1px solid ${B}` }}
                  whileHover={{ borderColor: "rgba(232,99,10,0.3)", y: -3 }}
                  transition={{ duration: 0.2 }}>
                  <div className="font-semibold mb-1 tracking-wide"
                    style={{ fontFamily: "var(--font-display)", fontSize: "14px", color: A2 }}>
                    {c.exp}
                  </div>
                  <div className="text-[10px] text-[#444] mb-3 leading-relaxed"
                    style={{ fontFamily: "monospace" }}>
                    {c.detail}
                  </div>
                  <p className="text-[13px] text-[#666] leading-relaxed flex-1">{c.conn}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════
   INTERESSES: breve, honesto
═══════════════════════════════════════ */
function Interesses() {
  const cards = [
    { Icon: IconBrain,    title: "LLMs e modelos locais", desc: "Parâmetros, quantização, inferência local com Ollama. Quero entender o que acontece dentro da caixa preta." },
    { Icon: IconPrint3D,  title: "Impressão 3D e resina",  desc: "Action figures impressos, pintados à mão e trabalhados em resina. Comecei com filamento e fiquei tão bom que nunca parei." },
    { Icon: IconDice,     title: "RPG de mesa",           desc: "10 anos mestrando. Há 2, de forma profissional. Improvisar dentro de um sistema de regras pra um grupo com expectativas completamente diferentes." },
  ];

  return (
    <Section>
      <div className="max-w-5xl mx-auto px-8">
        <FadeUp>
          <span className="block mb-6 text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: A }}>
            Interesses e valores
          </span>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div>
            <FadeUp delay={0.05}>
              <h2 className="font-bold leading-[0.9] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4.5vw,52px)", letterSpacing: "-0.03em" }}>
                Fora do trabalho<br />
                <span style={{ color: A2 }}>continuo estudando.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-[#888] leading-relaxed mb-5" style={{ fontSize: "17px" }}>
                Quando não estou num projeto, estou mergulhado em LLMs: como os modelos
                são treinados, como rodar inferência local, o que muda com quantização.
                Começo num sábado e termino de madrugada.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-[#888] leading-relaxed mb-5" style={{ fontSize: "17px" }}>
                Imprimo action figures, pinto à mão e trabalho com resina. Comecei com
                filamento e fiquei tão bom que não parei mais. Cada peça passa por impressão,
                lixamento, primer, pintura em camadas. É um processo tão iterativo quanto código.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-[#888] leading-relaxed" style={{ fontSize: "17px" }}>
                Mestro RPG há 10 anos. Há 2, faço isso de forma profissional. Conduzir uma
                mesa é improvisar dentro de um sistema de regras, adaptar a narrativa em tempo
                real pra um grupo de pessoas com expectativas completamente diferentes.
              </p>
            </FadeUp>
          </div>

          <div className="flex flex-col gap-3">
            {cards.map(({ Icon, title, desc }, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.08}>
                <motion.div className="rounded-2xl p-5 flex gap-4 items-start"
                  style={{ background: "#111", border: `1px solid ${B}` }}
                  whileHover={{ borderColor: "rgba(232,99,10,0.25)", y: -3 }}
                  transition={{ duration: 0.2 }}>
                  <motion.div className="flex-shrink-0 mt-0.5" style={{ color: A }}
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}>
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-[#f0f0f0] mb-1"
                      style={{ fontFamily: "var(--font-display)", fontSize: "14px" }}>{title}</div>
                    <p className="text-[12px] text-[#666] leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════
   BUILT WITH
═══════════════════════════════════════ */
function BuiltWith() {
  return (
    <Section dark>
      <div className="max-w-5xl mx-auto px-8">
        <FadeUp>
          <span className="block mb-6 text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: A }}>
            Como esse site foi feito
          </span>
        </FadeUp>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <FadeUp delay={0.05}>
            <h2 className="font-bold leading-[0.9] tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-0.03em" }}>
              A candidatura também<br />é um <span style={{ color: A2 }}>projeto.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex gap-3 flex-wrap">
              {[
                { icon: "▲", name: "Next.js 16" },
                { icon: "TS", name: "TypeScript" },
                { icon: "◉", name: "Tailwind v4" },
                { icon: "⟡", name: "Framer Motion" },
              ].map((s, i) => (
                <motion.div key={i}
                  className="rounded-xl px-4 py-3 flex flex-col items-center gap-1 min-w-[72px]"
                  style={{ background: "#111", border: `1px solid ${B}` }}
                  whileHover={{ y: -4, borderColor: "rgba(232,99,10,0.3)", scale: 1.05 }}
                  transition={{ duration: 0.18 }}>
                  <span className="font-bold text-lg leading-none" style={{ fontFamily: "monospace", color: A }}>{s.icon}</span>
                  <span className="text-[10px] text-[#555]" style={{ fontFamily: "var(--font-display)" }}>{s.name}</span>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-10" style={{ borderTop: `1px solid ${B}` }}>
      <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="font-bold text-[#f0f0f0] mb-1" style={{ fontFamily: "var(--font-display)" }}>
            Felipe Alves
          </div>
          <div className="text-[11px] text-[#444]">Estagiar Globo 2026 · Plataforma de IA</div>
        </div>

        <div className="flex items-center gap-6">
          {[
            { label: "falves.dev", href: "https://falves.dev" },
            { label: "GitHub",    href: "https://github.com/FalvesDev" },
            { label: "LinkedIn",  href: "https://www.linkedin.com/in/falvesdev/" },
          ].map(s => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-[12px] text-[#444] no-underline" whileHover={{ color: A2 }}>
              {s.label}
            </motion.a>
          ))}
        </div>

        <div className="text-[11px] text-[#333] flex items-center gap-1">
          feito com{" "}
          <motion.span style={{ color: A }} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            ♥
          </motion.span>{" "}
          e Next.js
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   ROOT
═══════════════════════════════════════ */
export default function Page() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <main>
      <Nav />
      <Hero />
      <Apresentacao />
      <Historia />
      <Projetos onOpen={setSelectedProject} />
      <Area />
      <Interesses />
      <BuiltWith />
      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
