import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthSchema {
  user: User | null;
  setuser: (user: User) => void;
  logout: () => void;
}


const getUserFromStorage = ()=> {
  try{
    if(typeof window === "undefined") return null; 
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null ;
  }
  catch(error){
    console.log(error);
  }
}


export const useAuthStore = create<AuthSchema>((set) => ({
  user: getUserFromStorage(),
  setuser: (userdata: User) => {
    localStorage.setItem('user' , JSON.stringify(userdata));
    set({user : userdata});
  },
  logout: () => {
    localStorage.removeItem('user');
    set({user : null})
  }
}));
