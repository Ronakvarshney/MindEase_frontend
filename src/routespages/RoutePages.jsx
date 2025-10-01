import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'



import Register from '../Pages/Signup/Signup'
import LoginPage from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import HomePage from '../Pages/Home/Home'
import Booking from '../Pages/Booking/Booking'
import Chatting from '../Pages/Chat/Chatting'
import SelectedProgram from '../Pages/SelectedPrograms/SelectedProgram'
import DonatePage from '../Pages/Donate/DonatePage'
import SelectDoctor from '../Pages/SelectedDoctors/SelectDoctor'
import Appointment from '../Pages/Appointment/Appointment'
import BlogPage from '../Pages/Blogs/Blog'
import BootcampPage from '../Pages/Bootcamp/Bootcamp'
import Fundraise from '../Pages/fundraise/Fundraise'
import Community from '../Pages/community/Community'
import Selectedfundraise from '../Pages/fundraise/Selectedfundraise'
import Chat from '../Pages/Chat/Chat'
import ForgotPassword from '../Pages/forgot_password'
import ResetPassword from '../Pages/reset_password'
import { Questions } from '@/Pages/generateQuestion/Questions'


const ScrollTotop=()=>{
    const pathname = useLocation();
    useEffect(()=>{
      window.scrollTo(0,0);
    } ,[pathname])
    return null ;
}


const RoutePages = () => {
    return (
        <div className=''>
            <ScrollTotop/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<Register/>} />
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/generateQuestion' element={<Questions/>}/>
                <Route path = "/booking" element={<Booking/>}/>
                <Route path = "/chatting" element={<Chatting/>}/>
                <Route path = "/programs/:title" element={<SelectedProgram/>}/>
                <Route path="/fundraise/:id" element={<Selectedfundraise/>}/>
                <Route path="/donate" element={<DonatePage/>}/>
                <Route path="/selectedDoctor" element={<SelectDoctor/>}/>
                <Route path='/appointment' element={<Appointment/>}/>
                <Route path="/blogs" element={<BlogPage/>}/>
                <Route path="/bootcamp" element={<BootcampPage/>}/>
                <Route path='/fundraise' element={<Fundraise/>}/>
                <Route path='/community' element={<Community/>}/>
                <Route path='/chatting/:id' element={<Chat/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
                <Route path='/reset-password' element={<ResetPassword/>}/>
            </Routes>
        </div>
    )
}

export default RoutePages