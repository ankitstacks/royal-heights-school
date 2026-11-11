
import {
  Award,
  Medal,
  Trophy,
  Star,
  Users,
} from "lucide-react";
import { AchievementLayout } from "./AchievementLayout";
import "./Achievements.css";

const awards = [
  {
    category: "ACADEMIC EXCELLENCE",
    title: "Academic Achievement",
    description:
      "Celebrating students' academic efforts, participation, dedication and achievements in learning.",
    icon: GraduationIcon,
    year: "Academic Achievement",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793790109/01.jpg-7mb.jpg",
    alt: "Royal Heights students receiving academic recognition",
  },
  {
    category: "SPORTS & FITNESS",
    title: "Sports Recognition",
    description:
      "Celebrating outdoor activities, physical fitness, teamwork and participation in school events.",
    icon: Trophy,
    year: "Sports & Activities",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793790057/_DSC6050_-_Copy.JPG.jpg",
    alt: "Royal Heights school grounds and outdoor activities",
  },
  {
    category: "CREATIVITY & PARTICIPATION",
    title: "Student Participation",
    description:
      "Highlighting student involvement, creative activities, school events and opportunities to learn together.",
    icon: Star,
    year: "School Events",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793790192/02.jpg-8mb.jpg",
    alt: "Royal Heights students participating in a school event",
  },
  {
    category: "LEADERSHIP & TEAMWORK",
    title: "Student Leadership",
    description:
      "Recognising responsibility, teamwork, confidence and positive participation in the school community.",
    icon: Medal,
    year: "School Community",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793790230/IMG-20250913-WA0488.jpg.jpg",
    alt: "Royal Heights students together at a school event",
  },
];

function GraduationIcon(props) {
  return <Users {...props} />;
}

export default function AwardsRecognition() {
  return (
    <AchievementLayout
      eyebrow="AWARDS & HONOURS"
      title="Awards & Recognition"
      description="A space to celebrate the milestones, contributions and recognitions earned by students and the Royal Heights school community."
    >
      <div className="awards-intro">
        <div className="awards-intro-icon">
          <Award size={35} />
        </div>

        <div>
          <p className="achievement-kicker">
            CELEBRATING EVERY MILESTONE
          </p>

          <h2>Excellence takes many forms.</h2>

          <p>
            Academic progress, sporting spirit, creativity and
            leadership all deserve recognition. We celebrate
            the enthusiasm, participation and achievements of
            our Royal Heights students.
          </p>
        </div>
      </div>

      <div className="achievement-demo-notice">
        These photographs showcase school activities and student
        participation. Official awards, titles, dates and awarding
        organisations should be added only after verification.
      </div>

      <div className="award-recognition-grid">
        {awards.map((award, index) => {
          const Icon = award.icon;

          return (
            <article
              className="award-recognition-card"
              key={award.title}
            >
              <div
                className="award-recognition-image-wrap"
                style={{
                  width: "100%",
                  height: "210px",
                  overflow: "hidden",
                  borderRadius: "12px",
                  marginBottom: "22px",
                  background: "#f3e8d8",
                }}
              >
                <img
                  src={award.image}
                  alt={award.alt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="award-recognition-top">
                <span className="award-recognition-icon">
                  <Icon size={27} />
                </span>

                <span className="award-recognition-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="achievement-kicker">
                {award.category}
              </p>

              <h3>{award.title}</h3>

              <p>{award.description}</p>

              <div className="award-recognition-footer">
                <span>{award.year}</span>
                <Star size={16} />
              </div>
            </article>
          );
        })}
      </div>

      <section className="awards-timeline">
        <div>
          <p className="achievement-kicker">OUR JOURNEY</p>

          <h2>Recognising progress, year after year.</h2>

          <p>
            Every school activity provides an opportunity
            for students to learn, participate and grow.
          </p>
        </div>

        <div className="awards-timeline-list">
          {[
            [
              "01",
              "Academic and learning activities",
              "Celebrating learning, effort and student participation.",
            ],
            [
              "02",
              "Sports and cultural events",
              "Encouraging teamwork, fitness and creative expression.",
            ],
            [
              "03",
              "School community and leadership",
              "Building confidence, responsibility and cooperation.",
            ],
          ].map(([number, title, text]) => (
            <article
              className="awards-timeline-item"
              key={number}
            >
              <span>{number}</span>

              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="achievement-bottom-note">
        <Trophy size={23} />

        <p>
          <strong>Have an achievement to showcase?</strong>
          <br />
          Add verified certificates, event photographs,
          achievement details and year to celebrate the
          success of the Royal Heights community.
        </p>
      </div>
    </AchievementLayout>
  );
}
