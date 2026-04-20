import React, { useState } from "react";
import { signIn, signUp } from "../api/callApi";
import { useNavigate } from "react-router-dom";

export default function UserAuthPage() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [errorShow, setErrorShow] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    setErrorShow("");

    try {
      if (isLogin) {
      const res =   await signIn(formData);
      console.log(res.data)
      const user = res.data?.user;
      const token = res.data?.token;
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", JSON.stringify(token))
      if(user.role === "admin"){
       navigate("/adminDashboard");
      } else if(user.role === "vendor"){
        navigate("/vendorDashboard");
      }
      else{
        navigate("/userDashboard");
      }
        
      } else {
        await signUp(formData);
        alert("Account Created Successfully");
        setIsLogin(true);
      }
    } catch (error) {
      setErrorShow(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            {isLogin ? "Welcome Back 👋" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isLogin ? "Login to continue shopping" : "Register to get started"}
          </p>
        </div>

        {errorShow && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {errorShow}
          </p>
        )}

        <form onSubmit={submitHandle} className="space-y-4">

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="input"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="input"
            required
          />

          <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        {/* Toggle */}
        <p className="text-center text-sm mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer font-medium ml-1"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

        {/* Vendor Link */}
        <div className="text-center mt-6 border-t pt-4">
          <p className="text-sm text-gray-600">
            Want to sell products?
          </p>
          <button
            onClick={() => navigate("/registerVendor")}
            className="text-green-600 font-semibold text-sm mt-1 hover:underline"
          >
            Create a Free Business Account
          </button>
        </div>

      </div>

      <style>{`
        .input {
          width:100%;
          padding:12px;
          border-radius:10px;
          border:1px solid #ddd;
          outline:none;
          font-size:14px;
        }
        .input:focus{
          border-color:black;
          box-shadow:0 0 0 2px rgba(0,0,0,0.1);
        }
      `}</style>

    </div>
  );
}