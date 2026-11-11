import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize,
  Minimize,
  Minus,
  Plus,
  Play,
  Search,
  Sparkles,
  Video,
  Images,
  X,
} from "lucide-react";
import "./GalleryLibrary.css";

const galleryItemsSource = [
  {
    id: 1,
    title: "A Beautiful Day at School",
    category: "Campus",
    type: "photo",
    date: "School Campus",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1794369328/IMG_8237.jpg-9mb_1.jpg",
    description: "A glimpse of our welcoming learning environment.",
    featured: true,
  },
  {
    id: 2,
    title: "Learning Together",
    category: "Classroom",
    type: "photo",
    date: "Classroom Moments",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793786683/_DSC6037.JPG.jpg",
    description: "Students discovering new ideas in the classroom.",
  },
  {
    id: 3,
    title: "Sports and Team Spirit",
    category: "Sports",
    type: "photo",
    date: "Sports Activities",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793880798/DSC_4639.JPG.jpg",
    description: "Celebrating teamwork, energy and participation.",
  },
  {
    id: 4,
    title: "Creative Minds",
    category: "Activities",
    type: "photo",
    date: "Student Activities",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1794369512/IMG-20260421-WA0258.jpg.jpg",
    description: "Creativity and imagination in action.",
  },
  {
    id: 5,
    title: "Together We Celebrate",
    category: "Events",
    type: "photo",
    date: "School Celebrations",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1794370849/DSC_6827.JPG-9mb.jpg",
    description: "Special moments and memories from our community.",
  },
  {
    id: 6,
    title: "The Joy of Reading",
    category: "Classroom",
    type: "photo",
    date: "Learning Moments",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793786428/_DSC6040.JPG.jpg",
    description: "Encouraging curiosity through books and learning.",
  },
  {
    id: 7,
    title: "Outdoor Learning",
    category: "Activities",
    type: "photo",
    date: "Beyond the Classroom",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1794369524/IMG-20260421-WA0265.jpg.jpg",
    description: "Learning, exploring and discovering the world.",
  },
  {
    id: 8,
    title: "A Place to Grow",
    category: "Campus",
    type: "photo",
    date: "Our Campus",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1794369406/IMG20241108162448.jpg.jpg",
    description: "An inspiring space for every learner.",
  },
  {
    id: 9,
    title: "Celebrating Success",
    category: "Events",
    type: "photo",
    date: "School Events",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1794371269/DSC_6828.JPG-9mb.jpg",
    description: "Recognising effort, progress and achievement.",
  },
  {
    id: 10,
    title: "Creative Classroom",
    category: "Classroom",
    type: "photo",
    date: "Learning Activities",
    image:
      "https://res.cloudinary.com/trcybfpw/image/upload/v1793786437/_DSC6041.JPG.jpg",
    description: "An engaging environment for young minds.",
  },
  {
    id: 11,
    title: "A Special Movie Experience",
    category: "Activities",
    type: "video",
    date: "School Life",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90",
    description:
      "Students enjoyed the Hanuman film and connected with Indian culture, courage and values.",
    videoUrl:
      "https://res.cloudinary.com/trcybfpw/video/upload/v1792739882/savefromins.com_Royal_Heights_Higher_Secondary_School_Zirapur_के_विद्यार्थियों_ने_हनुमान_फिल्म_का_आनंद_लिया___मनोरंजन_के_साथ_भारतीय_संस्कृति_साहस_और_संस्कारों_से_जुड़ने_का_एक_यादगार_अनुभव_️___कुछ_पल_पढ.mp4",
  },
  {
    id: 12,
    title: "Investiture Ceremony",
    category: "Events",
    type: "video",
    date: "Student Leadership",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=90",
    description:
      "A proud celebration of leadership, responsibility and new beginnings.",
    videoUrl:
      "https://res.cloudinary.com/trcybfpw/video/upload/v1792739727/savefromins.com_A_proud_moment_of_leadership_responsibility_and_new_beginnings_%EF%B8%8F___The_Investiture_Ceremony_at_Royal_Heights_Higher_Secondary_School_celebrated_our_young_leaders_as_they_stepped_forward_to_le.mp4",
  },
  {
    id: 13,
    title: "Exam Day at Royal Heights",
    category: "Classroom",
    type: "video",
    date: "Academic Moments",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=90",
    description:
      "Focused minds and confident smiles — every exam is an opportunity to learn and grow.",
    videoUrl:
      "https://res.cloudinary.com/trcybfpw/video/upload/v1792739240/savefromins.com_Exam_Day_at_Royal_Heights__Focused_minds_confident_smiles_a_step_closer_to_success.__Every_exam_is_an_opportunity_to_learn_grow_and_shine____RoyalHeights_ExamDay_SchoolLife_Stude.mp4",
  },
  {
    id: 14,
    title: "Shaping Young Minds, Building Bright Futures",
    category: "Campus",
    type: "video",
    date: "Our School",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1800&q=90",
    description:
      "Where knowledge meets creativity, values inspire excellence and every student gets an opportunity to shine.",
    videoUrl:
      "https://res.cloudinary.com/trcybfpw/video/upload/v1792739071/savefromins.com_Royal_Heights_Higher_Secondary_School_Zirapur____Shaping_Young_Minds_Building_Bright_Futures__Where_knowledge_meets_creativity_values_inspire_excellence_and_every_student_gets_the_opp.mp4",
  },
  {
    id: 15,
    title: "Navdurga – Nine Divine Forms",
    category: "Activities",
    type: "video",
    date: "Cultural Celebration",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=90",
    description:
      "A beautiful presentation by our students celebrating the nine forms of Maa Durga, devotion and Indian culture.",
    videoUrl:
      "https://res.cloudinary.com/trcybfpw/video/upload/v1792739165/savefromins.com_नवदुर्गा_के_नौ_रूप_शक्ति_और_भक्ति_का_अनमोल_संगम___रॉयल_स्कूल_के_नन्हे_सितारों_द्वारा_माँ_दुर्गा_के_नौ_दिव्य_स्वरूपों_की_मनमोहक_प्रस्तुति_️___माँ_दुर्गा_सभी_पर_अपनी_कृपा_बनाए_रखें_और_ज.mp4",
  },
  {
    id: 16,
    title: "Career Counselling Session",
    category: "Events",
    type: "video",
    date: "November 2025",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90",
    description:
      "A guidance session helping students explore career paths and plan their future.",
    videoUrl:
      "https://res.cloudinary.com/trcybfpw/video/upload/v1793886721/career_consuling_nov_2025_share.mp4",
  },
  {
    id: 17,
    title: "Dandiya Night 2025",
    category: "Events",
    type: "video",
    date: "Cultural Celebration · 2025",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=90",
    description:
      "A colourful evening of traditional dance, music and school celebrations.",
    videoUrl:
      "https://res.cloudinary.com/trcybfpw/video/upload/v1793886899/Dandiya_Night_2025_share.mp4",
  },
  {
    id: 18,
    title: "School Moments – April 2026",
    category: "Activities",
    type: "video",
    date: "7 April 2026",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90",
    description:
      "A glimpse of student activities and memorable moments at Royal Heights.",
    videoUrl:
      "https://res.cloudinary.com/trcybfpw/video/upload/v1793886952/lv_0_20260407162432.mp4",
  },
  {
    id: 19,
    title: "Royal Heights – School Highlights",
    category: "Campus",
    type: "video",
    date: "21 April 2026",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1800&q=90",
    description:
      "More highlights capturing learning, participation and everyday school life.",
    videoUrl:
      "https://res.cloudinary.com/trcybfpw/video/upload/v1793887011/lv_0_20260421091710.mp4",
  },
];

// Video cards render a paused frame from their own source video (see VideoCardThumbnail).
// This avoids Cloudinary JPG transformation failures and always uses the real video as its banner.
const galleryItems = galleryItemsSource;

const categories = [
  "All",
  "Campus",
  "Classroom",
  "Sports",
  "Activities",
  "Events",
];
const qualityOptions = [
  { label: "HD", width: 1280, imageWidth: 1200, quality: 80 },
  { label: "Full HD", width: 1920, imageWidth: 1800, quality: 90 },
  { label: "Original", width: null, imageWidth: 2400, quality: 100 },
];

function getQualityImage(url, quality) {
  if (!url || !url.includes("images.unsplash.com")) return url;
  const selected = qualityOptions.find((item) => item.label === quality);
  if (!selected) return url;
  const parsed = new URL(url);
  parsed.searchParams.set("w", selected.imageWidth);
  parsed.searchParams.set("q", selected.quality);
  parsed.searchParams.set("fit", "crop");
  return parsed.toString();
}

// Cloudinary video transformations are applied to the uploaded original.
// Original keeps the exact source URL; HD/Full HD request resized encodes.
function getQualityVideo(url) {
  // Keep the original Cloudinary URL unchanged for maximum compatibility.
  return url || "";
}

function VideoCardThumbnail({ item }) {
  const handleMetadata = (event) => {
    const video = event.currentTarget;
    // Seek a little into the clip so the card shows a representative frame, not a black opening frame.
    if (Number.isFinite(video.duration) && video.duration > 0) {
      const target = Math.min(1.5, Math.max(0.2, video.duration * 0.1));
      try {
        video.currentTime = target;
      } catch {
        /* Browser will show the first available frame. */
      }
    }
  };

  return (
    <video
      className="gallery-card-video-thumbnail"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
      src={item.videoUrl}
      muted
      playsInline
      preload="metadata"
      onLoadedMetadata={handleMetadata}
      onSeeked={(event) => event.currentTarget.pause()}
      aria-label={`${item.title} video preview`}
    />
  );
}

function GalleryLibrary() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [quality, setQuality] = useState("Full HD");
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const playbackRef = useRef({ time: 0, wasPlaying: false });

  const filteredItems = useMemo(() => {
    let result = galleryItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesType =
        activeType === "All" || item.type === activeType.toLowerCase();
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.date.toLowerCase().includes(search);
      return matchesCategory && matchesType && matchesSearch;
    });
    if (sortOrder === "az")
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    if (sortOrder === "za")
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    return result;
  }, [activeCategory, activeType, searchTerm, sortOrder]);

  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, 8);
  const photoCount = galleryItems.filter(
    (item) => item.type === "photo",
  ).length;
  const videoCount = galleryItems.filter(
    (item) => item.type === "video",
  ).length;
  const currentIndex = selectedItem
    ? filteredItems.findIndex((item) => item.id === selectedItem.id)
    : -1;
  const currentVideoUrl =
    selectedItem?.type === "video"
      ? getQualityVideo(selectedItem.videoUrl, quality)
      : "";

  const openItem = (item) => {
    setSelectedItem(item);
    setZoom(1);
    setDownloadMessage("");
    setQuality("Full HD");
  };

  const closeItem = useCallback(() => {
    setSelectedItem(null);
    setZoom(1);
    setIsFullscreen(false);
    setDownloadMessage("");
    playbackRef.current = { time: 0, wasPlaying: false };
  }, []);

  const navigateItem = useCallback(
    (direction) => {
      if (!selectedItem || filteredItems.length === 0) return;
      const index = filteredItems.findIndex(
        (item) => item.id === selectedItem.id,
      );
      const nextIndex =
        (index + direction + filteredItems.length) % filteredItems.length;
      setSelectedItem(filteredItems[nextIndex]);
      setZoom(1);
      setDownloadMessage("");
      setQuality("Full HD");
    },
    [selectedItem, filteredItems],
  );

  const changeQuality = (nextQuality) => {
    if (!selectedItem) return;
    if (selectedItem.type === "video" && videoRef.current) {
      playbackRef.current = {
        time: videoRef.current.currentTime || 0,
        wasPlaying: !videoRef.current.paused,
      };
    }
    setQuality(nextQuality);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || selectedItem?.type !== "video") return;
    const restorePlayback = () => {
      const { time, wasPlaying } = playbackRef.current;
      if (Number.isFinite(video.duration) && time > 0)
        video.currentTime = Math.min(time, video.duration);
      if (wasPlaying) video.play().catch(() => {});
    };
    video.addEventListener("loadedmetadata", restorePlayback, { once: true });
    return () => video.removeEventListener("loadedmetadata", restorePlayback);
  }, [currentVideoUrl, selectedItem]);

  const downloadMedia = async () => {
    if (!selectedItem) return;
    const source =
      selectedItem.type === "video"
        ? currentVideoUrl
        : getQualityImage(selectedItem.image, quality);
    try {
      const response = await fetch(source);
      if (!response.ok) throw new Error("Download unavailable");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${selectedItem.title.replace(/[^a-z0-9]/gi, "-")}.${selectedItem.type === "video" ? "mp4" : "jpg"}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
      setDownloadMessage("Download started");
    } catch {
      setDownloadMessage(
        "Direct download is unavailable. Opening media in a new tab.",
      );
      window.open(source, "_blank", "noopener,noreferrer");
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement)
        await mediaRef.current?.requestFullscreen?.();
      else await document.exitFullscreen();
    } catch {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
  };

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveType("All");
    setSearchTerm("");
    setSortOrder("default");
    setShowAll(false);
  };

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeItem();
      if (event.key === "ArrowRight") navigateItem(1);
      if (event.key === "ArrowLeft") navigateItem(-1);
      if (event.key === "+" || event.key === "=")
        setZoom((value) => Math.min(value + 0.2, 3));
      if (event.key === "-") setZoom((value) => Math.max(value - 0.2, 1));
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem, closeItem, navigateItem]);

  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <main className="gallery-library">
      <section className="gallery-hero">
        <div className="gallery-hero-image" />
        <div className="gallery-hero-content">
          <div className="gallery-eyebrow">
            <Sparkles size={15} />
            <span>THE ROYAL HEIGHTS EXPERIENCE</span>
          </div>
          <h1>
            Moments that
            <br />
            become <span>memories.</span>
          </h1>
          <p>
            Explore the vibrant world of Royal Heights — from everyday classroom
            experiences to celebrations, achievements and unforgettable school
            moments.
          </p>
          <div className="gallery-hero-actions">
            <button
              className="gallery-primary-btn"
              onClick={() =>
                document
                  .getElementById("gallery-collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Gallery <ArrowRight size={18} />
            </button>
            <button
              className="gallery-outline-btn"
              onClick={() => {
                setActiveType("Video");
                document
                  .getElementById("gallery-collection")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Play size={16} /> Watch Videos
            </button>
          </div>
        </div>
        <div className="gallery-hero-note">
          <span>ROYAL HEIGHTS</span>
          <span>JEERAPUR · MADHYA PRADESH</span>
        </div>
      </section>

      <section className="gallery-stats">
        <div className="gallery-stat">
          <span className="gallery-stat-icon">
            <Images size={22} />
          </span>
          <div>
            <strong>{photoCount}+</strong>
            <span>Photo Moments</span>
          </div>
        </div>
        <div className="gallery-stat">
          <span className="gallery-stat-icon">
            <Video size={22} />
          </span>
          <div>
            <strong>{videoCount}+</strong>
            <span>Video Highlights</span>
          </div>
        </div>
        <div className="gallery-stat">
          <span className="gallery-stat-icon">
            <Camera size={22} />
          </span>
          <div>
            <strong>{categories.length - 1}</strong>
            <span>Collections</span>
          </div>
        </div>
        <div className="gallery-stat gallery-stat-last">
          <span className="gallery-stat-icon">
            <CalendarDays size={22} />
          </span>
          <div>
            <strong>Every Day</strong>
            <span>New Memories</span>
          </div>
        </div>
      </section>

      <section className="gallery-collection" id="gallery-collection">
        <div className="gallery-section-heading">
          <div>
            <div className="gallery-section-label">
              <span />
              OUR SCHOOL IN PICTURES
            </div>
            <h2>
              Explore our <span>gallery.</span>
            </h2>
            <p>
              Every picture tells a story. Find the moments that make our school
              community special.
            </p>
          </div>
          <div className="gallery-total">
            <strong>{filteredItems.length}</strong>
            <span>Memories found</span>
          </div>
        </div>
        <div className="gallery-toolbar">
          <div className="gallery-search">
            <Search size={19} />
            <input
              type="search"
              placeholder="Search photos, events, activities..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setShowAll(false);
              }}
            />
            {searchTerm && (
              <button
                aria-label="Clear search"
                onClick={() => setSearchTerm("")}
              >
                <X size={17} />
              </button>
            )}
          </div>
          <div className="gallery-type-filters">
            {["All", "Photo", "Video"].map((type) => (
              <button
                key={type}
                className={activeType === type ? "active" : ""}
                onClick={() => {
                  setActiveType(type);
                  setShowAll(false);
                }}
              >
                {type === "Photo" ? (
                  <Images size={15} />
                ) : type === "Video" ? (
                  <Play size={15} />
                ) : (
                  <Sparkles size={15} />
                )}
                {type}
              </button>
            ))}
          </div>
          <select
            className="gallery-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            aria-label="Sort gallery"
          >
            <option value="default">Sort: Default</option>
            <option value="az">Name: A to Z</option>
            <option value="za">Name: Z to A</option>
          </select>
        </div>
        <div className="gallery-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => {
                setActiveCategory(category);
                setShowAll(false);
              }}
            >
              {category}
            </button>
          ))}
        </div>
        {visibleItems.length > 0 ? (
          <div className="gallery-grid">
            {visibleItems.map((item, index) => (
              <button
                type="button"
                className={`gallery-card ${index === 0 ? "gallery-card-featured" : ""}`}
                key={item.id}
                onClick={() => openItem(item)}
                aria-label={`Open ${item.title}`}
              >
                {item.type === "video" ? (
                  <VideoCardThumbnail item={item} />
                ) : (
                  <img
                    src={getQualityImage(item.image, "HD")}
                    alt={item.title}
                    loading="lazy"
                  />
                )}
                <div className="gallery-card-shade" />
                <div className="gallery-card-top">
                  <span className="gallery-card-category">{item.category}</span>
                  {item.type === "video" && (
                    <span className="gallery-video-tag">
                      <Play size={12} fill="currentColor" />
                      VIDEO
                    </span>
                  )}
                </div>
                {item.type === "video" && (
                  <span className="gallery-play-button">
                    <Play size={23} fill="currentColor" />
                  </span>
                )}
                <div className="gallery-card-info">
                  <span>{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="gallery-card-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="gallery-empty">
            <Images size={42} />
            <h3>No memories found</h3>
            <p>Try another search or choose a different category.</p>
            <button onClick={resetFilters}>Clear Filters</button>
          </div>
        )}
        {filteredItems.length > 8 && (
          <div className="gallery-load-more">
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Explore More Moments"}
              {showAll ? <ChevronLeft size={18} /> : <ArrowRight size={18} />}
            </button>
          </div>
        )}
      </section>

      <section className="gallery-memory-banner">
        <div className="gallery-memory-content">
          <span>MORE THAN JUST A SCHOOL</span>
          <h2>
            Every moment is a<br />
            <em>memory in the making.</em>
          </h2>
          <p>
            From little achievements to big celebrations, these moments reflect
            the spirit of our school community.
          </p>
        </div>
        <div className="gallery-memory-decoration">
          <Camera size={74} strokeWidth={1} />
        </div>
      </section>

      {selectedItem && (
        <div className="gallery-lightbox" onClick={closeItem}>
          <button
            className="gallery-lightbox-close"
            onClick={closeItem}
            aria-label="Close preview"
          >
            <X size={25} />
          </button>
          <button
            className="gallery-lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              navigateItem(-1);
            }}
            aria-label="Previous item"
          >
            <ChevronLeft size={28} />
          </button>
          <div
            className="gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gallery-viewer-toolbar">
              <div className="gallery-viewer-quality">
                <span>QUALITY</span>
                {qualityOptions.map((option) => (
                  <button
                    key={option.label}
                    className={quality === option.label ? "active" : ""}
                    onClick={() => changeQuality(option.label)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="gallery-viewer-actions">
                {selectedItem.type === "photo" && (
                  <>
                    <button
                      title="Zoom out"
                      onClick={() =>
                        setZoom((value) => Math.max(1, value - 0.2))
                      }
                      disabled={zoom <= 1}
                    >
                      <Minus size={17} />
                    </button>
                    <span>{Math.round(zoom * 100)}%</span>
                    <button
                      title="Zoom in"
                      onClick={() =>
                        setZoom((value) => Math.min(3, value + 0.2))
                      }
                      disabled={zoom >= 3}
                    >
                      <Plus size={17} />
                    </button>
                  </>
                )}
                <button title="Fullscreen" onClick={toggleFullscreen}>
                  {isFullscreen ? (
                    <Minimize size={18} />
                  ) : (
                    <Maximize size={18} />
                  )}
                </button>
                <button title="Download media" onClick={downloadMedia}>
                  <Download size={18} />
                </button>
              </div>
            </div>
            <div className="gallery-lightbox-media" ref={mediaRef}>
              {selectedItem.type === "video" ? (
                <video
                  key={`${selectedItem.id}-${quality}`}
                  ref={videoRef}
                  src={currentVideoUrl}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                <img
                  src={getQualityImage(selectedItem.image, quality)}
                  alt={selectedItem.title}
                  style={{ transform: `scale(${zoom})` }}
                />
              )}
            </div>
            <div className="gallery-lightbox-caption">
              <div>
                <span>
                  {selectedItem.category} · {selectedItem.date}
                </span>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.description}</p>
                {downloadMessage && (
                  <small className="gallery-download-message">
                    {downloadMessage}
                  </small>
                )}
              </div>
              <span className="gallery-lightbox-count">
                {currentIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
          <button
            className="gallery-lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              navigateItem(1);
            }}
            aria-label="Next item"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}

      <button
        className="gallery-back-home"
        onClick={() => {
          window.location.assign("/");
        }}
      >
        <ArrowLeft size={16} />
        Back to Home
      </button>
    </main>
  );
}

export default GalleryLibrary;
