import  { useEffect, useState } from "react";

import blogimg1 from '../../assets/images/common/blog1.webp';
import blogimg2 from '../../assets/images/common/blog2.jpg';
import blogimg3 from '../../assets/images/common/blog3.webp';


const BlogCatSec = () => {

 useEffect(() => {
  const scriptId = 'elfsight-platform-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.src = '/assets/js/platform.js';
    script.async = true;
    script.id = scriptId;
    document.body.appendChild(script);
  }
}, []);


  return (
    <div className="col-lg-4">
      <div className="blog_right_b">
        {/* Search Form */}
        <form role="search" method="get" className="search_form" action="#">
          <input type="text" className="search_field" placeholder="Search …"
            name="s" title="Search for:" />
          <button type="submit" className="search_button">
            <i className="ri-search-line" />
          </button>
        </form>

        <hr />

        <div className="my_catt">
          <p><strong>Categories</strong></p>
          <ul>
            <li><a href="#">Architecture (05)</a></li>
            <li><a href="#">DreamHome (15)</a></li>
            <li><a href="#">Furniture (07)</a></li>
            <li><a href="#">HomeBuying (05)</a></li>
            <li><a href="#">Interior (0)</a></li>
            <li><a href="#">Property (08)</a></li>
            <li><a href="#">Realtor (0)</a></li>
          </ul>
        </div>

        <hr />

 
        <div className="top_story">
          <p><strong>Recent posts</strong></p>

          {[blogimg1, blogimg2, blogimg3,].map((img, index) => (
            <div className="rec_pots" key={index}>
              <div>
                <a href="blog-details.php">
                  <img src={img} className="img-fluid" alt={`Recent Post ${index + 1}`} />
                </a>
              </div>
              <div>
                <span>April 08, 2025</span>
                <h4>
                  <a href="blog-details.php">Finding Dream Home: Step by Step with us</a>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

   
      <div className="insta_feds">
        <h5>Instagram Feeds</h5>
        <div className="elfsight-app-57e9270c-e9ad-4b8c-a211-c494dcbf3f9e" data-elfsight-app-lazy ></div>
      </div>

    
      <div className="text-center mt-3 m-auto">
        <img src={insta} className="img-fluid m-auto" alt="News Display" />
      </div>
    </div>
  );
};

export default BlogCatSec;
