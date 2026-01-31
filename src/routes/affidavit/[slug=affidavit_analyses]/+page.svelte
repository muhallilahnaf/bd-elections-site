<script>
    import BackButton from '$lib/components/BackButton.svelte';
	import AnalysisDataSection from '$lib/components/AnalysisDataSection.svelte';
	import AnalysisFigureSection from '$lib/components/AnalysisFigureSection.svelte';
	import AnalysisMapSection from '$lib/components/AnalysisMapSection.svelte';
	import affidavitAnalysisItems from '$lib/data/affidavitAnalysisItems.json';

    let { data } = $props();
	const analysisData = affidavitAnalysisItems.find((item => item.slug == data.slug))	
</script>

<!-- /affidavit/[slug] page -->

<!-- back to /affidavit -->
<BackButton route="/affidavit" text="affidavit page" />

<!-- affidavit analysis results -->
<div class="ui container">
	<!-- affidavit analysis title -->
	<div class="ui basic segment">
		<h2 class="ui header">{analysisData.title}</h2>
		<p>{analysisData.description}</p>
	</div>
	<!-- analysis sections -->
	{#each analysisData.sections as section}
		<div class="ui basic padded segment">
			{#if section.type === 'data'}
				<AnalysisDataSection {section} nblink={analysisData.notebook_url} folder={analysisData.data_folder_url} />
			{:else if section.type === 'figure'}
				<AnalysisFigureSection {section} folder={analysisData.figure_folder_url} />
			{:else if section.type === 'map'}
				<!-- <AnalysisMapSection {section} folder={analysisData.map_folder_url} /> -->
			{/if}
		</div>
	{/each}
</div>
