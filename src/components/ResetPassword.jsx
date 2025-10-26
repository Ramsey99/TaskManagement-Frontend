import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPass } from "../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    newPass: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPass !== form.confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    if (!token) {
      alert("Invalid or expired password reset link.");
      return;
    }

    try {
      const result = await resetPass(token, form.newPass);

      if (result.error) {
        alert(result.error);
      } else {
        alert("Password reset successful!");
        navigate("/users");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="password"
              name="newPass"
              className="form-control"
              placeholder="Enter new password"
              value={form.newPass}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="password"
              name="confirmPass"
              className="form-control"
              placeholder="Confirm new password"
              value={form.confirmPass}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
