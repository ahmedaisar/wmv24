// export const load = async ({ fetch, params }) => {
// 	const { checkin, checkout, adults, child} = params

// 	const fetchList = async () => {
// 		const req = await fetch(
// 			`https://mbv-api-server.onrender.com/scanner?checkin=${checkin}&checkout=${checkout}&adults=${adults}&child=${child}`
// 		);
// 		const res = await req.json();
//         return res
// 	};

// 	return {
// 		params: params,
// 		hotellistdata: fetchList()
// 	};
// };
