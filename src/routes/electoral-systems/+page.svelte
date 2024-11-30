<script>
	import PageHeading from '$lib/components/PageHeading.svelte';
	import ElectoralAnalysisSection from '$lib/components/ElectoralAnalysisSection.svelte';
	import ElectoralDataSection from '$lib/components/ElectoralDataSection.svelte';
	import menuData from '$lib/data/menuData.json';
	import data from '$lib/data/electoralSystemItems.json';
	import { onMount } from 'svelte';

	onMount(() => {
		window.$('.menu .item').tab();
	});

	// get heading, subheading for analysis page
	const path = '/electoral-systems';
	const dataItem = menuData.find((item) => item.href == path);
	const heading = dataItem.title;
	const subheading = dataItem.subtitle;
</script>

<!-- /electoral systems page -->
<PageHeading {heading} {subheading} />

<div class="ui container">
	<!-- year tabs -->
	<div class="ui top attached tabular menu">
		{#each data.years.entries() as [i, year]}
			<div class="item" class:active={i == 0} data-tab={year.toString()}>{year}</div>
		{/each}
	</div>

	<!-- tab bodies -->
	{#each data.years.entries() as [i, year]}
		<div class="ui bottom attached tab segment" class:active={i == 0} data-tab={year.toString()}>
			<!-- data section -->
			 <ElectoralDataSection data_url={data.data_url} notebook_url={data.notebook_url} {year} />
			<!-- analysis sections -->
			{#each data.sections as section}
				<ElectoralAnalysisSection {section} figure_url={data.figure_url} {year} />
			{/each}
		</div>
	{/each}
</div>


<style>
	.tabular .item {
		cursor: pointer;
	}
</style>