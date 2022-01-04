import axios from "../../config/axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Rating } from "@mui/material";
import { StarRounded } from "@mui/icons-material";

type RowTypes = {
	title: string;
	fetchUrl: string;
	isLargeRow?: boolean;
};

type movieDataTypes = {
	title: string;
	poster_path: string;
	backdrop_path: string;
	id: string;
	original_title: string;
	original_name: string;
	name: string;
	overview?: string;
	vote_average: number;
}[];

function RowItem({
	isLargeRow,
	movie,
}: {
	isLargeRow: boolean;
	movie: movieDataTypes[0];
}) {
	const base_url = "https://image.tmdb.org/t/p/original/";

	const truncateText = (string: any, n: number) => {
		return string?.length > n ? string.substring(0, n - 1) + "..." : string;
	};

	return (isLargeRow && movie.poster_path) ||
		(!isLargeRow && movie.backdrop_path) ? (
		<Card>
			<BgHover isLargeRow={isLargeRow} id="bg-hover" />

			<PosterContainer isLargeRow={isLargeRow}>
				<PosterDetails id="poster-details">
					<h3>
						{movie.original_title ||
							movie.title ||
							movie.name ||
							movie.original_name}
					</h3>
					<p>{truncateText(movie.overview, isLargeRow ? 35 : 60)}</p>
					<Rating
						readOnly
						defaultValue={0}
						name="movie-rating"
						value={movie.vote_average / 2 || 0}
						precision={0.5}
						icon={<StarRounded fontSize="medium" />}
					/>
				</PosterDetails>

				<img
					src={`${base_url}${
						isLargeRow ? movie.poster_path : movie.backdrop_path
					}`}
					alt={movie.title + " logo"}
				/>

				<BottomFade id="bottom-fade" />
			</PosterContainer>
		</Card>
	) : null;
}

export default function Row({ title, fetchUrl, isLargeRow = false }: RowTypes) {
	const [moviesData, setMoviesData] = useState<movieDataTypes>([]);

	useEffect(() => {
		(async function () {
			const res = await axios.get(fetchUrl);
			setMoviesData(res.data.results);
			console.log(res.data.results);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<RowContainer isLargeRow={isLargeRow}>
			<h2>{title}</h2>

			<ContentContainer isLargeRow={isLargeRow}>
				{moviesData.map((movie) => (
					<RowItem key={movie.id} isLargeRow={isLargeRow} movie={movie} />
				))}
			</ContentContainer>
		</RowContainer>
	);
}

const RowContainer = styled.section<{ isLargeRow: boolean }>`
	width: 95%;
	color: #fff;
	margin: 1rem auto;
	margin-bottom: 4rem;

	h2 {
		font-family: "Mulish", "Lato", "Roboto", Ubuntu, "Segoe UI", Helvetica,
			sans-serif;
		font-size: clamp(1.1rem, 5vw, 1.5rem);
		margin-bottom: 2rem;
	}

	@media (max-width: 425px) {
		width: 100%;
		margin: 1rem 20px;
	}
`;

const ContentContainer = styled.div<{ isLargeRow: boolean }>`
	height: ${({ isLargeRow }) => (isLargeRow ? "300px" : "200px")};
	display: flex;
	align-items: center;
	overflow-x: scroll;
	overflow-y: hidden;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const Card = styled.article`
	cursor: pointer;
	position: relative;

	&:hover #bg-hover {
		background-color: rgba(0, 0, 0, 0.5);
	}
	&:hover #bg-hover ~ div #poster-details {
		transform: translateY(0);
	}
	&:hover #bg-hover ~ div img {
		transform: scale(1);
	}
`;

const PosterContainer = styled.div<{ isLargeRow: boolean }>`
	margin-right: 15px;
	height: ${({ isLargeRow }) => (isLargeRow ? "300px" : "200px")};
	width: ${({ isLargeRow }) => (isLargeRow ? "200px" : "300px")};
	border-radius: 10px;
	overflow: hidden;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	img {
		height: 100%;
		position: absolute;
		transition: transform 200ms ease-in-out;
		transform: scale(1.1);
	}
`;

const BottomFade = styled.div`
	position: absolute;
	bottom: 0;
	height: 30%;
	width: 100%;
	z-index: 2;
	background-image: linear-gradient(
		to bottom,
		transparent,
		rgba(27, 27, 27, 0.61) 70%,
		rgba(48, 48, 48, 0.5)
	);
`;

const BgHover = styled.div<{ isLargeRow: boolean }>`
	position: absolute;
	bottom: 0;
	height: 100%;
	width: ${({ isLargeRow }) => (isLargeRow ? "200px" : "300px")};
	background-color: rgba(0, 0, 0, 0);
	z-index: 2;
`;

const PosterDetails = styled.div`
	z-index: 3;
	padding: 10px;
	transform: translateY(69%);
	transition: transform 200ms ease-in-out;

	h3 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 1.25rem;
		font-family: "Mulish";
	}

	p {
		margin-top: 0.5rem;
	}

	.MuiRating-root {
		margin-top: 0.5rem;
		color: #ffb400;
	}

	.MuiRating-root .MuiRating-iconActive {
		color: #5ac55a;
	}
`;
