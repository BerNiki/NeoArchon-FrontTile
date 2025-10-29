import React, { useState } from "react";
import {
  registerForm,
  registerFormWrapper,
  registerInput,
  registerLaber,
} from "./login.module.scss";
import { api } from "../../api/api";

export const Login = () => {
  const [formData, setFormData] = useState<Record<string, string>>({
    email: "",
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
      await api.post("/auth/signin", formData);
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
        <h2>Login</h2>
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
          {loading ? "Loading..." : "Login"}
        </button>
        {success && (
          <div>
            <p>Login was successful</p>
          </div>
        )}
        {error && (
          <div>
            <p>Login failed! {error}</p>
          </div>
        )}
      </form>
    </div>
  );
};
