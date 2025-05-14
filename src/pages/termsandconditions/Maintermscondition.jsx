import  { useEffect, useState } from "react";
import TermBanner from './TermBanner';
import TermHead from './TermHead';
import Exploremoreproperties from '../../Custom_Components/Exploremoreproperties' 
import JoinUsNow from './../../Custom_Components/JoinUsNow';
const Maintermscondition = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
     }, []);
  return (
    <>
    <TermBanner />
    <TermHead />
     <Exploremoreproperties />
    <JoinUsNow />
    </>
  )
}

export default Maintermscondition