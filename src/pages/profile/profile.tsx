import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { ProfileI } from "../../Interfaces/userInterfaces";
import {
  profileLabel,
  profile as profileStyle,
  profileWrapper,
  profilePic,
} from "./profile.module.scss";

export const Profile = () => {
  const [profile, setProfile] = useState<ProfileI | undefined>();
  const [loading, setLoading] = useState(true);

  const logoutFunc = () => {
    api.post("/auth/logout");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get<ProfileI>("/user");
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setProfile(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className={profileWrapper}>Loading...</p>;

  return profile ? (
    <div className={profileWrapper}>
      <div className={profileStyle}>
        <p>Username</p>
        <p className={profileLabel}>{profile.username}</p>
        <p>Email</p>
        <p className={profileLabel}>{profile.email}</p>
        <p>ELO Rating</p>
        <p className={profileLabel}>{profile.elo}</p>
        <p>Registration date</p>
        <p className={profileLabel}>
          {profile.created_at
            ? new Date(profile.created_at).toDateString()
            : ""}
        </p>
        <button onClick={logoutFunc}>LOGOUT</button>
      </div>
      <div>
        <img
          className={profilePic}
          src="/ethereal-mystic-sorceress-stockcake.jpg"
        />
      </div>
    </div>
  ) : (
    <div className={profileWrapper}>
      <p className={profileLabel}>Log in to see your profile</p>
    </div>
  );
};
