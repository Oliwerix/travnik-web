import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import type { RequestEvent } from "@sveltejs/kit";
import { torrenti } from "$db/torrenti";

export const load: PageServerLoad = async function(request) {
    const params = await request.url.searchParams
    let search = params.get('q')
    const page:number = parseInt(params.get('p') || "0")
    if(search === null) {
        search = ""
    }
    const data = await torrenti.find({'$text': {'$search': search}}, {limit: 100, skip: (page*100),projection: {name: 1, created: 1, _id: 0, infoHash: 1,score: {'$meta': 'textScore'}, length: 1,}, sort: {score: {$meta: "textScore"}, name: 1}}).toArray();
    const count =  torrenti.countDocuments({'$text': {'$search': search}})
    console.log(data[0])
    return {
        success: true,
        torrents: await data,
        count: await count
    }
}

