export const load = async ({  }) => {

    const req = await fetch(`https://www.traveltrademaldives.com/wp-json/wp/v2/posts?categories=2&_fields=title,date,_links,_embedded&_embed`)
    const res = await req.json()
      
    return {
        posts: res,
    }
}

 