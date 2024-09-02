import * as maldives from '$lib/data/maldives.json';

export const load = async ({ params }) => {
	const { checkin, checkout, adults, child } = params;
	let data;

	if (checkin) {
		const hotels = await fetch(
			`https://letsgo-seven.vercel.app/api/hotels?checkin${checkin}&checkout=${checkout}&adults=${adults}&child=${child}`
		);
		data = await hotels.json();
	}
	const localdata = maldives?.data;

	data = localdata.records.filter((h) => {
		return h.toa_label === 'resort' && h.quality.stars == 5;
	});

	return {
		hotels: data,
		filters: localdata.filters
	};
};
