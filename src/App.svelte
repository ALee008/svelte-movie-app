<script>
    import router from "page"  // third party library `page`
    // Components
    import Header from './components/Header.svelte';
    import Home from "./pages/Home.svelte";
    import Movie from "./pages/Movie.svelte";
    import NotFound from "./pages/NotFound.svelte";

    let page;
    let params;

    // set root to Home Component
    router("/", () => page = Home)
    // router with inline function which is called from the router with a `context`
    router("/movie/:id", (context, next) => {
        params = context.params;
        // console.log(context)
        next();
    }, () => page = Movie);
    // execute this route on any other route than those two above it by using the asterisk
    router("/*", () => page = NotFound)

    // start router
    router.start()

</script>

<Header/>
<!--How to change Components dynamically based on route-->
<!--<svelte:component this={page} {params} />-->
<!--To prevent warning in browser console:-->

{#if page === Home}
    <Home/>
{/if}

{#if page === Movie}
    <Movie {params} />
{/if}

{#if page === NotFound}
    <NotFound/>
{/if}


<style>
    :global(body) {
        font-family: 'Abel', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
