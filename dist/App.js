import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from "react-router";
import { appRoutes } from "./routes/routes";
const router = createBrowserRouter(appRoutes);
const App = () => _jsx(RouterProvider, { router: router });
export default App;
