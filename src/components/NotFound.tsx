import { useDarkMode } from "../zustand/store";

const NotFound = () => {
    const isDarkMode = useDarkMode(state => state.isDarkMode)

    return (
        <div className={`${isDarkMode ? 'dark' : ''} bg-white dark:bg-black text-black dark:text-white flex h-screen justify-center flex-col items-center text-center`}>
            <div className="text-3xl sm:text-5xl">
                OOPS! It seems you lost your way.
            </div>
            <div className="mt-4 text-xl">
                Page not found
            </div>
            <div className="mt-4 text-xl">
                (Reason: Bad Route)
            </div>
        </div>
    )
}

export default NotFound;