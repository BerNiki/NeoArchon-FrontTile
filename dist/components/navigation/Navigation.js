import { jsx as _jsx } from "react/jsx-runtime";
import { NavLink } from "react-router";
import { NAVIGATION_LINKS } from "../../consts/navigationLinks";
import { navigation } from "./navigation.module.scss";
export const Navigation = () => {
    const navLinks = NAVIGATION_LINKS.map((link) => {
        return (_jsx(NavLink, { to: link.route, children: _jsx("h2", { children: link.title.toUpperCase() }) }));
    });
    return _jsx("div", { className: navigation, children: navLinks });
};
