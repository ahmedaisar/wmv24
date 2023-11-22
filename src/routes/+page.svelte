<script>
	// @ts-nocheck
 
	import Header from '$lib/components/home/header.svelte';
	import Footer from '$lib/components/common/footer.svelte';
	import data from '$lib/data/maldives.json'
	import bg from "$lib/assets/bg.jpg"
	import {onMount} from "svelte"
	export let form;

	let hotels = data?.data?.records
	let dropdownlist = hotels.filter(h => { return h})
	let dropdown = [...new Set(dropdownlist)];
	let resorts = hotels.filter((h) => {
		return h.toa_label === 'resort';
	});
	let lux = hotels.filter((h) => {
		return h.quality.stars == '5';
	});
	let guesthouse = hotels.filter((h) => {
			return h.toa == 'guest_house';
	});

	const getStar = (star) => {
		switch (star) {
			case 1:
			return `<small class="fas fa-star"></small>`
			case 2:
			return `<small class="fas fa-star"></small><small class="fas fa-star" </small>`
			case 3:
			return `<small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small>`
			case 4:
			return `<small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small>`
			case 5:
			return `<small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small>`
		
			default:
			return ''
		}
	}
	// const searchHotel = (event) => {
	// 	const formEl = event.target
    // 	const data = new FormData(formEl)
	// 	console.log(form)
	// }
	// let dates 
	
	// onMount(() => {
	// 	if(typeof localStorage !== `undefined`){
	// 		dates = localStorage.getItem('dates')
	// 	}

	// })

	
</script>

<Header />

<main id="content">
	<!-- ========== HERO ========== -->
	<div
		class="hero-block hero-v4 bg-img-hero-bottom text-center z-index-2"
		style="background-image: url({bg});"
	>
		<div class="container space-2 space-top-lg-4 space-top-xl-10">
			<div class="row justify-content-md-center pb-xl-11">
				<!-- Info -->
				<div class="mb-wd-11 pb-5 py-lg-5">
					<h1 class="font-size-50 font-size-xs-30 text-white font-weight-bold">
						Find Your Ideal Hotel and Compare Prices
					</h1>
					<p class="font-size-20 font-weight-normal text-white">
						Check out the best deals on over 743+ hotels Maldives
					</p>
				</div>
				<!-- End Info -->
			</div>
			<div class="mb-lg-n16">
				<!-- Search Jobs Form -->
				<div class="card border-0 tab-shadow">
					<div class="card-body">
						<form class="js-validate" action="/hotels">
							<div class="row d-block nav-select d-lg-flex mb-lg-3 px-2 px-lg-3">
								<div class="col-sm-12 col-lg-3dot6 col-xl-2dot8 mb-4 mb-lg-0">
									<span class="d-block text-gray-1 font-weight-normal text-left mb-0"
										>Hotel Name</span
									>
									<!-- Select -->
									<select
										class="js-select selectpicker dropdown-select tab-dropdown col-12 pl-0 flaticon-pin-1 d-flex align-items-center text-primary font-weight-semi-bold"
										title="Search for hotel"
										data-style=""
										data-live-search="true"
										name="hotel"
										data-searchbox-classes="input-group-sm"										
									>
										{#each dropdown as d, i}
										<option
											name="hotel"
											class="border-bottom border-color-1"
											value={d.hs_id}
											data-content='
											<span class="d-flex align-items-center">
												<span class="font-size-16">{d.name}</span>
											</span>'
										>
											{d.name}
										</option>
										{/each}							
										 
									</select>
									<!-- End Select -->
								</div>

								<div class="col-sm-12 col-lg-2dot5 mb-4 mb-lg-0">
									<!-- Input -->
									<span class="d-block text-gray-1 text-left font-weight-normal mb-0"
										>Arrival</span
									>
									<div class="border-bottom border-width-2 border-color-1">
										<div id="datepickerWrapperFromOne" class="u-datepicker input-group">
											<div class="input-group-prepend">
												<span class="d-flex align-items-center mr-2">
													<i class="flaticon-calendar text-primary font-weight-semi-bold" />
												</span>
											</div>
											<input
												name="checkin"
												class="js-range-datepicker font-size-lg-16 shadow-none font-weight-bold form-control hero-form bg-transparent border-0"
												type="date"
												data-rp-wrapper="#datepickerWrapperFromOne"												
												data-rp-date-format="Y-m-d"
												data-rp-default-date={`["2023-12-01"]`}
											/>
										</div>
										<!-- End Datepicker -->
									</div>
									<!-- End Input -->
								</div>

								<div class="col-sm-12 col-lg-2dot5 mb-4 mb-lg-0">
									<!-- Input -->
									<span class="d-block text-gray-1 text-left font-weight-normal mb-0"
										>Departure</span
									>
									<div class="border-bottom border-width-2 border-color-1">
										<div id="datepickerWrapperFromOne" class="u-datepicker input-group">
											<div class="input-group-prepend">
												<span class="d-flex align-items-center mr-2">
													<i class="flaticon-calendar text-primary font-weight-semi-bold" />
												</span>
											</div>
											<input
												name="checkout"
												class="js-range-datepicker font-size-lg-16 shadow-none font-weight-bold form-control hero-form bg-transparent border-0"
												type="date"
												data-rp-wrapper="#datepickerWrapperFromOne"												
												data-rp-date-format="Y-m-d"
												data-rp-default-date={`["2023-12-12"]`}
											/>
										</div>
										<!-- End Datepicker -->
									</div>
									<!-- End Input -->
								</div>

								<div class="col-sm-12 col-lg-2dot2 mb-4 mb-lg-0 dropdown-custom">
									<!-- Input -->
									<span class="d-block text-gray-1 text-left font-weight-normal mb-0"
										>Rooms and Guests</span
									>
									<a
										id="basicDropdownClickInvoker"
										class="dropdown-nav-link dropdown-toggle d-flex pt-3 pb-2"
										href="javascript:;"
										role="button"
										aria-controls="basicDropdownClick"
										aria-haspopup="true"
										aria-expanded="false"
										data-unfold-event="click"
										data-unfold-target="#basicDropdownClick"
										data-unfold-type="css-animation"
										data-unfold-duration="300"
										data-unfold-delay="300"
										data-unfold-hide-on-scroll="true"
										data-unfold-animation-in="slideInUp"
										data-unfold-animation-out="fadeOut"
									>
										<i
											class="flaticon-plus d-flex align-items-center mr-3 font-size-18 text-primary font-weight-semi-bold"
										/>
										<span class="text-black font-size-16 font-weight-semi-bold"
											>Enter Pax</span
										>
									</a>
									<div
										id="basicDropdownClick"
										class="dropdown-menu dropdown-unfold col-11 m-0"
										aria-labelledby="basicDropdownClickInvoker"
									>
										<div class="w-100 py-2 px-3 mb-3">
											<div class="js-quantity mx-3 row align-items-center justify-content-between">
												<span class="d-block font-size-16 text-secondary font-weight-medium"
													>Rooms</span
												>
												<div class="d-flex">
													<a
														class="js-minus btn btn-icon btn-medium btn-outline-secondary rounded-circle"
														href="javascript:;"
													>
														<small class="fas fa-minus btn-icon__inner" />
													</a>
													<input
														name="rooms"
														class="js-result form-control h-auto border-0 rounded p-0 max-width-6 text-center"
														type="text"
														value="1"
													/>
													<a
														class="js-plus btn btn-icon btn-medium btn-outline-secondary rounded-circle"
														href="javascript:;"
													>
														<small class="fas fa-plus btn-icon__inner" />
													</a>
												</div>
											</div>
										</div>
										<div class="w-100 py-2 px-3 mb-3">
											<div class="js-quantity mx-3 row align-items-center justify-content-between">
												<span class="d-block font-size-16 text-secondary font-weight-medium"
													>Adults</span
												>
												<div class="d-flex">
													<a
														class="js-minus btn btn-icon btn-medium btn-outline-secondary rounded-circle"
														href="javascript:;"
													>
														<small class="fas fa-minus btn-icon__inner" />
													</a>
													<input
														name="adults"
														class="js-result form-control h-auto border-0 rounded p-0 max-width-6 text-center"
														type="text"
														value="1"
													/>
													<a
														class="js-plus btn btn-icon btn-medium btn-outline-secondary rounded-circle"
														href="javascript:;"
													>
														<small class="fas fa-plus btn-icon__inner" />
													</a>
												</div>
											</div>
										</div>
										<div class="w-100 py-2 px-3">
											<div class="js-quantity mx-3 row align-items-center justify-content-between">
												<span class="d-block font-size-16 text-secondary font-weight-medium"
													>Child</span
												>
												<div class="d-flex">
													<a
														class="js-minus btn btn-icon btn-medium btn-outline-secondary rounded-circle"
														href="javascript:;"
													>
														<small class="fas fa-minus btn-icon__inner" />
													</a>
													<input
														name="child"
														class="js-result form-control h-auto border-0 rounded p-0 max-width-6 text-center"
														type="text"
														value="1"
													/>
													<a
														class="js-plus btn btn-icon btn-medium btn-outline-secondary rounded-circle"
														href="javascript:;"
													>
														<small class="fas fa-plus btn-icon__inner" />
													</a>
												</div>
											</div>
										</div>
										<!-- <div class="w-100 text-right py-1 pr-5">
											<a class="text-primary font-weight-semi-bold font-size-16" href="#">Done</a>
										</div> -->
									</div>
									<!-- End Input -->
								</div>

								<div class="col-sm-12 col-lg-1dot8 align-self-lg-end text-md-right">
									<button
										type="submit"
										class="btn btn-primary btn-md border-radius-3 mb-xl-0 mb-lg-1 transition-3d-hover"
										><i class="flaticon-magnifying-glass font-size-20 mr-2" />Search</button
									>
								</div>
							</div>
							<!-- End Checkbox -->
						</form>
					</div>
				</div>
				<!-- End Search Jobs Form -->
			</div>
		</div>
	</div>
	<!-- ========== END HERO ========== -->

	<!-- Product Cards Ratings With carousel -->
	<div class="product-card-block product-card-v3 mb-10">
		<div class="container-fluid space-top-2 space-top-lg-3">
			<div class="w-md-80 w-lg-50 text-center mx-md-auto pb-4 mt-xl-4">
				<h2 class="section-title text-black font-size-30 font-weight-bold mb-0">
					Most Booked Hotels
				</h2>
			</div>
			<div 
				class="js-slick-carousel u-slick u-slick--equal-height u-slick--gutters-3"
				data-slides-show="5"
				data-slides-scroll="1"
				data-arrows-classes="d-none d-lg-inline-block u-slick__arrow-classic v1 u-slick__arrow-classic--v1 u-slick__arrow-centered--y rounded-circle"
				data-arrow-left-classes="fas fa-chevron-left u-slick__arrow-classic-inner u-slick__arrow-classic-inner--left shadow-5"
				data-arrow-right-classes="fas fa-chevron-right u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right shadow-5"
				data-pagi-classes="text-center u-slick__pagination mt-4"
				data-responsive={`[{
				"breakpoint": 1025,
				"settings": {
				"slidesToShow": 3
				}
				}, {
				"breakpoint": 992,
				"settings": {
				"slidesToShow": 2
				}
				}, {
				"breakpoint": 768,
				"settings": {
				"slidesToShow": 1
				}
				}, {
				"breakpoint": 554,
				"settings": {
				"slidesToShow": 1
				}
				}]`}
			>
			 {#each resorts.slice(13,25) as resort}
				<div class="js-slide mt-2">
					<div class="card transition-3d-hover shadow-hover-2 h-100 w-100">
						<div class="position-relative">
							<a
								href="/hotels/{resort.hs_id}/{resort.slug}"
								class="d-block gradient-overlay-half-bg-gradient-v5"
							>
								<img
									class="card-img-top"
									src={`//img1.hotelscan.com/640_440/1/${resort.images[0].image_id}.jpg`}
									alt={resort.name}
								/>
							</a>							
							<div class="position-absolute bottom-0 left-0 right-0">
								<div class="px-4 pb-3">
									<a href="/hotels/{resort.hs_id}/{resort.slug}" class="d-block">
										<div class="d-flex align-items-center font-size-14 text-white">
											<i class="icon flaticon-placeholder mr-2 font-size-20" /> {resort.location.city}
										</div>
									</a>
								</div>
							</div>
						</div>
						<div class="card-body px-4 pt-2 pb-3">
							<div class="mb-2">
								<div
									class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
								>
									<div class="green-lighter">
										{@html getStar(resort.quality.stars)}
									</div>
								</div>
							</div>
							<a
								href="/hotels/{resort.hs_id}/{resort.slug}"
								class="card-title font-size-17 font-weight-medium text-dark"
								>{resort.name}</a
							>
							<div class="mt-2 mb-3">
								<span
									class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
									>{resort.quality.review_rating}/100</span
								>
								<span class="font-size-14 text-gray-1 ml-2">({resort.quality.review_count} reviews)</span>
							</div>
							<!-- <div class="mb-0">
								<span class="mr-1 font-size-14 text-gray-1">{resort.short_description}</span>
								 
							</div> -->
						</div>
					</div>
				</div>
			{/each} 
			 
			</div>
		</div>
	</div>
	<!-- End Product Cards Ratings With carousel -->

	<div class="product-card-block product-card-v3 mb-10">
		<div class="container-fluid space-top-2 space-top-lg-1">
			<div class="w-md-80 w-lg-50 text-center mx-md-auto pb-4 mt-xl-4">
				<h2 class="section-title text-black font-size-30 font-weight-bold mb-0">
					For Luxury Travelers
				</h2>
			</div>
			<div 
				class="js-slick-carousel u-slick u-slick--equal-height u-slick--gutters-3"
				data-slides-show="5"
				data-slides-scroll="1"
				data-arrows-classes="d-none d-lg-inline-block u-slick__arrow-classic v1 u-slick__arrow-classic--v1 u-slick__arrow-centered--y rounded-circle"
				data-arrow-left-classes="fas fa-chevron-left u-slick__arrow-classic-inner u-slick__arrow-classic-inner--left shadow-5"
				data-arrow-right-classes="fas fa-chevron-right u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right shadow-5"
				data-pagi-classes="text-center u-slick__pagination mt-4"
				data-responsive={`[{
				"breakpoint": 1025,
				"settings": {
				"slidesToShow": 3
				}
				}, {
				"breakpoint": 992,
				"settings": {
				"slidesToShow": 2
				}
				}, {
				"breakpoint": 768,
				"settings": {
				"slidesToShow": 1
				}
				}, {
				"breakpoint": 554,
				"settings": {
				"slidesToShow": 1
				}
				}]`}
			>
			 {#each lux.slice(0,12) as b}
				<div class="js-slide mt-2">
					<div class="card transition-3d-hover shadow-hover-2 h-100 w-100">
						<div class="position-relative">
							<a
								href="/hotels/{b.hs_id}/{b.slug}"
								class="d-block gradient-overlay-half-bg-gradient-v5"
							>
								<img
									class="card-img-top"
									src={`//img1.hotelscan.com/640_440/1/${b.images[0].image_id}.jpg`}
									alt={b.name}
								/>
							</a>							
							<div class="position-absolute bottom-0 left-0 right-0">
								<div class="px-4 pb-3">
									<a href="/hotels/{b.hs_id}/{b.slug}" class="d-block">
										<div class="d-flex align-items-center font-size-14 text-white">
											<i class="icon flaticon-placeholder mr-2 font-size-20" /> {b.location.city}
										</div>
									</a>
								</div>
							</div>
						</div>
						<div class="card-body px-4 pt-2 pb-3">
							<div class="mb-2">
								<div
									class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
								>
									<div class="green-lighter">
										{@html getStar(b.quality.stars)}
									</div>
								</div>
							</div>
							<a
								href="/hotels/{b.hs_id}/{b.slug}"
								class="card-title font-size-17 font-weight-medium text-dark"
								>{b.name}</a
							>
							<div class="mt-2 mb-3">
								<span
									class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
									>{b.quality.review_rating}/100</span
								>
								<span class="font-size-14 text-gray-1 ml-2">({b.quality.review_count} reviews)</span>
							</div>
							<!-- <div class="mb-0">
								<span class="mr-1 font-size-14 text-gray-1">{resort.short_description}</span>
								 
							</div> -->
						</div>
					</div>
				</div>
			{/each} 
			 
			</div>
		</div>
	</div>

	<div class="product-card-block product-card-v3 mb-10">
		<div class="container-fluid space-top-2 space-top-lg-1">
			<div class="w-md-80 w-lg-50 text-center mx-md-auto pb-4 mt-xl-4">
				<h2 class="section-title text-black font-size-30 font-weight-bold mb-0">
					Trending Guest Houses, hostels
				</h2>
			</div>
			<div 
				class="js-slick-carousel u-slick u-slick--equal-height u-slick--gutters-3"
				data-slides-show="5"
				data-slides-scroll="1"
				data-arrows-classes="d-none d-lg-inline-block u-slick__arrow-classic v1 u-slick__arrow-classic--v1 u-slick__arrow-centered--y rounded-circle"
				data-arrow-left-classes="fas fa-chevron-left u-slick__arrow-classic-inner u-slick__arrow-classic-inner--left shadow-5"
				data-arrow-right-classes="fas fa-chevron-right u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right shadow-5"
				data-pagi-classes="text-center u-slick__pagination mt-4"
				data-responsive={`[{
				"breakpoint": 1025,
				"settings": {
				"slidesToShow": 3
				}
				}, {
				"breakpoint": 992,
				"settings": {
				"slidesToShow": 2
				}
				}, {
				"breakpoint": 768,
				"settings": {
				"slidesToShow": 1
				}
				}, {
				"breakpoint": 554,
				"settings": {
				"slidesToShow": 1
				}
				}]`}
			>
			 {#each guesthouse.slice(0,12) as gh}
				<div class="js-slide mt-2">
					<div class="card transition-3d-hover shadow-hover-2 h-100 w-100">
						<div class="position-relative">
							<a
								href="/hotels/{gh.hs_id}/{gh.slug}"
								class="d-block gradient-overlay-half-bg-gradient-v5"
							>
								<img
									class="card-img-top"
									src={`//img1.hotelscan.com/640_440/1/${gh.images[0].image_id}.jpg`}
									alt={gh.name}
								/>
							</a>							
							<div class="position-absolute bottom-0 left-0 right-0">
								<div class="px-4 pb-3">
									<a href="/hotels/{gh.hs_id}/{gh.slug}" class="d-block">
										<div class="d-flex align-items-center font-size-14 text-white">
											<i class="icon flaticon-placeholder mr-2 font-size-20" /> {gh.location.city}
										</div>
									</a>
								</div>
							</div>
						</div>
						<div class="card-body px-4 pt-2 pb-3">
							<div class="mb-2">
								<div
									class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
								>
									<div class="green-lighter">
										{@html getStar(gh.quality.stars)}
									</div>
								</div>
							</div>
							<a
								href="/hotels/{gh.hs_id}/{gh.slug}"
								class="card-title font-size-17 font-weight-medium text-dark"
								>{gh.name}</a
							>
							<div class="mt-2 mb-3">
								<span
									class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
									>{gh.quality.review_rating}/100</span
								>
								<span class="font-size-14 text-gray-1 ml-2">({gh.quality.review_count} reviews)</span>
							</div>
							<!-- <div class="mb-0">
								<span class="mr-1 font-size-14 text-gray-1">{resort.short_description}</span>
								 
							</div> -->
						</div>
					</div>
				</div>
			{/each} 
			 
			</div>
		</div>
	</div>

	

	<!-- Destinantion v4 -->
	<!-- <div class="destination-block destination-v4">
		<div class="container space-bottom-1 pt-3">
			<div class="w-md-80 w-lg-50 text-center mx-md-auto mb-5 mt-3">
				<h2 class="section-title text-black font-size-30 font-weight-bold mb-0">
					Popular Destination
				</h2>
			</div>
			<div class="row">
			 
				<div class="col-md-6 mb-3 mb-md-0">
					<div
						class="min-height-350 bg-img-hero rounded-border p-5 gradient-overlay-half-bg-gradient transition-3d-hover shadow-hover-2"
						style="background-image: url(../../assets/img/630x350/img1.jpg);"
					>
						<header class="w-100 d-flex justify-content-between mb-3">
							<div>
								<div class="destination pb-3 text-lh-1">
									<a
										href="../others/destination.html"
										class="text-white font-weight-bold font-size-21">United Kingdom</a
									>
								</div>
								<div class="mt-1 pt-1">
									<a href="../hotels/hotel-single-v1.html" class="text-white">79 Hotel</a>
								</div>
							</div>
						</header>
					</div>
				</div>
				

				
				<div class="col-md-6 col-xl-3 mb-3 mb-md-4 pb-1">
					<div
						class="min-height-350 bg-img-hero rounded-border p-5 gradient-overlay-half-bg-gradient transition-3d-hover shadow-hover-2"
						style="background-image: url(../../assets/img/300x350/img2.jpg);"
					>
						<header class="w-100 d-flex justify-content-between mb-3">
							<div>
								<div class="destination pb-3 text-lh-1">
									<a
										href="../others/destination.html"
										class="text-white font-weight-bold font-size-21">France</a
									>
								</div>
								<div class="mt-1 pt-1">
									<a href="../hotels/hotel-single-v1.html" class="text-white">54 Hotel</a>
								</div>
							</div>
						</header>
					</div>
				</div>
				

				
				<div class="col-md-6 col-xl-3 mb-3 mb-md-4 pb-1">
					<div
						class="min-height-350 bg-img-hero rounded-border p-5 gradient-overlay-half-bg-gradient transition-3d-hover shadow-hover-2"
						style="background-image: url(../../assets/img/300x350/img4.jpg);"
					>
						<header class="w-100 d-flex justify-content-between mb-3">
							<div>
								<div class="destination pb-3 text-lh-1">
									<a
										href="../others/destination.html"
										class="text-white font-weight-bold font-size-21">India</a
									>
								</div>
								<div class="mt-1 pt-1">
									<a href="../hotels/hotel-single-v1.html" class="text-white">26 Hotel</a>
								</div>
							</div>
						</header>
					</div>
				</div>
				

				
				<div class="col-md-6 col-xl-3 mb-3 mb-md-4 pb-1">
					<div
						class="min-height-350 bg-img-hero rounded-border p-5 gradient-overlay-half-bg-gradient transition-3d-hover shadow-hover-2"
						style="background-image: url(../../assets/img/300x350/img1.jpg);"
					>
						<header class="w-100 d-flex justify-content-between mb-3">
							<div>
								<div class="destination pb-3 text-lh-1">
									<a
										href="../others/destination.html"
										class="text-white font-weight-bold font-size-21">United States</a
									>
								</div>
								<div class="mt-1 pt-1">
									<a href="../hotels/hotel-single-v1.html" class="text-white">1991 Hotel</a>
								</div>
							</div>
						</header>
					</div>
				</div>
				

				
				<div class="col-md-6 col-xl-3 mb-3 mb-md-4 pb-1">
					<div
						class="min-height-350 bg-img-hero rounded-border p-5 gradient-overlay-half-bg-gradient transition-3d-hover shadow-hover-2"
						style="background-image: url(../../assets/img/300x350/img3.jpg);"
					>
						<header class="w-100 d-flex justify-content-between mb-3">
							<div>
								<div class="destination pb-3 text-lh-1">
									<a
										href="../others/destination.html"
										class="text-white font-weight-bold font-size-21">Ukraine</a
									>
								</div>
								<div class="mt-1 pt-1">
									<a href="../hotels/hotel-single-v1.html" class="text-white">269 Hotel</a>
								</div>
							</div>
						</header>
					</div>
				</div>
				

				
				<div class="col-md-6 mb-3 mb-md-0">
					<div
						class="min-height-350 bg-img-hero rounded-border p-5 gradient-overlay-half-bg-gradient transition-3d-hover shadow-hover-2"
						style="background-image: url(../../assets/img/630x350/img2.jpg);"
					>
						<header class="w-100 d-flex justify-content-between mb-3">
							<div>
								<div class="destination pb-3 text-lh-1">
									<a
										href="../others/destination.html"
										class="text-white font-weight-bold font-size-21">Turkey</a
									>
								</div>
								<div class="mt-1 pt-1">
									<a href="../hotels/hotel-single-v1.html" class="text-white">1205 Hotel</a>
								</div>
							</div>
						</header>
					</div>
				</div>
				
			</div>
		</div>
	</div> -->
	<!-- End Destinantion v4 -->

	<!--Banner v3-->
	<!-- <div
		class="banner-block banner-v3 dzsparallaxer auto-init height-is-based-on-content use-loading mode-scroll mb-10"
		data-options={`{direction: "normal"}`}
	>
		 
		<div
			class="divimage dzsparallaxer--target bg-img-hero"
			style="height: 130%; background-image: url(assets/img/1920x500/img4.jpg);"
		/>
		<div class="text-center space-3">
			<div class="pt-xl-2 pb-xl-5 mb-xl-1">
				<h6 class="text-gray-4 font-size-30 font-weight-bold mb-1 opacity-6">Enjoy Summer Deals</h6>
				<h5 class="text-white font-size-40 font-weight-bold mb-5 pb-xl-1">Up to 40% Discount!</h5>
				<a
					class="btn btn-outline-white border-width-2 min-width-200 font-weight-normal transition-3d-hover"
					href="../blog/blog-list.html">Learn more</a
				>
			</div>
		</div>
	</div> -->
	<!--End Banner v3-->

	<!-- Tabs v3 -->
	<!-- <div class="tabs-block tabs-v3">
		<div class="container space-top-1 pb-3 mb-1">
			<div class="w-md-80 w-lg-50 text-center mx-md-auto my-3">
				<h2 class="section-title text-black font-size-30 font-weight-bold mb-0">
					Recommended Hotels
				</h2>
			</div>
			 
			<ul
				class="nav tab-nav-line flex-nowrap pb-4 tab-nav justify-content-lg-center text-nowrap"
				role="tablist"
			>
				<li class="nav-item">
					<a
						class="nav-link font-weight-medium active"
						id="pills-one-example-t3-tab"
						data-toggle="pill"
						href="#pills-one-example-t3"
						role="tab"
						aria-controls="pills-one-example-t3"
						aria-selected="true"
					>
						<div
							class="d-flex flex-column flex-md-row position-relative text-dark align-items-center"
						>
							<span class="tabtext font-weight-semi-bold">New York</span>
						</div>
					</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link font-weight-medium"
						id="pills-two-example-t3-tab"
						data-toggle="pill"
						href="#pills-two-example-t3"
						role="tab"
						aria-controls="pills-two-example-t3"
						aria-selected="true"
					>
						<div
							class="d-flex flex-column flex-md-row position-relative text-dark align-items-center"
						>
							<span class="tabtext font-weight-semi-bold">Hong Kong</span>
						</div>
					</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link font-weight-medium"
						id="pills-three-example-t3-tab"
						data-toggle="pill"
						href="#pills-three-example-t3"
						role="tab"
						aria-controls="pills-three-example-t3"
						aria-selected="true"
					>
						<div
							class="d-flex flex-column flex-md-row position-relative text-dark align-items-center"
						>
							<span class="tabtext font-weight-semi-bold">Shangai</span>
						</div>
					</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link font-weight-medium"
						id="pills-four-example-t3-tab"
						data-toggle="pill"
						href="#pills-four-example-t3"
						role="tab"
						aria-controls="pills-four-example-t3"
						aria-selected="true"
					>
						<div
							class="d-flex flex-column flex-md-row position-relative text-dark align-items-center"
						>
							<span class="tabtext font-weight-semi-bold">Bangkok</span>
						</div>
					</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link font-weight-medium"
						id="pills-five-example-t3-tab"
						data-toggle="pill"
						href="#pills-five-example-t3"
						role="tab"
						aria-controls="pills-five-example-t3"
						aria-selected="true"
					>
						<div
							class="d-flex flex-column flex-md-row position-relative text-dark align-items-center"
						>
							<span class="tabtext font-weight-semi-bold">Tokyo</span>
						</div>
					</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link font-weight-medium"
						id="pills-six-example-t3-tab"
						data-toggle="pill"
						href="#pills-six-example-t3"
						role="tab"
						aria-controls="pills-six-example-t3"
						aria-selected="true"
					>
						<div
							class="d-flex flex-column flex-md-row position-relative text-dark align-items-center"
						>
							<span class="tabtext font-weight-semi-bold">Singapore</span>
						</div>
					</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link font-weight-medium"
						id="pills-seven-example-t3-tab"
						data-toggle="pill"
						href="#pills-seven-example-t3"
						role="tab"
						aria-controls="pills-seven-example-t3"
						aria-selected="true"
					>
						<div
							class="d-flex flex-column flex-md-row position-relative text-dark align-items-center"
						>
							<span class="tabtext font-weight-semi-bold">Paris</span>
						</div>
					</a>
				</li>
			</ul>
			 
			<div class="tab-content">
				<div
					class="tab-pane fade active show"
					id="pills-one-example-t3"
					role="tabpanel"
					aria-labelledby="pills-one-example-t3-tab"
				>
					<div class="row">
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img9.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Greater London, United
													Kingdom
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Empire Prestige Causeway Bay</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img10.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Park Avenue Baker Street London</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img11.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark">New Road Hotel</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img12.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>New York Marriott Downtown</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="tab-pane fade"
					id="pills-two-example-t3"
					role="tabpanel"
					aria-labelledby="pills-two-example-t3-tab"
				>
					<div class="row">
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img9.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Greater London, United
													Kingdom
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Empire Prestige Causeway Bay</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img12.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>New York Marriott Downtown</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img10.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Park Avenue Baker Street London</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img11.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark">New Road Hotel</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="tab-pane fade"
					id="pills-three-example-t3"
					role="tabpanel"
					aria-labelledby="pills-three-example-t3-tab"
				>
					<div class="row">
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img9.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Greater London, United
													Kingdom
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Empire Prestige Causeway Bay</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img10.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Park Avenue Baker Street London</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img11.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark">New Road Hotel</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img12.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>New York Marriott Downtown</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="tab-pane fade"
					id="pills-four-example-t3"
					role="tabpanel"
					aria-labelledby="pills-four-example-t3-tab"
				>
					<div class="row">
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img9.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Greater London, United
													Kingdom
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Empire Prestige Causeway Bay</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img11.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark">New Road Hotel</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img10.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Park Avenue Baker Street London</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img12.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>New York Marriott Downtown</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="tab-pane fade"
					id="pills-five-example-t3"
					role="tabpanel"
					aria-labelledby="pills-five-example-t3-tab"
				>
					<div class="row">
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img10.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Park Avenue Baker Street London</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img9.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Greater London, United
													Kingdom
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Empire Prestige Causeway Bay</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img11.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark">New Road Hotel</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img12.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>New York Marriott Downtown</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="tab-pane fade"
					id="pills-six-example-t3"
					role="tabpanel"
					aria-labelledby="pills-six-example-t3-tab"
				>
					<div class="row">
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img11.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark">New Road Hotel</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img9.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Greater London, United
													Kingdom
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Empire Prestige Causeway Bay</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img10.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Park Avenue Baker Street London</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img12.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>New York Marriott Downtown</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="tab-pane fade"
					id="pills-seven-example-t3"
					role="tabpanel"
					aria-labelledby="pills-seven-example-t3-tab"
				>
					<div class="row">
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img12.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>New York Marriott Downtown</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img9.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Greater London, United
													Kingdom
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Empire Prestige Causeway Bay</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img10.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark"
										>Park Avenue Baker Street London</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-4 col-xl-3 mb-3 mb-md-4 pb-1">
							<div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
								<div class="position-relative">
									<a
										href="../hotels/hotel-single-v1.html"
										class="d-block gradient-overlay-half-bg-gradient-v5"
									>
										<img class="card-img-top" src="../../assets/img/300x230/img11.jpg" alt="img" />
									</a>
									<div class="position-absolute top-0 right-0 pt-3 pr-3">
										<button
											type="button"
											class="btn btn-sm btn-icon text-white rounded-circle"
											data-toggle="tooltip"
											data-placement="top"
											title=""
											data-original-title="Save for later"
										>
											<span class="flaticon-valentine-heart" />
										</button>
									</div>
									<div class="position-absolute bottom-0 left-0 right-0 pb-3">
										<div class="col">
											<a href="../hotels/hotel-single-v1.html" class="d-block">
												<div class="d-flex align-items-center font-size-14 text-white">
													<i class="icon flaticon-pin-1 mr-2 font-size-20" /> Istanbul, Turkey
												</div>
											</a>
										</div>
									</div>
								</div>
								<div class="card-body px-4 py-3">
									<div class="mb-2">
										<div
											class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3"
										>
											<div class="green-lighter">
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
												<small class="fas fa-star" />
											</div>
										</div>
									</div>
									<a
										href="../hotels/hotel-single-v1.html"
										class="card-title font-size-17 font-weight-medium text-dark">New Road Hotel</a
									>
									<div class="mt-2 mb-3">
										<span
											class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal"
											>4.6/5</span
										>
										<span class="font-size-14 text-gray-1 ml-2">(166 reviews)</span>
									</div>
									<div class="mb-0">
										<span class="mr-1 font-size-14 text-gray-1">From</span>
										<span class="font-weight-bold">£899.00</span>
										<span class="font-size-14 text-gray-1"> / night</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div> -->
	<!-- End Tabs v3 -->

	<!-- Icon Block v1 -->
	<div class="icon-block-center icon-center-v1 border-bottom border-color-8">
		<div class="container text-center space-bottom-1">
			<!-- Title -->
			<div class="w-md-80 w-lg-50 text-center mx-md-auto pb-1">
				<h2 class="section-title text-black font-size-30 font-weight-bold">Why Choose</h2>
			</div>
			<!-- End Title -->

			<!-- Features -->
			<div class="mb-2">
				<div class="row">
					<!-- Icon Block -->
					<div class="col-md-4">
						<i class="flaticon-price text-primary font-size-80 mb-3" />
						<h5 class="font-size-17 text-dark font-weight-bold mb-2">
							<a href="#">Competitive Pricing</a>
						</h5>
						<p class="text-gray-1 px-xl-2 px-uw-7">
							Compare prices over large OTAS such as Booking.com and more OTAs coming soon
						</p>
					</div>
					<!-- End Icon Block -->

					<!-- Icon Block -->
					<div class="col-md-4">
						<i class="flaticon-medal text-primary font-size-80 mb-3" />
						<h5 class="font-size-17 text-dark font-weight-bold mb-2">
							<a href="#">Award-Winning Service</a>
						</h5>
						<p class="text-gray-1 px-xl-2 px-uw-7">
							Travel worry-free knowing that we're here if you needus, 24 hours a day
						</p>
					</div>
					<!-- End Icon Block -->

					<!-- Icon Block -->
					<div class="col-md-4">
						<i class="flaticon-global-1 text-primary font-size-80 mb-3" />
						<h5 class="font-size-17 text-dark font-weight-bold mb-2">
							<a href="#">Maldives Coverage</a>
						</h5>
						<p class="text-gray-1 px-xl-2 px-uw-7">
							Over 700+ hotels & resorts in Maldives
						</p>
					</div>
					<!-- End Icon Block -->
				</div>
			</div>
			<!-- End Features -->
		</div>
	</div>
	<!-- End Icon Block v1 -->
</main>

<Footer />
