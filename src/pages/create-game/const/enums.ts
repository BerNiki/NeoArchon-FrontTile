export enum GameStatusEnum {
  waitingForPlayers = "WAITING_FOR_PLAYERS",
  ongoing = "ONGOING",
  aborted = "ABORTED",
  draw = "DRAW",
  white_won = "WHITE_WON",
  black_won = "BLACK_WON",
}

export enum PlayerRolesEnum {
  white = "WHITE",
  black = "BLACK",
  spectator = "SPECTATOR",
}

export const playerRoles = ["WHITE", "BLACK", "SPECTATOR"];
