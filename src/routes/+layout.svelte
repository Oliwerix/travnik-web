<script>
    import { page } from '$app/stores'
</script>
<nav>
    <a href="/">
        <h2>travnik search</h2>
    </a>

</nav>
<div class="content">
    <slot></slot>

</div>

<style>
    a {
        text-decoration: none;
        color: white;
    }
    nav {
        background-color: var(--accent-color);
        margin: 0;
        padding: 0.5rem 1rem;
    }
    h2 {
        margin: 0;
    }
    div.content {
        height: 100%;
        padding: 0 0.5em;
    }
</style>