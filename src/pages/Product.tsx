import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../services/products";
import { useCartStore } from "../../store/cartStore";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getProductById(id), [id]);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", padding: 32, background: "#F5F0E8" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, marginBottom: 16 }}>Product not found</h1>
        <button
          onClick={() => navigate("/home")}
          style={{ marginTop: 24, padding: "14px 24px", borderRadius: 12, border: "none", background: "#E8A020", color: "#1A1A1A", cursor: "pointer", fontWeight: 700 }}
        >
          Back to feed
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: 32, background: "#F5F0E8" }}>
      <div style={{ maxWidth: 1024, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 0.9fr", gap: 32 }}>
        <div style={{ background: "#FFFFFF", borderRadius: 28, overflow: "hidden", boxShadow: "0 24px 60px rgba(26,26,26,0.08)" }}>
          <div style={{ height: 420, backgroundImage: `url(${product.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, marginBottom: 18 }}>
              <div>
                <div style={{ color: "#A08F7E", marginBottom: 6 }}>{product.category} · {product.university}</div>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, margin: 0 }}>{product.title}</h1>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: "#E8A020" }}>GH₵{product.price}</div>
                <div style={{ color: "#6B6560", marginTop: 4 }}>{product.rating} ★ · {product.reviews} reviews</div>
              </div>
            </div>
            <p style={{ color: "#6B6560", lineHeight: 1.8, marginBottom: 28 }}>{product.description}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              {product.tags.map((tag) => (
                <span key={tag} style={{ padding: "10px 14px", borderRadius: 999, background: "#F5F0E8", color: "#6B6560", fontSize: 13 }}>{tag}</span>
              ))}
            </div>
            <button
              onClick={() => { addItem(product); navigate("/cart"); }}
              style={{ padding: "16px 28px", borderRadius: 18, border: "none", background: "#E8A020", color: "#1A1A1A", cursor: "pointer", fontWeight: 700, fontSize: 16 }}
            >
              Add to cart
            </button>
          </div>
        </div>

        <aside style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 24, boxShadow: "0 18px 40px rgba(26,26,26,0.08)" }}>
            <h2 style={{ fontSize: 22, marginBottom: 16 }}>Seller info</h2>
            <p style={{ color: "#6B6560", lineHeight: 1.75 }}>
              Sold by <strong>{product.seller}</strong> from {product.university}. Trusted student seller with fast message response.
            </p>
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 24, boxShadow: "0 18px 40px rgba(26,26,26,0.08)" }}>
            <h2 style={{ fontSize: 22, marginBottom: 16 }}>Why students love this</h2>
            <ul style={{ color: "#6B6560", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>Fast response and campus pickup available.</li>
              <li>High quality and student-focused pricing.</li>
              <li>Trusted reviews from past buyers.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
