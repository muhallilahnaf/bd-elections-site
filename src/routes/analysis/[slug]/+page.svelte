<script>
    	import BackButton from '$lib/components/BackButton.svelte';
	import AnalysisDataSection from '$lib/components/AnalysisDataSection.svelte';
	import AnalysisFigureSection from '$lib/components/AnalysisFigureSection.svelte';
	import AnalysisMapSection from '$lib/components/AnalysisMapSection.svelte';

    const data = {
		name: 'allp_win_change',
		title: 'Winner change frequency',
		description: 'Counting how many times the winner party changes in each of the 300 seats.',
		thumb: 'allp_win_change.png',
		sections: [
			{
				type: 'data',
				file_name: 'allp_win_change.csv',
				description: ''
			},
			{
				type: 'figure',
				file_name: 'allp_win_change.png',
				description:
					"Map visualizing the frequency of winner party changes in each seat. Winner party changes more frequently in the seats with darker shades and vice versa. *Winner party doesn't change in Noakhali, Bogura, and Gopalganj regions.*"
			},
			{
				type: 'map',
				file_name: 'allp_win_change.html',
				description: 'Interactive map of the above figure. Hover and click for more details.'
			}
		]
	};

    let { slug } = $props();
</script>

<p>{slug}</p>


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
				<AnalysisDataSection {section} name={data.name} />
			{:else if section.type === 'figure'}
				<AnalysisFigureSection {section} />
			{:else if section.type === 'map'}
				<AnalysisMapSection {section} />
			{/if}
		</div>
	{/each}
</div>
