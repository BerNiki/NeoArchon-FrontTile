import { ChangeEvent, useState } from "react";
import { api } from "../../api/api";
import { Game } from "../game/game";

export const BrowseGames = () => {
  const [gameList, setGameList] = useState<any>([]);
  const [gameId, setGameId] = useState("");
  const fetchGames = async () => {
    const gameList = await api.get("game/list");
    setGameList(gameList.data);
  };
  return (
    <>
      {gameId.length ? (
        <Game gameId={gameId} />
      ) : (
        <>
          {gameList.length > 0 && (
            <>
              <table
                style={{
                  backgroundColor: "darkgreen",
                  border: "1px solid yellow",
                }}
              >
                <tbody>
                  {gameList.map((game: any) => (
                    <tr
                      key={game.id}
                      style={{
                        border: "1px solid yellow",
                      }}
                    >
                      <td>{game.name}</td>
                      <td>{game.id}</td>
                      <td>{game.status}</td>
                      <td>
                        <button onClick={() => setGameId(game.id)}>
                          Join game
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          <div>
            <button onClick={fetchGames}>Refresh</button>
          </div>
        </>
      )}
    </>
  );
};

interface Todo {
  index: number;
  title: string;
  content: string;
  deadLine: string;
}

type TodoList = Todo[];

export const Todo = () => {
  const emptyTodo: Todo = {
    index: 0,
    title: "",
    content: "",
    deadLine: "",
  };

  const [todoList, setTodoList] = useState<TodoList>([]);
  const [newTodo, setNewTodo] = useState<Todo>(emptyTodo);
  const [errors, setErrors] = useState<string[]>([]);
  let error = false;

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    error = false;

    if (newTodo.title.length < 1) {
      setErrors((prev) => [...prev, "Please input title"]);
      error = true;
    }
    if (newTodo.content.length < 1) {
      setErrors((prev) => [...prev, "Please input content"]);
      error = true;
    }
    if (error) return;

    return setTodoList((prevList) => {
      const todoToAdd: Todo = { ...newTodo, index: todoList.length };
      setNewTodo(emptyTodo);
      return [...prevList, todoToAdd];
    });
  };

  const deleteTodo = (index: number) =>
    setTodoList((prevList) => prevList.filter((todo) => todo.index !== index));

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setNewTodo((existingTodo) => {
      const { name, value } = event.target;
      return { ...existingTodo, [name]: value };
    });

  return (
    <div style={{ color: "white", textShadow: "1px 1px black" }}>
      {todoList.length > 0 && <h1>My todos:</h1>}
      {todoList.length > 0 &&
        todoList.map((todo) => {
          return (
            <div
              className="todo-wrapper"
              style={{
                backgroundColor: "sandybrown",
                border: "1px, green, solid",
                borderRadius: "10px",
                width: "200px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>{todo.title}</h2>
              <p>{todo.content}</p>
              <p>{todo.deadLine}</p>
              <button onClick={() => deleteTodo(todo.index)}>
                Delete Todo
              </button>
            </div>
          );
        })}

      <h1>Add new todo:</h1>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          value={newTodo.title}
          type="text"
          name="title"
          onChange={onChange}
          placeholder="input todo title"
        ></input>
        <label htmlFor="content">Content:</label>
        <input
          value={newTodo.content}
          type="text"
          name="content"
          placeholder="input todo content"
          onChange={onChange}
        ></input>
        <label htmlFor="deadline">Add deadline</label>
        <input
          type="date"
          name="deadLine"
          onChange={onChange}
          value={newTodo.deadLine}
        ></input>
        <button onClick={addTodo}>Add Todo</button>
      </form>
      {errors.length > 0 && errors.map((error) => <h1>{error}</h1>)}
    </div>
  );
};
