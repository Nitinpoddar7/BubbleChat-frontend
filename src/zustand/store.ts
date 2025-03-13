import { create } from "zustand";

type DarkModeState = {
    isDarkMode: boolean;
    toggleTheme: () => void;
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