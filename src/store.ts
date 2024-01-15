import {create} from 'zustand';

import {devtools} from 'zustand/middleware';
import {Rock} from './types';

interface User {
  email: string;
  name: string;
}

interface State {
  editingRock?: Partial<Rock>;
  isModalVisible: boolean;
  refetchListKey: number;
  user: User;
  token: string;
  setEditingRock: (rock?: Rock) => void;
  setIsModalVisible: (isVisible: boolean) => void;
  setRefetchListKey: () => void;
  setUser: (email: string, name: string) => void;
  setToken: (token: string) => void;
}

const useStore = create<State>()(
  devtools(set => ({
    editingRock: undefined,
    isModalVisible: false,
    refetchListKey: 0,
    user: {
      email: '',
      name: '',
    },
    token: '',
    setEditingRock: editingRock => set(() => ({editingRock})),
    setIsModalVisible: isModalVisible => set(() => ({isModalVisible})),
    setRefetchListKey: () => set(() => ({refetchListKey: Math.random()})),
    setUser: (email, name) => set(() => ({user: {email, name}})),
    setToken: token => set(() => ({token})),
  })),
);

export default useStore;
