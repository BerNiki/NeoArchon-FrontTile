import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { ProfileI } from "../../Interfaces/userInterfaces";

export const Profile = () => {
  const [profile, setProfile] = useState<ProfileI | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get<ProfileI>("/users/profile");
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

  if (loading) return <p>Loading...</p>;

  return profile ? (
    <div>
      <p>{profile.username}</p>
      <p>{profile.email}</p>
      <p>{profile.elo}</p>
      <p>
        {profile.created_at ? new Date(profile.created_at).toDateString() : ""}
      </p>
    </div>
  ) : (
    <div>
      <p>Log in to see your profile</p>
    </div>
  );
};
