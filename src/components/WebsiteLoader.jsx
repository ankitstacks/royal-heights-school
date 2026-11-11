
import { useEffect, useState } from "react";
import "./WebsiteLoader.css";

export default function WebsiteLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressValue = 0;
    let progressTimer;
    let finishTimer;
    let fallbackTimer;

    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 12 + 4;
      progressValue = Math.min(progressValue, 90);
      setProgress(Math.round(progressValue));
    }, 160);

    const finishLoading = () => {
      clearInterval(progressInterval);
      clearTimeout(fallbackTimer);

      setProgress(100);

      finishTimer = setTimeout(() => {
        setExiting(true);

        setTimeout(() => {
          setVisible(false);
        }, 650);
      }, 350);
    };

    if (document.readyState === "complete") {
      finishTimer = setTimeout(finishLoading, 700);
    } else {
      window.addEventListener("load", finishLoading, { once: true });

      fallbackTimer = setTimeout(finishLoading, 7000);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(progressTimer);
      clearTimeout(finishTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("load", finishLoading);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`website-loader ${exiting ? "loader-exit" : ""}`}>
      <div className="loader-content">

        <div className="loader-emblem">
          <div className="loader-ring loader-ring-one" />
          <div className="loader-ring loader-ring-two" />

          <div className="loader-icon">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 23L32 10L59 23L32 36L5 23Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M16 29V43C25 51 39 51 48 43V29"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M59 23V40"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="59" cy="44" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="loader-school-name">
          ROYAL HEIGHTS
        </div>

        <div className="loader-subtitle">
          HIGHER SECONDARY SCHOOL
        </div>

        <div className="loader-divider">
          <span />
        </div>

        <p className="loader-message">
          Shaping minds. Inspiring futures.
        </p>

        <div className="loader-progress">
          <div className="loader-progress-track">
            <div
              className="loader-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="loader-progress-info">
            <span>PLEASE WAIT</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="loader-location">
          JEERAPUR · MADHYA PRADESH
        </div>

      </div>
    </div>
  );
}
