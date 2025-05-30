

import { useEffect } from 'react';
import Archive from './Archive';
import ArchiveSide from './ArchiveSide';
const ArchiveMain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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