<script>
    import Header from '$lib/components/hotels/header.svelte';
	import Footer from '$lib/components/common/footer.svelte';
    import { paginate, LightPaginationNav } from 'svelte-paginate'
    import data from '$lib/data/maldives.json'

	let hotels = data?.data?.records
    let currentPage = 1
    let pageSize = 18
    $: hotellist = hotels && paginate({ items: hotels, pageSize, currentPage })

 
    
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
</script>
<style>
    .u-header__navbar-brand-text {
        font-size: 1.3rem;
        margin-top: 0.3rem;
    }
    
    @media (max-width: 767.98px) {
        .u-header__navbar-brand-text {
            font-size: 1rem;
        }
        .hide-mobile { 
            display: none !important;
        }
    }

   
</style>

<Header />

<main id="content" role="main">
    <div class="container pt-5 pt-xl-8">
        <div class="row mb-5 mb-lg-8 mt-xl-1">
            <div class="col-lg-4 col-xl-3 order-lg-1 width-md-50 hide-mobile">
                <div class="navbar-expand-lg navbar-expand-lg-collapse-block">
                    <button class="btn d-lg-none mb-5 p-0 collapsed" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="far fa-caret-square-down text-primary font-size-20 card-btn-arrow ml-0"></i>
                        <span class="text-primary ml-2">Sidebar</span>
                    </button>
                    <div id="sidebar" class="collapse navbar-collapse">
                        <div class="mb-6 w-100">
                            <div class="pb-4 mb-2">
                                <div class="sidebar border border-color-1 rounded-xs">
                                    <div class="p-4 mb-1">
                                        <!-- Input -->
                                        <span class="d-block text-gray-1  font-weight-normal mb-0 text-left">Destination or Hotel Name</span>
                                        <div class="mb-4">
                                            <div class="input-group border-bottom border-width-2 border-color-1">
                                                <i class="flaticon-pin-1 d-flex align-items-center mr-2 text-primary font-weight-semi-bold font-size-22"></i>
                                              <input type="text" class="form-control font-weight-medium font-size-15 shadow-none hero-form border-0 p-0" placeholder="Where are you going?" aria-label="Keyword or title" aria-describedby="keywordInputAddon">
                                            </div>
                                        </div>
                                        <!-- End Input -->
                                        <!-- Input -->
                                        <span class="d-block text-gray-1 font-weight-normal mb-0 text-left">Check In - Out</span>
                                        <div class="mb-4">
                                            <div class="border-bottom border-width-2 border-color-1">
                                                <div id="datepickerWrapperPick" class="u-datepicker input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="d-flex align-items-center mr-2 font-size-21">
                                                          <i class="flaticon-calendar text-primary font-weight-semi-bold"></i>
                                                        </span>
                                                    </div>
                                                    <input class="js-range-datepicker font-weight-medium font-size-15 ml-1 shadow-none form-control hero-form bg-transparent border-0 flatpickr-input p-0" type="text" placeholder="July 7/2019" aria-label="July 7/2019" data-rp-wrapper="#datepickerWrapperPick" data-rp-type="range" data-rp-date-format="M d / Y" data-rp-default-date="[&quot;Jul 7 / 2020&quot;, &quot;Aug 25 / 2020&quot;]" readonly="readonly" style="width: 217.5px;">
                                                <div class="flatpickr-calendar rangeMode animate showTimeInput" tabindex="-1"><div class="flatpickr-months"><span class="flatpickr-prev-month"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17 17"><g></g><path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z"></path></svg></span><div class="flatpickr-month"><div class="flatpickr-current-month"><span class="cur-month">July </span><div class="numInputWrapper"><input class="numInput cur-year" type="text" pattern="\d*" tabindex="-1" aria-label="Year"><span class="arrowUp"></span><span class="arrowDown"></span></div></div></div><span class="flatpickr-next-month"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17 17"><g></g><path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></path></svg></span></div><div class="flatpickr-innerContainer"><div class="flatpickr-rContainer"><div class="flatpickr-weekdays"><div class="flatpickr-weekdaycontainer">
<span class="flatpickr-weekday">
Mo</span><span class="flatpickr-weekday">Tu</span><span class="flatpickr-weekday">We</span><span class="flatpickr-weekday">Th</span><span class="flatpickr-weekday">Fr</span><span class="flatpickr-weekday">Sa</span><span class="flatpickr-weekday">Su
</span>
</div></div><div class="flatpickr-days" tabindex="-1"><div class="dayContainer"><span class="flatpickr-day prevMonthDay" aria-label="June 29, 2020" tabindex="-1">29</span><span class="flatpickr-day prevMonthDay" aria-label="June 30, 2020" tabindex="-1">30</span><span class="flatpickr-day " aria-label="July 1, 2020" tabindex="-1">1</span><span class="flatpickr-day " aria-label="July 2, 2020" tabindex="-1">2</span><span class="flatpickr-day " aria-label="July 3, 2020" tabindex="-1">3</span><span class="flatpickr-day " aria-label="July 4, 2020" tabindex="-1">4</span><span class="flatpickr-day " aria-label="July 5, 2020" tabindex="-1">5</span><span class="flatpickr-day " aria-label="July 6, 2020" tabindex="-1">6</span><span class="flatpickr-day selected startRange" aria-label="July 7, 2020" tabindex="-1">7</span><span class="flatpickr-day inRange" aria-label="July 8, 2020" tabindex="-1">8</span><span class="flatpickr-day inRange" aria-label="July 9, 2020" tabindex="-1">9</span><span class="flatpickr-day inRange" aria-label="July 10, 2020" tabindex="-1">10</span><span class="flatpickr-day inRange" aria-label="July 11, 2020" tabindex="-1">11</span><span class="flatpickr-day inRange" aria-label="July 12, 2020" tabindex="-1">12</span><span class="flatpickr-day inRange" aria-label="July 13, 2020" tabindex="-1">13</span><span class="flatpickr-day inRange" aria-label="July 14, 2020" tabindex="-1">14</span><span class="flatpickr-day inRange" aria-label="July 15, 2020" tabindex="-1">15</span><span class="flatpickr-day inRange" aria-label="July 16, 2020" tabindex="-1">16</span><span class="flatpickr-day inRange" aria-label="July 17, 2020" tabindex="-1">17</span><span class="flatpickr-day inRange" aria-label="July 18, 2020" tabindex="-1">18</span><span class="flatpickr-day inRange" aria-label="July 19, 2020" tabindex="-1">19</span><span class="flatpickr-day inRange" aria-label="July 20, 2020" tabindex="-1">20</span><span class="flatpickr-day inRange" aria-label="July 21, 2020" tabindex="-1">21</span><span class="flatpickr-day inRange" aria-label="July 22, 2020" tabindex="-1">22</span><span class="flatpickr-day inRange" aria-label="July 23, 2020" tabindex="-1">23</span><span class="flatpickr-day inRange" aria-label="July 24, 2020" tabindex="-1">24</span><span class="flatpickr-day inRange" aria-label="July 25, 2020" tabindex="-1">25</span><span class="flatpickr-day inRange" aria-label="July 26, 2020" tabindex="-1">26</span><span class="flatpickr-day inRange" aria-label="July 27, 2020" tabindex="-1">27</span><span class="flatpickr-day inRange" aria-label="July 28, 2020" tabindex="-1">28</span><span class="flatpickr-day inRange" aria-label="July 29, 2020" tabindex="-1">29</span><span class="flatpickr-day inRange" aria-label="July 30, 2020" tabindex="-1">30</span><span class="flatpickr-day inRange" aria-label="July 31, 2020" tabindex="-1">31</span><span class="flatpickr-day nextMonthDay inRange" aria-label="August 1, 2020" tabindex="-1">1</span><span class="flatpickr-day nextMonthDay inRange" aria-label="August 2, 2020" tabindex="-1">2</span><span class="flatpickr-day nextMonthDay inRange" aria-label="August 3, 2020" tabindex="-1">3</span><span class="flatpickr-day nextMonthDay inRange" aria-label="August 4, 2020" tabindex="-1">4</span><span class="flatpickr-day nextMonthDay inRange" aria-label="August 5, 2020" tabindex="-1">5</span><span class="flatpickr-day nextMonthDay inRange" aria-label="August 6, 2020" tabindex="-1">6</span><span class="flatpickr-day nextMonthDay inRange" aria-label="August 7, 2020" tabindex="-1">7</span><span class="flatpickr-day nextMonthDay inRange" aria-label="August 8, 2020" tabindex="-1">8</span><span class="flatpickr-day nextMonthDay inRange" aria-label="August 9, 2020" tabindex="-1">9</span></div></div></div></div></div></div>
                                                <!-- End Datepicker -->
                                            </div>
                                        </div>
                                        <!-- End Input -->

                                        <!-- Input -->
                                        <span class="d-block text-gray-1 font-weight-normal mb-0 text-left">Rooms and Guests</span>
                                        <div class="mb-4 position-relative">
                                            <div class="border-bottom border-width-2 border-color-1">
                                                <a id="basicDropdownClickInvoker" class="dropdown-nav-link dropdown-toggle flex-horizontal-center pt-3 pb-2" href="javascript:;" role="button" aria-controls="basicDropdownClick" aria-haspopup="true" aria-expanded="false" data-unfold-event="click" data-unfold-target="#basicDropdownClick" data-unfold-type="css-animation" data-unfold-duration="300" data-unfold-delay="300" data-unfold-hide-on-scroll="true" data-unfold-animation-in="slideInUp" data-unfold-animation-out="fadeOut">
                                                    <i class="flaticon-add-group d-flex align-items-center mr-3 font-size-20 text-primary font-weight-semi-bold"></i>
                                                    <span class="text-black font-weight-medium font-size-15 mr-auto">2 Rooms - 3 Guests</span>
                                                </a>
                                                <div id="basicDropdownClick" class="dropdown-menu dropdown-unfold col m-0 u-unfold--css-animation u-unfold--hidden fadeOut u-unfold--reverse-y" aria-labelledby="basicDropdownClickInvoker" style="animation-duration: 300ms; left: 0px;">
                                                    <div class="w-100 py-2 px-3 mb-3">
                                                        <div class="js-quantity mx-3 row align-items-center justify-content-between">
                                                            <span class="d-block font-size-16 text-secondary font-weight-medium">Rooms</span>
                                                            <div class="d-flex">
                                                                <a class="js-minus btn btn-icon btn-medium btn-outline-secondary rounded-circle" href="javascript:;">
                                                                    <small class="fas fa-minus btn-icon__inner"></small>
                                                                </a>
                                                                <input class="js-result form-control h-auto border-0 rounded p-0 max-width-6 text-center" type="text" value="1">
                                                                <a class="js-plus btn btn-icon btn-medium btn-outline-secondary rounded-circle" href="javascript:;">
                                                                    <small class="fas fa-plus btn-icon__inner"></small>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="w-100 py-2 px-3 mb-3">
                                                        <div class="js-quantity mx-3 row align-items-center justify-content-between">
                                                            <span class="d-block font-size-16 text-secondary font-weight-medium">Adults</span>
                                                            <div class="d-flex">
                                                                <a class="js-minus btn btn-icon btn-medium btn-outline-secondary rounded-circle" href="javascript:;">
                                                                    <small class="fas fa-minus btn-icon__inner"></small>
                                                                </a>
                                                                <input class="js-result form-control h-auto border-0 rounded p-0 max-width-6 text-center" type="text" value="1">
                                                                <a class="js-plus btn btn-icon btn-medium btn-outline-secondary rounded-circle" href="javascript:;">
                                                                    <small class="fas fa-plus btn-icon__inner"></small>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="w-100 py-2 px-3">
                                                        <div class="js-quantity mx-3 row align-items-center justify-content-between">
                                                            <span class="d-block font-size-16 text-secondary font-weight-medium">Child</span>
                                                            <div class="d-flex">
                                                                <a class="js-minus btn btn-icon btn-medium btn-outline-secondary rounded-circle" href="javascript:;">
                                                                    <small class="fas fa-minus btn-icon__inner"></small>
                                                                </a>
                                                                <input class="js-result form-control h-auto border-0 rounded p-0 max-width-6 text-center" type="text" value="1">
                                                                <a class="js-plus btn btn-icon btn-medium btn-outline-secondary rounded-circle" href="javascript:;">
                                                                    <small class="fas fa-plus btn-icon__inner"></small>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="w-100 text-right py-1 pr-5">
                                                        <a class="text-primary font-weight-semi-bold font-size-16" href="#">Done</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End Input -->

                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary height-60 w-100 font-weight-bold mb-xl-0 mb-lg-1 transition-3d-hover"><i class="flaticon-magnifying-glass mr-2 font-size-17"></i>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             

                            <div class="sidenav border border-color-8 rounded-xs">
                                <!-- Accordiaon -->
                                <div id="RatingAccordion" class="accordion rounded shadow-none border-bottom">
                                   <div class="card-collapse" id="shopRatingHeadingOne">
                                        <h3 class="mb-0">
                                            <button type="button" class="btn btn-link btn-block card-btn py-2 px-5 text-lh-3 collapsed" data-toggle="collapse" data-target="#shopRatingOne" aria-expanded="false" aria-controls="shopRatingOne">
                                                <span class="row align-items-center">
                                                    <span class="col-9">
                                                        <span class="font-weight-bold font-size-17 text-dark mb-3">Star Rating</span>
                                                    </span>
                                                    <span class="col-3 text-right">
                                                        <span class="card-btn-arrow">
                                                            <span class="fas fa-chevron-down small"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        </h3>
                                    </div>
                                    <div id="shopRatingOne" class="collapse show" aria-labelledby="shopRatingHeadingOne" data-parent="#RatingAccordion">
                                        <div class="card-body pt-0 mt-1 px-5">
                                            <!-- Checkboxes -->
                                            <div class="form-group font-size-14 text-lh-md text-secondary mb-3">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" id="brandAdidas">
                                                    <label class="custom-control-label text-lh-inherit text-color-1" for="brandAdidas">
                                                        <div class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary">
                                                            <div class="green-lighter ml-1 letter-spacing-2">
                                                                <i class="fas fa-star"></i>
                                                                <i class="fas fa-star"></i>
                                                                <i class="fas fa-star"></i>
                                                                <i class="fas fa-star"></i>
                                                                <i class="fas fa-star"></i>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="form-group font-size-14 text-lh-md text-secondary mb-3">
                                                <div class="custom-control custom-checkbox">
                                                   <input type="checkbox" class="custom-control-input" id="brandNewBalance">
                                                   <label class="custom-control-label text-lh-inherit text-color-1" for="brandNewBalance">
                                                        <div class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary">
                                                            <div class="green-lighter ml-1 letter-spacing-2">
                                                                <i class="fas fa-star"></i>
                                                                <i class="fas fa-star"></i>
                                                                <i class="fas fa-star"></i>
                                                                <i class="fas fa-star"></i>
                                                            </div>
                                                        </div>
                                                   </label>
                                                </div>
                                            </div>
                                            <div class="form-group font-size-14 text-lh-md text-secondary mb-3">
                                                <div class="custom-control custom-checkbox">
                                                  <input type="checkbox" class="custom-control-input" id="brandNike">
                                                  <label class="custom-control-label text-lh-inherit text-color-1" for="brandNike">
                                                        <div class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary">
                                                            <div class="green-lighter ml-1 letter-spacing-2">
                                                                <i class="fas fa-star"></i>
                                                                <i class="fas fa-star"></i>
                                                                <i class="fas fa-star"></i>
                                                            </div>
                                                        </div>
                                                  </label>
                                                </div>
                                            </div>
                                            <div class="form-group font-size-14 text-lh-md text-secondary mb-3">
                                                <div class="custom-control custom-checkbox">
                                                  <input type="checkbox" class="custom-control-input" id="brandFredPerry">
                                                  <label class="custom-control-label text-lh-inherit text-color-1" for="brandFredPerry">
                                                        <div class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary">
                                                            <div class="green-lighter ml-1 letter-spacing-2">
                                                                <i class="fas fa-star"></i>
                                                                <i class="fas fa-star"></i>
                                                            </div>
                                                        </div>
                                                  </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="shopCartAccordion" class="accordion rounded shadow-none">
                                    <div class="border-0">
                                        <div class="card-collapse" id="shopCardHeadingOne">
                                            <h3 class="mb-0">
                                                <button type="button" class="btn btn-link btn-block card-btn py-2 px-5 text-lh-3 collapsed" data-toggle="collapse" data-target="#shopCardOne" aria-expanded="false" aria-controls="shopCardOne">
                                                    <span class="row align-items-center">
                                                        <span class="col-9">
                                                            <span class="d-block font-size-lg-15 font-size-17 font-weight-bold text-dark">Price Range ($)</span>
                                                        </span>
                                                        <span class="col-3 text-right">
                                                            <span class="card-btn-arrow">
                                                                <span class="fas fa-chevron-down small"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </h3>
                                        </div>
                                        <div id="shopCardOne" class="collapse show" aria-labelledby="shopCardHeadingOne" data-parent="#shopCartAccordion">
                                            <div class="card-body pt-0 px-5">
                                                <div class="pb-3 mb-1 d-flex text-lh-1">
                                                    <span>£</span>
                                                    <span id="rangeSliderExample3MinResult" class=""></span>
                                                    <span class="mx-0dot5"> — </span>
                                                    <span>£</span>
                                                    <span id="rangeSliderExample3MaxResult" class=""></span>
                                                </div>
                                                <input class="js-range-slider" type="text"
                                                data-extra-classes="u-range-slider height-35"
                                                data-type="double"
                                                data-grid="false"
                                                data-hide-from-to="true"
                                                data-min="0"
                                                data-max="3456"
                                                data-from="200"
                                                data-to="3456"
                                                data-prefix="$"
                                                data-result-min="#rangeSliderExample3MinResult"
                                                data-result-max="#rangeSliderExample3MaxResult">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="shopCategoryAccordion" class="accordion rounded-0 shadow-none border-top">
                                    <div class="border-0">
                                        <div class="card-collapse" id="shopCategoryHeadingOne">
                                            <h3 class="mb-0">
                                                <button type="button" class="btn btn-link btn-block card-btn py-2 px-5 text-lh-3 collapsed" data-toggle="collapse" data-target="#shopCategoryOne" aria-expanded="false" aria-controls="shopCategoryOne">
                                                    <span class="row align-items-center">
                                                        <span class="col-9">
                                                            <span class="font-weight-bold font-size-17 text-dark mb-3">Meals</span>
                                                        </span>
                                                        <span class="col-3 text-right">
                                                            <span class="card-btn-arrow">
                                                                <span class="fas fa-chevron-down small"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </h3>
                                        </div>
                                        <div id="shopCategoryOne" class="collapse show" aria-labelledby="shopCategoryHeadingOne" data-parent="#shopCategoryAccordion">
                                            <div class="card-body pt-0 mt-1 px-5 pb-4">
                                               <!-- Checkboxes -->
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="1">
                                                        <label class="custom-control-label" for="1">Breakfast Included</label>
                                                    </div>
                                                    <span>749</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="2">
                                                        <label class="custom-control-label" for="2">All-inclusive</label>
                                                    </div>
                                                    <span>630</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="3">
                                                        <label class="custom-control-label" for="3">Breakfast &amp; dinner included</label>
                                                    </div>
                                                    <span>58</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="4">
                                                        <label class="custom-control-label" for="4">Kitchen facilities</label>
                                                    </div>
                                                    <span>29</span>
                                                </div>
                                                <!-- End Checkboxes -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="facilityCategoryAccordion" class="accordion rounded-0 shadow-none border-top">
                                    <div class="border-0">
                                        <div class="card-collapse" id="facilityCategoryHeadingOne">
                                            <h3 class="mb-0">
                                                <button type="button" class="btn btn-link btn-block card-btn py-2 px-5 text-lh-3 collapsed" data-toggle="collapse" data-target="#facilityCategoryOne" aria-expanded="false" aria-controls="facilityCategoryOne">
                                                    <span class="row align-items-center">
                                                        <span class="col-9">
                                                            <span class="font-weight-bold font-size-17 text-dark mb-3">Facilities</span>
                                                        </span>
                                                        <span class="col-3 text-right">
                                                            <span class="card-btn-arrow">
                                                                <span class="fas fa-chevron-down small"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </h3>
                                        </div>
                                        <div id="facilityCategoryOne" class="collapse show" aria-labelledby="facilityCategoryHeadingOne" data-parent="#facilityCategoryAccordion">
                                            <div class="card-body pt-0 mt-1 px-5 pb-4">
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="Adidas">
                                                        <label class="custom-control-label" for="Adidas">Parking</label>
                                                    </div>
                                                    <span>749</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="NewBalance">
                                                        <label class="custom-control-label" for="NewBalance">Restaurant</label>
                                                    </div>
                                                    <span>630</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="Nike">
                                                        <label class="custom-control-label" for="Nike">Pet friendly</label>
                                                    </div>
                                                    <span>58</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="FredPerry">
                                                        <label class="custom-control-label" for="FredPerry">Room service</label>
                                                    </div>
                                                    <span>29</span>
                                                </div>
                                                <!-- End Checkboxes -->

                                                <!-- View More - Collapse -->
                                                <div class="collapse" id="collapseBrand1">
                                                    <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                        <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="brandGucci">
                                                        <label class="custom-control-label" for="brandGucci">Gucci</label>
                                                        </div>
                                                        <span>5</span>
                                                    </div>
                                                    <div class="form-group d-flex align-items-center justify-content-between font-size-1 text-lh-md text-secondary mb-3">
                                                        <div class="custom-control custom-checkbox">
                                                            <input type="checkbox" class="custom-control-input" id="brandMango">
                                                            <label class="custom-control-label" for="brandMango">Mango</label>
                                                        </div>
                                                        <span>1</span>
                                                    </div>
                                                </div>
                                                <!-- End View More - Collapse -->

                                                <!-- Link -->
                                                <a class="link link-collapse small font-size-1" data-toggle="collapse" href="#collapseBrand1" role="button" aria-expanded="false" aria-controls="collapseBrand1">
                                                  <span class="link-collapse__default font-size-14">Show all 13</span>
                                                  <span class="link-collapse__active font-size-14">Show less</span>
                                                </a>
                                                <!-- End Link -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="propertyCategoryAccordion" class="accordion rounded-0 shadow-none border-top">
                                    <div class="border-0">
                                        <div class="card-collapse" id="propertyCategoryHeadingOne">
                                            <h3 class="mb-0">
                                                <button type="button" class="btn btn-link btn-block card-btn py-2 px-5 text-lh-3 collapsed" data-toggle="collapse" data-target="#propertyCategoryOne" aria-expanded="false" aria-controls="propertyCategoryOne">
                                                    <span class="row align-items-center">
                                                        <span class="col-9">
                                                            <span class="font-weight-bold font-size-17 text-dark mb-3">Property Type</span>
                                                        </span>
                                                        <span class="col-3 text-right">
                                                            <span class="card-btn-arrow">
                                                                <span class="fas fa-chevron-down small"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </h3>
                                        </div>
                                        <div id="propertyCategoryOne" class="collapse show" aria-labelledby="propertyCategoryHeadingOne" data-parent="#propertyCategoryAccordion">
                                            <div class="card-body pt-0 mt-1 px-5 pb-4">
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="brandhotel">
                                                        <label class="custom-control-label" for="brandhotel">Hotels</label>
                                                    </div>
                                                    <span>749</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="brandapartmet">
                                                        <label class="custom-control-label" for="brandapartmet">Apartments</label>
                                                    </div>
                                                    <span>630</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="brandbed">
                                                        <label class="custom-control-label" for="brandbed">Bed and Breakfasts</label>
                                                    </div>
                                                    <span>58</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="brandresorts">
                                                        <label class="custom-control-label" for="brandresorts">Resorts</label>
                                                    </div>
                                                    <span>29</span>
                                                </div>
                                                <!-- End Checkboxes -->

                                                <!-- View More - Collapse -->
                                                <div class="collapse" id="collapseBrand2">
                                                    <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                        <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="Gucci">
                                                        <label class="custom-control-label" for="Gucci">Gucci</label>
                                                        </div>
                                                        <span>5</span>
                                                    </div>
                                                    <div class="form-group d-flex align-items-center justify-content-between font-size-1 text-lh-md text-secondary mb-3">
                                                        <div class="custom-control custom-checkbox">
                                                            <input type="checkbox" class="custom-control-input" id="Mango">
                                                            <label class="custom-control-label" for="Mango">Mango</label>
                                                        </div>
                                                        <span>1</span>
                                                    </div>
                                                </div>
                                                <!-- End View More - Collapse -->

                                                <!-- Link -->
                                                <a class="link link-collapse small font-size-1" data-toggle="collapse" href="#collapseBrand2" role="button" aria-expanded="false" aria-controls="collapseBrand2">
                                                  <span class="link-collapse__default font-size-14">Show all 39</span>
                                                  <span class="link-collapse__active font-size-14">Show less</span>
                                                </a>
                                                <!-- End Link -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="cityCategoryAccordion" class="accordion rounded-0 shadow-none border-top">
                                    <div class="border-0">
                                        <div class="card-collapse" id="cityCategoryHeadingOne">
                                            <h3 class="mb-0">
                                                <button type="button" class="btn btn-link btn-block card-btn py-2 px-5 text-lh-3 collapsed" data-toggle="collapse" data-target="#cityCategoryOne" aria-expanded="false" aria-controls="cityCategoryOne">
                                                    <span class="row align-items-center">
                                                        <span class="col-9">
                                                            <span class="font-weight-bold font-size-17 text-dark mb-3">City</span>
                                                        </span>
                                                        <span class="col-3 text-right">
                                                            <span class="card-btn-arrow">
                                                                <span class="fas fa-chevron-down small"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </h3>
                                        </div>
                                        <div id="cityCategoryOne" class="collapse show" aria-labelledby="cityCategoryHeadingOne" data-parent="#cityCategoryAccordion">
                                            <div class="card-body pt-0 mt-1 px-5 pb-4">
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="brandamsterdam">
                                                        <label class="custom-control-label" for="brandamsterdam">Amsterdam</label>
                                                    </div>
                                                    <span>749</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="brandrotterdam">
                                                        <label class="custom-control-label" for="brandrotterdam">Rotterdam</label>
                                                    </div>
                                                    <span>630</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="brandvalkenburg">
                                                        <label class="custom-control-label" for="brandvalkenburg">Valkenburg</label>
                                                    </div>
                                                    <span>58</span>
                                                </div>
                                                <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="brandeindhoven">
                                                        <label class="custom-control-label" for="brandeindhoven">Eindhoven</label>
                                                    </div>
                                                    <span>29</span>
                                                </div>
                                                <!-- End Checkboxes -->

                                                <!-- View More - Collapse -->
                                                <div class="collapse" id="collapseBrand3">
                                                    <div class="form-group font-size-14 text-lh-md text-secondary mb-3 flex-center-between">
                                                        <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="gucci">
                                                        <label class="custom-control-label" for="gucci">Gucci</label>
                                                        </div>
                                                        <span>5</span>
                                                    </div>
                                                    <div class="form-group d-flex align-items-center justify-content-between font-size-1 text-lh-md text-secondary mb-3">
                                                        <div class="custom-control custom-checkbox">
                                                            <input type="checkbox" class="custom-control-input" id="mango">
                                                            <label class="custom-control-label" for="mango">Mango</label>
                                                        </div>
                                                        <span>1</span>
                                                    </div>
                                                </div>
                                                <!-- End View More - Collapse -->

                                                <!-- Link -->
                                                <a class="link link-collapse small font-size-1" data-toggle="collapse" href="#collapseBrand3" role="button" aria-expanded="false" aria-controls="collapseBrand3">
                                                  <span class="link-collapse__default font-size-14">Show all 25</span>
                                                  <span class="link-collapse__active font-size-14">Show less</span>
                                                </a>
                                                <!-- End Link -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- End Accordion -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-xl-9 order-md-1 order-lg-2 pb-5 pb-lg-0">
                <!-- Shop-control-bar Title -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="font-size-21 font-weight-bold mb-0 text-lh-1">Maldives: 743+ hotels & resorts found</h3>
                    <!-- <ul class="nav tab-nav-shop flex-nowrap" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link font-size-22 p-0" id="pills-three-example1-tab" data-toggle="pill" href="#pills-three-example1" role="tab" aria-controls="pills-three-example1" aria-selected="true">
                                <div class="d-md-flex justify-content-md-center align-items-md-center">
                                    <i class="fa fa-list"></i>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link font-size-22 p-0 ml-2 active" id="pills-one-example1-tab" data-toggle="pill" href="#pills-one-example1" role="tab" aria-controls="pills-one-example1" aria-selected="false">
                                <div class="d-md-flex justify-content-md-center align-items-md-center">
                                    <i class="fa fa-th"></i>
                                </div>
                            </a>
                        </li>
                    </ul> -->
                </div>
                <!-- End shop-control-bar Title -->

                <!-- Slick Tab carousel -->
                <div class="u-slick__tab">
                    <!-- Nav Links -->
                    <div class="mb-5">
                        <ul class="nav flex-nowrap border border-radius-3 tab-nav align-items-center py-2 px-0" role="tablist">
                            <li class="nav-item d-flex align-items-center flex-shrink-0 flex-xl-shrink-1">
                                <a href="#" class="nav-link font-weight-normal text-gray-1 text-lh-1dot6 py-1 px-4 px-wd-5 font-weight-normal font-size-15 ">Recommended
                                </a>
                            </li>
                            <li class="nav-item d-flex align-items-center flex-shrink-0 flex-xl-shrink-1 border-left">
                                <select class="js-select selectpicker dropdown-select bootstrap-select__custom-nav w-auto" data-style="btn-sm py-1 px-4 px-wd-5 font-weight-normal font-size-15  text-gray-1 d-flex align-items-center">
                                  <option value="one" selected>Price</option>
                                  <option value="two">Two</option>
                                  <option value="three">Three</option>
                                  <option value="four">Four</option>
                                </select>
                            </li>
                            <li class="nav-item d-flex align-items-center flex-shrink-0 flex-xl-shrink-1 border-left">
                                <select class="js-select selectpicker dropdown-select bootstrap-select__custom-nav w-auto" data-style="btn-sm py-1 px-4 px-wd-5 font-weight-normal font-size-15  text-gray-1 d-flex align-items-center">
                                  <option value="one" selected>Stars</option>
                                  <option value="two">Two</option>
                                  <option value="three">Three</option>
                                  <option value="four">Four</option>
                                </select>
                            </li>
                            <li class="nav-item d-flex align-items-center flex-shrink-0 flex-xl-shrink-1 border-left">
                                <a href="#" class="nav-link font-weight-normal text-gray-1 text-lh-1dot6 py-1 px-4 px-wd-5 font-weight-normal font-size-15 ">Guest Rating
                                </a>
                            </li>
                            <li class="nav-item d-flex align-items-center flex-shrink-0 flex-xl-shrink-1 border-left">
                                <a href="#" class="nav-link font-weight-normal text-gray-1 text-lh-1dot6 py-1 px-4 px-wd-5 font-weight-normal font-size-15 ">Distance
                                </a>
                            </li>
                            <li class="nav-item d-flex align-items-center flex-shrink-0 flex-xl-shrink-1 border-left">
                                <a href="#" class="nav-link font-weight-normal text-gray-1 text-lh-1dot6 py-1 px-4 px-wd-5 font-weight-normal font-size-15 ">Top Reviewed
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- End Nav Links -->

                    <!-- Tab Content -->
                    <div class="tab-content" id="pills-tabContent">
                        
                        <div class="tab-pane fade show active" id="pills-one-example1" role="tabpanel" aria-labelledby="pills-one-example1-tab" data-target-group="groups">
                            <div class="row">
                                {#each hotellist as resort}
                                <div class="col-md-6 col-lg-4 mb-3 mb-md-4 pb-1">
                                    <div class="card transition-3d-hover shadow-hover-2 tab-card h-100">
                                        <div class="position-relative">
                                            <a href="/hotels/{resort.hs_id}/{resort.slug}" class="d-block gradient-overlay-half-bg-gradient-v5">
                                                <img class="min-height-230 bg-img-hero card-img-top" src="{`//img1.hotelscan.com/640_440/1/${resort.images[0].image_id}.jpg`}" alt="{resort.name}">
                                            </a>
                                            <!-- <div class="position-absolute top-0 right-0 pt-3 pr-3">
                                              <button type="button" class="btn btn-sm btn-icon text-white rounded-circle" data-toggle="tooltip" data-placement="top" title="" data-original-title="Save for later">
                                                <span class="flaticon-valentine-heart"></span>
                                              </button>
                                            </div> -->
                                            <div class="position-absolute bottom-0 left-0 right-0">
                                                <div class="px-4 pb-3">
                                                    <a href="/hotels/{resort.hs_id}/{resort.slug}" class="d-block">
                                                        <div class="d-flex align-items-center font-size-14 text-white">
                                                            <i class="icon flaticon-pin-1 mr-2 font-size-20"></i> {resort.location.city}
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body pl-3 pr-4 pt-2 pb-3">
                                            <div class="ml-1 mb-2">
                                                <div class="d-inline-flex align-items-center font-size-13 text-lh-1 text-primary letter-spacing-3">
                                                    <div class="green-lighter">
                                                        {@html getStar(resort.quality.stars)}
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="/hotels/{resort.hs_id}/{resort.slug}" class="card-title font-size-17 font-weight-medium text-dark">{resort.name}</a>
                                            <div class="mt-2 mb-3">
                                                <span class="badge badge-pill badge-primary py-1 px-2 font-size-14 border-radius-3 font-weight-normal">{resort.quality.review_rating}/100</span>
                                                <span class="font-size-14 text-gray-1 ml-2">({resort.quality.review_count} reviews)</span>
                                            </div>
                                            <!-- <div class="mb-0">
                                                <span class="mr-1 font-size-14 text-gray-1">From</span>
                                                <span class="font-weight-bold">£350.00</span>
                                                <span class="font-size-14 text-gray-1"> / night</span>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                                {/each}
                                
                                
                            </div>
                            <!-- <div class="text-center text-md-left font-size-14 mb-3 text-lh-1">Showing 1–15</div> -->
                            <LightPaginationNav
                            totalItems="{hotels.length}"
                            pageSize="{pageSize}"
                            currentPage="{currentPage}"
                            limit="{1}"
                            showStepOptions="{true}"
                            on:setPage="{(e) => currentPage = e.detail.page}"
                         /> 
                        </div>
                    </div>
                    <!-- End Tab Content -->
                </div>
                <!-- Slick Tab carousel -->
            </div>
        </div>
    </div>
</main>

<Footer />