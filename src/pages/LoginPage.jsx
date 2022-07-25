import axios from "axios";
import React, { useState } from "react";

export default function LoginPage() {
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
    const data = await axios.post("http://localhost:3001/login", input);
    console.log(data);
  };
  return (
    <div className="flex justify-center container mx-auto bg-tertiary py-24">
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
    </div>
  )
}