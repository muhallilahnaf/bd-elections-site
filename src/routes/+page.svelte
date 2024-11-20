<script>
    import Navbar from '$lib/components/Navbar.svelte'
    import PageHeading from '$lib/components/PageHeading.svelte'
    import Cards from '$lib/components/Cards.svelte'

    const heading = 'BD Elections'
    const subheading = 'Detailed data and analysis of Bangladesh General Elections.'
</script>

<Navbar/>
<PageHeading heading={heading} subheading={subheading} />
<Cards/>




<!-- <div class="ui segment">
    <iframe src="/swing_map.html" title="W3Schools Free Online Web Tutorials"></iframe>
</div> -->

<!-- <style>
    iframe {
        width: 80vw;
        height: 400px;
    }
</style> -->