<script>
    let {
		heading = '',
		rows = [],
        cols = []
	} = $props();
</script>

<div class="ui basic very padded segment">
    <h3>{heading}</h3>
    <div class="table-wrapper">
        <table class="ui very compact small unstackable celled table">
            <thead>
                <tr>
                    {#each cols as col}
                        <th>{col}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each rows as row}
                    <tr>
                        {#each cols as col}
                            <td>{row[col]}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .table-wrapper {
        overflow-x: auto;
    }
    table {
        width: 100%;
    }
</style>