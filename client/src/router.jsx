import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "./pages/error-page"
import Root from "./pages/Root"
import TaskForm from "./pages/TaskForm"
import TasksPage from "./pages/TasksPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <TasksPage />,
      },
      {
        path: "new/",
        element: <TaskForm />,
      },
    ],
  },
  {
    path: "new/",
    element: <TaskForm />,
  },
])
