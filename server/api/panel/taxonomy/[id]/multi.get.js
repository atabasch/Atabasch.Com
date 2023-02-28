import {Taxonomy} from "~/server/db/models";
import {Op} from "sequelize"

export default defineEventHandler( async (event) => {
    const {id} = event.context.params

    let ids = id.split(',')
    let taxonomies = await Taxonomy.findAll({
        include: [{
            association: 'terms',
            limit: 0,
        }],
        where: {
            [Op.or] : [
                {taxId: {[Op.in]: ids}},
                {taxSlug: {[Op.in]: ids}},
            ]
        },
        order: [
            ['terms', 'termId', 'DESC']
        ]
    });

    if(!taxonomies){
        return {status:false, taxonomies:[],  message:'Taksonomi bulunamadı'}
    }else {
        return {
            status: true,
            taxonomies: taxonomies
        }
    }

} )
