<script>
    let { data_url, notebook_url, year } = $props();
</script>

<!-- /electoral-systems data section -->
<div class="ui basic padded segment">
    <div class="btn-container">
        <!-- data view btn -->
        <div>
            <a href={data_url.replace('@year@', year)} target="_blank">
                <button class="tiny ui compact labeled icon primary button">
                    <i class="arrow right icon"></i>
                    <span> View full analysis result (.csv)</span>
                </button>
            </a>
        </div>
        <!-- notebook link -->
        <div>
            <a href={notebook_url.replace('@year@', year)} target="_blank">
                <button class="tiny ui compact labeled icon primary button">
                    <i class="external alternate icon"></i>
                    View notebook (.ipynb)
                </button>
            </a>
        </div>
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