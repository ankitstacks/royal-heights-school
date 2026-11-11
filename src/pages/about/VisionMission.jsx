
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Eye,
  Heart,
  Target,
  Sparkles,
} from "lucide-react";
import "./About.css";

const values = [
  {
    icon: Eye,
    title: "Our Vision",
    text: "To nurture confident, curious and responsible learners who are prepared to contribute positively to society.",
  },
  {
    icon: Target,
    title: "Our Mission",
    text: "To provide meaningful learning experiences that develop knowledge, creativity, discipline and independent thinking.",
  },
  {
    icon: Heart,
    title: "Our Values",
    text: "Respect, honesty, kindness, responsibility and a lifelong commitment to learning guide our school community.",
  },
];

export default function VisionMission() {
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
          <ArrowLeft size={16} /> Back to Home
        </a>
      </header>

      <section className="about-inner-hero">
        <motion.div
          className="about-inner-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="about-inner-eyebrow">
            <Sparkles size={15} /> OUR SCHOOL · OUR PURPOSE
          </span>

          <h1>Vision &amp; Mission</h1>

          <p>
            Building a learning environment where every student is encouraged
            to discover, grow and create a brighter future.
          </p>

          <a href="#our-values" className="about-inner-button">
            Discover Our Values <ArrowRight size={17} />
          </a>
        </motion.div>
      </section>

      <main className="about-inner-content">
        <div className="about-inner-intro">
          <span className="about-inner-kicker">THE ROYAL HEIGHTS APPROACH</span>
          <h2>Education beyond the classroom.</h2>
          <p>
            At Royal Heights Higher Secondary School, we believe that education
            is about more than academic achievement. It is also about developing
            confidence, character, curiosity and the ability to work with others.
          </p>
        </div>

        <div className="about-inner-cards" id="our-values">
          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                className="about-inner-card"
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <span className="about-inner-icon">
                  <Icon size={25} />
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

        <section className="about-inner-quote">
          <Compass size={30} />
          <p>
            Every learner has potential. Our purpose is to encourage that
            potential through knowledge, guidance and meaningful experiences.
          </p>
          <span>ROYAL HEIGHTS HIGHER SECONDARY SCHOOL · ZIRAPUR</span>
        </section>

        <div className="about-inner-bottom">
          <div>
            <span className="about-inner-kicker">EXPLORE MORE</span>
            <h2>Get to know our school.</h2>
          </div>

          <div className="about-inner-bottom-links">
            <a href="/about/director-message">Director's Message <ArrowRight size={16} /></a>
            <a href="/about/principal-message">Principal's Message <ArrowRight size={16} /></a>
            <a href="/about/leadership">Leadership Team <ArrowRight size={16} /></a>
          </div>
        </div>
      </main>

      <footer className="about-inner-footer">
        <strong>ROYAL HEIGHTS</strong>
        <span>Higher Secondary School · Zirapur, Madhya Pradesh</span>
        <a href="/#contact">Contact the School <ArrowRight size={15} /></a>
      </footer>
    </div>
  );
}
