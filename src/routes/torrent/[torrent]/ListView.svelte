<script lang="ts">
    type Filelist = Array<{path: string, name:string, length:number, offset: number}>
    export let files:Filelist
    function clean_files(files:Filelist): Filelist{
        for(let i = 0; i < files.length; i++) {
            // this looks illegal, if I remove an element from an array, do I skip a file?
            if(files[i].path.split("/").includes(".pad"))
                files.splice(i, 1)
            if(files[i].path.includes("padding.file"))
                files.splice(i, 1)
            if(files[i].path.includes("_____padding_file_"))
                files.splice(i, 1)
        }
        return files
    }
</script>

<ul>
    {#each clean_files(files) as file}
        <li>{file.path}</li>
    {/each}
</ul>