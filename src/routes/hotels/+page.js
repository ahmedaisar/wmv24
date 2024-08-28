import * as maldives from '$lib/data/maldives.json';

export const load = async ({ params }) => {
	const { checkin, checkout, adults, child } = params;

	const hotels = await fetch(
		`https://letsgo-seven.vercel.app/api/hotels?checkin${checkin}&checkout=${checkout}&adults=${adults}&child=${child}`
	);
	const hotelres = await hotels.json();

	const data = maldives?.data?.records;

	const resorts = data.filter((h) => {
		return h.toa_label === 'resort' && h.quality.stars == 5;
	});

	if (!params) {
		return {
			hotels: resorts
		};
	}
	return {
		hotels: hotelres
	};
};
