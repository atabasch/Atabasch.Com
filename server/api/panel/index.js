
export default defineEventHandler(async (event) => {

    const fd = readMultipartFormData(event)

    /*

    // url pathdeki parametreleri alır.
    const {id} = event.context.params;

    // ?id=x&name=y
    let { id, name } = getQuery(event);

    // Post'dan gelen verileri alır.
    let {username, password} = readBody(event)

    // başka bir fetch isteği
    await $fetch(é....)

    */

    // const conf = useRuntimeConfig();
    // console.log("conf", conf);

    return { status: true }
})
