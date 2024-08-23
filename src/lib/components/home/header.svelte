<script>
    //import { browser } from '$app/environment';
    //import logo from "$lib/assets/mbvlogo24.svg?url&raw"
    import { onMount } from 'svelte';
 
    //import js from 'jquery';
    // @ts-nocheck
    
    onMount( async () => {	     
        
         

    });
 

</script>
 


<header data-add-bg="bg-white" class="header js-header" data-x="header" data-x-toggle="is-menu-opened">
    <div data-anim="fade" class="header__container header__container-1500 mx-auto px-30 sm:px-20 is-in-view">
      <div class="row justify-between items-center">

        <div class="col-auto">
          <div class="d-flex items-center">
            <a href="/" class="header-logo mr-50" data-x="header-logo" data-x-toggle="is-logo-dark">
              <img src="img/wmvlogo2.svg" alt="Wheresmaldives.com">
              <img src="img/wmvlogo2.svg" alt="Wheresmaldives.com">
            </a>


            <div class="header-menu " data-x="mobile-menu" data-x-toggle="is-menu-active">
              <div class="mobile-overlay"></div>

              <div class="header-menu__content">
                <div class="mobile-bg js-mobile-bg"></div>

                <div class="menu js-navList">
                  <ul class="menu__nav text-dark-1 -is-active">

                    <li>
                      <a href="/">
                        Home
                      </a>
                    </li>
                    
                    <li>
                      <a href="/maldives-hotels-2024-2025">
                        Hotels
                      </a>
                    </li>

                    <li>
                      <a href="/maldives-holiday-packages-2024-2025">
                        Packages & Deals
                      </a>
                    </li>

                    <li class="menu-item-has-children">
                      <a data-barba="" href="">
                        <span class="mr-10">Maldives</span>
                        <i class="icon icon-chevron-sm-down"></i>
                      </a>


                      <ul class="subnav">
                        <li class="subnav__backBtn js-nav-list-back">
                          <a href="#"><i class="icon icon-chevron-sm-down"></i> Maldives</a>
                        </li>

                        <li><a href="index.html">Getting here</a></li>
                        <li><a href="index.html">Before Arrival</a></li>
                        <li><a href="index.html">Travel Guide 2024</a></li>

                       

                      </ul>

                    </li>

                   <li class="menu-item-has-children -has-mega-menu">
                      <a data-barba="">
                        <span class="mr-10">Holidays</span>
                        <i class="icon icon-chevron-sm-down"></i>
                      </a>

                      <div class="mega">
                        <div class="tabs -underline-2 js-tabs">
                          <div class="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 pb-30 js-tabs-controls">

                            <div class="col-auto">
                              <button class="tabs__button text-light-1 fw-500 js-tabs-button is-tab-el-active" data-tab-target=".-tab-item-1">Luxury Escapes</button>
                            </div>

                            <div class="col-auto">
                              <button class="tabs__button text-light-1 fw-500 js-tabs-button " data-tab-target=".-tab-item-2">All Inclusive</button>
                            </div>

                            <div class="col-auto">
                              <button class="tabs__button text-light-1 fw-500 js-tabs-button " data-tab-target=".-tab-item-3">Honeymooners</button>
                            </div>

                            <div class="col-auto">
                              <button class="tabs__button text-light-1 fw-500 js-tabs-button " data-tab-target=".-tab-item-4">Wellness</button>
                            </div>

                            <div class="col-auto">
                              <button class="tabs__button text-light-1 fw-500 js-tabs-button " data-tab-target=".-tab-item-5">Kids n Family</button>
                            </div>

                      
                            <div class="col-auto">
                              <button class="tabs__button text-light-1 fw-500 js-tabs-button " data-tab-target=".-tab-item-6">Adults Only</button>
                            </div>

                          </div>

                          <div class="tabs__content js-tabs-content">
                            <div class="tabs__pane -tab-item-1">
                              <div class="mega__content">
                                <div class="mega__grid">

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Hotel List</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="hotel-list-1.html">Hotel List v1</a></div>

                                      <div><a href="hotel-list-2.html">Hotel List v2</a></div>

                                      <div><a href="hotel-half-map.html">Hotel List v3</a></div>

                                      <div><a href="hotel-grid-1.html">Hotel List v4</a></div>

                                      <div><a href="hotel-grid-2.html">Hotel List v5</a></div>

                                    </div>
                                  </div>

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Hotel Single</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="hotel-single-1.html">Hotel Single v1</a></div>

                                      <div><a href="hotel-single-2.html">Hotel Single v2</a></div>

                                    </div>
                                  </div>

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Hotel Booking</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="booking-pages.html">Booking Page</a></div>

                                    </div>
                                  </div>

                                </div>

                                <div class="mega__image d-flex relative">
                                  <img src="img/backgrounds/7.png" alt="image" class="rounded-4 js-lazy loaded" data-ll-status="loaded">

                                  <div class="absolute w-full h-full px-30 py-24">
                                    <div class="text-22 fw-500 lh-15 text-white">Things to do on <br> your trip</div>
                                    <button class="button h-50 px-30 -blue-1 text-dark-1 bg-white mt-20">Experinces</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="tabs__pane -tab-item-2">
                              <div class="mega__content">
                                <div class="mega__grid">

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Tour List</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="tour-list-1.html">Tour List v1</a></div>

                                      <div><a href="tour-grid-1.html">Tour List v2</a></div>

                                    </div>
                                  </div>

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Tour Pages</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="tour-map.html">Tour Map</a></div>

                                      <div><a href="tour-single.html">Tour Single</a></div>

                                    </div>
                                  </div>

                                </div>

                                <div class="mega__image d-flex relative">
                                  <img src="img/backgrounds/7.png" alt="image" class="rounded-4">

                                  <div class="absolute w-full h-full px-30 py-24">
                                    <div class="text-22 fw-500 lh-15 text-white">Things to do on <br> your trip</div>
                                    <button class="button h-50 px-30 -blue-1 text-dark-1 bg-white mt-20">Experinces</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="tabs__pane -tab-item-3 is-tab-el-active">
                              <div class="mega__content">
                                <div class="mega__grid">

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Activity List</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="activity-list-1.html">Activity List v1</a></div>

                                      <div><a href="activity-grid-1.html">Activity List v2</a></div>

                                    </div>
                                  </div>

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Activity Pages</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="activity-map.html">Activity Map</a></div>

                                      <div><a href="activity-single.html">Activity Single</a></div>

                                    </div>
                                  </div>

                                </div>

                                <div class="mega__image d-flex relative">
                                  <img src="img/backgrounds/7.png" alt="image" class="rounded-4">

                                  <div class="absolute w-full h-full px-30 py-24">
                                    <div class="text-22 fw-500 lh-15 text-white">Things to do on <br> your trip</div>
                                    <button class="button h-50 px-30 -blue-1 text-dark-1 bg-white mt-20">Experinces</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="tabs__pane -tab-item-4">
                              <div class="mega__content">
                                <div class="mega__grid">

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Rental List</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="rental-list-1.html">Rental List v1</a></div>

                                      <div><a href="rental-grid-1.html">Rental List v2</a></div>

                                    </div>
                                  </div>

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Rental Pages</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="rental-map.html">Rental Map</a></div>

                                      <div><a href="rental-single.html">Rental Single</a></div>

                                    </div>
                                  </div>

                                </div>

                                <div class="mega__image d-flex relative">
                                  <img src="img/backgrounds/7.png" alt="image" class="rounded-4">

                                  <div class="absolute w-full h-full px-30 py-24">
                                    <div class="text-22 fw-500 lh-15 text-white">Things to do on <br> your trip</div>
                                    <button class="button h-50 px-30 -blue-1 text-dark-1 bg-white mt-20">Experinces</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="tabs__pane -tab-item-5">
                              <div class="mega__content">
                                <div class="mega__grid">

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Car List</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="car-list-1.html">Car List v1</a></div>

                                      <div><a href="car-grid-1.html">Car List v2</a></div>

                                    </div>
                                  </div>

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Car Pages</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="car-map.html">Car Map</a></div>

                                      <div><a href="car-single.html">Car Single</a></div>

                                    </div>
                                  </div>

                                </div>

                                <div class="mega__image d-flex relative">
                                  <img src="img/backgrounds/7.png" alt="image" class="rounded-4">

                                  <div class="absolute w-full h-full px-30 py-24">
                                    <div class="text-22 fw-500 lh-15 text-white">Things to do on <br> your trip</div>
                                    <button class="button h-50 px-30 -blue-1 text-dark-1 bg-white mt-20">Experinces</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="tabs__pane -tab-item-6">
                              <div class="mega__content">
                                <div class="mega__grid">

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Cruise List</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="cruise-list-1.html">Cruise List v1</a></div>

                                      <div><a href="cruise-grid-1.html">Cruise List v2</a></div>

                                    </div>
                                  </div>

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Cruise Pages</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="cruise-map.html">Cruise Map</a></div>

                                      <div><a href="cruise-single.html">Cruise Single</a></div>

                                    </div>
                                  </div>

                                </div>

                                <div class="mega__image d-flex relative">
                                  <img src="img/backgrounds/7.png" alt="image" class="rounded-4">

                                  <div class="absolute w-full h-full px-30 py-24">
                                    <div class="text-22 fw-500 lh-15 text-white">Things to do on <br> your trip</div>
                                    <button class="button h-50 px-30 -blue-1 text-dark-1 bg-white mt-20">Experinces</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="tabs__pane -tab-item-7">
                              <div class="mega__content">
                                <div class="mega__grid">

                                  <div class="mega__item">
                                    <div class="text-15 fw-500">Flight List</div>
                                    <div class="y-gap-5 text-15 pt-5">

                                      <div><a href="flights-list.html">Flight list v1</a></div>

                                    </div>
                                  </div>

                                </div>

                                <div class="mega__image d-flex relative">
                                  <img src="img/backgrounds/7.png" alt="image" class="rounded-4">

                                  <div class="absolute w-full h-full px-30 py-24">
                                    <div class="text-22 fw-500 lh-15 text-white">Things to do on <br> your trip</div>
                                    <button class="button h-50 px-30 -blue-1 text-dark-1 bg-white mt-20">Experinces</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <ul class="subnav mega-mobile">
                        <li class="subnav__backBtn js-nav-list-back">
                          <a href="#"><i class="icon icon-chevron-sm-down"></i> Category</a>
                        </li>

                        <li class="menu-item-has-children">
                          <a data-barba="">
                            <span class="mr-10">Hotel</span>
                            <i class="icon icon-chevron-sm-down"></i>
                          </a>

                          <ul class="subnav">
                            <li class="subnav__backBtn js-nav-list-back">
                              <a href="#"><i class="icon icon-chevron-sm-down"></i> Hotel</a>
                            </li>


                            <li><a href="hotel-list-1.html">Hotel List v1</a></li>

                            <li><a href="hotel-list-2.html">Hotel List v2</a></li>

                            <li><a href="hotel-single-1.html">Hotel Single v1</a></li>

                            <li><a href="hotel-single-2.html">Hotel Single v2</a></li>

                            <li><a href="booking-pages.html">Booking Page</a></li>

                          </ul>
                        </li>

                        <li class="menu-item-has-children">
                          <a data-barba="">
                            <span class="mr-10">Tour</span>
                            <i class="icon icon-chevron-sm-down"></i>
                          </a>

                          <ul class="subnav">
                            <li class="subnav__backBtn js-nav-list-back">
                              <a href="#"><i class="icon icon-chevron-sm-down"></i> Tour</a>
                            </li>

                            <li><a href="tour-list-1.html">Tour List v1</a></li>

                            <li><a href="tour-grid-1.html">Tour List v2</a></li>

                            <li><a href="tour-map.html">Tour Map</a></li>

                            <li><a href="tour-single.html">Tour Single</a></li>

                          </ul>
                        </li>

                        <li class="menu-item-has-children">
                          <a data-barba="">
                            <span class="mr-10">Activity</span>
                            <i class="icon icon-chevron-sm-down"></i>
                          </a>

                          <ul class="subnav">
                            <li class="subnav__backBtn js-nav-list-back">
                              <a href="#"><i class="icon icon-chevron-sm-down"></i> Activity</a>
                            </li>

                            <li><a href="activity-list-1.html">Activity List v1</a></li>

                            <li><a href="activity-grid-1.html">Activity List v2</a></li>

                            <li><a href="activity-map.html">Activity Map</a></li>

                            <li><a href="activity-single.html">Activity Single</a></li>

                          </ul>
                        </li>

                        <li class="menu-item-has-children">
                          <a data-barba="">
                            <span class="mr-10">Rental</span>
                            <i class="icon icon-chevron-sm-down"></i>
                          </a>

                          <ul class="subnav">
                            <li class="subnav__backBtn js-nav-list-back">
                              <a href="#"><i class="icon icon-chevron-sm-down"></i> Rental</a>
                            </li>

                            <li><a href="rental-list-1.html">Rental List v1</a></li>

                            <li><a href="rental-grid-1.html">Rental List v2</a></li>

                            <li><a href="rental-map.html">Rental Map</a></li>

                            <li><a href="rental-single.html">Rental Single</a></li>

                          </ul>
                        </li>

                        <li class="menu-item-has-children">
                          <a data-barba="">
                            <span class="mr-10">Car</span>
                            <i class="icon icon-chevron-sm-down"></i>
                          </a>

                          <ul class="subnav">
                            <li class="subnav__backBtn js-nav-list-back">
                              <a href="#"><i class="icon icon-chevron-sm-down"></i> Car</a>
                            </li>

                            <li><a href="car-list-1.html">Car List v1</a></li>

                            <li><a href="car-grid-1.html">Car List v2</a></li>

                            <li><a href="car-map.html">Car Map</a></li>

                            <li><a href="car-single.html">Car Single</a></li>

                          </ul>
                        </li>

                        <li class="menu-item-has-children">
                          <a data-barba="">
                            <span class="mr-10">Cruise</span>
                            <i class="icon icon-chevron-sm-down"></i>
                          </a>

                          <ul class="subnav">
                            <li class="subnav__backBtn js-nav-list-back">
                              <a href="#"><i class="icon icon-chevron-sm-down"></i> Cruise</a>
                            </li>

                            <li><a href="cruise-list-1.html">Cruise List v1</a></li>

                            <li><a href="cruise-grid-1.html">Cruise List v2</a></li>

                            <li><a href="cruise-map.html">Cruise Map</a></li>

                            <li><a href="cruise-single.html">Cruise Single</a></li>

                          </ul>
                        </li>

                        <li class="menu-item-has-children">
                          <a data-barba="">
                            <span class="mr-10">Flights</span>
                            <i class="icon icon-chevron-sm-down"></i>
                          </a>

                          <ul class="subnav">
                            <li class="subnav__backBtn js-nav-list-back">
                              <a href="#"><i class="icon icon-chevron-sm-down"></i> Flights</a>
                            </li>

                            <li><a href="flights-list.html">Flights List v1</a></li>

                          </ul>
                        </li>
                      </ul>
                    </li> 
                    <li>
                      <a href="/maldives-blog">
                        Blog
                      </a>
                    </li>

                    <li>
                      <a href="/about-wmv">
                        About
                      </a>
                    </li>
                

                    
                    <li>
                      <a href="/contact">
                        Contact
                      </a>
                    </li>

                   


               
                  </ul>
                </div>

                <div class="mobile-footer px-20 py-20 border-top-light js-mobile-footer">
                </div>
              </div>
            </div>

          </div>
        </div>


        <div class="col-auto">
          <div class="d-flex items-center">

            <div class="row x-gap-20 items-center xxl:d-none">
              <div class="col-auto">
                <button class="d-flex items-center text-14 text-dark-1" data-x-click="currency">
                  <span class="js-currencyMenu-mainTitle">USD</span>
                  <i class="icon-chevron-sm-down text-7 ml-10"></i>
                </button>
              </div>

              <div class="col-auto">
                <div class="w-1 h-20 bg-black-20"></div>
              </div>

              <div class="col-auto">
                <button class="d-flex items-center text-14 text-dark-1" data-x-click="lang">
                  <img src="img/general/lang.png" alt="image" class="rounded-full mr-10">
                  <span class="js-language-mainTitle">United States</span>
                  <i class="icon-chevron-sm-down text-7 ml-15"></i>
                </button>
              </div>
            </div>


            <div class="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
              <a href="tel:+960 7513690" class="button px-30 fw-400 text-14 -blue-1 bg-dark-4 h-50 text-white">CALL +960 7513690</a>
              
            </div>

            <div class="d-none xl:d-flex x-gap-20 items-center pl-30" data-x="header-mobile-icons" data-x-toggle="text-white">
              <div><a href="#" class="d-flex items-center icon-user text-inherit text-22"></a></div>
              <div><button class="d-flex items-center icon-menu text-inherit text-20" data-x-click="html, header, header-logo, header-mobile-icons, mobile-menu"></button></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </header>