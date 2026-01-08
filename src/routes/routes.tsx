import { Route, createRoutesFromElements } from "react-router";
import { HomePage } from "../pages/index/HomePage";
import { Layout } from "../layout/layout";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { Profile } from "../pages/profile/profile";
import { CreateGame } from "../pages/create-game/create-game";
import { BrowseGames, Todo } from "../pages/browse-games/BrowseGames";
import { Battle } from "../components/battle/battle";

export const appRoutes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<Battle />} />
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
    <Route path="profile" element={<Profile />} />
    <Route path="create-game" element={<CreateGame />} />
    <Route path="gamelist" element={<BrowseGames />} />
    <Route path="todo" element={<Todo />} />
  </Route>
);
