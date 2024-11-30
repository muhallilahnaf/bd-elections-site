<script>
	let { section, nblink, folder } = $props();
</script>

<!-- /analysis data section -->
<div class="btn-container">
	<!-- data view btn -->
	<div>
		<a href={`${folder}${section.file_name}`} target="_blank">
			<button class="tiny ui compact labeled icon primary button">
				<i class="arrow right icon"></i>
				<span> View full analysis result (.csv)</span>
			</button>
		</a>
	</div>
	<!-- notebook link -->
	<div>
		<a href={nblink} target="_blank">
			<button class="tiny ui compact labeled icon primary button">
				<i class="external alternate icon"></i>
				View notebook (.ipynb)
			</button>
		</a>
	</div>
</div>

<style>
	.btn-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.btn-container > :first-child {
		margin-right: 3rem;
		margin-bottom: 2rem;
	}
</style>
