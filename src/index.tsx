import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";
import AppProvider from "./contexts/AppProvider";

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</AppProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
