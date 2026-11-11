import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Wallet,
  BookOpen,
  CalendarDays,
  Bus,
  ClipboardList,
  ShieldCheck,
  GraduationCap,
  FileText,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

import "./Admissions.css";

const oldStudentFees = [
  { className: "Nursery", first: 5900, second: 5600, third: 4200, total: 15700 },
  { className: "LKG", first: 6050, second: 5800, third: 4350, total: 16200 },
  { className: "UKG", first: 6200, second: 6000, third: 4500, total: 16700 },
  { className: "Class 1", first: 6450, second: 6200, third: 4650, total: 17300 },
  { className: "Class 2", first: 6600, second: 6400, third: 4800, total: 17800 },
  { className: "Class 3", first: 6750, second: 6600, third: 4950, total: 18300 },
  { className: "Class 4", first: 6900, second: 6800, third: 5100, total: 18800 },
  { className: "Class 5", first: 7050, second: 7000, third: 5250, total: 19300 },
  { className: "Class 6", first: 7400, second: 7200, third: 5400, total: 20000 },
  { className: "Class 7", first: 7550, second: 7400, third: 5550, total: 20500 },
  { className: "Class 8", first: 7850, second: 7800, third: 5850, total: 21500 },
  { className: "Class 9", first: 9000, second: 8400, third: 6300, total: 23700 },
  { className: "Class 10", first: 9300, second: 8800, third: 6600, total: 24700 },
  { className: "Class 11 Science", first: 12200, second: 11200, third: 8400, total: 31800 },
  { className: "Class 11 Commerce", first: 11700, second: 11200, third: 8400, total: 31300 },
  { className: "Class 12 Science", first: 12500, second: 11600, third: 8700, total: 32800 },
  { className: "Class 12 Commerce", first: 12000, second: 11600, third: 8700, total: 32300 },
  { className: "T.C. Fee", first: null, second: null, third: null, total: 100 },
];

const newStudentFees = [
  { className: "Nursery", first: 7400, second: 5600, third: 4200, total: 17200 },
  { className: "LKG", first: 7550, second: 5800, third: 4350, total: 17700 },
  { className: "UKG", first: 7700, second: 6000, third: 4500, total: 18200 },
  { className: "Class 1", first: 8050, second: 6200, third: 4650, total: 18900 },
  { className: "Class 2", first: 8200, second: 6400, third: 4800, total: 19400 },
  { className: "Class 3", first: 8350, second: 6600, third: 4950, total: 19900 },
  { className: "Class 4", first: 8500, second: 6800, third: 5100, total: 20400 },
  { className: "Class 5", first: 8650, second: 7000, third: 5250, total: 20900 },
  { className: "Class 6", first: 9400, second: 7200, third: 5400, total: 22000 },
  { className: "Class 7", first: 9550, second: 7400, third: 5550, total: 22500 },
  { className: "Class 8", first: 9850, second: 7800, third: 5850, total: 23500 },
  { className: "Class 9", first: 11500, second: 8400, third: 6300, total: 26200 },
  { className: "Class 10", first: 11800, second: 8800, third: 6600, total: 27200 },
  { className: "Class 11 Science", first: 15200, second: 11200, third: 8400, total: 34800 },
  { className: "Class 11 Commerce", first: 14700, second: 11200, third: 8400, total: 34300 },
  { className: "Class 12 Science", first: 15500, second: 11600, third: 8700, total: 35800 },
  { className: "Class 12 Commerce", first: 15000, second: 11600, third: 8700, total: 35300 },
  { className: "T.C. Fee", first: null, second: null, third: null, total: 100 },
];

const feeHeads = [
  {
    icon: Wallet,
    number: "01",
    title: "Admission & First Instalment",
    description:
      "The first instalment is payable at the beginning of the academic session. New and old student amounts are different.",
  },
  {
    icon: CalendarDays,
    number: "02",
    title: "Second Instalment",
    description:
      "The second instalment is scheduled for October. Parents are requested to follow the school's payment schedule.",
  },
  {
    icon: ClipboardList,
    number: "03",
    title: "Third Instalment",
    description:
      "The third instalment is scheduled for 15 February as mentioned in the official school fee chart.",
  },
  {
    icon: Bus,
    number: "04",
    title: "Transport Charges",
    description:
      "Bus fees are charged separately if the transport facility is available and opted for by the student.",
  },
  {
    icon: BookOpen,
    number: "05",
    title: "Academic & Activity Charges",
    description:
      "Annual fees include activities, sports and games, stationery, printing, fee card and newspaper.",
  },
  {
    icon: FileText,
    number: "06",
    title: "Examination & Other Charges",
    description:
      "MPBSE registration and examination fees for Classes 9 to 12 are charged as per actuals.",
  },
];

const formatAmount = (amount) => {
  if (amount === null || amount === undefined) return "—";

  return `₹${amount.toLocaleString("en-IN")}`;
};

export default function FeesStructure() {
  const reduceMotion = useReducedMotion();

  const [studentType, setStudentType] = useState("new");

  const currentFees =
    studentType === "new" ? newStudentFees : oldStudentFees;

  return (
    <main className="admission-page">

      {/* HERO SECTION */}
      <section className="admission-hero">
        <img
          src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=2000&q=85"
          alt="School learning environment"
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
            Fees Structure
          </a>

          <p className="admission-eyebrow">
            ACADEMIC SESSION 2026–2027
          </p>

          <h1>
            A clear plan for
            <br />
            a brighter future.
          </h1>

          <p>
            Explore the official class-wise fee structure for
            new and existing students at Royal Heights Higher
            Secondary School, Zirapur.
          </p>

          <div className="admission-hero-actions">
            <a
              className="admission-button gold"
              href="#official-fees"
            >
              View Fee Structure
              <ArrowUpRight size={17} />
            </a>

            <a
              className="admission-hero-text-link"
              href="/admissions/enquiry"
            >
              Ask About Fees
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="admission-hero-caption">
            <span className="admission-caption-line" />
            <span>
              SESSION 2026–2027 · OFFICIAL SCHOOL FEE SCHEDULE
            </span>
          </div>
        </motion.div>
      </section>

      {/* OFFICIAL FEE STRUCTURE */}
      <section
        className="admission-section"
        id="official-fees"
      >
        <div className="admission-container">

          <motion.div
            className="admission-section-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <p className="admission-eyebrow">
              SESSION 2026–2027
            </p>

            <h2>
              Official fee structure.
            </h2>

            <p>
              Select your student category to view the applicable
              class-wise instalments and total annual fees.
            </p>
          </motion.div>

          {/* FEE SUMMARY */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "14px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                background: "#fffaf2",
                border: "1px solid #ead9c3",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <Wallet size={23} color="#76212e" />

              <p style={{ margin: "12px 0 5px", color: "#806b61" }}>
                Academic Session
              </p>

              <strong style={{ color: "#40191e", fontSize: "21px" }}>
                2026–2027
              </strong>
            </div>

            <div
              style={{
                background: "#fffaf2",
                border: "1px solid #ead9c3",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <GraduationCap size={23} color="#76212e" />

              <p style={{ margin: "12px 0 5px", color: "#806b61" }}>
                Classes Covered
              </p>

              <strong style={{ color: "#40191e", fontSize: "21px" }}>
                Nursery – 12
              </strong>
            </div>

            <div
              style={{
                background: "#fffaf2",
                border: "1px solid #ead9c3",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <CalendarDays size={23} color="#76212e" />

              <p style={{ margin: "12px 0 5px", color: "#806b61" }}>
                Payment Instalments
              </p>

              <strong style={{ color: "#40191e", fontSize: "21px" }}>
                3 Instalments
              </strong>
            </div>
          </div>

          {/* STUDENT CATEGORY TABS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <button
              type="button"
              onClick={() => setStudentType("new")}
              aria-pressed={studentType === "new"}
              style={{
                border: "1px solid #641e2b",
                borderRadius: "50px",
                padding: "13px 28px",
                background:
                  studentType === "new" ? "#641e2b" : "#fffaf2",
                color: studentType === "new" ? "#fff" : "#641e2b",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              New Students
            </button>

            <button
              type="button"
              onClick={() => setStudentType("old")}
              aria-pressed={studentType === "old"}
              style={{
                border: "1px solid #641e2b",
                borderRadius: "50px",
                padding: "13px 28px",
                background:
                  studentType === "old" ? "#641e2b" : "#fffaf2",
                color: studentType === "old" ? "#fff" : "#641e2b",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              Old Students
            </button>
          </div>

          {/* SELECTED CATEGORY LABEL */}
          <motion.div
            key={studentType}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div>
              <h3 style={{ color: "#40191e", margin: 0 }}>
                {studentType === "new"
                  ? "New Student Fee Chart"
                  : "Old Student Fee Chart"}
              </h3>

              <p style={{ color: "#806b61", margin: "6px 0 0" }}>
                Academic Year 2026–2027
              </p>
            </div>

            <span
              style={{
                background: "#f3e4c9",
                color: "#76212e",
                borderRadius: "30px",
                padding: "8px 15px",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              {currentFees.length - 1} Class Categories
            </span>
          </motion.div>

          {/* FEE TABLE */}
          <motion.div
            key={`table-${studentType}`}
            className="admission-table-wrap"
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              overflowX: "auto",
              borderRadius: "14px",
            }}
          >
            <table
              className="admission-fee-table"
              style={{
                minWidth: "760px",
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Class</th>
                  <th>
                    1st Instalment
                    <br />
                    <small>(Beginning of Session)</small>
                  </th>
                  <th>
                    2nd Instalment
                    <br />
                    <small>(October)</small>
                  </th>
                  <th>
                    3rd Instalment
                    <br />
                    <small>(15 February)</small>
                  </th>
                  <th>Total Fee</th>
                </tr>
              </thead>

              <tbody>
                {currentFees.map((item, index) => (
                  <motion.tr
                    key={item.className}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.2,
                      delay: reduceMotion ? 0 : index * 0.02,
                    }}
                    style={
                      item.className === "T.C. Fee"
                        ? { fontWeight: 700 }
                        : {}
                    }
                  >
                    <td>
                      <span className="admission-class-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </td>

                    <th scope="row">
                      {item.className}
                    </th>

                    <td>{formatAmount(item.first)}</td>

                    <td>{formatAmount(item.second)}</td>

                    <td>{formatAmount(item.third)}</td>

                    <td
                      style={{
                        fontWeight: 800,
                        color: "#641e2b",
                        background: "#f8edd8",
                      }}
                    >
                      {formatAmount(item.total)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <p className="admission-table-note">
            All amounts are in Indian Rupees (₹). The displayed
            instalment schedule and totals are based on the
            school's supplied 2026–2027 fee charts.
          </p>

          {/* PAYMENT SCHEDULE */}
          <div
            style={{
              marginTop: "30px",
              padding: "24px",
              background: "#fffaf2",
              border: "1px solid #ead9c3",
              borderRadius: "16px",
            }}
          >
            <h3
              style={{
                color: "#40191e",
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              Instalment payment schedule
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "16px",
              }}
            >
              {[
                {
                  number: "01",
                  title: "First Instalment",
                  date: "At the beginning of the session",
                },
                {
                  number: "02",
                  title: "Second Instalment",
                  date: "October",
                },
                {
                  number: "03",
                  title: "Third Instalment",
                  date: "15 February",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      background: "#641e2b",
                      color: "#fff",
                      minWidth: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                    }}
                  >
                    {item.number}
                  </span>

                  <div>
                    <strong style={{ color: "#40191e" }}>
                      {item.title}
                    </strong>

                    <p
                      style={{
                        color: "#806b61",
                        margin: "5px 0 0",
                        fontSize: "14px",
                      }}
                    >
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* IMPORTANT FEE NOTES */}
      <section className="admission-section admission-soft">
        <div className="admission-container">

          <motion.div
            className="admission-section-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="admission-eyebrow">
              IMPORTANT INFORMATION FOR PARENTS
            </p>

            <h2>
              Please note these additional charges.
            </h2>

            <p>
              A few important points regarding the official
              fee schedule and facilities.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              "MPBSE registration and examination fees will be charged as per actuals for students of Classes 9 to 12.",

              "Bus fees will be charged separately if the transport facility is available.",

              "Annual fees include Activity, Sports & Games, Stationery & Printing, Fee Card and Newspaper.",

              "Laboratory charges are included for Classes 9 to 12.",

              "First Aid, electricity, water and other maintenance expenses are included in the annual fee.",

              "Transfer Certificate (T.C.) fee is ₹100 as shown in the official fee chart.",
            ].map((note, index) => (
              <motion.div
                key={index}
                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: reduceMotion ? 0 : index * 0.05,
                }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  background: "#fffaf2",
                  border: "1px solid #ead9c3",
                  borderRadius: "14px",
                  padding: "20px",
                }}
              >
                <CheckCircle2
                  size={21}
                  color="#76212e"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                />

                <p
                  style={{
                    color: "#705b53",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {note}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* FEE COMPONENT CARDS */}
      <section className="admission-section">
        <div className="admission-container">

          <motion.div
            className="admission-section-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="admission-eyebrow">
              UNDERSTAND THE FEE SCHEDULE
            </p>

            <h2>
              Understand each fee component.
            </h2>

            <p>
              Important information about instalments,
              transport and academic charges.
            </p>
          </motion.div>

          <div className="admission-fee-cards">
            {feeHeads.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  className="admission-fee-card"
                  key={item.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : index * 0.06,
                  }}
                  whileHover={reduceMotion ? {} : { y: -5 }}
                >
                  <div className="admission-fee-card-top">
                    <span>{item.number}</span>

                    <span className="admission-fee-card-icon">
                      <Icon size={23} />
                    </span>
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <a
                    href="/admissions/enquiry"
                    className="admission-fee-card-link"
                  >
                    Ask about this
                    <ArrowRight size={15} />
                  </a>
                </motion.article>
              );
            })}
          </div>

        </div>
      </section>

      {/* PARENT SUPPORT */}
      <section className="admission-help-section">
        <div className="admission-container admission-help-inner">

          <div>
            <p className="admission-eyebrow">
              NEED MORE INFORMATION?
            </p>

            <h2>
              Have questions about school fees?
            </h2>

            <p>
              Contact Royal Heights for clarification about
              instalments, transport facilities and other
              admission-related information.
            </p>
          </div>

          <div className="admission-help-actions">
            <a
              className="admission-button gold"
              href="/admissions/enquiry"
            >
              Enquire About Fees
              <ArrowRight size={17} />
            </a>

            <a
              className="admission-help-phone"
              href="tel:+918720024123"
            >
              <GraduationCap size={20} />

              <span>
                <small>ROYAL HEIGHTS</small>
                <strong>+91 87200 24123</strong>
              </span>
            </a>
          </div>

        </div>
      </section>

      {/* RELATED ADMISSION PAGES */}
      <section className="admission-related-section">
        <div className="admission-container">

          <div className="admission-related-heading">
            <div>
              <p className="admission-eyebrow">
                CONTINUE EXPLORING
              </p>

              <h2>Plan your next step.</h2>
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
              <ClipboardList size={24} />

              <span>
                <strong>Admission Process</strong>
                <small>Explore steps and documents.</small>
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
                <small>Ask the school a question.</small>
              </span>

              <ArrowUpRight size={19} />
            </a>

          </div>
        </div>
      </section>

      {/* FOOTER */}
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