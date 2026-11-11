
import {
  ArrowUpRight,
  BookOpen,
  Heart,
  Lightbulb,
  Star,
} from "lucide-react";
import { AchievementLayout } from "./AchievementLayout";
import "./Achievements.css";

const stories = [
  {
    category: "ACADEMIC JOURNEY",
    title: "The power of consistent practice",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793786683/_DSC6037.JPG.jpg",
    imageAlt: "Students participating in a classroom learning activity at Royal Heights School",
    description:
      "A glimpse of classroom learning where students participate, interact and build their knowledge through regular guidance and practice.",
    highlights: [
      "Classroom learning",
      "Student participation",
      "Learning together",
    ],
  },
  {
    category: "CREATIVITY & INNOVATION",
    title: "Celebrating creativity and expression",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793790593/DSC_6904.JPG-9mb.jpg",
    imageAlt: "Students taking part in a school cultural and creative activity",
    description:
      "A celebration of student creativity, cultural expression and participation in activities that make school life memorable.",
    highlights: [
      "Creative expression",
      "Cultural activities",
      "Student involvement",
    ],
  },
  {
    category: "TEAMWORK & LEADERSHIP",
    title: "Growing together through teamwork",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793790619/03.jpg.jpg",
    imageAlt: "Royal Heights School students participating in a group achievement event",
    description:
      "School activities encourage students to work together, develop confidence, take responsibility and value the contribution of others.",
    highlights: [
      "Collaboration",
      "Responsibility",
      "Team spirit",
    ],
  },
];

export default function StudentSuccessStories() {
  return (
    <AchievementLayout
      eyebrow="STORIES THAT INSPIRE"
      title="Student Success Stories"
      description="Every student has a journey worth celebrating. Discover stories of learning, determination, creativity and personal growth."
    >
      <div className="success-story-intro">
        <div className="success-story-intro-art">
          <div className="success-story-orbit">
            <Star size={42} />
          </div>

          <span>
            <Heart size={19} />
            EVERY JOURNEY MATTERS
          </span>
        </div>

        <div className="success-story-intro-copy">
          <p className="achievement-kicker">
            BEYOND THE RESULT
          </p>

          <h2>
            Success is a journey, not just a score.
          </h2>

          <p>
            Achievements can come from academic progress, creative work,
            teamwork, leadership and the confidence to try something new.
            This page celebrates the learning experiences and activities
            of the Royal Heights school community.
          </p>
        </div>
      </div>

      <div className="achievement-demo-notice">
        These photographs showcase school activities and student
        participation. Add individual student names, specific achievements
        and personal success stories only after verification and appropriate
        permission from the school.
      </div>

      <div className="success-story-heading">
        <div>
          <p className="achievement-kicker">
            THE STUDENT JOURNEY
          </p>

          <h2>
            Stories of growth and possibility.
          </h2>
        </div>
      </div>

      <div className="success-story-grid">
        {stories.map((story, index) => (
          <article
            className="success-story-card"
            key={story.title}
          >
            <div className="success-story-image">
              <img
                src={story.image}
                alt={story.imageAlt}
                loading="lazy"
                decoding="async"
              />

              <span>{story.category}</span>
            </div>

            <div className="success-story-body">
              <span className="success-story-number">
                STORY {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{story.title}</h3>

              <p>{story.description}</p>

              <div className="success-story-highlights">
                {story.highlights.map((highlight) => (
                  <span key={highlight}>
                    <Star size={13} />
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="success-story-footer">
                <span>Royal Heights School</span>
                <ArrowUpRight size={19} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="success-story-quote">
        <Lightbulb size={29} />

        <p className="achievement-kicker">
          A MESSAGE FOR EVERY LEARNER
        </p>

        <h2>
          Small steps today can create meaningful progress tomorrow.
        </h2>

        <p>
          Celebrate effort, learn from challenges and keep discovering
          new possibilities.
        </p>
      </section>

      <div className="achievement-bottom-note">
        <BookOpen size={23} />

        <p>
          <strong>
            Help us tell the real stories.
          </strong>
          <br />
          Add the student's approved name, class, achievement, journey,
          photographs and academic year before publishing individual
          success stories.
        </p>
      </div>
    </AchievementLayout>
  );
}
