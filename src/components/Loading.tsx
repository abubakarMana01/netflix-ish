import React from "react";
import Lottie from "react-lottie";
import animationData from "../animations/loader.json";
import styled from "styled-components";

export default function Loading() {
	return (
		<LottieContainer>
			<Lottie
				options={{
					loop: true,
					autoplay: true,
					animationData: animationData,
					rendererSettings: {
						preserveAspectRatio: "xMidYMid slice",
					},
				}}
				height={200}
				width={200}
			/>
		</LottieContainer>
	);
}

const LottieContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
`;
