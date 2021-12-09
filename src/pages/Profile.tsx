import { useContext, useState } from "react";
import { Logout } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/AuthProvider";

export default function Profile() {
	const [isLoading, setIsLoading] = useState(false);

	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleSignout = async () => {
		try {
			setIsLoading(true);
			await auth.signOut();
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
			<ProfileContainer>
				<Content>
					<h1>Edit Profile</h1>

					<ProfileInfo>
						<Avatar />

						<ProfileRight>
							<ProfileEmailContainer>
								<p>{user.email}</p>
							</ProfileEmailContainer>

							<ProfilePlans>
								<h2>Plans (Current plan:premium)</h2>
							</ProfilePlans>
							<SignoutButton onClick={handleSignout}>
								Signout <Logout />
							</SignoutButton>
						</ProfileRight>
					</ProfileInfo>
				</Content>
			</ProfileContainer>
		</>
	);
}

const ProfileContainer = styled.main`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	width: 95%;
	max-width: 500px;

	h1 {
		font-size: 2rem;
		margin: 1rem 0;
	}
`;

const ProfileInfo = styled.div`
	display: flex;
`;
const ProfileRight = styled.div`
	flex: 1;
	min-height: 200px;
	margin-left: 1rem;
`;

const ProfileEmailContainer = styled.div`
	background-color: #3d3d3d;
	padding: 0.6rem;
`;

const ProfilePlans = styled.section`
	h2 {
		font-size: 1.2rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid #333333;
	}
`;

const SignoutButton = styled.button`
	margin-top: 1rem;
	padding: 0.55rem;
	width: 100%;
	background-color: rgb(227, 9, 20);
	border: none;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 300ms ease;

	&:hover {
		background-color: rgba(227, 9, 20, 0.7);
	}

	.MuiSvgIcon-root {
		font-size: 1.5rem;
		margin: 0 0.5rem;
	}
`;

const LoadingContainer = styled.div`
	position: absolute;
	inset: 0;
`;
