<script>
    let { data } = $props();

    // create the comparison table data from json
	const comparison_data = data.comparison.points.map(point => {
		const cells = data.comparison.systems.map(system => {
			const item = data.comparison.table_data.find(item => item.system == system)
			return item[point]
		})
		return [point, ...cells]
	})
</script>

<!-- /electoral-systems comparison table -->
<div class="ui container">
	<div class="ui basic padded segment">
        <div class="table-wrapper">
            <table class="ui definition compact unstackable table">
                <thead>
                    <tr>
                        <th></th>
                        {#each data.comparison.systems as system}
                            <th>{system}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each comparison_data as row}
                        <tr>
                            {#each row as cell}
                                <td>{cell}</td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
	</div>
</div> 

<style>
    .table-wrapper {
        overflow-x: auto;
    }
    table {
        width: 100%;
        margin-bottom: 4rem !important;
    }
</style>