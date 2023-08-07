import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  filter: FilterValuesType;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeIsDone: (id: string, isDone: boolean) => void;
  changeTitle: (id: string, newValue: string) => void;
};

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState("");
  //----------------------------
  const [editTaskFlag, setEditTaskFlag] = useState<boolean>(false);
  const [currentTaskValue, setCurrentTaskValue] = useState<string>("");
  const [currentIdEditTask, setCurrentIdEditTask] = useState<string>("");
  const [editError, setEditError] = useState<string>("");
  //----------------------------

  const [error, setError] = useState<string>("");

  const addTask = () => {
    if (title.trim().length) {
      props.addTask(title);
      setTitle("");
    } else {
      setError("Value can't be empty");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setError("");
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTask();
    }
  };

  //----------------------------
  const activateEditTask = (id: string, value: string) => {
    setEditTaskFlag(true);
    setCurrentTaskValue(value);
    setCurrentIdEditTask(id);
  };
  const editTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTaskValue(e.currentTarget.value);
    setEditError("");
  };
  const saveNewTitle = () => {
    if (currentTaskValue.trim().length) {
      props.changeTitle(currentIdEditTask, currentTaskValue);
      setCurrentTaskValue("");
      setCurrentIdEditTask("");
      setEditTaskFlag(false);
    } else {
      setEditError("Value can't be empty");
    }
  };
  const cancelEditMode = () => {
    setCurrentTaskValue("");
    setCurrentIdEditTask("");
    setEditTaskFlag(false);
  };
  //----------------------------
  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  const changeIsDoneHandler = (checked: boolean, id: string) => {
    props.changeIsDone(id, checked);
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? "error-msg" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <span className="error-msg">{error}</span>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id);
          const onEditHandler = () => activateEditTask(t.id, t.title);
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={(e) =>
                  changeIsDoneHandler(e.currentTarget.checked, t.id)
                }
              />
              <span>{t.title}</span>
              <button onClick={onClickHandler}>x</button>
              <button onClick={onEditHandler}>edit task</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={onAllClickHandler}
          className={props.filter === "all" ? "active-btn" : ""}
        >
          All
        </button>
        <button
          onClick={onActiveClickHandler}
          className={props.filter === "active" ? "active-btn" : ""}
        >
          Active
        </button>
        <button
          onClick={onCompletedClickHandler}
          className={props.filter === "completed" ? "active-btn" : ""}
        >
          Completed
        </button>
      </div>
      <div>
        {editTaskFlag && (
          <>
            <button onClick={cancelEditMode}>close</button>
            <input
              type="text"
              value={currentTaskValue}
              onChange={editTaskHandler}
              className={error ? "error-msg" : ""}
            />
            <button onClick={saveNewTitle}>save</button>
            {editError && <span className="error-msg">{editError}</span>}
          </>
        )}
      </div>
    </div>
  );
}
