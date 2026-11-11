
import { useState } from "react";
import { api } from "../../lib/api";
import "./AcceptInvitation.css";

export default function AcceptInvitation() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invitation token is missing. Please use the latest invitation email.");
      return;
    }

    if (password.length < 12) {
      setError("Password must contain at least 12 characters.");
      return;
    }

    if (password.length > 128) {
      setError("Password cannot exceed 128 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api("/auth/accept-invitation", {
        method: "POST",
        body: JSON.stringify({
          token,
          password,
        }),
      });

      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.message || "Unable to accept invitation. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="invitation-page">
        <div className="invitation-card">
          <div className="invitation-logo">RH</div>

          <h1>Invalid Invitation</h1>

          <p className="invitation-description">
            The invitation link is missing its security token.
            Please contact the school administrator for a new invitation.
          </p>

          <a href="/" className="invitation-home">
            Return to Website
          </a>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="invitation-page">
        <div className="invitation-card">
          <div className="invitation-logo">RH</div>

          <div className="invitation-success-icon">✓</div>

          <h1>Invitation Accepted!</h1>

          <p className="invitation-description">
            Your staff account has been activated successfully.
            You can now log in to the Royal Heights Administration Portal.
          </p>

          <a href="/admin/login" className="invitation-submit">
            Go to Admin Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="invitation-page">
      <div className="invitation-card">
        <div className="invitation-logo">RH</div>

        <div className="invitation-school-name">
          ROYAL HEIGHTS
        </div>

        <p className="invitation-school-subtitle">
          HIGHER SECONDARY SCHOOL
        </p>

        <div className="invitation-divider" />

        <div className="invitation-heading">
          <span className="invitation-badge">
            STAFF INVITATION
          </span>

          <h1>Create Your Password</h1>

          <p className="invitation-description">
            Welcome to Royal Heights! Set a secure password
            to activate your staff account.
          </p>
        </div>

        {error && (
          <div className="invitation-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="invitation-field">
            <label htmlFor="password">
              New Password
            </label>

            <div className="invitation-password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={12}
                maxLength={128}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="invitation-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <small>
              Minimum 12 characters, maximum 128 characters.
            </small>
          </div>

          <div className="invitation-field">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="invitation-password-wrapper">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={12}
                maxLength={128}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="invitation-toggle"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="invitation-submit"
            disabled={loading}
          >
            {loading ? "Activating Account..." : "Accept Invitation"}
          </button>
        </form>

        <div className="invitation-footer">
          <p>
            By accepting this invitation, you agree to access
            the Royal Heights staff portal responsibly.
          </p>

          <a href="/">
            Return to Website
          </a>
        </div>
      </div>
    </div>
  );
}
