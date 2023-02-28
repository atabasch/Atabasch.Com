import n3AtabaschToken  from "./n3atabasch-19b7da8447a6.json"
import { initializeApp, cert } from 'firebase-admin/app'
const config = useRuntimeConfig();

// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: config.public.firebase.apiKey || '',
    authDomain: config.public.firebase.authDomain || '',
    projectId: config.public.firebase.projectId || '',
    storageBucket: config.public.firebase.storageBucket || '',
    messagingSenderId: config.public.firebase.messagingSenderId || '',
    appId: config.public.firebase.appId || '',
    measurementId: config.public.firebase.measurementId || '',
    credential: cert(n3AtabaschToken)
};
// const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);
