import React from 'react'
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
const Index = () => {
  return (
   <>
    <Sidebar />
      <div style={{ marginLeft: '2px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main className="flex-grow-1 p-4" style={{marginLeft: '200px'}}>
          <Outlet />
        </main>
        <Footer />
      </div>
   </>
  )
}

export default Index