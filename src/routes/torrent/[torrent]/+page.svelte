<script lang="ts">
    import { formatBytes, get_ip, clean_files, get_magnet } from '$lib/functions'
    import type {PageData} from './$types'
    import ListView from './ListView.svelte';
    // import TreeView from './TreeView.svelte';
    // import whoiser from 'whoiser'
    export let data: PageData;
    let whois_loopkup = "";
    let tree_view = false

    $: ({ torrent } = data)
</script>

    <h1 class="torrent_name">{torrent.name}</h1>
    <table>
        <tr>
            <td>magnet</td>
            <td><a href={get_magnet(torrent)}>magnet <img src="/icon-magnet.gif" alt="magnet icon"></a></td>
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
            <td>{clean_files(torrent.files).length}</td>
        </tr>
        <tr>
            <td>ip</td>
            <td>{get_ip(torrent.source.ip)}
                <!-- {#await whoiser.ip(get_ip(torrent.source.ip))}
                    Loading
                {:then whois} 
                    {whois}
                {:catch error}
                    {error}
                {/await} -->
            </td>
        </tr>
        <tr>
            <td>found by</td>
            <td>{torrent.createdBy.split(" ")[3] ?? "b"}</td>
        </tr>
    </table>
    <h2>Files:</h2>
        <ListView files={torrent.files} />
<!-- tree_view: <input type="checkbox" name="tree_view" id="tree_view" bind:checked={tree_view}>
{tree_view}

<h2>files:</h2>
<TreeView files={torrent.files} /> -->


<style>
    table, tr, td {
        border: 1px solid gray;
        border-collapse: collapse;
    }
    td {
        padding: 0.2em;
    }
</style>
