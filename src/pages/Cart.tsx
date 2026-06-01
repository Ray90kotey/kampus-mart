import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";

export default function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  return (
    <div style={{ minHeight: "100vh", padding: 32, background: "#F5F0E8" }}>
      <div style={{ maxWidth: 1024, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, margin: 0 }}>Shopping cart</h1>
            <p style={{ color: "#6B6560", lineHeight: 1.7, marginTop: 8 }}>Review your items before checkout. Add more from the home feed or update quantities as needed.</p>
          </div>
          <button
            type="button"
            onClick={() => clearCart()}
            style={{ padding: "14px 20px", borderRadius: 16, border: "1px solid #DDD8CE", background: "#FFFFFF", color: "#1A1A1A", cursor: "pointer" }}
          >
            Clear cart
          </button>
        </div>

        {items.length === 0 ? (
          <div style={{ padding: 40, background: "#FFFFFF", borderRadius: 28, textAlign: "center" }}>
            <p style={{ color: "#6B6560", marginBottom: 20 }}>Your cart is empty. Add a product from the home feed to get started.</p>
            <button
              type="button"
              onClick={() => navigate("/home")}
              style={{ padding: "14px 24px", borderRadius: 16, border: "none", background: "#E8A020", color: "#1A1A1A", cursor: "pointer", fontWeight: 700 }}
            >
              Browse products
            </button>
          </div>
        ) : (
          <div style={{ background: "#FFFFFF", borderRadius: 28, padding: 28, boxShadow: "0 20px 50px rgba(26,26,26,0.08)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 16, paddingBottom: 16, borderBottom: "1px solid #EEE" }}>
              <strong>Product</strong>
              <strong>Price</strong>
              <strong>Qty</strong>
              <strong>Subtotal</strong>
            </div>
            {items.map((item) => (
              <div key={item.product.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 16, alignItems: "center", padding: "18px 0", borderBottom: "1px solid #F0EFEA" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{item.product.title}</div>
                  <div style={{ color: "#6B6560", fontSize: 13 }}>{item.product.university} · {item.product.category}</div>
                </div>
                <div>GH₵{item.product.price}</div>
                <div>{item.quantity}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span>GH₵{item.product.price * item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    style={{ background: "none", border: "none", color: "#E8A020", cursor: "pointer", fontWeight: 700 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28, flexWrap: "wrap", gap: 16 }}>
              <div style={{ color: "#6B6560" }}>Ready to checkout? This is a mock flow with cart state persisted locally.</div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#6B6560", fontSize: 14 }}>Order total</div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#1A1A1A" }}>GH₵{total}</div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/home")}
                  style={{ padding: "16px 28px", borderRadius: 18, border: "none", background: "#E8A020", color: "#1A1A1A", cursor: "pointer", fontWeight: 700 }}
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
