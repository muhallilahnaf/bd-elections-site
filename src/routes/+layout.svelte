<script>
	import { onMount } from 'svelte';

	onMount(() => {
        const jq = window.$;
		// jq('.special.cards .image').dimmer({
		// 	on: 'hover'
		// });
	});
</script>

<slot/>