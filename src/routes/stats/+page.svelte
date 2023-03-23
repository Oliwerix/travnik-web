<script lang="ts">
	import type { PageData } from "./$types";
    import Chart from 'svelte-frappe-charts'
    import { formatBytes, formatNumber } from '$lib/functions'
    import { Pulse } from "svelte-loading-spinners";

    let axisOptions = {
                xAxisMode: "tick",
                xIsSeries: true,
    }
    function get_chartdata(raw_data) {
        let labels = []
        let chartdata = []
        raw_data.forEach(element => {
            labels.push(new Date(element._id))
            chartdata.push(element.count)
        });
        return {
            labels: labels,
            datasets: [
                {
                    values: chartdata
                }
            ],
        }
    }
    async function get_total_stats() {        
        return fetch('/stats/total').then((response) => response.json())
    }

    export let data: PageData;
    $: ({count, day, hour, active_nodes, torrents_per_day, total_stats, distinct_ips} = data)
</script>

<h1>Statistics</h1>
<div>{count} torrents total</div> 
<div>A new torrent every {((24*3600)/day).toFixed(2)}s</div>
<div>{hour} new torrents last hour</div>

<h3>Torrent statistics</h3>
{#await get_total_stats()}
<div style="margin: 0.25em;">
    <Pulse/>
</div>

{:then total_stats} 
    <div>Size of all torrents: {formatBytes(total_stats[0].totalSize,4)}</div>
    <div>{total_stats[0].files.toLocaleString()} files indexed</div>
{/await}

<div>{distinct_ips.length.toLocaleString()} unique ips</div>

{#if active_nodes.length}
    <h3>Active travnik nodes</h3>
    <ul>
        {#each active_nodes as node}
            <li>{node.split(" ")[3]}</li>
        {/each}
    </ul>
{:else}
    <h3>No travnik nodes active</h3>
{/if}
<Chart data={get_chartdata(torrents_per_day)} type='bar' colors={['#ff4700']} axisOptions={axisOptions} lineOptions={{'hide_dots': 1}}/>