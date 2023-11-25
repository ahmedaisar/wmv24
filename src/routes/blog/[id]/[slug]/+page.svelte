
<script>
    import Header from '$lib/components/home/header.svelte';
	import Footer from '$lib/components/common/footer.svelte';
    import Preloader from '$lib/components/common/preloader.svelte'
    import bg from "$lib/assets/bg.jpg"
    export let data;
    const { params } = data
    const blogid = params.id
    let blogPromise
    async function getBlogPromise(){
            const req = await fetch(`https://wp.maldivesbeachvacation.com/wp-json/wp/v2/posts/${blogid}?_embed`)
            const res = await req.json()
            return res 
            
    }
    blogPromise = getBlogPromise() 
    console.log(blogPromise)
</script>
<Header />
{#await blogPromise}
<Preloader /> 
{:then data}
<main id="content">
    <!-- Hero Section -->
    <div class="bg-img-hero text-center mb-5 mb-lg-8" style="background-image: url({bg});">
        <div class="container space-top-xl-3 py-6 py-xl-0">
            <div class="row justify-content-center py-xl-4">
                <!-- Info -->
                <div class="py-xl-10 py-5">
                    <h1 class="font-size-40 font-size-xs-30 text-white font-weight-bold mb-0">{@html data.title.rendered}</h1>
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb breadcrumb-no-gutter justify-content-center mb-0">
                        <li class="breadcrumb-item font-size-14"><a class="text-white" href="/">Home</a></li>
                        <li class="breadcrumb-item custom-breadcrumb-item font-size-14 text-white" aria-current="page"><a class="text-white" href="/blog">Blog</a></li>
                      </ol>
                    </nav>
                </div>
                <!-- End Info -->
            </div>
        </div>
    </div>
    <!-- End Hero Section -->
    <div class="mb-6 mb-lg-8 pb-lg-1 pt-1">
        <div class="container mb-5 mb-lg-9">
            <div class="row">
               
                <div class="col-lg-8 col-xl-9">
                    <!-- <div class="js-slick-carousel u-slick mb-4" data-arrows-classes="d-none d-lg-inline-block u-slick__arrow-classic u-slick__arrow-centered--y rounded-circle" data-arrow-left-classes="flaticon-back u-slick__arrow-classic-inner u-slick__arrow-classic-inner--left ml-lg-3 ml-xl-5" data-arrow-right-classes="flaticon-next u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right mr-lg-3 mr-xl-5">
                        <div class="js-slide bg-img-hero-center min-height-450 rounded-xs" style="background-image: url(../../assets/img/955x450/img1.jpg);"></div>

                        <div class="js-slide bg-img-hero-center min-height-450 rounded-xs" style="background-image: url(../../assets/img/955x450/img2.jpg);"></div>

                        <div class="js-slide bg-img-hero-center min-height-450 rounded-xs" style="background-image: url(../../assets/img/955x450/img3.jpg);"></div>

                        <div class="js-slide bg-img-hero-center min-height-450 rounded-xs" style="background-image: url(../../assets/img/955x450/img4.jpg);"></div>
                    </div> -->

                    <h5 class="font-weight-bold font-size-21 text-gray-3">
                        <a href="/blog/{data.id}/{data.slug}">{@html data.title.rendered}</a>
                    </h5>
                    <div class="mb-3">
                        <a class="mr-3 pr-1" href="#">
                            <span class="font-weight-normal text-gray-3">{@html new Date(data.date).toDateString()}</span>
                        </a>
                        <!-- <a href="#">
                            <span class="text-primary font-weight-normal">Life Style</span>
                        </a> -->
                    </div>
                    <p class="text-lh-lg text-gray-1 mb-5">{@html data.content.rendered}</p>

                    <!-- <p class="text-lh-lg text-gray-1 mb-5 pb-1">You can easily change the formatting of selected text in the document text by choosing a look for the selected text from the Quick Styles gallery on the Home tab. You can also format text directly by using the other controls on the Home tab. Most controls offer a choice of using the look from the current theme or using a format that you specify directly.</p>
                    <div class="mb-5 pb-1">
                        <div class="d-md-flex justify-content-between align-items-center">
                            <a class="d-block mb-4 mb-md-0 text-color-1" href="blog-single.html">
                                <div class="d-flex justify-content-center justify-content-md-start">
                                    <i class="flaticon-left-arrow font-size-15 mr-2 "></i>
                                    <span class="font-weight-normal font-size-14 ">Previuos Post</span>
                                </div>
                                <div class="font-weight-normal  ml-md-4 mb-0 pt-md-1 text-center text-md-left">
                                    The bedding was hardly able
                                </div>
                            </a>

                            <a class="d-block text-color-1" href="blog-single.html">
                                <div class="d-flex justify-content-center justify-content-md-end">
                                    <span class="font-weight-normal font-size-14">Next Post</span>
                                    <i class="flaticon-right-arrow font-size-15 ml-2"></i>
                                </div>
                                <div class="font-weight-normal mr-md-4 mb-0 pt-md-1 text-center text-md-left">
                                    11 Tips to Help You Get New
                                </div>
                            </a>
                        </div>
                    </div> -->
                    <div class="border border-color-8 mb-4"></div>
                     
                </div>
               
                <div class="col-lg-4 col-xl-3">
                    <form class="input-group input-group-borderless mb-5">
                    <!-- Input -->
                    <div class="js-focus-state w-100">
                        <div class="input-group border border-color-8 border-width-2 rounded d-flex align-items-center">
                            <input type="text" class="form-control font-size-14 placeholder-1 ml-1" placeholder="Search" aria-label="Company or title">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="flaticon-magnifying-glass-1 font-size-20 text-gray-8 mr-1"></i>
                                 </span>
                            </div>
                        </div>
                    </div>
                    <!-- End Input -->
                    </form>
                    <!-- List -->
                    <!-- <ul id="sidebarNav" class="custom-dropdown list-unstyled border border-color-7 rounded pt-4 pb-1 mb-5">
                        <h5 class="font-weight-bold font-size-17 text-gray-6 mb-2 pb-1 px-4">All Categories</h5>
                        <li class="list-item">
                            <a class="d-block dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav1Collapse" data-target="#sidebarNav1Collapse">
                                <span class="font-weight-normal text-gray-1">All</span>
                            </a>

                            <div id="sidebarNav1Collapse" class="collapse" data-parent="#sidebarNav">
                                <ul id="sidebarNav1" class="list-unstyled">
                                    
                                    <li><a class="dropdown-item" href="#">Mobiles</a></li>
                                    <li><a class="dropdown-item" href="#">Tablets</a></li>
                                    <li><a class="dropdown-item" href="#">Laptops</a></li>
                                    <li><a class="dropdown-item" href="#">Desktops</a></li>
                                    <li><a class="dropdown-item" href="#">Gaming consoles</a></li>
                                    <li><a class="dropdown-item" href="#">Car cameras</a></li>
                                    <li><a class="dropdown-item" href="#">Security cameras</a></li>
                                    <li><a class="dropdown-item" href="#">Digital cameras</a></li>
                                    <li><a class="dropdown-item" href="#">Gadgets</a></li>
                                
                                </ul>
                            </div>
                        </li>

                        <li class="list-item">
                            <a class="d-block dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav2Collapse" data-target="#sidebarNav2Collapse">
                                <span class="font-weight-normal text-gray-1">Features</span>
                            </a>

                            <div id="sidebarNav2Collapse" class="collapse " data-parent="#sidebarNav">
                                <ul id="sidebarNav2" class="list-unstyled">
                                    
                                    <li><a class="dropdown-item" href="#">Mobiles</a></li>
                                    <li><a class="dropdown-item" href="#">Tablets</a></li>
                                    <li><a class="dropdown-item" href="#">Laptops</a></li>
                                    <li><a class="dropdown-item" href="#">Desktops</a></li>
                                    <li><a class="dropdown-item" href="#">Gaming consoles</a></li>
                                    <li><a class="dropdown-item" href="#">Car cameras</a></li>
                                    <li><a class="dropdown-item" href="#">Security cameras</a></li>
                                    <li><a class="dropdown-item" href="#">Digital cameras</a></li>
                                    <li><a class="dropdown-item" href="#">Gadgets</a></li>
                                
                                </ul>
                            </div>
                        </li>

                        <li class="list-item">
                            <a class="d-block dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav3Collapse" data-target="#sidebarNav3Collapse">
                                <span class="font-weight-normal text-gray-1">Sliders</span>
                            </a>

                            <div id="sidebarNav3Collapse" class="collapse" data-parent="#sidebarNav">
                                <ul id="sidebarNav3" class="list-unstyled">
                                    
                                    <li><a class="dropdown-item" href="#">Home Audio</a></li>
                                    <li>
                                        <a class="dropdown-item dropdown-toggle dropdown-toggle-collapse" href="javascript:;" data-target="#sidebarNav3Two" role="button" data-toggle="collapse" aria-expanded="false"aria-controls="sidebarNav3Two">
                                            <span>Large appliances</span>
                                        </a>
                                        <ul id="sidebarNav3Two" class="collapse list-unstyled px-3" data-parent="#sidebarNav3">
                                            <li><a class="dropdown-item" href="#">Kitchen</a></li>
                                            <li><a class="dropdown-item" href="#">Living room</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="dropdown-item" href="#">Cooling & air treatment</a></li>
                                    <li>
                                        <a class="dropdown-item dropdown-toggle dropdown-toggle-collapse" href="javascript:;"data-target="#sidebarNav3One" role="button" data-toggle="collapse" aria-expanded="false"aria-controls="sidebarNav3One">
                                            <span>TV & video devices</span>
                                        </a>
                                        <ul id="sidebarNav3One" class="collapse list-unstyled px-3" data-parent="#sidebarNav3">
                                            <li><a class="dropdown-item" href="#">Accessories</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="dropdown-item " href="#">Vacuums & floor care</a></li>
                                
                                </ul>
                            </div>
                        </li>

                        <li class="list-item">
                            <a class="d-block dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav4Collapse" data-target="#sidebarNav4Collapse">
                                <span class="font-weight-normal text-gray-1">Manage Listings</span>
                            </a>
                            <div id="sidebarNav4Collapse" class="collapse" data-parent="#sidebarNav">
                                <ul id="sidebarNav4" class="list-unstyled">
                                    
                                    <li><a class="dropdown-item " href="#">Food supplements</a></li>
                                    <li>
                                        <a class="dropdown-item dropdown-toggle dropdown-toggle-collapse" href="javascript:;" data-target="#sidebarNav4One" role="button" data-toggle="collapse" aria-expanded="false"aria-controls="sidebarNav4One">
                                            <span>Beauty tools</span>
                                        </a>
                                        <ul id="sidebarNav4One" class="collapse list-unstyled px-3" data-parent="#sidebarNav4">
                                            <li><a class="dropdown-item" href="#">Men</a></li>
                                            <li><a class="dropdown-item" href="#">Women</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="dropdown-item " href="#">Skincare</a></li>
                                    <li><a class="dropdown-item " href="#">Makeup</a></li>
                                    <li>
                                        <a class="dropdown-item dropdown-toggle dropdown-toggle-collapse" href="javascript:;" data-target="#sidebarNav4Two" role="button" data-toggle="collapse" aria-expanded="false"aria-controls="sidebarNav4Two">
                                            <span>Medical supplies</span>
                                        </a>
                                        <ul id="sidebarNav4Two" class="collapse list-unstyled px-3" data-parent="#sidebarNav4">
                                            <li><a class="dropdown-item" href="#">Bath & body</a></li>
                                            <li><a class="dropdown-item" href="#">Hair care</a></li>
                                            <li><a class="dropdown-item" href="#">Personal care</a></li>
                                        </ul>
                                    </li>
                                
                                </ul>
                            </div>
                        </li>

                        <li class="list-item">
                            <a class="d-block dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav5Collapse" data-target="#sidebarNav5Collapse">
                                <span class="font-weight-normal text-gray-1">Address & Map</span>
                            </a>
                            <div id="sidebarNav5Collapse" class="collapse" data-parent="#sidebarNav">
                                <ul id="sidebarNav5" class="list-unstyled">
                                    
                                    <li><a class="dropdown-item " href="#">Diapering & potty</a></li>
                                    <li><a class="dropdown-item " href="#">Nursery</a></li>
                                    <li><a class="dropdown-item " href="#">Baby personal care</a></li>
                                    <li><a class="dropdown-item " href="#">Clothing & accessories</a></li>
                                    <li>
                                        <a class="dropdown-item dropdown-toggle dropdown-toggle-collapse" href="javascript:;" data-target="#sidebarNav5One" role="button" data-toggle="collapse" aria-expanded="false"aria-controls="sidebarNav5One">
                                            <span>Foods</span>
                                        </a>
                                        <ul id="sidebarNav5One" class="collapse list-unstyled px-3" data-parent="#sidebarNav5">
                                            <li><a class="dropdown-item" href="#">Feeding</a></li>
                                            <li><a class="dropdown-item" href="#">Milk formula</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="dropdown-item " href="#">Baby and & toys</a></li>
                                
                                </ul>
                            </div>
                        </li>

                        <li class="list-item">
                            <a class="d-block dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav6Collapse" data-target="#sidebarNav6Collapse">
                                <span class="font-weight-normal text-gray-1">Reservation Requests</span>
                            </a>

                            <div id="sidebarNav6Collapse" class="collapse" data-parent="#sidebarNav">
                                <ul id="sidebarNav6" class="list-unstyled">
                                    
                                    <li><a class="dropdown-item " href="#">Interior accessories</a></li>
                                    <li><a class="dropdown-item " href="#">Exterior accessories</a></li>
                                    <li>
                                        <a class="dropdown-item dropdown-toggle dropdown-toggle-collapse" href="javascript:;" data-target="#sidebarNav6One" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav6One">
                                            <span>Automotive</span>
                                        </a>
                                        <ul id="sidebarNav6One" class="collapse list-unstyled px-3" data-parent="#sidebarNav6">
                                            <li><a class="dropdown-item" href="#">Services & installations</a></li>
                                            <li><a class="dropdown-item" href="#">Auto oils & fluids</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="dropdown-item " href="#">Car audio</a></li>
                                    <li><a class="dropdown-item " href="#">Auto care</a></li>
                                    <li><a class="dropdown-item " href="#">Riding gear</a></li>
                                    <li>
                                        <a class="dropdown-item dropdown-toggle dropdown-toggle-collapse" href="javascript:;" data-target="#sidebarNav6Two" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav6Two">
                                            <span>Motorcycle</span>
                                        </a>
                                        <ul id="sidebarNav6Two" class="collapse list-unstyled px-3" data-parent="#sidebarNav6">
                                            <li><a class="dropdown-item" href="#">Services & installations</a></li>
                                            <li><a class="dropdown-item" href="#">Auto oils & fluids</a></li>
                                        </ul>
                                    </li>
                                
                                </ul>
                            </div>
                        </li>

                        <li class="list-item">
                            <a class="d-block dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav7Collapse" data-target="#sidebarNav7Collapse">
                                <span class="font-weight-normal text-gray-1">Your Reservations</span>
                            </a>

                            <div id="sidebarNav7Collapse" class="collapse" data-parent="#sidebarNav">
                                <ul id="sidebarNav7" class="list-unstyled">
                                    
                                    <li><a class="dropdown-item " href="#">Mobiles</a></li>
                                    <li><a class="dropdown-item " href="#">Tablets</a></li>
                                    <li><a class="dropdown-item " href="#">Laptops</a></li>
                                    <li><a class="dropdown-item " href="#">Desktops</a></li>
                                    <li><a class="dropdown-item " href="#">Gaming consoles</a></li>
                                    <li><a class="dropdown-item " href="#">Car cameras</a></li>
                                    <li><a class="dropdown-item " href="#">Security cameras</a></li>
                                    <li><a class="dropdown-item " href="#">Digital cameras</a></li>
                                    <li><a class="dropdown-item " href="#">Gadgets</a></li>
                                
                                </ul>
                            </div>
                        </li>

                        <li class="list-item">
                            <a class="d-block dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav8Collapse" data-target="#sidebarNav8Collapse">
                                <span class="font-weight-normal text-gray-1">Search Results</span>
                            </a>
                            <div id="sidebarNav8Collapse" class="collapse" data-parent="#sidebarNav">
                                <ul id="sidebarNav8" class="list-unstyled">
                                    
                                    <li><a class="dropdown-item " href="#">Diapering & potty</a></li>
                                    <li><a class="dropdown-item " href="#">Nursery</a></li>
                                    <li>
                                        <a class="dropdown-item dropdown-toggle dropdown-toggle-collapse" href="javascript:;" data-target="#sidebarNav8One" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav8One">
                                            <span>Foods</span>
                                        </a>
                                        <ul id="sidebarNav8One" class="collapse list-unstyled px-3" data-parent="#sidebarNav8">
                                            <li><a class="dropdown-item" href="#">Feeding</a></li>
                                            <li><a class="dropdown-item" href="#">Milk formula</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="dropdown-item " href="#">Baby personal care</a></li>
                                    <li><a class="dropdown-item " href="#">Clothing & accessories</a></li>
                                    <li><a class="dropdown-item " href="#">Baby and & toys</a></li>
                                
                                </ul>
                            </div>
                        </li>

                        <li class="list-item">
                            <a class="d-block dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav9Collapse" data-target="#sidebarNav9Collapse">
                                <span class="font-weight-normal text-gray-1">Color Schemes</span>
                            </a>

                            <div id="sidebarNav9Collapse" class="collapse" data-parent="#sidebarNav">
                                <ul id="sidebarNav9" class="list-unstyled">
                                    
                                    <li><a class="dropdown-item " href="#">Mobiles</a></li>
                                    <li><a class="dropdown-item " href="#">Tablets</a></li>
                                    <li><a class="dropdown-item " href="#">Laptops</a></li>
                                    <li><a class="dropdown-item " href="#">Desktops</a></li>
                                    <li><a class="dropdown-item " href="#">Gaming consoles</a></li>
                                    <li><a class="dropdown-item " href="#">Car cameras</a></li>
                                    <li><a class="dropdown-item " href="#">Security cameras</a></li>
                                    <li><a class="dropdown-item " href="#">Digital cameras</a></li>
                                    <li><a class="dropdown-item " href="#">Gadgets</a></li>
                                
                                </ul>
                            </div>
                        </li>

                        <li class="list-item">
                            <a class="d-block dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav10Collapse" data-target="#sidebarNav10Collapse">
                                <span class="font-weight-normal text-gray-1">Responsiveness</span>
                            </a>

                            <div id="sidebarNav10Collapse" class="collapse" data-parent="#sidebarNav">
                                <ul id="sidebarNav10" class="list-unstyled">
                                    
                                    <li><a class="dropdown-item" href="#">Interior accessories</a></li>
                                    <li><a class="dropdown-item" href="#">Exterior accessories</a></li>
                                    <li><a class="dropdown-item" href="#">Car audio</a></li>
                                    <li><a class="dropdown-item" href="#">Auto care</a></li>
                                    <li>
                                        <a class="dropdown-item dropdown-toggle dropdown-toggle-collapse" href="javascript:;" data-target="#sidebarNav10One" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav10One">
                                            <span>Automotive</span>
                                        </a>
                                        <ul id="sidebarNav10One" class="collapse list-unstyled px-3" data-parent="#sidebarNav10">
                                            <li><a class="dropdown-item" href="#">Services & installations</a></li>
                                            <li><a class="dropdown-item" href="#">Auto oils & fluids</a></li>
                                        </ul>
                                    <li><a class="dropdown-item " href="#">Riding gear</a></li>
                                    <li>
                                        <a class="dropdown-item dropdown-toggle dropdown-toggle-collapse" href="javascript:;" data-target="#sidebarNav10Two" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav10Two">
                                            <span>Motorcycle</span>
                                        </a>
                                        <ul id="sidebarNav10Two" class="collapse list-unstyled px-3" data-parent="#sidebarNav10">
                                            <li><a class="dropdown-item" href="#">Services & installations</a></li>
                                            <li class="mb-2"><a class="dropdown-item" href="#">Auto oils & fluids</a></li>
                                        </ul>
                                    </li>
                                
                                </ul>
                            </div>
                        </li>
                    </ul> -->
                    <!-- End List -->

                    <div class="border border-color-7 rounded p-4 mb-5">
                        <h6 class="font-size-17 font-weight-bold text-gray-3 mx-1 mb-3 pb-1">Why Book With Us?</h6>
                        <div class="d-flex align-items-center mb-3">
                            <i class="flaticon-star font-size-25 text-primary mr-3 pr-1"></i>
                            <h6 class="mb-0 font-size-14 text-gray-1">
                                <a href="#">No-hassle best price guarantee</a>
                            </h6>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <i class="flaticon-support font-size-25 text-primary mr-3 pr-1"></i>
                            <h6 class="mb-0 font-size-14 text-gray-1">
                                <a href="#">Customer care available 24/7</a>
                            </h6>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <i class="flaticon-favorites-button font-size-25 text-primary mr-3 pr-1"></i>
                            <h6 class="mb-0 font-size-14 text-gray-1">
                                <a href="#">Hand-picked Tours & Activities</a>
                            </h6>
                        </div>
                        <div class="d-flex align-items-center mb-0">
                            <i class="flaticon-airplane font-size-25 text-primary mr-3 pr-1"></i>
                            <h6 class="mb-0 font-size-14 text-gray-1">
                                <a href="#">Free Travel Insureance</a>
                            </h6>
                        </div>
                    </div>

                    <!-- <div class="border border-color-7 rounded p-4">
                        <h6 class="font-size-17 font-weight-bold text-gray-3 mx-1 mb-3 pb-1">Tags</h6>
                        <div class="d-flex flex-wrap">
                            <a class="btn d-flex align-items-center justify-content-center btn-gray-1 rounded-xs transition-3d-hover font-size-14 text-gray-1 height-35 width-70 mr-2 mb-2" href="../tour/tour-list.html">
                                Tour
                            </a>
                            <a class="btn d-flex align-items-center justify-content-center btn-gray-1 rounded-xs transition-3d-hover font-size-14 text-gray-1 height-35 width-90 mr-2 mb-2" href="../rental/rental-list.html">
                                Rental
                            </a>
                            <a class="btn d-flex align-items-center justify-content-center btn-gray-1 rounded-xs transition-3d-hover font-size-14 text-gray-1 height-35 width-70 mr-2 mb-2" href="../cars/cars-list.html">
                                City
                            </a>
                            <a class="btn d-flex align-items-center justify-content-center btn-gray-1 rounded-xs transition-3d-hover font-size-14 text-gray-1 height-35 width-80 mr-2 mb-2" href="../yacht/yacht-list.html">
                                Yatch
                            </a>
                            <a class="btn d-flex align-items-center justify-content-center btn-gray-1 rounded-xs transition-3d-hover font-size-14 text-gray-1 height-35 width-90 mr-2 mb-2" href="../activities/activities-list.html">
                                Activity
                            </a>
                            <a class="btn d-flex align-items-center justify-content-center btn-gray-1 rounded-xs transition-3d-hover font-size-14 text-gray-1 height-35 width-90 mb-2" href="../tour/tour-list.html">
                                Musuems
                            </a>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="border border-color-8"></div>
    </div>
</main>
{/await}
<Footer />