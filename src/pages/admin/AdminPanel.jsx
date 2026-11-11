
import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  FileText,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  X,
  Users,
  UserPlus,
  ShieldCheck,
  Trash2,
  Mail,
  ClipboardList,
  Phone,
  CalendarDays,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

import { api } from "../../lib/api";
import "./AdminPanel.css";

// --------------------------------------------------
// INITIAL DATA
// --------------------------------------------------

const emptyVacancy = {
  title: "",
  department: "Teaching",
  employment_type: "Full-time",
  location: "Zirapur, Madhya Pradesh",
  description: "",
  qualifications: "",
  experience: "",
  salary_range: "",
  last_date: "",
  status: "draft",
};

const permissionOptions = [
  { key: "manage_vacancies", label: "Manage vacancies" },
  { key: "view_applications", label: "View applications" },
  { key: "manage_applications", label: "Manage applications" },
  { key: "download_resumes", label: "Download resumes" },
  {
    key: "view_admission_enquiries",
    label: "View admission enquiries",
  },
  {
    key: "view_online_applications",
    label: "View online student applications",
  },
  {
    key: "manage_online_applications",
    label: "Manage online application status",
  },
];

const emptyStaff = {
  name: "",
  email: "",
  designation: "School Staff",
  permissions: {
    manage_vacancies: false,
    view_applications: false,
    manage_applications: false,
    download_resumes: false,
    view_admission_enquiries: false,
    view_online_applications: false,
    manage_online_applications: false,
  },
};

const onlineApplicationStatuses = [
  "New",
  "Reviewing",
  "Accepted",
  "Rejected",
];

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatDOB(value) {
  if (!value) return "Not available";

  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// --------------------------------------------------
// ADMIN PANEL
// --------------------------------------------------

export default function AdminPanel() {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [tab, setTab] = useState("vacancies");

  const [vacancies, setVacancies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [admissionEnquiries, setAdmissionEnquiries] = useState([]);
  const [onlineApplications, setOnlineApplications] = useState([]);
  const [staff, setStaff] = useState([]);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyVacancy);

  const [staffForm, setStaffForm] = useState(emptyStaff);
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const isOwner = admin?.role === "owner";

  const canViewAdmissionEnquiries =
    isOwner ||
    admin?.permissions?.view_admission_enquiries === true;

  const canViewOnlineApplications =
    isOwner ||
    admin?.permissions?.view_online_applications === true;

  const canManageOnlineApplications =
    isOwner ||
    admin?.permissions?.manage_online_applications === true;

  // --------------------------------------------------
  // FETCH DATA
  // --------------------------------------------------

  async function refreshData(includeOnlineData = canViewOnlineApplications) {
    const requests = [
      api("/vacancies"),
      api("/applications"),
    ];

    if (includeOnlineData) {
      requests.push(api("/online-applications"));
    }

    const results = await Promise.all(requests);

    setVacancies(results[0].vacancies || []);
    setApplications(results[1].applications || []);

    if (includeOnlineData) {
      setOnlineApplications(results[2]?.applications || []);
    }
  }

  async function refreshStaff() {
    const data = await api("/staff");
    setStaff(data.staff || []);
  }

  async function refreshAdmissionEnquiries() {
    if (!canViewAdmissionEnquiries) return;

    const data = await api("/admission-enquiries");
    setAdmissionEnquiries(data.enquiries || []);
  }

  async function refreshOnlineApplications() {
    if (!canViewOnlineApplications) return;

    const data = await api("/online-applications");
    setOnlineApplications(data.applications || []);
  }

  async function refreshCurrentTab() {
    setError("");
    setNotice("");

    try {
      if (tab === "staff" && isOwner) {
        await refreshStaff();
      } else if (tab === "admission-enquiries") {
        await refreshAdmissionEnquiries();
      } else if (tab === "online-applications" && canViewOnlineApplications) {
        await refreshOnlineApplications();
      } else {
        await refreshData();
      }

      setNotice("Data refreshed successfully.");
    } catch (err) {
      setError(err.message || "Unable to refresh data.");
    }
  }

  // --------------------------------------------------
  // AUTHENTICATION CHECK
  // --------------------------------------------------

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const data = await api("/auth/me");

        if (!active) return;

        setAdmin(data.admin);

        await refreshData(
          data.admin?.role === "owner" ||
          data.admin?.permissions?.view_online_applications === true
        );
      } catch {
        if (active) setAdmin(null);
      } finally {
        if (active) setChecking(false);
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  // --------------------------------------------------
  // TAB DATA LOADING
  // --------------------------------------------------

  useEffect(() => {
    if (!admin) return;

    if (admin.role === "owner" && tab === "staff") {
      refreshStaff().catch((err) => setError(err.message));
    }

    if (
      tab === "admission-enquiries" &&
      (
        admin.role === "owner" ||
        admin.permissions?.view_admission_enquiries === true
      )
    ) {
      refreshAdmissionEnquiries().catch((err) => {
        setError(err.message);
      });
    }

    if (
      tab === "online-applications" &&
      (admin.role === "owner" ||
        admin.permissions?.view_online_applications === true)
    ) {
      refreshOnlineApplications().catch((err) => {
        setError(err.message);
      });
    }
  }, [admin, tab]);

  // --------------------------------------------------
  // LOGIN
  // --------------------------------------------------

  async function login(event) {
    event.preventDefault();

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setAdmin(data.admin);

      await refreshData(
          data.admin?.role === "owner" ||
          data.admin?.permissions?.view_online_applications === true
        );
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  async function logout() {
    try {
      await api("/auth/logout", { method: "POST" });
    } catch (err) {
      setError(err.message);
    } finally {
      setAdmin(null);
      setVacancies([]);
      setApplications([]);
      setAdmissionEnquiries([]);
      setOnlineApplications([]);
      setStaff([]);
      setTab("vacancies");
    }
  }

  // --------------------------------------------------
  // VACANCY MANAGEMENT
  // --------------------------------------------------

  function startNew() {
    setEditing(null);
    setForm(emptyVacancy);
    setError("");
    setNotice("");
  }

  function startEdit(vacancy) {
    setEditing(vacancy.id);

    setForm({
      ...vacancy,
      last_date: vacancy.last_date
        ? String(vacancy.last_date).slice(0, 10)
        : "",
    });

    setError("");
    setNotice("");
  }

  async function saveVacancy(event) {
    event.preventDefault();

    setBusy(true);
    setError("");
    setNotice("");

    try {
      const payload = {
        ...form,
        last_date: form.last_date || null,
      };

      await api(
        editing ? `/vacancies/${editing}` : "/vacancies",
        {
          method: editing ? "PATCH" : "POST",
          body: JSON.stringify(payload),
        }
      );

      await refreshData();

      setNotice(
        editing ? "Vacancy updated." : "Vacancy created."
      );

      setEditing(null);
      setForm(emptyVacancy);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function changeStatus(vacancy, status) {
    setError("");
    setNotice("");

    try {
      await api(`/vacancies/${vacancy.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      await refreshData();
      setNotice(`Vacancy status changed to ${status}.`);
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteVacancy(vacancy) {
    if (!window.confirm(`Delete "${vacancy.title}"?`)) return;

    try {
      await api(`/vacancies/${vacancy.id}`, {
        method: "DELETE",
      });

      await refreshData();
      setNotice("Vacancy deleted.");
    } catch (err) {
      setError(err.message);
    }
  }

  // --------------------------------------------------
  // JOB APPLICATION MANAGEMENT
  // --------------------------------------------------

  async function updateApplicationStatus(id, status) {
    try {
      await api(`/applications/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      await refreshData();
      setNotice("Application status updated.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function downloadResume(application) {
    const apiUrl = import.meta.env.VITE_API_URL || "/api";

    try {
      const response = await fetch(
        `${apiUrl}/applications/${application.id}/resume`,
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("Unable to download resume.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download =
        application.resume_original_name || "resume";

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  }

  // --------------------------------------------------
  // ONLINE APPLICATION MANAGEMENT
  // --------------------------------------------------

  async function updateOnlineApplicationStatus(id, status) {
    if (!canManageOnlineApplications) {
      setError("You do not have permission to manage online applications.");
      return;
    }

    setError("");
    setNotice("");

    try {
      await api(`/online-applications/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      await refreshOnlineApplications();

      setNotice("Online application status updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to update application status.");
    }
  }

  // --------------------------------------------------
  // STAFF MANAGEMENT
  // --------------------------------------------------

  function openStaffForm() {
    setStaffForm(emptyStaff);
    setEditingStaff(null);
    setShowStaffForm(true);
    setError("");
    setNotice("");
  }

  function editStaffMember(member) {
    setStaffForm({
      name: member.name || "",
      email: member.email || "",
      permissions: {
        manage_vacancies:
          member.permissions?.manage_vacancies === true,

        view_applications:
          member.permissions?.view_applications === true,

        manage_applications:
          member.permissions?.manage_applications === true,

        download_resumes:
          member.permissions?.download_resumes === true,

        view_admission_enquiries:
          member.permissions?.view_admission_enquiries === true,

        view_online_applications:
          member.permissions?.view_online_applications === true,

        manage_online_applications:
          member.permissions?.manage_online_applications === true,
      },
      designation: member.designation || "School Staff",
    });

    setEditingStaff(member.id);
    setShowStaffForm(true);
    setError("");
    setNotice("");
  }

  function togglePermission(permission) {
    setStaffForm((current) => ({
      ...current,
      permissions: {
        ...current.permissions,
        [permission]: !current.permissions[permission],
      },
    }));
  }

  async function inviteStaff(event) {
    event.preventDefault();

    setBusy(true);
    setError("");
    setNotice("");

    try {
      await api("/staff/invite", {
        method: "POST",
        body: JSON.stringify(staffForm),
      });

      await refreshStaff();

      setShowStaffForm(false);
      setStaffForm(emptyStaff);

      setNotice("Staff invitation sent successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function saveStaffPermissions(event) {
    event.preventDefault();

    setBusy(true);
    setError("");
    setNotice("");

    try {
      await api(`/staff/${editingStaff}`, {
        method: "PATCH",
        body: JSON.stringify({
          designation: staffForm.designation,
          permissions: staffForm.permissions,
        }),
      });

      await refreshStaff();

      setShowStaffForm(false);
      setEditingStaff(null);

      setNotice("Staff permissions updated successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function toggleStaffStatus(member) {
    const nextStatus = !member.active;

    if (
      !window.confirm(
        `${nextStatus ? "Activate" : "Deactivate"} ${member.name}'s account?`
      )
    ) {
      return;
    }

    setError("");
    setNotice("");

    try {
      await api(`/staff/${member.id}`, {
        method: "PATCH",
        body: JSON.stringify({ active: nextStatus }),
      });

      await refreshStaff();

      setNotice(
        `Staff account ${nextStatus ? "activated" : "deactivated"}.`
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteStaffMember(member) {
    if (
      !window.confirm(
        `Permanently delete staff account for ${member.name}?`
      )
    ) {
      return;
    }

    setError("");
    setNotice("");

    try {
      await api(`/staff/${member.id}`, {
        method: "DELETE",
      });

      await refreshStaff();
      setNotice("Staff account deleted successfully.");
    } catch (err) {
      setError(err.message);
    }
  }

  // --------------------------------------------------
  // LOADING SCREEN
  // --------------------------------------------------

  if (checking) {
    return (
      <main className="admin-screen">
        Checking secure session…
      </main>
    );
  }

  // --------------------------------------------------
  // LOGIN SCREEN
  // --------------------------------------------------

  if (!admin) {
    return (
      <main className="admin-screen">
        <form className="admin-login-card" onSubmit={login}>
          <a href="/" className="admin-brand">
            ROYAL HEIGHTS
          </a>

          <p className="admin-eyebrow">
            SECURE STAFF ACCESS
          </p>

          <h1>Admin Login</h1>

          <p>
            Sign in with your authorised school account.
          </p>

          <label>
            Email address

            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && (
            <p className="admin-error">{error}</p>
          )}

          <button disabled={busy}>
            {busy ? "Signing in…" : "Sign In Securely"}
          </button>

          <a href="/" className="admin-back-link">
            Back to website
          </a>
        </form>
      </main>
    );
  }

  // --------------------------------------------------
  // MAIN ADMIN DASHBOARD
  // --------------------------------------------------

  return (
    <main className="admin-screen">

      {/* HEADER */}

      <header className="admin-header">
        <div>
          <a href="/" className="admin-brand">
            ROYAL HEIGHTS
          </a>

          <p>School Administration</p>
        </div>

        <div className="admin-user">
          <span>
            {admin.name}
            <small>
              {admin.role === "owner"
                ? "Owner"
                : admin.designation || "School Staff"}
            </small>
          </span>

          <button type="button" onClick={logout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <section className="admin-dashboard">

        {/* WELCOME */}

        <div className="admin-welcome">
          <div>
            <p className="admin-eyebrow">
              SCHOOL MANAGEMENT
            </p>

            <h1>Dashboard</h1>

            <p>
              Manage vacancies, applications and admission enquiries.
            </p>
          </div>

          <button
            type="button"
            onClick={refreshCurrentTab}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* DASHBOARD STATISTICS */}

        <div className="admin-stats">
          <article>
            <BriefcaseBusiness size={21} />
            <span>All vacancies</span>
            <strong>{vacancies.length}</strong>
          </article>

          <article>
            <FileText size={21} />
            <span>Job Applications</span>
            <strong>{applications.length}</strong>
          </article>

          <article>
            <ClipboardList size={21} />
            <span>Admission Enquiries</span>

            <strong>
              {canViewAdmissionEnquiries
                ? admissionEnquiries.length
                : "—"}
            </strong>
          </article>

          {canViewOnlineApplications && (
            <article>
              <GraduationCap size={21} />
              <span>Online Applications</span>
              <strong>{onlineApplications.length}</strong>
            </article>
          )}
        </div>

        {/* NAVIGATION TABS */}

        <div className="admin-tabs">
          <button
            type="button"
            className={tab === "vacancies" ? "active" : ""}
            onClick={() => setTab("vacancies")}
          >
            Vacancies
          </button>

          <button
            type="button"
            className={tab === "applications" ? "active" : ""}
            onClick={() => setTab("applications")}
          >
            Applications
          </button>

          {canViewAdmissionEnquiries && (
            <button
              type="button"
              className={
                tab === "admission-enquiries" ? "active" : ""
              }
              onClick={() => setTab("admission-enquiries")}
            >
              <ClipboardList size={15} />
              Admission Enquiries
            </button>
          )}

          {canViewOnlineApplications && (
            <button
              type="button"
              className={
                tab === "online-applications" ? "active" : ""
              }
              onClick={() => setTab("online-applications")}
            >
              <GraduationCap size={15} />
              Online Applications
            </button>
          )}

          {isOwner && (
            <button
              type="button"
              className={tab === "staff" ? "active" : ""}
              onClick={() => setTab("staff")}
            >
              <Users size={15} />
              Staff Management
            </button>
          )}
        </div>

        {error && (
          <p className="admin-error">{error}</p>
        )}

        {notice && (
          <p className="admin-notice">{notice}</p>
        )}

        {/* ------------------------------------------
            VACANCIES TAB
        ------------------------------------------ */}

        {tab === "vacancies" && (
          <div className="admin-vacancy-layout">

            <section className="admin-panel-card">
              <div className="admin-panel-title">
                <h2>
                  {editing ? "Edit Vacancy" : "Add Vacancy"}
                </h2>

                <button
                  type="button"
                  onClick={startNew}
                  aria-label="New vacancy"
                >
                  <Plus size={17} />
                </button>
              </div>

              <form
                className="admin-vacancy-form"
                onSubmit={saveVacancy}
              >
                <label>
                  Job title *

                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    required
                    maxLength={180}
                  />
                </label>

                <label>
                  Department *

                  <select
                    value={form.department}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        department: e.target.value,
                      })
                    }
                  >
                    <option>Teaching</option>
                    <option>Administration</option>
                    <option>Accounts</option>
                    <option>Reception</option>
                    <option>IT / Technical</option>
                    <option>Support Staff</option>
                    <option>Other</option>
                  </select>
                </label>

                <label>
                  Employment type

                  <select
                    value={form.employment_type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        employment_type: e.target.value,
                      })
                    }
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Temporary</option>
                  </select>
                </label>

                <label>
                  Location

                  <input
                    value={form.location}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        location: e.target.value,
                      })
                    }
                    required
                  />
                </label>

                <label>
                  Job description *

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description: e.target.value,
                      })
                    }
                    required
                    rows={4}
                  />
                </label>

                <label>
                  Qualifications / eligibility *

                  <textarea
                    value={form.qualifications}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        qualifications: e.target.value,
                      })
                    }
                    required
                    rows={3}
                  />
                </label>

                <label>
                  Experience

                  <input
                    value={form.experience || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        experience: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Salary range (optional)

                  <input
                    value={form.salary_range || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        salary_range: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Last application date

                  <input
                    type="date"
                    value={form.last_date || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        last_date: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Publication status

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="closed">Closed</option>
                  </select>
                </label>

                <button disabled={busy}>
                  <Save size={16} />
                  {busy ? "Saving…" : "Save Vacancy"}
                </button>
              </form>
            </section>

            <section className="admin-panel-card">
              <h2>Vacancy List</h2>

              {vacancies.length === 0 && (
                <p>No vacancies created yet.</p>
              )}

              {vacancies.map((job) => (
                <article
                  className="admin-list-item"
                  key={job.id}
                >
                  <div>
                    <h3>{job.title}</h3>
                    <p>
                      {job.department} · {job.status}
                    </p>
                  </div>

                  <div className="admin-item-actions">
                    <button
                      type="button"
                      onClick={() => startEdit(job)}
                    >
                      Edit
                    </button>

                    {job.status !== "published" && (
                      <button
                        type="button"
                        onClick={() =>
                          changeStatus(job, "published")
                        }
                      >
                        Publish
                      </button>
                    )}

                    {job.status !== "closed" && (
                      <button
                        type="button"
                        onClick={() =>
                          changeStatus(job, "closed")
                        }
                      >
                        Close
                      </button>
                    )}

                    {job.status !== "draft" && (
                      <button
                        type="button"
                        onClick={() =>
                          changeStatus(job, "draft")
                        }
                      >
                        Draft
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => deleteVacancy(job)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </div>
        )}

        {/* ------------------------------------------
            JOB APPLICATIONS TAB
        ------------------------------------------ */}

        {tab === "applications" && (
          <section className="admin-panel-card">
            <h2>Candidate Applications</h2>

            {applications.length === 0 && (
              <p>No applications received yet.</p>
            )}

            {applications.map((item) => (
              <article
                className="admin-application-item"
                key={item.id}
              >
                <div className="admin-application-details">
                  <h3>{item.full_name}</h3>

                  <p>{item.vacancy_title}</p>

                  <p>
                    {item.email} · {item.phone}
                  </p>

                  <p>
                    {item.qualification} · {item.experience_years} years
                  </p>

                  <button
                    type="button"
                    onClick={() => downloadResume(item)}
                  >
                    <FileText size={15} />
                    Download Resume
                  </button>
                </div>

                <label>
                  Application status

                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateApplicationStatus(
                        item.id,
                        e.target.value
                      )
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                    <option value="hired">Hired</option>
                  </select>
                </label>
              </article>
            ))}
          </section>
        )}

        {/* ------------------------------------------
            ADMISSION ENQUIRIES TAB
        ------------------------------------------ */}

        {tab === "admission-enquiries" &&
          canViewAdmissionEnquiries && (
            <section className="admin-panel-card admin-admission-section">

              <div className="admin-staff-heading">
                <div>
                  <h2>Admission Enquiries</h2>

                  <p>
                    View enquiries submitted through the school website.
                  </p>
                </div>

                <span>
                  {admissionEnquiries.length} enquiries
                </span>
              </div>

              {admissionEnquiries.length === 0 ? (
                <div className="admin-empty-state">
                  <ClipboardList size={30} />
                  <p>
                    No admission enquiries received yet.
                  </p>
                </div>
              ) : (
                admissionEnquiries.map((item) => (
                  <article
                    className="admin-admission-item"
                    key={item.id}
                  >
                    <div className="admin-admission-item-heading">
                      <div>
                        <h3>
                          {item.parent_name || item.parentName}
                        </h3>

                        <span>
                          <CalendarDays size={14} />

                          {formatDate(
                            item.created_at || item.createdAt
                          )}
                        </span>
                      </div>

                      <strong>
                        {item.class_name || item.className}
                      </strong>
                    </div>

                    <div className="admin-admission-details">
                      <p>
                        <Phone size={15} />
                        <strong>Phone:</strong>

                        <a href={`tel:${item.phone}`}>
                          {item.phone}
                        </a>
                      </p>

                      {item.email && (
                        <p>
                          <Mail size={15} />
                          <strong>Email:</strong>

                          <a href={`mailto:${item.email}`}>
                            {item.email}
                          </a>
                        </p>
                      )}

                      <p>
                        <GraduationCap size={15} />
                        <strong>Class:</strong>
                        {item.class_name || item.className}
                      </p>

                      <p>
                        <MessageSquare size={15} />
                        <strong>Topic:</strong>
                        {item.topic || "Admission Process"}
                      </p>
                    </div>

                    <div className="admin-admission-message">
                      <strong>
                        Parent's question / message
                      </strong>

                      <p>
                        {item.message || "No message provided."}
                      </p>
                    </div>
                  </article>
                ))
              )}
            </section>
          )}

        {/* ------------------------------------------
            ONLINE APPLICATIONS TAB
        ------------------------------------------ */}

        {tab === "online-applications" && canViewOnlineApplications && (
          <section className="admin-panel-card admin-admission-section">

            <div className="admin-staff-heading">
              <div>
                <h2>Online Student Applications</h2>

                <p>
                  Applications submitted through the Online Application form.
                </p>
              </div>

              <span>
                {onlineApplications.length} applications
              </span>
            </div>

            {onlineApplications.length === 0 ? (
              <div className="admin-empty-state">
                <GraduationCap size={32} />

                <p>
                  No online applications received yet.
                </p>
              </div>
            ) : (
              onlineApplications.map((item) => (
                <article
                  className="admin-admission-item"
                  key={item.id}
                >
                  <div className="admin-admission-item-heading">
                    <div>
                      <h3>
                        {item.student_name || "Student name unavailable"}
                      </h3>

                      <span>
                        <CalendarDays size={14} />

                        Submitted: {formatDate(item.created_at)}
                      </span>
                    </div>

                    <strong>
                      {item.class_name || "Class not specified"}
                    </strong>
                  </div>

                  <div className="admin-admission-details">

                    <p>
                      <CalendarDays size={15} />
                      <strong>Date of Birth:</strong>
                      {formatDOB(item.date_of_birth)}
                    </p>

                    <p>
                      <Users size={15} />
                      <strong>Parent / Guardian:</strong>
                      {item.parent_name || "Not provided"}
                    </p>

                    <p>
                      <Phone size={15} />
                      <strong>Phone:</strong>

                      <a href={`tel:${item.phone}`}>
                        {item.phone}
                      </a>
                    </p>

                    {item.email && (
                      <p>
                        <Mail size={15} />
                        <strong>Email:</strong>

                        <a href={`mailto:${item.email}`}>
                          {item.email}
                        </a>
                      </p>
                    )}

                    <p>
                      <GraduationCap size={15} />
                      <strong>Applying for:</strong>
                      {item.class_name || "Not specified"}
                    </p>

                    <p>
                      <FileText size={15} />
                      <strong>Previous School:</strong>
                      {item.previous_school || "Not provided"}
                    </p>

                  </div>

                  <div className="admin-admission-message">
                    <strong>
                      Additional Information
                    </strong>

                    <p>
                      {item.message || "No additional information provided."}
                    </p>
                  </div>

                  <div className="admin-online-application-status">
                    <label>
                      Application Status

                      <select
                        value={item.status || "New"}
                        disabled={!canManageOnlineApplications}
                        onChange={(event) =>
                          updateOnlineApplicationStatus(
                            item.id,
                            event.target.value
                          )
                        }
                      >
                        {onlineApplicationStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                </article>
              ))
            )}
          </section>
        )}

        {/* ------------------------------------------
            STAFF MANAGEMENT TAB
        ------------------------------------------ */}

        {tab === "staff" && isOwner && (
          <section className="admin-panel-card admin-staff-section">

            <div className="admin-staff-heading">
              <div>
                <h2>Staff Management</h2>

                <p>
                  Invite and manage authorised school staff accounts.
                </p>
              </div>

              <button
                type="button"
                className="admin-primary-button"
                onClick={openStaffForm}
              >
                <UserPlus size={16} />
                Invite Staff
              </button>
            </div>

            {/* STAFF FORM */}

            {showStaffForm && (
              <form
                className="admin-staff-form"
                onSubmit={
                  editingStaff
                    ? saveStaffPermissions
                    : inviteStaff
                }
              >
                <div className="admin-panel-title">
                  <h2>
                    {editingStaff
                      ? "Edit Staff Details & Permissions"
                      : "Invite New Staff"}
                  </h2>

                  <button
                    type="button"
                    onClick={() => setShowStaffForm(false)}
                    aria-label="Close staff form"
                  >
                    <X size={17} />
                  </button>
                </div>

                <div className="admin-staff-fields">
                  <label>
                    Full name *

                    <input
                      value={staffForm.name}
                      onChange={(e) =>
                        setStaffForm({
                          ...staffForm,
                          name: e.target.value,
                        })
                      }
                      required
                      disabled={Boolean(editingStaff)}
                    />
                  </label>

                  <label>
                    Email address *

                    <input
                      type="email"
                      value={staffForm.email}
                      onChange={(e) =>
                        setStaffForm({
                          ...staffForm,
                          email: e.target.value,
                        })
                      }
                      required
                      disabled={Boolean(editingStaff)}
                    />
                  </label>

                  <label>
                    Designation / Position *

                    <input
                      value={staffForm.designation}
                      onChange={(e) =>
                        setStaffForm({
                          ...staffForm,
                          designation: e.target.value,
                        })
                      }
                      placeholder="e.g. Principal, Director, Teacher"
                      required
                      maxLength={100}
                    />
                  </label>
                </div>

                {/* PERMISSIONS */}

                <div className="admin-permissions">
                  <h3>
                    <ShieldCheck size={17} />
                    Access Permissions
                  </h3>

                  <p>
                    Select what this staff member is allowed to access.
                  </p>

                  <div className="admin-permission-grid">
                    {permissionOptions.map((permission) => (
                      <label key={permission.key}>
                        <input
                          type="checkbox"
                          checked={
                            staffForm.permissions[permission.key] === true
                          }
                          onChange={() =>
                            togglePermission(permission.key)
                          }
                        />

                        <span>{permission.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  className="admin-primary-button"
                  disabled={busy}
                >
                  <Save size={16} />

                  {busy
                    ? "Please wait…"
                    : editingStaff
                      ? "Save Staff Details"
                      : "Send Invitation"}
                </button>
              </form>
            )}

            {/* STAFF LIST */}

            <div className="admin-staff-list-heading">
              <h3>Staff Accounts</h3>
              <span>{staff.length} accounts</span>
            </div>

            {staff.length === 0 && (
              <div className="admin-empty-state">
                <Users size={30} />
                <p>No staff accounts found.</p>
              </div>
            )}

            {staff.map((member) => (
              <article
                className="admin-staff-item"
                key={member.id}
              >
                <div className="admin-staff-info">
                  <div className="admin-staff-avatar">
                    {member.name?.charAt(0)?.toUpperCase() || "S"}
                  </div>

                  <div>
                    <h3>{member.name}</h3>

                    <p className="admin-staff-designation">
                      {member.designation || "School Staff"}
                    </p>

                    <p>
                      <Mail size={13} />
                      {member.email}
                    </p>

                    <span
                      className={
                        member.active
                          ? "staff-active"
                          : "staff-inactive"
                      }
                    >
                      {member.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="admin-staff-permission-summary">
                  {permissionOptions
                    .filter(
                      (permission) =>
                        member.permissions?.[permission.key] === true
                    )
                    .map((permission) => (
                      <span key={permission.key}>
                        {permission.label}
                      </span>
                    ))}

                  {!permissionOptions.some(
                    (permission) =>
                      member.permissions?.[permission.key] === true
                  ) && (
                    <span>No permissions assigned</span>
                  )}
                </div>

                <div className="admin-item-actions">
                  <button
                    type="button"
                    onClick={() => editStaffMember(member)}
                  >
                    Edit Permissions
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleStaffStatus(member)}
                  >
                    {member.active ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    type="button"
                    className="admin-danger-button"
                    onClick={() => deleteStaffMember(member)}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>

      {/* FOOTER */}

      <footer className="admin-footer">
        <a href="/">
          ← Return to Royal Heights website
        </a>

        <span>Private school administration</span>
      </footer>
    </main>
  );
}
