<script>
    import { SyncLoader } from 'svelte-loading-spinners'
    const color = "#ff4700"
    export let fontsize = "2em"
</script>
<div class="center">
    <div class="not" style="color: {color}; font-size: {fontsize};">
        <SyncLoader {color}></SyncLoader>
        <slot></slot>

    </div>
</div>

<style>
    div.center {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        align-items: center;
    }
    div.not {
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        font-size: 2em;
    }

</style>