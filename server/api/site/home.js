import {getPosts, getPost, getTaxonomy} from "@/server/lib/GetDatas"

export default defineEventHandler(async (event) => {

    let result = {
        about: {},
        skills: [],
        technologies: [],
        languages: [],
        projects: [],
        references: [],
        reference_categories: [],
        posts: [],
        blog_categories: [],
        top_views: []
    };


    // Hakkımda
    result.about = await getPost(2);

    // Mesleki Beceriler
    result.skills = await getPosts('skills', { limit:4, columns: 'postId,postTitle,postSlug,postDescription' })

    // Teknolojiler
    result.technologies = await getPosts('technology', { limit:8, columns: 'postId,postTitle,postSlug,postDescription' })

    // Diller
    result.languages = await getPosts('language', { limit:3, columns: 'postId,postTitle,postSlug' })

    // Projeler
    result.projects = await getPosts('project', { limit:3, columns: 'postId,postTitle,postSlug,postDescription' })

    // Referanslar
    result.references = await getPosts('reference', { limit:6, columns: 'postId,postTitle,postSlug,postDescription' })

    // Makaleler
    result.posts = await getPosts('post', { limit:5, columns: 'postId,postTitle,postSlug,postDescription' })

    return result

});
