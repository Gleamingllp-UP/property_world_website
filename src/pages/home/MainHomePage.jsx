import React from "react";
import HomeBanner from "./homeBanner/HomeBanner";
import HomeAssistant from "./homeAssistant/HomeAssistant";
import HomeNewsBlog from "./homeNewsBlog/HomeNewsBlog";
import HomeFeaturedList from "./homeFeaturesList/HomeFeaturedList";
import HomeListing from "./homeListing/HomeListing";
import HomeCategoryWiseList from "./homeCategoryWiseList/HomeCategoryWiseList";
import HomePopularSearches from "./homePopularSearches/HomePopularSearches";
import HomeAgency from "./homeAgency/HomeAgency";

function MainHomePage() {
  return (
    <div>
      <HomeBanner />
      <HomeAssistant />
      <HomeNewsBlog/>
      <HomeFeaturedList/>
      <HomeListing/>
      <HomeCategoryWiseList/>
      <HomePopularSearches/>
      <HomeAgency/>
    </div>
  );
}

export default MainHomePage;
