const k = 1000
export const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

/**
 * Returns the order of magnitude of a byte size
 * @param bytes size in bytes
 * @returns 
 */
export function getOrder(bytes:number) {
    return Math.floor(Math.log(bytes) / Math.log(k))
}
/**
 * Makes a string format with prefix of size
 * @param bytes size in bytes
 * @param decimals decimal accuracy
 * @returns formatted string
 */
export function formatBytes(bytes:number, decimals:number = 2) {
    if (!+bytes) return '0 Bytes'
    const dm = decimals < 0 ? 0 : decimals
    const i = getOrder(bytes)

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
/**
 * Returns a ipv6 or ipv4 ip from a linux style ipv6 ip
 * eg. ffff::1.1.1.1/12345 -> 1.1.1.1
 * @param ip ip with port
 * @returns ip 
 */
export function get_ip(ip:string) {
    ip = ip.split("/")[0]
    if (ip.split(":")[2] == "ffff")
        return ip.split(":")[3]
    return ip
}

export type Filelist = Array<{path: string, name:string, length:number, offset: number}>
/**
 * Removes padding files from filelist
 * @param files filelist
 * @returns filelist w/o padding files
 */
export function clean_files(files:Filelist): Filelist{
    for(let i = 0; i < files.length; i++) {
        // this looks illegal, if I remove an element from an array, do I skip a file?
        if(files[i].path.split("/").includes(".pad"))
            files.splice(i, 1)
        if(files[i].path.includes("padding.file"))
            files.splice(i, 1)
        if(files[i].path.includes("padding_file_"))
            files.splice(i, 1)
    }
    return files
}

