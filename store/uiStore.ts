import { persist } from "zustand/middleware";
import { create } from "zustand";
import type { University } from "../types/User";

export type DeliveryOption = "Campus pickup" | "Door delivery" | "Express";

type UiState = {
  selectedCampus: University | "All Ghana";
  deliveryOption: DeliveryOption;
  deliveryAddress: string;
  setSelectedCampus: (campus: University | "All Ghana") => void;
  setDeliveryOption: (option: DeliveryOption) => void;
  setDeliveryAddress: (address: string) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      selectedCampus: "All Ghana",
      deliveryOption: "Campus pickup",
      deliveryAddress: "",
      setSelectedCampus: (selectedCampus) => set({ selectedCampus }),
      setDeliveryOption: (deliveryOption) => set({ deliveryOption }),
      setDeliveryAddress: (deliveryAddress) => set({ deliveryAddress }),
    }),
    {
      name: "campusmart-ui",
      partialize: (state) => ({
        selectedCampus: state.selectedCampus,
        deliveryOption: state.deliveryOption,
        deliveryAddress: state.deliveryAddress,
      }),
    }
  )
);
