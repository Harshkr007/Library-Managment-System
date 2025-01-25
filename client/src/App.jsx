import React from 'react'
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from './components/Header'

const App = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <header className="flex-none mb-4">
        <Header/>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="h-full">
          <Outlet/>
        </div>
      </main>
    </div>
  )
}

export default App
