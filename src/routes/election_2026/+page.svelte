<script>
	import PageHeading from '$lib/components/PageHeading.svelte';
    import menuData from '$lib/data/menuData.json'
	import { onMount } from 'svelte';
	import seatsDataStore from '$lib/store/seatsData.svelte';
    import CandidateCard from '$lib/components/CandidateCard.svelte';


    // get heading, subheading for election 2026 page
	const path = '/election_2026';
	const dataItem = menuData.find((item) => item.href == path);
	const heading = dataItem.title;
	const subheading = dataItem.subtitle;


    let selectedDivision = $state(undefined)
	let divisions = $state([])
	let districtsWithinDivision = $derived(
        getDistrictsWithinDivision(selectedDivision, seatsDataStore.seatsData)
	)
    let selectedDistrict = $state(undefined)
	let seatsWithinDistrict = $derived(
		getSeatsWithinDistrict(selectedDistrict, seatsDataStore.seatsData)
	)
    let selectedSeat = $state(undefined)



    $effect(() => {
		divisions = getDivisions(seatsDataStore.seatsData)
	})


    // get list of divisions
	const getDivisions = (seatsData) => {
		let divisions = []
		seatsData.forEach(s => {
			if (!divisions.includes(s.division)) {
				divisions.push(s.division)
			}
		})
		return divisions
	}

	// get list of districts within selected division
	const getDistrictsWithinDivision = (selectedDivision, seatsData) => {
		let districts = []
		seatsData.forEach(s => {
			if (s.division == selectedDivision && !districts.includes(s.district)) {
				districts.push(s.district)
			}
		})
		return districts
	}

    // get list of seats within selected district
	const getSeatsWithinDistrict = (selectedDistrict, seatsData) => {
		let seats = []
		seatsData.forEach(s => {
			if (s.district == selectedDistrict) {
				seats.push(s.seat)
			}
		})
		return seats
	}





</script>


<!-- /election_2026 page -->
<PageHeading {heading} {subheading} />

<div class="ui container">
	<div class="ui basic segment">
		<!-- dropdowns -->
		<div class="ui basic segment">
			<select class="ui selection dropdown" bind:value={selectedDivision}>
				<option value={undefined} disabled selected>Select a division</option>
				{#each divisions as division}
    				<option value={division}>{division}</option>
				{/each}
			</select>
			{#if selectedDivision}
			<select class="ui selection dropdown" bind:value={selectedDistrict}>
				<option value={undefined} disabled selected>Select a district</option>
				{#each districtsWithinDivision as district}
					<option value={district}>{district}</option>
				{/each}
			</select>
			{/if}
            {#if selectedDistrict}
			<select class="ui selection dropdown" bind:value={selectedSeat}>
				<option value={undefined} disabled selected>Select a seat</option>
				{#each seatsWithinDistrict as seat}
					<option value={seat}>{seat}</option>
				{/each}
			</select>
			{/if}
		</div>
        {#if selectedSeat}
            <div class="ui basic very padded segment">
                <h3>Candidates</h3>
                <div class="ui four stackable cards">
                    {#each targetSeatWinners as winner}
                        <CandidateCard winner={winner} />
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

		