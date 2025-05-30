import React from 'react'

import Archive from './Archive';
import ArchiveSide from './ArchiveSide';
const ArchiveMain = () => {
  return (
    <>
    
    <div className="container">
        <div className="row">
         <Archive />
         <ArchiveSide />
        </div>
      </div>
      
    </>
  )
}

export default ArchiveMain