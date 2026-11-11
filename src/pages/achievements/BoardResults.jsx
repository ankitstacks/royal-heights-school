
import { useState } from "react";
import {
  Award,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Star,
} from "lucide-react";
import { AchievementLayout } from "./AchievementLayout";
import "./Achievements.css";

const students = [
  // CLASS 12
  {
    id: 1,
    name: "Khushi Patidar",
    className: "Class 12",
    percentage: 97.8,
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793791792/KHUSHU_PATIDAR_12TH.png",
    story: "Recognised for outstanding academic performance in the MP Board examination.",
    achievement: "State Topper",
  },
  {
    id: 2,
    name: "Varsha Carpenter",
    className: "Class 12",
    percentage: 96.8,
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793792032/VARSHA_CARPENTER_12TH.png",
    story: "Celebrating dedication, consistent preparation and excellent academic results.",
    achievement: "State Topper",
  },
  {
    id: 3,
    name: "Amisha Patidar",
    className: "Class 12",
    percentage: 95,
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793791776/AMISHA_PATIDAR_12TH.png",
    story: "Recognised for her hard work and excellent performance in the board examination.",
    achievement: "District Topper",
  },
  {
    id: 4,
    name: "Rajveer Singh Umath",
    className: "Class 12",
    percentage: 94.4,
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793791811/RAJVEER_SINGH_UMATH_12TH.png",
    story: "Celebrating a strong academic performance and commitment to learning.",
    achievement: "District Topper",
  },

  // CLASS 10
  {
    id: 5,
    name: "Krishnapal Dangi",
    className: "Class 10",
    percentage: 98.4,
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793791972/KRISHNPAL_DANGI_10TH.png",
    story: "Achieved an excellent result through dedication and consistent effort.",
    achievement: "State Topper",
  },
  {
    id: 6,
    name: "Ridhima Gupta",
    className: "Class 10",
    percentage: 98,
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793791983/RIDDHIMA_GUPTA_10TH.png",
    story: "Recognised for outstanding academic performance and commitment to excellence.",
    achievement: "State Topper",
  },
  {
    id: 7,
    name: "Rudrakshi Gupta",
    className: "Class 10",
    percentage: 97.6,
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793792075/RUDRAKSHI_GUPTA_10TH-9mb.jpg",
    story: "Celebrating a remarkable result and dedication to academic success.",
    achievement: "District Topper",
  },
];

export default function BoardResults() {
  const [selectedClass, setSelectedClass] = useState("All");

  const filteredStudents =
    selectedClass === "All"
      ? students
      : students.filter(
          (student) => student.className === selectedClass
        );

  return (
    <AchievementLayout
      eyebrow="ACADEMIC EXCELLENCE"
      title="Board Results"
      description="Celebrating the outstanding achievements of our Class 10th and Class 12th students in the MP Board Examination 2026."
    >
      {/* Result statistics */}
      <div className="achievement-stats-grid">
        <article className="achievement-stat-card">
          <span>
            <GraduationCap size={23} />
          </span>
          <small>RESULT CATEGORIES</small>
          <strong>Class 10 & 12</strong>
          <p>MP Board Examination 2026</p>
        </article>

        <article className="achievement-stat-card">
          <span>
            <Award size={23} />
          </span>
          <small>FEATURED STUDENTS</small>
          <strong>7 Students</strong>
          <p>Outstanding academic achievers</p>
        </article>

        <article className="achievement-stat-card">
          <span>
            <TrendingUp size={23} />
          </span>
          <small>HIGHEST PERCENTAGE</small>
          <strong>98.4%</strong>
          <p>Class 10 - Krishnapal Dangi</p>
        </article>
      </div>

      {/* Heading and filters */}
      <div className="board-results-heading">
        <div>
          <p className="achievement-kicker">STUDENT SPOTLIGHT</p>
          <h2>Recognising academic excellence.</h2>
          <p>
            Meet the students who made us proud with their remarkable
            board examination results.
          </p>
        </div>

        <div className="board-result-filters">
          {["All", "Class 10", "Class 12"].map((item) => (
            <button
              type="button"
              key={item}
              className={selectedClass === item ? "active" : ""}
              onClick={() => setSelectedClass(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Student cards */}
      <div className="board-student-grid">
        {filteredStudents.map((student) => (
          <article className="board-student-card" key={student.id}>
            <div className="board-student-photo">
              <img
                src={student.image}
                alt={`${student.name} - ${student.className} board result`}
                loading="lazy"
              />

              <span>{student.className}</span>
            </div>

            <div className="board-student-body">
              <p className="achievement-kicker">STUDENT ACHIEVER</p>

              <h3>{student.name}</h3>

              <p className="board-student-story">
                {student.story}
              </p>

              <div className="board-percentage">
                <div>
                  <small>Overall Percentage</small>
                  <strong>{student.percentage}%</strong>
                </div>

                <span>
                  <TrendingUp size={22} />
                </span>
              </div>

              <div className="board-achievement-label">
                <Star size={17} />
                <span>{student.achievement}</span>
              </div>

              <div className="board-marks-line">
                <span>Examination</span>
                <strong>MP Board 2026</strong>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom note */}
      <div className="achievement-bottom-note">
        <Award size={23} />
        <p>
          <strong>Congratulations to all our achievers!</strong>
          <br />
          Royal Heights Higher Secondary School celebrates the
          dedication, hard work and success of every student.
        </p>
      </div>
    </AchievementLayout>
  );
}
