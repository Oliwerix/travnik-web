<script lang="ts">
    import { navigating } from '$app/stores'
    import Spinner from '$lib/Spinner.svelte'
    let navigating_to_other_page:boolean 
    
    navigating.subscribe(nav => {
        if(nav !== null) {
            navigating_to_other_page = nav.from?.route.id !== nav.to?.route.id
        } else {

            navigating_to_other_page = false
        }
    })
    
</script>
<nav>
    <a href="/">
        <h2>travnik search</h2>
    </a>
    <a href="/stats" style="margin-left:auto">
        <h2>stats</h2>
    </a>

</nav>
<div class="content">
    {#if navigating_to_other_page}
    <br>
        <Spinner>Loading {$navigating?.to?.route.id.split("/")[1]}</Spinner>
    {:else}
    <slot></slot>
    {/if}
</div>

<style>
    a {
        text-decoration: none;
        color: white;
    }
    nav {
        background-color: var(--accent-color);
        margin: 0;
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: row;
    }
    h2 {
        margin: 0;
    }
    div.content {
        height: 100%;
        padding: 0 0.5em;
    }
</style>