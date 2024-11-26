<script>
	let { section, name } = $props();
</script>

<!-- data section -->
<div class="btn">
	<!-- <DataTable data={filedata.data} /> -->
	<div>
		<a
			href={`https://github.com/muhallilahnaf/bd-elections-eda/blob/master/dataout/${section.file_name}`}
			download={section.file_name}
			target="_blank"
		>
			<button class="tiny ui compact labeled icon primary button">
				<i class="arrow down icon"></i>
				<span> Download full analysis result (.csv)</span>
			</button>
		</a>
	</div>
	<!-- <DataTable data={filedata.data} /> -->
	<div>
		<a
			href={`https://github.com/muhallilahnaf/bd-elections-eda/blob/master/${name}.ipynb`}
			target="_blank"
		>
			<button class="tiny ui compact labeled icon primary button">
				<i class="external alternate icon"></i>
				View notebook (.ipynb)
			</button>
		</a>
	</div>
</div>

<style>
	.btn {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.btn > :first-child {
		margin-right: 3rem;
		margin-bottom: 2rem;
	}
</style>
