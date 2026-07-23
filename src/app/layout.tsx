import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Moajjem Hossain | MERN Stack Developer",
  description: "I am a passionate CSE student at BUBT who loves building modern web applications using React, Next.js, Node.js and MongoDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme') || 'dark';
                  document.documentElement.classList.remove('dark', 'light', 'purple');
                  document.documentElement.classList.add(saved);
                } catch (e) {}
              })();
            `
          }}
        />
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
        />
      </head>
      <body className="bg-background text-on-surface antialiased selection:bg-primary selection:text-on-primary">
        <div className="noise-overlay" />
        <ScrollProgress />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
