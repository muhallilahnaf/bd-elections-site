<script>
    let { folder, file_name, notebook_url, year } = $props();
</script>

<!-- /electoral-systems data section -->
<div class="ui basic padded segment">
    <div class="btn-container">
        <!-- data download btn -->
        <div>
            <a 
                href={folder + file_name.replace('@year@', year)} 
                download={file_name.replace('@year@', year)} 
                target="_blank"
            >
                <button class="tiny ui compact labeled icon primary button">
                    <i class="arrow down icon"></i>
                    <span> Download full analysis result (.csv)</span>
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