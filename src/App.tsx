import { useState, useEffect, type ChangeEvent, type MouseEvent, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { University } from "../types/User";
import OnboardingRoute from "./pages/Onboarding";
import HomeRoute from "./pages/Home";
import ProductRoute from "./pages/Product";
import CartRoute from "./pages/Cart";
import DashboardRoute from "./pages/Dashboard";

const COLORS = {
  cream: "#F5F0E8",
  charcoal: "#1A1A1A",
  charcoalMid: "#2D2D2D",
  muted: "#6B6560",
  amber: "#E8A020",
  amberLight: "#FBE8B8",
  amberDark: "#C47F08",
  white: "#FFFFFF",
  border: "#DDD8CE",
  borderDark: "#C8C2B6",
  surface: "#EDE8DF",
  error: "#C0392B",
};

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
`;

const globalStyle = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${COLORS.cream}; color: ${COLORS.charcoal}; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
  ::selection { background: ${COLORS.amberLight}; color: ${COLORS.charcoal}; }
  input:-webkit-autofill { -webkit-box-shadow: 0 0 0 1000px ${COLORS.white} inset !important; -webkit-text-fill-color: ${COLORS.charcoal} !important; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes slideRight { from { transform:translateX(-100%); } to { transform:translateX(0); } }
  @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-8px); } }
  @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }

  .fade-up-1 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .fade-up-2 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .fade-up-3 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .fade-up-4 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
  .fade-in { animation: fadeIn 0.5s ease both; }
`;

function GridTexture({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={COLORS.charcoal} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid)`} opacity={opacity} />
    </svg>
  );
}

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleHover = (e: MouseEvent<HTMLButtonElement>, color: string) => {
    e.currentTarget.style.background = color;
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: 64,
        background: location.pathname === "/" ? "rgba(245,240,232,0.85)" : COLORS.cream,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: COLORS.charcoal,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: COLORS.amber, fontSize: 16, fontWeight: 700, fontFamily: "'DM Serif Display', serif" }}>K</span>
        </div>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: COLORS.charcoal, letterSpacing: "-0.3px" }}>
          Kampus
        </span>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {user ? (
          <>
            <button
              onClick={() => navigate("/home")}
              onMouseEnter={(e) => handleHover(e, COLORS.surface)}
              onMouseLeave={(e) => handleHover(e, "transparent")}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: `1px solid ${COLORS.borderDark}`,
                background: "transparent",
                color: COLORS.charcoal,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              Home
            </button>
            <button
              onClick={() => navigate("/cart")}
              onMouseEnter={(e) => handleHover(e, COLORS.surface)}
              onMouseLeave={(e) => handleHover(e, "transparent")}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: `1px solid ${COLORS.borderDark}`,
                background: "transparent",
                color: COLORS.charcoal,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              Cart
            </button>
            <button
              onClick={() => logout()}
              onMouseEnter={(e) => handleHover(e, COLORS.surface)}
              onMouseLeave={(e) => handleHover(e, "transparent")}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: `1px solid ${COLORS.borderDark}`,
                background: "transparent",
                color: COLORS.charcoal,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              onMouseEnter={(e) => handleHover(e, COLORS.surface)}
              onMouseLeave={(e) => handleHover(e, "transparent")}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: `1px solid ${COLORS.borderDark}`,
                background: "transparent",
                color: COLORS.charcoal,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/signup")}
              onMouseEnter={(e) => handleHover(e, COLORS.charcoalMid)}
              onMouseLeave={(e) => handleHover(e, COLORS.charcoal)}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: `1px solid ${COLORS.charcoal}`,
                background: COLORS.charcoal,
                color: COLORS.cream,
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              Sign up free
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function RequireAuth({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.needsOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <>{children}</>;
  }

  return <Navigate to={user.needsOnboarding ? "/onboarding" : "/home"} replace />;
}

function Ticker() {
  const items = [
    "Tutoring Services",
    "Handmade Fashion",
    "Graphic Design",
    "Food Delivery",
    "Coding Help",
    "Event Planning",
    "Textbooks",
    "Photography",
    "Fitness Training",
    "Digital Products",
  ];
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        background: COLORS.charcoal,
        color: COLORS.amber,
        height: 40,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 48,
          animation: "ticker 28s linear infinite",
          whiteSpace: "nowrap",
          paddingLeft: 0,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: COLORS.amberDark, fontSize: 10 }}>◆</span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatPill({ num, label }: { num: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 28px",
        background: COLORS.white,
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        gap: 2,
      }}
    >
      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: COLORS.charcoal, lineHeight: 1 }}>{num}</span>
      <span style={{ fontSize: 12, color: COLORS.muted, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  return (
    <div
      className={`fade-up-${delay}`}
      style={{
        padding: "28px 24px",
        background: COLORS.white,
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ width: 44, height: 44, background: COLORS.amberLight, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{icon}</div>
      <div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, marginBottom: 6, color: COLORS.charcoal }}>{title}</div>
        <div style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

function FloatingCard({
  top,
  right,
  left,
  bottom,
  rotate,
  name,
  category,
  price,
  delay,
}: {
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  rotate: number;
  name: string;
  category: string;
  price: string;
  delay: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        right,
        left,
        bottom,
        background: COLORS.white,
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        padding: "14px 16px",
        width: 180,
        transform: `rotate(${rotate}deg)`,
        animation: `float 4s ease-in-out ${delay}s infinite`,
        boxShadow: "0 4px 24px rgba(26,26,26,0.08)",
      }}
    >
      <div style={{ height: 60, background: COLORS.surface, borderRadius: 8, marginBottom: 10 }} />
      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.charcoal, marginBottom: 3 }}>{name}</div>
      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 8 }}>{category}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 16, color: COLORS.charcoal }}>{price}</span>
        <span style={{ background: COLORS.amberLight, color: COLORS.amberDark, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>★ 4.9</span>
      </div>
    </div>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream }}>
      <style>{fonts + globalStyle}</style>

      <section style={{ position: "relative", overflow: "hidden", paddingTop: 64 }}>
        <GridTexture opacity={0.05} />
        <div
          style={{
            position: "absolute",
            top: 80,
            right: -120,
            width: 500,
            height: 500,
            background: COLORS.amber,
            borderRadius: "50%",
            opacity: 0.08,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px 60px", display: "flex", alignItems: "center", gap: 60, position: "relative" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              className="fade-up-1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                background: COLORS.amberLight,
                borderRadius: 100,
                marginBottom: 24,
                border: `1px solid ${COLORS.amber}`,
              }}
            >
              <span style={{ width: 6, height: 6, background: COLORS.amber, borderRadius: "50%", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.amberDark, letterSpacing: "0.02em" }}>Now live at KNUST, UG, UCC, Ashesi</span>
            </div>

            <h1
              className="fade-up-2"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(44px, 6vw, 72px)",
                lineHeight: 1.05,
                letterSpacing: "-1.5px",
                color: COLORS.charcoal,
                marginBottom: 24,
              }}
            >
              Your campus.<br />
              Your <em style={{ color: COLORS.amber, fontStyle: "italic" }}>hustle.</em><br />
              One platform.
            </h1>

            <p className="fade-up-3" style={{ fontSize: 18, color: COLORS.muted, lineHeight: 1.7, maxWidth: 460, marginBottom: 36, fontWeight: 300 }}>
              Kampus connects student entrepreneurs with buyers across Ghana's top universities. Sell your skills, grow your brand, pay with MoMo.
            </p>

            <div className="fade-up-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
              <button
                onClick={() => navigate("/signup")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.background = COLORS.charcoalMid;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.background = COLORS.charcoal;
                }}
                style={{
                  padding: "14px 32px",
                  borderRadius: 12,
                  background: COLORS.charcoal,
                  color: COLORS.cream,
                  fontSize: 15,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "transform 0.15s, background 0.15s",
                }}
              >
                Start selling today →
              </button>
              <button
                onClick={() => navigate("/login")}
                onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.surface)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                style={{
                  padding: "14px 32px",
                  borderRadius: 12,
                  background: "transparent",
                  color: COLORS.charcoal,
                  fontSize: 15,
                  fontWeight: 500,
                  border: `1px solid ${COLORS.borderDark}`,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.15s",
                }}
              >
                Browse marketplace
              </button>
            </div>

            <div className="fade-up-4" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <StatPill num="2,400+" label="Student sellers" />
              <StatPill num="4" label="Universities" />
              <StatPill num="MoMo" label="Payments" />
            </div>
          </div>

          <div style={{ flex: "0 0 420px", height: 480, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: 260,
                height: 320,
                background: COLORS.surface,
                borderRadius: 24,
                border: `1px solid ${COLORS.border}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <GridTexture opacity={0.08} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 48, color: COLORS.charcoal, lineHeight: 1 }}>K</span>
                <span style={{ fontSize: 13, color: COLORS.muted, fontWeight: 500 }}>Your campus marketplace</span>
              </div>
            </div>
            <FloatingCard top="20px" right="0" rotate={4} name="Custom Kente Bag" category="Handmade Fashion · KNUST" price="GH₵ 180" delay={0} />
            <FloatingCard top="180px" left="-20px" rotate={-3} name="Math Tutoring" category="Academics · UG" price="GH₵ 50/hr" delay={0.8} />
            <FloatingCard bottom="20px" right="10px" rotate={2} name="Logo Design" category="Creative · Ashesi" price="GH₵ 120" delay={1.4} />
          </div>
        </div>
      </section>

      <Ticker />

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.amber, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>How it works</div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(32px,4vw,48px)", letterSpacing: "-0.8px", lineHeight: 1.1 }}>
              From idea to income<br />in three steps.
            </h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 24 }}>
          {[
            {
              n: "01",
              title: "Create your listing",
              desc: "Upload photos, set your price, and describe what you offer. Takes under 3 minutes for any product or service.",
            },
            {
              n: "02",
              title: "Connect with buyers",
              desc: "Students across all partner universities can discover and message you directly. Your reach goes beyond your campus.",
            },
            {
              n: "03",
              title: "Get paid via MoMo",
              desc: "Receive payments securely through MTN MoMo, AirtelTigo, or card. Funds arrive once delivery is confirmed.",
            },
          ].map((step, i) => (
            <div
              key={i}
              style={{
                padding: "32px 28px",
                background: COLORS.white,
                borderRadius: 16,
                border: `1px solid ${COLORS.border}`,
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Serif Display',serif",
                  fontSize: 64,
                  color: COLORS.amberLight,
                  lineHeight: 1,
                  position: "absolute",
                  top: 20,
                  right: 24,
                  userSelect: "none",
                }}
              >
                {step.n}
              </div>
              <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, marginBottom: 12, position: "relative" }}>{step.title}</div>
              <div style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: COLORS.surface, padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <GridTexture opacity={0.04} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.amber, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Built for student life</div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(32px,4vw,48px)", letterSpacing: "-0.8px" }}>
              Everything you need, nothing you don't.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 20 }}>
            <FeatureCard delay={1} icon="✦" title="Student verified" desc="Every user registers with their official university email. Trusted community, safer transactions." />
            <FeatureCard delay={2} icon="◎" title="Multi-campus reach" desc="List once and reach buyers at KNUST, UG, UCC, Ashesi and more from a single storefront." />
            <FeatureCard delay={3} icon="◈" title="MoMo payments" desc="MTN, AirtelTigo, Vodafone Cash — all supported. Funds held in escrow until delivery confirmed." />
            <FeatureCard delay={4} icon="◇" title="Real-time chat" desc="Negotiate, clarify, coordinate directly with buyers or sellers inside the platform." />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: "80px auto", padding: "0 40px" }}>
        <div
          style={{
            background: COLORS.charcoal,
            borderRadius: 24,
            padding: "60px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, background: COLORS.amber, borderRadius: "50%", opacity: 0.07 }} />
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(28px,3vw,42px)", color: COLORS.cream, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 12 }}>
              Ready to turn your skills<br />into income?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(245,240,232,0.6)", fontWeight: 300 }}>Join 2,400+ student entrepreneurs already on Kampus.</p>
          </div>
          <button
            onClick={() => navigate("/signup")}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F5B030";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = COLORS.amber;
              e.currentTarget.style.transform = "none";
            }}
            style={{
              padding: "16px 40px",
              borderRadius: 12,
              background: COLORS.amber,
              color: COLORS.charcoal,
              fontSize: 16,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
              transition: "transform 0.15s, background 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            Create free account →
          </button>
        </div>
      </section>

      <footer
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          padding: "32px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1100,
          margin: "0 auto",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: COLORS.charcoal }}>Kampus</div>
        <div style={{ fontSize: 13, color: COLORS.muted }}>Ghana's student marketplace · 2025</div>
        <div style={{ fontSize: 13, color: COLORS.muted, display: "flex", gap: 24 }}>
          <span style={{ cursor: "pointer" }}>Privacy</span>
          <span style={{ cursor: "pointer" }}>Terms</span>
          <span style={{ cursor: "pointer" }}>Support</span>
        </div>
      </footer>
    </div>
  );
}

function AuthLayout({ children, side }: { children: ReactNode; side: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex" }}>
      <style>{fonts + globalStyle}</style>
      <div
        style={{
          flex: "0 0 480px",
          background: COLORS.charcoal,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: "48px",
        }}
      >
        <GridTexture opacity={0.06} />
        <div style={{ position: "absolute", bottom: -100, right: -80, width: 400, height: 400, background: COLORS.amber, borderRadius: "50%", opacity: 0.1 }} />
        <div style={{ position: "absolute", top: -80, left: -80, width: 300, height: 300, background: COLORS.amber, borderRadius: "50%", opacity: 0.06 }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 60 }}>
            <div style={{ width: 36, height: 36, background: COLORS.amber, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: COLORS.charcoal, fontSize: 18, fontWeight: 700, fontFamily: "'DM Serif Display',serif" }}>K</span>
            </div>
            <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: COLORS.cream }}>Kampus</span>
          </div>
          {side}
        </div>

        <div style={{ position: "relative", zIndex: 2, marginTop: "auto", background: "rgba(245,240,232,0.07)", borderRadius: 16, padding: "20px 24px", border: "1px solid rgba(245,240,232,0.12)" }}>
          <p style={{ fontSize: 15, color: "rgba(245,240,232,0.85)", lineHeight: 1.6, marginBottom: 16, fontStyle: "italic", fontFamily: "'DM Serif Display',serif" }}>
            "I made GH₵ 2,400 in my first month selling custom tote bags. Kampus made it stupid easy."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.amber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: COLORS.charcoal }}>A</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.cream }}>Abena Owusu</div>
              <div style={{ fontSize: 12, color: "rgba(245,240,232,0.5)" }}>Fashion Design · KNUST</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 48px", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.charcoal, letterSpacing: "0.01em" }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "12px 14px",
          borderRadius: 10,
          fontSize: 15,
          border: `1.5px solid ${error ? COLORS.error : focused ? COLORS.charcoal : COLORS.borderDark}`,
          background: COLORS.white,
          color: COLORS.charcoal,
          outline: "none",
          fontFamily: "'DM Sans',sans-serif",
          transition: "border-color 0.15s",
          width: "100%",
        }}
      />
      {error && <span style={{ fontSize: 12, color: COLORS.error }}>{error}</span>}
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: COLORS.border }} />
      <span style={{ fontSize: 13, color: COLORS.muted, whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: COLORS.border }} />
    </div>
  );
}

function SignUpPage() {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const user = useAuthStore((state) => state.user);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer", university: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const unis: University[] = ["University of Ghana (UG)", "KNUST", "University of Cape Coast (UCC)", "Ashesi University", "Other"];

  useEffect(() => {
    if (!user) return;
    if (user.needsOnboarding) {
      navigate("/onboarding", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  }, [navigate, user]);

  const set = (k: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "At least 6 characters";
    if (!form.university) e.university = "Select your university";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      signup({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role as "buyer" | "seller" | "both",
        university: form.university as typeof unis[number],
      });
      navigate("/onboarding", { replace: true });
    }, 1200);
  };

  const sideContent = (
    <div>
      <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 32, color: COLORS.cream, lineHeight: 1.15, marginBottom: 16 }}>
        Join 2,400+<br />student<br />
        <em style={{ color: COLORS.amber }}>entrepreneurs.</em>
      </h2>
      <p style={{ fontSize: 14, color: "rgba(245,240,232,0.55)", lineHeight: 1.7, maxWidth: 280, fontWeight: 300 }}>
        Whether you're selling, buying, or both — Kampus is built for the way student life actually works.
      </p>
      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
        {["Free to join, no monthly fees", "Verified student community", "MTN MoMo & card payments"].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 20, height: 20, background: "rgba(232,160,32,0.2)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: COLORS.amber, fontSize: 12 }}>✓</span>
            </div>
            <span style={{ fontSize: 14, color: "rgba(245,240,232,0.7)" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <AuthLayout side={sideContent}>
      <div className="fade-in" style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 34, letterSpacing: "-0.5px", marginBottom: 8 }}>Create your account</h1>
          <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>
            Already have one?{' '}
            <button
              onClick={() => navigate("/login")}
              style={{ background: "none", border: "none", color: COLORS.charcoal, fontWeight: 600, cursor: "pointer", fontSize: 15, padding: 0, fontFamily: "'DM Sans',sans-serif", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              Log in
            </button>
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.charcoal, marginBottom: 8 }}>I want to</div>
          <div style={{ display: "flex", background: COLORS.surface, borderRadius: 10, padding: 4, gap: 4 }}>
            {["buyer", "seller", "both"].map((val) => (
              <button
                key={val}
                onClick={() => setForm((f) => ({ ...f, role: val }))}
                style={{
                  flex: 1,
                  padding: "9px 0",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "all 0.15s",
                  background: form.role === val ? COLORS.charcoal : "transparent",
                  color: form.role === val ? COLORS.cream : COLORS.muted,
                }}
              >
                {val === "buyer" ? "Buy things" : val === "seller" ? "Sell things" : "Both"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
          <Field label="Full name" placeholder="Kofi Mensah" value={form.name} onChange={set("name")} error={errors.name} />
          <Field label="Student email" type="email" placeholder="you@st.ug.edu.gh" value={form.email} onChange={set("email")} error={errors.email} />

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.charcoal }}>University</label>
            <select
              value={form.university}
              onChange={set("university")}
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                fontSize: 15,
                border: `1.5px solid ${errors.university ? COLORS.error : COLORS.borderDark}`,
                background: COLORS.white,
                color: form.university ? COLORS.charcoal : COLORS.muted,
                outline: "none",
                fontFamily: "'DM Sans',sans-serif",
                cursor: "pointer",
                width: "100%",
                appearance: "none",
              }}
            >
              <option value="">Select your university</option>
              {unis.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            {errors.university && <span style={{ fontSize: 12, color: COLORS.error }}>{errors.university}</span>}
          </div>

          <Field label="Password" type="password" placeholder="Minimum 6 characters" value={form.password} onChange={set("password")} error={errors.password} />
        </div>

        <p style={{ fontSize: 12, color: COLORS.muted, marginBottom: 20, lineHeight: 1.6 }}>
          By signing up you agree to our <span style={{ color: COLORS.charcoal, textDecoration: "underline", cursor: "pointer" }}>Terms</span> and <span style={{ color: COLORS.charcoal, textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>.
        </p>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 12,
            background: loading ? COLORS.muted : COLORS.charcoal,
            color: COLORS.cream,
            fontSize: 15,
            fontWeight: 700,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'DM Sans',sans-serif",
            transition: "background 0.15s",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {loading ? <span style={{ animation: "pulse 1s infinite" }}>Creating your account…</span> : "Create account →"}
        </button>

        <Divider label="or sign up with" />
        <button
          style={{
            width: "100%",
            marginTop: 16,
            padding: "13px",
            borderRadius: 12,
            background: COLORS.white,
            border: `1.5px solid ${COLORS.borderDark}`,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif",
            color: COLORS.charcoal,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.surface)}
          onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.white)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>
      </div>
    </AuthLayout>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (user.needsOnboarding) {
      navigate("/onboarding", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  }, [navigate, user]);

  const set = (k: string) => (e: ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(form.email.trim(), form.password);
      setLoading(false);
      navigate("/home", { replace: true });
    }, 1200);
  };

  const sideContent = (
    <div>
      <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 32, color: COLORS.cream, lineHeight: 1.15, marginBottom: 16 }}>
        Welcome<br />back to your<br />
        <em style={{ color: COLORS.amber }}>marketplace.</em>
      </h2>
      <p style={{ fontSize: 14, color: "rgba(245,240,232,0.55)", lineHeight: 1.7, maxWidth: 280, fontWeight: 300 }}>
        Your listings, orders, and earnings are all waiting for you. Pick up right where you left off.
      </p>
      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
        {[["★ 4.8/5", "Average seller rating"], ["GH₵ 1.2M+", "Transacted this semester"], ["48 hrs", "Avg. time to first sale"]].map(([stat, label], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: COLORS.amber, minWidth: 80 }}>{stat}</span>
            <span style={{ fontSize: 13, color: "rgba(245,240,232,0.55)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <AuthLayout side={sideContent}>
      <div className="fade-in" style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 36, letterSpacing: "-0.5px", marginBottom: 8 }}>Log in</h1>
          <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>
            New to Kampus?{' '}
            <button
              onClick={() => navigate("/signup")}
              style={{ background: "none", border: "none", color: COLORS.charcoal, fontWeight: 600, cursor: "pointer", fontSize: 15, padding: 0, fontFamily: "'DM Sans',sans-serif", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              Create a free account
            </button>
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 8 }}>
          <Field label="Email" type="email" placeholder="you@st.ug.edu.gh" value={form.email} onChange={set("email")} error={errors.email} />

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.charcoal }}>Password</label>
              <button style={{ background: "none", border: "none", fontSize: 13, color: COLORS.muted, cursor: "pointer", padding: 0, fontFamily: "'DM Sans',sans-serif", textDecoration: "underline", textUnderlineOffset: 3 }}>
                Forgot password?
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Your password"
                value={form.password}
                onChange={set("password")}
                style={{
                  padding: "12px 44px 12px 14px",
                  borderRadius: 10,
                  fontSize: 15,
                  width: "100%",
                  border: `1.5px solid ${errors.password ? COLORS.error : COLORS.borderDark}`,
                  background: COLORS.white,
                  color: COLORS.charcoal,
                  outline: "none",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              />
              <button
                onClick={() => setShowPass((s) => !s)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: COLORS.muted,
                  fontSize: 13,
                  padding: 0,
                }}
              >
                {showPass ? "hide" : "show"}
              </button>
            </div>
            {errors.password && <span style={{ fontSize: 12, color: COLORS.error }}>{errors.password}</span>}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, marginTop: 8 }}>
          <input type="checkbox" id="remember" style={{ accentColor: COLORS.charcoal, width: 15, height: 15, cursor: "pointer" }} />
          <label htmlFor="remember" style={{ fontSize: 13, color: COLORS.muted, cursor: "pointer" }}>Keep me logged in</label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 12,
            background: loading ? COLORS.muted : COLORS.charcoal,
            color: COLORS.cream,
            fontSize: 15,
            fontWeight: 700,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'DM Sans',sans-serif",
            transition: "background 0.15s",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? <span style={{ animation: "pulse 1s infinite" }}>Logging in…</span> : "Log in →"}
        </button>

        <Divider label="or continue with" />

        <button
          style={{
            width: "100%",
            marginTop: 16,
            padding: "13px",
            borderRadius: 12,
            background: COLORS.white,
            border: `1.5px solid ${COLORS.borderDark}`,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif",
            color: COLORS.charcoal,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.surface)}
          onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.white)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <p style={{ textAlign: "center", marginTop: 28, fontSize: 13, color: COLORS.muted }}>
          Having trouble? <span style={{ color: COLORS.charcoal, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>Contact support</span>
        </p>
      </div>
    </AuthLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<RedirectIfAuthenticated><SignUpPage /></RedirectIfAuthenticated>} />
        <Route path="/login" element={<RedirectIfAuthenticated><LoginPage /></RedirectIfAuthenticated>} />
        <Route path="/onboarding" element={<RequireAuth><OnboardingRoute /></RequireAuth>} />
        <Route path="/home" element={<RequireAuth><HomeRoute /></RequireAuth>} />
        <Route path="/product/:id" element={<RequireAuth><ProductRoute /></RequireAuth>} />
        <Route path="/cart" element={<RequireAuth><CartRoute /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><DashboardRoute /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
