import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { auth } from "../../config/firebase";

export default function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const emailRef = useRef<any>(null);
	const passwordRef = useRef<any>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			await auth.signInWithEmailAndPassword(
				emailRef.current.value,
				passwordRef.current.value
			);
			navigate("/");
		} catch (err: any) {
			setIsLoading(false);
			console.log(err.message);
		}
	};

	return (
		<>
			{isLoading && (
				<LoadingContainer>
					<Loading />
				</LoadingContainer>
			)}
			<Form onSubmit={handleSubmit}>
				<h1>Sign in</h1>
				<input type="email" placeholder="Email" ref={emailRef} />
				<input type="password" placeholder="Password" ref={passwordRef} />
				<button type="submit">Sign in</button>
				<h4>
					New to Netflix?{" "}
					<Link to="/signup" style={{ textDecoration: "none" }}>
						<span>Sign Up now</span>
					</Link>
				</h4>
			</Form>
		</>
	);
}

const Form = styled.form`
	background-color: #000;
	padding: 3rem 2.5rem;
	width: 95%;
	max-width: 350px;

	h1 {
		margin-bottom: 2rem;
	}

	input {
		display: block;
		width: 100%;
		padding: 0.7rem;
		border-radius: 3px;
		border: none;
		margin: 1rem 0;
	}

	button {
		font-family: "Mulish";
		font-weight: 600;
		margin: 1rem 0;
		padding: 0.7rem;
		width: 100%;
		color: #fff;
		background-color: rgb(227, 9, 20);
		border: none;
		font-size: 1rem;
		border-radius: 3px;
		cursor: pointer;
		transition: background-color 300ms ease;

		&:hover {
			background-color: rgba(227, 9, 20, 0.7);
		}
	}

	h4 {
		font-size: 0.825rem;
		color: #ffffffa9;
		letter-spacing: 0.5px;

		span {
			color: #fffffff8;
		}
	}
`;

const LoadingContainer = styled.div`
	position: absolute;
	inset: 0;
`;
