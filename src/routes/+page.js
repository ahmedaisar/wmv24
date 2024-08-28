export const load = async ({ params  }) => {

    const { checkin, checkout, adults, child } = params

    const blog = await fetch(`https://www.traveltrademaldives.com/wp-json/wp/v2/posts?categories=2&_fields=title,date,_links,_embedded&_embed`)
    const blogres = await blog.json()

    const hotels = await fetch(`https://letsgo-seven.vercel.app/api/hotels?checkin${checkin}&checkout=${checkout}&adults=${adults}&child=${child}`)
    const hotelres = await blog.json()

    if (!params) {
        return {
            posts: blogres,
        }
        
    }
    return {
        posts: blogres,
        hotels: hotelres
    }
         
}

 