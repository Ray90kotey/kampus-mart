import type { Product } from "../types/Product";
import type { University } from "../types/University";

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Custom Kente Tote Bag",
    description: "Handmade tote bag using authentic Kente weaving techniques. Perfect for campus runs and gifts.",
    category: "Fashion",
    price: 180,
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviews: 28,
    seller: "Ama Mensah",
    university: "KNUST",
    tags: ["handmade", "fashion", "accessory"],
  },
  {
    id: "2",
    title: "Data Structures Tutoring",
    description: "Private tutoring sessions for data structures and algorithms, tailored for university coursework.",
    category: "Academics",
    price: 50,
    image: "https://images.unsplash.com/photo-1528238646476-2d04ea9b0a9c?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 34,
    seller: "Kwesi Yeboah",
    university: "University of Ghana (UG)",
    tags: ["tutoring", "code", "academic"],
  },
  {
    id: "3",
    title: "Logo Design Package",
    description: "Fast-turnaround logo and brand asset package for student startups and clubs.",
    category: "Creative",
    price: 120,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    rating: 5.0,
    reviews: 19,
    seller: "Naa Dedei",
    university: "Ashesi University",
    tags: ["design", "branding", "creative"],
  },
];

export const getFeaturedProducts = () => mockProducts;

export const getProductById = (id: string | undefined) => mockProducts.find((product) => product.id === id);

export const searchProducts = (query: string) =>
  mockProducts.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );
