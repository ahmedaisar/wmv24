<script>
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import { onMount } from 'svelte';
	import { rawCheckInDate, rawCheckOutDate, checkInDate, checkOutDate } from '$lib/components/misc/dateConverter.js';

	export let data;
	$: console.log($checkInDate, $checkOutDate);

	let currentPage = 1;
	let pageSize = 5;

	$: hotellist = hotels && paginate({ items: hotels, pageSize, currentPage });
	const hotels = data.hotels.filter((h) => {
		return (h.toa_label == 'resort' && h.quality.stars == '5') || h.quality.stars == '4';
	});

	const getStar = (star) => {
		switch (star) {
			case 1:
				return `<small class="fas fa-star"></small>`;
			case 2:
				return `<small class="fas fa-star"></small><small class="fas fa-star" </small>`;
			case 3:
				return `<small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small>`;
			case 4:
				return `<small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small>`;
			case 5:
				return `<small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small>`;

			default:
				return '';
		}
	};
	function liveSearch() {
		const targets = document.querySelectorAll('.js-liverSearch');
		if (!targets) return;

		targets.forEach((el) => {
			const search = el.querySelector('.js-search');
			const results = el.querySelector('.js-results');
			let searchTerm = '';

			results.querySelectorAll('.js-search-option').forEach((option) => {
				const title = option.querySelector('.js-search-option-target').innerHTML;

				option.addEventListener('click', () => {
					search.value = title;
					el.querySelector('.js-popup-window').classList.remove('-is-active');
				});
			});

			search.addEventListener('input', (event) => {
				searchTerm = event.target.value.toLowerCase();
				showList(searchTerm, results);

				results.querySelectorAll('.js-search-option').forEach((option) => {
					const title = option.querySelector('.js-search-option-target').innerHTML;

					option.addEventListener('click', () => {
						search.value = title;
						el.querySelector('.js-popup-window').classList.remove('-is-active');
					});
				});
			});
		});

		const showList = (searchTerm, resultsEl) => {
			resultsEl.innerHTML = '';

			hotels
				.filter((item) => item.name.toLowerCase().includes(searchTerm))
				.forEach((e) => {
					const div = document.createElement('div');

					div.innerHTML = `
          <button class="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option">
            <div class="d-flex">
              <div class="icon-location-2 text-light-1 text-20 pt-4"></div>
              <div class="ml-10">
                <div class="text-15 lh-12 fw-500 js-search-option-target" data-hotelid="${
									e.hs_id
								}">${e.name}</div>
                <div class="text-14 lh-12 text-light-1 mt-5">${
									e.location.address + ', ' + e.location.city
								}</div>
              </div>
            </div>
          </button>
        `;

					resultsEl.appendChild(div);
				});
		};
	}

 

	onMount(() => {
		liveSearch();

	 
	});
</script>

<svelte:head>
	<title>Weekly Most Booked Hotels & Resorts Maldives | Wheresmaldives.com</title>
	<meta name="description" content="Compare over 743+ popular resorts and hotels in Maldives" />
	<meta
		property="og:title"
		content="Wheresmaldives.com | Compare over 743+ popular resorts and hotels in Maldives"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.wheresmaldives.com/hotels" />
	<meta property="og:image" content="https://www.wheresmaldives.com/img/wmvlogo-no-text.png" />
	<meta
		property="og:description"
		content="Compare over 743+ popular resorts and hotels in Maldives"
	/>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@wheresmaldives" />
	<meta
		name="twitter:title"
		content="Wheresmaldives.com | Compare over 743+ popular resorts and hotels in Maldives"
	/>
	<meta
		name="twitter:description"
		content="Compare over 743+ popular resorts and hotels in Maldives"
	/>
	<meta name="twitter:image" content="https://www.wheresmaldives.com/img/wmvlogo-no-text.png" />

	<script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "Wheres Maldives",
      "url": "https://www.wheresmaldives.com/hotels",
      "logo": "https://www.wheresmaldives.com/img/wmvlogo-no-text.png"
    }
	</script>
</svelte:head>

<section class="pt-80 pb-40 bg-light-2">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<div class="mainSearch -col-3-big bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 mt-30">
					<div class="button-grid items-center">
						<div class="searchMenu-loc pl-20 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
							<div data-x-dd-click="searchMenu-loc">
								<h4 class="text-15 fw-500 ls-2 lh-16">Location</h4>

								<div class="text-15 text-light-1 ls-2 lh-16">
									<input
										autocomplete="off"
										type="search"
										placeholder="London"
										class="js-search js-dd-focus"
									/>
								</div>
							</div>

							<div
								class="searchMenu-loc__field shadow-2 js-popup-window"
								data-x-dd="searchMenu-loc"
								data-x-dd-toggle="-is-active"
							>
								<div class="bg-white px-30 py-30 sm:px-0 sm:py-15 rounded-4">
									<div class="y-gap-5 js-results" />
								</div>
							</div>
						</div>

						<div
							class="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar js-calendar-el" >
							<div data-x-dd-click="searchMenu-date">
								<h4 class="text-15 fw-500 ls-2 lh-16">Check in - Check out</h4>

								<div class="capitalize text-15 text-light-1 ls-2 lh-16">
									<span bind:textContent={$rawCheckInDate} contenteditable=true class="js-first-date">Wed 2 Mar</span>
									-
									<span bind:textContent={$rawCheckOutDate} contenteditable=true  class="js-last-date">Fri 11 Apr</span>
								</div>
							</div>

							<div
								class="searchMenu-date__field shadow-2"
								data-x-dd="searchMenu-date"
								data-x-dd-toggle="-is-active"
							>
								<div class="bg-white px-30 py-30 rounded-4">
									<div class="elCalendar js-calendar-el-calendar">
										<div
											class="elCalendar__slider js-calendar-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-autoheight"
										>
											<button
												class="elCalendar__sliderNav -prev flex-center js-calendar-slider-prev swiper-button-disabled"
												disabled=""
												tabindex="-1"
												aria-label="Previous slide"
												aria-controls="swiper-wrapper-4fdde5fb6a42dd8d"
												aria-disabled="true"
											>
												<i class="icon icon-chevron-left text-14" />
											</button>

											<button
												class="elCalendar__sliderNav -next flex-center js-calendar-slider-next"
												tabindex="0"
												aria-label="Next slide"
												aria-controls="swiper-wrapper-4fdde5fb6a42dd8d"
												aria-disabled="false"
											>
												<i class="icon icon-chevron-right text-14" />
											</button>
											<span class="swiper-notification" aria-live="assertive" aria-atomic="true" />
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="searchMenu-guests px-30 lg:py-20 lg:px-0 js-form-dd js-form-counters">
							<div data-x-dd-click="searchMenu-guests">
								<h4 class="text-15 fw-500 ls-2 lh-16">Guest</h4>

								<div class="text-15 text-light-1 ls-2 lh-16">
									<span class="js-count-adult">2</span> adults -
									<span class="js-count-child">1</span> childeren -
									<span class="js-count-room">1</span> room
								</div>
							</div>

							<div
								class="searchMenu-guests__field shadow-2"
								data-x-dd="searchMenu-guests"
								data-x-dd-toggle="-is-active"
							>
								<div class="bg-white px-30 py-30 rounded-4">
									<div class="row y-gap-10 justify-between items-center">
										<div class="col-auto">
											<div class="text-15 fw-500">Adults</div>
										</div>

										<div class="col-auto">
											<div
												class="d-flex items-center js-counter"
												data-value-change=".js-count-adult"
											>
												<button
													class="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
												>
													<i class="icon-minus text-12" />
												</button>

												<div class="flex-center size-20 ml-15 mr-15">
													<div class="text-15 js-count">2</div>
												</div>

												<button class="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up">
													<i class="icon-plus text-12" />
												</button>
											</div>
										</div>
									</div>

									<div class="border-top-light mt-24 mb-24" />

									<div class="row y-gap-10 justify-between items-center">
										<div class="col-auto">
											<div class="text-15 lh-12 fw-500">Children</div>
											<div class="text-14 lh-12 text-light-1 mt-5">Ages 0 - 17</div>
										</div>

										<div class="col-auto">
											<div
												class="d-flex items-center js-counter"
												data-value-change=".js-count-child"
											>
												<button
													class="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
												>
													<i class="icon-minus text-12" />
												</button>

												<div class="flex-center size-20 ml-15 mr-15">
													<div class="text-15 js-count">1</div>
												</div>

												<button class="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up">
													<i class="icon-plus text-12" />
												</button>
											</div>
										</div>
									</div>

									<div class="border-top-light mt-24 mb-24" />

									<div class="row y-gap-10 justify-between items-center">
										<div class="col-auto">
											<div class="text-15 fw-500">Rooms</div>
										</div>

										<div class="col-auto">
											<div
												class="d-flex items-center js-counter"
												data-value-change=".js-count-room"
											>
												<button
													class="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
												>
													<i class="icon-minus text-12" />
												</button>

												<div class="flex-center size-20 ml-15 mr-15">
													<div class="text-15 js-count">1</div>
												</div>

												<button class="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up">
													<i class="icon-plus text-12" />
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="button-item">
							<button
								class="mainSearch__submit button -dark-1 py-15 px-40 col-12 rounded-4 bg-blue-1 text-white"
							>
								<i class="icon-search text-20 mr-10" />
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="layout-pt-md layout-pb-lg">
	<div class="container">
		<div class="row y-gap-30">
			<div class="col-xl-3 col-lg-4 lg:d-none">
				<aside class="sidebar y-gap-40">
					<div class="sidebar__item -no-border">
						<h5 class="text-18 fw-500 mb-10">Search by resort name</h5>
						<div class="single-field relative d-flex items-center py-10">
							<input
								class="pl-50 border-light text-dark-1 h-50 rounded-8"
								type="email"
								placeholder="e.g. bandos maldives"
							/>
							<button class="absolute d-flex items-center h-full">
								<i class="icon-search text-20 px-15 text-dark-1" />
							</button>
						</div>
					</div>

					<div class="sidebar__item">
						<h5 class="text-18 fw-500 mb-10">Deals</h5>
						<div class="sidebar-checkbox">
							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>
										<div class="text-15 ml-10">Free cancellation</div>
									</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>
										<div class="text-15 ml-10">Reserve now, pay at resort</div>
									</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>
										<div class="text-15 ml-10">Properties with special offers</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="sidebar__item">
						<h5 class="text-18 fw-500 mb-10">Popular Filters</h5>
						<div class="sidebar-checkbox">
							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>
										<div class="text-15 ml-10">Breakfast Included</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">92</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>
										<div class="text-15 ml-10">Romantic</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">45</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>
										<div class="text-15 ml-10">Airport Transfer</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">21</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>
										<div class="text-15 ml-10">WiFi Included</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">78</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>
										<div class="text-15 ml-10">5 Star</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">679</div>
								</div>
							</div>
						</div>
					</div>

					<div class="sidebar__item pb-30">
						<h5 class="text-18 fw-500 mb-10">Nightly Price</h5>
						<div class="row x-gap-10 y-gap-30">
							<div class="col-12">
								<div class="js-price-rangeSlider">
									<div class="text-14 fw-500" />

									<div class="d-flex justify-between mb-20">
										<div class="text-15 text-dark-1">
											<span class="js-lower">$0</span>
											-
											<span class="js-upper">$500</span>
										</div>
									</div>

									<div class="px-5">
										<div class="js-slider noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr">
											<div class="noUi-base">
												<div class="noUi-connects">
													<div
														class="noUi-connect"
														style="transform: translate(0%, 0px) scale(0.25, 1);"
													/>
												</div>
												<div
													class="noUi-origin"
													style="transform: translate(-100%, 0px); z-index: 5;"
												>
													<div
														class="noUi-handle noUi-handle-lower"
														data-handle="0"
														tabindex="0"
														role="slider"
														aria-orientation="horizontal"
														aria-valuemin="0.0"
														aria-valuemax="500.0"
														aria-valuenow="0.0"
														aria-valuetext="$0"
													>
														<div class="noUi-touch-area" />
													</div>
												</div>
												<div
													class="noUi-origin"
													style="transform: translate(-75%, 0px); z-index: 6;"
												>
													<div
														class="noUi-handle noUi-handle-upper"
														data-handle="1"
														tabindex="0"
														role="slider"
														aria-orientation="horizontal"
														aria-valuemin="0.0"
														aria-valuemax="2000.0"
														aria-valuenow="500.0"
														aria-valuetext="$500"
													>
														<div class="noUi-touch-area" />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="sidebar__item">
						<h5 class="text-18 fw-500 mb-10">Star Rating</h5>
						<div class="row x-gap-10 y-gap-10 pt-10">
							<div class="col-auto">
								<a href="#" class="button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100"
									>1</a
								>
							</div>

							<div class="col-auto">
								<a href="#" class="button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100"
									>2</a
								>
							</div>

							<div class="col-auto">
								<a href="#" class="button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100"
									>3</a
								>
							</div>

							<div class="col-auto">
								<a href="#" class="button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100"
									>4</a
								>
							</div>

							<div class="col-auto">
								<a href="#" class="button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100"
									>5</a
								>
							</div>
						</div>
					</div>

					<div class="sidebar__item">
						<h5 class="text-18 fw-500 mb-10">Guest Rating</h5>
						<div class="sidebar-checkbox">
							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="form-radio d-flex items-center">
										<div class="radio">
											<input type="radio" name="name" />
											<div class="radio__mark">
												<div class="radio__icon" />
											</div>
										</div>
										<div class="ml-10">Any</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">92</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="form-radio d-flex items-center">
										<div class="radio">
											<input type="radio" name="name" />
											<div class="radio__mark">
												<div class="radio__icon" />
											</div>
										</div>
										<div class="ml-10">Wonderful 4.5+</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">45</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="form-radio d-flex items-center">
										<div class="radio">
											<input type="radio" name="name" />
											<div class="radio__mark">
												<div class="radio__icon" />
											</div>
										</div>
										<div class="ml-10">Very good 4+</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">21</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="form-radio d-flex items-center">
										<div class="radio">
											<input type="radio" name="name" />
											<div class="radio__mark">
												<div class="radio__icon" />
											</div>
										</div>
										<div class="ml-10">Good 3.5+</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">78</div>
								</div>
							</div>
						</div>
					</div>

					<div class="sidebar__item">
						<h5 class="text-18 fw-500 mb-10">Holiday type</h5>
						<div class="sidebar-checkbox">
							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" name="name" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>

										<div class="text-15 ml-10">Budget</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">92</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" name="name" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>

										<div class="text-15 ml-10">Mid-range</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">45</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" name="name" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>

										<div class="text-15 ml-10">Luxury</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">21</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" name="name" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>

										<div class="text-15 ml-10">Family-friendly</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">78</div>
								</div>
							</div>

							<div class="row y-gap-10 items-center justify-between">
								<div class="col-auto">
									<div class="d-flex items-center">
										<div class="form-checkbox">
											<input type="checkbox" name="name" />
											<div class="form-checkbox__mark">
												<div class="form-checkbox__icon icon-check" />
											</div>
										</div>

										<div class="text-15 ml-10">Business</div>
									</div>
								</div>

								<div class="col-auto">
									<div class="text-15 text-light-1">679</div>
								</div>
							</div>
						</div>
					</div>
				</aside>
			</div>

			<div class="col-xl-9 col-lg-8">
				<div class="row y-gap-10 items-center justify-between">
					<div class="col-auto">
						<div class="text-18"><span class="fw-500">3,269 properties</span> in Europe</div>
					</div>

					<div class="col-auto">
						<div class="row x-gap-20 y-gap-20">
							<div class="col-auto">
								<button
									class="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
								>
									<i class="icon-up-down text-14 mr-10" />
									Top picks for your search
								</button>
							</div>

							<div class="col-auto d-none lg:d-block">
								<button
									data-x-click="filterPopup"
									class="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
								>
									<i class="icon-up-down text-14 mr-10" />
									Filter
								</button>
							</div>
						</div>
					</div>
				</div>

				<div class="filterPopup bg-white" data-x="filterPopup" data-x-toggle="-is-active">
					<aside class="sidebar -mobile-filter">
						<div data-x-click="filterPopup" class="-icon-close">
							<i class="icon-close" />
						</div>

						<div class="sidebar__item">
							<div
								class="flex-center ratio ratio-15:9 js-lazy loaded"
								data-ll-status="loaded"
								style="background-image: url(&quot;img/general/map.png&quot;);"
							>
								<button
									class="button py-15 px-24 -blue-1 bg-white text-dark-1 absolute"
									data-x-click="mapFilter"
								>
									<i class="icon-destination text-22 mr-10" />
									Show on map
								</button>
							</div>
						</div>

						<div class="sidebar__item">
							<h5 class="text-18 fw-500 mb-10">Search by property name</h5>
							<div class="single-field relative d-flex items-center py-10">
								<input
									class="pl-50 border-light text-dark-1 h-50 rounded-8"
									type="email"
									placeholder="e.g. Best Western"
								/>
								<button class="absolute d-flex items-center h-full">
									<i class="icon-search text-20 px-15 text-dark-1" />
								</button>
							</div>
						</div>

						<div class="sidebar__item">
							<h5 class="text-18 fw-500 mb-10">Deals</h5>
							<div class="sidebar-checkbox">
								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>
											<div class="text-15 ml-10">Free cancellation</div>
										</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>
											<div class="text-15 ml-10">Reserve now, pay at stay</div>
										</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>
											<div class="text-15 ml-10">Properties with special offers</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="sidebar__item">
							<h5 class="text-18 fw-500 mb-10">Popular Filters</h5>
							<div class="sidebar-checkbox">
								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>
											<div class="text-15 ml-10">Breakfast Included</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">92</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>
											<div class="text-15 ml-10">Romantic</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">45</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>
											<div class="text-15 ml-10">Airport Transfer</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">21</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>
											<div class="text-15 ml-10">WiFi Included</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">78</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>
											<div class="text-15 ml-10">5 Star</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">679</div>
									</div>
								</div>
							</div>
						</div>

						<div class="sidebar__item pb-30">
							<h5 class="text-18 fw-500 mb-10">Nightly Price</h5>
							<div class="row x-gap-10 y-gap-30">
								<div class="col-12">
									<div class="js-price-rangeSlider">
										<div class="text-14 fw-500" />

										<div class="d-flex justify-between mb-20">
											<div class="text-15 text-dark-1">
												<span class="js-lower">$0</span>
												-
												<span class="js-upper">$500</span>
											</div>
										</div>

										<div class="px-5">
											<div class="js-slider noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr">
												<div class="noUi-base">
													<div class="noUi-connects">
														<div
															class="noUi-connect"
															style="transform: translate(0%, 0px) scale(0.25, 1);"
														/>
													</div>
													<div
														class="noUi-origin"
														style="transform: translate(-100%, 0px); z-index: 5;"
													>
														<div
															class="noUi-handle noUi-handle-lower"
															data-handle="0"
															tabindex="0"
															role="slider"
															aria-orientation="horizontal"
															aria-valuemin="0.0"
															aria-valuemax="500.0"
															aria-valuenow="0.0"
															aria-valuetext="$0"
														>
															<div class="noUi-touch-area" />
														</div>
													</div>
													<div
														class="noUi-origin"
														style="transform: translate(-75%, 0px); z-index: 6;"
													>
														<div
															class="noUi-handle noUi-handle-upper"
															data-handle="1"
															tabindex="0"
															role="slider"
															aria-orientation="horizontal"
															aria-valuemin="0.0"
															aria-valuemax="2000.0"
															aria-valuenow="500.0"
															aria-valuetext="$500"
														>
															<div class="noUi-touch-area" />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="sidebar__item">
							<h5 class="text-18 fw-500 mb-10">Amenities</h5>
							<div class="sidebar-checkbox">
								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Breakfast Included</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">92</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">WiFi Included</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">45</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Pool</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">21</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Restaurant</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">78</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Air conditioning</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">679</div>
									</div>
								</div>
							</div>
						</div>

						<div class="sidebar__item">
							<h5 class="text-18 fw-500 mb-10">Star Rating</h5>
							<div class="row y-gap-10 x-gap-10 pt-10">
								<div class="col-auto">
									<a href="#" class="button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100"
										>1</a
									>
								</div>

								<div class="col-auto">
									<a href="#" class="button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100"
										>2</a
									>
								</div>

								<div class="col-auto">
									<a href="#" class="button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100"
										>3</a
									>
								</div>

								<div class="col-auto">
									<a href="#" class="button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100"
										>4</a
									>
								</div>

								<div class="col-auto">
									<a href="#" class="button -blue-1 bg-blue-1-05 text-blue-1 py-5 px-20 rounded-100"
										>5</a
									>
								</div>
							</div>
						</div>

						<div class="sidebar__item">
							<h5 class="text-18 fw-500 mb-10">Guest Rating</h5>
							<div class="sidebar-checkbox">
								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="form-radio d-flex items-center">
											<div class="radio">
												<input type="radio" name="name" />
												<div class="radio__mark">
													<div class="radio__icon" />
												</div>
											</div>
											<div class="ml-10">Any</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">92</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="form-radio d-flex items-center">
											<div class="radio">
												<input type="radio" name="name" />
												<div class="radio__mark">
													<div class="radio__icon" />
												</div>
											</div>
											<div class="ml-10">Wonderful 4.5+</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">45</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="form-radio d-flex items-center">
											<div class="radio">
												<input type="radio" name="name" />
												<div class="radio__mark">
													<div class="radio__icon" />
												</div>
											</div>
											<div class="ml-10">Very good 4+</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">21</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="form-radio d-flex items-center">
											<div class="radio">
												<input type="radio" name="name" />
												<div class="radio__mark">
													<div class="radio__icon" />
												</div>
											</div>
											<div class="ml-10">Good 3.5+</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">78</div>
									</div>
								</div>
							</div>
						</div>

						<div class="sidebar__item">
							<h5 class="text-18 fw-500 mb-10">Style</h5>
							<div class="sidebar-checkbox">
								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Budget</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">92</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Mid-range</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">45</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Luxury</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">21</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Family-friendly</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">78</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Business</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">679</div>
									</div>
								</div>
							</div>
						</div>

						<div class="sidebar__item">
							<h5 class="text-18 fw-500 mb-10">Neighborhood</h5>
							<div class="sidebar-checkbox">
								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Central London</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">92</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Guests' favourite area</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">45</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Westminster Borough</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">21</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Kensington and Chelsea</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">78</div>
									</div>
								</div>

								<div class="row items-center justify-between">
									<div class="col-auto">
										<div class="d-flex items-center">
											<div class="form-checkbox">
												<input type="checkbox" name="name" />
												<div class="form-checkbox__mark">
													<div class="form-checkbox__icon icon-check" />
												</div>
											</div>

											<div class="text-15 ml-10">Oxford Street</div>
										</div>
									</div>

									<div class="col-auto">
										<div class="text-15 text-light-1">679</div>
									</div>
								</div>
							</div>
						</div>
					</aside>
				</div>

				<div class="mt-30" />

				<div class="row y-gap-30">
					{#each hotellist as hotel}
						<div class="col-12">
							<div class="border-top-light pt-30">
								<div class="row x-gap-20 y-gap-20">
									<div class="col-md-auto">
										<div class="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
											<div class="cardImage__content">
												<div
													class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
												>
													<div
														class="swiper-wrapper"
														id="swiper-wrapper-eadcdb9871a94b52"
														aria-live="polite"
														style="transition-duration: 0ms; transform: translate3d(-250px, 0px, 0px);"
													>
														{#each hotel.images as img}
															<div
																class="swiper-slide swiper-slide-active"
																data-swiper-slide-index="0"
																role="group"
																aria-label="1 / 3"
																style="width: 300px;"
															>
																<img
																	class="col-12"
																	src="https://img1.hotelscan.com/640_440/1/{img.image_id}.jpg"
																	alt="image"
																	style="width: 100% important; height:auto"
																/>
															</div>
														{/each}
													</div>

													<div
														class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"
													>
														<div
															class="pagination__item is-active"
															tabindex="0"
															role="button"
															aria-label="Go to slide 1"
															aria-current="true"
														/>
														<div
															class="pagination__item"
															tabindex="0"
															role="button"
															aria-label="Go to slide 2"
														/>
														<div
															class="pagination__item"
															tabindex="0"
															role="button"
															aria-label="Go to slide 3"
														/>
													</div>

													<div class="cardImage-slider__nav -prev">
														<button
															class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev"
															tabindex="0"
															aria-label="Previous slide"
															aria-controls="swiper-wrapper-eadcdb9871a94b52"
														>
															<i class="icon-chevron-left text-10" />
														</button>
													</div>

													<div class="cardImage-slider__nav -next">
														<button
															class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
															tabindex="0"
															aria-label="Next slide"
															aria-controls="swiper-wrapper-eadcdb9871a94b52"
														>
															<i class="icon-chevron-right text-10" />
														</button>
													</div>
													<span
														class="swiper-notification"
														aria-live="assertive"
														aria-atomic="true"
													/>
												</div>
											</div>

											<div class="cardImage__wishlist">
												<button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
													<i class="icon-heart text-12" />
												</button>
											</div>
										</div>
									</div>

									<div class="col-md">
										<h3 class="text-18 lh-16 fw-500">
											{hotel.name}<br class="lg:d-none" />
											{hotel.location.address}

											<div class="d-inline-block ml-10">
												<i class="icon-star text-10 text-yellow-2" />
												<i class="icon-star text-10 text-yellow-2" />
												<i class="icon-star text-10 text-yellow-2" />
												<i class="icon-star text-10 text-yellow-2" />
												<i class="icon-star text-10 text-yellow-2" />
											</div>
										</h3>

										<div class="row x-gap-10 y-gap-10 items-center pt-10">
											<div class="col-auto">
												<p class="text-14">{hotel.location.address}</p>
											</div>

											<div class="col-auto">
												<button
													data-x-click="mapFilter"
													class="d-block text-14 text-blue-1 underline">Show on map</button
												>
											</div>

											<div class="col-auto">
												<div class="size-3 rounded-full bg-light-1" />
											</div>

											<div class="col-auto">
												<p class="text-14">2 km to city center</p>
											</div>
										</div>

										<div class="text-14 lh-15 mt-20">
											<div class="fw-500">King Room</div>
											<div class="text-light-1">1 extra-large double bed</div>
										</div>

										<div class="text-14 text-green-2 lh-15 mt-10">
											<div class="fw-500">Free cancellation</div>
											<div class="">You can cancel later, so lock in this great price today.</div>
										</div>

										<div class="row x-gap-10 y-gap-10 pt-20">
											<div class="col-auto">
												<div class="border-light rounded-100 py-5 px-20 text-14 lh-14">
													Breakfast
												</div>
											</div>

											<div class="col-auto">
												<div class="border-light rounded-100 py-5 px-20 text-14 lh-14">WiFi</div>
											</div>

											<div class="col-auto">
												<div class="border-light rounded-100 py-5 px-20 text-14 lh-14">Spa</div>
											</div>

											<div class="col-auto">
												<div class="border-light rounded-100 py-5 px-20 text-14 lh-14">Bar</div>
											</div>
										</div>
									</div>

									<div class="col-md-auto text-right md:text-left">
										<div class="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
											<div class="col-auto">
												<div class="text-14 lh-14 fw-500">Exceptional</div>
												<div class="text-14 lh-14 text-light-1">
													{hotel.quality && hotel.quality.review_count} reviews
												</div>
											</div>
											<div class="col-auto">
												<div
													class="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1"
												>
													{hotel.quality && hotel.quality.review_rating}
												</div>
											</div>
										</div>

										<div class="">
											<a href="#" class="button -md -dark-1 bg-blue-1 text-white mt-24">
												See Availability <div class="icon-arrow-top-right ml-15" />
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
				<div class="pt-20">
					<LightPaginationNav
						totalItems={hotels.length}
						{pageSize}
						{currentPage}
						limit={2}
						showStepOptions={true}
						on:setPage={(e) => (currentPage = e.detail.page)}
					/>
				</div>
			</div>
		</div>
	</div>
</section>
