<script>
    import BackButton from '$lib/components/BackButton.svelte';
	import AnalysisDataSection from '$lib/components/AnalysisDataSection.svelte';
	import AnalysisFigureSection from '$lib/components/AnalysisFigureSection.svelte';
	import AnalysisMapSection from '$lib/components/AnalysisMapSection.svelte';
	import analysisItems from '$lib/data/analysisItems.json';

    let { slug } = $props();

	const data = analysisItems.find((item => item.slug == slug))
</script>

<!-- /analysis/[slug] page -->

<p>{slug}</p>

<!-- back to /analysis -->
<BackButton />

<!-- analysis results -->
<div class="ui container">
	<!-- analysis title -->
	<div class="ui basic segment">
		<h2 class="ui header">{data.title}</h2>
		<p>{data.description}</p>
	</div>
	<!-- analysis sections -->
	{#each data.sections as section}
		<div class="ui basic padded segment">
			{#if section.type === 'data'}
				<AnalysisDataSection {section} nblink={data.notebook_url} folder={data.data_folder_url} />
			{:else if section.type === 'figure'}
				<AnalysisFigureSection {section} folder={data.figure_folder_url} />
			{:else if section.type === 'map'}
				<AnalysisMapSection {section} folder={data.map_folder_url} />
			{/if}
		</div>
	{/each}
</div>
