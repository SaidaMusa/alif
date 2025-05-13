import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logAnalyticsEvent } from "../../utils/firebase";
import "../Login/Login.css";

const Login = ({ setUser }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email && storedUser.password) {
      setUser(storedUser);
      navigate("/");
    }
  }, [navigate, setUser]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  
  const clearInputs = () => {
    setFormValues({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
  };


  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    clearInputs();
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password, firstName, lastName } = formValues;

    if (activeTab === "signup") {
      if (email && password && firstName && lastName) {
        const user = { email, password, firstName, lastName };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        logAnalyticsEvent("signup_success", { email });
        clearInputs();
        navigate("/");
      } else {
        alert("Please fill in all fields to sign up.");
      }
    } else if (activeTab === "login") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        if (storedUser.email === email && storedUser.password === password) {
          setUser(storedUser);
          logAnalyticsEvent("login_success", { email });
          clearInputs();
          navigate("/");
        } else {
          alert("Invalid email or password!");
        }
      } else {
        alert("No user found. Please sign up first.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="form flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="tab-group flex space-x-4 mb-4">
        <div
          className={`tab cursor-pointer px-4 py-2 ${activeTab === "signup" ? "bg-green-700 text-white" : "bg-gray-300 text-gray-800"}`}
          onClick={() => handleTabSwitch("signup")}
        >
          Sign Up
        </div>
        <div
          className={`tab cursor-pointer px-4 py-2 ${activeTab === "login" ? "bg-green-700 text-white" : "bg-gray-300 text-gray-800"}`}
          onClick={() => handleTabSwitch("login")}
        >
          Log In
        </div>
      </div>
      <div className='tab-content'>
      <form onSubmit={handleSubmit} className="top-row ">
        {activeTab === "signup" && (
          <>
            <div className="field-wrap">
               <label>
                    First Name<span className="req">*</span>
                  </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formValues.firstName}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              </div>
               <div className="field-wrap">
                 <label>
                    Last Name<span className="req">*</span>
                  </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formValues.lastName}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
          </>
        )}
         <div className="field-wrap">
           <label>
                    Email<span className="req">*</span>
                  </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        </div>
         <div className="field-wrap">
           <label>
                    Password<span className="req">*</span>
                  </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleInputChange}
          required
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        </div>
        <button
          type="submit"
          disabled={loading}
         className="button button-block"
        >
          {loading ? "Processing..." : activeTab === "signup" ? "Sign Up" : "Log In"}
        </button>
      </form>
      </div>
    </div>
  );
};

export default Login;
