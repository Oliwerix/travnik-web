<script lang="ts">
    import {getOrder, formatBytes, sizes} from '$lib/functions.ts'

    export let torrent

</script>
<div class="torrent">
    <a href="/torrent/{torrent.infoHash}"><h3 class="torrent_name">{torrent.name}</h3></a>
    <div class="row">
        <div>
            size:  <span class="size {sizes[getOrder(torrent.length)]}">{formatBytes(torrent.length)} </span>
        </div>
        <div>
            found: {`${torrent.created.toLocaleDateString()} ${torrent.created.toLocaleTimeString()}`}
        </div>
        <div>
            files: {torrent.no_files}
        </div>
        <div>
            <!-- relevance: {torrent.score} -->
        </div>
    </div>

</div>

<style>
    div.torrent {
        display: flex;
        flex-direction: column;
        background-color: var(--background-accent-color);
        margin: 0.2em 0;
        padding: 0.5em;
        border-radius: 12px;
        border: .18em solid var(--accent-color-light);
    }
    div.row {
        display: flex;
        flex-direction: row;
        gap: 1em;
        margin-top: 0.2em;
    }
    h3 {
        margin: 0;
    }
    a {
        color: var(--font-color);
    }
    a:visited {
        color: rgb(100, 100, 100);
    }
    .size {
        font-weight: bold;
        border-radius: 1em;
        font-size: 0.9em;
        white-space: nowrap;
        padding: 0.2em;
    }

</style>