import SignInSide from "./pages/Auth/SignIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContextProvider from "../src/contexts/AuthContextsPovider";
import { RequireAuth } from "./helpers/RequireAuth";
import Home from "./pages/Home/Home";
import { SnackbarProvider } from "notistack";
import { RequireNotAuth } from "./helpers/RequireNotAuth";
import SignUp from "./pages/Auth/SignUp";
import BaseLayout from "./components/BaseLayout";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <SnackbarProvider>
          <Router>
            <Routes>
              <Route element={<RequireAuth />}>
                <Route element={<BaseLayout />}>
                  <Route path="/" element={<Home />} />
                </Route>
              </Route>
              <Route element={<RequireNotAuth />}>
                <Route path="auth/signin" element={<SignInSide />}></Route>
                <Route path="auth/signup" element={<SignUp />}></Route>
              </Route>
            </Routes>
          </Router>
        </SnackbarProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
