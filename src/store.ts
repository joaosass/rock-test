import {create} from 'zustand';

import {devtools} from 'zustand/middleware';
import {Rock} from './types';

interface Snackbar {
  isVisible: boolean;
  message?: string;
  type?: 'success' | 'error';
}

interface State {
  editingRock?: Partial<Rock>;
  isModalVisible: boolean;
  refetchListKey: number;
  snackbar: Snackbar;
  username: string;
  token: string;
  setEditingRock: (rock?: Rock) => void;
  setIsModalVisible: (isVisible: boolean) => void;
  setRefetchListKey: () => void;
  setSnackbar: (snackbar: Snackbar) => void;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
}

const useStore = create<State>()(
  devtools(set => ({
    editingRock: undefined,
    isModalVisible: false,
    refetchListKey: 0,
    snackbar: {isVisible: false},
    username: '',
    token: '',
    setEditingRock: editingRock => set(() => ({editingRock})),
    setIsModalVisible: isModalVisible => set(() => ({isModalVisible})),
    setRefetchListKey: () => set(() => ({refetchListKey: Math.random()})),
    setSnackbar: snackbar => set(() => ({snackbar})),
    setUsername: username => set(() => ({username})),
    setToken: token => set(() => ({token})),
  })),
);

export default useStore;
