import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from './api/Api';
export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateuser = () => {
    const e = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (formData.email.length <= 0) e.email = "Please Enter the Email!"
    else if (!emailPattern.test(formData.email)) e.email = "Email contains __ @ __ . ___!"
    if (formData.password.length <= 0) e.password = "Please Enter the password!"
    return e;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validateuser();

    setErrors(err);

    if (Object.keys(err).length === 0) {
      try {
        const res = await API.post(
          "/auth/login",
          { ...formData },
          { withCredentials: true } // extra safety
        );
        alert(res.data.msg)
             
        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }

      } catch (err) {
        console.log("Error In Login: ", err);
        alert(err.response?.data?.msg || "Login failed!");
      }

    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-400">Login</h2>

        <p className='mb-3'>New Here? Please <Link className='text-blue-500 underline' to="/signup">Signup</Link></p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <span>Email:</span>
          <input
            type="text"
            name="email"
            placeholder="example@gmail.com"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          <span>Password:</span>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}


          <div className="flex justify-end gap-3">

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer active:scale-[0.90] transition-colors duration-200 ease-in">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
