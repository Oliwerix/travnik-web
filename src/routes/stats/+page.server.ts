import type { PageServerLoad } from "./$types";
import { torrenti } from "$db/torrenti";

export const load: PageServerLoad = async function({setHeaders}) {
    let lastHour = new Date()
    let last5min = new Date()
    let lastDay = new Date()
    let lastWeek = new Date()
    lastHour.setHours(lastHour.getHours()-1)
    lastDay.setDate(lastDay.getDate()-1)
    lastWeek.setDate(lastDay.getDate()-7)
    last5min.setMinutes(last5min.getMinutes()-5)

    let hour = torrenti.countDocuments({created: {$gt: lastHour}})
    let day = torrenti.countDocuments({created: {$gt: lastDay}})
    let count = torrenti.estimatedDocumentCount()
    let active_nodes = torrenti.distinct('createdBy',
        {
            'created': {
              '$gt': last5min
            }
          })
    let torrents_per_day = torrenti.aggregate(
      [
        {'$match': {
          'created': {
            '$gt': lastWeek
          }
        }
        },
        {
          '$group': {
            '_id': {
              '$dateToString': {
                'format': '%Y-%m-%dT%H:00', 
                'date': '$created'
              }
            }, 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            '_id': 1
          }
        }
      ]
    ).toArray()
    let distinctIps = torrenti.distinct('source.ip')
    
      setHeaders({
        'cache-control': 'max-age=60, stale-while-revalidate=300'
      })

    return {
        count: await count,
        day: await day,
        hour: await hour,
        active_nodes: await active_nodes,
        torrents_per_day: await torrents_per_day,
        distinct_ips: await distinctIps
    }
}