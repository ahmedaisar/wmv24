export const load = async ({ fetch, params }) => {
    let para = params    
    let req = await fetch("https://nodeapi-506j.onrender.com/scan?hotelid=690385651&checkin=2024-01-17&checkout=2024-01-21");
    let res = await req.json();     
	
    return {
        params: para,
        hoteldata: JSON.parse(res)
    }
}