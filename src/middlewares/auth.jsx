import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from "../components/Spinner";
import jwt_decode from "jwt-decode";

export default function PrivateRoute({ Component }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  function getToken() {
    try {
      const token = localStorage.getItem("tokenPortfolioMS");
      const decoded = jwt_decode(token);
      const current_time = new Date().getTime() / 1000;
      if (current_time > decoded.exp) {
        setAuth(false);
      } else {
        setAuth(true);
      }
      setLoading(false);
    } catch (e) {
      setAuth(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    getToken()
  }, []);
  return loading ?
    <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
      <Spinner />
    </div> :
    auth === true ? <Component /> : <Navigate to="/login" />
}