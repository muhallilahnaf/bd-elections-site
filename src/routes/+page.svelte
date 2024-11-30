<script>
    import PageHeading from '$lib/components/PageHeading.svelte'
    import Cards from '$lib/components/HomepageCards.svelte'

    const heading = 'BD Elections'
    const subheading = 'Detailed data and analysis of Bangladesh General Elections.'
</script>


<!-- HOMEPAGE -->
 
<PageHeading heading={heading} subheading={subheading} />
<Cards/>