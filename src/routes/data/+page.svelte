<script>
	import PageHeading from '$lib/components/PageHeading.svelte';
	import Cards from '$lib/components/HomepageCards.svelte';
	import DataSegment from '$lib/components/DataSegment.svelte';
	import menuData from '$lib/data/menuData.json';
	import shapefileData from '$lib/data/shapefileData.json';

	// get heading, subheading for data page
	const path = '/data';
	const dataItem = menuData.find((item) => item.href == path);
	const heading = dataItem.title;
	const subheading = dataItem.subtitle;

	// files data from github
	let { data } = $props();
</script>

<!-- /data route -->
<PageHeading {heading} {subheading} />

<!-- data files and preview -->
{#each data.results as filedata}
	<DataSegment {filedata} />
{/each}


<!-- shapefile -->
<div class="ui very padded basic segment">
    <!-- file name with link to github -->
    <div class="ui fitted compact basic segment">
        <a href={shapefileData.html_url} class="filename" target="_blank">
            <span class="ui large text">{shapefileData.name}</span>
        </a>
    </div>
    <!-- description and attribution -->
    <div class="ui fitted compact basic segment">
        <p>{shapefileData.description}</p>
		<p>
			<i class="ui text grey">
				Attribution: Shapefile generated from <a href={shapefileData.attribution_link}>link</a>
			</i>
		</p>
    </div>
    <!-- columns -->
	<div class="ui fitted compact basic segment">
		<p class="data-preview">Shapefile columns:</p>
		<table class="ui very compact small stackable table">
			<thead>
				<tr>
					{#each shapefileData.columns as col}
						<th>{col}</th>
					{/each}
				</tr>
			</thead>
		</table>
	</div>
</div>


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

<style>
	.data-preview {
		margin-bottom: 1rem;
	}
	.filename:hover {
		text-decoration: underline;
	}
</style>