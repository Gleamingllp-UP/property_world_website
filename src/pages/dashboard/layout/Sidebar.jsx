import React from 'react'
import { Link } from 'react-router-dom';
import { property_world_logo } from '@/assets/images';
const Sidebar = () => {
  return (
    <>
    
 <div className="bg-dark text-white p-3 vh-100" style={{ width: '200px', position: 'fixed' }}>
    <img src={property_world_logo} alt="Logo" width="100" height="100" />
    <hr />
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link className="nav-link text-white" to="/userdashboard">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/add-property">Add Proparty</Link>
      </li>
    </ul>
  </div>
    </>
  )
}

export default Sidebar