
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  CalendarCheck,
  ClipboardCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import "./Academics.css";

const learningAreas = [
  {
    icon: BookOpen,
    number: "01",
    title: "Subject Understanding",
    description:
      "Build a clear understanding of concepts and practise applying knowledge to different types of questions.",
  },
  {
    icon: Target,
    number: "02",
    title: "Goal Setting",
    description:
      "Set realistic academic goals, organise study time and work steadily towards improvement.",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Study Planning",
    description:
      "Develop revision schedules and balance classroom learning, practice and personal study.",
  },
  {
    icon: ClipboardCheck,
    number: "04",
    title: "Assessment Practice",
    description:
      "Use practice questions and feedback to understand progress and identify areas that need attention.",
  },
  {
    icon: Brain,
    number: "05",
    title: "Independent Thinking",
    description:
      "Strengthen reasoning, written expression and the ability to explain concepts clearly.",
  },
  {
    icon: TrendingUp,
    number: "06",
    title: "Continuous Improvement",
    description:
      "Review mistakes, recognise learning gaps and use consistent practice to make progress.",
  },
];

export default function SecondarySchool() {
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
          src="https://res.cloudinary.com/trcybfpw/image/upload/v1793787481/_DSC6043.JPG.jpg"
          alt="Illustrative school classroom"
        />
        <div className="academic-hero-shade" />

        <motion.div
          className="academic-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="academic-eyebrow">CLASSES 9–10</p>

          <h1>
            Turn effort into
            <br />
            <span>understanding.</span>
          </h1>

          <p className="academic-lead">
            Strengthen subject knowledge, develop effective study habits
            and approach important academic assessments with preparation
            and confidence.
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
            src="https://res.cloudinary.com/trcybfpw/image/upload/v1793787481/_DSC6043.JPG.jpg"
            alt="Student working on academic preparation"
            loading="lazy"
          />

          <div className="academic-feature-copy">
            <p className="academic-eyebrow">PREPARATION & PROGRESS</p>

            <h2>Consistency builds confidence.</h2>

            <p>
              Classes 9 and 10 are an opportunity to develop a deeper
              understanding of subjects and more organised study routines.
              Regular practice, revision and feedback can help students
              recognise their strengths and work on areas for improvement.
            </p>

            <ul className="academic-check-list">
              <li>✓ Strengthen understanding of subject concepts</li>
              <li>✓ Create realistic revision schedules</li>
              <li>✓ Practise questions and review mistakes</li>
              <li>✓ Develop time management and independent study skills</li>
            </ul>

            <a href="/academics/senior-secondary" className="academic-button">
              Explore Senior Secondary <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section
        className="academic-section academic-section-cream"
        id="learning-areas"
      >
        <div className="academic-section-heading">
          <p className="academic-eyebrow">ACADEMIC DEVELOPMENT</p>

          <h2>Prepare with purpose.</h2>

          <p>
            Explore general academic preparation principles. The official
            board, syllabus, examination pattern and school-specific
            support arrangements should be confirmed with Royal Heights.
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
                  {area.number} / PREPARE
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
          <p className="academic-eyebrow">LOOKING AHEAD</p>

          <h2>Take the next step with confidence.</h2>

          <p>
            Explore Senior Secondary education and contact the school to
            confirm available classes, subjects, streams and admission details.
          </p>

          <div
            className="academic-actions"
            style={{ justifyContent: "center" }}
          >
            <a href="/academics/senior-secondary" className="academic-button">
              Explore Senior Secondary <ArrowRight size={17} />
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
