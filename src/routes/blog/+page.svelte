
<script>
    import Header from '$lib/components/home/header.svelte';
	import Footer from '$lib/components/common/footer.svelte';
    import Preloader from '$lib/components/common/preloader.svelte'
    import bg from "$lib/assets/bg.jpg"
    let blogPromise
    async function getBlogPromise(){
            const req = await fetch(`https://www.traveltrademaldives.com/wp-json/wp/v2/posts?categories=2&_fields=link,title,_links,_embedded&_embed`)
            const res = await req.json()
            return res 
            
    }
    blogPromise = getBlogPromise() 
 
</script>

<Header />
<main id="content">
    <!-- Hero Section -->
    <div class="bg-img-hero text-center mb-5 mb-lg-8" style="background-image: url({bg});">
        <div class="container space-top-xl-3 py-6 py-xl-0">
            <div class="row justify-content-center py-xl-4">
                <!-- Info -->
                <div class="py-xl-10 py-5">
                    <h1 class="font-size-40 font-size-xs-30 text-white font-weight-bold mb-0">Blog</h1>
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb breadcrumb-no-gutter mb-0">
                        <li class="breadcrumb-item font-size-14"><a class="text-white" href="/">Home</a></li>
                        <li class="breadcrumb-item custom-breadcrumb-item font-size-14 text-white active" aria-current="page">Blog</li>
                      </ol>
                    </nav>
                </div>
                <!-- End Info -->
            </div>
        </div>
    </div>
    <!-- End Hero Section -->
    <div class="mb-6 mb-lg-8 pt-lg-1">
        <div class="container mb-5 mb-lg-9 pb-lg-1">
            <div class="row">
                <div class="col-lg-8 col-xl-9">
                    {#await blogPromise}
                        <Preloader /> 
                        {:then data}
                    <div class="mb-5 pb-1">                        
                        {#each data as blog}
                        <div class="mb-4">
                            <a class="d-block" href="/blog/{blog.id}/{blog.slug}">
                                {#if blog._embedded['wp:featuredmedia']}
                                <img class="img-fluid mb-4 rounded-xs w-100" src={blog._embedded['wp:featuredmedia'][0].source_url} alt="{blog.title.rendered}">
                                {/if}
                            </a>
                            <h5 class="font-weight-bold font-size-21 text-gray-3">
                                <a href="/blog/{blog.id}/{blog.slug}">{@html blog.title.rendered}</a>
                            </h5>
                            <div class="mb-3">
                                <a class="mr-3 pr-1" href="/blog/{blog.id}/{blog.slug}">
                                    <span class="font-weight-normal text-gray-3">{@html new Date(blog.date).toDateString()}</span>
                                </a>
                                <!-- <a href="#">
                                    <span class="font-weight-normal text-primary">Life Style</span>
                                </a> -->
                            </div>
                            <p class="mb-0 text-lh-lg">{@html blog.excerpt.rendered} …
                            </p>
                        </div>
                        {/each}                      
                    </div>
                    {/await}
                    <!-- <nav aria-label="Page navigation">
                        <ul class="list-pagination-1 pagination border border-color-4 rounded-sm mb-5 mb-lg-0 overflow-auto overflow-xl-visible justify-content-md-center align-items-center py-2">
                            <li class="page-item">
                                <a class="page-link border-right rounded-0 text-gray-5" href="#" aria-label="Previous">
                                    <i class="flaticon-left-direction-arrow font-size-10 font-weight-bold"></i>
                                    <span class="sr-only">Previous</span>
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link font-size-14" href="#">1</a></li>
                            <li class="page-item"><a class="page-link font-size-14 active" href="#">2</a></li>
                            <li class="page-item"><a class="page-link font-size-14" href="#">3</a></li>
                            <li class="page-item"><a class="page-link font-size-14" href="#">4</a></li>
                            <li class="page-item"><a class="page-link font-size-14" href="#">5</a></li>
                            <li class="page-item disabled"><a class="page-link font-size-14" href="#">...</a></li>
                            <li class="page-item"><a class="page-link font-size-14" href="#">66</a></li>
                            <li class="page-item"><a class="page-link font-size-14" href="#">67</a></li>
                            <li class="page-item">
                                <a class="page-link border-left rounded-0 text-gray-5" href="#" aria-label="Next">
                                    <i class="flaticon-right-thin-chevron font-size-10 font-weight-bold"></i>
                                    <span class="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav> -->
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
<Footer />