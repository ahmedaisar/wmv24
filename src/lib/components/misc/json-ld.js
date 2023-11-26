export function serializeSchema(thing) {
    return `<script type="application/ld+json">${JSON.stringify(thing, null, 2)}</script>`
}