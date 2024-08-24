export const load = async ({ fetch, params }) => {
    let para = params    
    
    // const req = await fetch("https://nodeapi-506j.onrender.com/scan?hotelid=690385651&checkin=2024-01-17&checkout=2024-01-21");
    // const res = await req.json();   
    // const getData = JSON.parse(res);
      
    return {
        params: para,
       // hoteldata: getData
    }
}