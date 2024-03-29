interface Options{
    type?:string;
    name?:string;
    offset?:number;
    limit?:number;
    page?:number;
    orderBy?:string;
    sort?:string;
    columns?:string;
}

interface extraItem{
    extraName: string,
    extraValue: string
}

// İÇERİKLERİ GETİR.
export const useGetPosts = (options:Options) => {
    return $fetch('/api/post', { method:'GET', params:options });
}

export const useGetTerm = (options:Options) => {
    return $fetch('/api/site/term', { method:'GET', params:options });
}

export const useGetTerms = (options:Options) => {
    return $fetch('/api/term', { method:'GET', params:options });
}

export const useGetTaxonomy = (options:Options) => {
    return $fetch('/api/site/taxonomy', { method:'GET', params:options });
}





// GÖNDERİLEN EXTRA DATALARDAN SEÇİLENİ VER
export const useGetPostExtra = (extra:extraItem[], extraName:string, defaultValue=null) => {
    let result:any = defaultValue;
    if(extra.length < 1){ return result }

    extra.forEach(extraItem => {
        if(extraItem.extraName == extraName){
            result = extraItem.extraValue;
        }
    })
    return  result;
}


interface PostTerm {
    taxonomy: {
        taxSlug: string | null;
    };
}

export const useFilterTerms = (terms: PostTerm[] = [], taxSlug: string | null = null): PostTerm[] => {
    return terms.filter((term) => term.taxonomy?.taxSlug === taxSlug);
};
