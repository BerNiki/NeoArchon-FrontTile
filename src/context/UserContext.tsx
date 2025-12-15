import { createContext, useContext, useEffect, useState } from "react";
import {
  UserProfileContextInterface,
  UserProfileInterface,
} from "./interface/UserProfileInterface";
import { api } from "../api/api";

const UserProfileContext = createContext<UserProfileContextInterface | null>(
  null
);

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);

  if (!context)
    throw new Error('"useUserProfile must be used within a ProfileProvider"');

  return context;
};

export const UserProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<UserProfileInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const user = await api.get("user");
        const { username, id, elo } = user.data;
        setProfile({ username, id, elo });
      } catch (e) {
        console.log(e);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  if (loading) return <div>Loading data</div>;

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
