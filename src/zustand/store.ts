import { create } from "zustand";

type DarkModeState = {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

type MenuState = {
    isOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
}

type SocketState = {
    socket: WebSocket | null,
    setSocket: (obj: WebSocket) => void
}

export const useDarkMode = create<DarkModeState>((set) => ({
    isDarkMode: (() => {
        const savedTheme = localStorage.getItem('user-theme')
        if (savedTheme === 'light') return false;
        if (savedTheme === 'dark') return true;
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })(),
    toggleTheme: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode }))
}))

export const useMobileMenu = create<MenuState>((set) => ({
    isOpen: false,
    openMenu: () => set(() => ({ isOpen: true })),
    closeMenu: () => set(() => ({isOpen: false}))
}))

export const useSocket = create<SocketState>((set) => ({
    socket: null,
    setSocket: (obj: WebSocket) => set(() => ({socket: obj}))
}))