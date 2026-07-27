import type { CartItem } from "./Cart";

export type OrderStatus = "Pending" | "Complete" | "Cancelled";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  // Optional fulfillment/payment details
  deliveryOption?: string;
  deliveryAddress?: string;
  paymentMethod?: string;
}
