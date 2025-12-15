import { Unit } from "./unitInterfaces";

export interface Cell {
  a: null | number;
  b: null | number;
}

export interface SelectedCell {
  a: number;
  b: number;
}

export interface MoveData {
  from: Cell;
  to: Cell;
}

export interface PostMoveApiData {
  gameId: string;
  moveData: MoveData;
}

export enum TeamsEnum {
  light = "LIGHT",
  dark = "DARK",
}

export enum colorDirection {
  ascending = "ASCENDING",
  descending = "DESCENDING",
}

export interface TileInterface {
  unit: Unit | "EMPTY";
  color: {
    color: ColorEnum;
    direction: colorDirection;
  };
  isPointOfPower: boolean;
  cycling: boolean;
}

export enum ColorEnum {
  light = "LIGHT",
  light2 = "L2",
  light1 = "L1",
  dark1 = "D1",
  dark2 = "D2",
  dark = "DARK",
}

export enum GameStatusEnum {
  waitingForPlayers = "WAITING_FOR_PLAYERS",
  ongoing = "ONGOING",
  aborted = "ABORTED",
  draw = "DRAW",
  white_won = "WHITE_WON",
  black_won = "BLACK_WON",
}

export type GameBoardStateInterface = TileInterface[][];

export interface GameInterface {
  id: string;
  status: GameStatusEnum;
  board_state: GameBoardStateInterface;
  name: string;
  password: string;
  turnUser: TeamsEnum;
  gameSetup: any;
  created_at: Date;
}
