<script>
    import PageHeading from "$lib/components/PageHeading.svelte";
	import seatsDataStore from "$lib/store/seatsData.svelte.js";
    import {toTitleCase} from '$lib/helper.js'
	import BackButton from "$lib/components/BackButton.svelte";
    import SeatTable from "$lib/components/SeatTable.svelte";

    let { data } = $props();
    
    const slug = decodeURI(data.slug);
    let targetSeat = $derived(seatsDataStore.seatsData.find((item => item.seat == slug)))
    
    let heading = $derived(targetSeat.seat)
    let subheading = $derived(targetSeat.seat_areas)

    // display seat year-wise details
    const targetSeatSummary = data.targetSeatSummary;
    const seatSummaryCols = ['year', 'turnout', 'turnout_pc', 'voters', 'male_voters', 'female_voters', 'centers']

    // display seat year-wise details
    const targetSeatResults = data.targetSeatResults;
    const seatResultCols = ['year', 'party', 'name', 'votes', 'votes_pc', 'winner']

    const summaryHeading = slug + 'year-wise data'
    const resultsHeading = slug + 'candidate data'

</script>

<!-- /kys/seat-details/[seat] page -->

<BackButton route="/kys" text="seat page" />

<PageHeading {heading} {subheading} />

<div class="ui container">
    <div class="ui basic very padded segment">
        {#each Object.keys(targetSeat) as key}
            <p>
                <b>{toTitleCase(key.replace('_', ' '))}</b><span>:&nbsp;</span><span>{targetSeat[key]}</span>
            </p>
        {/each}
    </div>

    <!-- year-wise data -->
    <SeatTable heading={summaryHeading} rows={targetSeatSummary} cols={seatSummaryCols} />

    <!-- candidate data -->
    <SeatTable heading={resultsHeading} rows={targetSeatResults} cols={seatResultCols} />
</div>