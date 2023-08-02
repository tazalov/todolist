import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";
import { Button } from "./components/button/Button";

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (text: string) => void;
  changeIsDone: (id: string, isDone: boolean) => void;
  changeIsDone2: (id: string, isDone: boolean) => void;
};

export function Todolist(props: PropsType) {
  const [inputValue, setInputValue] = useState<string>("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const addTaskHandler = () => {
    props.addTask(inputValue);
    setInputValue("");
  };
  const addTaskWithEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };

  const changeFilterCompletedHandler = () => props.changeFilter("completed");
  const changeFilterActiveHandler = () => props.changeFilter("active");
  const changeFilterAllHandler = () => props.changeFilter("all");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={inputValue}
          onChange={onChangeHandler}
          onKeyDown={addTaskWithEnterHandler}
        />
        <Button title={"+"} callback={addTaskHandler} type={"green"} />
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.isDone}
              onChange={(e) =>
                props.changeIsDone(t.id, e.currentTarget.checked)
              }
            />
            <span>{t.title}</span>
            <Button
              title={"x"}
              callback={() => props.removeTask(t.id)}
              type={"red"}
            />
          </li>
        ))}
      </ul>
      <div>
        <Button
          title={"All"}
          callback={changeFilterAllHandler}
          type={"aquamarine"}
        />
        <Button
          title={"Active"}
          callback={changeFilterActiveHandler}
          type={"aquamarine"}
        />
        <Button
          title={"Completed"}
          callback={changeFilterCompletedHandler}
          type={"aquamarine"}
        />
      </div>
    </div>
  );
}
