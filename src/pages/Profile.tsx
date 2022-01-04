import { useContext, useState } from "react";
import { Edit, Logout } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/AuthProvider";
import useStorage from "../hooks/useStorage";

export default function Profile() {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const [isLoading, setIsLoading] = useState(false);
	const [file, setFile] = useState(null);

	// const { percentage, error, url } = useStorage(file);

	const handleSignout = async () => {
		try {
			setIsLoading(true);
			await auth.signOut();
			navigate("/");
		} catch (err: any) {
			console.log(err.message);
			setIsLoading(false);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<any>) => {
		const selectedFile = e.target?.files[0];
		const types = ["image/png", "image/jpeg"];
		if (selectedFile && types.includes(selectedFile.type)) {
			setFile(selectedFile);
			console.log(selectedFile.type);
		} else {
			alert("Please select a valid image format");
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
						<ProfileLeft>
							<Avatar />
							<EditProfilePicContainer>
								<label>
									<span>
										<Edit />
									</span>
									<input type="file" onChange={handleFileChange} />
								</label>
							</EditProfilePicContainer>
						</ProfileLeft>

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

const ProfileLeft = styled.div`
	position: relative;
	width: 40px;
	height: 40px;
`;

const EditProfilePicContainer = styled.div`
	position: absolute;
	right: -5px;
	bottom: -5px;
	background-color: rgb(227, 9, 20);
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
	transition: background-color 300ms ease;
	width: 28px;
	height: 28px;

	&:hover {
		background-color: rgba(227, 9, 20, 0.8);
	}

	svg {
		width: 15px;
		height: 15px;
	}

	label input {
		display: none;
		opacity: 0;
	}

	label {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		width: 100%;
		height: 100%;
	}

	span {
		display: flex;
		justify-content: center;
		align-items: center;
	}
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
