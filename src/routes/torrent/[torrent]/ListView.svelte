<script lang="ts">
    export let files:Array<{path: string, name:string, length:number, offset: number}>
</script>

<ul>
    {#each files as file}
        <li>{file.path}</li>
    {/each}
</ul>