import { useRecoilValue, useSetRecoilState } from "recoil"
import { darkModeAtom } from "../recoil/atoms"
import { useEffect } from "react"
import Sun from "../assets/Sun"
import Moon from "../assets/Moon"

const ThemeSwitch = () => {
    const isDarkMode = useRecoilValue(darkModeAtom)
    const setTheme = useSetRecoilState(darkModeAtom)

    const toggleTheme = () => {
        setTheme(theme => !theme)
    }

    useEffect(() => {
        if (isDarkMode) {
            localStorage.setItem('user-theme', 'dark')
            document.body.classList.add('dark')
            document.body.classList.remove('light')
        }
        else {
            localStorage.setItem('user-theme', 'light')
            document.body.classList.add('light')
            document.body.classList.remove('dark')
        }
    }, [isDarkMode])

    return (
        <div className="flex justify-center items-center hover:border-b border-b-black dark:border-b-white">
            <button onClick={toggleTheme}>
                {isDarkMode ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
            </button>
        </div>
    )
}

export default ThemeSwitch;