<script>
// @ts-nocheck
// no check because message will always be not null if error page is shown
    import {page} from '$app/stores'
</script>
<div class="center">
    <h1>{$page.status} {$page.error.message}</h1>
    <figure>
        <img src="https://http.cat/{$page.status}" alt="funny cat image making fun of http code {$page.status}">
        <figcaption>Image courtesy of <a href="https://http.cat/">https://http.cat/</a></figcaption>
    </figure>
</div>

<style>
    div.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
}
</style>