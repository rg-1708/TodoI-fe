import "./App.css";
import Layout from "./components/layout/layout";
import TodoModal from "./components/modals/todoModal";
import Todos from "./components/todos/todos";

function App() {
  return (
    <Layout>
      <TodoModal />
      <Todos />
    </Layout>
  );
}

export default App;
