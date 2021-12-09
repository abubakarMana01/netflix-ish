import styled from "styled-components";
import { Link } from "react-router-dom";

export default function AuthNav() {
	return (
		<NavContainer>
			<Link to="/">
				<img src="/images/logo1.png" alt="Netflix logo" />
			</Link>
			<Link to="/login">
				<SigninButton>Sign In</SigninButton>
			</Link>
		</NavContainer>
	);
}

const NavContainer = styled.nav`
	position: fixed;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 90%;
	margin: 0 auto;

	img {
		object-fit: contain;
		height: 90px;

		@media (max-width: 375px) {
			height: 60px;
		}
	}
`;

const SigninButton = styled.button`
	background-color: rgb(227, 9, 20);
	border: none;
	width: 84px;
	height: 34px;
	color: white;
	cursor: pointer;
	border-radius: 2px;
	transition: background-color 300ms ease;
	font-size: 1rem;

	&:hover {
		background-color: rgba(227, 9, 20, 0.8);
	}
`;
