import "./App.css";
import { AddPostForm } from "./features/posts/AddPostForm";
// import { Counter } from "./features/counter/Counter";
import { PostsList } from "./features/posts/PostsList";
// import TodoList from "./features/todos/TodoList";

function App() {
  return (
    <>
      <PostsList />
      <AddPostForm />
      {/* <Counter /> */}
      {/* <TodoList /> */}
    </>
  );
}

export default App;
