import {Post} from "~/server/lib/db"
export default {

    All: async function(){
        return (await Post.get()).docs.map( doc => ({...doc.data(), id: doc.id}) )
    },

    One: async function(id){
        let result = await Post.doc(id).get()
        return result.data()
    },

    Create: async function(data){
        let insert = await Post.add(data)
        if(insert.empty){
            return false
        }else{
            await Post.doc(insert.id).update({id: insert.id})
            return insert.id
        }
    },

    Update: async function(data, id){
        let result = await (Post.doc(id)).update(data)
        return result
    },

    Delete: async function(id){
        let result = await Post.doc(id).delete()
        return result
    },

    Ref: async function(){
        return Post
    },

    RefOne: async function(id){
        let result = await Post.doc(id)
        return result
    }


}
