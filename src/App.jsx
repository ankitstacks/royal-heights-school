import { useEffect, useState } from "react";
import WebsiteLoader from "./components/WebsiteLoader";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NewBranchPopup from "./components/NewBranchPopup";

import {
  ClipboardList,
  Wallet,
  FileText,
  Compass,
  MessageCircle,
  GraduationCap,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  Palette,
  Drama,
  MapPinned,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FlaskConical,
  Heart,
  Images,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Music2,
  Phone,
  Quote,
  Search,
  Play,
  Video,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  X,
} from "lucide-react";

const school = {
  name: "Royal Heights",
  fullName: "Royal Heights Higher Secondary School",
  address: "29CC+G7F, Machhalpur Road, Zirapur, Madhya Pradesh 465691",
  location: "Zirapur, District Rajgarh, Madhya Pradesh",
  phone: "+91 87200 24123",
  email: "royalzrp@gmail.com",
  udise: "23300621641",
  hours: "Monday–Saturday, 7:15 AM – 4:30 PM",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Royal+Heights+Higher+Secondary+School%2C+29CC%2BG7F%2C+Zirapur%2C+Madhya+Pradesh+465691",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=29CC%2BG7F%2C+Machhalpur+Road%2C+Zirapur%2C+Madhya+Pradesh+465691",
};

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Campus Life", href: "#campus" },
  { label: "Facilities", href: "#facilities" },
  { label: "Achievements", href: "#events" },
  { label: "News & Events", href: "#events" },
  { label: "Contact Us", href: "#contact" },
];

const aboutLinks = [
  {
    label: "Vision & Mission",
    description: "Our vision, mission and values",
    href: "/about/vision-mission",
  },
  {
    label: "Director's Message",
    description: "A message from our director",
    href: "/about/director-message",
  },
  {
    label: "Principal's Message",
    description: "A message from our principal",
    href: "/about/principal-message",
  },
  {
    label: "Leadership Team",
    description: "Meet our school leadership",
    href: "/about/leadership",
  },
];

const admissionLinks = [
  {
    label: "Admission Process",
    description: "Steps, eligibility & documents",
    href: "/admissions/process",
    icon: ClipboardList,
  },
  {
    label: "Fees Structure",
    description: "Nursery to Class 12",
    href: "/admissions/fees",
    icon: Wallet,
  },
  {
    label: "Online Application",
    description: "Student application form",
    href: "/admissions/apply",
    icon: FileText,
  },
  {
    label: "Admission Enquiry",
    description: "Talk to our school team",
    href: "/admissions/enquiry",
    icon: Send,
  },
];

const achievementLinks = [
  {
    label: "Board Results",
    description: "Class 10th & 12th performance",
    href: "/achievements/board-results",
    icon: GraduationCap,
  },
  {
    label: "Awards & Recognition",
    description: "Celebrating excellence and honours",
    href: "/achievements/awards",
    icon: Award,
  },
  {
    label: "Academic Toppers",
    description: "Meet our outstanding achievers",
    href: "/achievements/toppers",
    icon: Trophy,
  },
  {
    label: "Student Success Stories",
    description: "Stories that inspire us",
    href: "/achievements/success-stories",
    icon: Star,
  },
];

const academicLinks = [
  {
    label: "Academic Overview",
    description: "Curriculum & learning approach",
    href: "/academics/overview",
    icon: BookOpen,
  },
  {
    label: "Pre-Primary",
    description: "Nursery, LKG & UKG",
    href: "/academics/pre-primary",
    icon: Sparkles,
  },
  {
    label: "Primary School",
    description: "Classes 1–5",
    href: "/academics/primary",
    icon: GraduationCap,
  },
  {
    label: "Middle School",
    description: "Classes 6–8",
    href: "/academics/middle",
    icon: Lightbulb,
  },
  {
    label: "Secondary School",
    description: "Classes 9–10",
    href: "/academics/secondary",
    icon: BookOpen,
  },
  {
    label: "Senior Secondary",
    description: "Classes 11–12",
    href: "/academics/senior-secondary",
    icon: Award,
  },
  {
    label: "Teaching Methodology",
    description: "Our approach to learning",
    href: "/academics/teaching-methodology",
    icon: Compass,
  },
];

const highlights = [
  {
    number: "01",
    icon: BookOpen,
    title: "Meaningful Learning",
    text: "Learning experiences that encourage curiosity, understanding and independent thinking.",
  },
  {
    number: "02",
    icon: Heart,
    title: "Holistic Development",
    text: "Room to discover individual interests, build confidence and develop character.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Future-Ready Thinking",
    text: "An emphasis on questions, creativity, problem-solving and exploring new ideas.",
  },
];

const academicLevels = [
  {
    label: "01",
    title: "Pre-Primary",
    subtitle: "Discover the joy of learning",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
    text: "A welcoming introduction to learning through curiosity, play, communication and discovery.",
  },
  {
    label: "02",
    title: "Primary School",
    subtitle: "Build strong foundations",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    text: "Opportunities to develop foundational knowledge, learning habits and confidence.",
  },
  {
    label: "03",
    title: "Middle School",
    subtitle: "Explore and question",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&q=80",
    text: "An environment for expanding subject knowledge, teamwork and critical thinking.",
  },
  {
    label: "04",
    title: "Senior Secondary",
    subtitle: "Prepare for tomorrow",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    text: "Focused learning and preparation for future academic and career pathways.",
  },
];

const experiences = [
  {
    slug: "sports",
    title: "Sports & Fitness",
    category: "SPORTS",
    eyebrow: "MOVE WITH PURPOSE",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793880798/DSC_4639.JPG.jpg",
    icon: Trophy,
    description:
      "Discover the value of movement, teamwork, discipline and the confidence that comes from trying something new.",
    intro:
      "Sport can help students develop healthy habits, learn to work together and approach challenges with determination. Explore a world of movement, participation and personal growth.",
    activities: [
      "Team games and cooperative activities",
      "Fitness, movement and physical development",
      "Sportsmanship, discipline and teamwork",
      "Friendly competitions and activity days",
    ],
    imageTwo:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793882459/IMG_20261105_120253628.jpg.jpg",
    imageThree:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793790057/_DSC6050_-_Copy.JPG.jpg",
  },
  {
    slug: "science",
    title: "Science & Discovery",
    category: "DISCOVERY",
    eyebrow: "ASK. EXPLORE. DISCOVER.",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793881757/IMG_20241113_102150.jpg.jpg",
    icon: FlaskConical,
    description:
      "Explore scientific thinking through questions, experiments, observation and practical discovery.",
    intro:
      "Science encourages learners to ask how things work and why things happen. Hands-on activities and project-based exploration can help connect classroom concepts with the world around us.",
    activities: [
      "Science demonstrations and experiments",
      "Models, charts and project presentations",
      "Observation and problem-solving activities",
      "Science exhibitions and discovery projects",
    ],
    imageTwo:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793882894/IMG_20261105_120428480.jpg.jpg",
    imageThree:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793883042/IMG_20261105_121353817.jpg.jpg",
  },
  {
    slug: "music",
    title: "Music & Expression",
    category: "PERFORMING ARTS",
    eyebrow: "FIND YOUR RHYTHM",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793880948/IMG_20261105_115730328.jpg.jpg",
    icon: Music2,
    description:
      "Discover the joy of music, rhythm, singing and expressing ideas through sound and performance.",
    intro:
      "Music offers students a creative way to explore rhythm, listening, expression and collaboration. It can bring people together and create memorable opportunities to share their talents.",
    activities: [
      "Singing and vocal expression",
      "Rhythm and music appreciation",
      "Group performances and practice",
      "Musical presentations at school events",
    ],
    imageTwo:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793883124/IMG_20261105_115543244.jpg.jpg",
    imageThree:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793883135/IMG_20261105_115532957.jpg.jpg",
  },
  {
    slug: "dance",
    title: "Dance & Performing Arts",
    category: "DANCE & DRAMA",
    eyebrow: "EXPRESS THROUGH MOVEMENT",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793882013/DSC_6904.JPG-9mb_1.jpg",
    icon: Drama,
    description:
      "Celebrate movement, storytelling, stage confidence and the expressive power of performance.",
    intro:
      "Dance and performing arts offer opportunities to communicate through movement, build confidence and appreciate different forms of artistic expression. Group performances can also encourage coordination and teamwork.",
    activities: [
      "Dance practice and movement activities",
      "Drama, storytelling and role-play",
      "Cultural performance concepts",
      "Stage preparation and group presentations",
    ],
    imageTwo:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793883312/DSC_6911.JPG-9mb.jpg",
    imageThree:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793883324/DSC_6910.JPG-9mb.jpg",
  },
  {
    slug: "clubs",
    title: "Clubs & Student Activities",
    category: "COLLABORATION",
    eyebrow: "LEARN TOGETHER",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793882108/IMG_20261105_120203614.jpg.jpg",
    icon: Users,
    description:
      "Explore teamwork, shared interests, student-led ideas and opportunities to learn with others.",
    intro:
      "Clubs and group activities can help students explore interests beyond textbooks, exchange ideas and develop communication, collaboration and leadership skills.",
    activities: [
      "Group projects and collaborative challenges",
      "Reading, creativity and knowledge activities",
      "Student presentations and discussions",
      "Teamwork and leadership opportunities",
    ],
    imageTwo:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793883407/IMG_20261105_120352134.jpg.jpg",
    imageThree:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793883501/IMG-20250516-WA0005.jpg.jpg",
  },
  {
    slug: "trips",
    title: "Educational Trips",
    category: "LEARNING BEYOND CLASS",
    eyebrow: "DISCOVER THE WORLD",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793882200/IMG_20251206_153540.jpg.jpg",
    icon: MapPinned,
    description:
      "Connect learning with real-world places, observation, discovery and shared experiences.",
    intro:
      "Educational visits can give students a different perspective on what they learn. With appropriate planning and supervision, trips can encourage curiosity, observation and learning beyond the classroom.",
    activities: [
      "Educational visits and guided exploration",
      "Observation and learning journals",
      "Museum, nature and local-area learning ideas",
      "Reflection and group learning activities",
    ],
    imageTwo:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793883574/IMG_20251206_155405.jpg.jpg",
    imageThree:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793883634/_DSC6045_-_Copy.JPG.jpg",
  },
];

const facilities = [
  {
    icon: BookOpen,
    title: "Library & Reading",
    text: "A space that encourages reading, exploration and a lifelong interest in learning.",
  },
  {
    icon: FlaskConical,
    title: "Science & Discovery",
    text: "Explore practical learning opportunities and scientific curiosity.",
  },
  {
    icon: ShieldCheck,
    title: "Student Wellbeing",
    text: "Student welfare, responsible supervision and clear safety practices matter.",
  },
  {
    icon: Users,
    title: "Learning Together",
    text: "Opportunities to collaborate, communicate and learn as a community.",
  },
  {
    icon: Compass,
    title: "Future Skills",
    text: "Explore digital literacy, creative thinking and new approaches to problem-solving.",
  },
  {
    icon: GraduationCap,
    title: "Academic Guidance",
    text: "Support students as they develop their knowledge and consider future pathways.",
  },
];

const innovationCards = [
  {
    number: "01",
    title: "Explore STEM",
    text: "Discover science, technology, engineering and mathematics through questions and experimentation.",
    icon: FlaskConical,
  },
  {
    number: "02",
    title: "Think Creatively",
    text: "Develop ideas, solve problems and approach challenges with an open mind.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Understand Technology",
    text: "Build digital awareness and discover how technology can support learning.",
    icon: Compass,
  },
];

const gallery = [
  ...experiences,
  {
    title: "Learning Together",
    category: "ACADEMICS",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793886058/IMG_20261105_121336307.jpg.jpg",
    icon: BookOpen,
  },
  {
    title: "A World of Discovery",
    category: "CAMPUS",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793886355/IMG_8237.jpg-9mb.jpg",
    icon: Images,
  },
];

const faqs = [
  {
    q: "How can I enquire about admissions?",
    a: "Use the enquiry form on this website or contact the school directly using its verified phone number. The school can confirm available classes, admission dates and the next steps.",
  },
  {
    q: "Which classes are offered at the school?",
    a: "The proposed website covers Pre-Primary through Senior Secondary. Please confirm the currently offered classes and streams with the school before publishing final admission information.",
  },
  {
    q: "Where can I find the fee structure?",
    a: "The school should provide its current, approved fee structure. We will link the verified document here when it is supplied.",
  },
  {
    q: "Where are school announcements published?",
    a: "School notices, event dates, circulars and calendar information can be published in the News & Events section after the school verifies the content.",
  },
  {
    q: "Can parents access results and attendance online?",
    a: "Online results, attendance, homework and fee payment require an authorised school portal or a separately implemented secure system. They are not enabled by this informational website alone.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <Reveal className="section-heading">
      <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</p>
      <h2 className={light ? "heading-light" : ""}>{title}</h2>
      {description && (
        <p
          className={`section-description ${light ? "description-light" : ""}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

function CampusExperiencePage({ item }) {
  const reduceMotion = useReducedMotion();
  const Icon = item.icon;

  const otherExperiences = experiences.filter(
    (experience) => experience.slug !== item.slug,
  );

  return (
    <div className="school-site campus-detail-site">
      <WebsiteLoader />
      <header className="campus-detail-nav">
        <a href="/#home" className="campus-detail-brand">
          <img src="/images/logo.jpeg" alt="Royal Heights logo" />
          <span>
            <strong>ROYAL HEIGHTS</strong>
            <small>HIGHER SECONDARY SCHOOL</small>
          </span>
        </a>

        <a href="/#campus" className="campus-back-link">
          <ArrowRight size={16} className="back-arrow-icon" />
          All Campus Activities
        </a>
      </header>

      <main>
        <section className="campus-detail-hero">
          <motion.img
            src={item.image}
            alt={`${item.title} illustrative photograph`}
            initial={{ scale: reduceMotion ? 1 : 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: reduceMotion ? 0.01 : 1.5,
              ease: "easeOut",
            }}
          />

          <div className="campus-detail-hero-shade" />

          <div className="campus-detail-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.65 }}
            >
              <a href="/#campus" className="campus-breadcrumb">
                Campus Life <ArrowRight size={14} /> {item.title}
              </a>

              <p className="campus-detail-eyebrow">
                <span />
                {item.eyebrow}
              </p>

              <div className="campus-detail-title-icon">
                <Icon size={27} />
              </div>

              <h1>{item.title}</h1>

              <p className="campus-detail-lead">{item.description}</p>

              <div className="campus-detail-hero-actions">
                <a href="/#contact" className="button button-gold">
                  Contact the School <ArrowUpRight size={17} />
                </a>

                <a href="#explore-activities" className="campus-explore-link">
                  Explore activities <ArrowDown size={16} />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="campus-detail-hero-caption">
            ROYAL HEIGHTS <span>·</span> LEARNING BEYOND THE CLASSROOM
          </div>
        </section>

        <section className="campus-detail-intro section">
          <div className="section-container campus-detail-intro-grid">
            <Reveal>
              <p className="eyebrow">MORE THAN A CLASSROOM</p>
              <h2>
                Discover your interests.
                <br />
                <span className="campus-detail-italic">
                  Explore new possibilities.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="campus-detail-intro-text">{item.intro}</p>
            </Reveal>
          </div>
        </section>

        <section
          className="campus-detail-activities section"
          id="explore-activities"
        >
          <div className="section-container">
            <SectionHeading
              eyebrow={item.category}
              title={`Explore ${item.title}`}
              description="Discover the kinds of experiences and learning opportunities this activity can offer."
            />

            <div className="campus-detail-activity-grid">
              {item.activities.map((activity, index) => (
                <Reveal key={activity} delay={index * 0.07}>
                  <motion.article
                    className="campus-detail-activity-card"
                    whileHover={reduceMotion ? {} : { y: -6 }}
                  >
                    <span className="campus-activity-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="campus-activity-check">
                      <Check size={18} />
                    </span>

                    <h3>{activity}</h3>

                    <span className="campus-activity-line" />
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="campus-detail-gallery section">
          <div className="section-container">
            <div className="campus-detail-gallery-heading">
              <div>
                <p className="eyebrow">VISUAL INSPIRATION</p>
                <h2>
                  Moments of
                  <br />
                  <span className="campus-detail-italic">
                    discovery & growth.
                  </span>
                </h2>
              </div>
            </div>

            <div className="campus-detail-photo-grid">
              <Reveal className="campus-detail-photo campus-detail-photo-large">
                <img
                  src={item.image}
                  alt={`${item.title} sample visual`}
                  loading="lazy"
                />
                <span>{item.title}</span>
              </Reveal>

              <Reveal className="campus-detail-photo" delay={0.08}>
                <img
                  src={item.imageTwo}
                  alt={`${item.title} additional sample visual`}
                  loading="lazy"
                />
                <span>Explore & Learn</span>
              </Reveal>

              <Reveal className="campus-detail-photo" delay={0.16}>
                <img
                  src={item.imageThree}
                  alt={`${item.title} activity inspiration`}
                  loading="lazy"
                />
                <span>Ideas into Experiences</span>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="campus-detail-values">
          <div className="section-container campus-detail-values-inner">
            <Reveal>
              <p className="eyebrow eyebrow-light">THE BIGGER PICTURE</p>
              <h2>
                Every experience can
                <br />
                help a student grow.
              </h2>
              <p>
                Curiosity, participation, creativity and collaboration can make
                learning meaningful both inside and outside the classroom.
              </p>
            </Reveal>

            <div className="campus-detail-value-list">
              {[
                ["01", "Confidence", "Discover interests and express ideas."],
                [
                  "02",
                  "Collaboration",
                  "Learn to share ideas and work together.",
                ],
                [
                  "03",
                  "Curiosity",
                  "Ask questions and explore new possibilities.",
                ],
              ].map(([number, title, description], index) => (
                <Reveal key={number} delay={index * 0.08}>
                  <div className="campus-detail-value-row">
                    <span>{number}</span>
                    <div>
                      <strong>{title}</strong>
                      <p>{description}</p>
                    </div>
                    <ArrowUpRight size={19} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="campus-detail-more section">
          <div className="section-container">
            <SectionHeading
              eyebrow="KEEP EXPLORING"
              title="There is more to discover."
              description="Explore other campus life categories and discover more ways students can learn, create and participate."
            />

            <div className="campus-detail-more-grid">
              {otherExperiences.slice(0, 3).map((experience, index) => {
                const OtherIcon = experience.icon;

                return (
                  <Reveal key={experience.slug} delay={index * 0.08}>
                    <a
                      className="campus-detail-more-card"
                      href={`/campus-life/${experience.slug}`}
                    >
                      <img src={experience.image} alt="" loading="lazy" />

                      <span className="campus-more-icon">
                        <OtherIcon size={20} />
                      </span>

                      <span className="campus-more-copy">
                        <small>{experience.category}</small>
                        <strong>{experience.title}</strong>
                      </span>

                      <span className="campus-more-arrow">
                        <ArrowUpRight size={20} />
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </div>

            <div className="campus-detail-bottom-cta">
              <div>
                <p className="eyebrow">YOUR NEXT STEP</p>
                <h2>Discover Royal Heights.</h2>
                <p>
                  Contact the school to learn more about the student experience
                  and admission enquiries.
                </p>
              </div>

              <a href="/#contact" className="button button-maroon">
                Connect With the School <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="campus-detail-footer">
        <a href="/#home">ROYAL HEIGHTS</a>
        <span>Higher Secondary School · Zirapur</span>
        <a href="/#campus">Back to Campus Life ↑</a>
      </footer>
    </div>
  );
}

function GalleryLibraryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [mediaType, setMediaType] = useState("Photos");
  const categories = ["All", ...new Set(gallery.map((item) => item.category))];
  const filteredPhotos = gallery.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = `${item.title} ${item.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function movePhoto(direction) {
    if (selectedPhoto === null) return;
    const index = filteredPhotos.findIndex(
      (item) => item.title === selectedPhoto.title,
    );
    const next =
      (index + direction + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[next]);
  }

  return (
    <div className="rh-gallery-page">
      <style>{`
        .rh-gallery-page{min-height:100vh;background:#f7f1e8;color:#2b1114;font-family:inherit}
        .rh-gallery-top{height:82px;background:#fffdfa;border-bottom:1px solid #eadcc9;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,6vw,100px);position:sticky;top:0;z-index:20}
        .rh-gallery-brand{display:flex;align-items:center;gap:13px;text-decoration:none;color:#81232c}.rh-gallery-brand img{width:52px;height:52px;object-fit:contain}.rh-gallery-brand strong{display:block;font-family:Georgia,serif;font-size:21px}.rh-gallery-brand small{display:block;font-size:9px;letter-spacing:1.5px;margin-top:4px;color:#6d5550}
        .rh-gallery-back{display:inline-flex;align-items:center;gap:9px;text-decoration:none;color:#81232c;font-weight:700;font-size:13px}
        .rh-gallery-hero{position:relative;overflow:hidden;padding:clamp(65px,9vw,120px) clamp(22px,8vw,130px);background:linear-gradient(110deg,rgba(35,13,17,.94),rgba(69,27,29,.72)),url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=85') center/cover;color:#fff}
        .rh-gallery-hero:after{content:"";position:absolute;width:420px;height:420px;border:1px solid rgba(239,197,126,.28);border-radius:50%;right:-90px;top:-170px;box-shadow:0 0 0 55px rgba(239,197,126,.04),0 0 0 110px rgba(239,197,126,.03)}
        .rh-gallery-hero-inner{position:relative;z-index:1;max-width:900px}.rh-gallery-kicker{color:#efc57e;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase}.rh-gallery-hero h1{font-family:Georgia,serif;font-size:clamp(48px,7vw,88px);line-height:.98;letter-spacing:-2px;margin:22px 0}.rh-gallery-hero h1 em{color:#efc57e;font-weight:400}.rh-gallery-hero p{max-width:630px;color:#f2e5db;font-size:16px;line-height:1.9;margin:0}
        .rh-gallery-main{max-width:1440px;margin:auto;padding:55px clamp(20px,6vw,90px) 100px}.rh-gallery-toolbar{display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap;margin-bottom:25px}.rh-gallery-tabs{display:flex;gap:8px;flex-wrap:wrap}.rh-gallery-tabs button,.rh-gallery-categories button{border:1px solid #e6d5c1;background:#fffdfa;color:#57383a;border-radius:999px;padding:11px 17px;font-weight:700;cursor:pointer;transition:.2s}.rh-gallery-tabs button.active,.rh-gallery-categories button.active{background:#81232c;color:#fff;border-color:#81232c}.rh-gallery-search{display:flex;align-items:center;gap:10px;background:#fffdfa;border:1px solid #e6d5c1;border-radius:999px;padding:0 16px;height:46px;min-width:min(100%,280px);color:#936d50}.rh-gallery-search input{border:0;outline:0;background:transparent;width:100%;font:inherit;color:#32191b}.rh-gallery-categories{display:flex;gap:8px;overflow:auto;padding:3px 0 24px}.rh-gallery-categories button{white-space:nowrap;font-size:12px;padding:9px 14px}
        .rh-gallery-meta{display:flex;justify-content:space-between;align-items:center;margin:8px 0 18px;color:#806966;font-size:13px}.rh-gallery-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.rh-gallery-card{position:relative;border:0;padding:0;overflow:hidden;border-radius:18px;background:#2b1114;aspect-ratio:1.16/1;cursor:pointer;text-align:left;box-shadow:0 10px 30px rgba(57,25,22,.08)}.rh-gallery-card:nth-child(5n+2){aspect-ratio:1/1.12}.rh-gallery-card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .65s}.rh-gallery-card:hover img{transform:scale(1.07)}.rh-gallery-card:after{content:"";position:absolute;inset:25% 0 0;background:linear-gradient(transparent,rgba(28,10,13,.86))}.rh-gallery-card-copy{position:absolute;z-index:1;left:20px;right:20px;bottom:18px;color:#fff}.rh-gallery-card-copy small{display:block;color:#f1c47a;font-size:9px;font-weight:800;letter-spacing:2px;margin-bottom:7px}.rh-gallery-card-copy strong{font:24px Georgia,serif}.rh-gallery-open{position:absolute;z-index:2;right:17px;top:17px;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(255,253,250,.92);color:#81232c}
        .rh-gallery-empty{padding:65px 20px;text-align:center;background:#fffdfa;border:1px dashed #dfcbb5;border-radius:18px;color:#725b56}.rh-gallery-empty svg{color:#a87b40}.rh-gallery-empty h3{font:28px Georgia,serif;color:#32191b;margin:14px 0 8px}.rh-gallery-note{margin-top:30px;padding:18px 20px;border-radius:14px;background:#efe3d2;color:#71594f;font-size:12px;line-height:1.7}
        .rh-gallery-footer{background:#210e12;color:#f5e9dd;padding:28px clamp(20px,6vw,90px);display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap;font-size:12px}.rh-gallery-footer a{color:#efc57e;text-decoration:none}
        .rh-gallery-lightbox{position:fixed;inset:0;z-index:100;background:rgba(15,7,9,.94);display:grid;place-items:center;padding:70px 70px 30px}.rh-gallery-lightbox img{max-width:min(1100px,88vw);max-height:75vh;object-fit:contain;border-radius:12px}.rh-gallery-lightbox-title{color:#fff;text-align:center;margin-top:12px}.rh-gallery-lightbox-title small{color:#efc57e;letter-spacing:2px}.rh-gallery-lightbox-title h3{font:26px Georgia,serif;margin:7px}.rh-gallery-lightbox button{position:absolute;border:0;border-radius:50%;width:46px;height:46px;background:#fff;color:#81232c;display:grid;place-items:center;cursor:pointer}.rh-gallery-lightbox .close{top:22px;right:24px}.rh-gallery-lightbox .prev{left:20px;top:50%}.rh-gallery-lightbox .next{right:20px;top:50%}
        @media(max-width:850px){.rh-gallery-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.rh-gallery-card{aspect-ratio:1/1}.rh-gallery-lightbox{padding:65px 18px 25px}.rh-gallery-lightbox img{max-width:94vw}}
        @media(max-width:560px){.rh-gallery-top{height:70px;padding:0 15px}.rh-gallery-brand img{width:42px;height:42px}.rh-gallery-brand strong{font-size:16px}.rh-gallery-brand small{font-size:7px}.rh-gallery-back{font-size:11px}.rh-gallery-grid{grid-template-columns:1fr;gap:14px}.rh-gallery-card,.rh-gallery-card:nth-child(5n+2){aspect-ratio:1.18/1}.rh-gallery-main{padding-top:32px}.rh-gallery-hero h1{letter-spacing:-1px}.rh-gallery-lightbox .prev{left:8px}.rh-gallery-lightbox .next{right:8px}}
      `}</style>
      <header className="rh-gallery-top">
        <a href="/#home" className="rh-gallery-brand">
          <img src="/images/logo.jpeg" alt="Royal Heights logo" />
          <span>
            <strong>ROYAL HEIGHTS</strong>
            <small>HIGHER SECONDARY SCHOOL</small>
          </span>
        </a>
        <a className="rh-gallery-back" href="/#events">
          <ArrowLeft size={17} /> Back to Website
        </a>
      </header>
      <section className="rh-gallery-hero">
        <div className="rh-gallery-hero-inner">
          <span className="rh-gallery-kicker">ROYAL HEIGHTS · MEMORY LANE</span>
          <h1>
            Every picture
            <br />
            <em>holds a story.</em>
          </h1>
          <p>
            Explore moments of learning, creativity, teamwork and celebration. A
            growing visual library celebrating the school community.
          </p>
        </div>
      </section>
      <main className="rh-gallery-main">
        <div className="rh-gallery-toolbar">
          <div className="rh-gallery-tabs">
            <button
              className={mediaType === "Photos" ? "active" : ""}
              onClick={() => setMediaType("Photos")}
            >
              <Images
                size={15}
                style={{ verticalAlign: "middle", marginRight: 7 }}
              />
              Photos
            </button>
            <button
              className={mediaType === "Videos" ? "active" : ""}
              onClick={() => setMediaType("Videos")}
            >
              <Video
                size={15}
                style={{ verticalAlign: "middle", marginRight: 7 }}
              />
              Videos
            </button>
          </div>
          {mediaType === "Photos" && (
            <label className="rh-gallery-search">
              <Search size={17} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search moments..."
                aria-label="Search gallery"
              />
            </label>
          )}
        </div>
        {mediaType === "Photos" ? (
          <>
            <div className="rh-gallery-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="rh-gallery-meta">
              <span>{filteredPhotos.length} moments to explore</span>
              <span>Tap any photo to view</span>
            </div>
            {filteredPhotos.length ? (
              <div className="rh-gallery-grid">
                {filteredPhotos.map((item, index) => (
                  <button
                    className="rh-gallery-card"
                    key={`${item.title}-${index}`}
                    onClick={() => setSelectedPhoto(item)}
                  >
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="rh-gallery-open">
                      <ArrowUpRight size={18} />
                    </span>
                    <span className="rh-gallery-card-copy">
                      <small>{item.category}</small>
                      <strong>{item.title}</strong>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rh-gallery-empty">
                <Search size={30} />
                <h3>No matching photos found</h3>
                <p>Try another keyword or choose a different category.</p>
              </div>
            )}
            <p className="rh-gallery-note">
              Note: The current gallery uses illustrative sample photographs
              from the existing website design. Replace them with
              school-approved photographs before the website goes live. No
              actual school event or student photographs have been supplied yet.
            </p>
          </>
        ) : (
          <div className="rh-gallery-empty">
            <Play size={34} />
            <h3>Video highlights are coming soon</h3>
            <p>
              School event videos, performances, campus tours and activity clips
              can be added here once the school provides approved video files or
              official video links.
            </p>
          </div>
        )}
      </main>
      <footer className="rh-gallery-footer">
        <span>
          © {new Date().getFullYear()} Royal Heights Higher Secondary School
        </span>
        <a href="/#home">Return to Home ↑</a>
      </footer>
      {selectedPhoto && (
        <div
          className="rh-gallery-lightbox"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="close"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close"
          >
            <X />
          </button>
          <button
            className="prev"
            onClick={(e) => {
              e.stopPropagation();
              movePhoto(-1);
            }}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto.image} alt={selectedPhoto.title} />
            <div className="rh-gallery-lightbox-title">
              <small>{selectedPhoto.category}</small>
              <h3>{selectedPhoto.title}</h3>
            </div>
          </div>
          <button
            className="next"
            onClick={(e) => {
              e.stopPropagation();
              movePhoto(1);
            }}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileAcademicsOpen, setMobileAcademicsOpen] = useState(false);
  const [mobileAdmissionsOpen, setMobileAdmissionsOpen] = useState(false);
  const [mobileAchievementsOpen, setMobileAchievementsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  const [formStatus, setFormStatus] = useState("");
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    parentName: "",
    phone: "",
    email: "",
    className: "",
    topic: "Admission Process",
    message: "",
  });

  const admissionClassOptions = [
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

  function updateEnquiryField(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setFormError("");
  }

  async function handleEnquiry(event) {
    event.preventDefault();
    if (formSubmitting) return;

    setFormError("");
    setFormStatus("");
    setFormSubmitting(true);

    try {
      const apiUrl = (import.meta.env.VITE_API_URL || "/api").replace(
        /\/$/,
        "",
      );
      const response = await fetch(`${apiUrl}/admission-enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          data.message || "Unable to submit your enquiry. Please try again.",
        );
      }

      setFormSubmitted(true);
    } catch (error) {
      setFormError(error.message || "Something went wrong. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  }

  function resetEnquiryForm() {
    setForm({
      parentName: "",
      phone: "",
      email: "",
      className: "",
      topic: "Admission Process",
      message: "",
    });
    setFormSubmitted(false);
    setFormError("");
    setFormStatus("");
  }

  function changeImage(direction) {
    setActiveImage((current) => {
      if (current === null) return 0;
      return (current + direction + gallery.length) % gallery.length;
    });
  }

  // Reliable same-page navigation + URL hash synchronization.
  // Handles desktop/mobile navigation, footer links, direct hash URLs and browser history.
  useEffect(() => {
    const isHomeRoute =
      window.location.pathname === "/" || window.location.pathname === "";
    if (!isHomeRoute) return undefined;

    const sectionIds = [
      "home",
      "about",
      "academics",
      "admissions",
      "campus",
      "facilities",
      "innovation",
      "events",
      "gallery",
      "faculty",
      "resources",
      "faq",
      "contact",
      "privacy-policy",
      "grievance-information",
    ];

    const getHeaderOffset = () => {
      const header = document.querySelector(".site-header");
      const headerHeight = header?.getBoundingClientRect().height || 0;
      // Reserve the navigation bar so headings are never hidden beneath it.
      return Math.min(headerHeight + 16, 150);
    };

    const scrollToId = (id, behavior = "smooth", updateHistory = false) => {
      const target = document.getElementById(id);
      if (!target) return false;

      if (updateHistory) {
        const nextUrl = `${window.location.pathname}${window.location.search}#${id}`;
        window.history.pushState({ section: id }, "", nextUrl);
      }

      const top =
        target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      window.scrollTo({
        top: Math.max(0, top),
        behavior: reduceMotion ? "auto" : behavior,
      });
      return true;
    };

    const onDocumentClick = (event) => {
      const anchor = event.target.closest?.("a[href]");
      if (
        !anchor ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      if (anchor.target && anchor.target !== "_self") return;

      let url;
      try {
        url = new URL(anchor.getAttribute("href"), window.location.href);
      } catch {
        return;
      }

      if (
        url.origin !== window.location.origin ||
        url.pathname.replace(/\/$/, "") !== ""
      )
        return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!id || !document.getElementById(id)) return;

      event.preventDefault();
      scrollToId(id, "smooth", true);
    };

    let scrollFrame = 0;
    let lastHash = "";
    const updateHashFromScroll = () => {
      scrollFrame = 0;
      const marker =
        getHeaderOffset() + Math.min(window.innerHeight * 0.28, 220);
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .sort(
          (a, b) =>
            a.getBoundingClientRect().top - b.getBoundingClientRect().top,
        );

      if (!sections.length) return;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) current = section;
        else break;
      }

      const id = current?.id;
      if (!id || id === lastHash) return;
      lastHash = id;
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}#${id}`,
      );
    };

    const onScroll = () => {
      if (!scrollFrame)
        scrollFrame = window.requestAnimationFrame(updateHashFromScroll);
    };

    const onHistoryNavigation = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && document.getElementById(id)) {
        lastHash = id;
        requestAnimationFrame(() => scrollToId(id, "auto", false));
      }
    };

    document.addEventListener("click", onDocumentClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("popstate", onHistoryNavigation);
    window.addEventListener("hashchange", onHistoryNavigation);

    const initialId = decodeURIComponent(window.location.hash.slice(1));
    if (initialId && document.getElementById(initialId)) {
      lastHash = initialId;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => scrollToId(initialId, "auto", false)),
      );
    } else {
      updateHashFromScroll();
    }

    return () => {
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("popstate", onHistoryNavigation);
      window.removeEventListener("hashchange", onHistoryNavigation);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    };
  }, [reduceMotion]);

  // Dedicated Campus Life detail-page routing
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

  if (currentPath === "/gallery") {
    return <GalleryLibraryPage />;
  }

  const campusExperience = experiences.find(
    (item) => `/campus-life/${item.slug}` === currentPath,
  );

  if (campusExperience) {
    return <CampusExperiencePage item={campusExperience} />;
  }

  return (
    <div className="school-site">
      <WebsiteLoader />
      <NewBranchPopup />

      <div className="announcement-bar">
        <span className="announcement-sparkle">
          <Sparkles size={13} />
        </span>
        A JOURNEY OF DISCOVERY, LEARNING & GROWTH
        <a href="#admissions">
          Explore Admissions <ArrowRight size={13} />
        </a>
      </div>

      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <a href="#home" className="brand" onClick={() => setMenuOpen(false)}>
            <img
              src="/images/logo.jpeg"
              alt="Royal Heights school emblem"
              className="brand-logo"
            />
            <span className="brand-copy">
              <strong>ROYAL HEIGHTS</strong>
              <span>HIGHER SECONDARY SCHOOL</span>
              <small>ZIRAPUR · MADHYA PRADESH</small>
            </span>
          </a>

          <div className="desktop-nav">
            {/* HOME STAYS FIRST */}
            <a
              href="#home"
              className="nav-home-link"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>

            {/* ALL DROPDOWN NAVIGATION ITEMS GROUPED TOGETHER */}
            <div className="nav-dropdown-group">
              {/* ABOUT US DROPDOWN */}
              <div className="nav-dropdown about-dropdown">
                <button
                  type="button"
                  className="nav-dropdown-trigger"
                  aria-haspopup="true"
                >
                  About Us
                  <ChevronDown size={15} />
                </button>

                <div className="nav-dropdown-menu about-dropdown-menu">
                  <div className="nav-dropdown-heading">
                    <span>OUR SCHOOL</span>
                    <h3>Discover Royal Heights</h3>
                  </div>

                  {aboutLinks.map((item, index) => {
                    const AboutIcon = [
                      Compass,
                      MessageCircle,
                      GraduationCap,
                      Users,
                    ][index];

                    return (
                      <a href={item.href} key={item.label}>
                        <span className="about-dropdown-icon">
                          <AboutIcon size={23} strokeWidth={1.8} />
                        </span>

                        <span className="about-dropdown-text">
                          <span className="about-dropdown-title">
                            {item.label}
                          </span>
                          <span className="about-dropdown-description">
                            {item.description}
                          </span>
                        </span>

                        <span className="about-dropdown-arrow">↗</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* ACADEMICS DROPDOWN */}
              <div className="nav-dropdown">
                <button
                  type="button"
                  className="nav-dropdown-trigger"
                  aria-haspopup="true"
                >
                  Academics
                  <ChevronDown size={15} />
                </button>

                <div className="nav-dropdown-menu">
                  <div className="nav-dropdown-heading">
                    <span>THE LEARNING JOURNEY</span>
                    <strong>Explore Our Academics</strong>
                  </div>

                  {academicLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a href={item.href} key={item.href}>
                        <span className="nav-dropdown-icon">
                          <Icon size={19} />
                        </span>

                        <span className="nav-dropdown-copy">
                          <strong>{item.label}</strong>
                          <small>{item.description}</small>
                        </span>

                        <ArrowUpRight
                          size={16}
                          className="nav-dropdown-arrow"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* ADMISSIONS DROPDOWN */}
              <div className="nav-dropdown">
                <button
                  type="button"
                  className="nav-dropdown-trigger"
                  aria-haspopup="true"
                >
                  Admissions
                  <ChevronDown size={15} />
                </button>

                <div className="nav-dropdown-menu">
                  <div className="nav-dropdown-heading">
                    <span>YOUR NEXT CHAPTER</span>
                    <strong>Admissions at Royal Heights</strong>
                  </div>

                  {admissionLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a href={item.href} key={item.href}>
                        <span className="nav-dropdown-icon">
                          <Icon size={19} />
                        </span>

                        <span className="nav-dropdown-copy">
                          <strong>{item.label}</strong>
                          <small>{item.description}</small>
                        </span>

                        <ArrowUpRight
                          size={16}
                          className="nav-dropdown-arrow"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* ACHIEVEMENTS DROPDOWN */}
              <div className="nav-dropdown achievements-dropdown">
                <button
                  type="button"
                  className="nav-dropdown-trigger"
                  aria-haspopup="true"
                >
                  Achievements
                  <ChevronDown size={15} />
                </button>

                <div className="nav-dropdown-menu achievements-dropdown-menu">
                  <div className="nav-dropdown-heading">
                    <span>CELEBRATING EXCELLENCE</span>
                    <strong>Our Achievements</strong>
                  </div>

                  {achievementLinks.map((achievement) => {
                    const Icon = achievement.icon;

                    return (
                      <a href={achievement.href} key={achievement.href}>
                        <span className="nav-dropdown-icon">
                          <Icon size={20} />
                        </span>
                        <span className="nav-dropdown-copy">
                          <strong>{achievement.label}</strong>
                          <small>{achievement.description}</small>
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="nav-dropdown-arrow"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* NORMAL LINKS GROUPED SEPARATELY */}
            <div className="nav-simple-links">
              <a href="#campus">Campus Life</a>
              <a href="#facilities">Facilities</a>
              <a href="#events">News &amp; Events</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>

          <a href="#admissions" className="nav-cta">
            Enquire <ArrowUpRight size={16} />
          </a>

          <button
            className="mobile-menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <a href="#home" onClick={() => setMenuOpen(false)}>
                Home <ArrowUpRight size={16} />
              </a>

              <div className="mobile-nav-group">
                <button
                  type="button"
                  className="mobile-nav-group-trigger"
                  aria-expanded={mobileAboutOpen}
                  onClick={() => setMobileAboutOpen((open) => !open)}
                >
                  About Us <ChevronDown size={17} />
                </button>
                <AnimatePresence>
                  {mobileAboutOpen && (
                    <motion.div
                      className="mobile-nav-submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {aboutLinks.map((item) => (
                        <a
                          href={item.href}
                          key={item.href}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span>
                            <strong>{item.label}</strong>
                            <small>{item.description}</small>
                          </span>
                          <ArrowUpRight size={16} />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mobile-nav-group">
                <button
                  type="button"
                  className="mobile-nav-group-trigger"
                  aria-expanded={mobileAcademicsOpen}
                  onClick={() => setMobileAcademicsOpen((open) => !open)}
                >
                  Academics <ChevronDown size={17} />
                </button>
                <AnimatePresence>
                  {mobileAcademicsOpen && (
                    <motion.div
                      className="mobile-nav-submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {academicLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            href={item.href}
                            key={item.href}
                            onClick={() => setMenuOpen(false)}
                          >
                            <Icon size={18} />
                            <span>
                              <strong>{item.label}</strong>
                              <small>{item.description}</small>
                            </span>
                            <ArrowUpRight size={16} />
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mobile-nav-group">
                <button
                  type="button"
                  className="mobile-nav-group-trigger"
                  aria-expanded={mobileAdmissionsOpen}
                  onClick={() => setMobileAdmissionsOpen((open) => !open)}
                >
                  Admissions <ChevronDown size={17} />
                </button>
                <AnimatePresence>
                  {mobileAdmissionsOpen && (
                    <motion.div
                      className="mobile-nav-submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {admissionLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            href={item.href}
                            key={item.href}
                            onClick={() => setMenuOpen(false)}
                          >
                            <Icon size={18} />
                            <span>
                              <strong>{item.label}</strong>
                              <small>{item.description}</small>
                            </span>
                            <ArrowUpRight size={16} />
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navigation.slice(3).map((item) => {
                if (item.label === "Achievements") {
                  return (
                    <div className="mobile-nav-group" key={item.label}>
                      <button
                        type="button"
                        className="mobile-nav-group-trigger"
                        aria-expanded={mobileAchievementsOpen}
                        onClick={() =>
                          setMobileAchievementsOpen((open) => !open)
                        }
                      >
                        Achievements <ChevronDown size={17} />
                      </button>
                      <AnimatePresence>
                        {mobileAchievementsOpen && (
                          <motion.div
                            className="mobile-nav-submenu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            {achievementLinks.map((achievement) => {
                              const Icon = achievement.icon;
                              return (
                                <a
                                  href={achievement.href}
                                  key={achievement.href}
                                  onClick={() => setMenuOpen(false)}
                                >
                                  <Icon size={18} />
                                  <span>
                                    <strong>{achievement.label}</strong>
                                    <small>{achievement.description}</small>
                                  </span>
                                  <ArrowUpRight size={16} />
                                </a>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <a
                    href={item.href}
                    key={item.label}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                    <ArrowUpRight size={16} />
                  </a>
                );
              })}

              <a
                href="#contact"
                className="mobile-nav-contact"
                onClick={() => setMenuOpen(false)}
              >
                Contact the School <ArrowRight size={16} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-image-wrap">
            <motion.img
              className="hero-image"
              src="https://res.cloudinary.com/trcybfpw/image/upload/v1793784759/WhatsApp_Image_2026-11-04_at_2.46.40_PM.jpg"
              alt="Illustrative school campus photograph"
              initial={{ scale: reduceMotion ? 1 : 1.12 }}
              animate={{ scale: 1 }}
              transition={{
                duration: reduceMotion ? 0.01 : 2.2,
                ease: "easeOut",
              }}
            />
          </div>
          <div className="hero-shade" />
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="hero-inner">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.13,
                    delayChildren: 0.15,
                  },
                },
              }}
              className="hero-copy"
            >
              <motion.div className="hero-kicker" variants={reveal}>
                <span className="live-dot" />
                WELCOME TO ROYAL HEIGHTS
              </motion.div>

              <motion.h1 variants={reveal}>
                Big dreams.
                <br />
                <span>Brighter futures.</span>
              </motion.h1>

              <motion.p variants={reveal}>
                Every great journey begins with curiosity. Discover a school
                experience designed to inspire learning, nurture confidence and
                help every student explore their potential.
              </motion.p>

              <motion.div className="hero-actions" variants={reveal}>
                <a href="#admissions" className="button button-gold">
                  Begin Your Journey <ArrowRight size={18} />
                </a>
                <a href="#about" className="button button-glass">
                  Discover Royal Heights <ArrowDown size={17} />
                </a>
              </motion.div>

              <motion.div className="hero-trust-line" variants={reveal}>
                <span className="trust-star">
                  <Star size={15} fill="currentColor" />
                </span>
                <span>A place to learn, grow and discover</span>
              </motion.div>
            </motion.div>

            <motion.a
              href="#about"
              className="hero-scroll"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <span>SCROLL TO DISCOVER</span>
              <span className="scroll-line" />
            </motion.a>

            <div className="hero-side-label">
              <span>ROYAL HEIGHTS</span>
              <span>·</span>
              <span>ZIRAPUR</span>
            </div>
          </div>
        </section>

        {/* INTRO STRIP */}
        <section className="intro-strip" aria-label="School introduction">
          <div className="intro-strip-inner">
            <span>
              <Sparkles size={17} /> LEARNING WITH PURPOSE
            </span>
            <span className="strip-separator">✳</span>
            <span>
              <Heart size={17} /> GROWING WITH CONFIDENCE
            </span>
            <span className="strip-separator">✳</span>
            <span>
              <Compass size={17} /> EXPLORING NEW POSSIBILITIES
            </span>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section about-section" id="about">
          <div className="section-container about-grid">
            <Reveal className="about-visual">
              <div className="about-photo-main">
                <img
                  src="https://res.cloudinary.com/trcybfpw/image/upload/v1793786428/_DSC6040.JPG.jpg"
                  alt="Illustrative classroom learning scene"
                  loading="lazy"
                />
              </div>
              <div className="about-photo-small">
                <img
                  src="https://res.cloudinary.com/trcybfpw/image/upload/v1793786437/_DSC6041.JPG.jpg"
                  alt="Illustrative young learners"
                  loading="lazy"
                />
              </div>
              <div className="about-seal">
                <span className="seal-icon">
                  <GraduationCap size={29} />
                </span>
                <span>THE JOURNEY</span>
                <strong>Starts Here</strong>
              </div>
              <div className="about-decoration">RH.</div>
            </Reveal>

            <div className="about-copy">
              <SectionHeading
                eyebrow="A warm welcome"
                title="Education that opens a world of possibilities."
                description="A meaningful school experience is about more than what happens inside a classroom. It is about building confidence, encouraging questions and helping students find their own strengths."
              />
              <Reveal delay={0.1}>
                <p className="body-copy">
                  At Royal Heights Higher Secondary School, Zirapur, we want
                  families to discover a welcoming learning community where
                  students can develop knowledge, character and a sense of
                  responsibility for the world around them.
                </p>
                <a href="#academics" className="text-link">
                  Explore our learning approach <ArrowRight size={17} />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="section values-section" id="academics">
          <div className="section-container">
            <SectionHeading
              eyebrow="What matters to us"
              title="A strong foundation for every tomorrow."
              description="The values below describe the educational experience this website presents. The school should confirm its official vision and mission before publication."
            />
            <div className="value-grid">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.number} delay={index * 0.1}>
                    <motion.article
                      className="value-card"
                      whileHover={reduceMotion ? {} : { y: -8 }}
                    >
                      <span className="card-number">{item.number}</span>
                      <div className="value-icon">
                        <Icon size={27} />
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <a
                        href="#academics"
                        aria-label={`Learn more about ${item.title}`}
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    </motion.article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ADMISSIONS */}
        <section className="section admissions-section" id="admissions">
          <div className="admissions-background">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="admissions-overlay" />
          <div className="section-container admissions-grid">
            <div className="admissions-copy">
              <Reveal>
                <p className="eyebrow eyebrow-light">Your next chapter</p>
                <h2>Let's make the first step a memorable one.</h2>
                <p>
                  Choosing a school is an important family decision. Connect
                  with the school to understand the admission process, class
                  availability, required documents and important dates.
                </p>
                <div className="admission-points">
                  {[
                    "Ask about class availability",
                    "Understand the admission steps",
                    "Get verified information from the school",
                  ].map((text) => (
                    <div key={text}>
                      <Check size={17} /> {text}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="enquiry-card-wrap">
              <div className="enquiry-card">
                <div className="form-heading">
                  <span className="form-icon">
                    <Send size={21} />
                  </span>
                  <div>
                    <p className="eyebrow">LET'S CONNECT</p>
                    <h3>Admission Enquiry</h3>
                  </div>
                </div>
                <p className="form-description">
                  Share your details and questions. Our school team will get in
                  touch.
                </p>

                {formSubmitted ? (
                  <div
                    className="form-success"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="form-icon">
                      <Check size={22} />
                    </span>
                    <h3>Thank you! Your enquiry has been submitted.</h3>
                    <p>
                      Your details have been sent to Royal Heights Higher
                      Secondary School. The school team can contact you using
                      the phone number or email provided.
                    </p>
                    <p>
                      <strong>Parent / guardian:</strong> {form.parentName}
                    </p>
                    <p>
                      <strong>Class of interest:</strong> {form.className}
                    </p>
                    <p>
                      <strong>Enquiry topic:</strong> {form.topic}
                    </p>
                    <button
                      className="button button-maroon form-submit"
                      type="button"
                      onClick={resetEnquiryForm}
                    >
                      Send Another Enquiry <ArrowRight size={17} />
                    </button>
                  </div>
                ) : (
                  <form className="admission-form" onSubmit={handleEnquiry}>
                    <label>
                      Parent / Guardian Name *
                      <input
                        required
                        type="text"
                        name="parentName"
                        value={form.parentName}
                        onChange={updateEnquiryField}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        maxLength={100}
                      />
                    </label>

                    <label>
                      Phone Number *
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={updateEnquiryField}
                        pattern="[0-9+() -]{8,18}"
                        placeholder="Enter contact number"
                        autoComplete="tel"
                      />
                    </label>

                    <label>
                      Email Address{" "}
                      <span className="optional-label">Optional</span>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={updateEnquiryField}
                        placeholder="Enter email address"
                        autoComplete="email"
                      />
                    </label>

                    <label>
                      Class of Interest *
                      <select
                        required
                        name="className"
                        value={form.className}
                        onChange={updateEnquiryField}
                      >
                        <option value="">Select a class</option>
                        {admissionClassOptions.map((className) => (
                          <option key={className} value={className}>
                            {className}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Enquiry Topic *
                      <select
                        required
                        name="topic"
                        value={form.topic}
                        onChange={updateEnquiryField}
                      >
                        <option value="Admission Process">
                          Admission Process
                        </option>
                        <option value="Fee Structure">Fee Structure</option>
                        <option value="Documents Required">
                          Documents Required
                        </option>
                        <option value="Class Availability">
                          Class Availability
                        </option>
                        <option value="Transport">Transport</option>
                        <option value="Other">Other Question</option>
                      </select>
                    </label>

                    <label>
                      Your Question *
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={updateEnquiryField}
                        rows="4"
                        required
                        maxLength={1500}
                        placeholder="Tell us what you would like to know..."
                      />
                    </label>

                    {formError && (
                      <p
                        className="form-status"
                        role="alert"
                        aria-live="polite"
                      >
                        {formError}
                      </p>
                    )}

                    <button
                      className="button button-maroon form-submit"
                      type="submit"
                      disabled={formSubmitting}
                    >
                      {formSubmitting ? "Submitting…" : "Submit Enquiry"}
                      {!formSubmitting && <ArrowRight size={17} />}
                    </button>

                    <p className="form-disclaimer">
                      Your information will be securely submitted to the school
                      for admission enquiry follow-up.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CAMPUS LIFE */}
        {/* CAMPUS LIFE */}
        <section className="section campus-section" id="campus">
          <div className="section-container">
            <SectionHeading
              eyebrow="BEYOND THE CLASSROOM"
              title="Find what makes you, you."
              description="Sports, creativity, science, music and shared experiences — explore the many ways students can discover their interests beyond the classroom."
            />

            <div className="campus-experience-heading">
              <span>DISCOVER YOUR WORLD</span>
              <span>
                06 EXPERIENCES <ArrowDown size={15} />
              </span>
            </div>

            <div className="experience-grid">
              {experiences.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.slug} delay={index * 0.06}>
                    <motion.a
                      href={`/campus-life/${item.slug}`}
                      className={`experience-card experience-card-${index + 1}`}
                      whileHover={
                        reduceMotion
                          ? {}
                          : { y: -6, transition: { duration: 0.25 } }
                      }
                      aria-label={`Explore ${item.title}`}
                    >
                      <img
                        src={item.image}
                        alt={`${item.title} illustrative photograph`}
                        loading="lazy"
                      />

                      <div className="experience-shade" />

                      <span className="experience-icon">
                        <Icon size={21} />
                      </span>

                      <div className="experience-copy">
                        <span>{item.category}</span>
                        <h3>{item.title}</h3>
                      </div>

                      <span className="experience-arrow">
                        <ArrowUpRight size={21} />
                      </span>
                    </motion.a>
                  </Reveal>
                );
              })}
            </div>

            <div className="campus-experience-bottom">
              <span>
                <Sparkles size={17} />
                LEARN · CREATE · DISCOVER
              </span>

              <a href="/campus-life/sports">
                Explore campus experiences <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>

        {/* FACILITIES */}
        <section className="section facilities-section" id="facilities">
          <div className="section-container">
            <SectionHeading
              eyebrow="A supportive environment"
              title="Designed around the way students grow."
              description="Explore the areas families may want to learn about. Actual facilities, equipment and safety arrangements should be verified before publishing them as school offerings."
            />
            <div className="facilities-grid">
              {facilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.06}>
                    <article className="facility-item">
                      <div className="facility-icon">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* INNOVATION */}
        <section className="section innovation-section" id="innovation">
          <div className="section-container innovation-layout">
            <Reveal className="innovation-copy">
              <p className="eyebrow eyebrow-light">
                Curiosity meets possibility
              </p>
              <h2>Preparing curious minds for a changing world.</h2>
              <p>
                The future rewards curiosity, thoughtful problem-solving and the
                ability to learn new things. Introduce students to technology,
                creativity and ideas that help them explore the world around
                them.
              </p>
              <a href="#contact" className="button button-gold">
                Ask About Learning <ArrowRight size={18} />
              </a>
              <div className="innovation-decoration">IDEAS → IMPACT</div>
            </Reveal>
            <div className="innovation-cards">
              {innovationCards.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.number} delay={index * 0.12}>
                    <article className="innovation-card">
                      <span>{item.number}</span>
                      <Icon size={27} />
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* EVENTS */}
        <section className="section events-section" id="events">
          <div className="section-container">
            <SectionHeading
              eyebrow="What's happening"
              title="A school year full of possibilities."
              description="Find school announcements, celebrations, important dates and updates here. Event dates will be published after confirmation."
            />
            <div className="events-grid">
              <Reveal>
                <article className="event-card event-featured">
                  <img
                    src="https://res.cloudinary.com/trcybfpw/image/upload/v1793885892/DSC_7151.JPG-1mb.jpg"
                    alt="Illustrative school community celebration"
                    loading="lazy"
                  />
                  <div className="event-featured-overlay" />
                  <div className="event-featured-copy">
                    <span>
                      <CalendarDays size={15} /> SCHOOL COMMUNITY
                    </span>
                    <h3>Moments that bring us together.</h3>
                    <p>Celebrations, activities and shared experiences.</p>
                  </div>
                </article>
              </Reveal>
              <div className="event-side">
                {[
                  {
                    icon: CalendarDays,
                    title: "School Calendar",
                    text: "Important dates, holidays and school activities.",
                  },
                  {
                    icon: Images,
                    title: "Photo Highlights",
                    text: "A visual look at school life and celebrations.",
                  },
                  {
                    icon: Mail,
                    title: "Announcements",
                    text: "Verified notices and important school updates.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={index * 0.08}>
                      <a
                        href={
                          item.title === "School Calendar"
                            ? "#/school-calendar"
                            : item.title === "Photo Highlights"
                              ? "/gallery"
                              : "#contact"
                        }
                        className="event-link-card"
                      >
                        <span className="event-link-icon">
                          <Icon size={23} />
                        </span>

                        <span className="event-link-copy">
                          <strong>{item.title}</strong>
                          <span>{item.text}</span>
                        </span>

                        <ArrowUpRight size={18} />
                      </a>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="section gallery-section" id="gallery">
          <div className="section-container">
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="A glimpse of school life"
                title="Little moments. Big memories."
              />
              <span className="gallery-label">
                <Images size={17} /> PHOTO GALLERY
              </span>
            </div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <motion.button
                  type="button"
                  key={`${item.title}-${index}`}
                  className={`gallery-item gallery-item-${index + 1}`}
                  onClick={() => setActiveImage(index)}
                  whileHover={reduceMotion ? {} : { scale: 0.985 }}
                  aria-label={`Open image: ${item.title}`}
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className="gallery-overlay">
                    <span>
                      <small>{item.category}</small>
                      <strong>{item.title}</strong>
                    </span>
                    <span className="gallery-open">
                      <ArrowUpRight size={21} />
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* FACULTY */}
        <section className="section faculty-section" id="faculty">
          <div className="section-container faculty-layout">
            <Reveal>
              <p className="eyebrow">The people behind the journey</p>
              <h2>Great learning begins with guidance and encouragement.</h2>
              <p className="body-copy">
                The faculty section can introduce the school's leadership,
                teachers, qualifications and approach to professional growth.
                Real names, photographs and credentials will be added after
                school approval.
              </p>
              <a href="#contact" className="text-link">
                Ask about our faculty <ArrowRight size={17} />
              </a>
            </Reveal>
            <Reveal delay={0.12} className="faculty-image">
              <img
                src="https://res.cloudinary.com/trcybfpw/image/upload/v1793786683/_DSC6037.JPG.jpg"
                alt="Illustrative teacher supporting students"
                loading="lazy"
              />
              <div className="faculty-image-caption">
                <Users size={22} />
                <span>
                  <strong>Learning together</strong>
                  <small>Teachers · Students · Families</small>
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SUPPORTING LINKS */}
        <section className="section resources-section" id="resources">
          <div className="section-container">
            <SectionHeading
              eyebrow="Useful information"
              title="Everything families need to find."
              description="Quick access to the school's supporting information and resources."
            />
            <div className="resources-grid">
              {[
                [
                  "Careers",
                  "Teaching and non-teaching opportunities.",
                  "/careers",
                ],
                [
                  "School Documents",
                  "Prospectus, calendar and verified notices.",
                  "#contact",
                ],
              ].map(([title, text, href], index) => (
                <Reveal key={title} delay={index * 0.05}>
                  <a className="resource-card" href={href}>
                    <span className="resource-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{title}</strong>
                    <span>{text}</span>
                    <ArrowUpRight size={18} />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section faq-section" id="faq">
          <div className="section-container faq-layout">
            <div>
              <SectionHeading
                eyebrow="Questions answered"
                title="A little clarity goes a long way."
                description="Useful starting points for families exploring the school."
              />
              <a href="#contact" className="text-link">
                Have another question? Contact us <ArrowRight size={17} />
              </a>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    className={`faq-item ${isOpen ? "faq-open" : ""}`}
                    key={faq.q}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={19} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="faq-answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
                        >
                          <p>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta">
          <div className="final-cta-pattern" />
          <Reveal className="final-cta-content">
            <span className="final-cta-icon">
              <GraduationCap size={30} />
            </span>
            <p className="eyebrow eyebrow-light">Your family's next chapter</p>
            <h2>Let's discover what's possible, together.</h2>
            <p>
              Start a conversation with Royal Heights Higher Secondary School to
              learn more about admissions and the school experience.
            </p>
            <a href="#contact" className="button button-gold">
              Connect With the School <ArrowRight size={18} />
            </a>
          </Reveal>
        </section>

        {/* CONTACT */}

        {/* CONTACT & VISIT THE SCHOOL */}
        <section className="section contact-section" id="contact">
          <div className="section-container">
            <div className="contact-intro">
              <Reveal>
                <p className="eyebrow">COME SAY HELLO</p>
                <h2>Find us. Visit us. Let's connect.</h2>
                <p>
                  Planning a school visit or looking for admission information?
                  Find our location and get in touch with the Royal Heights
                  team.
                </p>
              </Reveal>
            </div>

            <div className="school-location-grid">
              {/* LEFT: SCHOOL INFORMATION */}
              <Reveal className="school-info-panel">
                <div className="location-brand">
                  <div className="location-logo-frame">
                    <img
                      src="/images/logo.jpeg"
                      alt="Royal Heights Higher Secondary School logo"
                    />
                  </div>
                  <div>
                    <span className="eyebrow">WELCOME TO</span>
                    <h3>{school.fullName}</h3>
                    <p className="location-city">
                      <MapPin size={15} />
                      Zirapur, Madhya Pradesh
                    </p>
                  </div>
                </div>

                <div className="location-divider" />

                <a
                  className="school-detail-row"
                  href={school.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="school-detail-icon">
                    <MapPin size={21} />
                  </span>
                  <span className="school-detail-copy">
                    <small>SCHOOL ADDRESS</small>
                    <strong>{school.address}</strong>
                    <span className="detail-action">
                      View location <ArrowUpRight size={14} />
                    </span>
                  </span>
                </a>

                <a
                  className="school-detail-row"
                  href={`tel:${school.phone.replace(/[\s-]/g, "")}`}
                >
                  <span className="school-detail-icon">
                    <Phone size={21} />
                  </span>
                  <span className="school-detail-copy">
                    <small>CALL THE SCHOOL</small>
                    <strong>{school.phone}</strong>
                    <span className="detail-action">
                      Tap to call <ArrowUpRight size={14} />
                    </span>
                  </span>
                </a>

                <a
                  className="school-detail-row"
                  href={`mailto:${school.email}`}
                >
                  <span className="school-detail-icon">
                    <Mail size={21} />
                  </span>
                  <span className="school-detail-copy">
                    <small>EMAIL ENQUIRIES</small>
                    <strong>{school.email}</strong>
                    <span className="detail-action">
                      Send an email <ArrowUpRight size={14} />
                    </span>
                  </span>
                </a>

                <div className="school-detail-row">
                  <span className="school-detail-icon">
                    <Clock3 size={21} />
                  </span>
                  <span className="school-detail-copy">
                    <small>SCHOOL HOURS</small>
                    <strong>{school.hours}</strong>
                    <span className="hours-note">
                      <span className="hours-dot" />
                      Weekly schedule
                    </span>
                  </span>
                </div>

                <button
                  type="button"
                  className="school-detail-row udise-row"
                  onClick={() => {
                    navigator.clipboard.writeText(school.udise);
                  }}
                >
                  <span className="school-detail-icon">
                    <ShieldCheck size={21} />
                  </span>
                  <span className="school-detail-copy">
                    <small>UDISE SCHOOL CODE</small>
                    <strong>{school.udise}</strong>
                    <span className="detail-action">
                      Copy school code <ArrowRight size={14} />
                    </span>
                  </span>
                  <span className="copy-code-icon">
                    <ArrowUpRight size={17} />
                  </span>
                </button>

                <a
                  className="button button-maroon location-directions"
                  href={school.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Compass size={19} />
                  Get Directions on Google Maps
                  <ArrowUpRight size={17} />
                </a>
              </Reveal>

              {/* RIGHT: ANIMATED MAP CARD */}
              <Reveal className="school-map-column" delay={0.12}>
                <div className="school-map-card">
                  <div className="map-topbar">
                    <div className="map-live-indicator">
                      <span className="hours-dot" />
                      <span>FIND OUR CAMPUS</span>
                    </div>
                    <span className="map-topbar-icon">
                      <MapPin size={17} />
                    </span>
                  </div>

                  <div className="map-frame">
                    <iframe
                      title="Royal Heights Higher Secondary School location on Google Maps"
                      src="https://maps.google.com/maps?q=Royal%20Heights%20Higher%20Secondary%20School%2C%2029CC%2BG7F%2C%20Machhalpur%20Road%2C%20Zirapur%2C%20Madhya%20Pradesh%20465691&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                    <div className="map-location-badge">
                      <motion.span
                        className="map-pin-pulse"
                        animate={
                          reduceMotion
                            ? {}
                            : { scale: [1, 1.18, 1], opacity: [0.7, 0.25, 0.7] }
                        }
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <span className="map-pin-icon">
                        <MapPin size={25} fill="currentColor" />
                      </span>
                    </div>
                  </div>

                  <div className="map-bottom-card">
                    <div className="map-bottom-icon">
                      <GraduationCap size={26} />
                    </div>
                    <div className="map-bottom-copy">
                      <span>YOUR DESTINATION</span>
                      <strong>Royal Heights, Zirapur</strong>
                      <p>Machhalpur Road · Rajgarh, M.P. 465691</p>
                    </div>
                    <a
                      href={school.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open school location in Google Maps"
                      className="map-open-button"
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  </div>
                </div>

                <div className="map-visit-note">
                  <span className="visit-note-icon">
                    <CalendarDays size={20} />
                  </span>
                  <div>
                    <strong>Planning a visit?</strong>
                    <p>
                      Check the school hours and contact the school before
                      visiting to confirm availability.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-container">
          <div className="footer-main">
            <a href="#home" className="footer-brand">
              <img src="/images/logo.jpeg" alt="" />
              <span>
                <strong>ROYAL HEIGHTS</strong>
                <small>HIGHER SECONDARY SCHOOL</small>
              </span>
            </a>
            <p className="footer-intro">
              Inspiring curiosity, encouraging growth and helping every student
              discover new possibilities.
            </p>
            <a href="#home" className="back-to-top">
              Back to top <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="footer-links">
            <div>
              <strong>EXPLORE</strong>
              {navigation
                .slice(0, 5)
                .filter((item) => item.label !== "Academics")
                .map((item) => (
                  <a href={item.href} key={item.label}>
                    {item.label}
                  </a>
                ))}
            </div>
            <div>
              <strong>DISCOVER</strong>
              <a href="#facilities">Facilities</a>
              <a href="#events">News & Events</a>
              <a href="/gallery">Photo Gallery</a>
              <a href="/faculty">Our Faculty</a>
            </div>
            <div>
              <strong>INFORMATION</strong>
              <a href="#resources">Careers & Alumni</a>
              <a href="#faq">Frequently Asked Questions</a>
              <a href="#contact">Contact & Enquiries</a>
            </div>
            <div className="footer-legal-links">
              <strong>PRIVACY & SUPPORT</strong>
              <a href="#privacy-policy">Privacy Policy</a>
              <a href="#grievance-information">Grievance Redressal</a>
              <a href={`mailto:${school.email}`}>Email the School</a>
              <a href={`tel:${school.phone.replace(/[^+\d]/g, "")}`}>
                Call the School
              </a>
            </div>
          </div>
          <section
            className="footer-policy-panel"
            id="privacy-policy"
            aria-labelledby="footer-policy-title"
          >
            <div className="footer-policy-copy">
              <span className="footer-policy-eyebrow">
                YOUR PRIVACY MATTERS
              </span>
              <h3 id="footer-policy-title">Privacy Policy</h3>
              <p>
                Information submitted through this website's enquiry or
                admission forms is used to respond to your request and support
                school-related communication. Please provide only information
                necessary for your enquiry. Do not submit passwords, payment
                details or other sensitive information through general enquiry
                forms.
              </p>
              <p>
                The school should review and publish its final privacy policy,
                including its data retention, access, correction and deletion
                practices, before collecting personal information online.
              </p>
            </div>
            <div className="footer-grievance-copy" id="grievance-information">
              <span className="footer-policy-eyebrow">CONTACT & GRIEVANCE</span>
              <h3>Need help or want to raise a concern?</h3>
              <p>
                For website, privacy or general school enquiries, contact Royal
                Heights Higher Secondary School using the details below. Please
                include enough information to help the school understand your
                concern, but avoid sending sensitive personal documents unless
                requested through an appropriate channel.
              </p>
              <a href={`mailto:${school.email}`}>
                <Mail size={16} /> {school.email}
              </a>
              <a href={`tel:${school.phone.replace(/[^+\d]/g, "")}`}>
                <Phone size={16} /> {school.phone}
              </a>
              <p className="footer-grievance-note">
                The school should confirm and publish the designated grievance
                officer/contact person and expected response timeline before
                launch.
              </p>
            </div>
          </section>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {school.fullName}. All rights
              reserved.
            </span>
            <span>{school.location}</span>
          </div>
        </div>
      </footer>

      {/* Animated WhatsApp, click-to-call and enquiry shortcuts */}
      <style>{`
        .footer-legal-links a { display: block; }
        .footer-policy-panel {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 32px;
          margin: 34px 0 24px;
          padding: 28px;
          border: 1px solid rgba(177, 132, 67, 0.25);
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(250, 243, 231, 0.85), rgba(255, 253, 250, 0.98));
        }
        .footer-policy-panel h3 {
          margin: 9px 0 12px;
          color: #4d1921;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(21px, 2vw, 28px);
          font-weight: 500;
        }
        .footer-policy-panel p {
          color: #77675c;
          font-size: 13px;
          line-height: 1.8;
        }
        .footer-policy-eyebrow {
          color: #a87835;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }
        .footer-grievance-copy > a {
          display: flex;
          align-items: center;
          gap: 9px;
          width: fit-content;
          margin: 10px 0;
          color: #76232d;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }
        .footer-policy-panel .footer-grievance-note {
          margin-top: 15px;
          font-size: 11px;
        }
        @media (max-width: 700px) {
          .footer-policy-panel { grid-template-columns: 1fr; padding: 20px; gap: 22px; }
        }
        .school-contact-dock {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 1200;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 11px;
        }
        .school-contact-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 49px;
          padding: 0 17px;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 999px;
          color: #fff;
          text-decoration: none;
          font: inherit;
          font-size: 13px;
          font-weight: 750;
          box-shadow: 0 10px 28px rgba(46, 20, 22, .2);
          transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
          animation: schoolContactEnter .55s both;
          -webkit-tap-highlight-color: transparent;
        }
        .school-contact-action:hover {
          transform: translateY(-4px) scale(1.025);
          box-shadow: 0 15px 34px rgba(46, 20, 22, .26);
          filter: brightness(1.06);
        }
        .school-contact-action:focus-visible {
          outline: 3px solid #e8c98e;
          outline-offset: 4px;
        }
        .school-contact-action svg { flex-shrink: 0; }
        .school-contact-whatsapp {
          background: #168653;
          animation-delay: .08s;
        }
        .school-contact-call {
          background: #76232d;
          animation-delay: .16s;
        }
        .school-contact-enquiry {
          background: #b18443;
          color: #fffdfa;
          animation-delay: .24s;
        }
        .school-contact-whatsapp .school-contact-pulse {
          position: relative;
          display: inline-flex;
        }
        .school-contact-whatsapp .school-contact-pulse::after {
          position: absolute;
          inset: -5px;
          border: 1px solid rgba(255,255,255,.65);
          border-radius: 50%;
          content: "";
          animation: schoolWhatsAppPulse 2.2s ease-out infinite;
        }
        @keyframes schoolContactEnter {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes schoolWhatsAppPulse {
          0% { transform: scale(.8); opacity: .8; }
          80%, 100% { transform: scale(1.55); opacity: 0; }
        }
        @media (max-width: 640px) {
          .school-contact-dock {
            right: 12px;
            bottom: max(12px, env(safe-area-inset-bottom));
            gap: 9px;
          }
          .school-contact-action {
            min-height: 46px;
            padding: 0 14px;
            font-size: 12px;
          }
          .school-contact-action svg { width: 19px; height: 19px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .school-contact-action,
          .school-contact-whatsapp .school-contact-pulse::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="school-contact-dock" aria-label="Contact Royal Heights">
        <motion.a
          href="https://wa.me/918720024123?text=Hello%20Royal%20Heights%20Higher%20Secondary%20School%2C%20I%20would%20like%20to%20enquire%20about%20admissions."
          className="school-contact-action school-contact-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send an admission enquiry on WhatsApp"
          whileHover={reduceMotion ? {} : { y: -3, scale: 1.025 }}
          whileTap={reduceMotion ? {} : { scale: 0.97 }}
        >
          <span className="school-contact-pulse">
            <MessageCircle size={21} />
          </span>
          <span>WhatsApp Enquiry</span>
          <ArrowUpRight size={16} />
        </motion.a>

        <motion.a
          href="tel:+918720024123"
          className="school-contact-action school-contact-call"
          aria-label="Call Royal Heights at plus 91 87200 24123"
          whileHover={reduceMotion ? {} : { y: -3, scale: 1.025 }}
          whileTap={reduceMotion ? {} : { scale: 0.97 }}
        >
          <Phone size={20} />
          <span>Call the School</span>
        </motion.a>

        <motion.a
          href="#contact"
          className="school-contact-action school-contact-enquiry"
          aria-label="Go to the school enquiry form"
          whileHover={reduceMotion ? {} : { y: -3, scale: 1.025 }}
          whileTap={reduceMotion ? {} : { scale: 0.97 }}
        >
          <Mail size={19} />
          <span>Let's Talk</span>
          <ArrowUpRight size={16} />
        </motion.a>
      </div>

      {/* Gallery lightbox */}
      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setActiveImage(null)}
              aria-label="Close image"
            >
              <X size={25} />
            </button>
            <button
              type="button"
              className="lightbox-prev"
              onClick={(event) => {
                event.stopPropagation();
                changeImage(-1);
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={26} />
            </button>
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={gallery[activeImage].image}
                alt={gallery[activeImage].title}
              />
              <div>
                <span>{gallery[activeImage].category}</span>
                <h3>{gallery[activeImage].title}</h3>
              </div>
            </motion.div>
            <button
              type="button"
              className="lightbox-next"
              onClick={(event) => {
                event.stopPropagation();
                changeImage(1);
              }}
              aria-label="Next image"
            >
              <ChevronRight size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
