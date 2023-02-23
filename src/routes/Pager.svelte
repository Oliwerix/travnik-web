<script lang="ts">
    import {page} from '$app/stores'
    export let count:number
    $: current_page = parseInt($page.url.searchParams.get("p") || "0") 
    $: pages = Math.ceil(count / 100)

    $: getURL = (i:number) => {
         const params = new URLSearchParams($page.url.searchParams)
         params.set("p", i.toString())
         return $page.url.pathname + '?' + params.toString()
    }
</script>
{#if pages > 1}
<div>
    {#if current_page > 0}
        <span><a href="{getURL(current_page-1)}">&#60&#60</a></span>
    {/if}
    {#each [...Array(pages).keys()] as i}
        <span><a href={getURL(i)}>{i == current_page ? "<" + (i+1) +">" : i+1}</a> </span>
    {/each}
    {#if current_page < pages-1}
        <span><a href="{getURL(current_page+1)}">&#62&#62</a></span>
    {/if}
</div>
{/if}

<style>
    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.5em;
        width: 100%;
    }
</style>