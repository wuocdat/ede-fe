import { UserDto as User } from "@/types/type.dto";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type State = {
  user: User | null;
};

type Action = {
  setUser: (user: State["user"]) => void;
};

const useUserStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set(() => ({ user })),
      }),
      { name: "userStore" }
    )
  )
);

export default useUserStore;
