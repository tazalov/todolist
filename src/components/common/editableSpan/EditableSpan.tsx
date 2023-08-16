import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanPT = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

export function EditableSpan({ title, changeTitle }: EditableSpanPT) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>(title);
  const [error, setError] = useState<string>("");

  //! ---------- (de)activate edit mode for current title
  const toggleEditMode = () => setEditMode((prev) => !prev);
  //! ---------- (de)activate edit mode for current title

  //! ---------- update current title
  const updateTitle = () => {
    const newTitle = currentTitle.trim();
    if (newTitle.length === 0) {
      setError("Value can't be empty");
    } else if (newTitle !== title) {
      changeTitle(currentTitle);
      setEditMode(false);
    } else {
      setEditMode(false);
    }
  };
  const updateTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTitle();
    }
  };
  //! ---------- update current title

  //! ---------- handler for input with current title
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.currentTarget.value);
    setError("");
  };
  //! ---------- handler for input with current title

  const onBlurHandler = () => {
    if (!error) updateTitle();
  };

  return editMode ? (
    <>
      <input
        type={"text"}
        value={currentTitle}
        onChange={onChangeTitleHandler}
        onBlur={onBlurHandler}
        onKeyDown={updateTitleKeyDownHandler}
        autoFocus={true}
        style={{ fontSize: "inherit", fontWeight: "inherit" }}
      />
      {error && <div className={"error-msg"}>{error}</div>}
    </>
  ) : (
    <span onDoubleClick={toggleEditMode}>{title}</span>
  );
}
