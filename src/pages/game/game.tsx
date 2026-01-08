import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { gameCell, gameTable } from "./game.module.scss";
import "./game.scss";
import { teams } from "./const/teams";
import {
  Cell,
  MoveData,
  PostMoveApiData,
  GameInterface,
  SelectedCell,
} from "./interfaces/gameInterfaces";
import { markReachableTiles } from "./helpers/possibleDestinations";
import { socket } from "../../socket/socket";

export const Game = ({ gameId }: { gameId: string }) => {
  const emptyCellState: Cell = { a: null, b: null };
  const emptyMoveData: MoveData = { from: emptyCellState, to: emptyCellState };

  const [game, setGame] = useState<GameInterface>();
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<Cell>(emptyCellState);
  const [possibleMove, setPossibleMove] = useState<SelectedCell[]>();
  const [lastMoveData, setLastMoveData] = useState<MoveData>({
    from: emptyCellState,
    to: emptyCellState,
  });

  const postMove = async (data: PostMoveApiData) =>
    await api.post("/moves", data);

  const selectOrMoveUnit = async (
    unitName: string,
    rowId: number,
    cellId: number
  ) => {
    if (game) {
      // if selecting same unit again -> deselect it
      if (
        lastMoveData.from.a === selectedUnit.a &&
        lastMoveData.from.b === selectedUnit.b
      ) {
        setSelectedUnit(emptyCellState);
        setLastMoveData(emptyMoveData);
      }

      // if a unit is already selected → save move data
      if (
        selectedUnit.a !== null &&
        possibleMove?.some((move) => move.a === rowId && move.b === cellId)
      ) {
        setLastMoveData({
          from: { a: selectedUnit.a, b: selectedUnit.b },
          to: { a: rowId, b: cellId },
        });

        setSelectedUnit(emptyCellState);
        return;
      }

      // otherwise select this unit if its that teams turn
      if (
        unitName !== "EMPTY" &&
        teams[game.turnUser as "LIGHT" | "DARK"].includes(unitName)
      ) {
        setSelectedUnit({ a: rowId, b: cellId });
        setLastMoveData({
          from: { a: rowId, b: cellId },
          to: { a: null, b: null },
        });
      }
    }
  };

  const assignImage = (unitName: string, rowId: number, cellId: number) => {
    return unitName !== "EMPTY" ? (
      <img
        onClick={() => selectOrMoveUnit(unitName, rowId, cellId)}
        src={`/units/${unitName}.gif`}
        className={`${
          selectedUnit.a === rowId && selectedUnit.b === cellId
            ? "activeUnit"
            : ""
        } unit-image`}
      ></img>
    ) : (
      <div
        onClick={() => selectOrMoveUnit(unitName, rowId, cellId)}
        style={{ height: "65px", width: "65px" }}
      ></div>
    );
  };

  useEffect(() => {
    if (game && lastMoveData.from.a !== null && lastMoveData.to.a !== null) {
      const endTurn = async () => {
        socket.emit("move", {
          gameId: gameId,
          moveData: lastMoveData,
        });
        const result = await postMove({
          gameId: game.id,
          moveData: lastMoveData,
        });
        setGame(result.data);
      };
      endTurn();

      setLastMoveData({
        from: { a: null, b: null },
        to: { a: null, b: null },
      });
    }
  }, [lastMoveData]);

  useEffect(() => {
    const initGame = async () => {
      setLoading(true);

      try {
        const { data } = await api.patch("/game/join", {
          playerRole: "WHITE",
          gameId,
        });

        setGame(data);
      } catch (e) {
        console.log(e);
        setGame(undefined);
      } finally {
        setLoading(false);
      }
    };

    socket.on("connect", () => {
      console.log(`connected with id: ${socket.id}`);
    });

    socket.on("moveUpdate", (data) => {
      console.log("this", data);
    });

    initGame();

    return () => {
      socket.off("moveUpdate");
    };
  }, [gameId]);

  useEffect(() => {
    if (game && selectedUnit.a !== null && selectedUnit.b !== null) {
      const reachable = markReachableTiles(
        game.board_state,
        selectedUnit as SelectedCell,
        game.turnUser
      );

      setPossibleMove(reachable);
    } else {
      setPossibleMove([]);
    }
  }, [selectedUnit]);

  return (
    <>
      <div>{loading && <p>LOADING...</p>}</div>
      {game && (
        <div>
          {(game.status === "WHITE_WON" || game.status === "BLACK_WON") && (
            <p style={{ fontSize: "40px" }}>
              {game.status === "WHITE_WON"
                ? "LIGHT SIDE WON THE GAME!"
                : "DARK SIDE WON THE GAME!"}
            </p>
          )}
        </div>
      )}
      <div>
        <table className={gameTable}>
          <tbody>
            {game &&
              game.board_state.map((row, rowId: number) => (
                <tr className={`game-row row-${rowId}`}>
                  {row.map((cell, cellId) =>
                    possibleMove?.some(
                      (move) => move.a === rowId && move.b === cellId
                    ) ? (
                      <td
                        className={`${gameCell} row-${rowId}-cell-${cellId} ${
                          cell.color.color
                        } ${cell.isPointOfPower ? "point-of-power" : ""} ${
                          cell.unit !== "EMPTY" ? "enemyUnit" : ""
                        }`}
                      >
                        <div
                          className={`possibleMove ${
                            cell.unit !== "EMPTY" ? "enemyUnit" : ""
                          }`}
                        >
                          {assignImage(
                            cell.unit !== "EMPTY" ? cell.unit.name : cell.unit,
                            rowId,
                            cellId
                          )}
                        </div>
                      </td>
                    ) : (
                      <td
                        className={`${gameCell} row-${rowId}-cell-${cellId} ${
                          cell.color.color
                        } ${cell.isPointOfPower ? "point-of-power" : ""}`}
                      >
                        <div>
                          {assignImage(
                            cell.unit !== "EMPTY" ? cell.unit.name : cell.unit,
                            rowId,
                            cellId
                          )}
                        </div>
                      </td>
                    )
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

//  FOR FUTURE USE TO REPLAY GAME
//
// const replayMoves = (moves: any[], boardState: any[]) => {
//   return moves.reduce(
//     (board, move) => {
//       const { from, to } = move.move_data;
//       let unitName;
//
//       // remove unit from old cell
//       if (from.a !== null && from.b !== null) {
//         unitName = boardState[from.a][from.b].unit;
//         board[from.a][from.b] = { ...board[from.a][from.b], unit: "EMPTY" };
//       }
//       // place unit on new cell
//       if (to.a !== null && to.b !== null) {
//         board[to.a][to.b] = { ...board[to.a][to.b], unit: unitName };
//       }
//
//       return board;
//     },
//     boardState.map((row) => [...row])
//   );
// };
//
// const { data: moves } = await api.patch("/moves", { gameId });
// const updatedBoard = replayMoves(moves, gameData.board_state);
