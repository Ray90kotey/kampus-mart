import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { University, UserRole } from "../../types/User";

const universityOptions: University[] = [
  "University of Ghana (UG)",
  "KNUST",
  "University of Cape Coast (UCC)",
  "Ashesi University",
  "Other",
];

const roleOptions: UserRole[] = ["buyer", "seller", "both"];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);
  const [role, setRole] = useState<UserRole>(user?.role ?? "buyer");
  const [university, setUniversity] = useState<University>(user?.university ?? "KNUST");

  useEffect(() => {
    if (!user) {
      navigate("/signup", { replace: true });
    }
  }, [navigate, user]);

  const handleFinish = () => {
    completeOnboarding({ role, university });
    navigate("/home", { replace: true });
  };

  return (
    <div style={{ minHeight: "100vh", padding: 32, background: "#F5F0E8" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", background: "#FFFFFF", borderRadius: 32, padding: 36, boxShadow: "0 24px 60px rgba(26,26,26,0.08)" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, marginBottom: 14 }}>Complete your campus profile</h1>
        <p style={{ color: "#6B6560", lineHeight: 1.75, marginBottom: 24 }}>
          Tell us a bit more about your student hustle so we can personalize your feed. This helps Kampus surface the right products, offers, and buyers.
        </p>

        <div style={{ display: "grid", gap: 20 }}>
          <div>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#1A1A1A" }}>University</label>
            <select
              value={university}
              onChange={(event) => setUniversity(event.target.value as University)}
              style={{ width: "100%", padding: "14px 16px", borderRadius: 16, border: "1px solid #DDD8CE", background: "#F9F6F0", fontSize: 15 }}
            >
              {universityOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <p style={{ marginBottom: 8, fontWeight: 600, color: "#1A1A1A" }}>I am here to</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
              {roleOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRole(option)}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 16,
                    border: option === role ? "2px solid #E8A020" : "1px solid #DDD8CE",
                    background: option === role ? "#E8A020" : "#FFFFFF",
                    color: option === role ? "#1A1A1A" : "#6B6560",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  {option === "buyer" ? "Buy things" : option === "seller" ? "Sell things" : "Both"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: 10 }}>
            <button
              onClick={() => navigate("/home")}
              type="button"
              style={{ padding: "14px 20px", borderRadius: 16, border: "1px solid #DDD8CE", background: "#FFFFFF", color: "#1A1A1A", cursor: "pointer", flex: 1 }}
            >
              Skip for now
            </button>
            <button
              onClick={handleFinish}
              type="button"
              style={{ padding: "14px 20px", borderRadius: 16, border: "none", background: "#E8A020", color: "#1A1A1A", cursor: "pointer", flex: 1, fontWeight: 700 }}
            >
              Finish onboarding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
