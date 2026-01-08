import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { registerInput, registerLaber } from "./register.module.scss";
export const Register = () => {
    return (_jsxs("form", { action: "/register", method: "POST", children: [_jsx("label", { className: registerLaber, children: "email" }), _jsx("input", { className: registerInput }), _jsx("label", { className: registerLaber, children: "username" }), _jsx("input", { className: registerInput }), _jsx("label", { className: registerLaber, children: "password" }), _jsx("input", { className: registerInput })] }));
};
