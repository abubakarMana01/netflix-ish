import React, { createContext, useState } from "react";

const AuthContext = createContext();

function AppProvider({ children }) {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<AuthContext.Provider value={{ modalVisible, setModalVisible }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AppProvider as default, AuthContext as AppContext };
