<script lang="ts">
    import { clean_files } from "$lib/functions";
    import type { Filelist } from "$lib/functions";
    export let files:Filelist
</script>

<ul>
    {#each clean_files(files) as file}
        <li>{file.path}</li>
    {/each}
</ul>