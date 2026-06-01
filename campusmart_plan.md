# Kampus — CampusMart Project Plan

## Project Overview
A campus-based e-commerce platform for student entrepreneurs across Ghana's universities.
**Brand name:** Kampus

---

## Design System
- **Background:** Cream `#F5F0E8`
- **Primary text:** Charcoal `#1A1A1A`
- **Accent:** Amber `#E8A020`
- **Surface:** `#EDE8DF`
- **Border:** `#DDD8CE`
- **Fonts:** DM Serif Display (headings) + DM Sans (body)
- **No purple or blue gradients**

---

## Tech Stack
| Layer | Tool |
|---|---|
| Frontend | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| State | Zustand |
| Backend/DB | Firebase (Firestore + Realtime DB + Storage) |
| Auth | Firebase Auth (email + Google SSO) |
| Functions | Cloud Functions (TypeScript) |
| Payment | Paystack (MoMo + Card — free tier) |
| Search | Algolia (free tier) |
| Images | Cloudinary (free tier) |
| PWA | Vite PWA plugin (manifest + service worker) |

---

## System Architecture (5 Layers)

### Layer 1 — Client
- React + TypeScript PWA
- Zustand global state
- React Router v6

### Layer 2 — Gateway
- Firebase Hosting (CDN + SSL)
- Firebase Auth (email + Google SSO)
- Firebase Security Rules (RBAC)

### Layer 3 — Firebase Services
- Firestore DB (Products, Orders, Users)
- Firebase Storage (images, avatars)
- Realtime DB (chat, live notifications)
- FCM (push notifications)
- Analytics
- Remote Config (feature flags)

### Layer 4 — Cloud Functions (TypeScript)
- Order Handler (create, update, cancel)
- Payment Webhook (verify, settle)
- Student Verify (email domain check)
- Notification Dispatcher
- Search Indexer (Algolia sync)
- Commission Calculator (5–10%)

### Layer 5 — External Services
- Paystack (MTN MoMo, AirtelTigo, Vodafone Cash, card)
- Algolia (full-text product search)
- Cloudinary (image CDN + resize)

---

## PWA Folder Structure
```
campusmart-pwa/
├── main.tsx
├── App.tsx
├── index.html
├── manifest.json
├── sw.ts
├── vite.config.ts
├── .env
├── pages/
│   ├── Home.tsx          # Feed + search bar
│   ├── Product.tsx       # Detail + add to cart
│   ├── Cart.tsx          # Items + totals + checkout
│   ├── Dashboard.tsx     # Seller: sales, orders, listings
│   ├── Auth/             # Login, SignUp
│   ├── Chat.tsx
│   └── Profile.tsx
├── components/
│   ├── ui/               # Button, Input, Modal, Badge
│   ├── product/          # ProductCard, ProductGrid
│   ├── layout/           # Navbar, BottomNav, Sidebar
│   ├── auth/             # AuthGuard, RoleGuard
│   └── common/           # Spinner, Empty
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useProducts.ts
│   ├── useOrders.ts
│   ├── useSearch.ts
│   └── useChat.ts
├── store/
│   ├── authStore.ts
│   ├── cartStore.ts
│   ├── uiStore.ts
│   └── notificationStore.ts
├── services/
│   ├── firebase.ts
│   ├── auth.ts
│   ├── products.ts
│   ├── orders.ts
│   ├── storage.ts
│   └── search.ts
├── types/
│   ├── User.ts
│   ├── Product.ts
│   ├── Order.ts
│   ├── Cart.ts
│   ├── Review.ts
│   └── University.ts
├── utils/
│   ├── formatCurrency.ts
│   ├── validateEmail.ts
│   └── dateHelpers.ts
├── assets/
└── styles/
    ├── globals.css
    └── tokens.css
```

---

## User Flow
```
Landing Page
├── → Sign Up → Onboarding (uni + role) → Home Feed
└── → Log In → Home Feed
                 ├── Category Browse → Product Detail → Cart → Checkout → Paystack → Order Confirmed
                 ├── Search Results  → Product Detail
                 ├── Seller Profile  → Product Detail
                 └── Seller Dashboard → Add Listing / Manage Orders / Chat
```

---

## Pages Built ✓
- [x] Landing Page
- [x] Sign Up Page
- [x] Login Page

## Pages Remaining
- [ ] Onboarding (university + role selection)
- [ ] Home Feed
- [ ] Category Browse
- [ ] Search Results
- [ ] Product Detail
- [ ] Cart & Checkout
- [ ] Payment (Paystack integration)
- [ ] Order Confirmation
- [ ] Seller Dashboard
- [ ] Add Listing
- [ ] Chat
- [ ] Profile

---

## Monetisation (Future)
- 5–10% commission on completed transactions
- Premium/featured listings
- Campus advertising spots
- Seller analytics dashboard (paid)

## Initial Launch Universities
- University of Ghana (UG)
- KNUST
- University of Cape Coast (UCC)
- Ashesi University

## Expansion
Ghana → All tertiary institutions → West Africa

---

*Document Version 1.0 | Last updated: May 2026*
