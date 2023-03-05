import {Contact} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    let {id} = event.context.params
    let contact = await Contact.findByPk(id);
    if(!contact){
        return {status:false, message: ''}
    }else{
        return {status:true, contact}
    }

});
