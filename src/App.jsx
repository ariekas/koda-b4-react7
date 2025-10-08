import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { TaskProvider } from "./providers/TaskProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  }
]);

export default function App() {
  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  );
}