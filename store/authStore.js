import { create } from "zustand";


//set is a function which updates auth stores values 
const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  email: localStorage.getItem("email") || null,
  role: localStorage.getItem("role") || null,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setemail: (email) => {
    localStorage.setItem("email", email);
    set({ email });
  },

  setrole: (role) => {
    localStorage.setItem("role", role);
    set({ role });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    set({ token: null, email: null, role: null });
  },
}));

export default useAuthStore;
