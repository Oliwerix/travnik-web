import type { PageServerLoad } from "./$types";
import { torrenti } from "$db/torrenti";

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
    }
}
export const load: PageServerLoad = async function(request) {
    const params = await request.url.searchParams
    let search = params.get('q')
    let sort = sorts[params.get('srt') || "rel"] || sorts["rel"]
    let search_type = params.get('s') || "n"
    if (search_type != "n" && sort == sorts["rel"]) {
        sort = sorts["name"]
    }
    const page:number = parseInt(params.get('p') || "0")
    let queries = {
        "n": 
            {'$text': {'$search': search}},
        "regt": 
            {$or: [{ name: new RegExp(search)}]},
        "regit":
            {$or: [{ name: new RegExp(search, "i")}]},
        "reg":
            {$or: [{ name: new RegExp(search)},{ 'files.name': new RegExp(search)}, {'source.ip': new RegExp(search)}]},
        "regi":
            {$or: [{ name: new RegExp(search, "i")},{ 'files.name': new RegExp(search, "i")}, {'source.ip': new RegExp(search, "i")}]}

         
    }
    
    let data, count
    let status
    if(search === null || search == "") {
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
                    // score: {'$meta': 'textScore'}, 
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

    }
    return {
        status: status,
        torrents: await data,
        count: await count
    }
}

