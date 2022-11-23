import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";

function App() {
  return (
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  );
}

export default App;
