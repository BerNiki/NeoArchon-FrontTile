import { PlayerRolesEnum } from "../const/enums";

export interface CreateGameDTO {
  name: string;
  password?: string;
  playerRole: PlayerRolesEnum | "";
}
