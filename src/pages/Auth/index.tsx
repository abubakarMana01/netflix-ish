import { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Nav from "./AuthNav";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
	const [email, setEmail] = useState("");

	return (
		<AuthContainer>
			<BackgroundGradient>
				<Nav />
				<Routes>
					<Route
						path="/"
						element={
							<Content>
								<h1>Unlimited films, TV programmes and more.</h1>
								<h2>Watch anywhere. Cancel at any time.</h2>
								<p>
									Ready to watch? Enter your email to create or restart your
									membership
								</p>

								<Form>
									<input
										type="text"
										placeholder="Email address"
										name="email"
										autoComplete="off"
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>
									<Link to="/signup">
										<button type="submit">Get started</button>
									</Link>
								</Form>
							</Content>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BackgroundGradient>
		</AuthContainer>
	);
}

const AuthContainer = styled.main`
	height: 100vh;
	background-image: url("/images/bg_auth.jpg");
	font-family: "Mulish", "Lato";
`;

const Content = styled.div`
	text-align: center;
	padding: 1rem;

	h2 {
		font-weight: 400;
		font-size: 1.25rem;
		margin: 1rem 0 1.5rem 0;
	}

	p {
		font-size: 1rem;
	}
`;

const BackgroundGradient = styled.div`
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.4);
	background-image: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0.8) 0,
		rgba(0, 0, 0, 0) 40%,
		rgba(0, 0, 0, 0.8) 100%
	);
`;

const Form = styled.form`
	margin: 0.7rem 0;
	display: flex;
	align-items: center;
	justify-content: center;

	input {
		padding: 1rem;
		flex: 0.85;
		border: none;
	}
	button {
		padding: 1rem;
		border: none;
		cursor: pointer;
		background-color: rgb(227, 9, 20);
		color: #fff;
		font-weight: 600;
		text-transform: uppercase;
		font-size: 0.825rem;
		transition: background-color 300ms ease;
	}
	button:hover {
		background-color: rgba(227, 9, 20, 0.8);
	}

	@media (max-width: 550px) {
		flex-direction: column;
		button {
			margin: 0.5rem 0;
			padding: 0.7rem;
		}
		input {
			width: 100%;
		}
	}
`;
