import { IMovieCard } from "./types";
import { Pill } from "../Pill";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import genresData from '../../constants/genres.json';
import './MovieCard.css'
import { useNavigate } from "react-router-dom";
import { number } from "prop-types";
import { ROUTES } from "../../routes/constants";

const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterPath
}) => {
    const navigate = useNavigate();
    const poster = IMAGE_SOURCE + posterPath;

    const getGenreName = (id: number): string => {
        const genre = genresData.genres.find((genre) => genre.id === id);
        return genre?.name || "Unknown";
    };

    const navigateMovies = ( id: number, movieName: string ) => {
        navigate(`${ROUTES.SHOW}${id}`, { state: { name: movieName }});
    }

    const getPillColor = (genreName: string): string => {
        switch (genreName) {
            case "Action":
                return "red";
            case "Drama":
                return "blue";
            case "Animation":
                return "green";
            case "Science Fiction":
                return "purple";
            case "Comedy":
                return "orange";
            case "Horror":
                return "black";
            case "Thriller":
                return "DimGray";
            case "Romance":
                return "DeepPink";
            case "Music":
                return "MediumSlateBlue";
            case "Adventure":
                return "YellowGreen";
            case "Fantasy":
                return "MidnightBlue";
            case "Western":
                return "SaddleBrown";
            default:
                return "gray"; // Color por defecto para otros géneros
        }
    };

    const genreName = getGenreName(genreId);
    const pillColor = getPillColor(genreName);

    return (
        <div className="show-box">
            <div className="relative h-0" style={{ paddingBottom: "150%" }}>
                <img
                    src={poster}
                    alt="poster"
                    className="show-box img"
                />
            </div>
            <div className="info">
                <div className="info-content">
                    <div className="mb-2 flex items-center justify-center">
                        <Pill title={genreName} color={pillColor} />
                    </div>
                    <p className="text-xl font-bold mt-3">{title}</p>
                    <p className="text-lg uppercase mt-1">* {voteAverage} / 10</p>
                    <button
                        className="info-content button"
                        onClick={() => navigateMovies(movieId, title)}
                    >
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    );
};


export default MovieCard;
