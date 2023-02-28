import {connection} from "@/server/db/connection"
import {Model, DataTypes} from "sequelize"
class PostType extends Model {}

PostType.init({
    postTypeId : {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    postTypeTitle : {
        type:       DataTypes.STRING(128),
        allowNull: false,
        validate: {
            len: { msg: "3 ile 60 karakter arasında bir taksonomi adı girin", args: [3, 60] }
        }
    },
    postTypeSlug : {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    postTypeTitleSingle : {
        type:       DataTypes.STRING(128),
        allowNull: false,
        validate: {
            len: { msg: "3 ile 128 karakter arasında bir taksonomi adı girin", args: [3, 128] }
        }
    },
    postTypeTitlePlural : {
        type:       DataTypes.STRING(128),
        allowNull: false,
        validate: {
            len: { msg: "3 ile 128 karakter arasında bir taksonomi adı girin", args: [3, 128] }
        }
    },
    postTypeDescription : {
        type:       DataTypes.STRING(256),
        allowNull: true,
        defaultValue: null
    },
    postTypeIcon : {
        type:       DataTypes.STRING(64),
        allowNull: true,
        defaultValue: null
    },
    postTypeTaxonomies : {
        type:       DataTypes.STRING(256),
        allowNull: true,
        defaultValue: null
    },
    postTypeStatus : {
        type:       DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    sequelize: connection,
    tableName: 'post_types',
    timestamps: false,
})

export default PostType
