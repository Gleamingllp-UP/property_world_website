import React from 'react'

import buy from '../../assets/images/common/Buying-and-selling.jpg';
import YourBudget from './YourBudget';
import YourInquiryform from './YourInquiryform';
const BuyerGuide = () => {
  return (
    <>
      
        <div className="guide_mini2">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <img src={buy} className="img-fluid" />
            </div>
            <div className="col-lg-7">
              <div className="but_dd">
                <p><b>BUYER’S GUIDE TO PURCHASING PROPERTY IN DUBAI</b></p>	
                <p>Buying property involves various processes that can differ by location, making it quite complex. At Property Finders, we’ve created simple steps to guide you through the process and help you move comfortably into your new property.</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      <div class="row justify-content-center ">
     <YourBudget />
   <YourInquiryform />
      </div>
 
    </>
  )
}

export default BuyerGuide