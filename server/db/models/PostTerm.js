import {connection} from "~/server/db/connection"
import {Model, DataTypes} from "sequelize"
// import {Post, Term} from "~/server/db/models"

class PostTerm extends Model{}

PostTerm.init({
    postTermId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // postId: {
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     allowNull: false,
    // },
    // termId: {
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     allowNull: false,
    // },
}, {
    sequelize: connection,
    tableName: "post_term",
    timestamps: false,
})

export default PostTerm;

