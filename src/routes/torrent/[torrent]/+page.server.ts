import { torrenti } from "$db/torrenti";
import type { PageServerLoad } from "./$types";
import {error} from '@sveltejs/kit'
import {get_ip} from '$lib/functions'
import whoiser from "whoiser";
export const load: PageServerLoad = async function({params, setHeaders}) {
    
    const data = await torrenti.findOne({infoHash: params.torrent}, {projection: {name:1, files: 1,_id: 0, infoHash: 1, created: 1, length: 1, source: 1, createdBy: 1}});
    if(data === null) {
        throw error(404, {
            message: 'Torrent not found'
        })
    }
    setHeaders({
        'cache-control': 'max-age=604800'
    })
 
    return {
        torrent: data
    }    
}