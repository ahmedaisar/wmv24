import * as maldives from '$lib/data/maldives.json';

export const load = async () => {
	const data = maldives?.data?.records;

	const resorts = data.filter((h) => {
		return h.toa_label === 'resort' && h.quality.stars == 5;
	});

	return {
		hotels: resorts
	};
};
