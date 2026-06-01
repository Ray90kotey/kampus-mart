import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", padding: 32, background: "#F5F0E8" }}>
      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, marginBottom: 16 }}>Login</h1>
      <p style={{ maxWidth: 560, color: "#6B6560", lineHeight: 1.7 }}>This is the auth login stub. Replace with your styled login form when ready.</p>
      <button
        onClick={() => navigate("/signup")}
        style={{ marginTop: 24, padding: "14px 24px", borderRadius: 12, border: "none", background: "#E8A020", color: "#1A1A1A", cursor: "pointer", fontWeight: 700 }}
      >
        Go to sign up
      </button>
    </div>
  );
}
