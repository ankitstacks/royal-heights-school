import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Quote,
  BookOpen,
  Users,
  Lightbulb,
} from "lucide-react";
import "./About.css";

const DIRECTOR_NAME = "RANDHIR SINGH CHOUHAN";

const DIRECTOR_PHOTO =
  "https://res.cloudinary.com/trcybfpw/image/upload/v1793788984/IMG_8210.jpg.jpg";

const priorities = [
  {
    icon: BookOpen,
    title: "Meaningful Learning",
    text: "Encouraging students to understand concepts, ask questions and develop a strong foundation for lifelong learning.",
  },
  {
    icon: Users,
    title: "Partnership with Families",
    text: "Building a supportive school community through communication, cooperation and shared responsibility.",
  },
  {
    icon: Lightbulb,
    title: "Preparing for Tomorrow",
    text: "Helping students develop confidence, creativity, responsibility and the ability to approach new challenges.",
  },
];

export default function DirectorMessage() {
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

      <section className="about-inner-hero about-director-hero">
        <motion.div
          className="about-inner-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="about-inner-eyebrow">
            <MessageCircle size={15} />
            A MESSAGE FROM OUR DIRECTOR
          </span>

          <h1>A Journey of Learning &amp; Growth</h1>

          <p>
            Creating opportunities for students to learn with purpose,
            grow with confidence and move towards a brighter future.
          </p>

          <a href="#director-message" className="about-inner-button">
            Read the Message
            <ArrowRight size={17} />
          </a>
        </motion.div>
      </section>

      <main className="about-inner-content">
        <section
          className="director-message-layout"
          id="director-message"
        >
          {/* Director Portrait Card */}
          <motion.div
            className="director-message-visual"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              position: "relative",
              overflow: "hidden",
              padding: 0,
              minHeight: "580px",
              background: "#4b1922",
            }}
          >
            <img
              src={DIRECTOR_PHOTO}
              alt={`${DIRECTOR_NAME}, Director of Royal Heights Higher Secondary School`}
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 25%",
              }}
            />

            {/* Image overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(43, 12, 20, 0.95) 0%, rgba(43, 12, 20, 0.45) 38%, transparent 75%)",
              }}
            />

            {/* Quote icon */}
            <div
              style={{
                position: "absolute",
                top: "30px",
                left: "30px",
                width: "68px",
                height: "68px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f3c879",
                background: "rgba(65, 20, 29, 0.75)",
                border: "1px solid rgba(243, 200, 121, 0.4)",
                borderRadius: "20px",
                backdropFilter: "blur(8px)",
              }}
            >
              <Quote size={34} />
            </div>

            {/* Director information */}
            <div
              style={{
                position: "absolute",
                left: "30px",
                right: "25px",
                bottom: "30px",
                color: "#ffffff",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "#f3c879",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  marginBottom: "12px",
                }}
              >
                LEARNING · CHARACTER · GROWTH
              </span>

              <h2
                style={{
                  fontSize: "clamp(27px, 3vw, 38px)",
                  lineHeight: 1.2,
                  margin: "0 0 12px",
                  color: "#ffffff",
                }}
              >
                {DIRECTOR_NAME}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#f3c879",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                }}
              >
                DIRECTOR
              </p>

              <div
                style={{
                  width: "55px",
                  height: "3px",
                  background: "#f3c879",
                  marginTop: "18px",
                  borderRadius: "5px",
                }}
              />
            </div>
          </motion.div>

          {/* Director Message */}
          <motion.article
            className="director-message-copy"
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="about-inner-kicker">
              A WARM WELCOME
            </span>

            <h2>Dear Parents and Students,</h2>

            <p>
              Welcome to Royal Heights Higher Secondary School. Education is
              a shared journey, shaped by the curiosity of students, the
              guidance of teachers and the support of families.
            </p>

            <p>
              We believe that every child should have opportunities to explore
              ideas, build knowledge, develop good habits and discover their
              individual strengths. Our aim is to support students as they grow
              into confident, thoughtful and responsible individuals.
            </p>

            <p>
              We value the partnership between school and home. By working
              together with respect and a shared commitment to learning, we can
              create an environment in which students feel encouraged to
              participate, improve and achieve their potential.
            </p>

            <p>
              Thank you for being a part of the Royal Heights community. We
              look forward to continuing this journey of learning and growth
              together.
            </p>

            <div className="director-message-signature">
              <span>With warm regards,</span>
              <strong>{DIRECTOR_NAME}</strong>
              <small>Director, Royal Heights Higher Secondary School</small>
            </div>
          </motion.article>
        </section>

        {/* Our Commitment */}
        <section className="director-priorities">
          <div className="about-inner-intro">
            <span className="about-inner-kicker">
              OUR COMMITMENT
            </span>

            <h2>What guides our journey.</h2>

            <p>
              These priorities shape the kind of learning environment we
              strive to create for our students.
            </p>
          </div>

          <div className="about-inner-cards">
            {priorities.map((item, index) => {
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

        {/* Bottom Navigation */}
        <div className="about-inner-bottom">
          <div>
            <span className="about-inner-kicker">
              CONTINUE EXPLORING
            </span>

            <h2>Get to know Royal Heights.</h2>
          </div>

          <div className="about-inner-bottom-links">
            <a href="/about/vision-mission">
              Vision &amp; Mission
              <ArrowRight size={16} />
            </a>

            <a href="/about/principal-message">
              Principal's Message
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