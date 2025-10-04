import { create } from "zustand";


//set is a function which updates auth stores values 
const useAuthStore = create((set) => ({
  token: sessionStorage.getItem("token") || null,
  email: sessionStorage.getItem("email") || null,
  role: sessionStorage.getItem("role") || null,

  setToken: (token) => {
    sessionStorage.setItem("token", token);
    set({ token });
  },

  setemail: (email) => {
    sessionStorage.setItem("email", email);
    set({ email });
  },

  setrole: (role) => {
    sessionStorage.setItem("role", role);
    set({ role });
  },

  logout: () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.clear();
    set({ token: null, email: null, role: null });
  },
}));

export default useAuthStore;
