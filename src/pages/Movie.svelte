<script>
    import {onMount} from "svelte";
    import {fade} from "svelte/transition";
    import {fetchMovie} from "../api";

    // Component
    import Navigation from "../components/Navigation.svelte";
    import Spinner from "../components/Spinner.svelte";
    import MovieInfo from "../components/MovieInfo.svelte";
    import MovieInfoBar from "../components/MovieInfoBar.svelte";
    import Actor from "../components/Actor.svelte";
    import Grid from "../components/Grid.svelte";

    export let params; // will hold the movie id

    let isLoading;
    let error;
    let movie;

    const handleFetchMovie = async () => {
        try {
            isLoading = true;
            error = false;
            movie = await fetchMovie(params.id)
        } catch (err) {
            console.log("An error occurred, " + err);
            error = true;
        }
        isLoading = false;
    }

    onMount(async () => {
        handleFetchMovie();
    })

</script>
{#if error}
    <p>Something went wrong ...</p>
{:else if movie}
    <div transition:fade={{ duration: 300}}>
        <Navigation movie={movie.original_title}/>
        <MovieInfo {movie}/>
        <MovieInfoBar
                time={movie.runtime}
                budget={movie.budget}
                revenue={movie.revenue}
        />
        <Grid header="Actors">
        {#each movie.actors as actor}
            <Actor {actor}/>
        {/each}
        </Grid>
    </div>
{/if}

{#if isLoading}
    <Spinner/>
{/if}

<style>

</style>
