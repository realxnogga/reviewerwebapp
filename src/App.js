import { Login } from "./pages/login";
import { Register } from "./pages/register";
import Home from "./pages/home";
import { Provider } from "react-redux";
import { Store } from "./store"; // Assuming you've exported your Redux store as 'store'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fakeCookie } from "./feature/authenticationSlice";
import { useSelector } from "react-redux";

function WrapperApp() {
  const bool = useSelector(fakeCookie);

  return (
    <Router>
      <Routes>
        {bool ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

const App = () => (
  <Provider store={Store}>
    <WrapperApp />
  </Provider>
);

export default App;
