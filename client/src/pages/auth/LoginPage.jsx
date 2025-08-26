import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";

// gray: 495867, HardBlue: 577399, SoftBlue: BDD5EA, White: FFFFFF, SoftRed: F7B1AB

const LoginPage = () => {
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3030/api/auth/login",
        formData,
        { withCredentials: true }
      );

      setMessage(response.data.message);

      console.log(response);

      console.log(response.data.user);

      setUser(response.data.user);

      setFormData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "An error occurred while logging in."
      );
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="h-screen bg-[linear-gradient(to_bottom,_#ffffff_0%,_#ffffff_65%,_#bdd5ea_90%,_#bdd5ea_100%)] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-7 shadow-2xl">Login</h1>
      <form className="border-2 border-[#F7B1AB] shadow-[4px_4px_14px_rgba(0,0,0,0.3)] rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border-2 border-[#577399] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:scale-110 transition duration-200 ease-in-out"
            id="email"
            type="email"
            name="email"
            maxLength={100}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border-2 border-[#577399] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:scale-110 transition duration-200 ease-in-out"
            id="password"
            type="password"
            name="password"
            maxLength={20}
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-[#577399] hover:bg-[#f7b1ab] cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>

        {message && <p className="text-[#577399] mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
