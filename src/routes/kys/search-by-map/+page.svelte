<script>
	import PageHeading from '$lib/components/PageHeading.svelte';
    import BackButton from '$lib/components/BackButton.svelte';
	import 'leaflet/dist/leaflet.css'
	import { onMount } from 'svelte';
    import geojsonLookup from 'geojson-geometries-lookup'

	const heading = "Search by map";
	const subheading = "Find your electoral seat by choosing your location in the map.";

    const start_lat = 23.73813
	const start_lng = 90.39582
	let coords = $state([start_lat, start_lng])
    let seatData = $state({})
    let glookup = $derived(new geojsonLookup(seatData))
    let message = $state('')
	let seatName = $state('')
	let seatNo = $state('')
	let district = $state('')

    // read geojson file
    const readGeojson = async (path) => {
        const res = await fetch(path)
        const geojson = await res.json()
        return geojson
    }


	// leaflet map
	onMount(async () => {

		const L = (await import('leaflet')).default;

		// store marker
		let markers = new Array()
		
		// create map
		const zoom_level = 15
		const map = L.map('map').setView([start_lat, start_lng], zoom_level)

		// add google street view layer
		const googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
			maxZoom: 20,
			subdomains:['mt0','mt1','mt2','mt3']
		})
		googleStreets.addTo(map)

		// add marker on clicking map
		map.on('click', (e) => {
			if (markers.length > 0) {
				map.removeLayer(markers[0])
				markers = new Array()
			}
			// get clicked coords
			const lat = e.latlng.lat
			const lng = e.latlng.lng
            coords = [lat,lng]
			// add new marker
			const newMarker = new L.Marker(coords)
			markers.push(newMarker)
			markers[0].addTo(map)
		})

        // read seat geojson data and create lookup object
        seatData = await readGeojson('/data/seats.geojson')
        // glookup = new geojsonLookup(seatData);

	})

	const handleSubmitMap = (e) => {
		e.preventDefault()
        const point = {type: "Point", coordinates: coords.reverse()};
        const containers = glookup.getContainers(point);
        if (containers.features.length > 1) {
            message = 'multiple seats found, place your marker more accurately'
            return
        }
        if (containers.features.length == 0) {
            message = 'no seat found, place your marker inside BD in a valid location'
            return
        }
        if (containers.features.length == 1) {
            // message = JSON.stringify(containers.features[0].properties)
			message = 'seat found!'
			seatName = containers.features[0].properties.seat
			seatNo = containers.features[0].properties.seat_no
			district = containers.features[0].properties.district
            return
        }
	}
        
</script>

<!-- /kys/search-by-map page -->

<!-- back to /kys -->
<BackButton route="/kys" text="seats page" />

<PageHeading {heading} {subheading} />

<div class="ui container">
	<div class="ui basic segment">
        <div class="ui basic segment">
            <div id="map"></div>
        </div>
        <div class="ui basic segment">
            <form class="ui small form" onsubmit={handleSubmitMap}>
                <div class="field">
                    <label for="coords">Click on your location in the map</label>
                    <input type="text" id="coords" name="coords" readonly value={`lat: ${coords[0]}, long: ${coords[1]}`}>
                </div>
                <button class="ui button" type="submit">Submit</button>
            </form>
        </div>
        <div id="output">
			<p>{message}</p>
			{#if seatName !== ''}
				<p><b>Seat:&nbsp;</b>{seatName}</p>
				<p><b>Seat No:&nbsp;</b>{seatNo}</p>
				<p><b>District:&nbsp;</b>{district}</p>
				<a href={"/kys/seat-details/" + encodeURI(seatName)}>
					<button class="ui primary button">view details</button>
				</a>
			{/if}
		</div>
	</div>
</div>




<style>
    #map {
		width: 50%;
		height: 50vh;
		margin-bottom: 2rem;
	}
</style>