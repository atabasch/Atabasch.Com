import {connection} from "~/server/db/connection";
import {Model, DataTypes} from "sequelize";

class CustomField extends Model{}

CustomField.init({

    fieldId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    fieldType: {
        type: DataTypes.STRING(255),
        defaultValue: 'text'
    },
    fieldName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fieldLabel: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fieldDescription: {
        type: DataTypes.STRING(512),
        allowNull: true,
        defaultValue: null
    },
    fieldDefaultValue: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    fieldOptions: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    fieldRequired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    postTypeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    fieldOrder: {
        type: DataTypes.TINYINT,
        defaultValue: 99
    }

}, {
    sequelize: connection,
    timestamps: false,
    tableName: 'custom_fields'
})

export default CustomField
