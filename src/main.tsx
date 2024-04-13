import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./states/index.ts"

// Styles
import "./styles/index.css"
import "react-loading-skeleton/dist/skeleton.css"

const router = createBrowserRouter([{ path: "*", Component: App }])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
