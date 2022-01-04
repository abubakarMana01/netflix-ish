import { useEffect, useState, useContext } from "react";
import axios from "../config/axios";
import requests from "../config/Requests";
import styled from "styled-components";
import { PlayArrowRounded, StarRounded } from "@mui/icons-material";
import TrailerModal from "./TrailerModal";
import { Rating } from "@mui/material";
import { AppContext } from "../contexts/AppProvider";
import Loading from "./Loading";

type movieDataProps = {
	name?: string;
	original_name?: string;
	title?: string;
	backdrop_path?: string;
	overview?: string;
	first_air_date?: string;
	genre_ids?: [];
	vote_average?: number;
	vote_count?: number;
};

export default function Banner() {
	const { modalVisible, setModalVisible } = useContext(AppContext);

	const [movieData, setMovieData] = useState<movieDataProps | any>({});
	const [movieGenres, setMovieGenres] = useState<{}[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function fetchData() {
		try {
			setIsLoading(true);
			const res = await axios.get(requests.fetchNetflixOriginals);
			const data =
				res.data.results[
					Math.floor(Math.random() * res.data.results.length - 1)
				];
			setMovieData(data);
			console.log(data);

			const genresRes = await axios.get(requests.findGenres);
			data.genre_ids.forEach((id: number) => {
				genresRes.data.genres.forEach(
					(genre: { id: number; name: string }, index: number) => {
						if (genre.id === id && !movieGenres.includes(genre.name)) {
							setMovieGenres((genres: any) => [...genres, genre.name]);
						}
					}
				);
			});

			setIsLoading(false);
			return data;
		} catch (err: any) {
			// setIsLoading(false);
			console.log(err.message);
		}
	}

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const truncateText = (string: any, n: number) => {
		return string?.length > n ? string.substring(0, n - 1) + "..." : string;
	};

	return isLoading ? (
		<LoadingContainer>
			<Loading />
		</LoadingContainer>
	) : (
		<Container
			style={{
				backgroundImage:
					"url(https://image.tmdb.org/t/p/original/" + movieData.backdrop_path,
			}}
		>
			{modalVisible && <TrailerModal />}
			<BgDark>
				<Content>
					<span>Today's featured film</span>
					<h1>
						{movieData.title || movieData.name || movieData.original_name}{" "}
						{movieData.first_air_date && (
							<span>({movieData.first_air_date?.split("-")[0]})</span>
						)}
					</h1>

					<Genres>
						<div>
							<span>R</span>
						</div>
						{movieGenres.length !== 0 && <p>{movieGenres.join(", ")}</p>}
					</Genres>

					<p>{truncateText(movieData.overview, 120)}</p>

					<RatingContainer>
						<Rating
							readOnly
							defaultValue={0}
							name="movie-rating"
							value={movieData.vote_average / 2 || 0}
							precision={0.25}
							icon={<StarRounded fontSize="large" />}
						/>
						<p>
							{movieData.vote_average / 2 || 0}
							{" ("}
							<small>{movieData.vote_count}</small>
							{")"}
						</p>
					</RatingContainer>

					<ButtonsContainer>
						<button onClick={() => setModalVisible(true)}>
							<PlayArrowRounded style={{ marginRight: "10px" }} /> Play trailer
						</button>
					</ButtonsContainer>
				</Content>
			</BgDark>
			<BottomFade />
		</Container>
	);
}

const LoadingContainer = styled.div`
	height: 484px;

	@media (min-height: 960px) {
		height: 55vh;
	}
`;

const Container = styled.section`
	height: 484px;
	position: relative;
	background-size: cover;
	background-color: #242424;
	margin-bottom: 3rem;
	width: 100%;

	@media (min-height: 960px) {
		height: 55vh;
	}
`;

const Content = styled.div`
	width: 95%;
	margin: 0 auto;
	color: #fff;
	position: relative;
	top: 3rem;
	z-index: 1;

	& > span {
		font-size: 1.1rem;
		text-transform: uppercase;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #eee;
	}

	h1 {
		font-family: "Mulish";
		font-size: 2.5rem;
		letter-spacing: 1px;
		margin-bottom: 0.5rem;

		span {
			opacity: 0.7;
			font-weight: 400;
			font-size: 1.1rem;
		}
	}

	& > p {
		font-size: 1.1rem;
		line-height: 1.3rem;
		max-width: 500px;
		margin: 1rem 0;
	}

	.MuiRating-root {
		color: #ffb400;
	}

	.MuiRating-root .MuiRating-iconActive {
		color: #5ac55a;
	}

	@media (max-width: 425px) {
		width: 100%;
		margin: 0 20px;
		top: 1.5rem;

		h1 {
			font-size: clamp(1.8rem, 2rem, 2.5rem);
		}
	}
`;

const Genres = styled.div`
	display: flex;
	align-items: center;

	div {
		width: 25px;
		height: 25px;
		display: grid;
		place-items: center;
		background-color: #5df8eb8b;
		border-radius: 5px;
		margin-right: 0.7rem;
		border: 1.5px solid #eee;

		span {
			font-weight: 600;
		}
	}

	p {
		font-size: 1rem;
		font-weight: 600;
		text-transform: uppercase;
		color: #eee;
	}
`;

const BgDark = styled.div`
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ButtonsContainer = styled.div`
	margin-top: 1.5rem;

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 700;
		cursor: pointer;
		padding: 0.5rem 1rem;
		background-color: #fff;
		text-transform: uppercase;
		font-family: "Work Sans";
		font-size: 0.825rem;
		border: none;
		border-radius: 20px;
		color: #000;
		transition: opacity 300ms ease;

		&:hover {
			opacity: 0.8;
		}
	}
`;

const BottomFade = styled.div`
	position: absolute;
	bottom: 0;
	inset: 0;
	top: auto;
	height: 7.4rem;
	z-index: 0;

	background-image: linear-gradient(
		180deg,
		transparent,
		rgba(27, 27, 27, 0.61),
		#000
	);
`;

const RatingContainer = styled.div`
	height: 33px;
	display: flex;
	align-items: center;

	p {
		font-size: 0.1;
		font-weight: 600;
	}

	span {
		font-size: 0.875rem;
	}
`;
