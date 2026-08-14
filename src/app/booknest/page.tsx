import Link from "next/link";

export default function BookNestPage() {
  return (
    <section className="min-h-screen py-section-padding px-gutter bg-background">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">
            arrow_back
          </span>
          Back to Projects
        </Link>

        <div className="glass-card p-8 md:p-12 rounded-[40px] border border-white/5">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-white/5 bg-surface-container-high/50">
            

            <img
              src="/projects/booknest.png"
              alt="BookNest"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
            BookNest
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              "Next.js",
              "TypeScript",
              "Express.js",
              "MongoDB",
              "Better Auth",
              "JWT",
              "Framer Motion",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-label-caps text-primary uppercase border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8">
            BookNest is a modern full-stack community book sharing platform
            where users can share physical books and digital PDF resources,
            request to borrow books, manage their personal library, and
            securely access approved digital resources. The platform also
            provides an admin dashboard for managing borrow requests, books,
            users, and overall platform activity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/30">
              <h3 className="font-label-caps text-primary text-xs uppercase tracking-widest mb-2">
                GitHub Repository
              </h3>

              <a
                href="https://github.com/moajjem441/BookNest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface hover:text-primary transition-colors break-all text-sm"
              >
                github.com/moajjem441/BookNest
              </a>
            </div>

            <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/30">
              <h3 className="font-label-caps text-primary text-xs uppercase tracking-widest mb-2">
                Live Demo
              </h3>

              <a
                href="https://booknest-eight-black.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface hover:text-primary transition-colors break-all text-sm"
              >
                booknest-eight-black.vercel.app
              </a>
            </div>
          </div>

          <div className="mb-8 p-6 rounded-2xl bg-surface-container/50 border border-outline-variant/20">
            <h3 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                warning
              </span>
              Challenges Faced
            </h3>

            <p className="text-on-surface-variant leading-relaxed">
              Implementing a secure borrow request and approval workflow while
              keeping book availability synchronized with request status was a
              major challenge. Protecting authenticated routes, handling
              role-based admin access, and integrating Better Auth with JWT
              authorization also required careful coordination between the
              frontend and backend.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary-container/10 border border-primary/10">
            <h3 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                rocket_launch
              </span>
              Future Improvements
            </h3>

            <p className="text-on-surface-variant leading-relaxed">
              Future improvements include email notifications, book ratings
              and reviews, user-to-user messaging, wishlist functionality,
              advanced search and filtering, borrow return management, reading
              history, and real-time notifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}