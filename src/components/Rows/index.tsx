import Row from "./Row";
import requests from "../../config/Requests";

export default function Rows() {
	return (
		<>
			{/* <Row
				title="NETFLIX ORIGINALS"
				isLargeRow={true}
				fetchUrl={requests.fetchTrending}
			/> */}
			<Row
				title="Latest and Trending movies"
				fetchUrl={requests.fetchTrending}
				isLargeRow
			/>
			<Row title="Top rated" fetchUrl={requests.fetchTopRated} />
			<Row title="Action movies" fetchUrl={requests.fetchActionMovies} />
			<Row title="Comedy movies" fetchUrl={requests.fetchComedyMovies} />
			<Row title="Horror movies" fetchUrl={requests.fetchHorrorMovies} />
			<Row title="Romance movies" fetchUrl={requests.fetchRomanceMovies} />
			<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
		</>
	);
}
