import SignInSide from "./pages/Auth/SignIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContextProvider from "../src/contexts/AuthContextsPovider";
import { RequireAuth } from "./helpers/RequireAuth";
import Home from "./pages/Home/Home";
import { SnackbarProvider } from "notistack";
import { RequireNotAuth } from "./helpers/RequireNotAuth";
import SignUp from "./pages/Auth/SignUp";
import BaseLayout from "./components/BaseLayout";
import Team from "./pages/Team";
import { CssBaseline } from "@mui/material";
import TaskCreate from "./pages/Task/TaskCreate";
import CreateTeam from './pages/Team/CreateTeam'

function App() {
	return (
		<div className="App">
			<CssBaseline>
				<AuthContextProvider>
					<SnackbarProvider>
						<Router>
							<Routes>
								<Route element={<RequireAuth />}>
									<Route element={<BaseLayout />}>
										
										<Route path="/" element={<Home />} />
										<Route path="/team/:id" element={<Team />} />
										<Route path="/team/:id/create" element={<TaskCreate/>}/>
										<Route path="/createTeam" element={<CreateTeam/>}/>
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
			</CssBaseline>
		</div>
	);
}

export default App;
