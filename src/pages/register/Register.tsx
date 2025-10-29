import React, { useState } from "react";
import {
  registerForm,
  registerFormWrapper,
  registerInput,
  registerLaber,
} from "./register.module.scss";

export const Register = () => {
  const [formData, setFormData] = useState<Record<string, string>>({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={registerFormWrapper}>
      <div>
        <h2>Registration Form</h2>
      </div>
      <form className={registerForm} onSubmit={handleSubmit}>
        <label htmlFor="email" className={registerLaber}>
          E-mail:
        </label>
        <input
          name="email"
          value={formData.email}
          type="email"
          onChange={handleChange}
          className={registerInput}
          placeholder="enter your e-mail"
        ></input>
        <label htmlFor="username" className={registerLaber}>
          Username:
        </label>
        <input
          name="username"
          value={formData.username}
          type="text"
          onChange={handleChange}
          className={registerInput}
          placeholder="enter your username"
        ></input>
        <label htmlFor="password" className={registerLaber}>
          Password:
        </label>
        <input
          name="password"
          value={formData.password}
          type="password"
          onChange={handleChange}
          className={registerInput}
          placeholder="enter your password"
        ></input>
        <button className="" type="submit">
          {loading ? "Loading..." : "Register"}
        </button>
        {success && (
          <div>
            <p>Registration was successful, you can login.</p>
          </div>
        )}
        {error && (
          <div>
            <p>Registration failed! {error}</p>
          </div>
        )}
      </form>
    </div>
  );
};
