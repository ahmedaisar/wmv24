import agent from 'new-user-agent'
export const load = async ({ fetch, params }) => {
    
    let headers = new Headers({
        "User-Agent"   : agent
    });
    let para = params    
    let req = await fetch("https://nodeapi-506j.onrender.com/scan?hotelid=690385651&checkin=2024-01-17&checkout=2024-01-21", { headers });
    let res = await req.json();     
	
    return {
        params: para,
        hoteldata: res
    }
}