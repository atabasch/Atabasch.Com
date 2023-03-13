import {connection} from "~/server/db/connection";
import {Model, DataTypes} from "sequelize";

class PostExtra extends Model{}

PostExtra.init({
    extraId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    postId: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    extraName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    extraValue: {
        type:DataTypes.TEXT,
        allowNull: true,
        defaultValue:true
    }
},{
    sequelize: connection,
    tableName: 'post_extras',
    timestamps: false
})

export default PostExtra
