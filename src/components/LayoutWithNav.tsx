import React from 'react'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'

function LayoutWithNav() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default LayoutWithNav
