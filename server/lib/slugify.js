import slugify from "slugify";
export default async function(text){
    return await slugify(text, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'tr',       // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
    })
}
