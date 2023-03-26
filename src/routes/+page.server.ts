import type { PageServerLoad } from "./$types";
import { torrenti } from "$db/torrenti";
import { error } from '@sveltejs/kit'

let sorts = {
    "rel": {
        score: {$meta: "textScore"}, 
        name: 1
    },
    "name": {
        name: 1
    },
    "date": {
        created:-1,
        name: 1
    },
    "files": {
        no_files: -1,
        name: 1
    },
    "size": {
        length: -1,
        name: 1
    }
}
export const load: PageServerLoad = async function({url, setHeaders}) {
    const params = await url.searchParams
    let search = params.get('q') || ""
    let sort = sorts[params.get('srt') || "rel"] || sorts["rel"]
    let search_type = params.get('s') || "n"
    if (search_type != "n" && sort == sorts["rel"]) {
        sort = sorts["name"]
    }
    const page:number = parseInt(params.get('p') || "0")
    let queries
    try {
        queries = {
            "n": 
                {'$text': {'$search': search}},
            "regt": 
                { name: new RegExp(search)},
            "regit":
                { name: new RegExp(search, "i")},
            "reg":
                {$or: [{ name: new RegExp(search)},{ 'files.name': new RegExp(search)}, {'source.ip': new RegExp(search)}]},
            "regi":
                {$or: [{ name: new RegExp(search, "i")},{ 'files.name': new RegExp(search, "i")}, {'source.ip': new RegExp(search, "i")}]},
            "regip":
                {'source.ip': new RegExp(search, "i")}
        }
    } catch (e) {
        if(e instanceof SyntaxError && search_type != "n")
            throw error(500, "Regex is Invalid")
        queries = {
            "n":
                {'$text': {'$search': search}}
        }
    }
    
    let data, count
    let status
    if(search === null || search == "") {
        // if no search query is provided, get 25 latest torrents
        data = torrenti.find({}, {limit: 25, sort: {created: -1}, projection: {
            name: 1, 
            created: 1,
            _id: 0, 
            infoHash: 1, 
            length: 1, 
            no_files: {$cond: {if: {$isArray: "$files"}, then: {$size: "$files"}, else: 0}}
        }}).toArray()
        count = torrenti.estimatedDocumentCount()
        status = false
        setHeaders({
            'cache-control': 'max-age=5, stale-while-revalidate=60'
        })
    } else {
        status = true
        data = torrenti.aggregate([
                {$match: queries[search_type]}
            ,
            {
                $project: {
                    name: 1, 
                    created: 1,
                    _id: 0, 
                    infoHash: 1,
                    length: 1, 
                    no_files: {$cond: {if: {$isArray: "$files"}, then: {$size: "$files"}, else: 0}}
                }
            },
            {$sort: sort},
            {$skip: (page*100)},
            {$limit: 100},
        ], {
            allowDiskUse: true,
        }).toArray();
        count =  torrenti.countDocuments(queries[search_type])

        setHeaders({
            'cache-control': 'max-age=60, stale-while-revalidate=240'
        })
    }
    return {
        status: status,
        torrents: await data,
        count: await count
    }
}

