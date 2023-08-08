import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { EditableInput } from "../common/input/Input";
import { Button } from "../common/button/Button";

type TodoPT = {
  id: string;
  title: string;
  isDone: boolean;
  changeIsDone: (id: string, isDone: boolean) => void;
  remove: () => void;
  changeTitle: (id: string, newTitle: string) => void;
};

//? u can use React.memo
export const Todo = React.memo(function ({
  id,
  title,
  isDone,
  changeIsDone,
  remove,
  changeTitle,
}: TodoPT) {
  console.log(id.slice(7, 8), "-rerender");
  const [currentTitle, setCurrentTitle] = useState<string>(title);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  //! ---------- (de)activate edit mode for change title current task
  const toggleEditMode = () => setEditMode((prev) => !prev);
  //! ---------- (de)activate edit mode for change title current task

  //! ---------- change title current task
  const addNewTitle = () => {
    const newTitle = currentTitle.trim();
    if (newTitle !== title) {
      if (newTitle.length) {
        changeTitle(id, currentTitle);
        setEditMode(false);
      } else {
        setError("Value can't be empty");
      }
    }
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewTitle();
    }
  };
  const onBlurHandler = () => {
    addNewTitle();
  };
  //! ---------- change title current task

  //! ---------- handler for input with title current task
  const changeCurrentTitle = (value: string) => {
    setCurrentTitle(value);
    setError("");
  };
  //! ---------- handler for input with title current task

  //! ---------- change isDone current task
  const setNewDone = (e: ChangeEvent<HTMLInputElement>) => {
    setEditMode(false);
    changeIsDone(id, e.currentTarget.checked);
  };
  //! ---------- change isDone current task

  return (
    <li className={isDone ? "is-done" : ""}>
      <input type="checkbox" checked={isDone} onChange={setNewDone} />
      {editMode ? (
        <>
          <EditableInput
            initialValue={currentTitle}
            onChange={changeCurrentTitle}
            onBlur={onBlurHandler}
            onKeyDown={onKeyDownHandler}
            error={error}
            autoFocus={true}
          />
        </>
      ) : (
        <span onClick={toggleEditMode}>{title}</span>
      )}
      <Button title={"x"} callback={remove} />
    </li>
  );
});
