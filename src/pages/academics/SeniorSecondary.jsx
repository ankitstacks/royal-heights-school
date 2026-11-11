
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Compass,
  GraduationCap,
  Target,
  TrendingUp,
} from "lucide-react";
import "./Academics.css";

const learningAreas = [
  {
    icon: BookOpen,
    number: "01",
    title: "Advanced Subject Learning",
    description:
      "Build deeper understanding of selected subjects and strengthen the ability to apply concepts.",
  },
  {
    icon: Compass,
    number: "02",
    title: "Explore Career Pathways",
    description:
      "Learn about different academic and professional directions before making future plans.",
  },
  {
    icon: Target,
    number: "03",
    title: "Academic Goal Setting",
    description:
      "Set clear learning goals, organise preparation and monitor progress over time.",
  },
  {
    icon: GraduationCap,
    number: "04",
    title: "Higher Education Planning",
    description:
      "Explore possible courses, entrance requirements and further education options.",
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "Independent Learning",
    description:
      "Develop research, analytical thinking, time management and self-directed study habits.",
  },
  {
    icon: BriefcaseBusiness,
    number: "06",
    title: "Future Readiness",
    description:
      "Build communication, decision-making and problem-solving skills for future opportunities.",
  },
];

export default function SeniorSecondary() {
  return (
    <main className="academic-page">
      <header className="academic-nav">
        <a href="/#home" className="academic-brand">
          <img src="/images/logo.jpeg" alt="Royal Heights School logo" />
          <span>
            <strong>ROYAL HEIGHTS</strong>
            <small>HIGHER SECONDARY SCHOOL · ZIRAPUR</small>
          </span>
        </a>

        <a href="/academics/overview" className="academic-back">
          <ArrowRight size={16} /> All academics
        </a>
      </header>

      <section className="academic-hero">
        <img
          className="academic-hero-image"
          src="https://res.cloudinary.com/trcybfpw/image/upload/v1793786437/_DSC6041.JPG.jpg"
          alt="Students on an educational campus"
        />
        <div className="academic-hero-shade" />

        <motion.div
          className="academic-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="academic-eyebrow">CLASSES 11–12</p>

          <h1>
            Prepare for
            <br />
            <span>what comes next.</span>
          </h1>

          <p className="academic-lead">
            Develop subject knowledge, explore higher education possibilities
            and begin planning the next chapter of your academic journey.
          </p>

          <div className="academic-actions">
            <a href="#learning-areas" className="academic-button">
              Explore opportunities <ArrowRight size={17} />
            </a>

            <a
              href="/admissions/enquiry"
              className="academic-button academic-button-outline"
            >
              Ask about admission <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.div>
      </section>

      <section className="academic-section">
        <div className="academic-image-grid">
          <img
            className="academic-feature-image"
            src="https://res.cloudinary.com/trcybfpw/image/upload/v1793786437/_DSC6041.JPG.jpg"
            alt="Students discussing academic work"
            loading="lazy"
          />

          <div className="academic-feature-copy">
            <p className="academic-eyebrow">YOUR FUTURE STARTS WITH LEARNING</p>

            <h2>Knowledge today. Possibilities tomorrow.</h2>

            <p>
              Senior secondary education is an important stage for developing
              subject expertise and planning further study. Exploring interests,
              understanding course requirements and setting realistic goals can
              help students make informed decisions about their future.
            </p>

            <ul className="academic-check-list">
              <li>✓ Develop deeper subject understanding</li>
              <li>✓ Explore higher education and career possibilities</li>
              <li>✓ Strengthen independent study and research skills</li>
              <li>✓ Plan academic goals and examination preparation</li>
            </ul>

            <a
              href="/academics/teaching-methodology"
              className="academic-button"
            >
              Explore teaching methodology <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section
        className="academic-section academic-section-cream"
        id="learning-areas"
      >
        <div className="academic-section-heading">
          <p className="academic-eyebrow">LEARNING & FUTURE PLANNING</p>

          <h2>Build your next chapter with purpose.</h2>

          <p>
            These are general development areas, not a confirmed list of
            school-provided programmes. Contact Royal Heights to verify
            available streams, subjects and eligibility requirements.
          </p>
        </div>

        <div className="academic-highlight-grid">
          {learningAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <motion.article
                className="academic-highlight-card"
                key={area.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                }}
              >
                <span className="academic-card-number">
                  {area.number} / FUTURE
                </span>

                <div style={{ color: "#9a642c", marginTop: 20 }}>
                  <Icon size={28} strokeWidth={1.6} />
                </div>

                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="academic-section">
        <div className="academic-section-heading">
          <p className="academic-eyebrow">PLAN YOUR NEXT STEP</p>

          <h2>Your goals. Your future. Your journey.</h2>

          <p>
            Contact the school for confirmed information about subjects,
            streams, class availability and admissions.
          </p>

          <div
            className="academic-actions"
            style={{ justifyContent: "center" }}
          >
            <a href="/admissions/enquiry" className="academic-button">
              Contact the school <ArrowRight size={17} />
            </a>

            <a href="/academics/overview" className="academic-button">
              All academic stages <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <footer className="academic-footer">
        <span>© Royal Heights Higher Secondary Shool</span>
        <span>Zirapur · Madhya Pradesh</span>
        <a href="/#home">Back to homepage ↑</a>
      </footer>
    </main>
  );
}
