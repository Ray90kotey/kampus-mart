import type { Order } from "../types/Order";
import type { CartItem } from "../types/Cart";

const STORAGE_KEY = "campusmart-orders";

function readLocalOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch (e) {
    console.error("Failed to read orders from localStorage", e);
    return [];
  }
}

function writeLocalOrders(orders: Order[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error("Failed to write orders to localStorage", e);
  }
}

export async function createOrder(params: {
  items: CartItem[];
  total: number;
  deliveryOption?: string;
  deliveryAddress?: string;
  paymentMethod?: string;
}): Promise<Order> {
  const { items, total, deliveryOption, deliveryAddress, paymentMethod } = params;
  const orders = readLocalOrders();
  const newOrder: Order = {
    id: Date.now().toString(),
    items,
    total,
    status: "Pending",
    createdAt: new Date().toISOString(),
    deliveryOption,
    deliveryAddress,
    paymentMethod,
  };
  orders.unshift(newOrder);
  writeLocalOrders(orders);
  // Simulate async network latency
  await new Promise((r) => setTimeout(r, 200));
  return newOrder;
}

export async function listOrders(): Promise<Order[]> {
  return readLocalOrders();
}
