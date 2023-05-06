import {getPosts, getPost, getTerms} from "@/server/lib/GetDatas"
import {defineEventHandler} from "h3";

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
    result.about = await getPost(process.env.about_summary_id || 0);

    // Mesleki Beceriler
    result.skills = await getPosts('skills', { limit:4, columns: 'postId,postTitle,postSlug,postDescription' })

    // Teknolojiler
    result.technologies = await getPosts('technology', { limit:8, columns: 'postId,postTitle,postSlug,postDescription' })

    // Diller
    result.languages = await getPosts('language', { limit:3, columns: 'postId,postTitle,postSlug', sort:'ASC' })

    // Projeler
    result.projects = await getPosts('reference', { limit:3, columns: 'postId,postTitle,postSlug,postDescription',
        extraFilter: {
            extraName: 'is_the_project_mine',
            extraValue: true
        }
    })

    // Referanslar
    result.references = await getPosts('reference', { limit:6, columns: 'postId,postTitle,postSlug,postDescription,postCover' })

    // Makaleler
    result.posts = await getPosts('post', { limit:5, columns: 'postId,postTitle,postSlug,postDescription,postCover,postViews,postPublishedAt' })
    result.blog_categories = await getTerms('kategori', { columns: 'termId,termTitle,termSlug'});


    return result
});
