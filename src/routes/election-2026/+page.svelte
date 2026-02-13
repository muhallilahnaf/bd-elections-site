<script>
	import Chart from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
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

	let canvasPartyAvgVotePc = $state(null)
	let chartPartyAvgVotePc = null
	let partyAvgVotePc = $state([])

	let canvasSeatAvgVotePc = $state(null)
	let chartSeatAvgVotePc = null
	let seatAvgVotePc = $state([])

	let seatVotesData = $state([])
	let partyVotesData = $state([])
	// const bigp = ['BNP', 'Jamaat', 'Islami Andolan Bangladesh', 'NCP', 'JaPa']
	const colors = {
		'BNP': '#F2C744', 
		'Jamaat': '#009036', 
		'Islami Andolan Bangladesh': '#671933', 
		'NCP': '#004c55', 
		'Independent': '#ed1b24',
	}


	onMount(async () => {
		Chart.register(ChartDataLabels);
		
		// fetch data
		seatVotesData = await readCSV('https://raw.githubusercontent.com/muhallilahnaf/election-2026-live/master/data/seat_votes_pa.csv')
		partyVotesData = await readCSV('https://raw.githubusercontent.com/muhallilahnaf/election-2026-live/master/data/party_votes_pa.csv')
		// console.log(seatVotesData.length);
		
		// party win count
		partyWins = partyVotesData.filter(p => p.count > 0).toSorted((a, b) => b.count - a.count)		
		if (canvasPartyWins) {
			chartPartyWins = new Chart(canvasPartyWins, {
				type: 'bar',
				data: {
					labels: partyWins.map(p => p.party),
					datasets: [{
						label: '',
						data: partyWins.map(p => p.count),
						backgroundColor: partyWins.map(p => {
							if (p.party in colors) return colors[p.party]
							return '#d3d3d3'
						}),
						datalabels: {
							color: '#333333',
							font: {
								weight: 'bold'
							}
      					}
					}]
				},
				options: {
					indexAxis: 'y',
					responsive: true,
					scales: {
						x: {
							grid: {
                				display: true
            				}
						},
						y: {
							grid: {
                				display: false
            				}
						}
					}
				}
			})
		}

		// party total vote pc
		partyVotePc = partyVotesData.toSorted((a, b) => b.total_vote_pc - a.total_vote_pc)
		if (canvasPartyVotePc) {
			chartPartyVotePc = new Chart(canvasPartyVotePc, {
				type: 'pie',
				data: {
					labels: partyVotePc.map(p => p.party),
					datasets: [{
						label: 'Vote %',
						data: partyVotePc.map(p => p.total_vote_pc),
						backgroundColor: partyVotePc.map(p => {
							if (p.party in colors) return colors[p.party]
							return '#d3d3d3'
						}),
						datalabels: {
        					anchor: 'end',
							color: '#333333',
							font: {
								weight: 'bold'
							}
      					}
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
						datalabels: {
							formatter: (value, context) => {
								if (value > 0.3) return value
								return ''
							}
						}
    				},
				}
			})
		}

		// party avg vote pc
		partyAvgVotePc = partyVotesData.toSorted((a, b) => b.avg_vote_pc - a.avg_vote_pc)
		if (canvasPartyAvgVotePc) {
			chartPartyAvgVotePc = new Chart(canvasPartyAvgVotePc, {
				type: 'pie',
				data: {
					labels: partyAvgVotePc.map(p => p.party),
					datasets: [{
						label: 'Avg Vote %',
						data: partyAvgVotePc.map(p => p.avg_vote_pc),
						backgroundColor: partyAvgVotePc.map(p => {
							if (p.party in colors) return colors[p.party]
							return '#d3d3d3'
						}),
						datalabels: {
        					anchor: 'end',
							color: '#333333',
							font: {
								weight: 'bold'
							}
      					}
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
						datalabels: {
							formatter: (value, context) => {
								if (value > 10) return value
								return ''
							}
						}
    				},
				}
			})
		}

		// seat average vote pc
		let seatAvgVotePcData = {}
		seatVotesData.forEach(s => {
			let vote_pc = parseFloat(s.vote_pc)
			vote_pc = Number.isNaN(vote_pc) ? 0 : vote_pc
			if (s.seat in seatAvgVotePcData) {
				seatAvgVotePcData[s.seat].push(vote_pc)
			} else {
				seatAvgVotePcData[s.seat] = [vote_pc]
			}
		})		
		seatAvgVotePc = Object.values(seatAvgVotePcData).map(s => s.reduce((acc, current) => acc+current, 0) / s.length)
		seatAvgVotePc = seatAvgVotePc.toSorted((a, b) => b-a)
		if (canvasSeatAvgVotePc) {
			chartSeatAvgVotePc = new Chart(canvasSeatAvgVotePc, {
				type: 'line',
				data: {
					labels: seatAvgVotePc.map(s => ''),
					datasets: [{
						label: 'Avg Vote %',
						data: Object.values(seatAvgVotePc),
					}],
				},
				options: {
					responsive: true,
					plugins: {
						datalabels: {
        					display: false,
						}
					}
				}
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
			s => s.seat === selectedSeat
		).toSorted(
			(a, b) => b.vote - a.vote
		).slice(0, 2)
    )

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
		<!-- pie chart party total vote % -->
		<div class="ui basic very padded segment canvas">
			<h3>Party vote % (out of total voters)</h3>
			<canvas bind:this={canvasPartyVotePc}></canvas>
		</div>
		<!-- pie chart party avg vote % -->
		<div class="ui basic very padded segment canvas">
			<h3>Party avg vote % (in their contested seats)</h3>
			<canvas bind:this={canvasPartyAvgVotePc}></canvas>
		</div>
		<!-- line chart seat avg vote % -->
		<div class="ui basic very padded segment canvas">
			<h3>Seat avg vote % (avg among top 2 candidates)</h3>
			<canvas bind:this={canvasSeatAvgVotePc}></canvas>
		</div>
		<!-- dropdowns -->
		<div class="ui basic very padded segment">
			<h3>Select a seat</h3>
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