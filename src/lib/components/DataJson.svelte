<script>
    let { data } = $props();    
    const dict = Object.fromEntries(data)
    const dictText = JSON.stringify(dict, null, 4)
</script>

<pre>{dictText}</pre>

<style>
    pre {
        overflow-x: auto;
    }
</style>