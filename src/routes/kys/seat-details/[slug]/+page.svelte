<script>
    import PageHeading from "$lib/components/PageHeading.svelte";
	import seatsDataStore from "$lib/store/seatsData.svelte.js";
    import {toTitleCase, readCSV} from '$lib/helper.js'
	import BackButton from "$lib/components/BackButton.svelte";
    import SeatTable from "$lib/components/SeatTable.svelte";
    import { onMount } from "svelte";

    let { data } = $props();
    
    const slug = decodeURI(data.slug);
    let targetSeat = $derived(seatsDataStore.seatsData.find((item => item.seat == slug)))
    
    let heading = $derived(targetSeat.seat)
    let subheading = $derived(targetSeat.seat_areas)

    // display seat year-wise details
    let targetSeatSummary = $state([])
    const seatSummaryCols = ['year', 'turnout', 'turnout_pc', 'voters', 'male_voters', 'female_voters', 'centers']

    // display seat year-wise details
    let targetSeatResults = $state([])
    const seatResultCols = ['year', 'party', 'name', 'votes', 'votes_pc', 'winner']

    onMount(async () => {
         const seatSummaryLink = 'https://raw.githubusercontent.com/muhallilahnaf/bd-elections-eda/master/data/seat_summary.csv'
         const seatSummary = await readCSV(seatSummaryLink);
         targetSeatSummary = seatSummary.filter(s => s.seat == targetSeat.seat);
         const seatResultLink = 'https://raw.githubusercontent.com/muhallilahnaf/bd-elections-eda/master/data/candidate_result.csv'
         const seatResult = await readCSV(seatResultLink);
         targetSeatResults = seatResult.filter(s => s.seat == targetSeat.seat);
         targetSeatResults.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    })

    const summaryHeading = slug + ' year-wise data'
    const resultsHeading = slug + ' candidate data'

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