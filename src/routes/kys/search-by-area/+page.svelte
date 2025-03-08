<script>
	import PageHeading from '$lib/components/PageHeading.svelte';
    import BackButton from '$lib/components/BackButton.svelte';
	import { onMount } from 'svelte';
	import {extract, partial_ratio} from 'fuzzball'
	import seatsDataStore from '$lib/store/seatsData.svelte';

	const heading = "Search by area";
	const subheading = "Find your electoral seat by searching your area or upazila.";

	// display results
	let areaResults = $state([])

	// fuzzball options
	const options = {
		processor: choice => choice.seat_areas,
		scorer: partial_ratio,
		limit: 5
	}

	// display the search results on searching area
	const handleSubmitInput = (e) => {
		e.preventDefault()
		const area = e.target.area.value
        const results = extract(area, seatsDataStore.seatsData, options)
		areaResults = results.map(item => item[0]);
	}

</script>


<!-- /kys/search-by-area page -->

<!-- back to /kys -->
<BackButton route="/kys" text="seats page" />

<PageHeading {heading} {subheading} />

<div class="ui container">
	<div class="ui very padded basic segment">		
		<!-- area search form -->
		<div class="ui horizontally fitted basic segment">
			<form class="ui small form" onsubmit={handleSubmitInput}>
				<div class="field">
					<label for="area">Type your area/upazila name:</label>
					<input type="text" id="area" name="area" placeholder="Sonargaon Upazila">
				</div>
				<button class="ui button" type="submit">Submit</button>
			</form>
		</div>
		<div class="ui vertically fitted basic segment">
			<div class="ui list">
				{#each areaResults as result}						
					<div class="item">
						<div class="content">
							<div class="header">
								<a href={"/kys/seat-details/" + encodeURI(result.seat)}>{result.seat}</a>
							</div>
							<div class="description">{result.seat_areas}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>


<style>
	.list .item {
		margin-bottom: 1.5rem;
	}
	.description {
		margin-top: 0.5rem;
	}
	.header {
		text-decoration: underline;
	}
</style>