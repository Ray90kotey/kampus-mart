import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", padding: 32, background: "#F5F0E8" }}>
      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, marginBottom: 16 }}>Sign Up</h1>
      <p style={{ maxWidth: 560, color: "#6B6560", lineHeight: 1.7 }}>This is the auth sign-up stub. Replace with a full sign-up form on the next pass.</p>
      <button
        onClick={() => navigate("/onboarding")}
        style={{ marginTop: 24, padding: "14px 24px", borderRadius: 12, border: "none", background: "#E8A020", color: "#1A1A1A", cursor: "pointer", fontWeight: 700 }}
      >
        Continue to onboarding
      </button>
    </div>
  );
}
