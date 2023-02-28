import { defineStore } from "pinia"
export const storeTaxonomy = defineStore('taxonomy', {

    state: () => ({
        taxonomies: []
    }),

    getters: {
        getTaxonomies(state){
            return state.taxonomies
        },

    },

    actions: {
        fillTaxonomies(taxonomies){
            this.taxonomies = taxonomies
        },
        addTaxonomy(taxonomy){
            this.taxonomies.unshift(taxonomy)
        },
        updateTaxonomy(taxonomy){
            let taxState = this.taxonomies
            this.taxonomies.forEach(function(tax, index){
                if(tax.taxId===taxonomy.taxId){
                    taxState.splice(index, 1, taxonomy)
                    return false
                }
            });
        },
        deleteTaxonomy(taxonomy){
            let taxState = this.taxonomies
            this.taxonomies.forEach(function(tax, index){
                if(tax.taxId===taxonomy.taxId){
                    taxState.splice(index, 1)
                    return false
                }
            });
        }
    }

})
