import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
export const Layout = () => (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
