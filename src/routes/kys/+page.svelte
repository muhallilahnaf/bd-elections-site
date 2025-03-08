<script>
	import PageHeading from '$lib/components/PageHeading.svelte';
    import menuData from '$lib/data/menuData.json'
	import { onMount } from 'svelte';
	import DataTable from 'datatables.net-dt';
	import 'datatables.net-dt/css/dataTables.dataTables.min.css'
	import seatsDataStore from '$lib/store/seatsData.svelte';
	import { browser } from '$app/environment';
	import {toTitleCase} from '$lib/helper'


    // get heading, subheading for analysis page
	const path = '/kys';
	const dataItem = menuData.find((item) => item.href == path);
	const heading = dataItem.title;
	const subheading = dataItem.subtitle;

	// get list of headers from csv string
	const getHeaders = () => {
		if (seatsDataStore.seatsData.length > 0) {
			return Object.keys(seatsDataStore.seatsData[0])
		}
		return []
	}

	// create DataTable
	const createDataTable = () => {
		return new DataTable('#seats', {searching: false, scrollY: '60vh'})
	}

	const addTableToDom = () => {
		// get html string for table head and body
		let tableHeadHtml = getTableHeadHtml()
		let tableBodyHtml = getTableBodyHtml()
		
		// add table to DOM
		document.getElementById('target').innerHTML = `
			<table id="seats" class="display">
				${tableHeadHtml}
				${tableBodyHtml}
			</table>
		`
	}

	// display results
	let headers = []
	let table
	const colWithSelectFilter = ['District', 'Division', 'Region']

	const renderTable = (seatsData) => {
		if (!browser) return
		headers = getHeaders()
		addTableToDom()
		table = createDataTable()
	}

	$effect(() => {
		renderTable(seatsDataStore.seatsData)
	})

	// create table body html string
	const getTableBodyHtml = () => {
		let bodyHtml = '<tbody>'
		seatsDataStore.seatsData.forEach(row => {
			let rowHtml = ''
			headers.forEach(h => {
				if (h == 'seat') {
					rowHtml += `
						<td>
							<a href="/kys/seat-details/${encodeURI(row[h])}">
								${row[h]}
							</a>
						</td>
					`
				} else {
					rowHtml += `<td>${row[h]}</td>`
				}
			})
			bodyHtml += `<tr>${rowHtml}</tr>`
		})
		bodyHtml += '</tbody>'
		return bodyHtml
	}

	// create table head html string
	const getTableHeadHtml = () => {
		let headHtml = '<thead><tr>'
		headers.forEach(h => {
			h = h.replace('_', ' ')
			h = toTitleCase(h)
			if (colWithSelectFilter.includes(h)) {
				headHtml += `<th class="no-sort">${h}</th>`
			} else {
				headHtml += `<th>${h}</th>`
			}
		})
		headHtml += '</tr></thead>'
		return headHtml
	}
</script>

<!-- /kys page -->
<PageHeading {heading} {subheading} />

<div class="ui container">
	<div class="ui basic segment">

		<!-- message box with link to search options -->
		<div class="ui padded basic segment">
			<div class="ui icon warning message">
				<i class="question circle outline icon"></i>
				<div class="content">
				  	<div class="header">Don't know your electoral seat?</div>
				  	<p>Find it using your location in the map or using your upazilla/area name.</p>
					<div class="buttons">
						<a href="/kys/search-by-map">
							<button class="ui primary button">Search by map</button>
						</a>
						<a href="/kys/search-by-area">
							<button class="ui primary button">Search by area</button>
						</a>
					</div>
				</div>
			  </div>
		</div>
		<h2>Select your electoral seat</h2>
		<div class="ui basic segment" id="target"></div>
	</div>
</div>

<style>
	.buttons button{
		margin: 0.5rem;
	}
</style>