import { persist } from "zustand/middleware";
import { create } from "zustand";
import type { User, University, UserRole } from "../types/User";

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  university: University;
};

type AuthState = {
  user: User | null;
  loggingIn: boolean;
  signingUp: boolean;
  login: (email: string, password: string) => void;
  signup: (input: SignUpInput) => void;
  completeOnboarding: (updates: Partial<Pick<User, "role" | "university">>) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist<AuthState, [], [], { user: User | null }>(
    (set) => ({
      user: null,
      loggingIn: false,
      signingUp: false,
      login: (email: string, password: string) =>
        set({
          loggingIn: false,
          user: {
            id: `user-${Date.now()}`,
            name: "Amina Boateng",
            email,
            role: "buyer",
            university: "KNUST",
            avatar: "",
            needsOnboarding: false,
            createdAt: new Date().toISOString(),
          },
        }),
      signup: (input: SignUpInput) =>
        set({
          signingUp: false,
          user: {
            id: `user-${Date.now()}`,
            name: input.name,
            email: input.email,
            role: input.role,
            university: input.university,
            avatar: "",
            needsOnboarding: true,
            createdAt: new Date().toISOString(),
          },
        }),
      completeOnboarding: (updates: Partial<Pick<User, "role" | "university">>) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                ...updates,
                needsOnboarding: false,
              }
            : null,
        })),
      logout: () => set({ user: null }),
    }),
    {
      name: "campusmart-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
