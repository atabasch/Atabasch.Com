import {PostType} from "~/server/db/models";
export default defineEventHandler( async (event) => {
    const {type: postData} = await readBody(event)

    if(typeof postData.postTypeTaxonomies === 'object'){
        postData.postTypeTaxonomies = JSON.stringify(postData.postTypeTaxonomies).toString()
    }

    const createdType = await PostType.create({...postData})
    return {status: true , type: createdType}
})
