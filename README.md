# Felipe Alves — Candidatura Estagiar Globo 2026

Portfolio interativo construído como candidatura para o **Programa Estagiar Globo 2026 — Plataforma de IA**.

A candidatura em si também é um projeto: uma single-page application com animações, scroll tracking, modal de projetos e deploy automatizado.

**[globo.falves.dev](https://next-app-smoky-two.vercel.app)**

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 16.2.6 | Framework, App Router, SSG |
| TypeScript | 5.x | Tipagem estática |
| Tailwind CSS | v4 | Estilização via `@import "tailwindcss"` |
| Framer Motion | 12.x | Todas as animações |
| Space Grotesk | — | Fonte de display/títulos |
| Inter | — | Fonte de corpo |

Sem bibliotecas de UI. Sem ícones externos. Todos os SVGs desenhados à mão.

---

## Funcionalidades

- **Scroll progress bar** na navbar usando `useScroll` + `useSpring`
- **Etiqueta de seção atual** no canto inferior esquerdo via `IntersectionObserver`
- **Links de navegação ativos** destacados em laranja conforme a seção visível
- **Animações de entrada** por seção com `useInView` + variantes staggered
- **Contador animado** nos stats (93%, 3+, 6) usando `framer-motion animate()`
- **Modal de projetos** com `AnimatePresence`, blur de backdrop, fechar com Escape ou clique fora
- **Orbs e partículas** ambientes animados em loop
- **Shimmer text** na headline principal via CSS `background-clip: text`
- **Favicon SVG** customizado com o "G" da Globo em laranja
- **Totalmente responsivo** — mobile, tablet e desktop

---

## Seções

1. **Hero** — apresentação com headline animada e âncoras para as 3 perguntas da pré-tarefa
2. **Quem sou** (Q1) — trajetória, stats reais de projetos entregues, stack
3. **História** (Q2) — conexão com a Globo através do pai, Bruno Alves, e a origem do nome "falves"
4. **Projetos** — 6 projetos com modal de screenshot, links de GitHub e demo
5. **Plataforma de IA** (Q3) — por que essa área, com projetos como prova
6. **Interesses** — LLMs locais, impressão 3D e RPG de mesa profissional
7. **Como foi feito** — stack da candidatura
8. **Footer** — links para falves.dev, GitHub e LinkedIn

---

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

---

## Adicionando screenshots dos projetos

Coloque as imagens em `public/screenshots/` com os nomes abaixo e aparecem automaticamente nos cards e no modal:

```
public/screenshots/orion.png
public/screenshots/colectorhub.png
public/screenshots/contador-de-bolso.png
public/screenshots/dev-roadmap.png
public/screenshots/renomeador-prevenir.png
public/screenshots/contratos-prevenir.png
```

---

## Deploy

Deploy automático na Vercel a cada push na branch `master`.

---

Feito com Next.js e muita vontade de passar.
