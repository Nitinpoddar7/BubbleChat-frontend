import ChatPage from "./components/ChatPage";
import Landing from "./components/Landing";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSocket } from "./zustand/store";
const server = import.meta.env.VITE_WEBSOCKET_SERVER

const App = () => {

  useEffect(() => {
    console.log('Connecting with WebSocket server...')
    const connection = new WebSocket(server)

    connection.onopen = () => {
    console.log('Connection established...')
    useSocket.getState().setSocket(connection)
    }

    connection.onerror = () => {
      console.log('Connection failed...')
    }

    connection.onclose = () => {
      console.log('Connection closed...')
    }

    return () => {
      console.log('Cleaning up WebSocket connection...')
      connection.close()
    }
  }, [])

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/join/:id" element={<ChatPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;