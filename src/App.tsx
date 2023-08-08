import "./App.css";
import { Todolist } from "./components/todolist/Todolist";
import { v1 } from "uuid";

const tasks = [
  { id: v1(), title: "HTML&CSS", isDone: true },
  { id: v1(), title: "JS", isDone: true },
  { id: v1(), title: "ReactJS", isDone: false },
  { id: v1(), title: "Rest API", isDone: false },
  { id: v1(), title: "GraphQL", isDone: false },
];

function App() {
  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks} />
    </div>
  );
}

export default App;
