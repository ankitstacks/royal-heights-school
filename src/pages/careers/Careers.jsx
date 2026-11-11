
import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  ArrowRight,
  Upload,
} from "lucide-react";

import { api } from "../../lib/api";
import "./Careers.css";

export default function Careers() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Load published vacancies
  useEffect(() => {
    let active = true;

    api("/vacancies/public")
      .then((data) => {
        if (active) {
          setVacancies(data.vacancies || []);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "Unable to load vacancies.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  // Submit job application
  async function submitApplication(event) {
    event.preventDefault();

    if (!selected || submitting) return;

    // Store the form before awaiting the API request
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    formData.set("vacancy_id", String(selected.id));

    setMessage("");
    setSubmitting(true);

    try {
      const result = await api("/applications", {
        method: "POST",
        body: formData,
      });

      setMessage(
        `${result.message || "Application submitted successfully!"} Reference number: ${result.applicationId}.`
      );

      // Reset using the saved form reference
      formElement.reset();

    } catch (err) {
      setMessage(err.message || "Application submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="careers-page">

      {/* Hero Section */}
      <header className="careers-hero">
        <p>CAREERS AT ROYAL HEIGHTS</p>

        <h1>
          Inspire young minds.
          <br />
          <em>Build your future.</em>
        </h1>

        <p>
          Explore opportunities to contribute to the learning and growth
          of students at Royal Heights Higher Secondary School, Zirapur.
        </p>

        <a href="#open-positions" className="careers-hero-button">
          Explore Opportunities
          <ArrowRight size={17} />
        </a>
      </header>

      {/* Vacancies Section */}
      <section className="careers-content" id="open-positions">

        <p className="careers-kicker">JOIN OUR TEAM</p>

        <h2>Current Opportunities</h2>

        <p className="careers-subtitle">
          Review each role's eligibility and submit your application online.
        </p>

        {loading && (
          <p>Loading current vacancies...</p>
        )}

        {error && (
          <p className="careers-message" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && vacancies.length === 0 && (
          <div className="careers-empty">
            <BriefcaseBusiness size={32} />

            <h3>No current vacancies</h3>

            <p>
              There are no published vacancies at the moment.
              Please check again later.
            </p>
          </div>
        )}

        <div className="careers-grid">

          {vacancies.map((job) => (
            <article className="careers-job-card" key={job.id}>

              <span className="careers-job-type">
                {job.employment_type}
              </span>

              <h3>{job.title}</h3>

              <p className="careers-department">
                {job.department}
              </p>

              <div className="careers-job-detail">
                <MapPin size={16} />
                {job.location}
              </div>

              {job.last_date && (
                <div className="careers-job-detail">
                  <CalendarDays size={16} />

                  Last date:{" "}
                  {new Date(
                    `${String(job.last_date).slice(0, 10)}T00:00:00`
                  ).toLocaleDateString("en-IN")}
                </div>
              )}

              <p className="careers-job-description">
                {job.description}
              </p>

              <div className="careers-eligibility">
                <strong>Eligibility</strong>
                <p>{job.qualifications}</p>
              </div>

              {job.experience && (
                <p>
                  <strong>Experience:</strong> {job.experience}
                </p>
              )}

              {job.salary_range && (
                <p>
                  <strong>Salary:</strong> {job.salary_range}
                </p>
              )}

              <button
                type="button"
                className="careers-apply-button"
                onClick={() => {
                  setSelected(job);
                  setMessage("");

                  setTimeout(() => {
                    document
                      .getElementById("application-form")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }, 100);
                }}
              >
                Apply for this role
                <ArrowRight size={16} />
              </button>

            </article>
          ))}

        </div>
      </section>

      {/* Application Form */}
      {selected && (
        <section
          className="careers-application-section"
          id="application-form"
        >

          <div className="careers-form-heading">

            <p className="careers-kicker">
              APPLICATION FORM
            </p>

            <h2>Apply for {selected.title}</h2>

            <p>
              Complete the details below and attach your resume
              (PDF or DOCX, maximum 5 MB).
            </p>

          </div>

          <form
            className="careers-form"
            onSubmit={submitApplication}
          >

            <input
              name="full_name"
              type="text"
              placeholder="Full name *"
              required
              maxLength={160}
            />

            <input
              name="email"
              type="email"
              placeholder="Email address *"
              required
              maxLength={255}
            />

            <input
              name="phone"
              type="tel"
              placeholder="Phone number *"
              required
              maxLength={25}
            />

            <input
              name="qualification"
              type="text"
              placeholder="Highest qualification *"
              required
              maxLength={180}
            />

            <label>
              Experience in years *

              <input
                name="experience_years"
                type="number"
                min="0"
                max="60"
                step="0.5"
                defaultValue="0"
                required
              />
            </label>

            <label className="careers-file-input">

              <Upload size={18} />

              Upload resume (PDF/DOCX) *

              <input
                name="resume"
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                required
              />

            </label>

            <textarea
              name="cover_letter"
              placeholder="Brief cover letter (optional)"
              rows={4}
              maxLength={3000}
            />

            <p className="careers-privacy-note">
              Your information and resume will be used by authorised
              school staff to review your application. Avoid uploading
              unrelated personal documents.
            </p>

            {message && (
              <p
                className="careers-message"
                role="status"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit Application"}
            </button>

            <button
              type="button"
              className="careers-cancel"
              disabled={submitting}
              onClick={() => {
                setSelected(null);
                setMessage("");
              }}
            >
              Cancel
            </button>

          </form>
        </section>
      )}

    </main>
  );
}
