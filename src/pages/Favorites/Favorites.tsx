import React, { useEffect, useState } from "react";
import { IDetailsResponse, getDetailsMovies } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Favorites = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [shows, setShows] = useState<IDetailsResponse[]>([]);
    const favorites: string = localStorage.getItem("favorites") || "";

    const runGetFavorites = async () => {
        if (favorites.length) {
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favoriteId: number) => {
                    return getDetailsMovies(favoriteId)
                        .then((res) => {
                            if (res && res.data) {
                                return res.data;
                            }
                        })
                        .catch((err) => {
                            console.log(err, "err");
                        });
                })
            );
            setShows(newShows);
            setLoading(false);
        } else {
            setLoading(false); 
        }
    };

    useEffect(() => {
        setLoading(true);
        runGetFavorites();
    }, []);

    return (
        <div className="bg-gray-300 min-h-screen p-8">
            {!loading ? (
                <div >
                    <h2 className="text-3xl font-bold text-black mb-4">
                        My Favorites
                    </h2>
                    {favorites && favorites.length > 0 ? (
                        shows && shows.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {shows.map((movie: IDetailsResponse) => (
                                    <MovieCard
                                        key={movie.id}
                                        movieId={movie.id}
                                        posterPath={movie.poster_path}
                                        title={movie.title}
                                        voteAverage={movie.vote_average}
                                        genreId={movie.genres[0].id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-wrap text-xl text-center my-8">
                                <p className="animate-pulse text-black">
                                    ¡Oops! Parece que todavía no agregaste ninguna película a tus favoritos.
                                </p>
                            </div>
                        )
                    ) : (
                        <div className="text-xl text-center my-8">
                            <p className="text-black">
                                ¡Oops! No hay películas agregadas a favoritos.
                            </p>
    </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2>Loading...</h2>
                </div>
            )}
        </div>
    );
};

export default Favorites;
