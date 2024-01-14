import {create} from 'zustand';

import {devtools} from 'zustand/middleware';

interface User {
  email: string;
  name: string;
}

interface State {
  user: User;
  token: string;
  setUser: (email: string, name: string) => void;
  setToken: (token: string) => void;
}

const useStore = create<State>()(
  devtools(set => ({
    user: {
      email: '',
      name: '',
    },
    token: '',
    setUser: (email, name) => set(() => ({user: {email, name}})),
    setToken: token => set(() => ({token})),
  })),
);

export default useStore;
