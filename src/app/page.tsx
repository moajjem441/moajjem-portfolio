"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import TypingEffect from "@/components/TypingEffect";
import Magnetic from "@/components/Magnetic";

import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// --- Sub-components for better organization ---

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--color-spotlight), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useSpring(0, { stiffness: 100, damping: 30 });
  const y = useSpring(0, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Main Home Component ---

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | "purple">("dark");
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as "dark" | "light" | "purple" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      const root = document.documentElement;
      root.classList.remove("dark", "light", "purple");
      root.classList.add(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: "dark" | "light" | "purple") => {
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    const root = document.documentElement;
    root.classList.remove("dark", "light", "purple");
    root.classList.add(newTheme);
    setIsThemeMenuOpen(false);
  };

  useGSAP(() => {
    // Navbar Shrink Effect
    ScrollTrigger.create({
      start: "top top",
      onUpdate: (self) => {
        const isShrunk = self.scroll() > 50;
        gsap.to(".nav-bg", {
          y: isShrunk ? 10 : 0,
          width: isShrunk ? "95%" : "100%",
          borderRadius: isShrunk ? "24px" : "0px",
          duration: 0.4,
          ease: "expo.out"
        });
      },
    });

    // Refresh ScrollTrigger after a short delay for accurate mobile measurements
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Active Link Highlighting
    const sections = ["hero", "about", "education", "skills", "projects", "contact"];
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section),
      });
    });

    // Hero Mouse Parallax
    const handleHeroParallax = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(".hero-parallax", {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out"
      });
      gsap.to(".hero-parallax-reverse", {
        x: -xPos * 0.5,
        y: -yPos * 0.5,
        duration: 1,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", handleHeroParallax);

    // General Staggered Reveals
    gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    // Animated Counters
    const stats = gsap.utils.toArray<HTMLElement>(".stat-counter");
    stats.forEach((stat) => {
      const endValue = parseInt(stat.getAttribute("data-value") || "0");
      gsap.fromTo(stat,
        { innerText: "0" },
        {
          innerText: endValue,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 95%",
          }
        }
      );
    });

    // Skills Section Animation
    gsap.from(".skill-card", {
      scrollTrigger: {
        trigger: "#skills",
        start: "top 95%",
        toggleActions: "play none none none",
      },
      scale: 0.95,
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out",
      immediateRender: false
    });

    // Projects Section Animation
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: "#projects",
        start: "top 95%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      immediateRender: false
    });

    // Footer Animation
    gsap.from("footer > div", {
      scrollTrigger: {
        trigger: "footer",
        start: "top 100%",
        toggleActions: "play none none none",
      },
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      immediateRender: false
    });

    // Refresh ScrollTrigger after a short delay for accurate mobile measurements
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => window.removeEventListener("mousemove", handleHeroParallax);
  }, { scope: container });

  const navItems = ["about", "education", "skills", "projects", "contact"];
  const [contactStatus, setContactStatus] = useState({
    type: "idle" as "idle" | "success" | "error",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setContactStatus({
        type: "error",
        message: "Please complete all fields before sending your message.",
      });
      return;
    }

    setIsSubmitting(true);
    setContactStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      form.reset();
      setContactStatus({
        type: "success",
        message: "Thanks for reaching out! Your message has been sent.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send email";
      setContactStatus({ type: "error", message });
      console.error("Contact form submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={container} className="relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-0 pointer-events-none">
        <div className="max-w-container-max mx-auto relative h-[72px] flex items-center pointer-events-auto">
          <div className="nav-bg absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-sm mx-auto z-[-1]" />
          <div className="flex justify-between items-center w-full px-gutter">
            <div className="w-12 h-12 rounded-full backdrop-blur-sm bg-white/10 
                flex items-center justify-center font-bold text-white 
                border border-white/30 shadow-2xl hover:scale-110 transition-transform 
                animate-pulse-glow">
              MH
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  className={`font-label-caps text-label-caps relative transition-colors duration-300 ${activeSection === item ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                  href={`#${item}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  {activeSection === item && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary"
                    />
                  )}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <div className="relative flex items-center pointer-events-auto z-[70]">
                <Magnetic>
                  <button
                    onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface transition-colors cursor-pointer pointer-events-auto relative"
                    aria-label="Toggle Theme"
                  >
                    <AnimatePresence mode="wait">
                      {theme === "dark" && (
                        <motion.span
                          key="dark"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                          className="material-symbols-outlined text-[20px]"
                        >
                          dark_mode
                        </motion.span>
                      )}
                      {theme === "light" && (
                        <motion.span
                          key="light"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                          className="material-symbols-outlined text-[20px]"
                        >
                          light_mode
                        </motion.span>
                      )}
                      {theme === "purple" && (
                        <motion.span
                          key="purple"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                          className="material-symbols-outlined text-[20px] text-primary"
                        >
                          palette
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </Magnetic>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isThemeMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-[48px] w-36 rounded-2xl glass-card border border-outline-variant/30 shadow-2xl p-2 z-[70] pointer-events-auto flex flex-col gap-1"
                    >
                      {[
                        { id: "dark", label: "Dark", icon: "dark_mode" },
                        { id: "light", label: "Light", icon: "light_mode" },
                        { id: "purple", label: "Purple", icon: "palette" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleThemeChange(item.id as "dark" | "light" | "purple")}
                          className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-label-caps tracking-wider transition-colors cursor-pointer ${theme === item.id ? 'bg-primary-container/20 text-primary font-bold' : 'text-on-surface hover:bg-white/5'}`}
                        >
                          <span className="material-symbols-outlined text-sm">{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Magnetic>
                <button
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="hidden sm:block bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label-caps text-label-caps hover:bg-primary/90 transition-all duration-300"
                >
                  Hire Me
                </button>
              </Magnetic>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[60] pointer-events-auto"
              >
                <motion.span
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                  className="w-6 h-[2px] bg-on-surface block"
                />
                <motion.span
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  className="w-6 h-[2px] bg-on-surface block"
                />
                <motion.span
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                  className="w-6 h-[2px] bg-on-surface block"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[90%] bg-surface-container border border-white/10 rounded-3xl p-8 shadow-2xl pointer-events-auto md:hidden"
            >
              <div className="flex flex-col gap-6 items-center">
                {navItems.map((item) => (
                  <a
                    key={item}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-headline-md text-2xl text-on-surface hover:text-primary transition-colors"
                    href={`#${item}`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}

                {/* Mobile Theme Selector */}
                <div className="w-full flex justify-center gap-4 py-4 border-y border-outline-variant/20 my-2">
                  {[
                    { id: "dark", icon: "dark_mode" },
                    { id: "light", icon: "light_mode" },
                    { id: "purple", icon: "palette" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleThemeChange(item.id as "dark" | "light" | "purple")}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all cursor-pointer ${theme === item.id ? 'bg-primary text-on-primary border-primary scale-110 shadow-lg' : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:text-on-surface'}`}
                    >
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    </button>
                  ))}
                </div>

                <a href="#contact">
                  <button className="w-full bg-primary-container text-on-primary-container py-4 rounded-xl font-label-caps text-label-caps">
                    Hire Me
                  </button>
                </a>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero-section relative min-h-screen flex items-center pt-24 overflow-hidden px-gutter">
          <div className="aurora-bg" />

          <div className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative z-10 hero-content">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block px-3 py-1 rounded-full bg-surface-variant mb-6 border border-white/5"
              >
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                  Available for projects
                </span>
              </motion.div>

              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 text-on-surface leading-tight">
                Hi! I'm <span className="text-primary italic">Moajjem</span>,<br />
                a <TypingEffect />
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl reveal-up">
                Building modern full-stack experiences with a focus on performance, security, and cinematic motion.
                Currently exploring the intersection of AI and Web Dev.
              </p>

              <div className="flex flex-wrap gap-4 reveal-up">
                {/* View Resume */}
                <Magnetic>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 text-on-surface px-8 py-4 rounded-xl font-label-caps text-label-caps hover:bg-white/20 transition-all duration-300 inline-block border border-white/10"
                  >
                    View Resume
                  </a>
                </Magnetic>

                {/* Download Resume */}
                <Magnetic>
                  <a
                    href="/resume.pdf"
                    download="Moajjem_Hossain_Resume.pdf"
                    className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-label-caps text-label-caps primary-glow hover:bg-primary/90 transition-all duration-300 inline-block"
                  >
                    Download Resume
                  </a>
                </Magnetic>
              </div>


            </div>

            {/* Hero Image Container */}
            <div className="lg:col-span-5 relative min-h-[500px] flex items-center justify-center">
              <div className="relative w-full max-w-[480px]">
                <div className="hero-parallax relative aspect-[3/4] md:aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 z-0 bg-surface-container-lowest shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <img
                    className="w-full h-full object-cover object-top md:object-center transition-transform duration-1000 ease-out hover:scale-105"
                    src="/moajjem.jpg"
                    alt="Moajjem Hossain"
                  />
                  {/* Premium Blending Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,15,31,0.4)_100%)]"></div>
                </div>

                {/* Floating Cards */}
                <div className="hero-parallax-reverse glass-card absolute -top-4 -left-4 md:-top-10 md:-left-12 p-4 md:p-6 rounded-xl md:rounded-2xl z-20 w-32 md:w-48">
                  <div className="text-primary font-display-lg-mobile text-[20px] md:text-[28px] mb-1">
                    <span className="stat-counter" data-value="15">0</span>+
                  </div>
                  <div className="font-label-caps text-[8px] md:text-[10px] text-on-surface-variant tracking-widest uppercase">
                    Projects Built
                  </div>
                </div>

                <div className="hero-parallax-reverse glass-card absolute top-1/2 -right-4 md:-right-12 p-4 md:p-6 rounded-xl md:rounded-2xl z-20 w-28 md:w-44">
                  <div className="text-primary font-display-lg-mobile text-[20px] md:text-[28px] mb-1">3.59</div>
                  <div className="font-label-caps text-[8px] md:text-[10px] text-on-surface-variant tracking-widest uppercase">
                    Current CGPA
                  </div>
                </div>

                <div className="hero-parallax-reverse glass-card absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 p-4 md:p-6 rounded-xl md:rounded-2xl z-20 w-36 md:w-52">
                  <div className="text-primary font-display-lg-mobile text-[20px] md:text-[28px] mb-1">
                    <span className="stat-counter" data-value="690">0</span>+
                  </div>
                  <div className="font-label-caps text-[8px] md:text-[10px] text-on-surface-variant tracking-widest uppercase">
                    Codeforces Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}


        <section id="about" className="py-section-padding px-gutter relative">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

              {/* Left Side: Timeline (unchanged) */}
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-8 reveal-up">
                  The Journey So Far
                </h2>
                <div className="space-y-12">
                  {[
                    { year: "2022", title: "Started BUBT", desc: "Began my journey in Computer Science and Engineering." },
                    { year: "2024", title: "Problem Solver", desc: "Achieved 690+ rating on Codeforces and 15+ real-world projects." },
                    { year: "2025", title: "MERN Mastery", desc: "Deep dived into Full Stack Development with React and Node.js." }
                  ].map((item, idx) => (
                    <div key={idx} className="relative pl-8 border-l border-white/10 reveal-up">
                      <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-primary" />
                      <span className="font-label-caps text-primary mb-2 block">{item.year}</span>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-on-surface-variant">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: About Card + Hobbies (UPDATED) */}
              <div className="glass-card p-10 rounded-[40px] reveal-up">
                <h3 className="text-2xl font-bold mb-6">About Moajjem</h3>

                {/* Professional Introduction */}
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  I am a passionate CSE student at BUBT, dedicated to building high-performance web applications.
                  My expertise lies in the MERN stack, but I'm constantly pushing boundaries into AI integration and Cybersecurity.
                  I believe code should not only function perfectly but also look beautiful and feel intuitive.
                </p>

                {/* 🆕 NEW: Hobbies & Interests Section */}
                <div className="mb-8 p-5 rounded-2xl bg-surface-container/50 border border-outline-variant/20">
                  <h4 className="font-label-caps text-[10px] uppercase text-primary tracking-widest mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">favorite</span>
                    Beyond the Screen
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                    When I'm not immersed in code, I love to unwind by playing <strong className="text-on-surface">football</strong> and
                    <strong className="text-on-surface"> badminton</strong>. I'm an avid
                    <strong className="text-on-surface"> tech-podcast</strong> listener and enjoy diving into
                    <strong className="text-on-surface"> sci-fi novels</strong> to keep my imagination as sharp as my logic.
                  </p>
                  {/* Hobby Icons */}
                  <div className="flex flex-wrap gap-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs">
                      <span className="material-symbols-outlined text-primary text-sm">sports_soccer</span> Football
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs">
                      <span className="material-symbols-outlined text-primary text-sm">sports_tennis</span> Badminton
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs">
                      <span className="material-symbols-outlined text-primary text-sm">podcasts</span> Podcasts
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs">
                      <span className="material-symbols-outlined text-primary text-sm">menu_book</span> Reading
                    </span>
                  </div>
                </div>

                {/* Stats (unchanged) */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary mb-2">code</span>
                    <h4 className="font-bold">10k+</h4>
                    <p className="text-xs text-on-surface-variant">Lines of Code</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-surface-container border border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary mb-2">terminal</span>
                    <h4 className="font-bold">200+</h4>
                    <p className="text-xs text-on-surface-variant">Problems Solved</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-section-padding px-gutter relative overflow-hidden bg-surface-container-low/10">
          <div className="aurora-bg absolute opacity-30 scale-75 -left-[10%] top-[20%] pointer-events-none" />

          <div className="max-w-container-max mx-auto relative z-10">
            <div className="text-center mb-16 reveal-up">
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">
                Academic Background
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                Education & Achievements
              </h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                My academic journey and milestones that built my engineering foundation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Major University Card - BUBT */}
              <div className="lg:col-span-7 reveal-up">
                <SpotlightCard className="glass-card p-8 md:p-12 rounded-[40px] border border-primary/10 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                  {/* Decorative background visual */}
                  <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
                        <span className="material-symbols-outlined text-[14px]">school</span>
                        <span className="font-label-caps text-[10px] tracking-wider uppercase">University Degree</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-on-surface mb-2 leading-tight">
                        B.Sc. in Computer Science & Engineering
                      </h3>
                      <p className="text-primary font-medium text-lg">
                        Bangladesh University of Business and Technology (BUBT)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 border-y border-white/5 py-6">
                    <div>
                      <p className="font-label-caps text-[9px] text-on-surface-variant tracking-wider uppercase mb-1">Timeline</p>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
                        <span className="font-mono text-sm font-semibold text-on-surface">2022 - Present</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-label-caps text-[9px] text-on-surface-variant tracking-wider uppercase mb-1">Current Grade</p>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-sm">grade</span>
                        <span className="font-mono text-sm font-semibold text-on-surface">CGPA 3.59 / 4.00</span>
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="font-label-caps text-[9px] text-on-surface-variant tracking-wider uppercase mb-1">Status</p>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-sm">workspace_premium</span>
                        <span className="font-mono text-sm font-semibold text-on-surface">Active Student</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 mb-8">
                    <h4 className="font-label-caps text-[11px] uppercase tracking-widest text-primary font-bold">Key Highlights & Focus</h4>
                    <ul className="space-y-4">
                      {[
                        "Specialized in Software Engineering principles, database design, and algorithmic analysis.",
                        "Maintained continuous academic excellence with a top-tier CGPA of 3.59.",
                        "Bridged the gap between theory and practice by building 15+ complex MERN stack and desktop applications."
                      ].map((highlight, index) => (
                        <li key={index} className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-primary text-md mt-0.5 select-none">verified</span>
                          <p className="text-on-surface-variant text-sm leading-relaxed">{highlight}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-label-caps text-[11px] uppercase tracking-widest text-primary font-bold mb-4">Key Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Algorithms & Complexity", "Database Systems (DBMS)", "Object-Oriented Programming (OOP)", "Software Engineering", "Data Structures"].map((course, index) => (
                        <span key={index} className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high rounded-xl text-xs text-on-surface border border-outline-variant/20 transition-colors duration-300">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </div>

              {/* High School & Intermediate Milestones */}
              <div className="lg:col-span-5 space-y-6 reveal-up relative">
                {/* Visual Timeline vertical line */}
                <div className="absolute left-6 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[var(--timeline-line-color)] to-transparent hidden sm:block" />

                {[
                  {
                    type: "Higher Secondary Certificate (HSC)",
                    institution: "Chowmohuni Govt SA  College",
                    year: "2021",
                    result: "GPA 5.00 / 5.00",
                    field: "Science Group",
                    icon: "menu_book"
                  },
                  {
                    type: "Secondary School Certificate (SSC)",
                    institution: "Noakhali Zilla School",
                    year: "2019",
                    result: "GPA 4.78 / 5.00",
                    field: "Science Group",
                    icon: "history_edu"
                  }
                ].map((edu, idx) => (
                  <div key={idx} className="relative sm:pl-16 group">
                    {/* Timeline Node dot */}
                    <div className="absolute left-4 top-8 w-6 h-6 rounded-full bg-background border-2 border-primary/40 flex items-center justify-center -translate-x-1/2 hidden sm:flex group-hover:border-primary transition-colors duration-300">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    </div>

                    <SpotlightCard className="glass-card p-8 rounded-[32px] border border-white/5 hover:border-primary/10 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-outline-variant/20">
                          <span className="material-symbols-outlined text-lg">{edu.icon}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-primary tracking-wider uppercase font-semibold">{edu.year}</span>
                          <h4 className="text-lg font-bold text-on-surface leading-tight">{edu.type}</h4>
                        </div>
                      </div>
                      <p className="text-on-surface-variant text-sm mb-3">{edu.institution}</p>
                      <div className="flex justify-between items-center text-xs font-mono border-t border-white/5 pt-3">
                        <span className="text-primary font-medium">{edu.field}</span>
                        <span className="text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-lg">{edu.result}</span>
                      </div>
                    </SpotlightCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-section-padding px-gutter bg-surface-container-low/20">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16 reveal-up">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                Technical Skills
              </h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                My technical arsenal for building future-ready applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "code",
                  name: "C++",
                  desc: "Strong foundation in problem solving and object-oriented programming."
                },
                {
                  icon: "code",
                  name: "Python",
                  desc: "Developing AI, automation, computer vision, and backend applications."
                },
                {
                  icon: "css",
                  name: "Tailwind CSS",
                  desc: "Modern utility-first responsive UI design."
                },
                {
                  icon: "JS",
                  name: "JavaScript",
                  desc: "Modern ES6+ and asynchronous programming."
                },
                {
                  icon: "TS",
                  name: "TypeScript",
                  desc: "Type-safe scalable application development."
                },
                {
                  icon: "R",
                  name: "React / Next.js",
                  desc: "Building scalable, SEO-friendly full-stack applications."
                },
                {
                  icon: "terminal",
                  name: "Node.js",
                  desc: "Scalable backend systems and server-side development."
                },
                {
                  icon: "api",
                  name: "Express.js & REST API",
                  desc: "Developing secure and scalable RESTful APIs."
                },
                {
                  icon: "database",
                  name: "MongoDB",
                  desc: "Efficient NoSQL database design and management."
                },
                {
                  icon: "verified_user",
                  name: "JWT Authentication",
                  desc: "Implementing secure authentication and authorization."
                },
                {
                  icon: "git",
                  name: "Git & GitHub",
                  desc: "Version control and collaborative development."
                },
                {
                  icon: "cloud_upload",
                  name: "Vercel",
                  desc: "Deploying and managing modern web applications."
                },
                {
                  icon: "psychology",
                  name: "AI Integration",
                  desc: "Integrating LLMs and AI-powered features."
                },
                {
                  icon: "smart_toy",
                  name: "Prompt Engineering",
                  desc: "Designing effective prompts for AI applications."
                }
              ].map((skill, idx) => (
                <SpotlightCard key={idx} className="skill-card p-10 rounded-[32px] group">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center bg-surface-container rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    {skill.icon.length > 2 ? (
                      <span className="material-symbols-outlined text-primary text-4xl">{skill.icon}</span>
                    ) : (
                      <span className="text-3xl font-bold text-primary">{skill.icon}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{skill.name}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{skill.desc}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-section-padding px-gutter">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16 reveal-up">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                Featured Projects
              </h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                A selection of work that defines my engineering style.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {[
                {
                  title: "SkillHub",
                  desc: "A production-grade AI-powered EdTech platform with secure authentication, personalized course recommendations, Stripe payments, and intelligent course management.",
                  img: "/projects/skillhub.png",
                  tags: [
                    "Next.js",
                    "TypeScript",
                    "Express.js",
                    "MongoDB",
                    "Better Auth",
                    "JWT",
                    "Stripe",
                    "Groq AI"
                  ],
                  href: "/skillhub",        // ✅ যোগ করা হয়েছে
                  github: "https://github.com/moajjem441/SkillHub",
                  live: "https://skillhub-ivory.vercel.app"
                },

                {
    title: "BookNest",
    desc: "A modern full-stack community book sharing platform where users can share physical books and digital PDF resources, request to borrow books, manage their personal library, and securely access approved resources.",
    img: "/projects/booknest.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "MongoDB",
      "Better Auth",
      "JWT",
      "Framer Motion"
    ],
    href: "/booknest",
    github: "https://github.com/moajjem441/BookNest",
    live: "https://booknest-eight-black.vercel.app"
  },


                {
                  title: "Online Ticket Booking Platform",
                  desc: "A full-stack ticket booking platform with secure authentication, role-based dashboards, online booking, and payment integration.",
                  img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000&auto=format&fit=crop",
                  tags: [
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "JWT",
                    "Stripe"
                  ],
                  href: "/ticket-booking",   // ✅ নতুন
                  github: "https://github.com/moajjem441/online-ticket-booking-platform",
                  live: "https://online-ticket-booking-platform-eight.vercel.app"
                },
                {
                  title: "IdeaVault",
                  desc: "A full-stack startup idea sharing platform where users can publish innovative ideas, engage in discussions, and discover inspiring projects through a modern social experience.",
                  img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
                  tags: [
                    "Next.js",
                    "React",
                    "Tailwind CSS",
                    "Node.js",
                    "Express.js",
                    "MongoDB"
                  ],
                  href: "/ideavault",       // ✅ নতুন
                  github: "https://github.com/moajjem441/ideavault-client-site",
                  live: "https://ideavault-tau-gray.vercel.app/"
                },
                {
                  title: "SkillSphere",
                  desc: "A modern online learning platform where users can discover, search, and enroll in skill-based courses with secure authentication and protected learning experiences.",
                  img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
                  tags: [
                    "Next.js",
                    "React",
                    "Tailwind CSS",
                    "Better Auth",
                    "HeroUI",
                    "DaisyUI"
                  ],
                  href: "/skillsphere",     // ✅ নতুন
                  github: "https://github.com/moajjem441/Skill-Sphere",
                  live: "https://skill-sphere-taupe.vercel.app"
                },
                {
                  title: "Mind Refreshment App",
                  desc: "A mental wellness application designed to help users track mood, relax, and improve mental well-being using interactive features.",
                  img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
                  tags: ["React", "Node.js", "MongoDB", "Mental Health"],
                  href: "/mind-refreshment", // ✅ নতুন
                  github: "https://github.com/moajjem441/Mind_Refreshment_App_-Sem-6-",
                  live: ""  // খালি রাখুন (Live Demo নেই)
                },
                {
                  title: "Third Eye Assistive System",
                  desc: "An IoT-based assistive system for visually impaired users providing obstacle detection and real-time audio feedback.",
                  img: "https://m.media-amazon.com/images/I/51kxxwhbUML.jpg",
                  tags: ["IoT", "Arduino", "Sensors", "Assistive Tech"],
                  href: "/third-eye",       // ✅ নতুন
                  github: "https://github.com/moajjem441/third-eye-assistive-system",
                  live: ""
                },
                {
                  title: "Liver Disease Stage Prediction",
                  desc: "A machine learning project focused on predictive modeling for liver disease stage detection using data analysis and ML algorithms.",
                  img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
                  tags: ["Machine Learning", "Python", "Data Analysis", "Healthcare AI"],
                  href: "/liver-prediction", // ✅ নতুন
                  github: "https://github.com/moajjem441/Predictive-Modeling-for-Liver-Disease-Stages-using-ML",
                  live: ""
                }
              ].map((project, idx) => (
                <TiltCard key={idx} className="project-card rounded-[40px] p-8 group cursor-pointer">
                  <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-white/5 bg-surface-container-high/50 relative">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={project.img}
                      alt={project.title}
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-label-caps text-primary uppercase border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-on-surface-variant mb-6 leading-relaxed">
                    {project.desc}
                  </p>

                  {/* বাটন গ্রুপ */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* VIEW DETAILS (সব প্রোজেক্টের জন্য) */}
                    <Link href={project.href}>
                      <Magnetic>
                        <span className="flex items-center gap-2 text-primary font-label-caps text-xs group/btn cursor-pointer border border-primary/30 px-4 py-2 rounded-full hover:bg-primary/10 transition-all duration-300">
                          VIEW DETAILS
                          <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </span>
                      </Magnetic>
                    </Link>


                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>





        {/* Contact */}
        <section id="contact" className="py-section-padding px-gutter relative overflow-hidden">
          <div className="max-w-4xl mx-auto glass-card p-12 md:p-20 rounded-[40px] reveal-up">
            <div className="text-center mb-12">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                Let's Collaborate
              </h2>
              <p className="text-on-surface-variant">
                Have a project in mind? Reach out and let's build something extraordinary.
              </p>
            </div>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              onSubmit={handleContactSubmit}
            >
              <div className="space-y-2">
                <label className="font-label-caps text-[10px] uppercase text-primary tracking-widest ml-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-6 py-4 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-on-surface"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-[10px] uppercase text-primary tracking-widest ml-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-6 py-4 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-on-surface"
                  placeholder="your@email.com"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="font-label-caps text-[10px] uppercase text-primary tracking-widest ml-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-6 py-4 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all resize-none text-on-surface"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="md:col-span-2 text-center pt-4">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary-container text-on-primary-container px-12 py-4 rounded-xl font-label-caps text-label-caps primary-glow hover:bg-primary/90 transition-all duration-300 w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </Magnetic>
              </div>
            </form>

            <div
              aria-live="polite"
              className={`mt-6 min-h-6 text-center text-sm font-medium ${contactStatus.type === "success"
                ? "text-green-400"
                : contactStatus.type === "error"
                  ? "text-red-400"
                  : "text-on-surface-variant"
                }`}
            >
              {contactStatus.message}
            </div>

            <div className="mt-16 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-label-caps text-[10px] uppercase text-on-surface-variant mb-2">Email</p>
                <a href="mailto:moajjem@example.com" className="text-on-surface hover:text-primary transition-colors">moajjem441@gmail.com</a>
              </div>
              <div>
                <p className="font-label-caps text-[10px] uppercase text-on-surface-variant mb-2">Phone</p>
                <p className="text-on-surface">+8801708372039</p>
              </div>
              <div>
                <p className="font-label-caps text-[10px] uppercase text-on-surface-variant mb-2">Location</p>
                <p className="text-on-surface">Bangladesh</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-20 bg-surface-container-lowest border-t border-white/5">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">

            <div className="w-12 h-12 rounded-full backdrop-blur-sm bg-white/10 
          flex items-center justify-center font-bold text-white 
          border border-white/30 shadow-2xl hover:scale-110 transition-transform 
          animate-pulse-glow">
              MH
            </div>

            <div className="flex flex-wrap justify-center gap-10">
              {[
                { name: "GitHub", url: "https://github.com/moajjem441" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/moajjem-hossain-" },
                { name: "Facebook", url: "https://facebook.com/" },
                { name: "Twitter", url: "https://x.com/NakyNaky1078618" }
              ].map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="font-body-md text-sm text-on-surface-variant opacity-60">
              © 2026 Moajjem Hossain. Built with passion and gratitude to Allah.
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
