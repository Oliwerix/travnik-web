import { torrenti } from "$db/torrenti";
import type { PageServerLoad } from "./$types";
import {error} from '@sveltejs/kit'

export const load: PageServerLoad = async function(page) {
    const data = await torrenti.findOne({infoHash: page.params.torrent}, {projection: {name:1, files: 1,_id: 0, infoHash: 1, created: 1, length: 1, source: 1}});
    if(data === null) {
        throw error(404, {
            message: 'Torrent not found'
        })
    }
    return {
        torrent: data
    }    
}