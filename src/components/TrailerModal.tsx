import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../contexts/AppProvider";

export default function TrailerModal() {
	const { setModalVisible } = useContext(AppContext);

	useEffect(() => {
		window.addEventListener("click", (e: Event) => {
			const modal = document.querySelector("#trailer-modal");
			if (e.target === modal) setModalVisible(false);
		});

		return window.removeEventListener("click", () => setModalVisible(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Background id="trailer-modal">
			<Container></Container>
		</Background>
	);
}

const Background = styled.div`
	position: fixed;
	height: 100vh;
	width: 100%;
	z-index: 4;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Container = styled.section`
	background-color: #fff;
	border-radius: 1rem;
	height: 70vh;
	max-height: 600px;
	max-width: 800px;
	width: 95%;
`;
