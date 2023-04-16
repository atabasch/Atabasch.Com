import {getPosts, getPost, getTerms} from "@/server/lib/GetDatas"

export default defineEventHandler(async (event) => {

    let result = {
        about: {},
        skills: [],
        technologies: [],
        languages: [],
        projects: [],
        references: [],
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
    result.languages = await getPosts('language', { limit:3, columns: 'postId,postTitle,postSlug', sort:'ASC' })

    // Projeler
    result.projects = await getPosts('project', { limit:3, columns: 'postId,postTitle,postSlug,postDescription' })

    // Referanslar
    result.references = await getPosts('reference', { limit:6, columns: 'postId,postTitle,postSlug,postDescription' })

    // Makaleler
    result.posts = await getPosts('post', { limit:5, columns: 'postId,postTitle,postSlug,postDescription' })
    result.blog_categories = await getTerms('kategori', { columns: 'termId,termTitle,termSlug'});

    // Çok Okunanlar
    result.top_views = await getPosts('post', { limit:7, columns: 'postId,postTitle,postSlug,postDescription,postViews', orderBy: 'postViews', sort:'DESC'})

    return result

});
