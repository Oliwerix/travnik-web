<script lang="ts">
	import type { PageData } from "./$types";
    import { page } from '$app/stores'
    import { navigating } from '$app/stores'
    import Spinner from "$lib/Spinner.svelte";
    import Torrent from "./Torrent.svelte";
    import Pager from './Pager.svelte'


    export let data: PageData;

    $: ({torrents} = data)
    $: ({count} = data)
    $: ({status} = data)
</script>
<h1>Search</h1>
<form method="get">
    <div class="search">
        <input type="search" name="q" id="q" value={$page.url.searchParams.get("q")}>
        <button>Search</button>
    </div>
    <select name="s" id="s" value={$page.url.searchParams.get("s") || "n"}>
        <option value="n">Normal</option>
        <option value="reg">Regex</option>
    </select>
    <select name="srt" id="srt" value={$page.url.searchParams.get("srt") || "rel"}>
        <option value="rel">Normal</option>
        <option value="name">By name</option>
        <option value="date">Latest</option>
    </select>
    <!-- <select name="s" id="s">
        <option value="rel">Relevance</option>
        <option value="filA">Files Ascending</option>
        <option value="filD">Files Descending</option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
    </select> -->
</form>
<hr>
{#if $navigating === null}
    {#if status}
    <h4>Found {count} results</h4>
        <Pager {count} />
        {#each torrents as torrent}
            <Torrent {torrent}></Torrent>
        {/each}
        <Pager {count} />
        <hr><br>
    {:else if $page.url.searchParams.get('q') !== null && $page.url.searchParams.get('q') !== ""}
    <h4>No results found</h4>
    {:else}
    <p>Use the box above to search for torrents</p>
    <h2>{count} torrents in database</h2>
    <h2>25 Latest torrents:</h2>
    {#each torrents as torrent}
    <Torrent {torrent}></Torrent>
    {/each}
    {/if}
{:else}
    <Spinner>Loading</Spinner>
{/if}


<style>
    form {
        margin: 1em;
    }
    input {
        border: 2px solid var(--accent-color);
        border-right: none;
        border-radius: 5px 0 0 5px;
        color: var(--accent-color);
    }
    input:focus {
        color: var(--negative-font-color);
    }
    button {
        border: 2px solid var(--accent-color);
        border-radius: 0 5px 5px 0;
        color: var(--accent-color);

    }
    input, button {
        font-size: 1em;
        padding: 0.25em;
        margin: 0;
        background-color: var(--background-accent-color);
    }
    h4 {
        margin: 0.2em;
    }
    .search {
        display: flex;
        position: relative;
        margin-bottom: 1em;
    }
    select {
        background-color: var(--background-accent-color);
        color: var(--font-color);
    }

</style>