import  { useEffect, useState } from "react";
import Banner from './Banner';
import BuyerGuide from './BuyerGuide';
import ExploreMoreProperties from '../../Custom_Components/ExploreMoreProperties' 
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
 <ExploreMoreProperties />
 <JoinUsNow />
    </>
  )
}

export default BuyerMain