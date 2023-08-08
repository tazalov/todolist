import { Todolist } from "./components/todolist/Todolist";
import { v1 } from "uuid";
import { useState } from "react";
import "./style.css";

export type FilterT = "all" | "active" | "completed";

type TodolistT = {
  id: string;
  title: string;
  filter: FilterT;
};

export type TaskT = {
  id: string;
  title: string;
  isDone: boolean;
};

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();
  const todolistId3 = v1();

  const filterOptions = {
    all: (tasks: TaskT[]) => tasks,
    completed: (tasks: TaskT[]) => tasks.filter((el) => el.isDone),
    active: (tasks: TaskT[]) => tasks.filter((el) => !el.isDone),
  };

  const [todoLists, setTodoLists] = useState<TodolistT[]>([
    { id: todolistId1, title: "Bla1", filter: "all" },
    { id: todolistId2, title: "Bla2", filter: "active" },
    { id: todolistId3, title: "Bla3", filter: "completed" },
  ]);
  const [tasks, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistId3]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  const changeFilter = (filter: FilterT, todolistId: string) => {
    const newTodoLists = todoLists.map((el) =>
      el.id === todolistId ? { ...el, filter } : el,
    );
    setTodoLists(newTodoLists);
  };
  //! ---------- change array todoLists
  const removeTodolist = (todolistId: string) => {
    const newTodoLists = todoLists.filter((el) => el.id !== todolistId);
    setTodoLists(newTodoLists);
    delete tasks[todolistId];
  };
  //! ---------- change array todoLists

  //! ---------- change array tasks
  const addTask = (title: string, todolistId: string) => {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [newTask, ...tasks[todolistId]];
    setTasks({ ...tasks, [todolistId]: newTasks });
  };
  const removeTask = (taskId: string, todolistId: string) => {
    const newTasks = tasks[todolistId].filter((el) => el.id !== taskId);
    setTasks({ ...tasks, [todolistId]: newTasks });
  };
  //! ---------- change array tasks

  //! ---------- change specific task
  const changeIsDone = (
    taskId: string,
    isDone: boolean,
    todolistId: string,
  ) => {
    const newTasks = tasks[todolistId].map((el) =>
      el.id === taskId ? { ...el, isDone } : el,
    );
    setTasks({ ...tasks, [todolistId]: newTasks });
  };
  const changeTitle = (taskId: string, title: string, todolistId: string) => {
    const newTasks = tasks[todolistId].map((el) =>
      el.id === taskId ? { ...el, title } : el,
    );
    setTasks({ ...tasks, [todolistId]: newTasks });
  };
  //! ---------- change specific task

  return (
    <div className={"App"}>
      {todoLists.map((el) => {
        const filteredTasks = filterOptions[el.filter](tasks[el.id]);
        return (
          <Todolist
            key={el.id}
            id={el.id}
            title={el.title}
            tasksArr={filteredTasks}
            filterValue={el.filter}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeFilter}
            changeIsDone={changeIsDone}
            changeTitle={changeTitle}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
