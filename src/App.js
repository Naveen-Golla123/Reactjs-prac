import React from "react"
import { Route, Routes } from 'react-router-dom'
import { Header } from "./components"
import { CreateContainer } from './components'
import { MainContainer, ManagerItems } from './components'
import { AnimatePresence } from "framer-motion"
const App = () => {
    return (
        <AnimatePresence>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Header />
                <main className="md:px-16 px-4 py-4 w-full mt-16 md:mt-20">
                    <Routes>
                        <Route path="/*" element={<MainContainer />} />
                        <Route path="/item/:mode/:id" element={<CreateContainer />} />
                        <Route path="/manage" element={<ManagerItems />}/>
                    </Routes>
                </main>
            </div>
        </AnimatePresence>
    )
}

export default App