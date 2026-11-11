
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  Phone,
  FileText,
  ShieldCheck,
  Check,
  GraduationCap,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import "./Admissions.css";

const steps = [
  {
    number: "01",
    title: "Make an Enquiry",
    description:
      "Contact Royal Heights to ask about class availability, admission dates, eligibility and the latest approved fee structure.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Check Eligibility",
    description:
      "Confirm the age criteria for early years and the requirements for the class your child wishes to join.",
    icon: GraduationCap,
  },
  {
    number: "03",
    title: "Prepare Documents",
    description:
      "Prepare the documents requested by the school. Requirements may differ according to class and student circumstances.",
    icon: ClipboardList,
  },
  {
    number: "04",
    title: "Complete the Application",
    description:
      "Fill in the required student and parent details accurately and follow the school's official application procedure.",
    icon: FileText,
  },
  {
    number: "05",
    title: "Verification & Review",
    description:
      "Follow the school's instructions for document verification, meetings or assessments, if applicable.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "Confirm Admission",
    description:
      "After confirmation from the school, complete the required formalities and follow the instructions for joining.",
    icon: Check,
  },
];

const documents = [
  "Student date-of-birth proof",
  "Parent or guardian contact details",
  "Previous-school records, if applicable",
  "Transfer certificate, if applicable",
  "Student photographs, if requested",
  "Other documents requested by the school",
];

export default function AdmissionProcess() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="admission-page">
      {/* HERO SECTION */}
      <section className="admission-hero">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=85"
          alt="Illustrative school campus"
        />

        <div className="admission-hero-shade" />

        <motion.div
          className="admission-hero-content"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7 }}
        >
          <a className="admission-breadcrumb" href="/#home">
            Home <ArrowRight size={14} />
            Admissions
            <ArrowRight size={14} />
            Admission Process
          </a>

          <p className="admission-eyebrow">
            YOUR ADMISSION JOURNEY
          </p>

          <h1>
            A clear path to
            <br />
            a brighter beginning.
          </h1>

          <p>
            Every great educational journey starts with the right
            information. Explore the admission steps, prepare your
            documents and connect with Royal Heights for guidance.
          </p>

          <div className="admission-hero-actions">
            <a
              className="admission-button gold"
              href="/admissions/enquiry"
            >
              Ask an Admission Question
              <ArrowUpRight size={17} />
            </a>

            <a
              className="admission-hero-text-link"
              href="/admissions/fees"
            >
              Explore Fee Structure
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="admission-hero-caption">
            <span className="admission-caption-line" />
            <span>ROYAL HEIGHTS · ZIRAPUR</span>
          </div>
        </motion.div>
      </section>

      {/* PROCESS OVERVIEW */}
      <section className="admission-section">
        <div className="admission-container">
          <motion.div
            className="admission-section-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="admission-eyebrow">
              YOUR NEXT CHAPTER STARTS HERE
            </p>

            <h2>
              Your admission journey,
              <br />
              made simpler.
            </h2>

            <p>
              Use these general steps to understand the journey.
              Confirm the official process, eligibility and dates
              directly with the school.
            </p>
          </motion.div>

          <div className="admission-steps-grid">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  className="admission-step-card"
                  key={step.number}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 25 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion ? 0 : index * 0.07,
                  }}
                  whileHover={
                    reduceMotion ? {} : { y: -5 }
                  }
                >
                  <div className="admission-step-top">
                    <span>{step.number}</span>
                    <span className="admission-step-icon">
                      <Icon size={23} />
                    </span>
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>

                  <div className="admission-step-bottom">
                    <span>ADMISSION GUIDE</span>
                    <ArrowUpRight size={16} />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOCUMENT CHECKLIST */}
      <section className="admission-section admission-soft">
        <div className="admission-container admission-doc-grid">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <p className="admission-eyebrow">
              PREPARE IN ADVANCE
            </p>

            <h2>
              Keep the important documents ready.
            </h2>

            <p className="admission-muted">
              The following is a general preparation checklist,
              not a confirmed list of Royal Heights requirements.
              Ask the school which documents are required for
              your child's class.
            </p>

            <a
              className="admission-button maroon"
              href="/admissions/enquiry"
            >
              Confirm Requirements
              <ArrowRight size={17} />
            </a>

            <div className="admission-document-tip">
              <ShieldCheck size={22} />
              <p>
                Always confirm document requirements with the
                school before submitting original documents.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="admission-document-list"
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <div className="admission-document-list-heading">
              <span className="admission-document-heading-icon">
                <ClipboardList size={22} />
              </span>

              <div>
                <p className="admission-eyebrow">
                  YOUR CHECKLIST
                </p>
                <h3>Documents to confirm</h3>
              </div>
            </div>

            {documents.map((document, index) => (
              <motion.div
                className="admission-document-row"
                key={document}
                initial={
                  reduceMotion ? false : { opacity: 0, x: 12 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  delay: reduceMotion ? 0 : index * 0.05,
                }}
              >
                <span className="admission-document-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{document}</p>

                <Check size={17} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HELP SECTION */}
      <section className="admission-help-section">
        <div className="admission-container admission-help-inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="admission-eyebrow">
              NEED A LITTLE GUIDANCE?
            </p>

            <h2>
              One conversation can make
              <br />
              the next step clearer.
            </h2>

            <p>
              Ask the school about admission requirements,
              current class availability and the next steps
              for your family.
            </p>
          </motion.div>

          <div className="admission-help-actions">
            <a
              className="admission-button gold"
              href="/admissions/enquiry"
            >
              Enquire Now
              <ArrowRight size={17} />
            </a>

            <a
              className="admission-help-phone"
              href="tel:+918720024123"
            >
              <Phone size={18} />
              <span>
                <small>CALL THE SCHOOL</small>
                <strong>+91 87200 24123</strong>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* OTHER ADMISSION PAGES */}
      <section className="admission-related-section">
        <div className="admission-container">
          <div className="admission-related-heading">
            <div>
              <p className="admission-eyebrow">
                CONTINUE EXPLORING
              </p>
              <h2>More admission information.</h2>
            </div>

            <a href="/#home">
              Back to Home <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="admission-related-grid">
            <a
              className="admission-related-card"
              href="/admissions/fees"
            >
              <WalletIcon />
              <span>
                <strong>Fees Structure</strong>
                <small>Review fee components by class.</small>
              </span>
              <ArrowUpRight size={19} />
            </a>

            <a
              className="admission-related-card"
              href="/admissions/apply"
            >
              <FileText size={24} />
              <span>
                <strong>Online Application</strong>
                <small>Prepare the student's details.</small>
              </span>
              <ArrowUpRight size={19} />
            </a>

            <a
              className="admission-related-card"
              href="/admissions/enquiry"
            >
              <MessageCircle size={24} />
              <span>
                <strong>Admission Enquiry</strong>
                <small>Ask a question about admission.</small>
              </span>
              <ArrowUpRight size={19} />
            </a>
          </div>
        </div>
      </section>

      <footer className="admission-page-footer">
        <div className="admission-container">
          <a href="/#home" className="admission-footer-brand">
            <img
              src="/images/logo.jpeg"
              alt="Royal Heights logo"
            />
            <span>
              <strong>ROYAL HEIGHTS</strong>
              <small>HIGHER SECONDARY SCHOOL</small>
            </span>
          </a>

          <p>
            Machhalpur Road, Zirapur, Madhya Pradesh 465691
          </p>

          <a href="/#home">Return to Main Website ↑</a>
        </div>
      </footer>
    </main>
  );
}

function WalletIcon() {
  return <ClipboardList size={24} />;
}
