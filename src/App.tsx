import { Todolist } from "./components/todolist/Todolist";
import { v1 } from "uuid";
import { useState } from "react";
import "./style.css";

export type FilterT = "all" | "active" | "completed";

type TodoListT = {
  id: string;
  name: string;
  filter: FilterT;
};

export type TaskT = {
  id: string;
  title: string;
  isDone: boolean;
};

type TasksT = {
  [key: string]: TaskT[];
};

function App() {
  //! ---------- additional data
  const todoListId1 = v1();
  const todoListId2 = v1();

  const filterOptions = {
    all: (tasks: TaskT[]) => tasks,
    completed: (tasks: TaskT[]) => tasks.filter((el) => el.isDone),
    active: (tasks: TaskT[]) => tasks.filter((el) => !el.isDone),
  };
  //! ---------- additional data

  //! ---------- state
  const [todoLists, setTodoLists] = useState<TodoListT[]>([
    { id: todoListId1, name: "What to learn", filter: "all" },
    { id: todoListId2, name: "What to byu", filter: "active" },
  ]);
  const [tasks, setTasks] = useState<TasksT>({
    [todoListId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Butter", isDone: false },
    ],
  });
  //! ---------- state

  //! ---------- change array todoLists
  const addTodoList = () => {
    const newTodoListId = v1();
    const newTodoList: TodoListT = {
      id: newTodoListId,
      name: "New TodoList",
      filter: "all",
    };
    const newTasks: TaskT[] = [{ id: v1(), title: "New Task", isDone: false }];
    setTodoLists([...todoLists, newTodoList]);
    setTasks({ ...tasks, [newTodoListId]: newTasks });
  };
  const removeTodoList = (todolistId: string) => {
    const newTodoLists = todoLists.filter((el) => el.id !== todolistId);
    setTodoLists(newTodoLists);
    delete tasks[todolistId];
  };
  const changeFilterTodoList = (todolistId: string, filter: FilterT) => {
    const newTodoLists = todoLists.map((el) =>
      el.id === todolistId ? { ...el, filter } : el,
    );
    setTodoLists(newTodoLists);
  };
  //! ---------- change array todoLists

  //! ---------- change array tasks
  const addTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [newTask, ...tasks[todolistId]];
    setTasks({ ...tasks, [todolistId]: newTasks });
  };
  const removeTask = (todolistId: string, taskId: string) => {
    const newTasks = tasks[todolistId].filter((el) => el.id !== taskId);
    setTasks({ ...tasks, [todolistId]: newTasks });
  };
  //! ---------- change array tasks

  //! ---------- change specific task
  const changeIsDone = (
    todolistId: string,
    taskId: string,
    isDone: boolean,
  ) => {
    const newTasks = tasks[todolistId].map((el) =>
      el.id === taskId ? { ...el, isDone } : el,
    );
    setTasks({ ...tasks, [todolistId]: newTasks });
  };
  const changeTitle = (todolistId: string, taskId: string, title: string) => {
    const newTasks = tasks[todolistId].map((el) =>
      el.id === taskId ? { ...el, title } : el,
    );
    setTasks({ ...tasks, [todolistId]: newTasks });
  };
  //! ---------- change specific task

  return (
    <>
      <button onClick={addTodoList}>add todolist</button>
      <div className={"App"}>
        {todoLists.map((el) => {
          const currentTasks = filterOptions[el.filter](tasks[el.id]);
          return (
            <Todolist
              key={el.id}
              id={el.id}
              name={el.name}
              tasks={currentTasks}
              filterValue={el.filter}
              addTask={addTask}
              removeTask={removeTask}
              changeFilter={changeFilterTodoList}
              changeIsDone={changeIsDone}
              changeTitle={changeTitle}
              removeTodolist={removeTodoList}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
