# 🎭 The Agency — AI Specialists & AgencyFlow 2.0

> **Autonomous Multi-Agent Workforce & Full-Stack Growth Operations Platform**  
> Orchestrated by **Full Stack Software Developer** (`EngineeringSeniorDeveloper`) & **Full Stack Digital Marketer** (`MarketingGrowthHacker`).

---

## 🌟 Executive Summary

This repository contains the complete implementation and deployment of **The Agency** (`msitarzewski/agency-agents`) open-source collection of **279 specialized AI agents** across 18 divisions, paired with **AgencyFlow 2.0** — an autonomous dual-engine web application and growth marketing platform.

### 📱 Android APK Included
- **Direct Download**: [`AgencyFlow.apk`](AgencyFlow.apk) (12 MB, signed release, offline-ready).
- **Web App URL**: `http://localhost:5050/agencyflow/index.html`
- **AI Specialist Directory**: `http://localhost:5050/index.html`

---

## 🏗️ Architecture & Core Components

```
agency agent/
├── AgencyFlow.apk               # Standalone Signed Android APK (Full Offline Support)
├── .agents/skills/              # 279 Antigravity Skills for IDE agent activation
├── .cursor/rules/               # 279 Cursor .mdc Rules for project-level guidance
├── agency-agents/               # Original agency agent markdown prompt definitions
├── agents_catalog.json          # Parsed metadata for all 279 agents across 18 divisions
└── demo/                        # Production Web Applications & Static Hub
    ├── index.html               # The Agency AI Specialists Explorer & Simulator
    ├── AgencyFlow.apk           # Web-downloadable APK
    └── agencyflow/              # AgencyFlow 2.0 Full-Stack & Marketing Platform
        ├── index.html           # PWA Web Shell, AEO Schema, Semantic HTML5
        ├── styles.css           # Glassmorphism Design System, Dark/Light Mode
        ├── app.js               # State Engine, REST API Tester, CRM, Charts & Copilot
        ├── marketing.js         # Dynamic CAC & ROI Calculator, Viral Referral Loop
        ├── manifest.json        # Progressive Web App Manifest
        ├── sw.js                # Service Worker for 100% Offline Caching
        ├── icon-192.svg         # High-resolution vector PWA icons
        ├── icon-512.svg
        └── marketing_kit.md     # Full Go-To-Market Playbook & Email Sequences
```

---

## 🚀 Key Features in AgencyFlow 2.0

### 1. 💻 Full-Stack Software Developer Workspace
- **Pipeline Runner**: Simulates end-to-end continuous delivery (TypeScript compilation, Zero-Trust security gate, database atomic transactions).
- **Mock REST API Explorer**: Live HTTP tester for `/api/v1/leads`, `/api/v1/agents`, and `/api/v1/metrics` with sub-45ms responses.
- **Growth CRM & Data Engine**: Real-time lead capture, stage progression (MQL → SQL → Won), and one-click CSV export.

### 2. 📈 Full-Stack Digital Marketing Command Center
- **Interactive CAC & ROI Simulator**: Real-time unit economics calculator for ad spend, CPC, and conversion rates.
- **Viral Referral Loop**: Built-in K-factor engine (`?ref=AGENCY-XXXX`) with 1-click sharing to Twitter/X, LinkedIn, and WhatsApp.
- **Campaign Copy Vault**: Ready-to-use B2B LinkedIn thought leadership posts and Meta/Google ad copies.
- **GTM Playbook**: 4-stage automated cold email sequence documented in `marketing_kit.md`.

### 3. 📊 Visual Analytics & Dynamic Charts
- **MRR Trajectory Chart**: HTML5 Canvas rendering of 6-month projected revenue vs. ad spend.
- **Conversion Funnel Velocity**: Multi-stage funnel analysis from impressions to closed-won revenue.

### 4. 🤖 Autonomous Dual-Agent Copilot
- Floating chat drawer connecting directly to `EngineeringSeniorDeveloper` and `MarketingGrowthHacker`.

### 5. 📱 Android APK & Progressive Web App (PWA)
- **Standalone Android APK**: Bundled with offline WebView assets, signed with a release keystore.
- **PWA Capabilities**: Installable on Android, Windows, macOS, and iOS with service worker caching.

---

## 🛠️ How to Run Locally

1. **Start the Local Web Server**:
   ```bash
   python -m http.server 5050 --directory demo
   ```
2. **Access the Applications**:
   - AgencyFlow App: [http://localhost:5050/agencyflow/index.html](http://localhost:5050/agencyflow/index.html)
   - Specialists Hub: [http://localhost:5050/index.html](http://localhost:5050/index.html)
   - Download APK: [http://localhost:5050/agencyflow/AgencyFlow.apk](http://localhost:5050/agencyflow/AgencyFlow.apk)

---

## 👥 How to Activate Agents in Your Tools

- **In Claude Code**:
  ```text
  "Hey Claude, activate Frontend Developer mode and help me build a component."
  ```
- **In Antigravity IDE**:
  ```text
  "Use the Engineering Senior Developer skill to optimize our application."
  ```
- **In Cursor IDE**:
  ```text
  @engineering-senior-developer.mdc
  ```

---

## 📄 License
Open-source under MIT License. Personalities powered by [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents).
