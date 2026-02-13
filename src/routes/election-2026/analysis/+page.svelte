<script>
    import BackButton from '$lib/components/BackButton.svelte';
	import AnalysisFigureSection from '$lib/components/AnalysisFigureSection.svelte';

    const figure_folder_url = "https://raw.githubusercontent.com/muhallilahnaf/bd-elections-eda/master/fig/"
    const analysisItems = [
        {
            title: 'Win analysis',
            sections: [
                {
                    file_name: 'election_2026_party_win_map.png',
                    description: '',
                    discussion: ''
                },
                {
                    file_name: 'election_2026_party_win_map_dhaka.png',
                    description: '',
                    discussion: ''
                },
                {
                    file_name: 'election_2026_party_win_map_ctg.png',
                    description: '',
                    discussion: ''
                },
                {
                    file_name: 'election_2026_turnout_party_distn.png',
                    description: '',
                    discussion: ''
                },
            ]
        },
        {
            title: 'Turnout analysis',
            sections: [
                {
                    file_name: 'election_2026_turnout_pc_map.png',
                    description: '',
                    discussion: ''
                },
                {
                    file_name: 'election_2026_turnout_pc_compare.png',
                    description: '',
                    discussion: ''
                },
                {
                    file_name: 'election_2026_comparison_turnout_pc_vote_gap.png',
                    description: '',
                    discussion: ''
                }
            ]
        },
        {
            title: 'Vote gap analysis',
            sections: [
                {
                    file_name: 'election_2026_map_alliance_vote_gap.png',
                    description: '',
                    discussion: ''
                },
                {
                    file_name: 'election_2026_alliance_close_contest.png',
                    description: '',
                    discussion: ''
                },
                {
                    file_name: 'election_2026_alliance_jamaat_ncp_win_vote_gap_distn.png',
                    description: '',
                    discussion: ''
                },
                {
                    file_name: 'election_2026_alliance_bnp_win_vote_gap_distn.png',
                    description: '',
                    discussion: ''
                },
                {
                    file_name: 'election_2026_alliance_jamaat_ncp_win_vote_gap.png',
                    description: '',
                    discussion: ''
                },
                {
                    file_name: 'election_2026_alliance_bnp_win_vote_gap.png',
                    description: '',
                    discussion: ''
                }
            ]
        }
    ]
</script>

<!-- /election-2026/analysis/ page -->

<!-- back to /analysis -->
<BackButton route="/election-2026" text="Election 2026 page" />

<!-- analysis results -->
<div class="ui container">
	<!-- analysis title -->
	<div class="ui basic segment">
		<h2 class="ui header">Election 2026 primary analysis</h2>
	</div>
	<!-- analysis sections -->
    {#each analysisItems as analysisItem}
        <div class="ui basic padded segment">
            <h3>{analysisItem.title}</h3>
            {#each analysisItem.sections as section}
                <AnalysisFigureSection {section} folder={figure_folder_url} />
            {/each}
        </div>
    {/each}
</div>
