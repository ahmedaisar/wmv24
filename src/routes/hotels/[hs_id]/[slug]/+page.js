import agent from 'new-user-agent'
export const load = async ({ fetch, params }) => {
    
    let headers = new Headers({
        "Accept"       : "application/json",
        "Content-Type" : "application/json",
        "User-Agent"   : agent()
    });
    let para = params    
    let req = await fetch("https://hotelscan.com/combiner?pos=zz&locale=en&checkin=2024-01-17&checkout=2024-01-21&rooms=2&mobile=0&loop=1&country=MV&ef=1&geoid=xmmmamtksdxx&availability=1&deviceNetwork=4g&deviceCpu=20&deviceMemory=8&limit=25&offset=0", { headers });
    let res = await req.json();     
	
    return {
        params: para,
        hoteldata: res
    }
}