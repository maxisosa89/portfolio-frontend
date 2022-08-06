import React, { useEffect, useState } from "react";
import axios from "axios";
import AboutForm from '../../components/admin/AboutForm'
import Spinner from "../../components/Spinner";

export default function HomePageEdit() {
  const token = localStorage.getItem("tokenPortfolioMS");
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState({
    description: "",
    softSkills: [],
    subSkills: [],
    files: []
  });
  async function getAboutData() {
    const aboutBdData = await axios.get("/about");
    aboutBdData.data.length && setAboutData(aboutBdData.data[0]);
    setLoading(false);
  };
  useEffect(() => {
    getAboutData();
  }, []);
  return (
    <div className="container mx-auto bg-tertiary pt-24">
      {
        loading ?
        <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div> :
        <AboutForm 
          aboutData={aboutData}
          setAboutData={setAboutData}
          token={token}
        />
      }
    </div>
  )
}