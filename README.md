# Vishv Bhavsar — Personal Portfolio Website

> **Technology • Creativity • Innovation**
>
> A premium, modern, and interactive portfolio presenting Vishv Bhavsar as a versatile technology professional with expertise spanning software development, artificial intelligence, data analytics, and modern UI/UX design.

[![Live Demo](https://img.shields.io/badge/demo-online-emerald?style=for-the-badge&logo=githubpages&logoColor=white)](https://vishv05.github.io/Portfolio/)
[![Built with React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

---

## 🌟 Overview & Brand Identity

This website is designed and engineered to communicate a balanced, well-rounded technical identity:

* **Professional + Modern + Technical + Creative + Intelligent + Trustworthy**
* Tailored for recruiters, software engineering teams, product companies, startups, university faculty, and collaborators.
* Avoids generic buzzwords and exaggerated claims; showcases genuine competencies and real-world experience.

---

## ✨ Key Features & Architecture

* **Interactive 3D Constellation Sphere:** Custom HTML5 Canvas 3D Fibonacci sphere that reacts smoothly to mouse physics and theme color palettes with sub-millisecond efficiency and `prefers-reduced-motion` compliance.
* **Sticky Glassmorphic Navigation:** Responsive glass header with active scroll-spy section tracking, smooth scroll transitions, and mobile drawer.
* **Command Palette (`⌘K` / `Ctrl+K`):** Fast keyboard-driven command menu to search projects, jump to sections, trigger actions, or switch themes.
* **Light / Dark Mode System:** Polished high-contrast dark theme (charcoal/deep navy) and clean light theme with instantaneous persistence in `localStorage`.
* **Projects Showcase with Filtering & Case Study Modal:** Filterable by *All, Web, AI, Data, Mobile, Design* with deep-dive modals explaining Problem, Solution Architecture, Tech Stack, Workflow, Challenges, and Outcomes.
* **Interactive Skills Matrix:** Categorized into *Development, Programming & Data, AI / Cloud, Design, Tools & Technologies* without misleading percentage bars.
* **Career Experience Timeline:** Clean timeline highlighting verified roles and internships at HRDM Global Solutions, Cognifyz Technologies, and Prodigy InfoTech.
* **Academic Background:** Dedicated section detailing the Integrated M.Sc. in Information Technology & BSc.IT at GLS University (Expected 2027).
* **Certifications Showcase:** Credential cards highlighting Oracle OCI AI Foundations, Oracle OCI Generative AI Professional, Microsoft Data Analyst, and Google Cloud credentials.
* **Interactive Resume Viewer & Download:** In-browser CV viewer with direct print support and single-click download for `Vishv_Bhavsar_Resume.pdf`.
* **Validated Contact Form:** Form validation, direct email copying with toast notification, and celebratory confetti effects.
* **Automated GitHub Pages Deployment:** Built-in GitHub Actions CI/CD workflow (`.github/workflows/deploy.yml`).

---

## 🛠️ Technology Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with CSS Custom Properties |
| **Motion & Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Interactive Canvas** | Native HTML5 2D/3D Mathematical Projection Canvas |
| **Icons** | [Lucide React](https://lucide.dev/) + Custom Vector Brand Icons |
| **Feedback & Particles** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |

---

## 📁 Centralized Content Architecture

All portfolio data is decoupled from the UI components inside `src/data/`, allowing seamless updates in seconds:

```
src/
├── data/
│   ├── personalInfo.js     # Contact details, bio, resume config, Formspree endpoint
│   ├── navigation.js       # Navigation bar link structure
│   ├── skills.js           # Categorized technical competencies
│   ├── experience.js       # Career timeline, roles, and responsibilities
│   ├── projects.js         # Project cards, case study details, and filter categories
│   ├── certifications.js   # Professional certifications and verify URLs
│   ├── education.js        # GLS University academic background
│   └── highlights.js       # Verified milestones and impact points
├── components/
│   ├── ui/                 # Reusable UI primitives (Button, Card, Badge, Modal, CommandPalette, etc.)
│   ├── Navigation.jsx      # Sticky responsive navigation bar
│   ├── HeroVisual.jsx      # Interactive 3D constellation sphere canvas
│   ├── ProjectModal.jsx    # Deep-dive project case study modal
│   ├── ResumeModal.jsx     # Interactive resume preview & download dialog
│   └── Footer.jsx          # Minimal copyright and social footer
├── sections/
│   ├── Hero.jsx            # Hero landing section
│   ├── About.jsx           # Narrative & quick facts
│   ├── Skills.jsx          # Filterable skills tabs & cards
│   ├── Experience.jsx      # Work & internship timeline
│   ├── Projects.jsx        # Filterable project showcase
│   ├── Certifications.jsx  # Credential verification cards
│   ├── Education.jsx       # Academic background at GLS University
│   ├── Highlights.jsx      # Key strengths and milestones
│   └── Contact.jsx         # Validated message form & contact channels
├── hooks/                  # Custom React hooks (useTheme, useScrollSpy, useReducedMotion)
├── utils/                  # Utility helper functions
└── index.css               # Global theme tokens, typography, and styling
```

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18.0 or higher)
* `npm` or `pnpm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vishv05/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-optimized static bundle will be generated in the `dist/` directory.

---

## 📄 Customizing Your Resume & Contact Form

### Updating Your Resume
Place your updated resume PDF in the `public/` directory with the filename `Vishv_Bhavsar_Resume.pdf`:
```
public/
└── Vishv_Bhavsar_Resume.pdf
```
Then set `isPlaceholder: false` in `src/data/personalInfo.js`.

### Connecting the Contact Form
To receive email notifications when a visitor submits the contact form:
1. Create a free form at [Formspree.io](https://formspree.io/).
2. Paste your endpoint into `src/data/personalInfo.js`:
   ```javascript
   formspreeEndpoint: "https://formspree.io/f/your_form_id"
   ```

---

---

## 🌐 Production Deployment Options

This portfolio is pre-configured and production-ready for zero-configuration deployment across all major static hosting platforms.

### 1. GitHub Pages via GitHub Actions (Recommended)
This repository includes a continuous deployment workflow at `.github/workflows/deploy.yml`.

1. Initialize and push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: production portfolio release"
   git push -u origin main
   ```
2. Navigate to your repository on GitHub:
   * Go to **Settings** → **Pages** (in the left sidebar).
   * Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Every subsequent push to `main` will automatically lint, build, and deploy your live portfolio at:
   **`https://vishv05.github.io/Portfolio/`**

### 2. Manual Deployment via CLI (`gh-pages`)
If you prefer deploying directly from your local terminal without waiting for GitHub Actions:
```bash
npm run deploy
```
This builds the site to `dist/` and automatically commits and pushes it to the `gh-pages` branch.

### 3. Vercel
1. Import your GitHub repository into [Vercel](https://vercel.com/).
2. The included [`vercel.json`](vercel.json) automatically configures:
   * SPA rewrites (`/*` -> `/index.html`)
   * Immutable 1-year asset caching
   * Security response headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)
3. Framework Preset: **Vite** (Build command: `npm run build`, Output directory: `dist`).

### 4. Netlify
1. Connect your repository on [Netlify](https://netlify.com/).
2. The included [`netlify.toml`](netlify.toml), [`public/_redirects`](public/_redirects), and [`public/_headers`](public/_headers) ensure instant deployment, clean URLs, and maximum performance headers.

### 5. Cloudflare Pages
1. Create a project in Cloudflare Pages linked to your repository.
2. Build command: `npm run build`, Output directory: `dist`.
3. SPA routing and custom HTTP headers are automatically recognized from `_redirects` and `_headers`.

---

## 👤 Author

**Vishv Bhavsar**
* **Education:** Integrated M.Sc. (IT) — GLS University ('27) & BSc.IT (GLS University)
* **GitHub:** [@Vishv05](https://github.com/Vishv05)
* **Live Portfolio:** [vishv05.github.io/Portfolio](https://vishv05.github.io/Portfolio/)
* **Location:** Ahmedabad, Gujarat, India

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
