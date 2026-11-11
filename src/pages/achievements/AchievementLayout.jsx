
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  GraduationCap,
  Star,
  Trophy,
} from "lucide-react";

import "./Achievements.css";

const achievementLinks = [
  {
    title: "Board Results",
    description: "Class 10th & 12th performance",
    href: "/achievements/board-results",
    icon: GraduationCap,
  },
  {
    title: "Awards & Recognition",
    description: "Celebrating excellence and honours",
    href: "/achievements/awards",
    icon: Award,
  },
  {
    title: "Academic Toppers",
    description: "Meet our outstanding achievers",
    href: "/achievements/toppers",
    icon: Trophy,
  },
  {
    title: "Student Success Stories",
    description: "Stories that inspire us",
    href: "/achievements/success-stories",
    icon: Star,
  },
];

export function AchievementLayout({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <div className="achievement-page">
      <header className="achievement-nav">
        <a href="/" className="achievement-brand">
          <img
            src="/images/logo.jpeg"
            alt="Royal Heights school logo"
          />

          <span>
            <strong>ROYAL HEIGHTS</strong>
            <small>HIGHER SECONDARY SCHOOL</small>
            <small>ZIRAPUR · MADHYA PRADESH</small>
          </span>
        </a>

        <a href="/" className="achievement-back">
          <ArrowLeft size={16} />
          Back to Home
        </a>
      </header>

      <main>
        <section className="achievement-hero">
          <div className="achievement-hero-glow" />

          <div className="achievement-hero-content">
            <p className="achievement-eyebrow">
              <Star size={15} />
              CELEBRATING EXCELLENCE
            </p>

            <h1>{title}</h1>

            <p className="achievement-hero-description">
              {description}
            </p>

            <div className="achievement-breadcrumb">
              <a href="/">Home</a>
              <ArrowRight size={14} />
              <span>Achievements</span>
              <ArrowRight size={14} />
              <span>{title}</span>
            </div>
          </div>
        </section>

        <section className="achievement-main-content">
          <div className="achievement-section-heading">
            <p className="achievement-kicker">{eyebrow}</p>
          </div>

          {children}
        </section>

        <section className="achievement-explore">
          <div className="achievement-explore-heading">
            <p className="achievement-kicker">KEEP EXPLORING</p>
            <h2>Every achievement tells a story.</h2>
            <p>
              Discover how our students celebrate progress,
              dedication and success.
            </p>
          </div>

          <div className="achievement-explore-grid">
            {achievementLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  href={item.href}
                  className="achievement-explore-card"
                  key={item.href}
                >
                  <span className="achievement-explore-icon">
                    <Icon size={23} />
                  </span>

                  <span className="achievement-explore-copy">
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>

                  <ArrowUpRight size={19} />
                </a>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="achievement-footer">
        <a href="/" className="achievement-footer-brand">
          ROYAL HEIGHTS
        </a>

        <span>
          Higher Secondary School · Zirapur, Madhya Pradesh
        </span>

        <a href="/">Back to Home ↑</a>
      </footer>
    </div>
  );
}
