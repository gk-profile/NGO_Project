import { BrowserRouter } from "react-router-dom"
import { RouterProvider } from "./routes/Router"

function App() {
  return (
    <BrowserRouter>
      <RouterProvider/>
    </BrowserRouter>
  )
}

export default App