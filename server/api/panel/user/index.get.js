import {User} from "@/server/db/models"
export default defineEventHandler(async (event) => {
    let {fields, include: incModels, level} = await getQuery(event)
    incModels   = !incModels? [] : incModels.split(',')
    level       =  !level? [-2,-1,0,1,2,3,4,5,6,7,8,9] : level.split(',')

    let includes = []
    if(incModels.indexOf('data')>=0){       includes.push( {association: 'data'} );      }
    if(incModels.indexOf('posts')>=0){       includes.push( {association: 'posts'} );      }

    let users = await User.findAll({
        attributes: !fields? false: fields.split(','),
        order: [
            ['userID', 'DESC']
        ],
        include: includes,
        where: {
            userLevel: level
        }
    })
    return {status: true, users}
})
