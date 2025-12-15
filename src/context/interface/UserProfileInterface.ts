export interface UserProfileInterface {
  id: string;
  username: string;
  elo: string;
}

export interface UserProfileContextInterface {
  profile: UserProfileInterface | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileInterface | null>>;
}
