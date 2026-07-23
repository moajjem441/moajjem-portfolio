import Link from "next/link";

export default function TicketBookingPage() {
  return (
    <section className="min-h-screen py-section-padding px-gutter bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Projects
        </Link>

        <div className="glass-card p-8 md:p-12 rounded-[40px] border border-white/5">
          {/* Project Image */}
          <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-white/5 bg-surface-container-high/50">
            <img
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000&auto=format&fit=crop"
              alt="Online Ticket Booking Platform"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
            Online Ticket Booking Platform
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              "Next.js",
              "TypeScript",
              "Node.js",
              "Express.js",
              "MongoDB",
              "JWT",
              "Stripe",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-label-caps text-primary uppercase border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8">
            A full-stack ticket booking platform with secure authentication, role-based
            dashboards, online booking, and payment integration.
          </p>

          {/* GitHub & Live Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/30">
              <h3 className="font-label-caps text-primary text-xs uppercase tracking-widest mb-2">
                GitHub Repository
              </h3>
              <a
                href="https://github.com/moajjem441/online-ticket-booking-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface hover:text-primary transition-colors break-all text-sm"
              >
                github.com/moajjem441/online-ticket-booking-platform
              </a>
            </div>
            <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/30">
              <h3 className="font-label-caps text-primary text-xs uppercase tracking-widest mb-2">
                Live Demo
              </h3>
              <a
                href="https://online-ticket-booking-platform-eight.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface hover:text-primary transition-colors break-all text-sm"
              >
                online-ticket-booking-platform-eight.vercel.app
              </a>
            </div>
          </div>

          {/* Challenges */}
          <div className="mb-8 p-6 rounded-2xl bg-surface-container/50 border border-outline-variant/20">
            <h3 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">warning</span>
              Challenges Faced
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Preventing double-booking required atomic database operations for seat locking.
              Designing 3 separate dashboards (Admin, Vendor, User) with different JWT
              permissions was challenging.
            </p>
          </div>

          {/* Improvements */}
          <div className="p-6 rounded-2xl bg-primary-container/10 border border-primary/10">
            <h3 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">rocket_launch</span>
              Future Improvements
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Add automated SMS/email reminders, implement a dynamic pricing model based on
              demand, and add a live chat support system.
            </p>
          </div>
        </div>
      </div>
    </section>
    
  );
}