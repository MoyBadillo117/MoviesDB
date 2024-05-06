import { Meta, StoryFn } from '@storybook/react';

import { IMovieCard } from "./types";
import MovieCard from "./MovieCard";

const meta = {
    title: "Components/MovieCard",
    components: MovieCard,
    parameters : {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        title: { control: 'text' },
        genreId: { control: 'number' },
        movieId: { control: 'number' },
        voteAverage: { control: 'number' },
        posterPath: { control: 'text' },
    },
    tags: ["autodocs"],
} as Meta;

export default meta;

const Template: StoryFn<IMovieCard> = (args) => <MovieCard {...args} />;

/**
 * A default moviecard with all the props
*/

export const Default = Template.bind({});
Default.args = {
    title: "John Wick: Chapter 4",
    voteAverage: 8.1,
    movieId: 603692,
    genreId: 28,
    posterPath: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
}