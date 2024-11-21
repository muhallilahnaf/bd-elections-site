<script>
    import PageHeading from '$lib/components/PageHeading.svelte'
    import Cards from '$lib/components/Cards.svelte'
    import analysisItems from '$lib/data/analysisItems.json'
</script>

<PageHeading/>

<div class="ui list">
    {#each analysisItems as item}
        <div class="item">{item.name}</div>
    {/each}
  </div>




<!-- <div class="ui segment">
    <iframe src="/swing_map.html" title="W3Schools Free Online Web Tutorials"></iframe>
</div> -->

<!-- <style>
    iframe {
        width: 80vw;
        height: 400px;
    }
</style> -->