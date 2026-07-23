import Link from "next/link";

export default function LiverPredictionPage() {
  return (
    <section className="min-h-screen py-section-padding px-gutter bg-background">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Projects
        </Link>

        <div className="glass-card p-8 md:p-12 rounded-[40px] border border-white/5">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-white/5 bg-surface-container-high/50">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop"
              alt="Liver Disease Stage Prediction"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
            Liver Disease Stage Prediction
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {["Machine Learning", "Python", "Data Analysis", "Healthcare AI"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-label-caps text-primary uppercase border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8">
            A machine learning project focused on predictive modeling for liver disease
            stage detection using data analysis and ML algorithms.
          </p>

          <div className="grid grid-cols-1 gap-6 mb-10">
            <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/30">
              <h3 className="font-label-caps text-primary text-xs uppercase tracking-widest mb-2">
                GitHub Repository
              </h3>
              <a
                href="https://github.com/moajjem441/Predictive-Modeling-for-Liver-Disease-Stages-using-ML"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface hover:text-primary transition-colors break-all text-sm"
              >
                github.com/moajjem441/Predictive-Modeling-for-Liver-Disease-Stages-using-ML
              </a>
            </div>
          </div>

          <div className="mb-8 p-6 rounded-2xl bg-surface-container/50 border border-outline-variant/20">
            <h3 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">warning</span>
              Challenges Faced
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Data cleaning and handling missing values in medical datasets. Improving model
              accuracy through feature engineering and hyperparameter tuning.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary-container/10 border border-primary/10">
            <h3 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">rocket_launch</span>
              Future Improvements
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Deploy the model as a REST API using FastAPI, integrate with a frontend for
              real-time predictions, and add more data features for better accuracy.
            </p>
          </div>
        </div>
      </div>
    </section>
    
  );
}