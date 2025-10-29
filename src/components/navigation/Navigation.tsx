import { NavLink } from "react-router";
import { NAVIGATION_LINKS } from "../../consts/navigationLinks";
import { navigation } from "./navigation.module.scss";

export const Navigation = () => {
  const navLinks = NAVIGATION_LINKS.map((link) => {
    return (
      <NavLink to={link.route}>
        <h2>{link.title.toUpperCase()}</h2>
      </NavLink>
    );
  });

  return <div className={navigation}>{navLinks}</div>;
};
