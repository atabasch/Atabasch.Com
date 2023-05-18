// https://nuxt.com/docs/api/configuration/nuxt-config
require('dotenv').config()
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    css: [
       "~/assets/scss/app.scss"
    ],

    ssr: true,

    app: {

            pageTransition: {
                name: 'page',
                mode: 'out-in'
            },

        head: {
            link: [
                {
                    rel:'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
                    integrity: 'sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD',
                    crossorigin: 'anonymous'
                },
                {
                    rel:'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css'
                },
                {
                    rel:'stylesheet',
                    href: '/styles/style.css'
                }
            ],
            script: [
                {
                    src: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js',
                    crossorigin:"anonymous",
                    integrity:'sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3'
                },
                {
                    src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js',
                    crossorigin: 'anonymous',
                    integrity:'sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD'
                }
            ]
        }



    },

    runtimeConfig: {
        public: {
            firebase: {
                apiKey: process.env.FIREBASE_API_KEY || '',
                authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
                projectId: process.env.FIREBASE_PROJECT_ID || '',
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
                messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
                appId: process.env.FIREBASE_APP_ID || '',
                measurementId: process.env.FIREBASE_MEASUREMENT_ID || ''
            },
            referenceBranchSlug: process.env.REFERENCE_BRANCH_SLUG || 'branch',
            referenceTechnologySlug: process.env.REFERENCE_TECHNOLOGY_SLUG || 'teknoloji',
            postsByTermPerPage: process.env.POSTS_BY_TERM_PER_PAGE || 12,
            postsPerPage: process.env.POSTS_PER_PAGE || 10,
            referencesPerPage: process.env.REFERENCES_PER_PAGE || 10,

            blogPageSlug: process.env.BLOG_PAGE_SLUG || 'blog',
            referencePageSlug: process.env.REFERENCE_PAGE_SLUG || 'referanslar',
            technologyPageSlug: process.env.TECHNOLOGY_PAGE_SLUG || 'teknoloji',
            searchPageSlug: process.env.SEARCH_PAGE_SLUG || 'ara',
            contactPageSlug: process.env.CONTACT_PAGE_SLUG || 'iletisim'

        }
    },

    modules: [
        '@pinia/nuxt'
    ],

})
