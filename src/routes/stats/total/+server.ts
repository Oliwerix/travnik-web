import { torrenti } from '$db/torrenti';
import { json } from '@sveltejs/kit'
export async function GET({ setHeaders }) {
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
      setHeaders({
        'cache-control': 'max-age=120, stale-while-revalidate=600'
      })
    return json(await totalStats)
}