
import { useState } from "react";
import {
  Award,
  BookOpen,
  GraduationCap,
  Star,
  Trophy,
} from "lucide-react";

import { AchievementLayout } from "./AchievementLayout";
import "./Achievements.css";

const toppers = [
  // CLASS 12 STUDENTS
  {
    id: 1,
    name: "Khushi Patidar",
    className: "Class 12",
    rank: "State Topper",
    percentage: "97.8%",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793791792/KHUSHU_PATIDAR_12TH.png",
    strength: "Outstanding Academic Performance",
    story:
      "An excellent academic achievement reflecting dedication, consistent preparation and hard work.",
  },
  {
    id: 2,
    name: "Varsha Carpenter",
    className: "Class 12",
    rank: "State Topper",
    percentage: "96.8%",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793792032/VARSHA_CARPENTER_12TH.png",
    strength: "Academic Excellence",
    story:
      "A remarkable result achieved through commitment, discipline and continuous effort.",
  },
  {
    id: 3,
    name: "Amisha Patidar",
    className: "Class 12",
    rank: "District Topper",
    percentage: "95%",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793791776/AMISHA_PATIDAR_12TH.png",
    strength: "Excellent Board Result",
    story:
      "Recognised for her impressive academic performance and dedication to learning.",
  },
  {
    id: 4,
    name: "Rajveer Singh Umath",
    className: "Class 12",
    rank: "District Topper",
    percentage: "94.4%",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793791811/RAJVEER_SINGH_UMATH_12TH.png",
    strength: "Consistent Academic Performance",
    story:
      "A commendable board examination result reflecting sincere effort and perseverance.",
  },

  // CLASS 10 STUDENTS
  {
    id: 5,
    name: "Krishnapal Dangi",
    className: "Class 10",
    rank: "State Topper",
    percentage: "98.4%",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793791972/KRISHNPAL_DANGI_10TH.png",
    strength: "Outstanding Academic Performance",
    story:
      "An exceptional result that reflects dedication, discipline and a strong commitment to studies.",
  },
  {
    id: 6,
    name: "Ridhima Gupta",
    className: "Class 10",
    rank: "State Topper",
    percentage: "98%",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793791983/RIDDHIMA_GUPTA_10TH.png",
    strength: "Academic Excellence",
    story:
      "A wonderful achievement earned through consistent preparation and determination.",
  },
  {
    id: 7,
    name: "Rudrakshi Gupta",
    className: "Class 10",
    rank: "District Topper",
    percentage: "97.6%",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793792075/RUDRAKSHI_GUPTA_10TH-9mb.jpg",
    strength: "Excellent Board Result",
    story:
      "Celebrating a remarkable academic result and dedication towards learning.",
  },
];

export default function AcademicToppers() {
  const [classFilter, setClassFilter] = useState("All");

  const filteredToppers =
    classFilter === "All"
      ? toppers
      : toppers.filter(
          (student) => student.className === classFilter
        );

  return (
    <AchievementLayout
      eyebrow="ACADEMIC ACHIEVERS"
      title="Academic Toppers"
      description="Celebrating the outstanding achievements of our Class 10th and Class 12th students in the MP Board Examination 2026."
    >
      {/* TOPPER INTRO BANNER */}
      <div className="toppers-banner">
        <div className="toppers-banner-icon">
          <Trophy size={35} />
        </div>

        <div>
          <p className="achievement-kicker">
            THE PURSUIT OF EXCELLENCE
          </p>

          <h2>Hard work deserves its moment.</h2>

          <p>
            Celebrating our students who have made Royal Heights
            Higher Secondary School proud with their exceptional
            academic achievements.
          </p>
        </div>
      </div>

      {/* TOPPER STATISTICS */}
      <div className="achievement-stats-grid">
        <article className="achievement-stat-card">
          <span>
            <GraduationCap size={23} />
          </span>
          <small>BOARD CLASSES</small>
          <strong>Class 10 & 12</strong>
          <p>MP Board Examination 2026</p>
        </article>

        <article className="achievement-stat-card">
          <span>
            <Award size={23} />
          </span>
          <small>FEATURED ACHIEVERS</small>
          <strong>7 Students</strong>
          <p>Outstanding student performances</p>
        </article>

        <article className="achievement-stat-card">
          <span>
            <TrendingIcon />
          </span>
          <small>HIGHEST PERCENTAGE</small>
          <strong>98.4%</strong>
          <p>Krishnapal Dangi - Class 10</p>
        </article>
      </div>

      {/* FILTER HEADING */}
      <div className="board-results-heading">
        <div>
          <p className="achievement-kicker">
            FEATURED STUDENTS
          </p>

          <h2>Meet our achievers.</h2>

          <p>
            Celebrating dedication, determination and academic success.
          </p>
        </div>

        <div className="board-result-filters">
          {["All", "Class 10", "Class 12"].map((item) => (
            <button
              type="button"
              key={item}
              className={classFilter === item ? "active" : ""}
              onClick={() => setClassFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* TOPPER CARDS */}
      <div className="academic-topper-grid">
        {filteredToppers.map((student) => (
          <article
            className="academic-topper-card"
            key={student.id}
          >
            {/* STUDENT PHOTO */}
            <div className="academic-topper-photo">
              <img
                src={student.image}
                alt={`${student.name} - ${student.className}`}
                loading="lazy"
              />

              <span className="academic-topper-class">
                {student.className}
              </span>

              <span className="academic-topper-number">
                {String(student.id).padStart(2, "0")}
              </span>
            </div>

            {/* STUDENT DETAILS */}
            <div className="academic-topper-body">
              <p className="achievement-kicker">
                {student.rank}
              </p>

              <h3>{student.name}</h3>

              {/* PERCENTAGE */}
              <div className="academic-topper-score">
                <Star size={19} fill="currentColor" />
                <strong>{student.percentage}</strong>
              </div>

              {/* ACHIEVEMENT */}
              <div className="academic-topper-strength">
                <BookOpen size={17} />
                <span>{student.strength}</span>
              </div>

              <p className="academic-topper-story">
                {student.story}
              </p>

              {/* FOOTER */}
              <div className="academic-topper-footer">
                <span>MP Board Examination 2026</span>
                <Award size={19} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* BOTTOM MESSAGE */}
      <div className="topper-guidance-grid">
        <article>
          <GraduationCap size={25} />
          <h3>Academic dedication</h3>
          <p>
            Every achievement reflects the hard work, discipline
            and commitment of our students.
          </p>
        </article>

        <article>
          <Award size={25} />
          <h3>Celebrating excellence</h3>
          <p>
            We congratulate our achievers, their parents and
            teachers for their valuable contribution.
          </p>
        </article>
      </div>
    </AchievementLayout>
  );
}

function TrendingIcon() {
  return <Star size={23} />;
}
