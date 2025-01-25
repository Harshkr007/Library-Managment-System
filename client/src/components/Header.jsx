import React from 'react'
import Logo from './Logo'

function Header() {
  return (
    <div className="w-full bg-amber-100 shadow-lg h-35 py-2">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <div className="flex items-center pl-0 mr-8">
          <Logo />
        </div>
        <div className="flex-1 text-center pr-16">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 tracking-wide truncate">
            Library Management System
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Header
