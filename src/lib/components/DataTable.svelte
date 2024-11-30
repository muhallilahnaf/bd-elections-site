<script>
    let { data } = $props();    
    const headers = data[0].split(',');
    const rows = data.slice(1, 6).map(row => row.split(','));
</script>

<!-- data table -->
<div class="table-wrapper">
    <table class="ui very compact small unstackable table">
        <thead>
            <tr>
                {#each headers as header}
                    <th>{header}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each rows as row}
                <tr>
                    {#each row as cell}
                        <td>{cell}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .table-wrapper {
        overflow-x: auto;
    }
    table {
        width: 100%;
    }
</style>