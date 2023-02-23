<script>
    import Tree from './Tree.svelte'
    export let files
    let result = []
    // console.log(files)
    let level = {result}

    console.log(result)
</script>
{#if result}

<Tree item={result} />
{/if}




