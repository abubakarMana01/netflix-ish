import { useContext, useState } from "react";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { AuthContext } from "./contexts/AuthProvider";
import { auth } from "./config/firebase";
import Loading from "./components/Loading";
import Profile from "./pages/Profile";

export default function App() {
	const authContext = useContext(AuthContext);
	const [initializing, setInitializing] = useState(true);

	auth.onAuthStateChanged(user => {
		authContext.setUser(user);

		if (initializing) {
			setInitializing(false);
		}
	});

	return initializing ? (
		<div style={{ height: "100vh" }}>
			<Loading />
		</div>
	) : (
		<Router>
			{authContext.user ? (
				<Routes>
					<Route path="/auth" element={<Navigate to="/" />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/" element={<Home />} />
					<Route path="*" element={<h1>Not found</h1>} />
				</Routes>
			) : (
				<Auth />
			)}
		</Router>
	);
}
