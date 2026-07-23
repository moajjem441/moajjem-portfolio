# 🚀 Moajjem Hossain — Personal Portfolio

A modern, high-performance developer portfolio built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **GSAP**, and **Framer Motion**.

Designed to showcase engineering excellence, interactive user experiences, and modern web development through cinematic animations and premium UI design.

---

## 🌐 Live Demo

🔗 **Live Website:** https://moajjem-portfolio.vercel.app

📧 **Contact:** [moajjem441@gmail.com](mailto:moajjem441@gmail.com)

---

# ✨ Features

* 🌗 **Dynamic Theme Switching** — Dark, Light, and Purple themes with persistent preferences.
* 💨 **GSAP + ScrollTrigger Animations** — Smooth scrolling, staggered reveals, and parallax effects.
* 🎯 **Interactive Components** — Magnetic buttons, Tilt Cards, Spotlight Cards, and Typing Effect.
* 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile devices.
* 🧠 **Contact Form API** — Functional contact form powered by the `/api/contact` route.
* ⚡ **Performance Optimized** — Lazy loading, optimized assets, and efficient rendering.
* 🎨 **Modern Design System** — Consistent typography, spacing, color tokens, and reusable UI components.

---

# 🛠 Tech Stack

| Category             | Technologies                                    |
| -------------------- | ----------------------------------------------- |
| **Framework**        | Next.js (App Router), React                     |
| **Language**         | TypeScript                                      |
| **Styling**          | Tailwind CSS, CSS Modules                       |
| **Animations**       | GSAP, ScrollTrigger, Framer Motion              |
| **UI Components**    | TypingEffect, Magnetic, SpotlightCard, TiltCard |
| **Icons**            | Material Symbols                                |
| **State Management** | React Hooks                                     |
| **Form Handling**    | Native Forms, Fetch API                         |
| **Deployment**       | Vercel                                          |

---

# 📁 Project Structure

```text
portfolio/
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ └── contact/
│ │ │ └── route.ts # Email sending endpoint
│ │ ├── favicon.ico
│ │ ├── globals.css # Global styles + theme variables
│ │ ├── layout.tsx # Root layout
│ │ └── page.tsx # Main homepage component
│ └── components/
│ ├── TypingEffect.tsx # Typewriter animation
│ └── Magnetic.tsx # Magnetic hover effect
├── public/ # Static assets (images, etc.)
├── .env.local # ⚠️ Environment variables (never commit!)
├── .env.example # Example env file (safe to commit)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.ts
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/moajjem441/portfolio.git
cd portfolio
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env.local` file in the project root.

```env
# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# OR Resend
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_email@example.com
```

---

## 4️⃣ Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧩 Core Components

## ⌨️ TypingEffect

Animated typewriter component that cycles through developer roles.

---

## 🧲 Magnetic

Adds smooth magnetic hover interactions to buttons and links using Framer Motion.

---

## 💡 SpotlightCard

Interactive card with a radial spotlight effect following the cursor.

---

## 🎴 TiltCard

3D animated card with spring-based mouse movement interaction.

---

# 🎨 Theme System

Three built-in themes are available:

* 🌑 Dark
* ☀️ Light
* 🟣 Purple

The selected theme is automatically saved in **localStorage** and restored on future visits.

---

# 🌐 Deployment

Deploy instantly on **Vercel**.

```bash
npm run build
npm run start
```

---

# 📬 Connect With Me

* 📧 **Email:** [moajjem441@gmail.com](mailto:moajjem441@gmail.com)
* 💻 **GitHub:** https://github.com/moajjem441
* 💼 **LinkedIn:** https://linkedin.com/in/moajjem-hossain
* 🐦 **Twitter (X):** https://x.com/NakyNaky1078618
* 📘 **Facebook:** https://facebook.com/moajjem

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 🙏 Acknowledgements

Special thanks to:

* 💚 GSAP
* 💙 Framer Motion
* 💨 Tailwind CSS
* 🎨 Material Symbols
* ▲ Vercel

---

<div align="center">

### ⭐ If you like this project, consider giving it a star!

**Built with ❤️ by Moajjem Hossain**

</div>
