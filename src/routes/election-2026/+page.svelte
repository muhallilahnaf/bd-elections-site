<script>
	import Chart from 'chart.js/auto';
	import PageHeading from '$lib/components/PageHeading.svelte';
    import menuData from '$lib/data/menuData.json'
	import { onMount } from 'svelte';
	import seatsDataStore from '$lib/store/seatsData.svelte';
	import candidatesDataStore from '$lib/store/candidatesData.svelte';
    import CandidateCard from '$lib/components/CandidateCard.svelte';
	import { readCSV } from '$lib/helper';
	import CandidateVotesCard from '$lib/components/CandidateVotesCard.svelte';

	let canvasPartyWins = $state(null)
	let chartPartyWins = null
	let partyWins = $state({})

	let canvasPartyVotePc = $state(null)
	let chartPartyVotePc = null
	let partyVotePc = $state([])

	let seatVotesData = $state([])
	let partyVotesData = $state([])
	const bigp = ['BNP', 'Jamaat', 'Islami Andolan Bangladesh', 'NCP', 'JaPa']


	onMount(async () => {
		// seatVotesData = await readCSV('https://raw.githubusercontent.com/muhallilahnaf/election-2026-live/master/data/seat_votes.csv')
		// partyVotesData = await readCSV('https://raw.githubusercontent.com/muhallilahnaf/election-2026-live/master/data/party_votes.csv')
		console.log(seatVotesData.length);
		partyWins = partyVotesData.filter(
			q => bigp.includes(q.party)
		).toSorted(
			(a, b) => b.count - a.count
		)
		if (canvasPartyWins) {
			chartPartyWins = new Chart(canvasPartyWins, {
				type: 'pie',
				data: {
					labels: partyWins.map(p => p.party),
					datasets: [{
						label: '# of seats',
						data: partyWins.map(p => p.count),
					}]
				},
				options: {
					responsive: true,
					plugins: {
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Party ahead/wins'
					}
					}
				},
			})
		}
		partyVotePc = partyVotesData.filter(
			q => bigp.includes(q.party)
		).toSorted(
			(a, b) => b.vote_pc - a.vote_pc
		)
		if (canvasPartyVotePc) {
			chartPartyVotePc = new Chart(canvasPartyVotePc, {
				type: 'pie',
				data: {
					labels: partyVotePc.map(p => p.party),
					datasets: [{
						label: 'Vote %',
						data: partyVotePc.map(p => p.vote_pc),
					}]
				},
				options: {
					responsive: true,
					plugins: {
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Party vote %'
					}
					}
				},
			})
		}
	})


    // get heading, subheading for election 2026 page
	const path = '/election-2026';
	const dataItem = menuData.find((item) => item.href == path);
	const heading = dataItem.title;
	const subheading = dataItem.subtitle;


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

	// seat candidate details
    let targetSeatCandidates = $derived(
		candidatesDataStore.candidatesData.filter(c => c.seat === selectedSeat)
    )

	// seat top 2 candidates votes
    let seatTopCandidates = $derived(
		seatVotesData.filter(
			s => s.seat === selectedSeat
		).toSorted(
			(a, b) => b.votes - a.votes
		).slice(0, 2)
    )

    $effect(() => {
		divisions = getDivisions(seatsDataStore.seatsData)
		// if (!chart) return
		// chart.data = {
		// 	labels: ['jan', 'feb', 'mar'],
		// 	datasets: $state.snapshot([{
		// 		label: dataLabel,
		// 		data: ChartData,
		// 		backgroundColor: 'f24b13'
		// 	}])
		// }
		// chart.update()
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
</script>


<!-- /election-2026 page -->
<PageHeading {heading} {subheading} />

<div class="ui container">
	<div class="ui basic segment">
		<!-- map -->
		 <!-- pie chart party wins -->
		<div class="ui basic very padded segment canvas">
			<canvas bind:this={canvasPartyWins}></canvas>
		</div>
		 <!-- pie chart party vote % -->
		<div class="ui basic very padded segment canvas">
			<canvas bind:this={canvasPartyVotePc}></canvas>
		</div>
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
                    {#each targetSeatCandidates as candidate}
                        <CandidateCard candidate={candidate} />
                    {/each}
                </div>
            </div>
			<!-- <div class="ui basic very padded segment">
                <h3>Top 2 candidates</h3>
                <div class="ui four stackable cards">
                    {#each seatTopCandidates as candidate}
                        <CandidateVotesCard candidate={candidate} />
                    {/each}
                </div>
            </div> -->
        {/if}
    </div>
</div>

<style>
	.canvas {
		/* width: 100% !important;
		height: 100% !important; */
		display: none;
	}
</style>