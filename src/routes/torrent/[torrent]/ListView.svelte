<script lang="ts">
    import { clean_files, getOrder, formatBytes, sizes } from "$lib/functions";
    import type { Filelist } from "$lib/functions";
    
    

    export let files:Filelist
</script>

<ul>
    {#each clean_files(files) as file}
        <li><p>{file.path} <span class="size {sizes[getOrder(file.length)]}">{formatBytes(file.length)} </span></p></li>
    {/each}
</ul>

<style>
    p {
        margin: 0.1em;
    }
    .size {
        font-weight: bold;
        border-radius: 0.7em;
        font-size: 0.7em;
        white-space: nowrap;
        padding: 0.2em;
    }
</style>