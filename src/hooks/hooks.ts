export {};
/*
function useTaskInput() {
  const [taskValue, setTaskValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.currentTarget.value);
    setError("");
  };

  const onKeyDownHandler = (
    e: KeyboardEvent<HTMLInputElement>,
    callback: () => void,
  ) => {
    if (e.key === "Enter") {
      callback();
      setTaskValue("");
    }
  };

  return { taskValue, error, onChangeHandler, onKeyDownHandler };
}

//Todolist, Todo
const { taskValue, error, onChangeHandler, onKeyDownHandler } = useTaskInput();

function useFilter() {
  const [filter, setFilter] = useState<FilterT>("all");
  
  const changeFilter = (filter: FilterT) => {
    setFilter(filter);
  };
  
  return { filter, changeFilter };
}

//Todolist
const { filter, changeFilter } = useFilter();

*/
