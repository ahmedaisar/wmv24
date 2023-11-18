
import root from '../root.svelte';
import { set_building } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	track_server_fetches: false,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<!-- Title -->\n\t<title>MaldivesBeachVacation.com | Compare and find the best price!</title>\n\n\t<!-- Required Meta Tags Always Come First -->\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n\n\t<!-- Favicon -->\n\t<link rel=\"shortcut icon\" href=\"/favicon.png\">\n\n\t<!-- Google Fonts -->\n\t<link href=\"https://fonts.googleapis.com/css?family=Lato&amp;display=swap\" rel=\"stylesheet\">\n\t<link href=\"//fonts.googleapis.com/css?family=Rubik:300,400,500,700,900&amp;display=swap\" rel=\"stylesheet\">\n\n\t<!-- CSS Implementing Plugins -->\n\t<link rel=\"stylesheet\" href=\"/assets/vendor/font-awesome/css/fontawesome-all.min.css\">\n\t<link rel=\"stylesheet\" href=\"/assets/css/font-mytravel.css\">\n\t<link rel=\"stylesheet\" href=\"/assets/vendor/animate.css/animate.min.css\">\n\t<link rel=\"stylesheet\" href=\"/assets/vendor/hs-megamenu/src/hs.megamenu.css\">\n\t<link rel=\"stylesheet\" href=\"/assets/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css\">\n\t<link rel=\"stylesheet\" href=\"/assets/vendor/flatpickr/dist/flatpickr.min.css\">\n\t<link rel=\"stylesheet\" href=\"/assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css\">\n\t<link rel=\"stylesheet\" href=\"/assets/vendor/slick-carousel/slick/slick.css\">\n\t<link rel=\"stylesheet\" href=\"/assets/vendor/dzsparallaxer/dzsparallaxer.css\">\n\n\t<!-- CSS MyTravel Template -->\n\t<link rel=\"stylesheet\" href=\"/assets/css/theme.css\">\n\t\n\t" + head + "\n\t\n</head>\n\n<body data-sveltekit-preload-data=\"hover\">\n\t\n\t<div style=\"display: contents\">" + body + "</div>\n\t <!-- JS Global Compulsory -->\n\t<script src=\"/assets/vendor/jquery/dist/jquery.min.js\"></script>\n\t<!-- <script src=\"/assets/vendor/jquery-migrate/dist/jquery-migrate.min.js\"></script> -->\n\t<script src=\"/assets/vendor/popper.js/dist/umd/popper.min.js\"></script>\n\t<script src=\"/assets/vendor/bootstrap/bootstrap.min.js\"></script>\n\t<script src=\"/assets/vendor/dzsparallaxer/dzsparallaxer.js\"></script>\n\n\t <!-- JS Implementing Plugins -->\n\t <script src=\"/assets/vendor/hs-megamenu/src/hs.megamenu.js\"></script>\n\t <script src=\"/assets/vendor/jquery-validation/dist/jquery.validate.min.js\"></script>\n\t <script src=\"/assets/vendor/flatpickr/dist/flatpickr.min.js\"></script>\n\t <script src=\"/assets/vendor/bootstrap-select/dist/js/bootstrap-select.min.js\"></script>\n\t <script src=\"/assets/vendor/slick-carousel/slick/slick.js\"></script>\n\t <script src=\"/assets/vendor/ion-rangeslider/js/ion.rangeSlider.min.js\"></script>\n\t<script src=\"/assets/vendor/custombox/dist/custombox.min.js\"></script>\n\t<script src=\"/assets/vendor/custombox/dist/custombox.legacy.min.js\"></script>\n\t<script src=\"/assets/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js\"></script>\n\t<script src=\"/assets/vendor/fancybox/jquery.fancybox.min.js\"></script>\n\t<script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js\"></script>\n\n\t <!-- JS MyTravel -->\n\t <script src=\"/assets/js/hs.core.js\"></script>\n\t <script src=\"/assets/js/components/hs.header.js\"></script>\n\t <script src=\"/assets/js/components/hs.unfold.js\"></script>\n\t <script src=\"/assets/js/components/hs.validation.js\"></script>\n\t <script src=\"/assets/js/components/hs.show-animation.js\"></script>\n\t <script src=\"/assets/js/components/hs.range-datepicker.js\"></script>\n\t <script src=\"/assets/js/components/hs.range-slider.js\"></script>\n\t <script src=\"/assets/js/components/hs.selectpicker.js\"></script>\n\t <script src=\"/assets/js/components/hs.go-to.js\"></script>\n\t <script src=\"/assets/js/components/hs.slick-carousel.js\"></script>\n\t <script src=\"/assets/js/components/hs.fancybox.js\"></script>\n\t <script src=\"/assets/js/components/hs.quantity-counter.js\"></script>\n\t <script src=\"/assets/vendor/gmaps/gmaps.min.js\"></script>\n\t <script src=\"/assets/js/components/hs.g-map.js\"></script>\n\t <script src=\"/assets/js/components/hs.scroll-nav.js\"></script>\n\t <script src=\"/assets/js/components/hs.modal-window.js\"></script>\n\t <script src=\"/assets/js/components/hs.malihu-scrollbar.js\"></script>\n\t <script src=\"/assets/js/components/hs.sticky-block.js\"></script>\n        \n\n\t <!-- JS Plugins Init. -->\n\t <script>\n\t\t $(window).on('load', function () {\n\t\t\t // initialization of HSMegaMenu component\n\t\t\t $('.js-mega-menu').HSMegaMenu({\n\t\t\t\t event: 'hover',\n\t\t\t\t pageContainer: $('.container'),\n\t\t\t\t breakpoint: 1199.98,\n\t\t\t\t hideTimeOut: 0\n\t\t\t });\n\n\t\t\t//  // Page preloader\n\t\t\t//  setTimeout(function() {\n\t\t\t//    $('#jsPreloader').fadeOut(500)\n\t\t\t//  }, 800);\n\t\t });\n\n\t\t $(document).on('ready', function () {\n\t\t\t // initialization of header\n\t\t\t $.HSCore.components.HSHeader.init($('#header'));\n\n\t\t\t // initialization of unfold component\n\t\t\t $.HSCore.components.HSUnfold.init($('[data-unfold-target]'));\n\n\t\t\t // initialization of show animations\n\t\t\t $.HSCore.components.HSShowAnimation.init('.js-animation-link');\n\n\t\t\t // initialization of datepicker\n\t\t\t $.HSCore.components.HSRangeDatepicker.init('.js-range-datepicker');\n\n\t\t\t // initialization of malihu scrollbar\n\t\t\t $.HSCore.components.HSMalihuScrollBar.init($('.js-scrollbar'));\n\n\t\t\t // initialization of select\n\t\t\t $.HSCore.components.HSSelectPicker.init('.js-select');\n\n\t\t\t // initialization of quantity counter\n\t\t\t $.HSCore.components.HSQantityCounter.init('.js-quantity');\n\n\t\t\t // initialization of slick carousel\n\t\t\t $.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');\n\n\t\t\t // initialization of go to\n\t\t\t $.HSCore.components.HSGoTo.init('.js-go-to');\n\n\t\t\t // initialization of sticky blocks\n\t\t\t $.HSCore.components.HSStickyBlock.init('.js-sticky-block');\n\n\t\t\t// initialization of HSScrollNav component\n\t\t\t $.HSCore.components.HSScrollNav.init($('.js-scroll-nav'), {\n\t\t\t\tduration: 700\n\t\t\t});\n\n\t\t });\n\t </script>\n\t <!-- <script src=\"//maps.googleapis.com/maps/api/js?key=AIzaSyCuY6I4hZQvxo5RqCH7kogGKzcrjetRKQI&amp;callback=initMap\" async=\"\" defer=\"\"></script> -->\n</body>\n\n</html>",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "1p4rwky"
};

export function get_hooks() {
	return {};
}

export { set_assets, set_building, set_private_env, set_public_env };
