import Logo from "../assets/Logo";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
    return (
        <div className="flex px-4 py-2 justify-between items-center">
            <div className="flex gap-1 justify-center items-center cursor-pointer">
                <Logo size="1.5rem"/>
                <h1 className="text-3xl sm:text-4xl">BubbleChat</h1>
            </div>
            <div className="flex gap-1 justify-center-items-center">
                <ThemeSwitch />
            </div>
        </div>
    )
}

export default Header;