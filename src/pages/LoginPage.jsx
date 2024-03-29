import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner";
import jwt_decode from "jwt-decode";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.id]: e.target.value
    })
  };
  async function handleSubmit(e) {
    e.preventDefault()
    const data = await axios.post("/login", input);
    localStorage.setItem("tokenPortfolioMS", `Bearer ${data.data.token}`);
    window.dispatchEvent(new Event('storage'));
    navigate("/admin/dashboard");
  };
  useEffect(() => {
    function getToken() {
      try {
        const token = localStorage.getItem("tokenPortfolioMS");
        const decoded = jwt_decode(token);
        const current_time = new Date().getTime() / 1000;
        if (current_time > decoded.exp) {
          setLoading(false);
        } else {
          navigate("/admin/dashboard");
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    getToken()
  }, [navigate]);
  return (
    <div className="flex justify-center container mx-auto bg-tertiary py-24">
      {
        loading ?
          <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div> :
          <form
            id="formLogin"
            className="flex flex-wrap w-full max-w-[300px] bg-secondary mx-auto p-10 shadow-md shadow-primary"
            onSubmit={handleSubmit}
          >
            <div className="w-full mx-4 my-2">
              <label className="text-xl uppercase tracking-wide text-white font-bold mb-2" htmlFor="name">
                Email
              </label>
              <input
                autoComplete="off"
                className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 leading-tight"
                id="email"
                value={input.email}
                type="text"
                placeholder="Email..."
                onChange={handleChange}
              />
            </div>
            <div className="w-full mx-4 my-2">
              <label className="text-xl uppercase tracking-wide text-white font-bold mb-2" htmlFor="mail">
                Password
              </label>
              <input
                autoComplete="off"
                className="appearance-none focus:outline-none block w-full bg-tertiary text-white border border-white rounded py-3 px-4 leading-tight"
                id="password"
                value={input.password}
                type="password"
                placeholder="Password..."
                onChange={handleChange}
              />
            </div>
            <div className="w-full m-4">
              <button
                type="submit"
                name="buttonFormLogin"
                className="w-full bg-secondary hover:bg-tertiary text-white border font-semibold border-white rounded py-3 px-4 leading-tight">
                Enviar
              </button>
            </div>
          </form>
      }
    </div>
  )
}