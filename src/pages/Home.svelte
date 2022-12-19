<script>
    // import life-cycle method `onMount` to fire an event when the `Home` component is mounted
    import {onMount} from 'svelte';
    import {fetchMovies} from "../api";
    // Components
    import Hero from '../components/Hero.svelte';
    import Search from '../components/Search.svelte';
    import Grid from '../components/Grid.svelte';
    import Thumb from "../components/Thumb.svelte";
    import LoadMoreButton from "../components/LoadMoreButton.svelte";
    import Spinner from "../components/Spinner.svelte";
    import {IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE} from "../config";

    // set up a local states. In Svelte creating a state is as easy as creating a variable.
    let movies = {movies: []};
    let isLoading;
    let searchTerm = "";
    let error;

    const handleFetchMovies = async (loadMore, searchTerm) => {
        try {
            isLoading = true;  // change the state of `isLoading` by re-assigning
            error = false;
            // `fetchMovies` takes the state `movies` and returns an updated (copied) version
            movies = await fetchMovies(movies, loadMore, searchTerm);
            console.log(movies);
        } catch (err) {
            error = true;
        }
        isLoading = false;
    }

    // Home.svelte will handle the event because its job is to fetch the data
    const handleSearch = event => {
        searchTerm = event.detail.searchText;
        movies.movies = [];  // clear movies when we do a search
        handleFetchMovies(false, searchTerm);
    }

    onMount(async () => {
        handleFetchMovies(false, searchTerm)
    })

</script>

{#if error}
    <p>Somthing whent wrong ...</p>
{:else}
    <!-- If we haven't got the `Hero` image yet and if search is selected don't show `Hero` image-->
    {#if movies.heroImage && !searchTerm}
        <!-- The property names in the props come from the API-->
        <Hero
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.heroImage.backdrop_path}`}
                title={movies.heroImage.original_title}
                text={movies.heroImage.overview}
        />
    {/if}
{/if}

<Search on:search={handleSearch}/>
<Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
    {#each movies.movies as movie}
        <Thumb
                clickable
                image={movie.poster_path && IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path}
                movieId={movie.id}
        />
    {/each}
</Grid>
<LoadMoreButton/>
<Spinner/>

<style>

</style>
