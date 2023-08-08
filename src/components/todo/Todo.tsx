import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { EditableInput } from "../common/input/Input";
import { Button } from "../common/button/Button";

type TodoPT = {
  id: string;
  todolistId: string;
  title: string;
  isDone: boolean;
  changeIsDone: (taskId: string, isDone: boolean, todolistId: string) => void;
  remove: () => void;
  changeTitle: (taskId: string, title: string, todolistId: string) => void;
};

//? u can use React.memo
export const Todo = React.memo(function ({
  id,
  todolistId,
  title,
  isDone,
  changeIsDone,
  remove,
  changeTitle,
}: TodoPT) {
  const [currentTitle, setCurrentTitle] = useState<string>(title);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  //! ---------- (de)activate edit mode for change title current task
  const toggleEditMode = () => setEditMode((prev) => !prev);
  //! ---------- (de)activate edit mode for change title current task

  //! ---------- change title current task
  const addTitle = () => {
    const newTitle = currentTitle.trim();
    if (newTitle.length === 0) {
      setError("Value can't be empty");
    } else if (newTitle !== title) {
      changeTitle(id, currentTitle, todolistId);
      setEditMode(false);
    } else {
      setEditMode(false);
    }
  };
  const addTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTitle();
    }
  };
  const addTitleBlurHandler = () => {
    addTitle();
  };
  //! ---------- change title current task

  //! ---------- handler for input with title current task
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.currentTarget.value);
    setError("");
  };
  //! ---------- handler for input with title current task

  //! ---------- change isDone current task
  const onChangeDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeIsDone(id, e.currentTarget.checked, todolistId);
  };
  //! ---------- change isDone current task

  return (
    <li className={isDone ? "is-done" : ""}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={onChangeDoneHandler}
        disabled={editMode}
      />
      {editMode ? (
        <>
          <EditableInput
            initialValue={currentTitle}
            onChange={onChangeTitleHandler}
            onBlur={addTitleBlurHandler}
            onKeyDown={addTitleKeyDownHandler}
            error={error}
            autoFocus={true}
          />
        </>
      ) : (
        <span onClick={toggleEditMode}>{title}</span>
      )}
      <Button title={"x"} callback={remove} disable={editMode} />
    </li>
  );
});
