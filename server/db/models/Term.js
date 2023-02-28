import {connection} from "~/server/db/connection"
import {Model, DataTypes} from "sequelize"
// import Taxonomy from "~/server/db/models/Taxonomy";
// import Post from "~/server/db/models/Post";
// import PostTerm from "~/server/db/models/PostTerm";

class Term extends Model{}

Term.init({
    termId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    taxId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    termTitle: {
        type: DataTypes.STRING(128),
        validate: {
            notEmpty: { msg: "Terim adı boş bırakılamaz." },
            len: { msg: "3 ile 60 karakter arasında bir terim başlığı girilmeli.", args: [3, 60] }
        }
    },
    termSlug: {
        type: DataTypes.STRING(255)
    },
    termDescription: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    termParent: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    termOrder: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 0
    },
},{
    sequelize: connection,
    tableName: "terms",
    timestamps: false,
    hooks: {
        // beforeCreate: async function(model){
        //     let slug = slugify(model.term_title);
        //     model.term_slug = slug;
        //
        //     for(let i=2; i<=11; i++){
        //         let term = await Term.findOne( { where: { term_slug: model.term_slug } } );
        //         if(!term){ break; }else{
        //             model.term_slug = slug +"-"+ i;
        //         }
        //     }
        // },
        //
        // beforeUpdate: async function(model){
        //     let slug = slugify(model.term_title);
        //     model.term_slug = slug;
        //
        //     for(let i=2; i<=11; i++){
        //         let term = await Term.findOne( { where: { term_slug: model.term_slug, term_id: { [Op.ne]:model.term_id } } } );
        //         if(!term){ break; }else{
        //             model.term_slug = slug +"-"+ i;
        //         }
        //     }
        // }
    }
});


// Term.belongsTo(Taxonomy, { as: "taxonomy" ,foreignKey:"taxId", targetKey:"taxId" });
// Term.belongsToMany(Post, { as: 'posts', uniqueKey:false, through: PostTerm})
export default Term
