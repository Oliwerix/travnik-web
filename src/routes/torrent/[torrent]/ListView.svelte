<script>
    export let files
</script>

<ul>
    {#each files as file}
        <li>{file.path}</li>
    {/each}
</ul>