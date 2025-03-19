import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header"
import Message from "./Message";
import SendIcon from "../assets/SendIcon";
import { useRef, useState, useEffect } from "react";
import { useDarkMode, useSocket } from "../zustand/store";

const ChatPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [messages, setMessages] = useState<any[]>([])
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const mySocket = useSocket(state => state.socket)
    const nameRef = useRef<HTMLInputElement | null>(null)
    const [myName, setMyName] = useState('')
    const friendName = useRef('')
    const userId = useRef('')
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isDarkMode = useDarkMode(state => state.isDarkMode)

    if (isDarkMode) {
        document.body.classList.toggle('dark', isDarkMode)
    }

    async function shareBubble() {
        try {
            if (!navigator.clipboard || !navigator.clipboard.writeText) {
                return prompt("Copy this link to share:", `http://192.168.1.104:5173/join/${id}`)
            }
            await navigator.clipboard.writeText(`http://192.168.1.104:5173/join/${id}`)
            alert('Link copied to clipboard')
        } catch (e) {
            alert('Failed to get link')
        }
    }

    function clickDone() {
        const name = nameRef.current?.value
        if (!name) {
            return alert('Name cannot be empty')
        }
        setMyName(name)
    }

    function sendMessage() {
        if (!inputRef.current?.value) return;
        mySocket?.send(JSON.stringify({
            type: 'chat',
            payload: {
                message: inputRef.current.value,
                roomId: id,
                senderId: userId.current,
                senderName: myName
            }
        }))
        inputRef.current.value = ''
    }

    useEffect(() => {
        userId.current = Math.random().toString()
    }, [])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (!mySocket || mySocket.readyState !== WebSocket.OPEN || !myName) return;
        
        mySocket.send(JSON.stringify({
            type: 'join',
            payload: {
                roomId: id,
                userName: myName
            }
        }))

        mySocket.onmessage = (e) => {
            try {
                // handeling response obtained during join request
                if (e.data === 'failure') {
                    alert('Incorrect bubble ID')
                    return navigate('/') 
                } else if (e.data === 'room-full') {
                    alert('Bubble already has 2 members')
                    return navigate('/')
                } else if (e.data === 'success') {
                    return console.log('Bubble joined successfully')
                }

                const data = JSON.parse(e.data) // contains data from server

                // handeling join info
                if (data.type === 'info' && data.payload.action === 'join') {
                    friendName.current = data.payload.name
                    setMessages(previousMessages => [...previousMessages, {
                        type: 'info',
                        text: `${friendName.current} joined the chat`
                    }])
                }

                // handeling leave info
                if (data.type === 'info' && data.payload.action === 'leave') {
                    setMessages(previousMessages => [...previousMessages, {
                        type: 'info',
                        text: `${friendName.current} left the chat`
                    }])
                }

                // handeling chats
                if (data.type === 'msg') {
                    const isMine = userId.current === data.payload.senderId.toString();
                    setMessages(previousMessages => [...previousMessages, {
                        type: 'message',
                        text: data.payload.message,
                        isMine,
                        sender: data.payload.senderName
                    }])
                }

                if (data.type === 'ask') {
                    mySocket.send(JSON.stringify({
                        type: 'details',
                        roomId: id,
                        name: myName
                    }))
                }

                if (data.type === 'details') {
                    friendName.current = data.name;
                    setMessages(previousMessages => [...previousMessages, {
                        type: 'info',
                        text: `${friendName.current} joined the chat`
                    }])
                }
            } catch (error) {
                console.log('Invalid message format:', e.data)
            }
        }
    }, [mySocket, myName])

    if (!myName) {
        return (
            <div className="w-full h-screen text-black dark:text-white bg-white dark:bg-black flex justify-center items-center">
                <div className="flex w-[280px] justify-center items-center flex-col gap-2">
                <input ref={nameRef} type="text" maxLength={20} placeholder="Enter your name" className="w-full px-4 py-2 border-2 border-black dark:border-white rounded-md outline-none focus:border-blue-600" />
                <div className="flex gap-2 w-full justify-center items-center">
                    <button onClick={clickDone} className="w-full py-2 px-4 rounded-md text-black dark:text-white border-2 border-black dark:border-white cursor-pointer hover:border-blue-600">Done</button>
                    <button onClick={() => navigate('/')} className="w-full py-2 px-4 rounded-md text-black dark:text-white border-2 border-black dark:border-white cursor-pointer hover:border-blue-600">Cancel</button>
                </div>
                </div>
            </div>
        )
    }

    
    return (
        <div className="h-screen max-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
            <Header />
            {/* BELOW ARE CHATBOX CONTAINER AND CHATBOX */}
            <div className="w-full px-4 flex-1 flex justify-center overflow-hidden">
                {/* CHAT BOX */}
                <div className="m-4 p-2 flex flex-col gap-4 border-2 border-inherit rounded-lg w-full sm:w-[60%] md:w-[50%]">
                    {/* ROOM INFO AND ACTION BUTTONS */}
                    <div className="py-2 w-full flex flex-col gap-1 text-center justify-center items-center border rounded-lg border-inherit">
                        <span>Your Bubble ID: {id}</span>
                        <div className="">
                            <div className="text-red-500 dark:text-red-400">Bubble will pop if both users leave.</div>
                            {/* SHARE AND LEAVE BUTTON */}
                            <div className="flex mt-2 w-full gap-4 justify-center items-center">
                            <button onClick={shareBubble} className=" border-black dark:border-white border-1 rounded-3xl px-3 py-1 cursor-pointer bg-gradient-to-r from-blue-500 to-blue-800 duration-150 transition-colors text-white hover:opacity-90">Share Bubble</button>
                            <button onClick={() => {navigate('/'); window.location.reload()}} className=" border-black dark:border-white border-1 rounded-3xl px-3 py-1 cursor-pointer bg-gradient-to-r from-red-400 to-red-600 duration-150 transition-colors text-white hover:opacity-90">Leave Bubble</button>
                            </div>
                        </div>
                    </div>
                    {/* CHATS */}
                    <div ref={chatContainerRef} className="w-full min-h-0 p-4 flex-1 overflow-y-auto flex flex-col border border-inherit rounded-md">
                        {messages.length === 0 && <div className="mx-auto my-auto text-2xl opacity-70">No Messages...</div>}
                        {messages.length > 0 && messages.map((data, index) => (
                            <Message {...data} key={index} />
                        ))}
                    </div>
                    {/* INPUT BOX AND SEND BUTTON */}
                    <div className="flex gap-4 w-full items-center">
                        <input ref={inputRef} className="w-full outline-none border-b border-inherit px-2" type="text" placeholder="Message..." />
                        <div onClick={sendMessage} className="flex gap-1 items-center justify-center px-2 py-1 border border-inherit rounded-lg cursor-pointer">
                            <SendIcon size="1rem" />
                            <span>Send</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;