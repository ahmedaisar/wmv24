<script>
	import Header from '$lib/components/home/header.svelte';
	import Footer from '$lib/components/common/footer.svelte';

</script>

<main>
	<Header />

	<slot />

	<Footer />
</main>
