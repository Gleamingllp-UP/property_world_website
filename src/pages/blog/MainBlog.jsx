import  { useEffect, useState } from "react";
import BlogBanner from "./BlogBanner";
import Blog from "./Blog";
import BlogCatSec from "./BlogCatSec";
import Exploremoreproperties from '../../Custom_Components/Exploremoreproperties' 
import JoinUsNow from './../../Custom_Components/JoinUsNow';
function MainBlog  () {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <BlogBanner />
    <section className="content_area" id="down">
	<div className="container">
		<div className="row justify-content-center ">
			<Blog />
            <BlogCatSec />
			
			
			
		</div>
		
	</div>
</section>
<Exploremoreproperties />
 <JoinUsNow />
    </>
  )
}
export default MainBlog