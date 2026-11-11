
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Palette,
  Puzzle,
  BookOpen,
  Music,
  Users,
} from "lucide-react";
import "./Academics.css";

const experiences = [
  {
    icon: Puzzle,
    title: "Play & Discovery",
    description:
      "Age-appropriate play activities that encourage curiosity, exploration and early problem-solving.",
  },
  {
    icon: BookOpen,
    title: "Stories & Language",
    description:
      "Storytelling, conversation and listening activities that encourage early communication skills.",
  },
  {
    icon: Palette,
    title: "Art & Creativity",
    description:
      "Drawing, colours, crafts and creative activities that give children ways to express themselves.",
  },
  {
    icon: Music,
    title: "Music & Movement",
    description:
      "Songs, rhythm and movement activities that make learning engaging and enjoyable.",
  },
  {
    icon: Users,
    title: "Learning Together",
    description:
      "Opportunities to practise sharing, cooperation, kindness and positive social interaction.",
  },
  {
    icon: Heart,
    title: "Confidence & Care",
    description:
      "A supportive learning environment that encourages children to participate and try new things.",
  },
];

export default function PrePrimary() {
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
          src="https://res.cloudinary.com/trcybfpw/image/upload/v1793787747/IMG-20260421-WA0257.jpg.jpg"
          alt="Young child enjoying a creative activity"
        />
        <div className="academic-hero-shade" />

        <motion.div
          className="academic-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="academic-eyebrow">NURSERY · LKG · UKG</p>
          <h1>
            Little steps.
            <br />
            <span>Big discoveries.</span>
          </h1>
          <p className="academic-lead">
            A joyful introduction to learning through play, stories,
            imagination and opportunities to discover the world around us.
          </p>

          <div className="academic-actions">
            <a href="#experiences" className="academic-button">
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
            src="https://res.cloudinary.com/trcybfpw/image/upload/v1793787747/IMG-20260421-WA0257.jpg.jpg"
            alt="Children exploring outdoors"
            loading="lazy"
          />

          <div className="academic-feature-copy">
            <p className="academic-eyebrow">A WELCOMING BEGINNING</p>
            <h2>Learning begins with wonder.</h2>
            <p>
              Young children learn by exploring, asking questions,
              communicating and interacting with the world around them.
              Engaging activities can help build confidence and make early
              learning enjoyable.
            </p>

            <ul className="academic-check-list">
              <li>✓ Explore through play and discovery</li>
              <li>✓ Develop listening and communication</li>
              <li>✓ Express ideas through art and imagination</li>
              <li>✓ Practise sharing and learning together</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className="academic-section academic-section-cream"
        id="experiences"
      >
        <div className="academic-section-heading">
          <p className="academic-eyebrow">EARLY LEARNING EXPERIENCES</p>
          <h2>A world of little discoveries.</h2>
          <p>
            A selection of learning experiences suitable for the early years.
            Confirm the school's actual programme and facilities directly.
          </p>
        </div>

        <div className="academic-highlight-grid">
          {experiences.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                className="academic-highlight-card"
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
              >
                <span className="academic-card-number">
                  0{index + 1} / DISCOVER
                </span>

                <div style={{ color: "#9a642c", marginTop: 20 }}>
                  <Icon size={27} strokeWidth={1.6} />
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="academic-section">
        <div className="academic-section-heading">
          <p className="academic-eyebrow">CONTINUE THE JOURNEY</p>
          <h2>Growing together, one stage at a time.</h2>
          <p>
            Explore the next stage or contact the school to ask about
            age requirements, available classes and admissions.
          </p>

          <div
            className="academic-actions"
            style={{ justifyContent: "center" }}
          >
            <a href="/academics/primary" className="academic-button">
              Explore Primary School <ArrowRight size={17} />
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
