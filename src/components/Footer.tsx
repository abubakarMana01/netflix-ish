import React from "react";
import styled from "styled-components";

export default function Footer() {
	return (
		<FooterContainer>
			<img src="/images/tmdb.svg" alt="tmdb-logo" />
			<a href="https://github.com/abubakarMana01">@abubakarMana01 | GitHub</a>
		</FooterContainer>
	);
}

const FooterContainer = styled.footer`
	margin-bottom: 1rem;
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		height: 50px;
		object-fit: contain;
	}

	a {
		margin: 1rem 0;
		text-decoration: none;
		color: #fff;

		&:hover {
			opacity: 0.85;
		}
	}
`;
