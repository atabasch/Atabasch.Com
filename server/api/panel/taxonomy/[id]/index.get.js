import {Taxonomy} from "~/server/db/models";
import {Op} from "sequelize"

export default defineEventHandler( async (event) => {
    const {id} = event.context.params

    let taxonomy = await Taxonomy.findOne({
        include: [{
            association: 'terms',
            limit: 0,
        }],
        where: {
            [Op.or] : [
                {taxId: id},
                {taxSlug: id},
            ]
        },
        order: [
            ['terms', 'termId', 'DESC']
        ]
    });

    if(!taxonomy){
        return {status:false, taxonomy:[], terms:[], message:'Taksonomi bulunamadı'}
    }else {
        return {
            status: true,
            taxonomy: {...taxonomy.toJSON(), terms: []},
            terms: taxonomy.terms
        }
    }

} )
