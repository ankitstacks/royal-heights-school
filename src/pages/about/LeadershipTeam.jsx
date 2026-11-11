
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  HeartHandshake,
  Building2,
} from "lucide-react";
import "./About.css";

const teamRoles = [
  {
    number: "01",
    icon: GraduationCap,
    role: "Principal",
    description:
      "Guides academic planning, supports teaching and learning, and encourages a positive school environment.",
    responsibility: "Academic Leadership",
  },
  {
    number: "02",
    icon: Building2,
    role: "School Administration",
    description:
      "Supports daily school operations, coordination and communication with students and families.",
    responsibility: "School Operations",
  },
  {
    number: "03",
    icon: BookOpen,
    role: "Teaching Faculty",
    description:
      "Helps students understand concepts, develop skills and participate actively in the learning process.",
    responsibility: "Teaching & Learning",
  },
  {
    number: "04",
    icon: HeartHandshake,
    role: "Student Support",
    description:
      "Contributes to a caring environment where students are encouraged to develop confidence and responsibility.",
    responsibility: "Student Wellbeing",
  },
];

export default function LeadershipTeam() {
  return (
    <div className="about-inner-page">
      <header className="about-inner-nav">
        <a href="/#home" className="about-inner-brand">
          <img src="/images/logo.jpeg" alt="Royal Heights logo" />
          <span>
            <strong>ROYAL HEIGHTS</strong>
            <small>HIGHER SECONDARY SCHOOL</small>
          </span>
        </a>

        <a href="/#home" className="about-back-link">
          <ArrowLeft size={16} />
          Back to Home
        </a>
      </header>

      <section className="about-inner-hero about-leadership-hero">
        <motion.div
          className="about-inner-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="about-inner-eyebrow">
            <Users size={16} />
            THE PEOPLE BEHIND OUR SCHOOL
          </span>

          <h1>Leadership Team</h1>

          <p>
            A school community works best when educators, administrators
            and families work together to support every learner.
          </p>

          <a href="#our-team" className="about-inner-button">
            Explore Our Team <ArrowRight size={17} />
          </a>
        </motion.div>
      </section>

      <main className="about-inner-content">
        <div className="about-inner-intro">
          <span className="about-inner-kicker">
            LEADERSHIP &amp; COLLABORATION
          </span>

          <h2>Working together for student growth.</h2>

          <p>
            At Royal Heights Higher Secondary School, effective education
            depends on shared responsibility, thoughtful guidance and
            collaboration across the school community.
          </p>
        </div>

        <section className="leadership-team-grid" id="our-team">
          {teamRoles.map((person, index) => {
            const Icon = person.icon;

            return (
              <motion.article
                className="leadership-team-card"
                key={person.role}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
              >
                <div className="leadership-card-top">
                  <span className="leadership-card-icon">
                    <Icon size={27} />
                  </span>

                  <span className="leadership-card-number">
                    {person.number}
                  </span>
                </div>

                <span className="leadership-card-responsibility">
                  {person.responsibility}
                </span>

                <h3>{person.role}</h3>

                <p>{person.description}</p>

                <div className="leadership-card-bottom">
                  <ShieldCheck size={16} />
                  <span>Supporting every learner</span>
                </div>
              </motion.article>
            );
          })}
        </section>

        <section className="leadership-note">
          <div className="leadership-note-icon">
            <Users size={27} />
          </div>

          <div>
            <span className="about-inner-kicker">
              MEET OUR PEOPLE
            </span>

            <h2>Real people. Shared purpose.</h2>

            <p>
              Official names, photographs, qualifications and designations
              can be added here after confirmation from the school.
            </p>
          </div>
        </section>

        <div className="about-inner-bottom">
          <div>
            <span className="about-inner-kicker">
              EXPLORE MORE
            </span>

            <h2>Discover Royal Heights.</h2>
          </div>

          <div className="about-inner-bottom-links">
            <a href="/about/vision-mission">
              Vision &amp; Mission <ArrowRight size={16} />
            </a>

            <a href="/about/director-message">
              Director's Message <ArrowRight size={16} />
            </a>

            <a href="/about/principal-message">
              Principal's Message <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </main>

      <footer className="about-inner-footer">
        <strong>ROYAL HEIGHTS</strong>
        <span>Higher Secondary School · Zirapur, Madhya Pradesh</span>
        <a href="/#contact">
          Contact the School <ArrowRight size={15} />
        </a>
      </footer>
    </div>
  );
}
