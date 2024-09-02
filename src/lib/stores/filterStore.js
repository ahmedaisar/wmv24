import { writable, derived } from 'svelte/store';

// Create a store for the filters
export const filters = writable({
  rating: [],
  stars: [],
  toas: [],
  extra_filters: [],
  price: {
    current_lower: 35,
    current_upper: 498
  },
  distance: {
    lower: 1,
    upper: 20
  }
});

// Create a derived store for filtered hotels
export const filteredHotels = derived(
  [filters, /* add your hotels store here */],
  ([$filters, $hotels]) => {
    return $hotels.filter(hotel => {
      // Rating filter
      if ($filters.rating.length > 0 && !$filters.rating.includes(Math.floor(hotel.rating))) {
        return false;
      }

      // Stars filter
      if ($filters.stars.length > 0 && !$filters.stars.includes(hotel.stars)) {
        return false;
      }

      // Type of accommodation (toas) filter
      if ($filters.toas.length > 0 && !$filters.toas.includes(hotel.accommodation_type)) {
        return false;
      }

      // Extra filters
      if ($filters.extra_filters.length > 0) {
        const hasAllFilters = $filters.extra_filters.every(filter => hotel.amenities.includes(filter));
        if (!hasAllFilters) return false;
      }

      // Price filter
      if (hotel.price < $filters.price.current_lower || hotel.price > $filters.price.current_upper) {
        return false;
      }

      // Distance filter
      if (hotel.distance < $filters.distance.lower || hotel.distance > $filters.distance.upper) {
        return false;
      }

      // If all filters pass, include the hotel
      return true;
    });
  }
);