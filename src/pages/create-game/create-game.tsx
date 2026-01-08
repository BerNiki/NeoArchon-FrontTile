import React, { useState } from "react";
import {
  newGameForm,
  newGameFormWrapper,
  newGameInput,
  newGameLabel,
} from "./create-game.module.scss";
import { api } from "../../api/api";
import { CreateGameDTO } from "./types/createGameDTO";
import { playerRoles } from "./const/enums";

export const CreateGame = () => {
  const [formData, setFormData] = useState<CreateGameDTO>({
    name: "",
    playerRole: "",
    password: "",
  });
  const [error, setError] = useState<Record<string, string>[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setLoading(true);

    try {
      const response = await api.post("/game/create", formData);

      if (response.status !== 201) {
        setError(response.data);
        throw new Error("Registration failed");
      }
    } catch (err: any) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={newGameFormWrapper}>
      <div>
        <h2>Create new game</h2>
      </div>
      <form className={newGameForm} onSubmit={handleSubmit} id="gameForm">
        <label htmlFor="name" className={newGameLabel}>
          Name of your game
        </label>
        <input
          name="name"
          value={formData.name}
          type="text"
          onChange={handleChange}
          className={newGameInput}
          placeholder="enter the name of your game"
        ></input>
        <label htmlFor="playerRole" className={newGameLabel}>
          Choose your role
        </label>
        <select
          form="gameForm"
          name="playerRole"
          value={formData.playerRole}
          onChange={handleChange}
          className={newGameInput}
        >
          {playerRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <label htmlFor="password" className={newGameLabel}>
          Password: (optional)
        </label>
        <input
          name="password"
          value={formData.password}
          type="text"
          onChange={handleChange}
          className={newGameInput}
          placeholder="enter password for game"
        ></input>
        <button className="" type="submit">
          {loading ? "Loading..." : "Create Game"}
        </button>
        {Array.isArray(error) ? (
          <div>
            <p style={{ fontSize: "18px", color: "red" }}>
              Game creation failed!
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
