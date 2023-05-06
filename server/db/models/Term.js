import {connection} from "~/server/db/connection"
import {Model, DataTypes, Op} from "sequelize"
import slugify from "~/helpers/slugify";
import Post from "~/server/db/models/Post";
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
        beforeCreate: async function(model){
            let slug = await slugify(model.termTitle);
            model.termSlug = slug;

            for(let i=2; i<=11; i++){
                let term = await Term.findOne( { where: { termSlug: model.termSlug } } );
                if(!term){ break; }else{
                    model.termSlug = slug +"-"+ i;
                }
            }
        },

        beforeUpdate: async function(model){
            let slug = await slugify(model.termTitle);
            model.termSlug = slug;

            for(let i=2; i<=11; i++){
                let term = await Term.findOne( { where: { termSlug: model.termSlug, termId: { [Op.ne]:model.termId } } } );
                if(!term){ break; }else{
                    model.termSlug = slug +"-"+ i;
                }
            }
        }
    }
});


// Term.belongsTo(Taxonomy, { as: "taxonomy" ,foreignKey:"taxId", targetKey:"taxId" });
// Term.belongsToMany(Post, { as: 'posts', uniqueKey:false, through: PostTerm})
export default Term
