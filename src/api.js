import {POPULAR_BASE_URL, SEARCH_BASE_URL, API_URL, MOVIE_ENDPOINT, CREDITS_ENDPOINT} from "./config";

// async function because we are fetching data from the API
// `movies` will be the state
export const fetchMovies = async (movies, loadMore, searchTerm) => {
    // Homepage is initially going to show the most popular movies
    const endpoint = searchTerm
        ? `${SEARCH_BASE_URL}${searchTerm}&page=${
        loadMore ? movies.currentPage + 1 : 1  // `movies` is returned from the API and has `currentPage` attribute
    }`
        : `${POPULAR_BASE_URL}&page=${loadMore ? movies.currentPage + 1: 1}`;

    // inner `await` is to call the API, outer `await` when we convert the data to JSON because json() is also async
    const result = await (await fetch(endpoint)).json();
    // return a brand-new object to not mutate stuff
    return {
        // what is this? It is not mapped to a property name... is this 'spreading the object'?
        ...movies,
        // is `loadMore` then spread the old movies and append the new movies from `result`
        movies: loadMore ? [...movies.movies, ...result.results] : [...result.results],
        heroImage: movies.heroImage || result.results[0],
        currentPage: result.page,
        totalPages: result.total_pages
    };
};

export const fetchMovie = async movieId => {
    const endpoint = MOVIE_ENDPOINT(movieId);
    const creditsEndpoint = CREDITS_ENDPOINT(movieId);

    const result = await (await fetch(endpoint)).json();
    const creditsResult = await (await fetch(CREDITS_ENDPOINT)).json();

    const directors = creditsResult.crew.filter(
        member => member.job === "Director"
    );

    return {
        ...result,
        actors: creditsResult.cast,
        directors: directors
    }
}