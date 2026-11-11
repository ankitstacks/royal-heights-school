
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock3,
  MessageCircle,
  CheckCircle2,
  GraduationCap,
  FileText,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import "./Admissions.css";

const classOptions = [
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const initialForm = {
  parentName: "",
  phone: "",
  email: "",
  className: "",
  topic: "Admission Process",
  message: "",
};

export default function AdmissionEnquiry() {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    if (submitting) return;

    setSubmitting(true);

    try {
      const apiUrl = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

      const response = await fetch(`${apiUrl}/admission-enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          parentName: form.parentName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          className: form.className,
          topic: form.topic,
          message: form.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success !== true) {
        throw new Error(
          data.message || "Unable to submit your enquiry. Please try again."
        );
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setForm(initialForm);
    setSubmitted(false);
    setSubmitError("");
  }

  return (
    <main className="admission-page">
      {/* HERO */}
      <section className="admission-hero">
        <img
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=2000&q=85"
          alt="Illustrative school learning environment"
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
            Admissions <ArrowRight size={14} />
            Admission Enquiry
          </a>

          <p className="admission-eyebrow">
            WE ARE HERE TO HELP
          </p>

          <h1>
            Every question deserves
            <br />
            a clear answer.
          </h1>

          <p>
            Choosing a school is an important family decision.
            Ask about class availability, admission requirements,
            fees and the next steps for your child.
          </p>

          <div className="admission-hero-actions">
            <a
              className="admission-button gold"
              href="#enquiry-form"
            >
              Send an Enquiry
              <ArrowRight size={17} />
            </a>

            <a
              className="admission-hero-text-link"
              href="/admissions/process"
            >
              Explore Admission Process
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="admission-hero-caption">
            <span className="admission-caption-line" />
            <span>YOUR QUESTIONS · OUR NEXT STEPS</span>
          </div>
        </motion.div>
      </section>

      {/* CONTACT AND ENQUIRY FORM */}
      <section
        className="admission-section admission-soft"
        id="enquiry-form"
      >
        <div className="admission-container admission-enquiry-layout">
          <motion.div
            className="admission-enquiry-info"
            initial={reduceMotion ? false : { opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
          >
            <p className="admission-eyebrow">
              LET'S CONNECT
            </p>

            <h2>
              How can we help your family?
            </h2>

            <p className="admission-muted">
              Get in touch with Royal Heights to confirm the
              latest admission information. You can also contact
              the school directly using the details below.
            </p>

            <a
              className="admission-contact-card"
              href="tel:+918720024123"
            >
              <span>
                <Phone size={21} />
              </span>

              <div>
                <small>CALL THE SCHOOL</small>
                <strong>+91 87200 24123</strong>
                <p>Confirm availability before calling.</p>
              </div>

              <ArrowUpRight size={17} />
            </a>

            <a
              className="admission-contact-card"
              href="mailto:royalzrp@gmail.com"
            >
              <span>
                <Mail size={21} />
              </span>

              <div>
                <small>EMAIL ENQUIRIES</small>
                <strong>royalzrp@gmail.com</strong>
                <p>Send your admission-related questions.</p>
              </div>

              <ArrowUpRight size={17} />
            </a>

            <a
              className="admission-contact-card"
              href="https://www.google.com/maps/search/?api=1&query=Royal+Heights+Higher+Secondary+School%2C+Zirapur%2C+Madhya+Pradesh"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <MapPin size={21} />
              </span>

              <div>
                <small>VISIT OUR CAMPUS</small>
                <strong>Machhalpur Road, Zirapur</strong>
                <p>Rajgarh, Madhya Pradesh 465691</p>
              </div>

              <ArrowUpRight size={17} />
            </a>

            <div className="admission-contact-card">
              <span>
                <Clock3 size={21} />
              </span>

              <div>
                <small>SCHOOL HOURS</small>
                <strong>Monday–Saturday</strong>
                <p>7:15 AM – 4:30 PM; confirm before visiting.</p>
              </div>
            </div>

            <div className="admission-enquiry-note">
              <ShieldCheck size={21} />

              <p>
                <strong>Before you visit</strong>
                <br />
                Please confirm current office hours and admission
                availability directly with the school.
              </p>
            </div>
          </motion.div>

          {/* ENQUIRY FORM */}
          <motion.div
            className="admission-form-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="admission-form-panel-top">
              <div className="admission-form-title">
                <span>
                  <MessageCircle size={23} />
                </span>

                <div>
                  <p className="admission-eyebrow">
                    PARENT SUPPORT
                  </p>

                  <h3>Admission Enquiry</h3>
                </div>
              </div>

              <span className="admission-form-step-label">
                GET IN TOUCH
              </span>
            </div>

            {submitted ? (
              <motion.div
                className="admission-success"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                role="status"
              >
                <span className="admission-success-icon">
                  <CheckCircle2 size={38} />
                </span>

                <p className="admission-eyebrow">
                  ENQUIRY RECEIVED
                </p>

                <h3>Thank you! Your enquiry has been submitted.</h3>

                <p>
                  Your details have been sent to Royal Heights Higher
                  Secondary School. The school team can contact you
                  using the phone number or email you provided.
                </p>

                <div className="admission-success-summary">
                  <span>Parent / guardian</span>
                  <strong>{form.parentName}</strong>

                  <span>Class of interest</span>
                  <strong>{form.className}</strong>

                  <span>Enquiry topic</span>
                  <strong>{form.topic}</strong>
                </div>

                <button
                  type="button"
                  className="admission-button maroon"
                  onClick={resetForm}
                >
                  Send Another Enquiry
                  <ArrowRight size={17} />
                </button>
              </motion.div>
            ) : (
              <form
                className="admission-form"
                onSubmit={handleSubmit}
              >
                <div className="admission-form-section-label">
                  <GraduationCap size={17} />
                  <span>Parent Information</span>
                </div>

                <div className="admission-form-grid">
                  <label className="admission-full-width">
                    Parent / guardian full name *
                    <input
                      type="text"
                      name="parentName"
                      value={form.parentName}
                      onChange={updateField}
                      autoComplete="name"
                      required
                      maxLength={100}
                      placeholder="Enter your full name"
                    />
                  </label>

                  <label>
                    Phone number *
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={updateField}
                      required
                      pattern="[0-9+() -]{8,18}"
                      autoComplete="tel"
                      placeholder="Contact number"
                    />
                  </label>

                  <label>
                    Email address
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateField}
                      autoComplete="email"
                      placeholder="Email (optional)"
                    />
                  </label>

                  <label>
                    Class of interest *
                    <select
                      name="className"
                      value={form.className}
                      onChange={updateField}
                      required
                    >
                      <option value="">Select a class</option>

                      {classOptions.map((className) => (
                        <option
                          key={className}
                          value={className}
                        >
                          {className}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Enquiry topic *
                    <select
                      name="topic"
                      value={form.topic}
                      onChange={updateField}
                      required
                    >
                      <option value="Admission Process">
                        Admission Process
                      </option>

                      <option value="Fee Structure">
                        Fee Structure
                      </option>

                      <option value="Documents Required">
                        Documents Required
                      </option>

                      <option value="Class Availability">
                        Class Availability
                      </option>

                      <option value="Transport">
                        Transport
                      </option>

                      <option value="Other">
                        Other Question
                      </option>
                    </select>
                  </label>

                  <label className="admission-full-width">
                    Your question *
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={updateField}
                      rows={5}
                      required
                      maxLength={1500}
                      placeholder="Tell us what you would like to know..."
                    />
                  </label>
                </div>

                {submitError && (
                  <p className="admission-form-note" role="alert" aria-live="polite">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  className="admission-button maroon admission-submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting…" : "Submit Enquiry"}
                  {!submitting && <ArrowRight size={17} />}
                </button>

                <p className="admission-form-note">
                  Your information will be securely submitted to the school
                  for admission enquiry follow-up.
                </p>
              </form>
            )}
          </motion.div>
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

              <h2>Find the information you need.</h2>
            </div>

            <a href="/#home">
              Back to Home <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="admission-related-grid">
            <a
              className="admission-related-card"
              href="/admissions/process"
            >
              <FileText size={24} />

              <span>
                <strong>Admission Process</strong>
                <small>Steps, eligibility and documents.</small>
              </span>

              <ArrowUpRight size={19} />
            </a>

            <a
              className="admission-related-card"
              href="/admissions/fees"
            >
              <Wallet size={24} />

              <span>
                <strong>Fees Structure</strong>
                <small>Class-wise fee information.</small>
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
          </div>
        </div>
      </section>

      {/* FOOTER */}
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

          <a href="/admissions/process">
            Admission Information ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
