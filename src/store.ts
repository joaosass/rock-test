import {create} from 'zustand';

import {devtools} from 'zustand/middleware';

interface User {
  email: string;
  name: string;
}

interface State {
  user: User;
  setUser: (email: string, name: string) => void;
}

const useStore = create<State>()(
  devtools(set => ({
    user: {
      email: '',
      name: '',
    },
    setUser: (email, name) => set(() => ({user: {email, name}})),
  })),
);

export default useStore;
