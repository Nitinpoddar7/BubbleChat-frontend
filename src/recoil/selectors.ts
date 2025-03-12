import { selector } from "recoil";

export const darkModeSelector = selector({
    key: 'darkModeSelector',
    get: () => {
        const savedTheme = localStorage.getItem('user-theme')
        if (savedTheme === 'light') return false;
        if (savedTheme === 'dark') return true;
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
})