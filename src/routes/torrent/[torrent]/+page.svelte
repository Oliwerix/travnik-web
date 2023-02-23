<script lang="ts">
    import { formatBytes } from '$lib/functions.ts'
	import { onMount } from 'svelte';
    import type {PageData} from './$types'
    import ListView from './ListView.svelte';
    // import TreeView from './TreeView.svelte';
    // import whois from 'whois-json'
    export let data: PageData;
    let whois_loopkup = "";
    let tree_view = false
    $: ({ torrent } = data)
</script>
<h1 class="torrent_name">{torrent.name}</h1>
<table>
    <tr>
        <td>magnet</td>
        <td><a href="magnet:?xt=urn:btih:{torrent.infoHash}">magnet <img src="/icon-magnet.gif"></a></td>
    </tr>
    <tr>
        <td>found</td>
        <td>{torrent.created}</td>
    </tr>
    <tr>
        <td>length</td>
        <td>{formatBytes(torrent.length,4)}</td>   
    </tr>
    <tr>
        <td>hash</td>
        <td>{torrent.infoHash}</td>
    </tr>
    <tr>
        <td>files</td>
        <td>{torrent.files.length}</td>
    </tr>
    <tr>
        <td>ip</td>
        <td>{torrent.source.ip} {whois_loopkup}</td>
    </tr>
</table>

<!-- tree_view: <input type="checkbox" name="tree_view" id="tree_view" bind:checked={tree_view}>
{tree_view}

<h2>files:</h2>
<TreeView files={torrent.files} /> -->

<h2>Files:</h2>
    <ListView files={torrent.files} />

<style>
    table, tr, td {
        border: 1px solid gray;
        border-collapse: collapse;
    }
    td {
        padding: 0.2em;
    }
</style>