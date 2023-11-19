<script>
    //import { browser } from '$app/environment';
    import logo from "$lib/assets/mbvlogo.svg?url&raw"
    import { onMount } from 'svelte';
 
    //import js from 'jquery';
    // @ts-nocheck
    
    onMount( async () => {	     
        
         
        window.jQuery.HSCore.components.HSHeader.init(window.jQuery('#header'));

        // initialization of unfold component
        window.jQuery.HSCore.components.HSUnfold.init(window.jQuery('[data-unfold-target]'));

        // initialization of show animations
        window.jQuery.HSCore.components.HSShowAnimation.init('.js-animation-link');

        // initialization of datepicker
        window.jQuery.HSCore.components.HSRangeDatepicker.init('.js-range-datepicker');       

        // initialization of select
        window.jQuery.HSCore.components.HSSelectPicker.init('.js-select');

        // initialization of quantity counter
        window.jQuery.HSCore.components.HSQantityCounter.init('.js-quantity');

        // initialization of slick carousel
        window.jQuery.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');

        // initialization of go to
        window.jQuery.HSCore.components.HSGoTo.init('.js-go-to');

    });
 

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
    }
</style>



<header id="header" class="u-header u-header--abs-top-xl u-header--white-nav-links-xl u-header--bg-transparent-xl u-header--show-hide-xl" data-header-fix-moment="500" data-header-fix-effect="slide">
    <div class="u-header__section u-header__shadow-on-show-hide py-4 py-xl-0">
        <!-- Topbar -->
        <div class="container-fluid u-header__hide-content u-header__topbar u-header__topbar-lg border-bottom border-color-white">
            <div class="d-flex align-items-center">
                <ul class="list-inline u-header__topbar-nav-divider mb-0">
                    <li class="list-inline-item mr-0"><a href="tel:(000)999-898-999" class="u-header__navbar-link">+960 960 7915687</a></li>
                    <li class="list-inline-item mr-0"><a href="mailto:info@myhotel.com" class="u-header__navbar-link">sales@maldivesbeachvacation.com</a></li>
                </ul>
                <div class="ml-auto d-flex align-items-center">
                    <ul class="list-inline mb-0 mr-2 pr-1">
                        <li class="list-inline-item">
                            <a class="btn btn-sm btn-icon btn-pill btn-soft-white btn-bg-transparent transition-3d-hover" href="https://www.facebook.com/maldivesbeachvacation/" target="_blank">
                                <span class="fab fa-facebook-f btn-icon__inner"></span>
                            </a>
                        </li>
                        <!-- <li class="list-inline-item">
                            <a class="btn btn-sm btn-icon btn-pill btn-soft-white btn-bg-transparent transition-3d-hover" href="https://twitter.com/" target="_blank">
                                <span class="fab fa-twitter btn-icon__inner"></span>
                            </a>
                        </li> -->
                        <li class="list-inline-item">
                            <a class="btn btn-sm btn-icon btn-pill btn-soft-white btn-bg-transparent transition-3d-hover" href="https://www.instagram.com/maldivesbeachvacation/" target="_blank">
                                <span class="fab fa-instagram btn-icon__inner"></span>
                            </a>
                        </li>
                        <!-- <li class="list-inline-item">
                            <a class="btn btn-sm btn-icon btn-pill btn-soft-white btn-bg-transparent transition-3d-hover" href="https://www.linkedin.com/" target="_blank">
                                <span class="fab fa-linkedin-in btn-icon__inner"></span>
                            </a>
                        </li> -->
                    </ul>
                    <!-- <div class="position-relative px-3 u-header__topbar-divider">
                        <a href="#" class="d-flex align-items-center text-white">
                            <i class="flaticon-user mr-2 ml-1"></i>
                            <span class="d-inline-block font-size-14 mr-1">Sign in or Register</span>
                        </a>
                    </div> -->
                    <!-- <div class="position-relative pl-3 language-switcher dropdown-connector-xl u-header__topbar-divider">
                        <a id="languageDropdownInvoker" class="dropdown-nav-link dropdown-toggle d-flex align-items-center ml-1 py-3" href="#" role="button" aria-controls="languageDropdown" aria-haspopup="true" aria-expanded="false" data-unfold-event="hover" data-unfold-target="#languageDropdown" data-unfold-type="css-animation" data-unfold-duration="300" data-unfold-delay="300" data-unfold-hide-on-scroll="true" data-unfold-animation-in="slideInUp" data-unfold-animation-out="fadeOut">
                            <span class="d-inline-block">EUR</span>
                        </a>
                        <div id="languageDropdown" class="dropdown-menu dropdown-unfold dropdown-menu-right mt-0" aria-labelledby="languageDropdownInvoker">
                            <a class="dropdown-item" href="#">USD</a>
                            <a class="dropdown-item active" href="#">EUR</a>
                            <a class="dropdown-item" href="#">TUR</a>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- End Topbar -->
        <div id="logoAndNav" class="container-fluid py-1">
            <!-- Nav -->
            <nav class="js-mega-menu navbar navbar-expand-xl u-header__navbar u-header__navbar--no-space">
                <!-- Logo -->
                <a class="navbar-brand u-header__navbar-brand-default u-header__navbar-brand-center u-header__navbar-brand-text-white" href="/" aria-label="MyHotel">
                    {@html logo }
                    <span class="u-header__navbar-brand-text">MaldivesBeachVacation</span>
                </a>
                <!-- End Logo -->

                <!-- Handheld Logo -->
                <a class="navbar-brand u-header__navbar-brand u-header__navbar-brand-center u-header__navbar-brand-collapsed" href="/" aria-label="MyHotel">
                    {@html logo }
                    <span class="u-header__navbar-brand-text">MaldivesBeachVacation</span>
                </a>
                <!-- End Handheld Logo -->

                <!-- Scroll Logo -->
                <a class="navbar-brand u-header__navbar-brand u-header__navbar-brand-center u-header__navbar-brand-on-scroll" href="/" aria-label="MyHotel">
                    {@html logo }
                    <span class="u-header__navbar-brand-text">MaldivesBeachVacation</span>
                </a>
                <!-- End Scroll Logo -->

                <!-- Responsive Toggle Button -->
                <button type="button" class="navbar-toggler btn u-hamburger u-hamburger--primary order-2 ml-3" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navBar" data-toggle="collapse" data-target="#navBar">
                    <span id="hamburgerTrigger" class="u-hamburger__box">
                        <span class="u-hamburger__inner"></span>
                    </span>
                </button>
                <!-- End Responsive Toggle Button -->

                <!-- Navigation -->
                <div id="navBar" class="navbar-collapse u-header__navbar-collapse collapse order-2 order-xl-0 pt-4 p-xl-0 position-relative">
                    <ul class="navbar-nav u-header__navbar-nav">
                        <!-- Home -->
                        <li class="nav-item u-header__nav-item" data-event="hover" data-animation-in="slideInUp" data-animation-out="fadeOut">
                            <a id="homeMenu" class="nav-link u-header__nav-link u-header__nav-link-border" href="#" aria-haspopup="true" aria-expanded="false" aria-labelledby="homeSubMenu">Home</a>
                         
                        </li>
                        <!-- End Home -->

                        <!-- Hotel -->
                        <li class="nav-item u-header__nav-item" data-event="hover" data-animation-in="slideInUp" data-animation-out="fadeOut">
                            <a id="hotelMenu" data-sveltekit-reload class="nav-link u-header__nav-link u-header__nav-link-border" href="/hotels" aria-haspopup="true" aria-expanded="false" aria-labelledby="hotelSubMenu">Hotels</a>
                          
                        </li>
                        <!-- End Hotel -->

                        <li class="nav-item u-header__nav-item" data-event="hover" data-animation-in="slideInUp" data-animation-out="fadeOut">
                            <a id="hotelMenu" class="nav-link u-header__nav-link u-header__nav-link-border" href="#" aria-haspopup="true" aria-expanded="false" aria-labelledby="hotelSubMenu">About</a>
                          
                        </li>

                        <li class="nav-item u-header__nav-item" data-event="hover" data-animation-in="slideInUp" data-animation-out="fadeOut">
                            <a id="hotelMenu" class="nav-link u-header__nav-link u-header__nav-link-border" href="#" aria-haspopup="true" aria-expanded="false" aria-labelledby="hotelSubMenu">Contact</a>
                          
                        </li>
 
                        
                    </ul>
                </div>
                <!-- End Navigation -->

                <!-- Shopping Cart -->
                <!-- <div class="pl-2 pl-md-4 ml-auto shopping-cart">
                    <a id="shoppingCartDropdownInvoker" class="btn-text-secondary poition-relative py-4" href="#" role="button" aria-controls="shoppingCartDropdown" aria-haspopup="true" aria-expanded="false" data-unfold-event="hover" data-unfold-target="#shoppingCartDropdown" data-unfold-type="css-animation" data-unfold-duration="300" data-unfold-delay="300" data-unfold-hide-on-scroll="true" data-unfold-animation-in="slideInUp" data-unfold-animation-out="fadeOut">
                        <span class="flaticon-shopping-basket font-size-25 text-primary-max-lg"></span>
                    </a>
                    <div id="shoppingCartDropdown" class="dropdown-menu dropdown-unfold dropdown-menu-right text-center p-7" aria-labelledby="shoppingCartDropdownInvoker" style="min-width: 250px;">
                        <span class="btn btn-icon btn-soft-primary rounded-circle mb-3">
                            <span class="flaticon-shopping-basket btn-icon__inner"></span>
                        </span>
                        <span class="d-block">Your Cart is Empty</span>
                    </div>
                </div> -->
                <!-- End Shopping Cart -->
            </nav>
            <!-- End Nav -->
        </div>
    </div>
</header>