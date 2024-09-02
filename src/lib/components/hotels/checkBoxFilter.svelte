<script>
	import { filters } from '$lib/stores/filterStore';
	export let category;
	export let name;
	export let label;
	export let count;
</script>

<div class="sidebar__item">
	<h5 class="text-18 fw-500 mb-10" data-svelte-h="svelte-yjkrfx">Filter by OTA</h5>
	<div class="sidebar-checkbox">
		<div class="row y-gap-10 items-center justify-between">
			<div class="col-auto">
				<div class="d-flex items-center">
					<div class="form-checkbox">
						<input type="checkbox" bind:checked={$filters[category][name]}/>
						<div class="form-checkbox__mark"><div class="form-checkbox__icon icon-check" /></div>
					</div>
					<div class="text-15 ml-10" data-svelte-h="svelte-1wzwzmh">Free cancellation</div>
				</div>
			</div>
		</div>
		<div class="row y-gap-10 items-center justify-between">
			<div class="col-auto">
				<div class="d-flex items-center">
					<div class="form-checkbox">
						<input type="checkbox" />
						<div class="form-checkbox__mark"><div class="form-checkbox__icon icon-check" /></div>
					</div>
					<div class="text-15 ml-10" data-svelte-h="svelte-2c8fmo">Reserve now, pay at resort</div>
				</div>
			</div>
		</div>
		<div class="row y-gap-10 items-center justify-between">
			<div class="col-auto">
				<div class="d-flex items-center">
					<div class="form-checkbox">
						<input type="checkbox" />
						<div class="form-checkbox__mark"><div class="form-checkbox__icon icon-check" /></div>
					</div>
					<div class="text-15 ml-10" data-svelte-h="svelte-7pe4kj">
						Properties with special offers
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
