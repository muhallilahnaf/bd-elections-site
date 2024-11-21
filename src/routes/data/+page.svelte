<script>
	import PageHeading from '$lib/components/PageHeading.svelte';
	import Cards from '$lib/components/Cards.svelte';
	import DataSegment from '$lib/components/DataSegment.svelte';
	import menuData from '$lib/data/menu.json';

	// get heading, subheading for data page
	const path = '/data';
	const dataItem = menuData.find((item) => item.href == path);
	const heading = dataItem.title;
	const subheading = dataItem.subtitle;

	// files data from github
	let { data } = $props();
</script>


<PageHeading {heading} {subheading} />

<!-- data files and preview -->
{#each data.results as filedata}
	<DataSegment {filedata} />
{/each}


<!-- data source -->
<div class="ui container">
	<div class="ui grey segment">
		<p><span class="ui large text">Data Source</span></p>
		<p>
			Wikipedia. Pages under <a href="https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Jatiya_Sangsad">link</a> 
			for candidate and seat-level data. Pages under <a href="https://en.wikipedia.org/wiki/Category:General_elections_in_Bangladesh">link</a> 
			for party and election-level data.
		</p>
	</div>
</div>