import { create } from "zustand";

// type
export type userType = {
  userID: string | null;
  userRole: string | null;
  setUserID: (id: string) => void;
  setUserRole: (role: string) => void;
};

// create store
export const useUserDetails = create<userType>((set) => ({
  userID: null,
  userRole: null,
  setUserID: (id) => set({ userID: id }),
  setUserRole: (role) => set({ userRole: role }),
}));
