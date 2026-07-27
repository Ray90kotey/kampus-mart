import { useMemo, useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";
import { useUiStore } from "../../store/uiStore";
import { listOrders } from "../../services/orders";
import type { Order } from "../../types/Order";

const buyerMetrics = [
  { label: "Saved listings", value: "12" },
  { label: "Recent orders", value: "4" },
  { label: "Campus savings", value: "GH₵ 420" },
];

const sellerMetrics = [
  { label: "Active listings", value: "18" },
  { label: "Pending replies", value: "6" },
  { label: "Weekly earnings", value: "GH₵ 1,120" },
];

const buyerWidgets = [
  { title: "Recommended sellers", description: "Top rated campus sellers based on your interests." },
  { title: "Order progress", description: "2 orders are currently being prepared for pickup." },
  { title: "Wishlist highlights", description: "New discounts on saved items from Ashesi and UG." },
];

const sellerWidgets = [
  { title: "Top product", description: "Custom study notes are generating the most interest." },
  { title: "Message queue", description: "5 new buyer inquiries waiting for your response." },
  { title: "Conversion rate", description: "Your listing CTR is 21% this week." },
];

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.items);
  const selectedCampus = useUiStore((state) => state.selectedCampus);
  const totalInCart = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const hasBuyer = user?.role === "buyer" || user?.role === "both";
  const hasSeller = user?.role === "seller" || user?.role === "both";
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    let mounted = true;
    listOrders().then((res) => {
      if (mounted) setOrders(res.slice(0, 10));
    }).catch((err) => console.error(err));
    return () => { mounted = false; };
  }, []);

  return (
    <div className="dashboard-shell">
      <header className="dashboard-hero">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}.</h1>
          <p>Manage your campus shopping and selling activity from one place.</p>
          <p style={{ marginTop: 12, color: "#6B6560" }}>Current market: {selectedCampus}</p>
        </div>
        <div className="role-pill">Role: {user?.role === "both" ? "Buyer & Seller" : user?.role}</div>
      </header>

      <section className="dashboard-grid overview-grid">
        <div className="widget-card dashboard-highlight">
          <span className="widget-label">Cart items</span>
          <strong>{totalInCart}</strong>
          <p>Ready to checkout items waiting in your cart.</p>
        </div>
        {hasBuyer && buyerMetrics.map((metric) => (
          <div key={metric.label} className="widget-card">
            <span className="widget-label">{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
        {hasSeller && sellerMetrics.map((metric) => (
          <div key={metric.label} className="widget-card">
            <span className="widget-label">{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </section>

      {hasBuyer && (
        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Buyer dashboard</span>
              <h2>Stay on top of your campus finds</h2>
            </div>
          </div>
          <div className="dashboard-grid">
            {buyerWidgets.map((widget) => (
              <div key={widget.title} className="widget-card widget-tall">
                <h3>{widget.title}</h3>
                <p>{widget.description}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <h3>Recent orders</h3>
            {orders.length === 0 ? (
              <p style={{ color: "#6B6560" }}>No recent orders.</p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {orders.map((o) => (
                  <div key={o.id} style={{ padding: 12, borderRadius: 10, background: "#fff", border: "1px solid #EFEFEF" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>Order #{o.id}</div>
                      <div style={{ fontWeight: 700 }}>{o.status}</div>
                    </div>
                    <div style={{ color: "#6B6560", fontSize: 13 }}>Items: {o.items.length} • Total: GH₵{o.total}</div>
                    <div style={{ color: "#6B6560", fontSize: 12, marginTop: 6 }}>{new Date(o.createdAt).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {hasSeller && (
        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Seller dashboard</span>
              <h2>Track your listings, messages, and earnings</h2>
            </div>
          </div>
          <div className="dashboard-grid">
            {sellerWidgets.map((widget) => (
              <div key={widget.title} className="widget-card widget-tall">
                <h3>{widget.title}</h3>
                <p>{widget.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
