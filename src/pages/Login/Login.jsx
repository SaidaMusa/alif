import React, { useState } from "react";
import "../Login/Login.css"; // Assuming the CSS is in this file

const Login = () => {
  const [activeTab, setActiveTab] = useState("signup"); // Active tab state
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set active tab on tab click
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
  };

  return (
    <div className="form">
      <ul className="tab-group">
        <li
          className={`tab ${activeTab === "signup" ? "active" : ""}`}
          onClick={() => handleTabClick("signup")}
        >
          <a href="#signup">Sign Up</a>
        </li>
        <li
          className={`tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => handleTabClick("login")}
        >
          <a href="#login">Log In</a>
        </li>
      </ul>

      <div className="tab-content">
        {/* Sign Up Form */}
        {activeTab === "signup" && (
          <div id="signup">
            <h1>Sign Up for Free</h1>
            <form onSubmit={handleSubmit}>
              <div className="top-row">
                <div className="field-wrap">
                  <label className={formValues.firstName ? "active" : ""}>
                    First Name<span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    placeholder='First Name'
                  />
                </div>

                <div className="field-wrap">
                  <label className={formValues.lastName ? "active" : ""}>
                    Last Name<span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    placeholder='Last Name'
                  />
                </div>
              </div>

              <div className="field-wrap">
                <label className={formValues.email ? "active" : ""}>
                  Email Address<span className="req">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  placeholder='Email Address'
                />
              </div>

              <div className="field-wrap">
                <label className={formValues.password ? "active" : ""}>
                  Set A Password<span className="req">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  placeholder='Password'
                />
              </div>

              <button type="submit" className="button button-block">
                Get Started
              </button>
            </form>
          </div>
        )}

        {/* Login Form */}
        {activeTab === "login" && (
          <div id="login">
            <h1>Welcome Back!</h1>
            <form onSubmit={handleSubmit}>
              <div className="field-wrap">
                <label className={formValues.email ? "active" : ""}>
                  Email Address<span className="req">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  placeholder='Email Address'
                />
              </div>

              <div className="field-wrap">
                <label className={formValues.password ? "active" : ""}>
                  Password<span className="req">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  placeholder='Password'
                />
              </div>

              <p className="forgot">
                <a href="#">Forgot Password?</a>
              </p>

              <button type="submit" className="button button-block">
                Log In
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
