import BoardPage from "./pages/BoardPage";
import initialTasks from "./data/initialTasks";

function App() {
  return <BoardPage tasks={initialTasks} />;
}

export default App;
