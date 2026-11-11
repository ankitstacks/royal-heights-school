
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  Globe,
  Lightbulb,
  Pencil,
  Users,
} from "lucide-react";
import "./Academics.css";

const learningAreas = [
  {
    icon: BookOpen,
    number: "01",
    title: "Language & Literacy",
    description:
      "Build reading, writing, vocabulary and communication skills through regular learning and practice.",
  },
  {
    icon: Calculator,
    number: "02",
    title: "Mathematical Thinking",
    description:
      "Develop number sense, logical thinking and problem-solving through age-appropriate activities.",
  },
  {
    icon: Globe,
    number: "03",
    title: "Understanding the World",
    description:
      "Explore the environment, communities and everyday experiences to build awareness and curiosity.",
  },
  {
    icon: Pencil,
    number: "04",
    title: "Creative Expression",
    description:
      "Encourage imagination and self-expression through drawing, writing and creative activities.",
  },
  {
    icon: Lightbulb,
    number: "05",
    title: "Curiosity & Discovery",
    description:
      "Encourage students to ask questions, observe their surroundings and explore new ideas.",
  },
  {
    icon: Users,
    number: "06",
    title: "Teamwork & Confidence",
    description:
      "Practise cooperation, communication, responsibility and respect for others.",
  },
];

export default function PrimarySchool() {
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
          src="https://res.cloudinary.com/trcybfpw/image/upload/v1793786428/_DSC6040.JPG.jpg"
          alt="Illustrative classroom learning environment"
        />
        <div className="academic-hero-shade" />

        <motion.div
          className="academic-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="academic-eyebrow">CLASSES 1–5</p>

          <h1>
            Building strong
            <br />
            <span>foundations.</span>
          </h1>

          <p className="academic-lead">
            A stage for growing knowledge, discovering new interests and
            developing the confidence to learn independently.
          </p>

          <div className="academic-actions">
            <a href="#learning-areas" className="academic-button">
              Explore learning <ArrowRight size={17} />
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
            src="https://res.cloudinary.com/trcybfpw/image/upload/v1793786428/_DSC6040.JPG.jpg"
            alt="Children learning together"
            loading="lazy"
          />

          <div className="academic-feature-copy">
            <p className="academic-eyebrow">THE FOUNDATION YEARS</p>

            <h2>Every new skill opens a new possibility.</h2>

            <p>
              Primary school is an important time for developing foundational
              knowledge, positive study habits and a willingness to explore.
              Students can grow through structured lessons, practice,
              discussions and creative activities.
            </p>

            <ul className="academic-check-list">
              <li>✓ Develop reading, writing and communication</li>
              <li>✓ Strengthen mathematical understanding</li>
              <li>✓ Explore ideas and ask meaningful questions</li>
              <li>✓ Build confidence and collaborative skills</li>
            </ul>

            <a href="/academics/middle" className="academic-button">
              Discover Middle School <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section
        className="academic-section academic-section-cream"
        id="learning-areas"
      >
        <div className="academic-section-heading">
          <p className="academic-eyebrow">LEARNING & DEVELOPMENT</p>

          <h2>Growing knowledge, one step at a time.</h2>

          <p>
            These are illustrative learning areas, not a verified subject list
            for the school. Confirm the official curriculum with Royal Heights.
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
                transition={{ duration: 0.45, delay: index * 0.07 }}
              >
                <span className="academic-card-number">
                  {area.number} / LEARNING
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
          <p className="academic-eyebrow">THE NEXT CHAPTER</p>

          <h2>Keep exploring. Keep growing.</h2>

          <p>
            Explore the next academic stage or contact the school to ask about
            classes, curriculum and admission availability.
          </p>

          <div
            className="academic-actions"
            style={{ justifyContent: "center" }}
          >
            <a href="/academics/middle" className="academic-button">
              Explore Middle School <ArrowRight size={17} />
            </a>

            <a href="/admissions/enquiry" className="academic-button">
              Contact the school <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <footer className="academic-footer">
        <span>© Royal Heights Higher Secondary School</span>
        <span>Zirapur · Madhya Pradesh</span>
        <a href="/#home">Back to homepage ↑</a>
      </footer>
    </main>
  );
}
