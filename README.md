<div align="center">

# ⚡ Arnav Band — Personal Developer Portfolio

> **High-Performance Engineering Portfolio featuring Reactive 3D Graphics, 60-30-10 Color Lab, Interactive Certificate Lightbox, and Dennis Snellenberg-inspired Micro-interactions.**

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-arnavband321-181717?style=for-the-badge&logo=github)](https://github.com/arnavband321)

[🚀 Live Demo](https://arnavband321.github.io) · [🐛 Report Bug](https://github.com/arnavband321/portfolio/issues) · [✨ Request Feature](https://github.com/arnavband321/portfolio/issues)

</div>

---

## 🌟 Key Features

- **🌐 Interactive 3D Cyber Core (Three.js)** — Real-time WebGL quantum icosahedron wireframe that reacts to theme colors and user interactions.
- **🎨 60-30-10 Theme Studio & Color Lab** — Dedicated visual palette studio featuring 7 curated themes (*Cosmic Indigo, Amber Gold, Emerald Terminal, Midnight Sapphire, Neo-Tokyo Cyber, Crimson Redline, Clean Slate*) with live full-page & modal switching.
- **🌓 Dual Mode Engine (Dark & Light)** — High-contrast paper-white light mode and deep cosmic cyber dark mode with synchronized DOM tokens and `localStorage` persistence.
- **📜 Verified Milestones & Certificate Lightbox** — Interactive zoom cards with verified credential links (featuring Maincrafts Internship & Udemy Agentic AI credentials).
- **📸 High-Res Photo Gallery** — Responsive image grid with lightbox modal, caption overlays, and full keyboard navigation.
- **⌨️ Command Palette (`Ctrl + K` / `Cmd + K`)** — Spotlight-style quick navigation modal with instant search and keyboard shortcuts.
- **🔊 Web Audio Sound FX** — Subtle tactile audio feedback engine (click, tab, and hover sounds) with instant mute/unmute control.
- **🌧️ Matrix Rain Easter Egg (`M` Key)** — Press `M` anytime for an interactive fullscreen retro Matrix digital rain canvas.
- **🗂️ Dennis Snellenberg Aesthetics** — 3D tilt cards, magnetic action buttons, dynamic stats ticker, and cyber typewriter prompt.
- **📱 100% Mobile & Responsive** — Fluid typography, responsive grids, and accessible ARIA navigation.

---

## 🛠️ Tech Stack

| Domain | Technologies & Libraries |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/) |
| **3D & Graphics** | [Three.js](https://threejs.org/) (WebGL rendering, particle fields, wireframes) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) (orchestrated springs, exits & layout shifts) |
| **Styling** | Vanilla CSS (BEM & 60-30-10 design tokens, CSS variables, glassmorphism) |
| **Icons & Audio** | [Lucide React](https://lucide.dev/), HTML5 Web Audio API |
| **CI / CD** | GitHub Actions (`.github/workflows/deploy.yml`) |

---

## 📁 Clean Repository Structure

```
js_portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── certificates/           # Verified certificate assets (.png, .jpg)
│   ├── gallery/                # High-res photo gallery assets
│   ├── favicon.svg             # Modern vector favicon
│   └── Arnav_Band_Resume.pdf   # Resume PDF download asset
├── src/
│   ├── components/             # Reusable UI & interactive components
│   │   ├── About.jsx           # Bio, quick facts, and interests
│   │   ├── Achievements.jsx    # Milestones & Highlights with certificate zoom
│   │   ├── Career.jsx          # Focus areas & engineering aspirations
│   │   ├── Certifications.jsx  # Dedicated credentials gallery with lightbox
│   │   ├── CommandPalette.jsx  # Spotlight command modal (Ctrl+K)
│   │   ├── Contact.jsx         # Contact form & social reach-out
│   │   ├── Contributions.jsx   # Club & community participation cards
│   │   ├── CustomCursor.jsx    # Dennis Snellenberg magnetic cursor
│   │   ├── CyberCore3D.jsx     # Three.js interactive 3D WebGL core
│   │   ├── CyberTypewriter.jsx # Terminal role typewriter
│   │   ├── Education.jsx       # Academic timeline (SIT Nagpur B.Tech)
│   │   ├── Experience.jsx      # Work & internship milestones
│   │   ├── Footer.jsx          # Bottom credits & quick links
│   │   ├── Gallery.jsx         # Photo gallery with arrow navigation
│   │   ├── Hero.jsx            # Hero section with 3D canvas & CTAs
│   │   ├── HeroVisual.jsx      # Visual wrapper for 3D elements
│   │   ├── MagneticButton.jsx  # Magnetic cursor pull effect
│   │   ├── MatrixRain.jsx      # Fullscreen Matrix rain easter egg (M key)
│   │   ├── Navbar.jsx          # Header with sound, theme, and palette triggers
│   │   ├── Preloader.jsx       # Snellenberg-style kinetic intro counter
│   │   ├── Projects.jsx        # Project showcases with tags & demo links
│   │   ├── Skills.jsx          # Categorized technical skills with tilt cards
│   │   ├── StatsTicker.jsx     # Marquee ticker showcasing key metrics
│   │   ├── ThemeStudio.jsx     # 60-30-10 Color Lab & Theme Studio modal
│   │   └── TiltCard.jsx        # 3D perspective tilt container
│   ├── context/
│   │   └── PaletteContext.jsx  # Central state for 60-30-10 palettes & theme
│   ├── data/
│   │   ├── palettes.js         # Curated color palettes & DOM token applier
│   │   └── portfolio.js        # Single source of truth for all content
│   ├── utils/
│   │   └── soundFX.js          # Web Audio API sound synthesizer
│   ├── App.jsx                 # App root with providers & section layout
│   ├── index.css               # Global styling, tokens, and animations
│   └── main.jsx                # React DOM entry point
├── .gitignore                  # Production-grade gitignore rules
├── .oxlintrc.json              # High-performance Oxlint rules
├── index.html                  # HTML5 boilerplate with SEO meta & Google Fonts
├── LICENSE                     # MIT Open-Source License
├── package.json                # Project dependencies & scripts
└── vite.config.js              # Vite bundler configuration
```

---

## 🚀 Quick Start & Installation

### 1. Clone the repository
```bash
git clone https://github.com/arnavband321/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to view the application with Hot Module Replacement (HMR).

### 4. Build for production
```bash
npm run build
```
Creates an optimized, minified production bundle in the `dist/` directory.

---

## ⚙️ Content Customization

All portfolio content is decoupled and managed inside a single file:
👉 **[`src/data/portfolio.js`](src/data/portfolio.js)**

| Export Object | Description |
| :--- | :--- |
| `personalInfo` | Name, title, headline, location, social links, resume path |
| `education` | Degree, university, duration, coursework, academic highlights |
| `skills` | Categorized tech stacks (Languages, Frontend, Backend, Tools) |
| `experience` | Internships, roles, and key contributions |
| `projects` | Featured projects, descriptions, tags, GitHub and live URLs |
| `achievements` | Milestones & certificate cards with full-screen zoom preview |
| `certifications` | Course certificates with issuing organization & verification link |
| `galleryImages` | Campus, event, and hackathon photo gallery images |
| `careerInterests` | Engineering focus areas (Web Dev, Cybersecurity, AI/ML) |
| `navLinks` | Navigation menu anchors |

---

## 🌐 Deploying to GitHub Pages

This repository comes pre-configured with a **GitHub Actions CI/CD Workflow** (`.github/workflows/deploy.yml`):

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: release portfolio v1.0.0"
   git push origin main
   ```
2. In your GitHub repository, navigate to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. The deployment pipeline will trigger automatically and publish your site at:  
   👉 **`https://arnavband321.github.io/`**

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ by <b>Arnav Band</b> · Symbiosis Institute of Technology (SIT), Nagpur</sub>
</div>
