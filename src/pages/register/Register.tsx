import React, { useState } from "react";
import {
  registerForm,
  registerFormWrapper,
  registerInput,
  registerLaber,
} from "./register.module.scss";
import { api } from "../../api/api";

export const Register = () => {
  const [formData, setFormData] = useState<Record<string, string>>({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<Record<string, string>[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setLoading(true);
    setSuccess(false);

    try {
      const response = await api.post("/auth/signup", formData);

      if (response.status !== 201) {
        setError(response.data);
        throw new Error("Registration failed");
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err);
      console.log(err);
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
        {Array.isArray(error) ? (
          <div>
            <p style={{ fontSize: "18px", color: "red" }}>
              Registration failed!
            </p>

            {error.map((error: Record<string, string>) => (
              <p style={{ fontSize: "18px", color: "red" }}>{error.message}</p>
            ))}
          </div>
        ) : (
          <p>{error}</p>
        )}
      </form>
    </div>
  );
};
