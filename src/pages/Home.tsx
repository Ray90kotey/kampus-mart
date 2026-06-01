import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getFeaturedProducts } from "../../services/products";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";

const categories = [
  "Textbooks",
  "Dorm Essentials",
  "Digital Services",
  "Tutoring",
  "Campus Events",
];

export default function HomePage() {
  const navigate = useNavigate();
  const products = useMemo(() => getFeaturedProducts(), []);
  const addItem = useCartStore((state) => state.addItem);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="page-shell">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">Student marketplace</span>
          <h1>Your campus marketplace feed</h1>
          <p>
            Browse student-led products and services from top universities. Add to cart,
            explore trusted listings, and keep your campus hustle moving.
          </p>

          <div className="hero-actions">
            <button type="button" className="kt-btn kt-btn-primary" onClick={() => navigate("/home")}>Browse listings</button>
            <button type="button" className="kt-btn kt-btn-secondary" onClick={() => navigate("/signup")}>Sell on Kampus</button>
          </div>

          <div className="hero-stats">
            <div className="stat-pill">
              <strong>14k+</strong>
              <span>Student offers</span>
            </div>
            <div className="stat-pill">
              <strong>4</strong>
              <span>Partner campuses</span>
            </div>
            <div className="stat-pill">
              <strong>MoMo</strong>
              <span>Payments supported</span>
            </div>
          </div>
        </div>

        <div className="hero-copy" style={{ background: "#FDF8EE" }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontSize: 28 }}>Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}.</h2>
            <p style={{ color: "#6B6560", marginTop: 12 }}>
              Discover fresh campus-ready finds handpicked for your university.
            </p>
          </div>

          <div className="category-strip">
            {categories.map((category) => (
              <div key={category} className="category-pill">{category}</div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="eyebrow">Featured listings</div>
            <h2 style={{ margin: "12px 0 0", fontSize: 36 }}>Top picks for campus life</h2>
          </div>
          <button type="button" className="kt-btn kt-btn-secondary" onClick={() => navigate("/home")}>View all listings</button>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-item">
              <figure>
                <img src={product.image} alt={product.title} />
              </figure>
              <div className="product-body">
                <div className="product-meta">{product.category} · {product.university}</div>
                <h3 className="product-title">{product.title}</h3>
                <p style={{ color: "#6B6560", lineHeight: 1.7, margin: 0 }}>{product.description}</p>
                <div className="product-tags">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="product-price">
                  <span className="price">GH₵{product.price}</span>
                  <span style={{ color: "#6B6560", fontSize: 13 }}>{product.rating} ★</span>
                </div>
              </div>
              <div className="product-actions">
                <button
                  type="button"
                  className="kt-btn kt-btn-primary"
                  onClick={() => addItem(product)}
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
