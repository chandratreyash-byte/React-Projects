import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import API from './api/Api';
export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
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
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (formData.fname.length <= 0) e.fname = "Please Enter the name!"
    else if (!namePattern.test(formData.fname)) e.fname = "Name only contains latters!"
    if (formData.email.length <= 0) e.email = "Please Enter the Email!"
    else if (!emailPattern.test(formData.email)) e.email = "Email contains __ @ __ . ___!"
    if (formData.password.length <= 0) e.password = "Please Enter the password!"
    else if (formData.password.length <= 6) e.password = "Password min Lenght Sholud be 6!"

    return e;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validateuser();

    setErrors(err);

    if (Object.keys(err).length === 0) {

      try {
        await API.post("/auth/signup", {
          ...formData
        })
          .then(res => {
            alert(res.data.msg);
          })
          .catch(err => {
            console.log("Error in sugnup", err);
          });

        navigate("/");
      } catch (error) {
        console.error(error);
        alert("Server Error");
      }
    };
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-indigo-400">Signup</h2>
        <p className='mb-3'>You already have Account? please <Link className='text-blue-500 underline' to="/">Login</Link></p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <span>Full Name:</span>
          <input
            type="text"
            name="fname"
            placeholder="Jhon Doe"

            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.fname && <p className="text-xs text-red-500">{errors.fname}</p>}
          <span>Email:</span>
          <input
            type="text"
            name="email"
            placeholder="example@gmail.com"

            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          <span>Create Password:</span>
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
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}
