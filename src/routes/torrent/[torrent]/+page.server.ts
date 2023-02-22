import { torrenti } from "$db/torrenti";
import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async function(page) {
    console.log(page.params.torrent)
    const data = await torrenti.findOne({infoHash: page.params.torrent}, {projection: {name:1, files: 1,_id: 0, infoHash: 1, created: 1, length: 1}});
    return {
        torrent: data
    }    
}