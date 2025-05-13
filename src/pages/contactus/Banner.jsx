import React from 'react'
import about_banner from '../../assets/images/common/about_banner.jpg';
const Banner = () => {
  return (
    <>
    <div className="inner_banner" style={{ backgroundImage: `url(${about_banner})` }}>
	<div className="container">
		<div className="buyer_d">
			<h1>Contact us</h1>
			<p>We Can Help You</p>
		</div>
	</div>
</div>
<div className="arrow_section">
	<div className="container">
		<div className="arrow_box">
			<a href="#down"><i className="ri-arrow-down-long-line"></i></a>
		</div>
	</div>
</div>
    </>
  )
}

export default Banner