<script>
    // import life-cycle method `onMount` to fire an event when the `Home` component is mounted
    import {onMount} from 'svelte';
    import {fetchMovies} from "../api";
    // Components
    import Header from '../components/Header.svelte';
    import Hero from '../components/Hero.svelte';
    import Search from '../components/Search.svelte';
    import Grid from '../components/Grid.svelte';
    import Thumb from "../components/Thumb.svelte";
    import LoadMoreButton from "../components/LoadMoreButton.svelte";
    import Spinner from "../components/Spinner.svelte";

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

    onMount(async () => {
        handleFetchMovies(false, searchTerm)
    })

</script>

<Header/>
<Hero/>
<Search/>
<Grid/>
<Thumb/>
<LoadMoreButton/>
<Spinner/>

<style>

</style>
