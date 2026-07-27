import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getFeaturedProducts } from "../../services/products";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";
import type { University } from "../../types/University";

const categories = [
  "Textbooks",
  "Dorm Essentials",
  "Campus Services",
  "Tutoring",
  "Event Tickets",
];

const campusOptions: Array<University | "All Ghana"> = [
  "All Ghana",
  "University of Ghana (UG)",
  "KNUST",
  "University of Cape Coast (UCC)",
  "Ashesi University",
];

const campusMarkets = [
  { university: "University of Ghana (UG)", active: 38 },
  { university: "KNUST", active: 42 },
  { university: "University of Cape Coast (UCC)", active: 14 },
  { university: "Ashesi University", active: 21 },
];

const trendingActions = [
  { title: "New drop", description: "Limited campus merch available now" },
  { title: "Flash offer", description: "Discounts from top student sellers" },
  { title: "Campus pickup", description: "Fast local delivery and collection" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const products = useMemo(() => getFeaturedProducts(), []);
  const selectedCampus = useUiStore((state) => state.selectedCampus);
  const setSelectedCampus = useUiStore((state) => state.setSelectedCampus);
  const addItem = useCartStore((state) => state.addItem);
  const user = useAuthStore((state) => state.user);

  const filteredProducts = useMemo(
    () =>
      selectedCampus === "All Ghana"
        ? products
        : products.filter((product) => product.university === selectedCampus),
    [products, selectedCampus]
  );

  return (
    <div className="page-shell home-page">
      <section className="home-hero-banner">
        <div className="home-hero-content">
          <span className="eyebrow">Campus marketplace</span>
          <h1>Find what your campus is buzzing about.</h1>
          <p>
            Discover student-made goods, digital services, and campus experiences across top Ghanaian universities.
          </p>

          <div className="search-panel">
            <select
              value={selectedCampus}
              onChange={(event) => setSelectedCampus(event.target.value as University | "All Ghana")}
              className="campus-selector"
            >
              {campusOptions.map((campus) => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
            <input type="search" placeholder="Search textbooks, tutors, tickets..." />
            <button type="button" className="kt-btn kt-btn-primary" onClick={() => navigate("/home")}>Search</button>
          </div>

          <div className="category-strip home-category-strip">
            {categories.map((category) => (
              <button key={category} type="button" className="category-pill category-pill-soft">{category}</button>
            ))}
          </div>
          <div className="Campus-market-strip">
            {campusMarkets.map((campus) => (
              <button
                key={campus.university}
                type="button"
                className={selectedCampus === campus.university ? "campus-pill active" : "campus-pill"}
                onClick={() => setSelectedCampus(campus.university as University)}
              >
                <strong>{campus.university}</strong>
                <span>{campus.active} active items</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-card hero-card-large">
            <div>
              <span className="eyebrow">Hot this week</span>
              <h2>Study kits & service bundles</h2>
            </div>
            <div className="hero-card-footer">Trusted by students at UG, KNUST, UCC & Ashesi.</div>
          </div>

          <div className="hero-card-grid">
            {trendingActions.map((item) => (
              <div key={item.title} className="hero-card hero-card-small">
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-panels">
        <div className="welcome-box">
          <div>
            <h2>Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}.</h2>
            <p>Shop smarter with tailored listings, local pickup, and secure student payments.</p>
          </div>
          <button type="button" className="kt-btn kt-btn-secondary" onClick={() => navigate("/dashboard")}>Open dashboard</button>
        </div>

        <div className="overview-widgets">
          <div className="widget-card">
            <span className="widget-title">Live listings</span>
            <strong>58</strong>
            <p>Fresh products added by student sellers today.</p>
          </div>
          <div className="widget-card">
            <span className="widget-title">Top university</span>
            <strong>KNUST</strong>
            <p>Most active listings this week.</p>
          </div>
          <div className="widget-card">
            <span className="widget-title">Fast pickup</span>
            <strong>80%</strong>
            <p>Popular listings offering campus pickup.</p>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Featured listings</span>
            <h2>Top campus picks</h2>
          </div>
          <button type="button" className="kt-btn kt-btn-secondary" onClick={() => navigate("/home")}>Explore all</button>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
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
