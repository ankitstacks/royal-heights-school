import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

import AdmissionProcess from "./pages/admissions/AdmissionProcess.jsx";
import FeesStructure from "./pages/admissions/FeesStructure.jsx";
import OnlineApplication from "./pages/admissions/OnlineApplication.jsx";
import AdmissionEnquiry from "./pages/admissions/AdmissionEnquiry.jsx";

import AcademicOverview from "./pages/academics/AcademicOverview.jsx";
import PrePrimary from "./pages/academics/PrePrimary.jsx";
import PrimarySchool from "./pages/academics/PrimarySchool.jsx";
import MiddleSchool from "./pages/academics/MiddleSchool.jsx";
import SecondarySchool from "./pages/academics/SecondarySchool.jsx";
import SeniorSecondary from "./pages/academics/SeniorSecondary.jsx";
import TeachingMethodology from "./pages/academics/TeachingMethodology.jsx";

import VisionMission from "./pages/about/VisionMission.jsx";
import DirectorMessage from "./pages/about/DirectorMessage.jsx";
import PrincipalMessage from "./pages/about/PrincipalMessage.jsx";
import LeadershipTeam from "./pages/about/LeadershipTeam.jsx";

import BoardResults from "./pages/achievements/BoardResults.jsx";
import AwardsRecognition from "./pages/achievements/AwardsRecognition.jsx";
import AcademicToppers from "./pages/achievements/AcademicToppers.jsx";
import StudentSuccessStories from "./pages/achievements/StudentSuccessStories.jsx";

import Faculty from "./pages/faculty/Faculty.jsx";
import Careers from "./pages/careers/Careers.jsx";
import GalleryLibrary from "./pages/gallery/GalleryLibrary.jsx";
import SchoolCalendar from "./pages/calendar/SchoolCalendar.jsx";

import AdminPanel from "./pages/admin/AdminPanel.jsx";
import AcceptInvitation from "./pages/admin/AcceptInvitation.jsx";

const routes = {
  "/admissions/process": AdmissionProcess,
  "/admissions/fees": FeesStructure,
  "/admissions/apply": OnlineApplication,
  "/admissions/enquiry": AdmissionEnquiry,

  "/academics/overview": AcademicOverview,
  "/academics/pre-primary": PrePrimary,
  "/academics/primary": PrimarySchool,
  "/academics/middle": MiddleSchool,
  "/academics/secondary": SecondarySchool,
  "/academics/senior-secondary": SeniorSecondary,
  "/academics/teaching-methodology": TeachingMethodology,

  "/about/vision-mission": VisionMission,
  "/about/director-message": DirectorMessage,
  "/about/principal-message": PrincipalMessage,
  "/about/leadership": LeadershipTeam,

  "/achievements/board-results": BoardResults,
  "/achievements/awards": AwardsRecognition,
  "/achievements/toppers": AcademicToppers,
  "/achievements/success-stories": StudentSuccessStories,

  "/faculty": Faculty,
  "/careers": Careers,
  "/gallery": GalleryLibrary,
  "/school-calendar": SchoolCalendar,

  "/admin": AdminPanel,
  "/admin/login": AdminPanel,
  "/admin/accept-invitation": AcceptInvitation,
};

function getCurrentPath() {
  const hashPath = window.location.hash.replace(/^#/, "");

  const currentPath = hashPath.startsWith("/")
    ? hashPath
    : window.location.pathname;

  return currentPath.replace(/\/+$/, "") || "/";
}

function RootRouter() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(getCurrentPath());
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const CurrentPage = routes[currentPath] || App;

  return <CurrentPage />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>
);