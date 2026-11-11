
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  UserRound,
  CalendarDays,
  Phone,
  Mail,
} from "lucide-react";

import "./Admissions.css";

// ==========================================
// BACKEND API CONFIGURATION
// ==========================================

const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

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
  studentName: "",
  dob: "",
  className: "",
  parentName: "",
  phone: "",
  email: "",
  previousSchool: "",
  message: "",
};

export default function OnlineApplication() {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================

  function updateField(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  // ==========================================
  // SUBMIT ONLINE APPLICATION
  // ==========================================

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/online-applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      // Read response safely, even if the server returns empty text.
      const responseText = await response.text();

      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            `Invalid server response. HTTP ${response.status}. Please check the backend API.`
          );
        }
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            data.error ||
            `Unable to submit application. HTTP ${response.status}.`
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Online application submission error:", err);

      setError(
        err.message ||
          "Unable to submit your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ==========================================
  // RESET FORM
  // ==========================================

  function resetForm() {
    setForm({ ...initialForm });
    setSubmitted(false);
    setError("");
    setSubmitting(false);
  }

  return (
    <main className="admission-page">

      {/* ======================================
          HERO SECTION
      ====================================== */}

      <section className="admission-hero">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2000&q=85"
          alt="Illustrative school education scene"
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
            Online Application
          </a>

          <p className="admission-eyebrow">
            START YOUR APPLICATION
          </p>

          <h1>
            A new chapter begins
            <br />
            with one small step.
          </h1>

          <p>
            Tell us about your child and the class you are interested in.
            Submit your details to begin the admission enquiry process
            at Royal Heights.
          </p>

          <div className="admission-hero-actions">
            <a
              className="admission-button gold"
              href="#application-form"
            >
              Begin Application
              <ArrowRight size={17} />
            </a>

            <a
              className="admission-hero-text-link"
              href="/admissions/process"
            >
              View Admission Steps
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="admission-hero-caption">
            <span className="admission-caption-line" />
            <span>
              STUDENT DETAILS · PARENT INFORMATION
            </span>
          </div>
        </motion.div>
      </section>

      {/* ======================================
          APPLICATION FORM SECTION
      ====================================== */}

      <section
        className="admission-section admission-soft"
        id="application-form"
      >
        <div className="admission-container admission-application-layout">

          {/* LEFT INFORMATION */}

          <motion.aside
            className="admission-application-intro"
            initial={reduceMotion ? false : { opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="admission-eyebrow">
              YOUR CHILD'S NEXT CHAPTER
            </p>

            <h2>
              Every great journey starts with a first step.
            </h2>

            <p className="admission-muted">
              Complete the information below to submit an online
              application enquiry. Our school team can review the
              details and guide you through the next steps.
            </p>

            <div className="admission-benefit">
              <CheckCircle2 size={19} />
              Student and parent information
            </div>

            <div className="admission-benefit">
              <CheckCircle2 size={19} />
              Preferred class selection
            </div>

            <div className="admission-benefit">
              <CheckCircle2 size={19} />
              Previous-school details
            </div>

            <div className="admission-benefit">
              <CheckCircle2 size={19} />
              Secure submission to the school
            </div>

            <div className="admission-privacy-note">
              <ShieldCheck size={23} />

              <p>
                <strong>Privacy matters.</strong>
                <br />
                Your submitted information will be stored by the
                school for admission enquiry follow-up. Do not enter
                sensitive identity or financial details.
              </p>
            </div>

            <div className="admission-application-contact">
              <span>
                <Phone size={18} />
              </span>

              <div>
                <small>NEED HELP?</small>
                <a href="tel:+918720024123">
                  +91 87200 24123
                </a>
              </div>
            </div>
          </motion.aside>

          {/* APPLICATION FORM PANEL */}

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
                  <GraduationCap size={24} />
                </span>

                <div>
                  <p className="admission-eyebrow">
                    ROYAL HEIGHTS · ZIRAPUR
                  </p>

                  <h3>Student Application</h3>
                </div>
              </div>

              <span className="admission-form-step-label">
                BASIC DETAILS
              </span>
            </div>

            {/* SUCCESS SCREEN */}

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
                  APPLICATION SUBMITTED
                </p>

                <h3>
                  Thank you for choosing Royal Heights!
                </h3>

                <p>
                  Your application details have been successfully
                  submitted. The school administration can now review
                  your information and contact you regarding the next
                  admission steps.
                </p>

                <div className="admission-success-summary">
                  <span>Student</span>
                  <strong>{form.studentName}</strong>

                  <span>Class applying for</span>
                  <strong>{form.className}</strong>

                  <span>Parent / guardian</span>
                  <strong>{form.parentName}</strong>

                  <span>Contact number</span>
                  <strong>{form.phone}</strong>
                </div>

                <button
                  type="button"
                  className="admission-button maroon"
                  onClick={resetForm}
                >
                  Submit Another Application
                  <ArrowRight size={17} />
                </button>

                <a
                  className="admission-success-link"
                  href="/#home"
                >
                  Back to Home
                  <ArrowUpRight size={15} />
                </a>
              </motion.div>
            ) : (

              /* APPLICATION FORM */

              <form
                className="admission-form"
                onSubmit={handleSubmit}
              >

                {/* STUDENT INFORMATION */}

                <div className="admission-form-section-label">
                  <UserRound size={17} />
                  <span>Student Information</span>
                </div>

                <div className="admission-form-grid">
                  <label className="admission-full-width">
                    Student's full name *

                    <input
                      type="text"
                      name="studentName"
                      value={form.studentName}
                      onChange={updateField}
                      autoComplete="off"
                      required
                      maxLength={100}
                      placeholder="Enter student's full name"
                    />
                  </label>

                  <label>
                    Date of birth *

                    <span className="admission-input-icon">
                      <CalendarDays size={16} />

                      <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={updateField}
                        max={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </span>
                  </label>

                  <label>
                    Class applying for *

                    <select
                      name="className"
                      value={form.className}
                      onChange={updateField}
                      required
                    >
                      <option value="">
                        Select a class
                      </option>

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
                </div>

                {/* PARENT INFORMATION */}

                <div className="admission-form-section-label">
                  <UserRound size={17} />
                  <span>Parent / Guardian Information</span>
                </div>

                <div className="admission-form-grid">
                  <label className="admission-full-width">
                    Parent / guardian full name *

                    <input
                      type="text"
                      name="parentName"
                      value={form.parentName}
                      onChange={updateField}
                      autoComplete="off"
                      required
                      maxLength={100}
                      placeholder="Enter parent or guardian name"
                    />
                  </label>

                  <label>
                    Contact number *

                    <span className="admission-input-icon">
                      <Phone size={16} />

                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={updateField}
                        required
                        pattern="[0-9+() -]{8,18}"
                        maxLength={18}
                        autoComplete="tel"
                        placeholder="Phone number"
                      />
                    </span>
                  </label>

                  <label>
                    Email address

                    <span className="admission-input-icon">
                      <Mail size={16} />

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={updateField}
                        autoComplete="email"
                        maxLength={150}
                        placeholder="Email (optional)"
                      />
                    </span>
                  </label>
                </div>

                {/* ADDITIONAL INFORMATION */}

                <div className="admission-form-section-label">
                  <FileText size={17} />
                  <span>Additional Information</span>
                </div>

                <div className="admission-form-grid">
                  <label className="admission-full-width">
                    Previous school, if applicable

                    <input
                      type="text"
                      name="previousSchool"
                      value={form.previousSchool}
                      onChange={updateField}
                      maxLength={150}
                      placeholder="Name of previous school"
                    />
                  </label>

                  <label className="admission-full-width">
                    Additional information

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={updateField}
                      rows={4}
                      maxLength={1000}
                      placeholder="Anything else you would like the school to know"
                    />
                  </label>
                </div>

                {/* ERROR MESSAGE */}

                {error && (
                  <div className="admin-error" role="alert">
                    {error}
                  </div>
                )}

                {/* SUBMIT BUTTON */}

                <button
                  type="submit"
                  className="admission-button maroon admission-submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Submitting Application..."
                    : "Submit Application"}

                  {!submitting && <ArrowRight size={17} />}
                </button>

                <p className="admission-form-note">
                  By submitting this form, you are sharing these
                  details with Royal Heights for admission enquiry
                  follow-up. Submission does not guarantee admission.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ======================================
          WHAT HAPPENS NEXT
      ====================================== */}

      <section className="admission-section">
        <div className="admission-container">
          <div className="admission-section-heading">
            <p className="admission-eyebrow">
              WHAT HAPPENS NEXT?
            </p>

            <h2>
              Three things to do after submitting your details.
            </h2>

            <p>
              The school team can review your information and guide
              you through the official admission procedure.
            </p>
          </div>

          <div className="admission-steps-grid">
            <article className="admission-step-card">
              <div className="admission-step-top">
                <span>01</span>
                <FileText size={22} />
              </div>

              <h3>Application received</h3>

              <p>
                Your submitted details are stored for review by the
                school administration.
              </p>
            </article>

            <article className="admission-step-card">
              <div className="admission-step-top">
                <span>02</span>
                <Phone size={22} />
              </div>

              <h3>School follow-up</h3>

              <p>
                The school team can contact you to discuss class
                availability and admission details.
              </p>
            </article>

            <article className="admission-step-card">
              <div className="admission-step-top">
                <span>03</span>
                <ShieldCheck size={22} />
              </div>

              <h3>Complete admission process</h3>

              <p>
                Follow the official school instructions for documents
                and further admission steps.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ======================================
          RELATED PAGES
      ====================================== */}

      <section className="admission-related-section">
        <div className="admission-container">
          <div className="admission-related-heading">
            <div>
              <p className="admission-eyebrow">
                CONTINUE EXPLORING
              </p>

              <h2>Need more information?</h2>
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
                <small>
                  Explore the steps and documents.
                </small>
              </span>

              <ArrowUpRight size={19} />
            </a>

            <a
              className="admission-related-card"
              href="/admissions/fees"
            >
              <GraduationCap size={24} />

              <span>
                <strong>Fees Structure</strong>
                <small>
                  Review the class-wise fee overview.
                </small>
              </span>

              <ArrowUpRight size={19} />
            </a>

            <a
              className="admission-related-card"
              href="/admissions/enquiry"
            >
              <Mail size={24} />

              <span>
                <strong>Admission Enquiry</strong>
                <small>
                  Ask the school a question.
                </small>
              </span>

              <ArrowUpRight size={19} />
            </a>
          </div>
        </div>
      </section>

      {/* ======================================
          FOOTER
      ====================================== */}

      <footer className="admission-page-footer">
        <div className="admission-container">
          <a
            href="/#home"
            className="admission-footer-brand"
          >
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

          <a href="/admissions/enquiry">
            Contact Admissions ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
