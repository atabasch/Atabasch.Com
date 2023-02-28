import {Category} from "~/server/lib/db"
export default {

    All: async function(){
        return (await Category.get()).docs.map( doc => ({...doc.data(), id: doc.id}) )
    },

    One: async function(id){
        let item = await Category.doc(id).get()
        return item.data();
    },

    Create: async function(data){
       let insert = await Category.add(data);
       if(insert.empty){
           return false
       }else{
           await Category.doc(insert.id).update({id: insert.id})
           return insert.id
       }
    },

    Update: async function(data, id){
        let update = await Category.doc(id).update(data);
        return update
    },

    Delete: async function(id){
        let del = await Category.doc(id).delete();
        return del
    },

    Ref: async function(){
        return Category
    },

    RefOne: async function(id){
        let result = await Category.doc(id)
        return result
    }



}
