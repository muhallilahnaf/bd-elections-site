<script>
    import Navbar from '$lib/components/Navbar.svelte'
    import PageHeading from '$lib/components/PageHeading.svelte'
    import Cards from '$lib/components/Cards.svelte'
    import menuData from '$lib/data/menu.json'

    const path = '/data'
    const dataItem = menuData.find(item => item.href == path)
    const heading = dataItem.title
    const subheading = dataItem.subtitle

	let { data } = $props();

</script>

<Navbar/>
<PageHeading heading={heading} subheading={subheading} />

<pre>
    {JSON.stringify(data)}
</pre>
