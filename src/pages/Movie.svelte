<script>
    import {onMount} from "svelte";
    import {fade} from "svelte/transition";

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

</script>

<div transition:fade={{ duration: 300}}>
    <Navigation/>
    <MovieInfo/>
    <MovieInfoBar/>
    <Grid header="Actors"/>
    <Actor/>
    <Spinner/>
</div>

<style>

</style>
