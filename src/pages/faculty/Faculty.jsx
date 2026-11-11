
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import "./Faculty.css";

const facultyProfiles = [
  {
    name: "Faculty Member 01",
    role: "Senior Academic Educator",
    subject: "Subject Department",
    qualification: "Add verified qualification",
    experience: "Add verified experience",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=700&q=85",
    number: "01",
  },
  {
    name: "Faculty Member 02",
    role: "Academic Educator",
    subject: "Science Department",
    qualification: "Add verified qualification",
    experience: "Add verified experience",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85",
    number: "02",
  },
  {
    name: "Faculty Member 03",
    role: "Academic Educator",
    subject: "Mathematics Department",
    qualification: "Add verified qualification",
    experience: "Add verified experience",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85",
    number: "03",
  },
  {
    name: "Faculty Member 04",
    role: "Academic Educator",
    subject: "Languages Department",
    qualification: "Add verified qualification",
    experience: "Add verified experience",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=85",
    number: "04",
  },
];

const teachingValues = [
  {
    icon: HeartHandshake,
    title: "Personal Attention",
    description:
      "Encouraging students to ask questions, build confidence and learn at their own pace.",
  },
  {
    icon: Lightbulb,
    title: "Learning by Understanding",
    description:
      "Making concepts easier to understand through discussion, examples and practical activities.",
  },
  {
    icon: BookOpen,
    title: "Continuous Improvement",
    description:
      "Supporting steady academic progress through feedback, revision and guided practice.",
  },
];

const developmentSteps = [
  {
    number: "01",
    title: "Professional Learning",
    description:
      "Provide details of approved workshops, teacher training programmes and professional courses.",
  },
  {
    number: "02",
    title: "Collaborative Teaching",
    description:
      "Show how educators share ideas, teaching resources and classroom experiences.",
  },
  {
    number: "03",
    title: "Reflect and Improve",
    description:
      "Highlight school-approved practices for reviewing teaching methods and improving student learning.",
  },
];

export default function Faculty() {
  return (
    <div className="faculty-page">
      <header className="faculty-nav">
        <a href="/" className="faculty-brand">
          <img src="/images/logo.jpeg" alt="Royal Heights school logo" />
          <span>
            <strong>ROYAL HEIGHTS</strong>
            <small>HIGHER SECONDARY SCHOOL</small>
            <small>ZIRAPUR · MADHYA PRADESH</small>
          </span>
        </a>

        <a href="/" className="faculty-home-link">
          <ArrowLeft size={16} />
          Back to Home
        </a>
      </header>

      <main>
        <section className="faculty-hero">
          <div className="faculty-hero-orb faculty-hero-orb-one" />
          <div className="faculty-hero-orb faculty-hero-orb-two" />

          <motion.div
            className="faculty-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="faculty-eyebrow">
              <Sparkles size={15} />
              THE PEOPLE BEHIND EVERY POSSIBILITY
            </span>

            <h1>
              Meet the people
              <br />
              who <em>inspire</em> every learner.
            </h1>

            <p>
              Great education begins with educators who encourage curiosity,
              nurture confidence and help every learner discover their
              potential.
            </p>

            <div className="faculty-hero-actions">
              <a href="#faculty-team" className="faculty-primary-button">
                Meet Our Educators
                <ArrowRight size={17} />
              </a>

              <a href="#faculty-development" className="faculty-text-button">
                Our teaching philosophy
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="faculty-hero-note">
              <Star size={16} />
              <span>Inspiring learning. Encouraging growth.</span>
            </div>
          </motion.div>

          <motion.div
            className="faculty-hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="faculty-visual-frame">
              <img
                src="https://res.cloudinary.com/trcybfpw/image/upload/v1793790619/03.jpg.jpg"
                alt="Illustrative classroom learning scene"
              />

              <div className="faculty-image-caption">
                <span className="faculty-caption-icon">
                  <GraduationCap size={23} />
                </span>
                <span>
                  <strong>Learning starts with inspiration.</strong>
                  <small>ROYAL HEIGHTS · ZIRAPUR</small>
                </span>
              </div>
            </div>

            <div className="faculty-floating-star faculty-floating-star-one">
              <Star size={24} />
            </div>
            <div className="faculty-floating-star faculty-floating-star-two">
              <Sparkles size={24} />
            </div>
          </motion.div>
        </section>

        <section className="faculty-intro section-shell">
          <motion.div
            className="faculty-intro-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="faculty-kicker">OUR EDUCATORS</span>
            <h2>
              More than teaching.
              <br />
              <em>A lasting influence.</em>
            </h2>
          </motion.div>

          <motion.div
            className="faculty-intro-copy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p>
              Teachers help shape the way students think, explore ideas and
              approach challenges. Our faculty section celebrates the role
              of educators in building a positive learning environment.
            </p>
            <p>
              Explore the profiles, teaching values and professional
              development information that the school chooses to share.
            </p>
          </motion.div>
        </section>

        <section id="faculty-team" className="faculty-team section-shell">
          <div className="faculty-section-heading">
            <div>
              <span className="faculty-kicker">GET TO KNOW OUR TEAM</span>
              <h2>Meet our educators.</h2>
            </div>
            <span className="faculty-heading-mark">
              <Users size={21} />
              Faculty profiles
            </span>
          </div>

          <div className="faculty-profile-grid">
            {facultyProfiles.map((person, index) => (
              <motion.article
                className="faculty-profile-card"
                key={person.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -7 }}
              >
                <div className="faculty-profile-image">
                  <img src={person.image} alt="Illustrative educator portrait" />
                  <span className="faculty-profile-number">
                    {person.number}
                  </span>
                  <span className="faculty-profile-subject">
                    {person.subject}
                  </span>
                </div>

                <div className="faculty-profile-body">
                  <span className="faculty-profile-role">{person.role}</span>
                  <h3>{person.name}</h3>

                  <div className="faculty-profile-detail">
                    <GraduationCap size={17} />
                    <span>
                      <small>QUALIFICATION</small>
                      <strong>{person.qualification}</strong>
                    </span>
                  </div>

                  <div className="faculty-profile-detail">
                    <BookOpen size={17} />
                    <span>
                      <small>EXPERIENCE</small>
                      <strong>{person.experience}</strong>
                    </span>
                  </div>

                  <div className="faculty-profile-footer">
                    <span>Profile awaiting school verification</span>
                    <ArrowUpRight size={17} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="faculty-verification-note">
            <Star size={18} />
            <p>
              <strong>School verification required.</strong> The names,
              portraits, subjects, qualifications and experience above are
              placeholders. Replace them with approved faculty information
              before publishing this page.
            </p>
          </div>
        </section>

        <section className="faculty-values-section">
          <div className="section-shell">
            <div className="faculty-section-heading faculty-values-heading">
              <div>
                <span className="faculty-kicker">HOW WE INSPIRE LEARNING</span>
                <h2>A thoughtful approach to teaching.</h2>
              </div>
              <p>
                A learning environment where questions are welcomed,
                progress is encouraged and every learner matters.
              </p>
            </div>

            <div className="faculty-values-grid">
              {teachingValues.map((value, index) => {
                const Icon = value.icon;

                return (
                  <motion.article
                    className="faculty-value-card"
                    key={value.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                  >
                    <span className="faculty-value-icon">
                      <Icon size={25} />
                    </span>
                    <span className="faculty-value-number">
                      0{index + 1}
                    </span>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="faculty-development"
          className="faculty-development section-shell"
        >
          <div className="faculty-development-intro">
            <span className="faculty-kicker">GROWING TOGETHER</span>
            <h2>
              Great teachers
              <br />
              keep <em>learning, too.</em>
            </h2>
            <p>
              Professional development gives educators opportunities to
              reflect on their practice, explore new ideas and strengthen
              their teaching skills.
            </p>

            <a href="#faculty-contact" className="faculty-outline-button">
              Ask about faculty
              <ArrowRight size={17} />
            </a>
          </div>

          <div className="faculty-development-list">
            {developmentSteps.map((step, index) => (
              <motion.article
                className="faculty-development-item"
                key={step.number}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <span className="faculty-development-number">
                  {step.number}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <ArrowUpRight size={19} />
              </motion.article>
            ))}

            <p className="faculty-development-disclaimer">
              Add only training programmes, workshops and development
              activities confirmed by the school.
            </p>
          </div>
        </section>

        <section id="faculty-contact" className="faculty-contact-section">
          <div className="faculty-contact-inner">
            <div>
              <span className="faculty-kicker">LET'S CONNECT</span>
              <h2>Have a faculty-related question?</h2>
              <p>
                Contact Royal Heights Higher Secondary School for
                school-approved faculty information.
              </p>
            </div>

            <div className="faculty-contact-actions">
              <a
                href="https://wa.me/918720024123?text=Hello%20Royal%20Heights%2C%20I%20have%20a%20faculty-related%20enquiry."
                target="_blank"
                rel="noreferrer"
                className="faculty-primary-button"
              >
                <MessageCircle size={18} />
                WhatsApp Us
                <ArrowUpRight size={17} />
              </a>

              <a href="tel:+918720024123" className="faculty-outline-button">
                Call the School
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="faculty-footer">
        <a href="/" className="faculty-footer-brand">
          ROYAL HEIGHTS
        </a>
        <span>
          Higher Secondary School · Zirapur, Madhya Pradesh
        </span>
        <a href="/">Back to Home ↑</a>
      </footer>
    </div>
  );
}
