<script>
    import AnalysisCards from '$lib/components/AnalysisCards.svelte';
    import PageHeading from '$lib/components/PageHeading.svelte';
	import menuData from '$lib/data/menuData.json';
	import analysisData from '$lib/data/affidavitAnalysisItems.json';

	// get heading, subheading for affidavit page
	const path = '/affidavit';
	const dataItem = menuData.find((item) => item.href == path);
	const heading = dataItem.title;
	const subheading = dataItem.subtitle;
</script>

<!-- /affidavit page -->
 
<PageHeading {heading} {subheading} />

<AnalysisCards {analysisData} {path} />
