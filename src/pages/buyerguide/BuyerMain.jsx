import  { useEffect, useState } from "react";
import Banner from './Banner';
import BuyerGuide from './BuyerGuide';
import Exploremoreproperties from '../../Custom_Components/Exploremoreproperties' 
import JoinUsNow from './../../Custom_Components/JoinUsNow';
const BuyerMain = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <Banner />
<section class="content_area" id="down">
	<div class="container">
    <BuyerGuide />
    </div>
 </section>
 <Exploremoreproperties />
 <JoinUsNow />
    </>
  )
}

export default BuyerMain