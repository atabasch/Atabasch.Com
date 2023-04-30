import {defineStore} from "pinia";
export const storeSite = defineStore( 'customStore',{

    state: () => ({
        topPosts: [],
        navigations: [],
        taxonomies: []
    }),

    getters: {

        getNavigation: (state) => (idOrSlug) => state.navigations.find(nav => (nav.navigationId === idOrSlug || nav.navigationSlug === idOrSlug)),
        getTopPosts: (state) => state.topPosts,
        getTaxonomy: (state) => (idOrSlug) => state.taxonomies.find(tax => (tax.taxId === idOrSlug || tax.taxSlug === idOrSlug))

    },



    actions: {

        fillDatasFromInit(datas){
            this.topPosts = datas.topPosts || []
            this.navigations = datas.navigations || []
            this.taxonomies = datas.taxonomies || []
        },

    }

} )
