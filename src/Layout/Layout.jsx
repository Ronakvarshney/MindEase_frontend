import React from 'react'
import Navbar from '../Components/Navbar'
import RoutePages from '../routespages/RoutePages'
import Footer from '../Components/Footer'

const Layout = () => {
  return (
    <div>
        <Navbar/>
        <RoutePages/>
        <Footer/>
    </div>
  )
}

export default Layout