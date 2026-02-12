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
	let seatVotesPAData = $state([])
	let seatVotesPADataLatest = $state([])
	let partyVotesData = $state([])
	const bigp = ['BNP', 'Jamaat', 'Islami Andolan Bangladesh', 'NCP', 'JaPa']
	const colors = {
		'BNP': '#F2C744', 
		'Jamaat': '#004c55', 
		'Islami Andolan Bangladesh': '#671933', 
		'NCP': '#004c55', 
		'JaPa': '#ed1b24'
	}


	onMount(async () => {
		// seatVotesData = await readCSV('https://raw.githubusercontent.com/muhallilahnaf/election-2026-live/master/data/seat_votes.csv')
		seatVotesPAData = await readCSV('https://raw.githubusercontent.com/muhallilahnaf/election-2026-live/master/data/seat_votes_pa.csv')
		partyVotesData = await readCSV('https://raw.githubusercontent.com/muhallilahnaf/election-2026-live/master/data/party_votes.csv')
		// console.log(seatVotesData.length);
		if (seatVotesPAData.length > 0) {
			let latest = new Date(seatVotesPAData[0].time)
			seatVotesPAData.forEach(d => {
				if (new Date(d.time) > latest) {
					latest = new Date(d.time)
				}
			})
			seatVotesPADataLatest = seatVotesPAData.filter(d => new Date(d.time) == latest)
			console.log(seatVotesPAData);
			
		}
		partyWins = partyVotesData.filter(
			q => bigp.includes(q.party)
		).toSorted(
			(a, b) => b.count - a.count
		)		
		if (canvasPartyWins) {
			chartPartyWins = new Chart(canvasPartyWins, {
				type: 'bar',
				data: {
					labels: [''],
					datasets: partyWins.map(p => ({
						label: p.party,
						data: [p.count],
						backgroundColor: colors[p.party]
					}))
				},
				options: {
					indexAxis: 'y',
					responsive: true,
					scales: {
						x: {
							stacked: true,
							grid: {
                				display: false
            				}
						},
						y: {
							stacked: true,
							grid: {
                				display: false
            				}
						}
					}
				}
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
						backgroundColor: partyVotePc.map(p => colors[p.party])
					}]
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							display: true,
							position: 'bottom',
							align: 'center'
						},
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

	// get target seat candidate details
	const getTargetSeatCandidateDetails = (targetSeat) => {
		return candidatesDataStore.candidatesData.filter(c => c.seat === selectedSeat)
	}

	// seat candidate details
    let targetSeatCandidates = $derived(getTargetSeatCandidateDetails(selectedSeat))

	// seat top 2 candidates votes
    let seatTopCandidates = $derived(
		seatVotesData.filter(
			s => s.seat_name === selectedSeat
		).toSorted(
			(a, b) => b.vote - a.vote
		).slice(0, 2)
    )

	const getPALatest = (data) => {
		if (data.length > 0) {
			// console.log(data);
			let latest = new Date(data[0].time)
			// console.log(latest);
			
			data.forEach(d => {
				if (new Date(d.time) > latest) {
					latest = new Date(d.time)
				}
			})
			return data.filter(d => new Date(d.time) == latest)
		}
		return []
	}

	// let seatVotesPADataLatest = $derived(getPALatest(seatVotesPAData))

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
</script>


<!-- /election-2026 page -->
<PageHeading {heading} {subheading} />

<div class="ui container">
	<div class="ui basic segment">
		<!-- map -->
		<!-- pie chart party wins -->
		<div class="ui basic very padded segment canvas">
			<h3>Party ahead/won</h3>
			<canvas bind:this={canvasPartyWins}></canvas>
		</div>
		<!-- pie chart party vote % -->
		<div class="ui basic very padded segment canvas">
			<h3>Party vote % (out of total voters)</h3>
			<canvas bind:this={canvasPartyVotePc}></canvas>
		</div>
		<!-- all seats result -->
		<table>
			<thead>
				<tr>
					<th>seat</th>
					<th>party</th>
					<th>vote</th>
				</tr>
			</thead>
			<tbody>
				{#each seatVotesPADataLatest as data}
					<tr>
						<td>{data.seat}</td>
						<td>{data.party}</td>
						<td>{data.vote}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<!-- dropdowns -->
		<div class="ui basic very padded segment">
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
                <h3>Live update</h3>
                <div class="ui two stackable cards">
                    {#each seatTopCandidates as candidate}
                        <CandidateVotesCard candidate={candidate} />
                    {/each}
                </div>
            </div>
			<div class="ui basic very padded segment">
                <h3>Candidates</h3>
                <div class="ui four stackable cards">
                    {#each targetSeatCandidates as candidate}
                        <CandidateCard candidate={candidate} />
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
	.canvas {
		/* width: 100% !important; */
		height: 80vh !important;
		/* display: none; */
	}
</style>