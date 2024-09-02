<script>
	// @ts-nocheck
	import * as maldives from '$lib/data/maldives.json';
	import Header from '$lib/components/home/header.svelte';
	import Footer from '$lib/components/common/footer.svelte';
	import { derived } from 'svelte/store';

	import {
		rawCheckInDate,
		rawCheckOutDate,
		checkInDate,
		checkOutDate,
		initializeDateObserver
	} from '$lib/components/misc/dateConverter.js';

	import atolls from '$lib/data/atolls.json';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	$: hotels = data.hotels;

	let searchTerm = '';
	let filteredHotels = [];
	let hotelId;
	let selectedHotel;

	$: {
		if (searchTerm) {
			filteredHotels = hotels.filter((hotel) =>
				hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredHotels = hotels;
		}
	}


	const handleSearch = (e) => {
		e.preventDefault();		
		getHotelId()
		
		const checkIn = $checkInDate;
		const checkOut = $checkOutDate;

		if (hotelId) { 
			selectedHotel = $hotels.filter((sh) => {
			if(sh.hs_id == hotelId)
			return sh
		 })}
 

		if (selectedHotel) {
			searchHotels(checkIn, checkIn, 2, 0, selectedHotel)
		}
	}

	function countHotelsByAtoll(hotels) {
		const hotelCount = hotels.reduce((acc, hotel) => {
			const atoll = hotel.Atoll;
			acc[atoll] = (acc[atoll] || 0) + 1;
			return acc;
		}, {});

		// Convert the result into an array of objects with the desired format
		return Object.entries(hotelCount).map(([atoll, count]) => {
			return {
				Atoll: atoll,
				Hotels: count
			};
		});
		function countHotelsByAtoll(hotels) {
			const hotelCount = hotels.reduce((acc, hotel) => {
				const atoll = hotel.Atoll;
				acc[atoll] = (acc[atoll] || 0) + 1;
				return acc;
			}, {});

			// Convert the result into an array of objects
			return Object.entries(hotelCount)
				.map(([atoll, count]) => ({
					Atoll: atoll,
					Hotels: count
				}))
				.sort((a, b) => b['Hotels'] - a['Hotels']); // Sort by Total hotels (descending)
		}
	}

	const atlist = countHotelsByAtoll(atolls);

	function mapResortsByHolidayType(resorts) {
		const holidayTypes = {
			'All Inclusive': [],
			Honeymoon: [],
			Luxury: [],
			Wellness: [],
			'Family & kids': [],
			'Adults Only': []
		};

		resorts?.forEach((resort) => {
			// All Inclusive
			if (
				resort.name.toLowerCase().includes('all inclusive') ||
				(resort.themes && resort.themes.includes('all inclusive'))
			) {
				holidayTypes['All Inclusive'].push(resort);
			}

			// Honeymoon
			if (
				(resort.themes && resort.themes.includes('romantic')) ||
				(resort.short_description &&
					resort.short_description.toLowerCase().includes('romantic') &&
					resort.slug &&
					resort.slug.includes('romantic')) ||
				resort.slug.includes('wedding')
			) {
				holidayTypes['Honeymoon'].push(resort);
			}

			// Luxury
			if (
				(resort.quality && resort.quality.stars === 5) ||
				(resort.themes && resort.themes.includes('luxury')) ||
				(resort.short_description && resort.short_description.toLowerCase().includes('luxury'))
			) {
				holidayTypes['Luxury'].push(resort);
			}

			// Wellness
			if (
				(resort.themes && resort.themes.includes('spa_relax')) ||
				(resort.short_description && resort.short_description.toLowerCase().includes('wellness')) ||
				(resort.themes && resort.themes.includes('wellness'))
			) {
				holidayTypes['Wellness'].push(resort);
			}

			// Family & kids
			if (
				(resort.themes && resort.themes.includes('family')) ||
				(resort.short_description &&
					resort.short_description.toLowerCase().includes('family', 'kids'))
			) {
				holidayTypes['Family & kids'].push(resort);
			}

			// Adults Only
			if ((resort.slug && resort.slug.includes('private')) || resort.slug.includes('adults-only')) {
				holidayTypes['Adults Only'].push(resort);
			}
		});

		return holidayTypes;
	}

	// Create a derived store for holidays
	const holidays = derived(data.hotels, ($hotels) => mapResortsByHolidayType($hotels));

	const searchHotels = async (checkin, checkout, adults, child, hotel) => {
		goto(
			`/hotels?checkin=${checkin}&checkout=${checkout}&adults=${adults}&child=${child}&hotelId=${hotel[0].hs_id}`
		);
	};

	function getHotelId() {
    const element = document.querySelector('[data-hotelid]');
    if (element) {
      hotelId = element.dataset.hotelid;
    }
  }

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

			$hotels
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

		const cleanup = initializeDateObserver();
		return cleanup;
		 
	});

 
</script>

<svelte:head>
	<meta name="description" content="Compare over 743+ popular resorts and hotels in Maldives" />

	<meta
		property="og:title"
		content="Wheresmaldives.com | Compare over 743+ popular resorts and hotels in Maldives"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.wheresmaldives.com/" />
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
      "url": "https://www.wheresmaldives.com/",
      "logo": "https://www.wheresmaldives.com/img/wmvlogo-no-text.png"
    }
	</script>
</svelte:head>

<section data-anim-wrap="" class="masthead -type-7 animated">
	<div
		class="masthead-slider js-masthead-slider-7 swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
	>
		<div
			class="swiper-wrapper"
			id="swiper-wrapper-65030cdf9afdef62"
			aria-live="polite"
			style="transition-duration: 0ms; transform: translate3d(-1720px, 0px, 0px);"
		>
			<div
				class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
				data-swiper-slide-index="2"
				role="group"
				aria-label="3 / 3"
				style="width: 1720px;"
			>
				<div class="row justify-center text-center">
					<div class="col-auto">
						<div class="masthead__content">
							<div class="masthead__bg">
								<img src="img/hotels/mv/7.jpg" alt="image" />
							</div>

							<div data-anim-child="slide-up delay-1" class="text-white is-in-view">
								Discover resorts & hotels at exclusive deals
							</div>

							<h1
								data-anim-child="slide-up delay-2"
								class="text-60 lg:text-40 md:text-30 text-white is-in-view"
							>
								Maldives Awaits<br class="lg:d-none" /> For You
							</h1>
						</div>
					</div>
				</div>
			</div>

			<div
				class="swiper-slide swiper-slide-active"
				data-swiper-slide-index="0"
				role="group"
				aria-label="1 / 3"
				style="width: 1720px;"
			>
				<div class="row justify-center text-center">
					<div class="col-auto">
						<div class="masthead__content">
							<div class="masthead__bg">
								<img src="img/hotels/mv/15.jpg" alt="image" />
							</div>

							<div data-anim-child="slide-up delay-1" class="text-white is-in-view">
								Discover resorts & hotels at exclusive deals
							</div>

							<h1
								data-anim-child="slide-up delay-2"
								class="text-60 lg:text-40 md:text-30 text-white is-in-view"
							>
								Maldives Awaits<br class="lg:d-none" /> For You
							</h1>
						</div>
					</div>
				</div>
			</div>

			<div
				class="swiper-slide swiper-slide-next"
				data-swiper-slide-index="1"
				role="group"
				aria-label="2 / 3"
				style="width: 1720px;"
			>
				<div class="row justify-center text-center">
					<div class="col-auto">
						<div class="masthead__content">
							<div class="masthead__bg">
								<img src="img/hotels/mv/3.jpg" alt="image" />
							</div>

							<div data-anim-child="slide-up delay-1" class="text-white is-in-view">
								Discover resorts & hotels at exclusive deals
							</div>

							<h1
								data-anim-child="slide-up delay-2"
								class="text-60 lg:text-40 md:text-30 text-white is-in-view"
							>
								Maldives Awaits<br class="lg:d-none" /> For You
							</h1>
						</div>
					</div>
				</div>
			</div>

			<div
				class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
				data-swiper-slide-index="0"
				role="group"
				aria-label="1 / 3"
				style="width: 1720px;"
			>
				<div class="row justify-center text-center">
					<div class="col-auto">
						<div class="masthead__content">
							<div class="masthead__bg">
								<img src="img/hotels/mv/11.jpg" alt="image" />
							</div>

							<div data-anim-child="slide-up delay-1" class="text-white is-in-view">
								Discover resorts & hotels at exclusive deals
							</div>

							<h1
								data-anim-child="slide-up delay-2"
								class="text-60 lg:text-40 md:text-30 text-white is-in-view"
							>
								Maldives Awaits<br class="lg:d-none" /> For You
							</h1>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			class="masthead-slider__nav -prev js-prev"
			tabindex="0"
			role="button"
			aria-label="Previous slide"
			aria-controls="swiper-wrapper-65030cdf9afdef62"
		>
			<button class="button -outline-white text-white size-50 rounded-full">
				<i class="icon-arrow-left" />
			</button>
		</div>

		<div
			class="masthead-slider__nav -next js-next"
			tabindex="0"
			role="button"
			aria-label="Next slide"
			aria-controls="swiper-wrapper-65030cdf9afdef62"
		>
			<button class="button -outline-white text-white size-50 rounded-full">
				<i class="icon-arrow-right" />
			</button>
		</div>
		<span class="swiper-notification" aria-live="assertive" aria-atomic="true" />
	</div>

	<div
		data-anim-child="fade delay-3"
		class="mainSearch -w-900 bg-white px-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 rounded-100 shadow-2 mt-40 is-in-view"
	>
		<div class="button-grid items-center">
			<div class="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
				<div data-x-dd-click="searchMenu-loc">
					<h4 class="text-15 fw-500 ls-2 lh-16">Location</h4>

					<div class="text-15 text-light-1 ls-2 lh-16">
						<input
							autocomplete="off"
							type="search"
							placeholder="Where are you going?"
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

			<div class="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar js-calendar-el">
				<div data-x-dd-click="searchMenu-date">
					<h4 class="text-15 fw-500 ls-2 lh-16">Check in - Check out</h4>

					<div class="capitalize text-15 text-light-1 ls-2 lh-16">
						<span class="js-first-date">Wed 2 Mar</span>
						-
						<span class="js-last-date">Fri 11 Apr</span>
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
									aria-controls="swiper-wrapper-a05f2f9de341b60a"
									aria-disabled="true"
								>
									<i class="icon icon-chevron-left text-14" />
								</button>

								<button
									class="elCalendar__sliderNav -next flex-center js-calendar-slider-next"
									tabindex="0"
									aria-label="Next slide"
									aria-controls="swiper-wrapper-a05f2f9de341b60a"
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
								<div class="d-flex items-center js-counter" data-value-change=".js-count-adult">
									<button class="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down">
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
								<div class="d-flex items-center js-counter" data-value-change=".js-count-child">
									<button class="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down">
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
								<div class="d-flex items-center js-counter" data-value-change=".js-count-room">
									<button class="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down">
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
					class="mainSearch__submit button -blue-1 py-20 px-35 col-12 rounded-100 bg-dark-4 text-white"
				 on:click={handleSearch}>
					<i class="icon-search text-20 mr-10" />
					Search
				</button>
			</div>
		</div>
	</div>
</section>

<section class="layout-pt-md layout-pb-md header-mobile">
	<div data-anim-wrap="" class="container animated">
		<div
			data-anim-child="slide-up delay-1"
			class="row y-gap-20 justify-between items-end is-in-view"
		>
			<div class="col-auto">
				<div class="sectionTitle -md">
					<h2 class="sectionTitle__title">Choose Tour Types</h2>
					<p class=" sectionTitle__text mt-5 sm:mt-0">Interdum et malesuada fames ac ante ipsum</p>
				</div>
			</div>

			<div class="col-auto">
				<div class="d-flex x-gap-15 items-center">
					<div class="col-auto">
						<button
							class="d-flex items-center text-24 arrow-left-hover js-tour-prev swiper-button-disabled"
							disabled=""
							tabindex="-1"
							aria-label="Previous slide"
							aria-controls="swiper-wrapper-d147ad4f9a765c2b"
							aria-disabled="true"
						>
							<i class="icon icon-arrow-left" />
						</button>
					</div>

					<div class="col-auto">
						<div
							class="pagination -dots text-border js-tour-pag swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"
						>
							<div
								class="pagination__item is-active"
								tabindex="0"
								role="button"
								aria-label="Go to slide 1"
								aria-current="true"
							/>
							<div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2" />
							<div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3" />
							<div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 4" />
						</div>
					</div>

					<div class="col-auto">
						<button
							class="d-flex items-center text-24 arrow-right-hover js-tour-next"
							tabindex="0"
							aria-label="Next slide"
							aria-controls="swiper-wrapper-d147ad4f9a765c2b"
							aria-disabled="false"
						>
							<i class="icon icon-arrow-right" />
						</button>
					</div>
				</div>
			</div>
		</div>

		<div
			class="relative overflow-hidden pt-40 sm:pt-20 js-section-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-autoheight swiper-watch-progress swiper-backface-hidden"
			data-gap="30"
			data-scrollbar=""
			data-slider-cols="xl-5 lg-4 md-3 sm-2 base-1"
			data-nav-prev="js-tour-prev"
			data-pagination="js-tour-pag"
			data-nav-next="js-tour-next"
		>
			<div
				class="swiper-wrapper"
				id="swiper-wrapper-d147ad4f9a765c2b"
				aria-live="polite"
				style="height: 251px;"
			>
				{#each atlist as atoll}
					<div
						data-anim-child="slide-up delay-2"
						class="swiper-slide swiper-slide-visible swiper-slide-active is-in-view"
						role="group"
						aria-label="1 / 8"
						style="width: 234px; margin-right: 30px;"
					>
						<a
							href="tour-single.html"
							class="tourTypeCard -type-1 d-block rounded-4 bg-blue-1-05 rounded-4"
						>
							<div class="tourTypeCard__content text-center pt-60 pb-24 px-30">
								<i class="icon-nature text-60 sm:text-40 text-blue-1" />
								<h4 class="text-dark-1 text-18 fw-500 mt-50 md:mt-30">{atoll.Atoll}</h4>
								<p class="text-light-1 lh-14 text-14 mt-5">{atoll.Hotels} hotels</p>
							</div>
						</a>
					</div>
				{/each}
			</div>
			<span class="swiper-notification" aria-live="assertive" aria-atomic="true" />
		</div>
	</div>
</section>

<section class="layout-pt-md layout-pb-lg">
	<div data-anim-wrap="" class="container animated">
		<div data-anim-child="slide-up delay-1" class="row justify-center text-center is-in-view">
			<div class="col-auto">
				<div class="sectionTitle -md">
					<h2 class="sectionTitle__title">Popular Hotels</h2>
					<p class=" sectionTitle__text mt-5 sm:mt-0">Discover our collections</p>
				</div>
			</div>
		</div>

		<div data-anim-child="slide-up delay-2" class="tabs -pills-2 pt-40 js-tabs is-in-view">
			<div class="tabs__controls row x-gap-15 justify-center js-tabs-controls">
				<div class="col-auto">
					<button
						class="tabs__button text-13 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button is-tab-el-active"
						data-tab-target=".-tab-item-1">All Inclusive</button
					>
				</div>

				<div class="col-auto">
					<button
						class="tabs__button text-13 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button"
						data-tab-target=".-tab-item-2">Luxury</button
					>
				</div>

				<div class="col-auto">
					<button
						class="tabs__button text-13 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button"
						data-tab-target=".-tab-item-3">Wellness</button
					>
				</div>

				<div class="col-auto">
					<button
						class="tabs__button text-13 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button"
						data-tab-target=".-tab-item-4">Family</button
					>
				</div>
			</div>

			<div class="tabs__content pt-40 js-tabs-content">
				<div class="tabs__pane -tab-item-1 is-tab-el-active">
					<div class="row y-gap-30">
						{#if $holidays}
							{#each $holidays['All Inclusive'].slice(4, 8) as hotel (hotel.hs_id)}
								<div
									data-anim-child="slide-left delay-4"
									class="col-xl-3 col-lg-3 col-sm-6 is-in-view"
								>
									<a href="#" class="hotelsCard -type-1">
										<div class="hotelsCard__image">
											<div class="cardImage ratio ratio-1:1">
												<div class="cardImage__content">
													<div
														class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
													>
														<div
															class="swiper-wrapper"
															id="swiper-wrapper-346e9414f7333092"
															aria-live="polite"
															style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
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
																aria-controls="swiper-wrapper-346e9414f7333092"
															>
																<i class="icon-chevron-left text-10" />
															</button>
														</div>

														<div class="cardImage-slider__nav -next">
															<button
																class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
																tabindex="0"
																aria-label="Next slide"
																aria-controls="swiper-wrapper-346e9414f7333092"
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

										<div class="hotelsCard__content mt-10">
											<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
												<span>{hotel.name}</span>
											</h4>

											<p class="text-light-1 lh-14 text-14 mt-5">{hotel.location.address}</p>

											<div class="d-flex items-center mt-20">
												<div
													class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white"
												>
													{hotel.quality && hotel.quality.review_rating}
												</div>
												<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
												<div class="text-14 text-light-1 ml-10">
													{hotel.quality && hotel.quality.review_count} reviews
												</div>
											</div>

											<!-- <div class="mt-5">
                        <div class="fw-500">
                          Starting from <span class="text-blue-1">US$72</span>
                        </div>
                      </div>  -->
										</div>
									</a>
								</div>
							{/each}
						{/if}
					</div>
				</div>

				<div class="tabs__pane -tab-item-2">
					<div class="row y-gap-30">
						{#each $holidays['Luxury'].slice(4, 8) as hotel (hotel.hs_id)}
							<div
								data-anim-child="slide-left delay-4"
								class="col-xl-3 col-lg-3 col-sm-6 is-in-view"
							>
								<a href="#" class="hotelsCard -type-1">
									<div class="hotelsCard__image">
										<div class="cardImage ratio ratio-1:1">
											<div class="cardImage__content">
												<div
													class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
												>
													<div
														class="swiper-wrapper"
														id="swiper-wrapper-346e9414f7333092"
														aria-live="polite"
														style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
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
															aria-controls="swiper-wrapper-346e9414f7333092"
														>
															<i class="icon-chevron-left text-10" />
														</button>
													</div>

													<div class="cardImage-slider__nav -next">
														<button
															class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
															tabindex="0"
															aria-label="Next slide"
															aria-controls="swiper-wrapper-346e9414f7333092"
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

									<div class="hotelsCard__content mt-10">
										<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
											<span>{hotel.name}</span>
										</h4>

										<p class="text-light-1 lh-14 text-14 mt-5">{hotel.location.address}</p>

										<div class="d-flex items-center mt-20">
											<div
												class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white"
											>
												{hotel.quality && hotel.quality.review_rating}
											</div>
											<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
											<div class="text-14 text-light-1 ml-10">
												{hotel.quality && hotel.quality.review_count} reviews
											</div>
										</div>
										<div class="mt-5">
											<div class="fw-500">
												Starting from <span class="text-blue-1">US$72</span>
											</div>
										</div>
									</div>
								</a>
							</div>
						{/each}
					</div>
				</div>

				<div class="tabs__pane -tab-item-3">
					<div class="row y-gap-30">
						{#each $holidays['Wellness'].slice(4, 8) as hotel (hotel.hs_id)}
							<div
								data-anim-child="slide-left delay-4"
								class="col-xl-3 col-lg-3 col-sm-6 is-in-view"
							>
								<a href="#" class="hotelsCard -type-1">
									<div class="hotelsCard__image">
										<div class="cardImage ratio ratio-1:1">
											<div class="cardImage__content">
												<div
													class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
												>
													<div
														class="swiper-wrapper"
														id="swiper-wrapper-346e9414f7333092"
														aria-live="polite"
														style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
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
															aria-controls="swiper-wrapper-346e9414f7333092"
														>
															<i class="icon-chevron-left text-10" />
														</button>
													</div>

													<div class="cardImage-slider__nav -next">
														<button
															class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
															tabindex="0"
															aria-label="Next slide"
															aria-controls="swiper-wrapper-346e9414f7333092"
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

									<div class="hotelsCard__content mt-10">
										<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
											<span>{hotel.name}</span>
										</h4>

										<p class="text-light-1 lh-14 text-14 mt-5">{hotel.location.address}</p>

										<div class="d-flex items-center mt-20">
											<div
												class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white"
											>
												{hotel.quality && hotel.quality.review_rating}
											</div>
											<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
											<div class="text-14 text-light-1 ml-10">
												{hotel.quality && hotel.quality.review_count} reviews
											</div>
										</div>

										<div class="mt-5">
											<div class="fw-500">
												Starting from <span class="text-blue-1">US$72</span>
											</div>
										</div>
									</div>
								</a>
							</div>
						{/each}
					</div>
				</div>

				<div class="tabs__pane -tab-item-4">
					<div class="row y-gap-30">
						{#each $holidays['Family & kids'].slice(0, 4) as hotel (hotel.hs_id)}
							<div
								data-anim-child="slide-left delay-4"
								class="col-xl-3 col-lg-3 col-sm-6 is-in-view"
							>
								<a href="#" class="hotelsCard -type-1">
									<div class="hotelsCard__image">
										<div class="cardImage ratio ratio-1:1">
											<div class="cardImage__content">
												<div
													class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
												>
													<div
														class="swiper-wrapper"
														id="swiper-wrapper-346e9414f7333092"
														aria-live="polite"
														style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
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
															aria-controls="swiper-wrapper-346e9414f7333092"
														>
															<i class="icon-chevron-left text-10" />
														</button>
													</div>

													<div class="cardImage-slider__nav -next">
														<button
															class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
															tabindex="0"
															aria-label="Next slide"
															aria-controls="swiper-wrapper-346e9414f7333092"
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

									<div class="hotelsCard__content mt-10">
										<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
											<span>{hotel.name}</span>
										</h4>

										<p class="text-light-1 lh-14 text-14 mt-5">{hotel.location.address}</p>

										<div class="d-flex items-center mt-20">
											<div
												class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white"
											>
												{hotel.quality && hotel.quality.review_rating}
											</div>
											<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
											<div class="text-14 text-light-1 ml-10">
												{hotel.quality && hotel.quality.review_count} reviews
											</div>
										</div>

										<div class="mt-5">
											<div class="fw-500">
												Starting from <span class="text-blue-1">US$72</span>
											</div>
										</div>
									</div>
								</a>
							</div>
						{/each}
					</div>
				</div>

				<div class="tabs__pane -tab-item-5">
					<div class="row y-gap-30">
						<div data-anim-child="slide-left delay-4" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
						<div data-anim-child="slide-left delay-5" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
						<div data-anim-child="slide-left delay-6" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
						<div data-anim-child="slide-left delay-7" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div class="tabs__pane -tab-item-6">
					<div class="row y-gap-30">
						<div data-anim-child="slide-left delay-4" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
						<div data-anim-child="slide-left delay-5" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
						<div data-anim-child="slide-left delay-6" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
						<div data-anim-child="slide-left delay-7" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div class="tabs__pane -tab-item-7">
					<div class="row y-gap-30">
						<div data-anim-child="slide-left delay-4" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
						<div data-anim-child="slide-left delay-5" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
						<div data-anim-child="slide-left delay-6" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
						<div data-anim-child="slide-left delay-7" class="col-xl-3 col-lg-3 col-sm-6 is-in-view">
							<a href="hotel-single-1.html" class="hotelsCard -type-1">
								<div class="hotelsCard__image">
									<div class="cardImage ratio ratio-1:1">
										<div class="cardImage__content">
											<div
												class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
											>
												<div
													class="swiper-wrapper"
													id="swiper-wrapper-346e9414f7333092"
													aria-live="polite"
													style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"
												>
													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-next"
														data-swiper-slide-index="1"
														role="group"
														aria-label="2 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/1.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate-prev"
														data-swiper-slide-index="2"
														role="group"
														aria-label="3 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/3.png" alt="image" />
													</div>

													<div
														class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
														data-swiper-slide-index="0"
														role="group"
														aria-label="1 / 3"
														style="width: 300px;"
													>
														<img class="col-12" src="img/hotels/2.png" alt="image" />
													</div>
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
														aria-controls="swiper-wrapper-346e9414f7333092"
													>
														<i class="icon-chevron-left text-10" />
													</button>
												</div>

												<div class="cardImage-slider__nav -next">
													<button
														class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next"
														tabindex="0"
														aria-label="Next slide"
														aria-controls="swiper-wrapper-346e9414f7333092"
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

								<div class="hotelsCard__content mt-10">
									<h4 class="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
										<span>Staycity Aparthotels Deptford Bridge Station</span>
									</h4>

									<p class="text-light-1 lh-14 text-14 mt-5">Ciutat Vella, Barcelona</p>

									<div class="d-flex items-center mt-20">
										<div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
											4.8
										</div>
										<div class="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
										<div class="text-14 text-light-1 ml-10">3,014 reviews</div>
									</div>

									<div class="mt-5">
										<div class="fw-500">
											Starting from <span class="text-blue-1">US$72</span>
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="layout-pt-md layout-pb-md">
	<div data-anim-wrap="" class="container animated">
		<div data-anim-child="slide-up delay-1" class="row justify-center text-center is-in-view">
			<div class="col-auto">
				<div class="sectionTitle -md">
					<h2 class="sectionTitle__title">Get inspiration for your next trip</h2>
					<p class=" sectionTitle__text mt-5 sm:mt-0">Latest News & Blog</p>
				</div>
			</div>
		</div>

		<div class="blog-grid-1 pt-40">
			{#each data.posts.slice(0, 3) as post}
				<div data-anim-child="slide-up delay-2" class="is-in-view">
					<a href="" class="blogCard -type-3">
						<div class="blogCard__image rounded-4">
							{#if post._embedded['wp:featuredmedia']}
								<img
									class="rounded-4 js-lazy loaded"
									src={post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}
									alt="image"
									data-ll-status="loaded"
								/>
							{/if}
						</div>

						<div class="blogCard__content px-50 pb-30 lg:px-20 pb-20">
							<h4 class="text-26 lg:text-18 fw-600 lh-16 text-white">{post.title.rendered}</h4>
							<div class="text-15 lh-14 text-white mt-10">{post.date}</div>
						</div>
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>  

<section class="section-bg pt-40 pb-40">
	<div class="section-bg__item -left-100 -right-100 border-bottom-light" />

	<div class="container">
		<div class="row y-gap-30 justify-center text-center">
			<div class="col-xl-3 col-6">
				<div class="text-40 lg:text-30 lh-13 text-blue-1 fw-600">4,958</div>
				<div class="text-14 lh-14 text-light-1 mt-5">Destinations</div>
			</div>

			<div class="col-xl-3 col-6">
				<div class="text-40 lg:text-30 lh-13 text-blue-1 fw-600">2,869</div>
				<div class="text-14 lh-14 text-light-1 mt-5">Total Properties</div>
			</div>

			<div class="col-xl-3 col-6">
				<div class="text-40 lg:text-30 lh-13 text-blue-1 fw-600">2M</div>
				<div class="text-14 lh-14 text-light-1 mt-5">Happy customers</div>
			</div>

			<div class="col-xl-3 col-6">
				<div class="text-40 lg:text-30 lh-13 text-blue-1 fw-600">574,974</div>
				<div class="text-14 lh-14 text-light-1 mt-5">Our Volunteers</div>
			</div>
		</div>
	</div>
</section>

<section data-anim-wrap="" class="section-bg bg-dark-3 layout-pt-md layout-pb-md animated">
	<div data-anim-child="fade delay-1" class="section-bg__item -mx-20 bg-dark-3 is-in-view" />

	<div class="container">
		<div
			data-anim-child="slide-up delay-2"
			class="row items-center justify-center text-center is-in-view"
		>
			<div class="col-auto">
				<i class="icon-newsletter text-60 sm:text-40 text-white" />

				<h2 class="text-30 sm:text-24 lh-15 text-white mt-20">Your Travel Journey Starts Here</h2>
				<p class="text-white mt-5">Sign up and we'll send the best deals to you</p>

				<div class="single-field -w-410 d-flex x-gap-10 flex-wrap y-gap-20 pt-30">
					<div class="col-auto">
						<input class="col-12 bg-white h-60" type="text" placeholder="Your Email" />
					</div>
					<div class="col-auto">
						<button class="button -md -white h-60 bg-dark-1 text-white">Subscribe</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@media (max-width: 991px) {
		.masthead.-type-7 .mainSearch {
			bottom: -100px !important;
		}
	}

	@media (max-width: 767px) {
		.masthead.-type-7 .masthead-slider__nav {
			top: 75%;
		}
	}
</style>
