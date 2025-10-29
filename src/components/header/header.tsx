import { Navigation } from "../navigation/Navigation";
import { header } from "./header.module.scss";

export const Header = () => {
  return (
    <div className={header}>
      <Navigation />
    </div>
  );
};
