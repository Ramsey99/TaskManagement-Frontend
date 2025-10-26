import React, { useState } from "react";
import { signUp, logIn } from "../api/axios";
import ForgotPassword from "./ForgotPassword";

const Users = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [forgotPassWord, setForgotPassWord] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    pass: "",
    profile_pic: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "avatar") {
      setForm({ ...form, profile_pic: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isSignUp) {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("pass", form.pass);
        if (form.profile_pic) {
          formData.append("avatar", form.profile_pic);
        }
        const res = await signUp(formData);
        alert(res.message || "Signup successfull");
      } else {
        const res = await logIn({
          email: form.email,
          pass: form.pass,
        });
        alert(res.message || "Login successfull");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        window.location.href = "/tasks";
      }
      setForm({ name: "", email: "", pass: "", profile_pic: null });
    } catch (error) {
      console.error(error);
      alert("Error while submitting form");
    }
  };

  if (forgotPassWord) {
    return <ForgotPassword />;
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #6b5d76ff, #ae54c7ff)" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="user"
            width="70"
            className="mb-2"
          />

          <h3 className="text-dark font-weight-bold">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {isSignUp && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="form-control mb-3"
                required
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="form-control mb-3"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="pass"
              placeholder="Password"
              value={form.pass}
              onChange={handleChange}
              className="form-control mb-3"
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                className="form-control-file mb-3"
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block font-weight-bold"
            style={{ borderRadius: "8px" }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-3">
          {isSignUp ? (
            <p className="mb-0 text-muted">
              Already have an account?{" "}
              <button
                type="button"
                className="btn btn-link text-primary p-0 font-weight-bold"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </p>
          ) : (
            <>
              <p className="mb-0 text-muted">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link text-primary p-0 font-weight-bold"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </button>
              </p>
              <p className="mb-0">
                <button
                  type="button"
                  className="btn btn-link text-danget p-0 font-weight-bold"
                  onClick={() => setForgotPassWord(true)}
                >
                  Forgot Password?
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
