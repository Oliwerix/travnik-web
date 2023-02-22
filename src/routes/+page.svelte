<script lang="ts">
	import type { PageData } from "./$types";
    import { page } from '$app/stores'
    import Torrent from "./Torrent.svelte";
    import Pager from './Pager.svelte'
    export let data: PageData;

    $: ({torrents} = data)
    $: ({count} = data)
</script>

<h1>Search</h1>
<form method="get">
    <input type="search" name="q" id="q" value={$page.url.searchParams.get("q")}>
    <button>Search</button>
</form>
<hr>
{count}
{#if torrents.length>0}
<h4>Found {count} results</h4>
    <Pager {count} />
    {#each torrents as torrent}
        <Torrent {torrent}></Torrent>
    {/each}
    <Pager {count} />
    <hr><br>
{:else if $page.url.searchParams.get("q") != null}
<h4>No results found</h4>
{:else}
<p>Use the box above to search for torrents</p>

{/if}




<style>
    form {
        margin: 1em;
    }
    input, button {
        font-size: 1em;
        padding: 0.25em;
    }
    h4 {
        margin: 0.2em;
    }
</style>