import * as maldives from '$lib/data/maldives.json';
import { writable } from 'svelte/store';

export const load = async ({ }) => {

    const mv = writable(maldives?.data?.records)
    const fl = writable(maldives?.data?.filters)
    const ttm = await fetch(`https://www.traveltrademaldives.com/wp-json/wp/v2/posts?categories=2&_fields=title,date,_links,_embedded&_embed`)
    const blog = await ttm.json()

    return {
        hotels: mv,
        filters: fl,
        posts: blog
    }
         
}

 