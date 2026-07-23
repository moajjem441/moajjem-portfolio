Moajjem Hossain — Personal Portfolio
A modern, high-performance developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion, and more. Designed to showcase engineering excellence, interactive UI, and a cinematic user experience.

🔗 Live Demo
📧 Contact Me

✨ Features
🌗 Dynamic Theme Switching — Dark, Light, and Purple modes with persistent state via localStorage

💨 GSAP + ScrollTrigger — Smooth scroll animations, staggered reveals, and parallax effects

🎯 Interactive UI Components — Magnetic hover buttons, tilt cards, spotlight cards, typing effect

📱 Fully Responsive — Optimized for mobile, tablet, and desktop screens

🧠 Contact Form — Functional email form with /api/contact route and real-time status feedback

⚡ Performance Optimized — Lazy loading, optimized images, and efficient animations

🎨 Modern Design System — Consistent typography, spacing, and color tokens

🛠 Tech Stack
Category	Technologies
Framework	Next.js 14 (App Router) • React 18
Language	TypeScript
Styling	Tailwind CSS • CSS Modules
Animations	GSAP (with ScrollTrigger) • Framer Motion • Motion • useSpring / useTransform
UI Components	Custom: TypingEffect • Magnetic • SpotlightCard • TiltCard
Icons	Material Symbols (Google Fonts)
State Management	React Hooks (useState, useEffect, useRef, useReducer)
Form Handling	Native HTML forms • Fetch API
Deployment	Vercel
📁 Project Structure
text
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts           # Email API endpoint
│   ├── globals.css               # Global styles + theme variables
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main Home component
├── components/
│   ├── TypingEffect.tsx          # Typewriter animation
│   └── Magnetic.tsx              # Magnetic hover effect
├── public/
│   ├── moajjem.jpg               # Profile image
│   └── favicon.ico
├── .env.local                    # Environment variables
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
🚀 Getting Started
1️⃣ Clone the Repository
bash
git clone https://github.com/moajjem441/portfolio.git
cd portfolio
2️⃣ Install Dependencies
bash
npm install
# or
yarn install
# or
pnpm install
3️⃣ Set Up Environment Variables
Create a .env.local file in the root directory and add your email service credentials:

env
# Example for EmailJS or Resend
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# OR if using Resend
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_email@example.com
4️⃣ Run the Development Server
bash
npm run dev
Open http://localhost:3000 to see the result.

🧩 Key Components
TypingEffect
A typewriter component that cycles through roles like Full Stack Developer, AI Enthusiast, and Problem Solver.

Magnetic
Wraps buttons and interactive elements, adding a magnetic hover effect powered by framer-motion and useSpring.

SpotlightCard
A card that reveals a radial gradient spotlight on mouse hover, enhancing visual depth.

TiltCard
A 3D tilt card that responds to mouse movement with smooth spring-based rotations.

🎨 Theme System
The portfolio supports three themes:

🌑 Dark — Default, sleek dark background with subtle contrast.

☀️ Light — Clean light mode for readability.

🟣 Purple — Vibrant purple accent theme.

Themes are persisted in localStorage and applied by adding the theme class to the root <html> element.

🌐 Deployment
Deploy on Vercel
https://vercel.com/button

Or manually:

bash
npm run build
npm run start
📬 Contact
Email: moajjem441@gmail.com

GitHub: github.com/moajjem441

LinkedIn: linkedin.com/in/moajjem-hossain

Twitter: @NakyNaky1078618

Facebook: facebook.com/moajjem

📄 License
This project is open source and available under the MIT License.

🙏 Acknowledgements
GSAP for scroll-driven animations

Framer Motion for fluid UI interactions

Tailwind CSS for utility-first styling

Material Symbols for beautiful icons

Vercel for seamless deployment

Built with ❤️ and gratitude to Allah.