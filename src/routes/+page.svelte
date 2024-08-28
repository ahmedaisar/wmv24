<script>
	// @ts-nocheck

	import Header from '$lib/components/home/header.svelte';
	import Footer from '$lib/components/common/footer.svelte';
	import * as maldives from '$lib/data/maldives.json';
	import atolls from '$lib/data/atolls.json';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	export let data;

	const hotels = writable(data.hotels);

	console.log(hotels)
	// let searchTerm = '';
	// let filteredHotels = [];

	// $: {
	// 	if (searchTerm) {
	// 		filteredHotels = hotels.filter((hotel) =>
	// 			hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
	// 		);
	// 	} else {
	// 		filteredHotels = hotels;
	// 	}
	// }

	// let dropdownlist = hotels.filter((h) => {
	// 	return h;
	// });
	// let dropdown = [...new Set(dropdownlist)];
	// let resorts = hotels.filter((h) => {
	// 	return h.toa_label === 'resort';
	// });
	// let lux = hotels.filter((h) => {
	// 	return h.quality.stars == '5';
	// });
	// let guesthouse = hotels.filter((h) => {
	// 	return h.toa == 'guest_house';
	// });

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

	const handleSearch = (e) => {
		e.preventDefault();
		let selectedOption = '';
		const formData = new FormData(event.target); // Get form data
		const formParams = Object.fromEntries(formData.entries());
		const checkIn = formParams.checkin;
		const checkOut = formParams.checkout;

		let selectedHotel = hotels.filter((sh) => {
			return sh.hs_id == selectedOption;
		});

		if (selectedOption) {
			goto(
				`/hotels/${selectedOption}/${selectedHotel[0].slug}?checkin=${checkIn}&checkout=${checkOut}&hotelid=${selectedOption}`
			);
		}
	};

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
			'Adults Only': [],
			'Senior Friendly': [],
			'Halal travel': []
		};

		resorts.forEach((resort) => {
			// All Inclusive
			if (resort.name.toLowerCase().includes('all inclusive')) {
				holidayTypes['All Inclusive'].push(resort);
			}

			// Honeymoon
			if (resort.themes && resort.themes.includes('romantic')) {
				holidayTypes['Honeymoon'].push(resort);
			}

			// Luxury
			if (resort.quality && resort.quality.stars === 5) {
				holidayTypes['Luxury'].push(resort);
			}

			// Wellness
			if (
				resort.themes &&
				(resort.themes.includes('spa_relax') ||
					resort.short_description.toLowerCase().includes('wellness'))
			) {
				holidayTypes['Wellness'].push(resort);
			}

			// Family & kids
			if (resort.themes && resort.themes.includes('family')) {
				holidayTypes['Family & kids'].push(resort);
			}

			// Adults Only
			if (resort.name && resort.name.includes('lobigili')) {
				holidayTypes['Adults Only'].push(resort);
			}

			// Senior Friendly
			// No clear indicator in the data, so we'll leave this empty

			// Halal travel
			// No clear indicator in the data, so we'll leave this empty
		});

		return holidayTypes;
	}

	const holidays = mapResortsByHolidayType(hotels);

	// const searchHotels = async (checkin, checkout, adults, child, hotel) => {
	// 	goto(
	// 		`/hotels?checkin=${checkin}&checkout=${checkout}&adults=${adults}&child=${child}&hotel=${hotel}`
	// 	);
	// };

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
                <div class="text-15 lh-12 fw-500 js-search-option-target">${e.name}</div>
                <div class="text-14 lh-12 text-light-1 mt-5">${e.location.address}</div>
              </div>
            </div>
          </button>
        `;

					resultsEl.appendChild(div);
				});
		};
	}
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
								<div
									class="swiper-wrapper"
									id="swiper-wrapper-a05f2f9de341b60a"
									aria-live="polite"
									style="height: 264px;"
								>
									<div
										class="swiper-slide swiper-slide-active"
										role="group"
										aria-label="1 / 12"
										style="width: 420px;"
									>
										<div class="capitalize text-28 fw-500 text-center mb-10">january 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="1"
													data-week="Sun"
													data-month="jan"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 31 </span>
												</div>

												<div
													data-index="2"
													data-week="Mon"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="3"
													data-week="Tue"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="4"
													data-week="Wed"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="5"
													data-week="Thu"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="6"
													data-week="Fri"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="7"
													data-week="Sat"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="8"
													data-week="Sun"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="9"
													data-week="Mon"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="10"
													data-week="Tue"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="11"
													data-week="Wed"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="12"
													data-week="Thu"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="13"
													data-week="Fri"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="14"
													data-week="Sat"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="15"
													data-week="Sun"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="16"
													data-week="Mon"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="17"
													data-week="Tue"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="18"
													data-week="Wed"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="19"
													data-week="Thu"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="20"
													data-week="Fri"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="21"
													data-week="Sat"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="22"
													data-week="Sun"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="23"
													data-week="Mon"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="24"
													data-week="Tue"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="25"
													data-week="Wed"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="26"
													data-week="Thu"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="27"
													data-week="Fri"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="28"
													data-week="Sat"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="29"
													data-week="Sun"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="30"
													data-week="Mon"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="31"
													data-week="Tue"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="32"
													data-week="Wed"
													data-month="jan"
													class="elCalendar__sell"
												>
													<span class="js-date"> 31 </span>
												</div>
											</div>
										</div>
									</div>

									<div
										class="swiper-slide swiper-slide-next"
										role="group"
										aria-label="2 / 12"
										style="width: 420px;"
									>
										<div class="capitalize text-28 fw-500 text-center mb-10">february 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="33"
													data-week="Sun"
													data-month="feb"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="34"
													data-week="Mon"
													data-month="feb"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="35"
													data-week="Tue"
													data-month="feb"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="36"
													data-week="Wed"
													data-month="feb"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 31 </span>
												</div>

												<div
													data-index="37"
													data-week="Thu"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="38"
													data-week="Fri"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="39"
													data-week="Sat"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="40"
													data-week="Sun"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="41"
													data-week="Mon"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="42"
													data-week="Tue"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="43"
													data-week="Wed"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="44"
													data-week="Thu"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="45"
													data-week="Fri"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="46"
													data-week="Sat"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="47"
													data-week="Sun"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="48"
													data-week="Mon"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="49"
													data-week="Tue"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="50"
													data-week="Wed"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="51"
													data-week="Thu"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="52"
													data-week="Fri"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="53"
													data-week="Sat"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="54"
													data-week="Sun"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="55"
													data-week="Mon"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="56"
													data-week="Tue"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="57"
													data-week="Wed"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="58"
													data-week="Thu"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="59"
													data-week="Fri"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="60"
													data-week="Sat"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="61"
													data-week="Sun"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="62"
													data-week="Mon"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="63"
													data-week="Tue"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="64"
													data-week="Wed"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="65"
													data-week="Thu"
													data-month="feb"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>
											</div>
										</div>
									</div>

									<div class="swiper-slide" role="group" aria-label="3 / 12" style="width: 420px;">
										<div class="capitalize text-28 fw-500 text-center mb-10">march 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="66"
													data-week="Sun"
													data-month="mar"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="67"
													data-week="Mon"
													data-month="mar"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="68"
													data-week="Tue"
													data-month="mar"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="69"
													data-week="Wed"
													data-month="mar"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="70"
													data-week="Thu"
													data-month="mar"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="71"
													data-week="Fri"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="72"
													data-week="Sat"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="73"
													data-week="Sun"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="74"
													data-week="Mon"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="75"
													data-week="Tue"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="76"
													data-week="Wed"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="77"
													data-week="Thu"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="78"
													data-week="Fri"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="79"
													data-week="Sat"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="80"
													data-week="Sun"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="81"
													data-week="Mon"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="82"
													data-week="Tue"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="83"
													data-week="Wed"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="84"
													data-week="Thu"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="85"
													data-week="Fri"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="86"
													data-week="Sat"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="87"
													data-week="Sun"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="88"
													data-week="Mon"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="89"
													data-week="Tue"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="90"
													data-week="Wed"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="91"
													data-week="Thu"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="92"
													data-week="Fri"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="93"
													data-week="Sat"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="94"
													data-week="Sun"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="95"
													data-week="Mon"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="96"
													data-week="Tue"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="97"
													data-week="Wed"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="98"
													data-week="Thu"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="99"
													data-week="Fri"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="100"
													data-week="Sat"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="101"
													data-week="Sun"
													data-month="mar"
													class="elCalendar__sell"
												>
													<span class="js-date"> 31 </span>
												</div>
											</div>
										</div>
									</div>

									<div class="swiper-slide" role="group" aria-label="4 / 12" style="width: 420px;">
										<div class="capitalize text-28 fw-500 text-center mb-10">april 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="102"
													data-week="Sun"
													data-month="apr"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 31 </span>
												</div>

												<div
													data-index="103"
													data-week="Mon"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="104"
													data-week="Tue"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="105"
													data-week="Wed"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="106"
													data-week="Thu"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="107"
													data-week="Fri"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="108"
													data-week="Sat"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="109"
													data-week="Sun"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="110"
													data-week="Mon"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="111"
													data-week="Tue"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="112"
													data-week="Wed"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="113"
													data-week="Thu"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="114"
													data-week="Fri"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="115"
													data-week="Sat"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="116"
													data-week="Sun"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="117"
													data-week="Mon"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="118"
													data-week="Tue"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="119"
													data-week="Wed"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="120"
													data-week="Thu"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="121"
													data-week="Fri"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="122"
													data-week="Sat"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="123"
													data-week="Sun"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="124"
													data-week="Mon"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="125"
													data-week="Tue"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="126"
													data-week="Wed"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="127"
													data-week="Thu"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="128"
													data-week="Fri"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="129"
													data-week="Sat"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="130"
													data-week="Sun"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="131"
													data-week="Mon"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="132"
													data-week="Tue"
													data-month="apr"
													class="elCalendar__sell"
												>
													<span class="js-date"> 30 </span>
												</div>
											</div>
										</div>
									</div>

									<div class="swiper-slide" role="group" aria-label="5 / 12" style="width: 420px;">
										<div class="capitalize text-28 fw-500 text-center mb-10">may 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="133"
													data-week="Sun"
													data-month="may"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="134"
													data-week="Mon"
													data-month="may"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="135"
													data-week="Tue"
													data-month="may"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="136"
													data-week="Wed"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="137"
													data-week="Thu"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="138"
													data-week="Fri"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="139"
													data-week="Sat"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="140"
													data-week="Sun"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="141"
													data-week="Mon"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="142"
													data-week="Tue"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="143"
													data-week="Wed"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="144"
													data-week="Thu"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="145"
													data-week="Fri"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="146"
													data-week="Sat"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="147"
													data-week="Sun"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="148"
													data-week="Mon"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="149"
													data-week="Tue"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="150"
													data-week="Wed"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="151"
													data-week="Thu"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="152"
													data-week="Fri"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="153"
													data-week="Sat"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="154"
													data-week="Sun"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="155"
													data-week="Mon"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="156"
													data-week="Tue"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="157"
													data-week="Wed"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="158"
													data-week="Thu"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="159"
													data-week="Fri"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="160"
													data-week="Sat"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="161"
													data-week="Sun"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="162"
													data-week="Mon"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="163"
													data-week="Tue"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="164"
													data-week="Wed"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="165"
													data-week="Thu"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="166"
													data-week="Fri"
													data-month="may"
													class="elCalendar__sell"
												>
													<span class="js-date"> 31 </span>
												</div>
											</div>
										</div>
									</div>

									<div class="swiper-slide" role="group" aria-label="6 / 12" style="width: 420px;">
										<div class="capitalize text-28 fw-500 text-center mb-10">june 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="167"
													data-week="Sun"
													data-month="jun"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="168"
													data-week="Mon"
													data-month="jun"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="169"
													data-week="Tue"
													data-month="jun"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="170"
													data-week="Wed"
													data-month="jun"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="171"
													data-week="Thu"
													data-month="jun"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="172"
													data-week="Fri"
													data-month="jun"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 31 </span>
												</div>

												<div
													data-index="173"
													data-week="Sat"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="174"
													data-week="Sun"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="175"
													data-week="Mon"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="176"
													data-week="Tue"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="177"
													data-week="Wed"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="178"
													data-week="Thu"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="179"
													data-week="Fri"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="180"
													data-week="Sat"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="181"
													data-week="Sun"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="182"
													data-week="Mon"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="183"
													data-week="Tue"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="184"
													data-week="Wed"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="185"
													data-week="Thu"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="186"
													data-week="Fri"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="187"
													data-week="Sat"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="188"
													data-week="Sun"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="189"
													data-week="Mon"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="190"
													data-week="Tue"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="191"
													data-week="Wed"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="192"
													data-week="Thu"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="193"
													data-week="Fri"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="194"
													data-week="Sat"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="195"
													data-week="Sun"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="196"
													data-week="Mon"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="197"
													data-week="Tue"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="198"
													data-week="Wed"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="199"
													data-week="Thu"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="200"
													data-week="Fri"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="201"
													data-week="Sat"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="202"
													data-week="Sun"
													data-month="jun"
													class="elCalendar__sell"
												>
													<span class="js-date"> 30 </span>
												</div>
											</div>
										</div>
									</div>

									<div class="swiper-slide" role="group" aria-label="7 / 12" style="width: 420px;">
										<div class="capitalize text-28 fw-500 text-center mb-10">july 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="203"
													data-week="Sun"
													data-month="jul"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="204"
													data-week="Mon"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="205"
													data-week="Tue"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="206"
													data-week="Wed"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="207"
													data-week="Thu"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="208"
													data-week="Fri"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="209"
													data-week="Sat"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="210"
													data-week="Sun"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="211"
													data-week="Mon"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="212"
													data-week="Tue"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="213"
													data-week="Wed"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="214"
													data-week="Thu"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="215"
													data-week="Fri"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="216"
													data-week="Sat"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="217"
													data-week="Sun"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="218"
													data-week="Mon"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="219"
													data-week="Tue"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="220"
													data-week="Wed"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="221"
													data-week="Thu"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="222"
													data-week="Fri"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="223"
													data-week="Sat"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="224"
													data-week="Sun"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="225"
													data-week="Mon"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="226"
													data-week="Tue"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="227"
													data-week="Wed"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="228"
													data-week="Thu"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="229"
													data-week="Fri"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="230"
													data-week="Sat"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="231"
													data-week="Sun"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="232"
													data-week="Mon"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="233"
													data-week="Tue"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="234"
													data-week="Wed"
													data-month="jul"
													class="elCalendar__sell"
												>
													<span class="js-date"> 31 </span>
												</div>
											</div>
										</div>
									</div>

									<div class="swiper-slide" role="group" aria-label="8 / 12" style="width: 420px;">
										<div class="capitalize text-28 fw-500 text-center mb-10">august 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="235"
													data-week="Sun"
													data-month="aug"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="236"
													data-week="Mon"
													data-month="aug"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="237"
													data-week="Tue"
													data-month="aug"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="238"
													data-week="Wed"
													data-month="aug"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 31 </span>
												</div>

												<div
													data-index="239"
													data-week="Thu"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="240"
													data-week="Fri"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="241"
													data-week="Sat"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="242"
													data-week="Sun"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="243"
													data-week="Mon"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="244"
													data-week="Tue"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="245"
													data-week="Wed"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="246"
													data-week="Thu"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="247"
													data-week="Fri"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="248"
													data-week="Sat"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="249"
													data-week="Sun"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="250"
													data-week="Mon"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="251"
													data-week="Tue"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="252"
													data-week="Wed"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="253"
													data-week="Thu"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="254"
													data-week="Fri"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="255"
													data-week="Sat"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="256"
													data-week="Sun"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="257"
													data-week="Mon"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="258"
													data-week="Tue"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="259"
													data-week="Wed"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="260"
													data-week="Thu"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="261"
													data-week="Fri"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="262"
													data-week="Sat"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="263"
													data-week="Sun"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="264"
													data-week="Mon"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="265"
													data-week="Tue"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="266"
													data-week="Wed"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="267"
													data-week="Thu"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="268"
													data-week="Fri"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="269"
													data-week="Sat"
													data-month="aug"
													class="elCalendar__sell"
												>
													<span class="js-date"> 31 </span>
												</div>
											</div>
										</div>
									</div>

									<div class="swiper-slide" role="group" aria-label="9 / 12" style="width: 420px;">
										<div class="capitalize text-28 fw-500 text-center mb-10">september 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="270"
													data-week="Sun"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="271"
													data-week="Mon"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="272"
													data-week="Tue"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="273"
													data-week="Wed"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="274"
													data-week="Thu"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="275"
													data-week="Fri"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="276"
													data-week="Sat"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="277"
													data-week="Sun"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="278"
													data-week="Mon"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="279"
													data-week="Tue"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="280"
													data-week="Wed"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="281"
													data-week="Thu"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="282"
													data-week="Fri"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="283"
													data-week="Sat"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="284"
													data-week="Sun"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="285"
													data-week="Mon"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="286"
													data-week="Tue"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="287"
													data-week="Wed"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="288"
													data-week="Thu"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="289"
													data-week="Fri"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="290"
													data-week="Sat"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="291"
													data-week="Sun"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="292"
													data-week="Mon"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="293"
													data-week="Tue"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="294"
													data-week="Wed"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="295"
													data-week="Thu"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="296"
													data-week="Fri"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="297"
													data-week="Sat"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="298"
													data-week="Sun"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="299"
													data-week="Mon"
													data-month="sep"
													class="elCalendar__sell"
												>
													<span class="js-date"> 30 </span>
												</div>
											</div>
										</div>
									</div>

									<div class="swiper-slide" role="group" aria-label="10 / 12" style="width: 420px;">
										<div class="capitalize text-28 fw-500 text-center mb-10">october 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="300"
													data-week="Sun"
													data-month="oct"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="301"
													data-week="Mon"
													data-month="oct"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="302"
													data-week="Tue"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="303"
													data-week="Wed"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="304"
													data-week="Thu"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="305"
													data-week="Fri"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="306"
													data-week="Sat"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="307"
													data-week="Sun"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="308"
													data-week="Mon"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="309"
													data-week="Tue"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="310"
													data-week="Wed"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="311"
													data-week="Thu"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="312"
													data-week="Fri"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="313"
													data-week="Sat"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="314"
													data-week="Sun"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="315"
													data-week="Mon"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="316"
													data-week="Tue"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="317"
													data-week="Wed"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="318"
													data-week="Thu"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="319"
													data-week="Fri"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="320"
													data-week="Sat"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="321"
													data-week="Sun"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="322"
													data-week="Mon"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="323"
													data-week="Tue"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="324"
													data-week="Wed"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="325"
													data-week="Thu"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="326"
													data-week="Fri"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="327"
													data-week="Sat"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="328"
													data-week="Sun"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="329"
													data-week="Mon"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="330"
													data-week="Tue"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="331"
													data-week="Wed"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="332"
													data-week="Thu"
													data-month="oct"
													class="elCalendar__sell"
												>
													<span class="js-date"> 31 </span>
												</div>
											</div>
										</div>
									</div>

									<div class="swiper-slide" role="group" aria-label="11 / 12" style="width: 420px;">
										<div class="capitalize text-28 fw-500 text-center mb-10">november 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="333"
													data-week="Sun"
													data-month="nov"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="334"
													data-week="Mon"
													data-month="nov"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="335"
													data-week="Tue"
													data-month="nov"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="336"
													data-week="Wed"
													data-month="nov"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="337"
													data-week="Thu"
													data-month="nov"
													class="elCalendar__sell -dark"
												>
													<span class="js-date"> 31 </span>
												</div>

												<div
													data-index="338"
													data-week="Fri"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="339"
													data-week="Sat"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="340"
													data-week="Sun"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="341"
													data-week="Mon"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="342"
													data-week="Tue"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="343"
													data-week="Wed"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="344"
													data-week="Thu"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="345"
													data-week="Fri"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="346"
													data-week="Sat"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="347"
													data-week="Sun"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="348"
													data-week="Mon"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="349"
													data-week="Tue"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="350"
													data-week="Wed"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="351"
													data-week="Thu"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="352"
													data-week="Fri"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="353"
													data-week="Sat"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="354"
													data-week="Sun"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="355"
													data-week="Mon"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="356"
													data-week="Tue"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="357"
													data-week="Wed"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="358"
													data-week="Thu"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="359"
													data-week="Fri"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="360"
													data-week="Sat"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="361"
													data-week="Sun"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="362"
													data-week="Mon"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="363"
													data-week="Tue"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="364"
													data-week="Wed"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="365"
													data-week="Thu"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="366"
													data-week="Fri"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="367"
													data-week="Sat"
													data-month="nov"
													class="elCalendar__sell"
												>
													<span class="js-date"> 30 </span>
												</div>
											</div>
										</div>
									</div>

									<div class="swiper-slide" role="group" aria-label="12 / 12" style="width: 420px;">
										<div class="capitalize text-28 fw-500 text-center mb-10">december 2024</div>

										<div class="elCalendar__month">
											<div class="elCalendar__header">
												<div class="elCalendar__header__sell">Sun</div>
												<div class="elCalendar__header__sell">Mon</div>
												<div class="elCalendar__header__sell">Tue</div>
												<div class="elCalendar__header__sell">Wed</div>
												<div class="elCalendar__header__sell">Thu</div>
												<div class="elCalendar__header__sell">Fri</div>
												<div class="elCalendar__header__sell">Sat</div>
											</div>

											<div class="elCalendar__body">
												<div
													data-index="368"
													data-week="Sun"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 1 </span>
												</div>

												<div
													data-index="369"
													data-week="Mon"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 2 </span>
												</div>

												<div
													data-index="370"
													data-week="Tue"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 3 </span>
												</div>

												<div
													data-index="371"
													data-week="Wed"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 4 </span>
												</div>

												<div
													data-index="372"
													data-week="Thu"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 5 </span>
												</div>

												<div
													data-index="373"
													data-week="Fri"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 6 </span>
												</div>

												<div
													data-index="374"
													data-week="Sat"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 7 </span>
												</div>

												<div
													data-index="375"
													data-week="Sun"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 8 </span>
												</div>

												<div
													data-index="376"
													data-week="Mon"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 9 </span>
												</div>

												<div
													data-index="377"
													data-week="Tue"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 10 </span>
												</div>

												<div
													data-index="378"
													data-week="Wed"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 11 </span>
												</div>

												<div
													data-index="379"
													data-week="Thu"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 12 </span>
												</div>

												<div
													data-index="380"
													data-week="Fri"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 13 </span>
												</div>

												<div
													data-index="381"
													data-week="Sat"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 14 </span>
												</div>

												<div
													data-index="382"
													data-week="Sun"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 15 </span>
												</div>

												<div
													data-index="383"
													data-week="Mon"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 16 </span>
												</div>

												<div
													data-index="384"
													data-week="Tue"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 17 </span>
												</div>

												<div
													data-index="385"
													data-week="Wed"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 18 </span>
												</div>

												<div
													data-index="386"
													data-week="Thu"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 19 </span>
												</div>

												<div
													data-index="387"
													data-week="Fri"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 20 </span>
												</div>

												<div
													data-index="388"
													data-week="Sat"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 21 </span>
												</div>

												<div
													data-index="389"
													data-week="Sun"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 22 </span>
												</div>

												<div
													data-index="390"
													data-week="Mon"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 23 </span>
												</div>

												<div
													data-index="391"
													data-week="Tue"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 24 </span>
												</div>

												<div
													data-index="392"
													data-week="Wed"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 25 </span>
												</div>

												<div
													data-index="393"
													data-week="Thu"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 26 </span>
												</div>

												<div
													data-index="394"
													data-week="Fri"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 27 </span>
												</div>

												<div
													data-index="395"
													data-week="Sat"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 28 </span>
												</div>

												<div
													data-index="396"
													data-week="Sun"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 29 </span>
												</div>

												<div
													data-index="397"
													data-week="Mon"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 30 </span>
												</div>

												<div
													data-index="398"
													data-week="Tue"
													data-month="dec"
													class="elCalendar__sell"
												>
													<span class="js-date"> 31 </span>
												</div>
											</div>
										</div>
									</div>
								</div>

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
				>
					<i class="icon-search text-20 mr-10" />
					Search
				</button>
			</div>
		</div>
	</div>
</section>

<section class="layout-pt-md layout-pb-md">
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

<!-- <section class="layout-pt-md layout-pb-lg">
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
						{#each holidays['All Inclusive'].slice(4, 8) as hotel (hotel.hs_id)}
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

				<div class="tabs__pane -tab-item-2">
					<div class="row y-gap-30">
						{#each holidays['Luxury'].slice(4, 8) as hotel (hotel.hs_id)}
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
						{#each holidays['Wellness'].slice(4, 8) as hotel (hotel.hs_id)}
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
						{#each holidays['Family & kids'].slice(0, 4) as hotel (hotel.hs_id)}
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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

                  <a href="hotel-single-1.html" class="hotelsCard -type-1 ">
                    <div class="hotelsCard__image">

                      <div class="cardImage ratio ratio-1:1">
                        <div class="cardImage__content">


                          <div class="cardImage-slider rounded-4 overflow-hidden js-cardImage-slider swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                            <div class="swiper-wrapper" id="swiper-wrapper-346e9414f7333092" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-300px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="1" role="group" aria-label="2 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/1.png" alt="image">
                              </div>

                              <div class="swiper-slide swiper-slide-duplicate-prev" data-swiper-slide-index="2" role="group" aria-label="3 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/3.png" alt="image">
                              </div>

                            <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active" data-swiper-slide-index="0" role="group" aria-label="1 / 3" style="width: 300px;">
                                <img class="col-12" src="img/hotels/2.png" alt="image">
                              </div></div>

                            <div class="cardImage-slider__pagination js-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><div class="pagination__item is-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 2"></div><div class="pagination__item" tabindex="0" role="button" aria-label="Go to slide 3"></div></div>

                            <div class="cardImage-slider__nav -prev">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-left text-10"></i>
                              </button>
                            </div>

                            <div class="cardImage-slider__nav -next">
                              <button class="button -blue-1 bg-white size-30 rounded-full shadow-2 js-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-346e9414f7333092">
                                <i class="icon-chevron-right text-10"></i>
                              </button>
                            </div>
                          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>

                        </div>

                        <div class="cardImage__wishlist">
                          <button class="button -blue-1 bg-white size-30 rounded-full shadow-2">
                            <i class="icon-heart text-12"></i>
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
                        <div class="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">4.8</div>
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
</section> -->

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
