import {defineStore} from "pinia"
import {useGetPosts, useGetTerm} from "~/composables/useGetDatas";
import {useRuntimeConfig} from "nuxt/app";
const {public:config} = useRuntimeConfig()

export default defineStore('posts', {
    state: () => ({
        posts: [],
        pageNumber:1,
        limit: 12
    }),

    actions: {
        setPageNumber(pageNumber)   { this.pageNumber = pageNumber },

        resetStates(){
            this.posts = []
            this.pageNumber = 1
        },

        // verilen term objesinden postsları yükler
        loadPostsByTerm(termSlug)     {
            return new Promise(async (r, e) => {
                await useGetPosts({
                    term: termSlug,
                    limit: this.limit,
                    page: this.pageNumber,
                }).then(async (resp) => {
                    if(resp.status && resp.posts){
                        this.posts = resp.posts
                        r(resp.posts)
                    }else{
                        e(false)
                    }
                })
            })
        },

        setPageNumberAndLoadPosts(pageNumber, termSlug){
            this.pageNumber = pageNumber
            this.loadPostsByTerm(termSlug)
        }



    },

    getters: {
        getPageNumber(state)    { return state.pageNumber },
        getNextPageNumber(state){
            return (state.posts.length < state.limit)? null : state.pageNumber + 1
        },
        getPrevPageNumber(state){
            return (state.pageNumber <= 1)? null : state.pageNumber - 1
        },
        getPosts(state)         { return state.posts },
        getPostsCount(state)    { return state.posts.length },
    }
})
