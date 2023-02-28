import {connection} from "~/server/db/connection"
import {Model, DataTypes, Op} from "sequelize"
import slugify from "@/helpers/slugify"


class Post extends Model {}

Post.allowedFields = [
    'postTitle',
    'postSlug',
    'postDescription',
    'postKeywords',
    'postContent',
    'postCover',
    'postStatus',
    'postType',
    'postParent',
    'postAuthor',
    'postAllowComment',
    'postViews',
    'postDeletedAt',
    'postPublishedAt',
]

Post.init({
    postId:        {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    postTitle:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    postSlug:      {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    postDescription:{
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    postKeywords:  {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    postContent:   {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    postCover:   {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    postStatus:    {
        type: DataTypes.ENUM('publish', 'draft', 'trash'),
        allowNull: true,
        defaultValue: 'publish'
    },
    postTypeId:    {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: null
    },
    postParent:    {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0
    },
    postAuthor:    {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: null
    },
    postAllowComment: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    postViews: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    postCreatedAt:    { type: DataTypes.DATE },
    postUpdatedAt:    { type: DataTypes.DATE },
    postDeletedAt:    { type: DataTypes.DATE },
    postPublishedAt:    {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    sequelize: connection,
    tableName: 'posts',
    timestamps: true,
    createdAt: 'postCreatedAt',
    updatedAt: 'postUpdatedAt',
    deletedAt: 'postDeletedAt',
    hooks: {

        beforeCreate: async function(model){
            let slug = await slugify(model.postTitle);
            model.postSlug = slug;

            for(let i=2; i<=11; i++){
                let post = await Post.findOne( { where: { postSlug: model.postSlug } } );
                if(!post){ break; }else{
                    model.postSlug = slug +"-"+ i;
                }
            }
        }, // beforeCreate

        beforeUpdate: async function(model){
            let slug = await slugify(model.postTitle);
            model.postSlug = slug;

            for(let i=2; i<=11; i++){
                let post = await Post.findOne( { where: { postSlug: model.postSlug, postId: { [Op.ne]:model.postId } } } );
                if(!post){ break; }else{
                    model.postSlug = slug +"-"+ i;
                }
            }
        } // beforeUpdate
    }

})

// Post.belongsTo(User, { as:'user', foreignKey:'postAuthor', targetKey:'userId' })
// Post.belongsToMany(Term, { as: 'terms', uniqueKey:false, through: PostTerm})



export default Post
