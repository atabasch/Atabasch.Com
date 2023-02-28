import slugify from "slugify"
const slugMethod =  async function(text = ''){
    return await slugify(text, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false,
        locale: 'tr',
        trim: true
    })
}

export default slugMethod
