import { createBrowserRouter, RouterProvider } from "react-router";
import { appRoutes } from "./routes/routes";
import { UserProfileProvider } from "./context/UserContext";

const router = createBrowserRouter(appRoutes);

const App: React.FC = () => {
  return (
    <UserProfileProvider>
      <RouterProvider router={router} />
    </UserProfileProvider>
  );
};

export default App;
