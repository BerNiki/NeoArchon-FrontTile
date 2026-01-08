import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, createRoutesFromElements } from "react-router";
import { HomePage } from "../pages/index/HomePage";
import { Layout } from "../layout/layout";
import { Register } from "../pages/register/Register";
export const appRoutes = createRoutesFromElements(_jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { index: true, element: _jsx(HomePage, {}) }), _jsx(Route, { path: "register", element: _jsx(Register, {}) })] }));
