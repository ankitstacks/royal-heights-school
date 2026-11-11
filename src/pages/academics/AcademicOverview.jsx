
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import "./Academics.css";

const stages = [
  {
    number: "01",
    title: "Pre-Primary",
    classes: "Nursery · LKG · UKG",
    description: "A joyful introduction to learning through play, creativity and discovery.",
    image: "https://res.cloudinary.com/trcybfpw/image/upload/v1793787747/IMG-20260421-WA0257.jpg.jpg",
    href: "/academics/pre-primary",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Primary School",
    classes: "Classes 1–5",
    description: "Develop foundational knowledge, communication and positive learning habits.",
    image: "https://res.cloudinary.com/trcybfpw/image/upload/v1793786428/_DSC6040.JPG.jpg?utm_source=chatgpt.com",
    href: "/academics/primary",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Middle School",
    classes: "Classes 6–8",
    description: "Explore subjects, develop critical thinking and build confidence.",
    image: "https://res.cloudinary.com/trcybfpw/image/upload/v1793786437/_DSC6041.JPG.jpg?utm_source=chatgpt.com",
    href: "/academics/middle",
    icon: Lightbulb,
  },
  {
    number: "04",
    title: "Secondary School",
    classes: "Classes 9–10",
    description: "Strengthen subject understanding and prepare for important assessments.",
    image: "https://res.cloudinary.com/trcybfpw/image/upload/v1793787481/_DSC6043.JPG.jpg",
    href: "/academics/secondary",
    icon: GraduationCap,
  },
  {
    number: "05",
    title: "Senior Secondary",
    classes: "Classes 11–12",
    description: "Build subject expertise and explore higher education and career options.",
    image: "https://res.cloudinary.com/trcybfpw/image/upload/v1793786437/_DSC6041.JPG.jpg",
    href: "/academics/senior-secondary",
    icon: GraduationCap,
  },
];

export default function AcademicOverview() {
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
        <a href="/#academics" className="academic-back">
          <ArrowRight size={16} /> Back to homepage
        </a>
      </header>

      <section className="academic-hero">
        <img
          className="academic-hero-image"
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90"
          alt="Students learning in a classroom"
        />
        <div className="academic-hero-shade" />

        <motion.div
          className="academic-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="academic-eyebrow">THE LEARNING JOURNEY</p>
          <h1>
            Discover the joy
            <br />
            of <span>learning.</span>
          </h1>
          <p className="academic-lead">
            From the first steps in early childhood to preparing for the
            future, explore the different stages of the Royal Heights
            educational journey.
          </p>

          <div className="academic-actions">
            <a href="#school-stages" className="academic-button">
              Explore school stages <ArrowRight size={17} />
            </a>
            <a
              href="/admissions/enquiry"
              className="academic-button academic-button-outline"
            >
              Ask about admissions <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.div>
      </section>

      <section className="academic-section">
        <div className="academic-image-grid">
          <img
            className="academic-feature-image"
            src="https://res.cloudinary.com/trcybfpw/image/upload/v1793787481/_DSC6043.JPG.jpg"
            alt="Teacher guiding students"
            loading="lazy"
          />

          <div className="academic-feature-copy">
            <p className="academic-eyebrow">OUR ACADEMIC APPROACH</p>
            <h2>Strong foundations. Meaningful progress.</h2>
            <p>
              Students grow through different stages of learning. Each stage
              offers opportunities to develop knowledge, curiosity,
              communication and independent thinking.
            </p>

            <ul className="academic-check-list">
              <li>✓ Learning experiences suited to different age groups</li>
              <li>✓ Opportunities to ask questions and explore ideas</li>
              <li>✓ Development of communication and problem-solving skills</li>
              <li>✓ Preparation for future academic choices</li>
            </ul>

            <a href="/academics/teaching-methodology" className="academic-button">
              Explore teaching methodology <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="academic-section academic-section-cream" id="school-stages">
        <div className="academic-section-heading">
          <p className="academic-eyebrow">EXPLORE ACADEMICS</p>
          <h2>Every stage has a purpose.</h2>
          <p>
            Choose a school stage to explore its dedicated academic page.
          </p>
        </div>

        <div className="academic-stage-grid">
          {stages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <motion.a
                href={stage.href}
                className="academic-stage-card"
                key={stage.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
              >
                <img src={stage.image} alt="" loading="lazy" />

                <div className="academic-stage-copy">
                  <small>{stage.number} · {stage.classes}</small>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>

                  <span className="academic-stage-link">
                    Explore stage <Icon size={16} /> <ArrowUpRight size={16} />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      <section className="academic-cta">
        <p className="academic-eyebrow">YOUR CHILD'S JOURNEY STARTS HERE</p>
        <h2>Have questions about academics?</h2>
        <p>
          Contact Royal Heights Higher Secondary School to confirm curriculum,
          class availability and admission information.
        </p>
        <a href="/admissions/enquiry" className="academic-button">
          Enquire with the school <ArrowRight size={17} />
        </a>
      </section>

      <footer className="academic-footer">
        <span>© Royal Heights Higher Secondary School</span>
        <span>Zirapur · Madhya Pradesh</span>
        <a href="/#home">Back to homepage ↑</a>
      </footer>
    </main>
  );
}
