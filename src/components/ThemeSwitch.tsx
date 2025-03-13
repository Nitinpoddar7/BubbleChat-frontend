import { useEffect } from "react"
import Sun from "../assets/Sun"
import Moon from "../assets/Moon"
import { useDarkMode } from "../zustand/store"

const ThemeSwitch = () => {
    const { isDarkMode, toggleTheme } = useDarkMode((state) => ({
        isDarkMode: state.isDarkMode,
        toggleTheme: state.toggleTheme
    }));

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode)
        document.body.classList.toggle('light', !isDarkMode)
        localStorage.setItem('user-theme', isDarkMode ? 'dark' : 'light')
    }, [])

    return (
        <div className="flex justify-center items-center hover:border-b border-b-black dark:border-b-white">
            <button onClick={toggleTheme}>
                {isDarkMode ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
            </button>
        </div>
    )
}

export default ThemeSwitch;