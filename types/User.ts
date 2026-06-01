export type UserRole = "buyer" | "seller" | "both";

export type University =
  | "University of Ghana (UG)"
  | "KNUST"
  | "University of Cape Coast (UCC)"
  | "Ashesi University"
  | "Other";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  university: University;
  avatar?: string;
  needsOnboarding: boolean;
  createdAt: string;
}
