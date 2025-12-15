import { useUserProfile } from "../../context/UserContext";
import { footer } from "./footer.module.scss";

export const Footer = () => {
  const { profile } = useUserProfile();
  return (
    <div className={footer}>
      {profile && <h2>Welcome to Archon {profile.username}!!!</h2>}
      <div>Footer</div>
    </div>
  );
};
