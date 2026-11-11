
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

const methods = [
  {
    icon: BookOpen,
    number: "01",
    title: "Concept-Based Learning",
    description:
      "Focus on understanding the meaning behind concepts rather than memorising information alone.",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Discussion & Questions",
    description:
      "Encourage learners to ask questions, share ideas and explain their thinking clearly.",
  },
  {
    icon: FlaskConical,
    number: "03",
    title: "Practical Exploration",
    description:
      "Connect classroom concepts with examples, observation and practical activities wherever appropriate.",
  },
  {
    icon: Brain,
    number: "04",
    title: "Critical Thinking",
    description:
      "Help students examine information, consider alternatives and develop logical approaches to problems.",
  },
  {
    icon: Users,
    number: "05",
    title: "Collaborative Learning",
    description:
      "Create opportunities for students to discuss ideas, work together and learn from different perspectives.",
  },
  {
    icon: Lightbulb,
    number: "06",
    title: "Feedback & Reflection",
    description:
      "Use constructive feedback and reflection to recognise progress and identify areas for improvement.",
  },
];

export default function TeachingMethodology() {
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
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1800&q=90"
          alt="Teacher guiding students in a classroom"
        />
        <div className="academic-hero-shade" />

        <motion.div
          className="academic-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="academic-eyebrow">OUR LEARNING APPROACH</p>

          <h1>
            Make learning
            <br />
            <span>meaningful.</span>
          </h1>

          <p className="academic-lead">
            Learning becomes more meaningful when students understand
            concepts, ask questions, explore ideas and connect knowledge
            with the world around them.
          </p>

          <div className="academic-actions">
            <a href="#teaching-methods" className="academic-button">
              Explore our approach <ArrowRight size={17} />
            </a>

            <a
              href="/admissions/enquiry"
              className="academic-button academic-button-outline"
            >
              Contact the school <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.div>
      </section>

      <section className="academic-section">
        <div className="academic-image-grid">
          <img
            className="academic-feature-image"
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85"
            alt="Students participating in classroom learning"
            loading="lazy"
          />

          <div className="academic-feature-copy">
            <p className="academic-eyebrow">BEYOND THE TEXTBOOK</p>

            <h2>Understand. Explore. Apply.</h2>

            <p>
              Teaching can support different ways of learning through
              clear explanations, guided practice, questions, discussion
              and opportunities to apply ideas. The aim is to help learners
              develop understanding and confidence over time.
            </p>

            <ul className="academic-check-list">
              <li>✓ Make concepts easier to understand</li>
              <li>✓ Encourage questions and active participation</li>
              <li>✓ Connect knowledge with practical examples</li>
              <li>✓ Support progress through useful feedback</li>
            </ul>

            <a href="/academics/overview" className="academic-button">
              Explore academic stages <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section
        className="academic-section academic-section-cream"
        id="teaching-methods"
      >
        <div className="academic-section-heading">
          <p className="academic-eyebrow">TEACHING & LEARNING</p>

          <h2>Different ways to discover and grow.</h2>

          <p>
            These are educational approaches that can support effective
            learning. Please confirm which methods and programmes are
            officially practised at Royal Heights before describing them
            as school-specific policies.
          </p>
        </div>

        <div className="academic-highlight-grid">
          {methods.map((method, index) => {
            const Icon = method.icon;

            return (
              <motion.article
                className="academic-highlight-card"
                key={method.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                }}
              >
                <span className="academic-card-number">
                  {method.number} / METHOD
                </span>

                <div style={{ color: "#9a642c", marginTop: 20 }}>
                  <Icon size={28} strokeWidth={1.6} />
                </div>

                <h3>{method.title}</h3>
                <p>{method.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="academic-section">
        <div className="academic-section-heading">
          <p className="academic-eyebrow">LEARNING AT EVERY STAGE</p>

          <h2>One journey. Many opportunities.</h2>

          <p>
            Explore how learning needs change from early childhood through
            senior secondary education.
          </p>

          <div
            className="academic-actions"
            style={{ justifyContent: "center" }}
          >
            <a href="/academics/overview" className="academic-button">
              Explore academics <ArrowRight size={17} />
            </a>

            <a href="/admissions/enquiry" className="academic-button">
              Enquire with the school <ArrowUpRight size={17} />
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
