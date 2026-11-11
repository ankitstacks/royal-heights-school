
import { useEffect, useState } from "react";
import { X, MessageCircle, Phone, Mail, ArrowUpRight } from "lucide-react";
import "./NewBranchPopup.css";

export default function NewBranchPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("branchPopupShown")) return;

    // Loader ke baad popup show hoga
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("branchPopupShown", "true");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const closePopup = () => setIsOpen(false);

  return (
    <div
      className="branch-popup-overlay"
      onClick={closePopup}
    >
      <div
        className="branch-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="branch-popup-close"
          onClick={closePopup}
          aria-label="Close announcement"
        >
          <X size={21} />
        </button>

        <div className="branch-popup-content">
          <div className="branch-popup-image">
            <img
              src="https://res.cloudinary.com/trcybfpw/image/upload/v1794073216/WhatsApp_Image_2026-11-06_at_5.50.43_PM.jpg"
              alt="Royal Heights International School - New Branch Now Open"
            />
          </div>

          <div className="branch-popup-info">
            <span className="branch-popup-tag">
              <span className="branch-live-dot"></span>
              A NEW CHAPTER BEGINS
            </span>

            <h2>
              Our New Branch
              <span> Is Now Open!</span>
            </h2>

            <p>
              Discover a new standard of learning at Royal Heights
              International School, Zirapur.
            </p>

            <div className="branch-popup-actions">
              <a
                href="https://wa.me/919425659830?text=Hello%20Royal%20Heights%20International%20School%2C%20I%20want%20to%20know%20about%20admission."
                target="_blank"
                rel="noreferrer"
                className="branch-action whatsapp"
              >
                <MessageCircle size={19} />
                WhatsApp Enquiry
                <ArrowUpRight size={17} />
              </a>

              <a
                href="tel:+919425659830"
                className="branch-action call"
              >
                <Phone size={19} />
                Call the School
                <ArrowUpRight size={17} />
              </a>

              <a
                href="/admissions/enquiry"
                className="branch-action talk"
              >
                <Mail size={19} />
                Let's Talk
                <ArrowUpRight size={17} />
              </a>
            </div>

            <button
              className="branch-popup-dismiss"
              onClick={closePopup}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
