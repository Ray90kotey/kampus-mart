import { useMemo } from "react";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.items);
  const totalInCart = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  return (
    <div style={{ minHeight: "100vh", padding: 32, background: "#F5F0E8" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 24 }}>
        <div style={{ padding: 32, background: "#FFFFFF", borderRadius: 28, boxShadow: "0 18px 40px rgba(26,26,26,0.08)" }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, marginBottom: 16 }}>Seller dashboard</h1>
          <p style={{ color: "#6B6560", lineHeight: 1.75 }}>
            Welcome back, {user?.name.split(" ")[0] ?? "seller"}. Manage your marketplace performance and keep track of active cart activity.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          <div style={{ padding: 24, background: "#FFFFFF", borderRadius: 24, boxShadow: "0 18px 40px rgba(26,26,26,0.08)" }}>
            <p style={{ color: "#6B6560", marginBottom: 10 }}>Active listings</p>
            <div style={{ fontSize: 32, fontFamily: "'DM Serif Display', serif", color: "#1A1A1A" }}>8</div>
          </div>
          <div style={{ padding: 24, background: "#FFFFFF", borderRadius: 24, boxShadow: "0 18px 40px rgba(26,26,26,0.08)" }}>
            <p style={{ color: "#6B6560", marginBottom: 10 }}>Pending orders</p>
            <div style={{ fontSize: 32, fontFamily: "'DM Serif Display', serif", color: "#1A1A1A" }}>3</div>
          </div>
          <div style={{ padding: 24, background: "#FFFFFF", borderRadius: 24, boxShadow: "0 18px 40px rgba(26,26,26,0.08)" }}>
            <p style={{ color: "#6B6560", marginBottom: 10 }}>Items in cart</p>
            <div style={{ fontSize: 32, fontFamily: "'DM Serif Display', serif", color: "#1A1A1A" }}>{totalInCart}</div>
          </div>
        </div>

        <div style={{ padding: 26, background: "#FFFFFF", borderRadius: 28, boxShadow: "0 18px 40px rgba(26,26,26,0.08)" }}>
          <h2 style={{ marginBottom: 14 }}>Recent activity</h2>
          <ul style={{ color: "#6B6560", lineHeight: 1.8, paddingLeft: 18 }}>
            <li>New order request received from UG buyer.</li>
            <li>Profile viewed 125 times in the last week.</li>
            <li>Conversation started with a campus group buying lead.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
