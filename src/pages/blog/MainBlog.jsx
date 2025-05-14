import  { useEffect, useState } from "react";
import BlogBanner from "./BlogBanner";
import Blog from "./Blog";
import BlogCatSec from "./BlogCatSec";
import ExploreMoreProperties from '../../Custom_Components/ExploreMoreProperties' 
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
<ExploreMoreProperties />
 <JoinUsNow />
    </>
  )
}
export default MainBlog