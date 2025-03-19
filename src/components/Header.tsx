import { useLocation, useNavigate } from "react-router-dom";
import CrossIcon from "../assets/Crossicon";
import Logo from "../assets/Logo";
import MenuIcon from "../assets/MenuIcon";
import { useMobileMenu, useSocket } from "../zustand/store";
import ThemeSwitch from "./ThemeSwitch";
import { useRef, useState } from "react";

const Header = () => {
    const isOpen = useMobileMenu(state => state.isOpen)
    const openMenu = useMobileMenu(state => state.openMenu)
    const closeMenu = useMobileMenu(state => state.closeMenu)
    const navigate = useNavigate()
    const isHomePage = useLocation().pathname === "/"
    const [showCreate, setShowCreate] = useState(false)
    const [showJoin, setShowJoin] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const mySocket = useSocket(state => state.socket)

    function createRoom() {
        if (!mySocket || mySocket.readyState !== WebSocket.OPEN) {
            return alert('WebSocket connection failed.\nPlease refresh the page.')
        }
        setShowCreate(true)

        mySocket.send(JSON.stringify({
            type: 'create'
        }))

        mySocket.onmessage = (e) => {
            const id = e.data.toString()
            console.log('Created Bubble:', id)
            navigate(`/join/${id}`)
        }

        mySocket.onerror = () => {
            alert('WebSocket connection failed.\nPlease refresh the page.')
            setShowCreate(false)
        }
    }

    function showJoinBox() {
        setShowJoin(true)
    }

    function joinRoom() {
        const id = inputRef.current?.value
        if (!id) return alert('ID cannot be empty');

        navigate(`/join/${id}`)
    }

    return (
        <>
        {/* CREATE ROOM LOADING */}
        {showCreate && <div className="bg-black/80 backdrop:backdrop-blur-2xl absolute w-full h-screen z-10 flex justify-center items-center">
            <div className="p-8 border-2 dark:border-white border-black rounded-lg dark:bg-black bg-white text-3xl sm:text-4xl">Creating Room...</div>
        </div>}
        {/* JOIN ROOM INPUT */}
        {showJoin && <div className="bg-black/80 backdrop:backdrop-blur-2xl absolute w-full h-full z-10 flex justify-center items-center">
            <div className="mx-4 p-8 flex gap-2 flex-col border-2 dark:border-white border-black rounded-lg dark:bg-black bg-white text-3xl sm:text-4xl">
                <div className="w-full flex justify-center">
                    <div onClick={() => setShowJoin(false)} className="text-2xl cursor-pointer flex justify-center items-center gap-1">
                        <span>Close</span><CrossIcon size="1.5rem" />
                    </div>
                </div>
                <input ref={inputRef} type="text" maxLength={6} placeholder="Enter bubble ID" className="w-full focus:border-blue-400 outline-none border-black dark:border-white border-1 rounded-lg py-2 px-4 text-base" />
                <button onClick={joinRoom} className="cursor-pointer border border-inherit hover:border-blue-400 hover:text-blue-400 rounded-lg py-2 px-4 text-base">Join</button>
            </div>
        </div>}
        <div className="border-b border-b-gray-500 flex px-4 py-2 sm:py-4 justify-between items-center">
            {/* MAIN LOGO */}
            <div className="flex gap-1 justify-center items-center cursor-pointer">
                <Logo size="2rem"/>
                <h1 className="text-4xl">BubbleChat</h1>
            </div>
            {/* THEME AND ACTION BUTTONS */}
            <div className="hidden sm:flex gap-1.5 justify-center-items-center">
                <ThemeSwitch />
                {isHomePage && <button onClick={createRoom} className=" border-black dark:border-white border-2 rounded-3xl px-4 py-2 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-blue-800 duration-150 transition-colors hover:text-white dark:hover:text-black">Create Bubble</button>}
                {isHomePage && <button onClick={showJoinBox} className=" border-black dark:border-white border-2 rounded-3xl px-4 py-2 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-blue-800 duration-150 transition-colors hover:text-white dark:hover:text-black">Join Bubble</button>}
            </div>
            {/* HAMBURGER ICON FOR MENU ACCESS */}
            <div className="sm:hidden cursor-pointer">
                {!isOpen && <span onClick={openMenu}><MenuIcon size="2rem" /></span>}
                {isOpen && <span onClick={closeMenu}><CrossIcon size="2rem" /></span>}
            </div>
        </div>
        {/* MENU FOR SMALL SCREENS */}
        <div className={`${isOpen ? 'px-4 py-2 border-b-2' : 'border-none'} sm:hidden flex flex-col items-center border-b-gray-500 overflow-hidden duration-200 ${isOpen ? 'max-h-52' : 'max-h-0'}`}>
            <ThemeSwitch type="text" />
            {isHomePage && <div className="flex gap-2">
                <button onClick={createRoom} className=" border-black dark:border-white border-2 rounded-3xl px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-500 to-blue-800 duration-150 transition-colors hover:text-white dark:hover:text-black">Create Bubble</button>
                <button onClick={showJoinBox} className=" border-black dark:border-white border-2 rounded-3xl px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-500 to-blue-800 duration-150 transition-colors hover:text-white dark:hover:text-black">Join Bubble</button>
            </div>}
        </div>
        </>
    )
}

export default Header;