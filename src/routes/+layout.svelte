<script>
	import NavItems from '$lib/components/NavItems.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { onMount } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';

	onMount(() => {
		window.$('.ui.dropdown').dropdown({ action: 'select' });
	});
</script>

<!-- ROOT LAYOUT -->

<div class="ui grid">
	<!-- for desktop -->
	<!-- brand icon -->
	<div class="computer only row">
		<div class="column">
			<div class="ui container basic segment logo-container">
				<Logo />
			</div>
		</div>
	</div>
	<!-- for desktop -->
	<!-- navbar -->
	<div class="computer only row">
		<div class="column">
			<div class="ui menu">
				<header class="ui container">
					<NavItems />
				</header>
			</div>
		</div>
	</div>

	<!-- for mobile tablet -->
	<div class="tablet mobile only row">
		<!-- navbar -->
		<div class="six wide column">
			<div class="ui dropdown">
				<div class="text"><i class="bars icon"></i> Menu</div>
				<div class="ui menu">
					<NavItems />
				</div>
			</div>
		</div>
		<!-- brand icon -->
		<div class="ten wide column">
			<div class="ui basic right floated segment logo-container">
				<Logo />
			</div>
		</div>
	</div>
</div>

<slot />

<div class="page-end-gap"></div>

<Footer/>

<style>
	.computer.only .column {
		padding: 0 !important;
	}
	.ui.dropdown {
		margin-top: 2rem;
		margin-left: 2rem;
	}
	.tablet.mobile.only.row {
		padding-top: 0 !important;
	}
	.logo-container {
		margin-top: 1rem !important;
	}
	.row {
		padding: 0 !important;
	}
	.page-end-gap {
		margin-top: 5rem;
	}
</style>
