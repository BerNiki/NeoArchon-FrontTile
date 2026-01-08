import { jsx as _jsx } from "react/jsx-runtime";
import { Navigation } from "../navigation/Navigation";
import { header } from "./header.module.scss";
export const Header = () => {
    return (_jsx("div", { className: header, children: _jsx(Navigation, {}) }));
};
