import React from 'react'
import TermCondition from './TermCondition'
const TermHead = () => {
  return (
    <>
<section className="content_area" id="down">
 	<div className="container">
           <div className="guide_mini">
			 <p><b>Terms and conditions (“Terms”) are a set of legal terms defined by the owner of a website.</b></p>	
			 <p>They set forth the terms and conditions governing the activities of the website visitors on the said website and the relationship between the site visitors and the website owner. Terms must be defined according to the specific needs and nature of each website. For example, a website offering products to customers in e-commerce transactions requires Terms that are different from the Terms of a website only providing information. Terms provide the website owner the ability to protect themselves from potential legal exposure.</p>
		  </div>
		  <hr />
        <TermCondition />


    </div>
 </section>
    </>
  )
}

export default TermHead