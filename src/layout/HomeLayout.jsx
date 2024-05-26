import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const HomeLayout = ({ children }) => {
  return (
    <main>
      {/* <div className='flex'> */}
        <Sidebar />
        <div className="w-[100%]">
          {children}
        </div>
      {/* </div> */}
      {/* </div> */}
    </main>
  )
}

export default HomeLayout