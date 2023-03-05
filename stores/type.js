import {defineStore} from "pinia"
export const storeType = defineStore('type', {

    state: () => ({
        types: [],
    }),

    getters: {

        getTypes(state){
            return state.types
        },

        getType(state){
            return {
                withIndex: (index) => this.getTypes[index] || null,
                withPk: (pk) => this.getTypes.find(type => type.postTypeId == pk)
            }
        },


    },


    actions: {

        fillTypes(types){
            this.types = types
        },

        putType(type){
            this.types.unshift(type)
        },

        updateType(newType){
            this.types.forEach((t, i) => {
                if(t.postTypeId===newType.postTypeId){
                    this.types.splice(i, 1, newType)
                    return false;
                }
            })
        },

        deleteType(index){
            this.types.splice(index, 1)
        }

    }

})
