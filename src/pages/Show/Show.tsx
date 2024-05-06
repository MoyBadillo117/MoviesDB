import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IDetailsResponse, IMovieResponse, getDetailsMovies, getRecommendations } from "../../services";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { ProgressBar } from "../../components/ProgressBar";
import {MovieCard} from "../../components/MovieCard";

const Show = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<IDetailsResponse>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>("");
    const [recommendedMovies, setRecommendedMovies] = useState<IMovieResponse[]>([]);

    const addFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        const newFavorites = [...favs, id];
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };

    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        const newFavorites = favs.filter((e: string) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };

    const goBack = () => {
        navigate(-1);
    };

    const getDetails = async () => {
        const movieId = id ? parseInt(id) : undefined;
        if (movieId) {
            try {
                const res = await getDetailsMovies(movieId);
                if (res && res.data) {
                    setMovie(res.data);
                }
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
    };

    const getRecommendedMovies = async () => {
        const movieId = id ? parseInt(id) : undefined;
        if (movieId) {
            try {
                const res = await getRecommendations(movieId);
                if (res && res.data) {
                    setRecommendedMovies(res.data.results);
                }
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        const favs = localStorage.getItem("favorites") || "";
        setFavorites(favs);
        setIsFavorite(favs.includes(String(id)));
        setLoading(true);
        getDetails();
        getRecommendedMovies();
    }, [id]);

    return (
        <div className="mx-10 my-8 p-6 bg-gray-200 rounded-lg shadow-xl">
            {!loading ? (
                <>
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {movie?.title} ({movie?.release_date ? new Date(movie.release_date).getFullYear() : "N/A"})
                        </h1>
                        <button
                            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
                            onClick={goBack}
                        >
                            Atrás
                        </button>
                    </div>
                    <div className="flex">
                        <img
                            src={IMAGE_SOURCE + movie?.poster_path}
                            alt="poster"
                            className="rounded-lg mr-6"
                            style={{ width: "200px" }}
                        />
                        <div className="flex flex-col justify-between">
                            <p className="text-gray-700 text-lg mb-4">{movie?.overview}</p>
                            <div className="mb-4">
                                <p className="text-gray-600 font-semibold mb-2">Rating:</p>
                                {movie?.vote_average !== undefined && (
                                    <>
                                        <ProgressBar voteAverage={movie?.vote_average || 0} />
                                        <p className="mt-2 text-gray-800 font-semibold">
                                            {movie?.vote_average.toFixed(1)} / 10
                                        </p>
                                    </>
                                )}
                            </div>
                            <div>
                                {isFavorite ? (
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md mr-4 hover:bg-red-600 transition duration-300"
                                        onClick={removeFavorite}
                                    >
                                        Quitar de Favoritos
                                    </button>
                                ) : (
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600 transition duration-300"
                                        onClick={addFavorite}
                                    >
                                        Agregar a Favoritos
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Recomendaciones</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {recommendedMovies.map((recommendedMovie: IMovieResponse) => (
                                <MovieCard
                                    key={recommendedMovie.id}
                                    movieId={recommendedMovie.id}
                                    posterPath={recommendedMovie.poster_path}
                                    title={recommendedMovie.title}
                                    voteAverage={recommendedMovie.vote_average}
                                    genreId={recommendedMovie.genre_ids[0]}
                                />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-xl text-gray-800">Cargando...</p>
            )}
        </div>
    );
};

export default Show;

