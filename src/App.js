import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { MainPage } from "./pages/mainpage";
import { LearningResources } from "./pages/learningresources";
import { PracticeTestAndQuiz } from "./pages/practicetestandquiz";
import { ReviewModule } from "./pages/reviewmodule";
import { DashBoard } from "./pages/dashboard";

import { Provider } from "react-redux";
import { Store } from "./store"; // Assuming you've exported your Redux store as 'store'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { loginCookieTemp } from "./feature/account/loginSlice";
import { CustomToastContainer } from "./components/toaster";

function WrapperApp() {
  const loginCookie = useSelector(loginCookieTemp);

  return (

    <Router>
      <Routes>
        {loginCookie ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/learningresources" element={<LearningResources />} />
            <Route path="/practicetestandquiz" element={<PracticeTestAndQuiz />} />
            <Route path="/reviewmodule" element={<ReviewModule />} />
            <Route path="/dashboard" element={<DashBoard />} />
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
  <>
    <Provider store={Store}>
      <WrapperApp />
      <CustomToastContainer />
    </Provider>
  </>

);

export default App;
