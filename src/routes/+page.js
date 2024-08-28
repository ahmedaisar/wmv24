import * as maldives from '$lib/data/maldives.json';

export const load = async ({  }) => {

    const data = maldives?.data?.records;

    const blog = await fetch(`https://www.traveltrademaldives.com/wp-json/wp/v2/posts?categories=2&_fields=title,date,_links,_embedded&_embed`)
    const blogres = await blog.json()

    return {
        posts: blogres,
        hotels: data
     
    }
         
}

 