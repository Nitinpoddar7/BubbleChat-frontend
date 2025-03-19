import { useEffect } from "react"
import Sun from "../assets/Sun"
import Moon from "../assets/Moon"
import { useDarkMode } from "../zustand/store"

const ThemeSwitch = ({type}: {type?: 'icon' | 'text'}) => {
    // const { isDarkMode, toggleTheme } = useDarkMode((state) => ({
    //     isDarkMode: state.isDarkMode,
    //     toggleTheme: state.toggleTheme
    // }));

    const isDarkMode = useDarkMode(state => state.isDarkMode)
    const toggleTheme = useDarkMode(state => state.toggleTheme)

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode)
        document.body.classList.toggle('light', !isDarkMode)
        localStorage.setItem('user-theme', isDarkMode ? 'dark' : 'light')
    }, [isDarkMode])

    if (type === 'text') {
        return (
            <div className="flex cursor-pointer p-1 justify-center items-center border-b-2 border-b-transparent hover:border-b-black dark:hover:border-b-white">
                <button className="cursor-pointer" onClick={toggleTheme}>
                    <span>Theme: {isDarkMode ? 'Dark' : 'Light'}</span>
                </button>
            </div>
        )
    }

    return (
        <div className="flex cursor-pointer p-1 justify-center items-center border-b-2 border-b-transparent hover:border-b-black dark:hover:border-b-white">
            <button className="cursor-pointer" onClick={toggleTheme}>
                {isDarkMode ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
            </button>
        </div>
    )
}

export default ThemeSwitch;