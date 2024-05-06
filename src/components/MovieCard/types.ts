export interface IMovieCard {
    /**
     * The title of the movie
     */
    title: string;
    /**
     * The id of the movie genre to get genre
     */
    genreId: number;
    movieId: number;
    voteAverage: number;
    posterPath: string;
}