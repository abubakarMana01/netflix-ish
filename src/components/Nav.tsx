/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import styled from "styled-components";
import Search from "@mui/icons-material/SearchSharp";
import Notification from "@mui/icons-material/Notifications";
import CardGiftcard from "@mui/icons-material/CardGiftcardTwoTone";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

export default function Nav() {
	const [headerDark, setHeaderDark] = useState(false);

	window.addEventListener("scroll", () => {
		if (window.scrollY > 0) {
			setHeaderDark(true);
		} else {
			setHeaderDark(false);
		}
	});

	return (
		<NavContainer
			style={{ backgroundColor: headerDark ? "black" : "transparent" }}
		>
			<Logo>
				<img src="/images/logo1.png" alt="netflix logo" />
			</Logo>
			<NavLinks>
				<NavLink>
					<a href="#">Home</a>
				</NavLink>
				<NavLink>
					<a href="#">Series</a>
				</NavLink>
				<NavLink>
					<a href="#">Movies</a>
				</NavLink>
				<NavLink>
					<a href="#">Popular</a>
				</NavLink>
				<NavLink>
					<a href="#">My List</a>
				</NavLink>
			</NavLinks>

			<NavRight>
				<Search />
				<Notification />
				<CardGiftcard />
				<Link to="/profile">
					<Avatar />
				</Link>
			</NavRight>
		</NavContainer>
	);
}

const NavContainer = styled.nav`
	background-color: #fff;
	position: fixed;
	height: 4rem;
	inset: 0;
	display: flex;
	align-items: center;
	padding: 1.5rem;
	z-index: 5;

	transition: background-color 300ms ease-out;

	@media (max-width: 425px) {
		padding: 1.5rem 20px;
	}
`;

const Logo = styled.div`
	img {
		object-fit: contain;
		height: 80px;

		@media (max-width: 425px) {
			height: 60px;
			object-fit: cover;
			margin-left: -5px;
		}
	}
`;

const NavLinks = styled.ul`
	display: flex;
	align-items: center;
	list-style: none;
	margin-left: 2rem;

	@media (max-width: 900px) {
		display: none;
	}
`;

const NavLink = styled.li`
	a {
		padding: 0.5rem 1rem;
		text-decoration: none;
		color: #fff;
		font-size: 1rem;
	}
	a:focus {
		font-weight: 700;
	}
`;

const NavRight = styled.div`
	color: #fff;
	width: 170px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex: 1;

	.MuiSvgIcon-root {
		cursor: pointer;
		width: 25px;
		height: 25px;
		margin: 0 0.75rem;
	}

	.MuiAvatar-circular {
		width: 30px;
		height: 30px;
		margin-left: 0.75rem;

		.MuiSvgIcon-root {
			width: 23px;
			height: 23px;
		}
	}

	@media (max-width: 425px) {
		display: none;
	}
`;
