import type { PageServerLoad } from "./$types";
import { torrenti } from "$db/torrenti";

export const load: PageServerLoad = async function(request) {
    let lastHour = new Date()
    let lastDay = new Date()
    let lastWeek = new Date()
    lastHour.setHours(lastHour.getHours()-1)
    lastDay.setDate(lastDay.getDate()-1)
    lastWeek.setDate(lastDay.getDate()-7)

    let hour = torrenti.countDocuments({created: {$gt: lastHour}})
    let day = torrenti.countDocuments({created: {$gt: lastDay}})
    let count = torrenti.estimatedDocumentCount()
    let active_nodes = torrenti.aggregate([
        {
          '$match': {
            'created': {
              '$gt': lastHour
            }
          }
        }, {
          '$group': {
            '_id': null, 
            'nodes': {
              '$addToSet': '$createdBy'
            }
          }
        }
      ]).toArray()
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
    let totalStats = torrenti.aggregate([
      {
        '$group': {
          '_id': null, 
          'totalSize': {
            '$sum': '$length'
          }, 
          'files': {
            '$sum': {
              '$cond': {
                'if': {
                  '$isArray': '$files'
                }, 
                'then': {
                  '$size': '$files'
                }, 
                'else': 0
              }
            }
          }
        }
      }
    ]).toArray()
    let distinctIps = torrenti.distinct('source.ip')
    return {
        count: await count,
        day: await day,
        hour: await hour,
        active_nodes: await active_nodes,
        torrents_per_day: await torrents_per_day,
        total_stats: await totalStats,
        distinct_ips: await distinctIps
    }
}