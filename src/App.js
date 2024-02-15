
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/about",
    element: <About></About>,
  },
  {
    path: "/contact",
    element: <Contact></Contact>,
  }
]);

function App() {
  return (
   <>
    <RouterProvider router={router} />
   </>
  );
}

export default App;
