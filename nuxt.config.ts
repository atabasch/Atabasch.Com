// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    app: {
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
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css',
                },
                {
                    rel:'stylesheet',
                    href: '/styles/style.css',
                },
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
                },
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
                measurementId: process.env.FIREBASE_MEASUREMENT_ID || '',
            }
        }
    },

    modules: [
        '@pinia/nuxt',
    ],



})
