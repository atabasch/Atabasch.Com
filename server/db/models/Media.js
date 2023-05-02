import {DataTypes, Model} from "sequelize";
import {connection} from "~/server/db/connection";
class Media extends Model{}

Media.init({

    mediaId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    mediaName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    mediaPath: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    mediaType: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    mediaLocation: {
        // local, firestore
        type: DataTypes.STRING(16),
        allowNull: false,
        defaultValue: 'local'
    },
    mediaData: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {}
    },

    postCreatedAt:    { type: DataTypes.DATE },
    postUpdatedAt:    { type: DataTypes.DATE },

}, {
    sequelize: connection,
    tableName: 'medias',
    timestamps: true,
    createdAt: 'postCreatedAt',
    updatedAt: 'postUpdatedAt',
    deletedAt: false,
})

export default Media
