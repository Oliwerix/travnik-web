const k = 1000
export const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
export function getOrder(bytes:number) {
    return Math.floor(Math.log(bytes) / Math.log(k))
}
export function formatBytes(bytes:number, decimals:number = 2) {
    if (!+bytes) return '0 Bytes'
    const dm = decimals < 0 ? 0 : decimals
    const i = getOrder(bytes)

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

