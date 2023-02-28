export const useStateTaxonomy = () => useState('taxonomies', () => [])
export const useStateTaxonomyGet = (idOrSlug) => {
    return useStateTaxonomy().value.find(tax => (tax.taxId==idOrSlug || tax.taxSlug==idOrSlug))
}
