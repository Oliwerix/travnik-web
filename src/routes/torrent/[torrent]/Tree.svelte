<script>
    import Tree from './Tree.svelte'
    export let item
</script>
<li>
    {item.name}
    <ul>
        {#if item.children}
            {#each item.children as child}
                <Tree item={child} />
            {/each}
        {/if}
    
    </ul>
</li>
