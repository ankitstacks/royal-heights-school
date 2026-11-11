
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  FlaskConical,
  Lightbulb,
  MessageCircle,
  Users,
} from "lucide-react";
import "./Academics.css";

const learningAreas = [
  {
    icon: Brain,
    number: "01",
    title: "Critical Thinking",
    description:
      "Encourage students to examine information, ask meaningful questions and develop their own understanding.",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Subject Exploration",
    description:
      "Build deeper understanding by exploring concepts and making connections across learning areas.",
  },
  {
    icon: FlaskConical,
    number: "03",
    title: "Inquiry & Discovery",
    description:
      "Develop curiosity through observation, investigation and practical examples wherever appropriate.",
  },
  {
    icon: Lightbulb,
    number: "04",
    title: "Problem-Solving",
    description:
      "Practise breaking questions into smaller steps and considering different possible solutions.",
  },
  {
    icon: MessageCircle,
    number: "05",
    title: "Communication",
    description:
      "Build confidence in expressing ideas, listening to others and participating in discussions.",
  },
  {
    icon: Users,
    number: "06",
    title: "Teamwork",
    description:
      "Learn to collaborate, share responsibilities and respect different perspectives.",
  },
];

export default function MiddleSchool() {
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
          alt="Students working together in a classroom"
        />
        <div className="academic-hero-shade" />

        <motion.div
          className="academic-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="academic-eyebrow">CLASSES 6–8</p>

          <h1>
            Explore ideas.
            <br />
            <span>Think beyond.</span>
          </h1>

          <p className="academic-lead">
            A stage for asking better questions, exploring subjects more
            deeply and developing the skills to approach new challenges
            with confidence.
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
            src="https://res.cloudinary.com/trcybfpw/image/upload/v1793786437/_DSC6041.JPG.jpg"
            alt="Students collaborating on a learning activity"
            loading="lazy"
          />

          <div className="academic-feature-copy">
            <p className="academic-eyebrow">A WORLD OF NEW IDEAS</p>

            <h2>From curiosity to independent thinking.</h2>

            <p>
              Middle school creates opportunities for students to explore
              more complex ideas, develop their own perspectives and become
              more responsible for their learning.
            </p>

            <ul className="academic-check-list">
              <li>✓ Ask questions and examine different ideas</li>
              <li>✓ Strengthen reasoning and problem-solving</li>
              <li>✓ Develop independent study habits</li>
              <li>✓ Build communication and teamwork skills</li>
            </ul>

            <a href="/academics/secondary" className="academic-button">
              Discover Secondary School <ArrowRight size={17} />
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

          <h2>Skills for a changing world.</h2>

          <p>
            These are illustrative development areas for middle-school
            learners. Confirm the school's actual curriculum and programmes
            directly with Royal Heights.
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
                  {area.number} / EXPLORE
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

          <h2>Ready for the next challenge?</h2>

          <p>
            Explore Secondary School or contact the school for information
            about class availability, curriculum and admissions.
          </p>

          <div
            className="academic-actions"
            style={{ justifyContent: "center" }}
          >
            <a href="/academics/secondary" className="academic-button">
              Explore Secondary School <ArrowRight size={17} />
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
