<script>
    import AnalysisCards from '$lib/components/AnalysisCards.svelte';
    import PageHeading from '$lib/components/PageHeading.svelte';
	import menuData from '$lib/data/menuData.json';

	// get heading, subheading for analysis page
	const path = '/analysis';
	const dataItem = menuData.find((item) => item.href == path);
	const heading = dataItem.title;
	const subheading = dataItem.subtitle;
</script>

<!-- /analysis page -->
 
<PageHeading {heading} {subheading} />

<AnalysisCards />
