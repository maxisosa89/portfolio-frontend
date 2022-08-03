import React, { useEffect, useState } from "react";
import axios from "axios";
import HomePageForm from '../../components/admin/HomePageForm'
import Spinner from "../../components/Spinner";

export default function HomePageEdit() {
  const token = localStorage.getItem("tokenPortfolioMS");
  const [loading, setLoading] = useState(true);
  const [homePageData, setHomePageData] = useState({
    homeTitle: "",
    homeSubTitle: "",
    homeSummary: ""
  });
  async function getHomePageData() {
    const homeData = await axios.get("/home");
    homeData.data.length && setHomePageData(homeData.data[0]);
    setLoading(false);
  };
  useEffect(() => {
    getHomePageData();
  }, []);
  return (
    <div className="container mx-auto bg-tertiary pt-24">
      {
        loading ?
        <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div> :
        <HomePageForm 
          homePageData={homePageData}
          setHomePageData={setHomePageData}
          token={token}
        />
      }
    </div>
  )
}