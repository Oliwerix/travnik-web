<script lang="ts">
    import { formatBytes } from '$lib/functions.ts'
    import type {PageData} from './$types'
    export let data: PageData;
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
</table>

<h2>files:</h2>
<ul>
    {#each torrent.files as file}
        <li>{file.path}</li>
    {/each}
</ul>


<style>
    table, tr, td {
        border: 1px solid gray;
        border-collapse: collapse;
    }
    td {
        padding: 0.2em;
    }
</style>