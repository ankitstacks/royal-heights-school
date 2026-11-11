import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import "./About.css";

const PRINCIPAL_NAME = "SHAILENDER JOSHI";

const PRINCIPAL_PHOTO =
  "https://res.cloudinary.com/trcybfpw/image/upload/v1793789153/IMG_8221.jpg-7mb.jpg";

const commitments = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    text: "We encourage regular practice, active participation and a strong understanding of concepts to help students progress in their studies.",
  },
  {
    icon: Heart,
    title: "Character & Values",
    text: "Respect, honesty, kindness and discipline are important parts of a student's development, alongside academic learning.",
  },
  {
    icon: Users,
    title: "Learning Together",
    text: "Teachers, students and parents can work together to create a positive and supportive school environment.",
  },
];

export default function PrincipalMessage() {
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

      <section className="about-inner-hero about-principal-hero">
        <motion.div
          className="about-inner-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="about-inner-eyebrow">
            <GraduationCap size={16} />
            A MESSAGE FROM OUR PRINCIPAL
          </span>

          <h1>Growing Through Knowledge &amp; Values</h1>

          <p>
            Every day is an opportunity to learn something new, build good
            habits and take another step towards your goals.
          </p>

          <a href="#principal-message" className="about-inner-button">
            Read the Message
            <ArrowRight size={17} />
          </a>
        </motion.div>
      </section>

      <main className="about-inner-content">
        <section
          className="principal-message-layout"
          id="principal-message"
        >
          {/* Principal's Message */}
          <motion.article
            className="principal-message-copy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="about-inner-kicker">
              A MESSAGE TO OUR SCHOOL COMMUNITY
            </span>

            <h2>Dear Students and Parents,</h2>

            <p>
              Welcome to Royal Heights Higher Secondary School. A successful
              learning journey begins with curiosity, consistent effort and
              the willingness to keep improving.
            </p>

            <p>
              We encourage our students to participate in classroom activities,
              ask questions, learn from mistakes and approach new challenges
              with confidence. Academic progress is important, and so is the
              development of good character, responsibility and respect for
              others.
            </p>

            <p>
              Parents and teachers play an important role in supporting each
              student's development. Open communication and cooperation between
              home and school can help students feel encouraged and prepared
              to do their best.
            </p>

            <p>
              Let us continue to work together to create a positive school
              environment where every learner is valued and inspired to grow.
            </p>

            <div className="principal-message-signature">
              <span>Warm regards,</span>
              <strong>{PRINCIPAL_NAME}</strong>
              <small>Principal, Royal Heights Higher Secondary School</small>
            </div>
          </motion.article>

          {/* Principal Profile and School Belief */}
          <motion.aside
            className="principal-message-highlight"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              overflow: "hidden",
            }}
          >
            {/* Principal Photo */}
            <div
              style={{
                width: "100%",
                height: "260px",
                overflow: "hidden",
                borderRadius: "14px",
                marginBottom: "22px",
                background: "#e8d6c2",
              }}
            >
              <img
                src={PRINCIPAL_PHOTO}
                alt={`${PRINCIPAL_NAME}, Principal of Royal Heights Higher Secondary School`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 25%",
                  display: "block",
                }}
              />
            </div>

            {/* Principal Name */}
            <span
              style={{
                color: "#9b641e",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              OUR PRINCIPAL
            </span>

            <h2
              style={{
                fontSize: "27px",
                margin: "0 0 5px",
                lineHeight: 1.3,
              }}
            >
              {PRINCIPAL_NAME}
            </h2>

            <p
              style={{
                margin: "0 0 25px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#7a2934",
              }}
            >
              Principal · Royal Heights Higher Secondary School
            </p>

            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(110, 67, 42, 0.15)",
                marginBottom: "24px",
              }}
            />

            {/* Existing Belief Section */}
            <div className="principal-highlight-icon">
              <Sparkles size={30} />
            </div>

            <span>OUR BELIEF</span>

            <h2>Every learner can take a step forward.</h2>

            <p>
              Encouragement, effort and a supportive environment help students
              recognise their strengths and continue learning.
            </p>

            <div className="principal-highlight-bottom">
              <ShieldCheck size={19} />
              <span>Learning with purpose. Growing with values.</span>
            </div>
          </motion.aside>
        </section>

        {/* Educational Commitments */}
        <section className="principal-commitments">
          <div className="about-inner-intro">
            <span className="about-inner-kicker">
              OUR EDUCATIONAL COMMITMENT
            </span>

            <h2>Helping students grow in every way.</h2>

            <p>
              We value academic development, positive relationships and
              responsible choices throughout the learning journey.
            </p>
          </div>

          <div className="about-inner-cards">
            {commitments.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  className="about-inner-card"
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.1,
                  }}
                >
                  <span className="about-inner-icon">
                    <Icon size={24} />
                  </span>

                  <span className="about-inner-number">
                    0{index + 1}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Explore More */}
        <div className="about-inner-bottom">
          <div>
            <span className="about-inner-kicker">EXPLORE MORE</span>
            <h2>Discover our school.</h2>
          </div>

          <div className="about-inner-bottom-links">
            <a href="/about/vision-mission">
              Vision &amp; Mission
              <ArrowRight size={16} />
            </a>

            <a href="/about/director-message">
              Director's Message
              <ArrowRight size={16} />
            </a>

            <a href="/about/leadership">
              Leadership Team
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </main>

      <footer className="about-inner-footer">
        <strong>ROYAL HEIGHTS</strong>

        <span>
          Higher Secondary School · Zirapur, Madhya Pradesh
        </span>

        <a href="/#contact">
          Contact the School
          <ArrowRight size={15} />
        </a>
      </footer>
    </div>
  );
}