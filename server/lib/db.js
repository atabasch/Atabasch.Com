import {app} from "./firebase"
import {getFirestore} from "firebase-admin/firestore"

const fbdb = getFirestore(app)

export const db         =   fbdb;
export const Post       =   fbdb.collection('posts');
export const Category   =   fbdb.collection('categories');
export const Work       =   fbdb.collection('works');
export const Section    =   fbdb.collection('sections');
export const Page       =   fbdb.collection('pages');
export const Config     =   fbdb.collection('configs');
export const Comment    =   fbdb.collection('comments');
export const Contact    =   fbdb.collection('contacts');

