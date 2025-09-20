import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-gray-700 flex items-center justify-center relative h-96 mt-20'>
      <div className='bg-[#0c96f9] w-1/2 h-96 absolute bottom-1/4 rounded-2xl flex items-center justify-between p-6 '>
        <img src='/src/assets/62e54dd45d5e1ddc5ac68176_animation_640_l255jqvc.gif' className='w-72 h-72 ' />
        <div className='mr-5'>
          <h2 className='text-white font-bold text-3xl '>Need Long Term therapy ?</h2>
          <p className='text-white text-xl mt-1'>We here to talk , resolve and help you..</p>
          <button onClick={() => navigate("/booking")} className='bg-blue-600 text-white p-2 mt-10 rounded-lg'>Book a Appointment</button>
        </div>
      </div>

      <div className="flex flex-wrap space-x-6 justify-center absolute bottom-5 text-white">
        <a href="/contact" className="text-lg hover:text-blue-400 transition-all">Contact Us</a>
        <a href="/terms" className="text-lg hover:text-blue-400 transition-all">Terms & Conditions</a>
        <a href="/privacy" className="text-lg hover:text-blue-400 transition-all">Privacy Policy</a>
        <a href="/cancellation" className="text-lg hover:text-blue-400 transition-all">Cancellation and Refund Policy</a>
        <a href="/faq" className="text-lg hover:text-blue-400 transition-all">FAQ</a>

        <div className="flex space-x-6 justify-center ">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hover:text-blue-400 transition-all" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M17 3h2a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h2M12 8v8m-4-4h8" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hover:text-blue-400 transition-all" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M22.46 6c-.77.35-1.6.59-2.47.69a4.46 4.46 0 001.94-2.47c-.83.5-1.75.86-2.73 1.06a4.47 4.47 0 00-7.61 4.08A12.66 12.66 0 011.67 3.15a4.47 4.47 0 001.39 5.94A4.43 4.43 0 01.89 8.8v.06a4.47 4.47 0 003.57 4.37c-.66.18-1.35.23-2.06.09a4.47 4.47 0 004.19 3.1A8.95 8.95 0 010 19.53a12.63 12.63 0 006.29 1.85c7.55 0 11.7-6.27 11.7-11.7 0-.18 0-.36-.01-.53A8.37 8.37 0 0022.46 6z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hover:text-pink-400 transition-all" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.2c3.88 0 7 3.12 7 7s-3.12 7-7 7-7-3.12-7-7 3.12-7 7-7zm0 12.7c3.17 0 5.7-2.53 5.7-5.7 0-3.17-2.53-5.7-5.7-5.7-3.17 0-5.7 2.53-5.7 5.7 0 3.17 2.53 5.7 5.7 5.7zm5.42-8.07c.5 0 .9-.4.9-.9 0-.5-.4-.9-.9-.9-.5 0-.9.4-.9.9 0 .5.4.9.9.9z" />
              </svg>
            </a>
          </div>
      </div>


    </div>
  )
}

export default Footer